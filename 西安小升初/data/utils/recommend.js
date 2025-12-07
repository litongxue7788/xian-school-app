// data/utils/recommend.js

const mainData = require('../schools.js');
const districtManager = require('../districts/index.js');
const searchEngine = require('./search.js');

/**
 * 西安小升初智能推荐系统
 * 基于学生画像和学校特征进行个性化推荐
 */
class SchoolRecommendationSystem {
  constructor() {
    this.mainData = mainData;
    this.studentProfiles = new Map(); // 学生画像缓存
  }

  /**
   * 生成学校推荐（主入口）
   */
  recommendForStudent(studentProfile, options = {}) {
    const {
      strategy = 'balanced',    // balanced|academic|safe|sprint
      maxRecommendations = 10,
      includeExplanation = true
    } = options;

    // 验证和补全学生画像
    const validatedProfile = this._validateStudentProfile(studentProfile);
    
    // 缓存学生画像
    this.studentProfiles.set(validatedProfile.id || Date.now(), validatedProfile);
    
    // 根据策略选择推荐算法
    let recommendations;
    switch (strategy) {
      case 'academic':
        recommendations = this._academicStrategy(validatedProfile, maxRecommendations);
        break;
      case 'safe':
        recommendations = this._safeStrategy(validatedProfile, maxRecommendations);
        break;
      case 'sprint':
        recommendations = this._sprintStrategy(validatedProfile, maxRecommendations);
        break;
      case 'balanced':
      default:
        recommendations = this._balancedStrategy(validatedProfile, maxRecommendations);
    }
    
    // 添加解释说明
    if (includeExplanation) {
      recommendations = this._addRecommendationExplanation(recommendations, validatedProfile, strategy);
    }
    
    return {
      studentProfile: validatedProfile,
      strategy,
      recommendations,
      generatedAt: new Date().toISOString(),
      totalSchools: recommendations.length
    };
  }

  /**
   * 平衡策略（默认）
   */
  _balancedStrategy(profile, maxCount) {
    const recommendations = [];
    
    // 1. 保底校（30%）：对口公办
    const fallbackCount = Math.floor(maxCount * 0.3);
    const fallbackSchools = this._getFallbackSchools(profile, fallbackCount);
    recommendations.push(...fallbackSchools.map(school => ({
      ...school,
      category: '保底',
      confidence: 0.95,
      reason: '户籍/居住地对口公办，入学保障最高'
    })));
    
    // 2. 稳妥校（40%）：匹配度高的民办
    const steadyCount = Math.floor(maxCount * 0.4);
    const steadySchools = this._getSteadySchools(profile, steadyCount);
    recommendations.push(...steadySchools.map(school => ({
      ...school,
      category: '稳妥',
      confidence: 0.65,
      reason: '匹配度较高，摇号概率适中'
    })));
    
    // 3. 冲刺校（30%）：热门民办
    const sprintCount = Math.floor(maxCount * 0.3);
    const sprintSchools = this._getSprintSchools(profile, sprintCount);
    recommendations.push(...sprintSchools.map(school => ({
      ...school,
      category: '冲刺',
      confidence: 0.35,
      reason: '热门学校，适合冲刺尝试'
    })));
    
    // 去重并限制数量
    return this._deduplicateRecommendations(recommendations).slice(0, maxCount);
  }

