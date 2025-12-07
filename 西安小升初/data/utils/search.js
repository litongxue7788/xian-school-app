// data/utils/search.js

const mainData = require('../schools.js');
const districtManager = require('../districts/index.js');

/**
 * 西安学校搜索引擎
 * 支持多种搜索条件和高级过滤
 */
class SchoolSearchEngine {
  constructor() {
    this.mainData = mainData;
    this.index = this._buildSearchIndex();
  }

  /**
   * 构建搜索索引
   */
  _buildSearchIndex() {
    const index = {
      name: new Map(),      // 学校名称索引
      feature: new Map(),   // 特色索引
      district: new Map(),  // 辖区索引
      type: new Map(),      // 学校类型索引
      tag: new Map()        // 匹配标签索引
    };

    // 索引民办学校
    mainData.XI_AN_PRIVATE_SCHOOLS.forEach(school => {
      this._indexSchool(school, index, 'private');
    });

    // 索引公办学校
    Object.entries(mainData.XI_AN_PUBLIC_SCHOOLS).forEach(([district, schools]) => {
      schools.forEach(school => {
        this._indexSchool(school, index, 'public', district);
      });
    });

    return index;
  }

  /**
   * 索引单个学校
   */
  _indexSchool(school, index, type, district = null) {
    const schoolDistrict = district || school.district;
    const schoolWithMeta = { ...school, _type: type, _district: schoolDistrict };

    // 1. 名称索引
    const nameKey = school.name.toLowerCase();
    if (!index.name.has(nameKey)) {
      index.name.set(nameKey, []);
    }
    index.name.get(nameKey).push(schoolWithMeta);

    // 2. 特色索引
    if (school.features) {
      school.features.forEach(feature => {
        const featureKey = feature.toLowerCase();
        if (!index.feature.has(featureKey)) {
          index.feature.set(featureKey, []);
        }
        index.feature.get(featureKey).push(schoolWithMeta);
      });
    }

    // 3. 辖区索引
    const districtKey = schoolDistrict;
    if (!index.district.has(districtKey)) {
      index.district.set(districtKey, []);
    }
    index.district.get(districtKey).push(schoolWithMeta);

    // 4. 类型索引
    if (!index.type.has(type)) {
      index.type.set(type, []);
    }
    index.type.get(type).push(schoolWithMeta);

    // 5. 标签索引
    if (school.match_tags) {
      school.match_tags.forEach(tag => {
        const tagKey = tag.toLowerCase();
        if (!index.tag.has(tagKey)) {
          index.tag.set(tagKey, []);
        }
        index.tag.get(tagKey).push(schoolWithMeta);
      });
    }
  }

  /**
   * 基础搜索
   */
  basicSearch(query, options = {}) {
    const {
      district = null,
      schoolType = null,
      limit = 20,
      sortBy = 'relevance'
    } = options;

    let results = [];

    // 处理查询关键词
    if (query) {
      const queryLower = query.toLowerCase();
      
      // 按名称搜索
      for (const [name, schools] of this.index.name.entries()) {
        if (name.includes(queryLower)) {
          results.push(...schools);
        }
      }

      // 按特色搜索
      for (const [feature, schools] of this.index.feature.entries()) {
        if (feature.includes(queryLower)) {
          results.push(...schools);
        }
      }

      // 按标签搜索
      for (const [tag, schools] of this.index.tag.entries()) {
        if (tag.includes(queryLower)) {
          results.push(...schools);
        }
      }

      // 去重
      results = this._deduplicateSchools(results);
    } else {
      // 无查询词时返回所有学校
      results = [
        ...mainData.XI_AN_PRIVATE_SCHOOLS.map(s => ({ ...s, _type: 'private' })),
        ...Object.values(mainData.XI_AN_PUBLIC_SCHOOLS).flat().map(s => ({ ...s, _type: 'public' }))
      ];
    }

    // 应用过滤条件
    results = this._applyFilters(results, { district, schoolType });

    // 排序
    results = this._sortResults(results, sortBy, query);

    // 限制数量
    return results.slice(0, limit);
  }

  /**
   * 高级搜索
   */
  advancedSearch(criteria = {}) {
    const {
      districts = [],
      schoolTypes = [],
      features = [],
      tuitionRange = [0, 100000],
      lotteryMin = 0,
      lotteryMax = 100,
      heatLevel = null,
      hasDirectPromotion = null,
      limit = 50
    } = criteria;

    let results = [];

    // 搜索民办学校
    if (schoolTypes.includes('民办') || schoolTypes.length === 0) {
      results.push(...mainData.XI_AN_PRIVATE_SCHOOLS.map(s => ({ ...s, _type: 'private' })));
    }

    // 搜索公办学校
    if (schoolTypes.includes('公办') || schoolTypes.length === 0) {
      Object.values(mainData.XI_AN_PUBLIC_SCHOOLS).forEach(schools => {
        results.push(...schools.map(s => ({ ...s, _type: 'public' })));
      });
    }

    // 应用高级过滤器
    results = results.filter(school => {
      // 辖区过滤
      if (districts.length > 0 && !districts.includes(school._district || school.district)) {
        return false;
      }

      // 特色过滤
      if (features.length > 0) {
        const schoolFeatures = school.features || [];
        if (!features.every(feature => schoolFeatures.includes(feature))) {
          return false;
        }
      }

      // 学费过滤
      const tuition = this._parseTuition(school.tuition);
      if (tuition < tuitionRange[0] || tuition > tuitionRange[1]) {
        return false;
      }

      // 摇号概率过滤
      const lotteryProb = this._parseLotteryProbability(school.lottery_probability);
      if (lotteryProb < lotteryMin || lotteryProb > lotteryMax) {
        return false;
      }

      // 热度过滤
      if (heatLevel !== null && school.heat_level !== heatLevel) {
        return false;
      }

      // 直升名额过滤
      if (hasDirectPromotion !== null) {
        const hasPromotion = (school.direct_promotion || 0) > 0;
        if (hasPromotion !== hasDirectPromotion) {
          return false;
        }
      }

      return true;
    });

    // 去重和排序
    results = this._deduplicateSchools(results);
    results = this._sortResults(results, 'heat_desc');

    return results.slice(0, limit);
  }

  /**
   * 按辖区搜索
   */
  searchByDistrict(districtName, options = {}) {
    const { includePrivate = true, includePublic = true, limit = 20 } = options;
    
    let results = [];

    if (includePrivate) {
      const privateSchools = mainData.XI_AN_PRIVATE_SCHOOLS
        .filter(s => s.district === districtName)
        .map(s => ({ ...s, _type: 'private' }));
      results.push(...privateSchools);
    }

    if (includePublic) {
      const publicSchools = (mainData.XI_AN_PUBLIC_SCHOOLS[districtName] || [])
        .map(s => ({ ...s, _type: 'public' }));
      results.push(...publicSchools);
    }

    // 检查辖区数据文件
    try {
      const districtData = districtManager.getDistrict(districtName);
      if (districtData && districtData.schools) {
        const fileSchools = districtData.schools
          .filter(s => !results.some(r => r.id === s.id))
          .map(s => ({ ...s, _type: s.type === '民办' ? 'private' : 'public' }));
        results.push(...fileSchools);
      }
    } catch (error) {
      // 忽略文件不存在错误
    }

    return this._deduplicateSchools(results).slice(0, limit);
  }

  /**
   * 智能联想搜索
   */
  suggestSearch(query, limit = 10) {
    const queryLower = query.toLowerCase();
    const suggestions = new Set();

    // 名称联想
    for (const name of this.index.name.keys()) {
      if (name.includes(queryLower)) {
        suggestions.add(name);
      }
      if (suggestions.size >= limit) break;
    }

    // 特色联想
    if (suggestions.size < limit) {
      for (const feature of this.index.feature.keys()) {
        if (feature.includes(queryLower)) {
          suggestions.add(feature);
        }
        if (suggestions.size >= limit) break;
      }
    }

    // 辖区联想
    if (suggestions.size < limit) {
      for (const district of this.index.district.keys()) {
        if (district.includes(queryLower)) {
          suggestions.add(district);
        }
        if (suggestions.size >= limit) break;
      }
    }

    return Array.from(suggestions).slice(0, limit);
  }