  /**
   * 学术优先策略
   */
  _academicStrategy(profile, maxCount) {
    const allSchools = [
      ...mainData.XI_AN_PRIVATE_SCHOOLS,
      ...Object.values(mainData.XI_AN_PUBLIC_SCHOOLS).flat()
    ];
    
    // 优先选择学术型学校
    const academicSchools = allSchools.filter(school => 
      school.features?.some(f => ['学术导向', '理科强', '竞赛浓度高', '科技创新'].includes(f))
    );
    
    // 按匹配度排序
    const sortedSchools = academicSchools
      .map(school => ({
        ...school,
        matchScore: this._calculateMatchScore(school, profile)
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
    
    return sortedSchools.slice(0, maxCount).map(school => ({
      ...school,
      category: '学术型',
      confidence: school.matchScore / 100,
      reason: '学术氛围浓厚，适合追求学术发展的学生'
    }));
  }

  /**
   * 稳妥保守策略
   */
  _safeStrategy(profile, maxCount) {
    const recommendations = [];
    
    // 1. 优先公办保底（50%）
    const publicCount = Math.floor(maxCount * 0.5);
    const publicSchools = this._getFallbackSchools(profile, publicCount);
    recommendations.push(...publicSchools.map(school => ({
      ...school,
      category: '公办保底',
      confidence: 0.95,
      reason: '对口公办，入学确定性高'
    })));
    
    // 2. 摇号概率高的民办（30%）
    const highLotteryCount = Math.floor(maxCount * 0.3);
    const highLotterySchools = this._getHighLotterySchools(profile, highLotteryCount);
    recommendations.push(...highLotterySchools.map(school => ({
      ...school,
      category: '高概率民办',
      confidence: this._parseLotteryProbability(school.lottery_probability) / 100,
      reason: '摇号概率较高，相对稳妥'
    })));
    
    // 3. 中等热度民办（20%）
    const mediumCount = Math.floor(maxCount * 0.2);
    const mediumSchools = this._getMediumHeatSchools(profile, mediumCount);
    recommendations.push(...mediumSchools.map(school => ({
      ...school,
      category: '中等热度',
      confidence: 0.5,
      reason: '热度适中，竞争相对较小'
    })));
    
    return this._deduplicateRecommendations(recommendations).slice(0, maxCount);
  }

  /**
   * 冲刺策略
   */
  _sprintStrategy(profile, maxCount) {
    // 只推荐顶级热门学校
    const topSchools = mainData.XI_AN_PRIVATE_SCHOOLS
      .filter(school => school.heat_level >= 4)
      .sort((a, b) => b.heat_level - a.heat_level)
      .slice(0, maxCount);
    
    return topSchools.map(school => ({
      ...school,
      category: '顶级冲刺',
      confidence: 0.2 + (school.heat_level * 0.1),
      reason: '全市热门学校，适合顶尖学生冲刺'
    }));
  }

  /**
   * 获取保底学校（公办对口）
   */
  _getFallbackSchools(profile, count) {
    const district = profile.户籍所在区 || profile.实际居住区;
    if (!district) return [];
    
    const publicSchools = mainData.XI_AN_PUBLIC_SCHOOLS[district] || [];
    
    // 按匹配度排序
    const scoredSchools = publicSchools
      .map(school => ({
        ...school,
        matchScore: this._calculateMatchScore(school, profile)
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
    
    return scoredSchools.slice(0, count);
  }

  /**
   * 获取稳妥学校（中等民办）
   */
  _getSteadySchools(profile, count) {
    // 选择热度3-4的民办学校
    const steadySchools = mainData.XI_AN_PRIVATE_SCHOOLS
      .filter(school => school.heat_level >= 3 && school.heat_level <= 4)
      .map(school => ({
        ...school,
        matchScore: this._calculateMatchScore(school, profile),
        lotteryProb: this._parseLotteryProbability(school.lottery_probability)
      }))
      // 按匹配度和摇号概率综合排序
      .sort((a, b) => {
        const aScore = a.matchScore * 0.7 + a.lotteryProb * 0.3;
        const bScore = b.matchScore * 0.7 + b.lotteryProb * 0.3;
        return bScore - aScore;
      });
    
    return steadySchools.slice(0, count);
  }

  /**
   * 获取冲刺学校（热门民办）
   */
  _getSprintSchools(profile, count) {
    // 选择热度4-5的民办学校
    const sprintSchools = mainData.XI_AN_PRIVATE_SCHOOLS
      .filter(school => school.heat_level >= 4)
      .map(school => ({
        ...school,
        matchScore: this._calculateMatchScore(school, profile),
        lotteryProb: this._parseLotteryProbability(school.lottery_probability)
      }))
      // 按匹配度排序（摇号概率次要）
      .sort((a, b) => b.matchScore - a.matchScore);
    
    return sprintSchools.slice(0, count);
  }

  /**
   * 获取高摇号概率学校
   */
  _getHighLotterySchools(profile, count) {
    return mainData.XI_AN_PRIVATE_SCHOOLS
      .map(school => ({
        ...school,
        lotteryProb: this._parseLotteryProbability(school.lottery_probability),
        matchScore: this._calculateMatchScore(school, profile)
      }))
      .filter(school => school.lotteryProb >= 40)
      .sort((a, b) => b.lotteryProb - a.lotteryProb)
      .slice(0, count);
  }

  /**
   * 获取中等热度学校
   */
  _getMediumHeatSchools(profile, count) {
    return mainData.XI_AN_PRIVATE_SCHOOLS
      .filter(school => school.heat_level === 3)
      .map(school => ({
        ...school,
        matchScore: this._calculateMatchScore(school, profile)
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, count);
  }

  /**
   * 计算学校匹配度分数
   */
  _calculateMatchScore(school, profile) {
    let score = 50; // 基础分
    
    // 1. 区域匹配（权重30%）
    const householdDistrict = profile.户籍所在区;
    const residenceDistrict = profile.实际居住区;
    
    if (school.district === householdDistrict) {
      score += 30;
    } else if (school.district === residenceDistrict) {
      score += 20;
    } else if (profile.民办意向 === 'yes' && school.type === '民办') {
      score += 10;
    }
    
    // 2. 能力匹配（权重40%）
    const studentAbility = profile.能力评估 || {};
    const isScienceStrong = parseInt(studentAbility['理科能力'] || studentAbility['维度6'] || 3) >= 4;
    const isArtsStrong = profile.学生特长?.includes('艺术') || profile.学生特长?.includes('体育');
    const academicLevel = profile.学业水平 || '中等';
    
    // 理科匹配
    if (isScienceStrong && school.features?.some(f => ['理科强', '竞赛浓度高', '科技创新'].includes(f))) {
      score += 20;
    }
    
    // 文科/艺术匹配
    if (isArtsStrong && school.features?.some(f => ['艺术体育强', '素质教育', '艺术特色'].includes(f))) {
      score += 20;
    }
    
    // 学业水平匹配
    if (academicLevel === '优秀' && school.heat_level >= 4) {
      score += 10;
    } else if (academicLevel === '中等' && school.heat_level === 3) {
      score += 10;
    } else if (academicLevel === '基础' && school.heat_level <= 2) {
      score += 10;
    }
    
    // 3. 预算匹配（权重20%）
    const budget = profile.预算范围;
    const tuition = this._parseTuition(school.tuition);
    
    if (budget === 'high' && tuition > 10000) {
      score += 20;
    } else if (budget === 'medium' && tuition >= 5000 && tuition <= 10000) {
      score += 20;
    } else if (budget === 'low' && tuition < 5000) {
      score += 20;
    } else if (!budget) {
      score += 10; // 未指定预算，给部分分
    }
    
    // 4. 个人偏好匹配（权重10%）
    const preferences = profile.偏好特征 || [];
    if (preferences.length > 0) {
      const matchCount = preferences.filter(pref => 
        school.features?.includes(pref) || school.match_tags?.includes(pref)
      ).length;
      score += (matchCount / preferences.length) * 10;
    }
    
    // 限制范围：0-100
    return Math.min(100, Math.max(0, score));
  }

  /**
   * 对比学校
   */
  compareSchools(schoolIds, studentProfile = null) {
    const allSchools = [
      ...mainData.XI_AN_PRIVATE_SCHOOLS,
      ...Object.values(mainData.XI_AN_PUBLIC_SCHOOLS).flat()
    ];
    
    const schools = allSchools.filter(school => 
      schoolIds.includes(school.id)
    );
    
    const comparison = schools.map(school => {
      const comparisonData = {
        id: school.id,
        name: school.name,
        type: school.type,
        district: school.district,
        heat_level: school.heat_level,
        tuition: school.tuition,
        lottery_probability: school.lottery_probability,
        features: school.features || [],
        match_tags: school.match_tags || []
      };
      
      // 如果有学生画像，计算匹配度
      if (studentProfile) {
        comparisonData.match_score = this._calculateMatchScore(school, studentProfile);
        comparisonData.match_level = this._getMatchLevel(comparisonData.match_score);
      }
      
      // 解析数值用于比较
      comparisonData.tuition_value = this._parseTuition(school.tuition);
      comparisonData.lottery_value = this._parseLotteryProbability(school.lottery_probability);
      
      return comparisonData;
    });
    
    return {
      schools: comparison,
      comparisonPoints: this._getComparisonPoints(comparison),
      summary: this._generateComparisonSummary(comparison)
    };
  }

  /**
   * 生成批量推荐（用于批量分析）
   */
  batchRecommend(studentProfiles, options = {}) {
    const {
      strategy = 'balanced',
      maxPerStudent = 5
    } = options;
    
    return studentProfiles.map(profile => ({
      studentId: profile.id || `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      recommendations: this.recommendForStudent(profile, { 
        strategy, 
        maxRecommendations: maxPerStudent,
        includeExplanation: false 
      }),
      generatedAt: new Date().toISOString()
    }));
  }

  /**
   * 获取推荐历史
   */
  getRecommendationHistory(studentId, limit = 10) {
    // 这里可以实现持久化存储，暂时返回模拟数据
    return {
      studentId,
      history: [],
      message: '推荐历史功能需要数据库支持'
    };
  }

  /**
   * 验证学生画像
   */
  _validateStudentProfile(profile) {
    const defaults = {
      学业水平: '中等',
      预算范围: 'medium',
      民办意向: 'yes',
      能力评估: {},
      学生特长: [],
      偏好特征: []
    };
    
    return {
      ...defaults,
      ...profile,
      // 确保关键字段存在
      户籍所在区: profile.户籍所在区 || profile.household_district,
      实际居住区: profile.实际居住区 || profile.residence_district
    };
  }

  /**
   * 去重推荐
   */
  _deduplicateRecommendations(recommendations) {
    const seen = new Set();
    return recommendations.filter(rec => {
      const key = rec.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  /**
   * 添加推荐解释
   */
  _addRecommendationExplanation(recommendations, profile, strategy) {
    const strategyExplanations = {
      'balanced': '平衡策略：综合考虑入学保障和学校质量',
      'academic': '学术优先：侧重学术氛围和教学质量',
      'safe': '稳妥策略：优先保障入学成功率',
      'sprint': '冲刺策略：推荐顶级学校，适合优秀学生'
    };
    
    return recommendations.map(rec => ({
      ...rec,
      explanation: {
        strategy: strategyExplanations[strategy] || '个性化推荐',
        matchBreakdown: this._generateMatchBreakdown(rec, profile),
        tips: this._generateRecommendationTips(rec, profile)
      }
    }));
  }

  /**
   * 生成匹配度分解
   */
  _generateMatchBreakdown(school, profile) {
    const breakdown = [];
    
    // 区域匹配
    const district = profile.户籍所在区 || profile.实际居住区;
    if (school.district === district) {
      breakdown.push('区域匹配度高');
    }
    
    // 能力匹配
    const ability = profile.能力评估 || {};
    if (ability.理科能力 >= 4 && school.features?.some(f => f.includes('理科'))) {
      breakdown.push('理科能力匹配');
    }
    
    // 预算匹配
    const budget = profile.预算范围;
    const tuition = this._parseTuition(school.tuition);
    if ((budget === 'high' && tuition > 10000) || 
        (budget === 'medium' && tuition <= 10000) ||
        (budget === 'low' && tuition <= 5000)) {
      breakdown.push('预算匹配');
    }
    
    return breakdown;
  }

  /**
   * 生成推荐建议
   */
  _generateRecommendationTips(school, profile) {
    const tips = [];
    
    // 摇号建议
    const lotteryProb = this._parseLotteryProbability(school.lottery_probability);
    if (lotteryProb < 30) {
      tips.push('摇号概率较低，建议同时准备保底方案');
    } else if (lotteryProb > 50) {
      tips.push('摇号概率较高，可以作为重点考虑');
    }
    
    // 学费建议
    const tuition = this._parseTuition(school.tuition);
    const budget = profile.预算范围;
    if ((budget === 'low' && tuition > 5000) || 
        (budget === 'medium' && tuition > 10000)) {
      tips.push('学费超出建议预算范围，请综合考虑家庭经济状况');
    }
    
    // 学业匹配建议
    const academicLevel = profile.学业水平;
    if ((academicLevel === '基础' && school.heat_level >= 4) ||
        (academicLevel === '中等' && school.heat_level >= 5)) {
      tips.push('学校竞争激烈，需评估学生实际能力');
    }
    
    return tips;
  }

  /**
   * 获取匹配等级
   */
  _getMatchLevel(score) {
    if (score >= 80) return '高度匹配';
    if (score >= 60) return '良好匹配';
    if (score >= 40) return '中等匹配';
    return '低度匹配';
  }

  /**
   * 获取对比要点
   */
  _getComparisonPoints(schools) {
    const points = [];
    
    // 学费对比
    const tuitions = schools.map(s => s.tuition_value);
    const minTuition = Math.min(...tuitions);
    const maxTuition = Math.max(...tuitions);
    if (maxTuition - minTuition > 5000) {
      points.push('学费差异显著');
    }
    
    // 摇号概率对比
    const lotteries = schools.map(s => s.lottery_value);
    const minLottery = Math.min(...lotteries);
    const maxLottery = Math.max(...lotteries);
    if (maxLottery - minLottery > 20) {
      points.push('入学难度差异大');
    }
    
    // 学校类型
    const types = new Set(schools.map(s => s.type));
    if (types.size > 1) {
      points.push('包含不同类型学校');
    }
    
    return points;
  }

  /**
   * 生成对比总结
   */
  _generateComparisonSummary(schools) {
    if (schools.length === 0) return '无对比数据';
    
    const summary = {
      学校数量: schools.length,
      平均学费: Math.round(schools.reduce((sum, s) => sum + s.tuition_value, 0) / schools.length),
      平均摇号概率: Math.round(schools.reduce((sum, s) => sum + s.lottery_value, 0) / schools.length),
      热门学校数量: schools.filter(s => s.heat_level >= 4).length,
      公办学校数量: schools.filter(s => s.type === '公办').length,
      民办学校数量: schools.filter(s => s.type === '民办').length
    };
    
    return summary;
  }

  /**
   * 解析学费
   */
  _parseTuition(tuitionStr) {
    if (!tuitionStr || tuitionStr === '0元/学期') return 0;
    const match = tuitionStr.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  /**
   * 解析摇号概率
   */
  _parseLotteryProbability(lotteryStr) {
    if (!lotteryStr) return 0;
    const match = lotteryStr.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  }
}

// 导出单例
module.exports = new SchoolRecommendationSystem();