  /**
   * 获取热门搜索
   */
  getHotSearches(limit = 10) {
    const hotKeywords = [
      '铁一中', '高新一中', '交大附中', '师大附中', 
      '民办初中', '摇号', '学区', '公办对口',
      '理科强', '竞赛', '国际学校', '寄宿'
    ];

    return hotKeywords.slice(0, limit);
  }

  /**
   * 辅助函数：解析学费
   */
  _parseTuition(tuitionStr) {
    if (!tuitionStr || tuitionStr === '0元/学期') return 0;
    
    // 提取数字，取最小值
    const matches = tuitionStr.match(/\d+/g);
    if (!matches || matches.length === 0) return 0;
    
    return parseInt(matches[0]);
  }

  /**
   * 辅助函数：解析摇号概率
   */
  _parseLotteryProbability(lotteryStr) {
    if (!lotteryStr) return 0;
    
    const match = lotteryStr.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  }

  /**
   * 辅助函数：去重
   */
  _deduplicateSchools(schools) {
    const seen = new Set();
    return schools.filter(school => {
      const key = `${school.id}_${school._type}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  /**
   * 辅助函数：应用过滤器
   */
  _applyFilters(schools, filters) {
    const { district, schoolType } = filters;
    
    return schools.filter(school => {
      // 辖区过滤
      if (district && (school._district || school.district) !== district) {
        return false;
      }
      
      // 类型过滤
      if (schoolType) {
        const typeMap = { '民办': 'private', '公办': 'public' };
        if (typeMap[schoolType] && school._type !== typeMap[schoolType]) {
          return false;
        }
      }
      
      return true;
    });
  }

  /**
   * 辅助函数：排序结果
   */
  _sortResults(schools, sortBy, query = '') {
    return schools.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          if (query) {
            // 根据查询词匹配度排序
            const aScore = this._calculateRelevanceScore(a, query);
            const bScore = this._calculateRelevanceScore(b, query);
            return bScore - aScore;
          }
          // 降级为热度排序
          return (b.heat_level || 0) - (a.heat_level || 0);
          
        case 'heat_desc':
          return (b.heat_level || 0) - (a.heat_level || 0);
          
        case 'heat_asc':
          return (a.heat_level || 0) - (b.heat_level || 0);
          
        case 'lottery_desc':
          const aLottery = this._parseLotteryProbability(a.lottery_probability);
          const bLottery = this._parseLotteryProbability(b.lottery_probability);
          return bLottery - aLottery;
          
        case 'lottery_asc':
          const aLottery2 = this._parseLotteryProbability(a.lottery_probability);
          const bLottery2 = this._parseLotteryProbability(b.lottery_probability);
          return aLottery2 - bLottery2;
          
        case 'tuition_asc':
          const aTuition = this._parseTuition(a.tuition);
          const bTuition = this._parseTuition(b.tuition);
          return aTuition - bTuition;
          
        case 'tuition_desc':
          const aTuition2 = this._parseTuition(a.tuition);
          const bTuition2 = this._parseTuition(b.tuition);
          return bTuition2 - aTuition2;
          
        default:
          return 0;
      }
    });
  }

  /**
   * 辅助函数：计算相关性分数
   */
  _calculateRelevanceScore(school, query) {
    const queryLower = query.toLowerCase();
    let score = 0;
    
    // 名称完全匹配
    if (school.name.toLowerCase() === queryLower) {
      score += 100;
    }
    // 名称包含
    else if (school.name.toLowerCase().includes(queryLower)) {
      score += 50;
    }
    
    // 全名匹配
    if (school.full_name && school.full_name.toLowerCase().includes(queryLower)) {
      score += 30;
    }
    
    // 特色匹配
    if (school.features) {
      school.features.forEach(feature => {
        if (feature.toLowerCase().includes(queryLower)) {
          score += 20;
        }
      });
    }
    
    // 标签匹配
    if (school.match_tags) {
      school.match_tags.forEach(tag => {
        if (tag.toLowerCase().includes(queryLower)) {
          score += 15;
        }
      });
    }
    
    // 辖区匹配
    if ((school._district || school.district).toLowerCase().includes(queryLower)) {
      score += 10;
    }
    
    // 热度加成
    score += (school.heat_level || 0) * 5;
    
    return score;
  }
}

// 导出单例
module.exports = new SchoolSearchEngine();
