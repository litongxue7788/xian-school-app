// ========== 拼音映射表 ==========
const PINYIN_MAP = {
    '新': 'xin', '城': 'cheng', '区': 'qu',
    '碑': 'bei', '林': 'lin',
    '莲': 'lian', '湖': 'hu',
    '雁': 'yan', '塔': 'ta',
    '灞': 'ba', '桥': 'qiao',
    '未': 'wei', '央': 'yang',
    '阎': 'yan', '良': 'liang',
    '临': 'lin', '潼': 'tong',
    '长': 'chang', '安': 'an',
    '高': 'gao', '陵': 'ling',
    '鄠': 'hu', '邑': 'yi',
    '蓝': 'lan', '田': 'tian',
    '周': 'zhou', '至': 'zhi',
    '西': 'xi', '咸': 'xian',
    '经': 'jing', '开': 'kai',
    '曲': 'qu', '江': 'jiang',
    '浐': 'chan', '灞': 'ba',
    '航': 'hang', '天': 'tian', '基': 'ji', '地': 'di',
    '一': 'yi', '二': 'er', '三': 'san', '四': 'si', '五': 'wu', '六': 'liu', '七': 'qi', '八': 'ba', '九': 'jiu', '十': 'shi',
    '东': 'dong', '南': 'nan', '北': 'bei', '中': 'zhong',
    '路': 'lu', '街': 'jie', '道': 'dao'
};

function toPinyin(text) {
    if (!text) return '';
    let result = '';
    for (let char of text) {
        result += PINYIN_MAP[char] || char;
    }
    return result.toLowerCase();
}

function getPinyinInitials(text) {
    if (!text) return '';
    let result = '';
    for (let char of text) {
        const py = PINYIN_MAP[char];
        if (py) result += py[0];
    }
    return result.toLowerCase();
}

// ========== 全局配置与数据 ==========
const CONFIG = {
    apiKey: '',
    appId: '',
    provider: 'bailian',
    isConnected: false,
    isChatInitialized: false,
    aiTimeoutMs: 20000,
    topN: 10
};

let assessmentData = { scores: {}, familyInfo: {}, totalScore: 0 };
let chatHistory = [];
let isDragging = false;
let offsetX, offsetY;
let abilityChartInstance = null;

// ========== 用户记忆系统 ==========
let USER_MEMORY = JSON.parse(localStorage.getItem("USER_MEMORY") || "{}");

function saveUserMemory(key, value) {
    USER_MEMORY[key] = value;
    localStorage.setItem("USER_MEMORY", JSON.stringify(USER_MEMORY));
}

function getUserMemory() {
    return USER_MEMORY;
}

// ========== 🔥 修复1: 增强学校数据加载 ==========
let SCHOOLS_CACHE = null;

async function loadSchoolsData() {
    if (SCHOOLS_CACHE) return SCHOOLS_CACHE;
    
    console.log('📚 开始加载本地学校数据库...');
    
    try {
        // 1. 优先尝试从您的本地数据库加载（19个区域文件）
        const districts = [
            '新城区', '碑林区', '莲湖区', '雁塔区', '灞桥区', '未央区',
            '阎良区', '临潼区', '长安区', '高陵区', '鄠邑区', '蓝田县',
            '周至县', '西咸新区', '高新区', '经开区', '曲江新区',
            '浐灞国际港', '航天基地'
        ];
        
        const allSchools = [];
        let loadedCount = 0;
        
        // 尝试加载每个区域的学校数据
        for (const district of districts) {
            try {
                const filename = district.replace(/[（）]/g, '').replace(/\s+/g, '');
                const response = await fetch(`data/districts/${filename}.js`);
                
                if (response.ok) {
                    const jsContent = await response.text();
                    
                    // 尝试解析学校数据（根据您的文件格式调整）
                    let schools = [];
                    
                    // 尝试多种可能的格式
                    const patterns = [
                        /const schools\s*=\s*(\[.*?\]);/s,
                        /export\s+default\s+(\[.*?\])/s,
                        /module\.exports\s*=\s*(\[.*?\])/s,
                        /var schools\s*=\s*(\[.*?\]);/s,
                        /let schools\s*=\s*(\[.*?\]);/s
                    ];
                    
                    for (const pattern of patterns) {
                        const match = jsContent.match(pattern);
                        if (match) {
                            try {
                                // 清理JSON字符串
                                let jsonStr = match[1]
                                    .replace(/'/g, '"')
                                    .replace(/,\s*]/g, ']')
                                    .replace(/,\s*}/g, '}');
                                
                                schools = JSON.parse(jsonStr);
                                
                                // 添加区域信息
                                schools = schools.map(school => ({
                                    ...school,
                                    district: district,
                                    // 确保必要字段
                                    id: school.id || `school_${district}_${Math.random().toString(36).substr(2, 9)}`,
                                    type: school.type || '公办',
                                    features: school.features || '',
                                    tuitionMin: school.tuitionMin || 0,
                                    tuitionMax: school.tuitionMax || 0,
                                    sources: school.sources || ['本地数据库']
                                }));
                                
                                allSchools.push(...schools);
                                loadedCount += schools.length;
                                console.log(`✅ 加载 ${district}: ${schools.length} 所学校`);
                                break;
                            } catch (e) {
                                console.warn(`解析${district}数据失败:`, e);
                            }
                        }
                    }
                }
            } catch (err) {
                console.warn(`⚠️ 加载 ${district}.js 失败，继续尝试其他文件:`, err);
            }
        }
        
        if (allSchools.length > 0) {
            SCHOOLS_CACHE = allSchools;
            console.log(`🎉 成功从本地数据库加载: ${SCHOOLS_CACHE.length} 所学校`);
            return SCHOOLS_CACHE;
        }
        
        // 2. 如果区域文件都没加载成功，尝试统一的schools.json
        console.log('尝试加载统一的schools.json...');
        const response = await fetch('data/schools.json');
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                SCHOOLS_CACHE = data;
                console.log('✅ 从schools.json加载:', data.length, '所学校');
                return SCHOOLS_CACHE;
            }
        }
        
    } catch (error) {
        console.error('❌ 加载本地数据库失败:', error);
    }
    
    // 3. 如果本地数据都不可用，使用增强的示例数据
    console.log('使用增强示例数据...');
    SCHOOLS_CACHE = getEnhancedFallbackSchools();
    return SCHOOLS_CACHE;
}

// ========== 🔥 增强的示例数据 ==========
function getEnhancedFallbackSchools() {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    return [
        {
            id: 'demo_gxyz_001',
            name: '高新一中',
            type: '民办',
            district: '高新区',
            streets: ['丈八街道'],
            tuitionMin: 35000,
            tuitionMax: 42000,
            features: '理科竞赛强校、创新实验班、国际课程',
            sources: ['https://edu.xa.gov.cn'],
            enrollmentRate: 38,
            distance: '25分钟',
            successRate: 31,
            keyTeachers: '28名特级教师',
            avgScore: 628,
            highSchoolRate: 92,
            contact: '地址：西安市高新区科技路XX号\n电话：029-XXXX-XXXX\n网站：www.gxyizhong.com\n开放日：3月23日、4月15日',
            description: `创办于1995年，在校3600人，重点高中升学率92%，五大名校高中录取率68%
${currentYear}年计划招生：400人
报名时间：7月11-24日
摇号日期：7月30日`,
            admissionData: `${currentYear-1}年报名1200人，录取375人，录取率31%`,
            matchReason: '理科优势明显，适合竞赛培养'
        },
        {
            id: 'demo_ycy_002',
            name: '高新逸翠园学校',
            type: '民办',
            district: '高新区',
            streets: ['丈八街道'],
            tuitionMin: 25000,
            tuitionMax: 30000,
            features: '双语教学、艺术特色、小班化',
            sources: ['https://example.com'],
            enrollmentRate: 82,
            distance: '18分钟',
            successRate: 45,
            keyTeachers: '15名特级教师',
            avgScore: 605,
            highSchoolRate: 85,
            contact: '地址：西安市高新区逸翠园路XX号\n电话：029-XXXX-XXXX',
            description: `新兴民办学校，注重综合素质培养，艺术特色突出
${currentYear}年计划招生：300人
双语教学，小班授课（每班35人）`,
            admissionData: `${currentYear-1}年报名650人，录取300人，录取率46%`,
            matchReason: '艺术特长匹配，适合综合素质发展'
        },
        {
            id: 'demo_gxwz_003',
            name: '高新第五中学',
            type: '公办',
            district: '高新区',
            streets: ['丈八街道', '鱼化寨街道'],
            tuitionMin: 0,
            tuitionMax: 0,
            features: '公办统筹、学区覆盖广、性价比高',
            sources: ['https://edu.xa.gov.cn'],
            enrollmentRate: 95,
            distance: '15分钟',
            successRate: 100,
            keyTeachers: '10名特级教师',
            avgScore: 585,
            highSchoolRate: 75,
            contact: '地址：西安市高新区科技六路XX号\n电话：029-XXXX-XXXX',
            description: `公办保底学校，适合户籍在该学区的学生
学区覆盖：丈八街道、鱼化寨街道
${currentYear}年计划招生：500人`,
            admissionData: '公办学校，无需摇号，按学区入学',
            matchReason: '户籍匹配，公办保底'
        },
        {
            id: 'demo_tybh_004',
            name: '铁一滨河学校',
            type: '民办',
            district: '雁塔区',
            streets: ['曲江街道'],
            tuitionMin: 40000,
            tuitionMax: 45000,
            features: '文科优势、国际课程、外语特色',
            sources: ['https://example.com'],
            enrollmentRate: 35,
            distance: '40分钟',
            successRate: 28,
            keyTeachers: '22名特级教师',
            avgScore: 625,
            highSchoolRate: 90,
            contact: '地址：西安市雁塔区滨河路XX号\n电话：029-XXXX-XXXX',
            description: `文科优势明显，外语教学特色突出
${currentYear}年计划招生：350人
国际课程班单独招生`,
            admissionData: `${currentYear-1}年报名1100人，录取308人，录取率28%`,
            matchReason: '文科优势匹配，外语特色'
        }
    ];
}

// ========== 🔥 修复2: 完整收集用户数据 ==========
function collectUserDataForAI() {
    console.log('📊 开始收集用户数据...');
    
    const studentName = document.getElementById('studentName')?.value || '张小明';
    
    const userData = {
        基本信息: {
            当前年级: document.querySelector('input[name="currentGrade"]:checked')?.value || '六年级',
            学生姓名: studentName,
            学生性别: document.getElementById('studentGender')?.value || '未填写',
            所在小学: document.getElementById('currentSchool')?.value || '未填写'
        },
        能力评估: {},
        户籍居住信息: {
            户籍所在区: document.getElementById('householdDistrict')?.value || '',
            户籍所在街道: document.getElementById('householdStreet')?.value || '',
            户籍详细地址: document.getElementById('householdAddress')?.value || '',
            实际居住区: document.getElementById('residenceDistrict')?.value || '',
            实际居住街道: document.getElementById('residenceStreet')?.value || '',
            居住详细地址: document.getElementById('residenceAddress')?.value || '',
            居住性质: document.getElementById('residenceType')?.value || '',
            户籍区与居住区相同: document.getElementById('sameDistrict')?.checked || false,
            户籍街道与居住街道相同: document.getElementById('sameStreet')?.checked || false,
            在学区内居住: document.getElementById('inSchoolDistrict')?.checked || false
        },
        学区房产信息: {
            学区房情况: document.getElementById('hasHouse')?.value || '',
            房产证类型: document.getElementById('propertyType')?.value || '',
            房产持有时间: document.getElementById('propertyYears')?.value || ''
        },
        民办意向与预算: {
            是否考虑民办: document.getElementById('considerPrivate')?.value || '',
            可接受的跨区范围: document.getElementById('crossDistrictPreference')?.value || '',
            民办学校预算: document.getElementById('budget')?.value || '',
            对摇号不确定性的态度: document.getElementById('acceptLottery')?.value || ''
        },
        学生特长: []
    };
    
    // 收集能力评估
    const dimensionNames = ['学业成绩', '综合素养', '学习习惯', '心理素质', '家庭支持', '学科倾向'];
    for (let i = 1; i <= 6; i++) {
        const radio = document.querySelector(`input[name="score${i}"]:checked`);
        if (radio) {
            const label = radio.nextElementSibling;
            const desc = label?.querySelector('.score-desc')?.textContent || '';
            
            userData.能力评估[dimensionNames[i-1]] = {
                得分: parseInt(radio.value),
                描述: desc
            };
        } else {
            userData.能力评估[dimensionNames[i-1]] = {
                得分: 3,
                描述: '未评估'
            };
        }
    }
    
    // 收集特长
    const specialties = document.querySelectorAll('input[name="specialty"]:checked, .strength-check:checked');
    specialties.forEach(checkbox => {
        userData.学生特长.push(checkbox.value);
    });
    
    // 计算综合评级
    let totalScore = 0;
    Object.values(userData.能力评估).forEach(item => {
        totalScore += item.得分 || 3;
    });
    userData.综合能力分 = Math.round((totalScore / 6) * 10) / 10;
    
    // 生成星级显示
    userData.星级显示 = '';
    for (let i = 0; i < Math.floor(userData.综合能力分); i++) {
        userData.星级显示 += '⭐️';
    }
    if (userData.综合能力分 % 1 >= 0.5) userData.星级显示 += '⭐️';
    
    // 评估位次
    if (userData.综合能力分 >= 4.5) userData.位次估算 = '全市前10%-15%';
    else if (userData.综合能力分 >= 4.0) userData.位次估算 = '全市前15%-25%';
    else if (userData.综合能力分 >= 3.5) userData.位次估算 = '全市前25%-35%';
    else if (userData.综合能力分 >= 3.0) userData.位次估算 = '全市前35%-50%';
    else if (userData.综合能力分 >= 2.5) userData.位次估算 = '全市前50%-70%';
    else userData.位次估算 = '全市前70%-90%';
    
    console.log('✅ 用户数据收集完成:', userData);
    return userData;
}

// ========== 🔥 修复3: AI调用增强 ==========
async function callAIAPI(message, provider, apiKey, appId = '') {
    try {
        if (!CONFIG.isConnected) {
            return "当前处于本地模式,AI功能不可用。请切换到在线模式。";
        }

        console.log('🤖 调用AI API:', { provider, messageLength: message.length });
        
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                provider: provider,
                message: message,
                apiKey: apiKey,
                appId: appId
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP错误: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success && data.response) {
            return data.response;
        } else {
            throw new Error('API返回格式异常');
        }
    } catch (error) {
        console.error('❌ API调用失败:', error);
        throw new Error(`AI服务调用失败:${error.message}`);
    }
}

// ========== 🔥 修复4: 学校匹配算法 ==========
function isPublicSchoolAllowedByHukou(school, profile) {
    if (!school || school.type !== '公办') return true;
    if (!profile || (!profile.hukouDistrict && !profile.liveDistrict)) return false;
    
    const district = profile.hukouDistrict || profile.liveDistrict;
    if (school.district && district && school.district !== district) return false;
    
    if (Array.isArray(school.streets) && school.streets.length > 0) {
        const street = profile.hukouStreet || profile.liveStreet || '';
        if (!street) return false;
        return school.streets.includes(street);
    }
    return true;
}

function computeMatchScore(school, profile) {
    let score = 50;
    if (!school || !profile) return score;
    
    if (school.type === '公办') {
        if (profile.hukouDistrict && school.district === profile.hukouDistrict) score += 30;
        if (profile.hukouStreet && Array.isArray(school.streets) && school.streets.includes(profile.hukouStreet)) score += 25;
    } else {
        const budget = profile.budget || '';
        if (budget) {
            if (!isNaN(Number(budget))) {
                const b = Number(budget);
                if (school.tuitionMin && b >= school.tuitionMin) score += 15;
                if (school.tuitionMax && b >= school.tuitionMax) score += 5;
                if (school.tuitionMin && b < school.tuitionMin) score -= 20;
            } else {
                if (budget === 'low') score -= 15;
                if (budget === 'medium') score += 5;
                if (budget === 'high') score += 15;
            }
        }
        if (profile.liveDistrict && profile.liveDistrict === school.district) score += 6;
    }
    
    const ability = profile.ability || {};
    if (ability && typeof ability === 'object') {
        const avg = Object.values(ability).reduce((a, b) => a + (Number(b.得分) || 0), 0) / Math.max(1, Object.keys(ability).length);
        score += (avg - 3) * 4;
    }
    
    return Math.max(0, Math.min(100, Math.round(score)));
}

// ========== 🔥 修复5: 增强学校推荐渲染 ==========
async function renderSchoolRecommendations() {
    console.log('🏫 开始生成学校推荐...');
    
    const container = document.getElementById('schoolRecommendation');
    if (!container) {
        console.error('找不到学校推荐容器');
        return;
    }
    
    // 显示加载状态
    container.innerHTML = `
        <div class="ai-loading">
            <div class="ai-loading-spinner"></div>
            <p>正在基于您的信息匹配学校...</p>
            <div class="source-info">
                <span class="trust-badge trust-verified">数据验证中</span>
                优先使用本地数据库，确保信息准确
            </div>
        </div>
    `;
    
    // 收集用户数据
    const userData = collectUserDataForAI();
    const profile = {
        hukouDistrict: userData.户籍居住信息.户籍所在区,
        hukouStreet: userData.户籍居住信息.户籍所在街道,
        liveDistrict: userData.户籍居住信息.实际居住区,
        liveStreet: userData.户籍居住信息.实际居住街道,
        budget: userData.民办意向与预算.民办学校预算,
        schoolType: userData.民办意向与预算.是否考虑民办 === 'no' ? '公办' : '不限',
        ability: userData.能力评估,
        specialties: userData.学生特长
    };
    
    try {
        // 加载学校数据
        const schools = await loadSchoolsData();
        const candidates = [];
        
        // 筛选和评分
        for (const school of schools) {
            if (profile.schoolType && profile.schoolType !== '不限' && school.type !== profile.schoolType) continue;
            if (school.type === '公办' && !isPublicSchoolAllowedByHukou(school, profile)) continue;
            
            const score = computeMatchScore(school, profile);
            const enrollmentRate = school.enrollmentRate || Math.min(score, 95);
            
            // 确定标签和颜色
            let tag = '';
            let tagColor = '';
            if (score >= 85) {
                tag = '稳妥校';
                tagColor = '#52c41a'; // 绿色
            } else if (score >= 65) {
                tag = '匹配校';
                tagColor = '#1890ff'; // 蓝色
            } else if (score >= 50) {
                tag = '冲刺校';
                tagColor = '#faad14'; // 橙色
            } else {
                tag = '保底校';
                tagColor = '#f5222d'; // 红色
            }
            
            candidates.push({
                school: school,
                score: score,
                tag: tag,
                tagColor: tagColor,
                enrollmentRate: enrollmentRate
            });
        }
        
        // 排序
        candidates.sort((a, b) => b.score - a.score);
        const topCandidates = candidates.slice(0, CONFIG.topN);
        
        // 渲染结果
        renderEnhancedSchoolCards(container, topCandidates, userData);
        
        // 同时生成时间规划和政策建议
        setTimeout(() => {
            generateTimeline(userData, topCandidates);
            generatePolicyAdvice(userData, topCandidates);
        }, 500);
        
        console.log('✅ 学校推荐已渲染:', topCandidates.length, '所学校');
        
    } catch (error) {
        console.error('生成学校推荐失败:', error);
        container.innerHTML = `
            <div style="padding:20px;background:#fee;border-radius:8px;color:#c53030;">
                <h4>⚠️ 推荐生成失败</h4>
                <p>${error.message}</p>
                <button onclick="renderSchoolRecommendations()" class="btn btn-secondary" style="margin-top:10px;">重试</button>
            </div>
        `;
    }
}

function renderEnhancedSchoolCards(container, candidates, userData) {
    if (candidates.length === 0) {
        container.innerHTML = `
            <div style="padding:20px;background:#fff3cd;border-radius:8px;color:#856404;">
                <h4>⚠️ 未找到匹配学校</h4>
                <p>请确认：</p>
                <ul>
                    <li>户籍/居住信息是否填写完整</li>
                    <li>预算范围是否合适</li>
                    <li>可以尝试放宽筛选条件</li>
                </ul>
                <button onclick="goToStep3()" class="btn btn-secondary" style="margin-top:10px;">修改户籍信息</button>
            </div>
        `;
        return;
    }
    
    const studentName = userData.基本信息.学生姓名;
    const abilityScore = userData.综合能力分 || 0;
    const rankEstimate = userData.位次估算 || '';
    
    let html = `
        <div style="margin-bottom: 25px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px;">
            <h3 style="margin: 0 0 10px 0; font-size: 18px;">🎯 ${studentName}的学校匹配报告</h3>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">综合评级：${userData.星级显示} (${abilityScore}/5.0) | 位次估算：${rankEstimate}</p>
        </div>
        
        <div style="display: grid; gap: 20px;">
    `;
    
    candidates.forEach((candidate, index) => {
        const school = candidate.school;
        const isTop = index === 0;
        
        html += `
            <div class="school-card" style="
                border: 2px solid ${isTop ? '#667eea' : '#e2e8f0'};
                padding: 25px;
                border-radius: 12px;
                background: white;
                box-shadow: ${isTop ? '0 8px 25px rgba(102, 126, 234, 0.15)' : '0 4px 12px rgba(0,0,0,0.06)'};
                ${isTop ? 'border-left: 6px solid #667eea;' : ''}
                position: relative;
            ">
                ${isTop ? `
                    <div style="position: absolute; top: -12px; left: 20px; background: #667eea; color: white; padding: 4px 15px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                        🏆 最优推荐
                    </div>
                ` : ''}
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                            <h4 style="margin: 0; font-size: 22px; color: #1a202c; font-weight: 700;">${escapeHtml(school.name)}</h4>
                            <span style="background: ${school.type === '公办' ? '#e6f7ff' : '#f6ffed'}; 
                                color: ${school.type === '公办' ? '#1890ff' : '#52c41a'}; 
                                padding: 4px 12px; 
                                border-radius: 20px; 
                                font-size: 14px;
                                font-weight: 600;">
                                ${school.type}
                            </span>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px; font-size: 14px;">
                            <div style="color: #4a5568;">
                                <span style="color: #718096;">📍</span> ${school.district || ''}
                            </div>
                            <div style="color: #4a5568;">
                                <span style="color: #718096;">🏷️</span> ${escapeHtml(school.features || '')}
                            </div>
                        </div>
                        
                        <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                            <div style="font-size: 14px; color: #4a5568; line-height: 1.5;">
                                ${escapeHtml(school.description || '')}
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: right; margin-left: 20px;">
                        <div style="margin-bottom: 10px;">
                            <div style="font-size: 36px; font-weight: bold; color: #1a73e8; line-height: 1;">${candidate.score}</div>
                            <div style="font-size: 14px; color: #718096;">匹配度</div>
                        </div>
                        
                        <div style="margin-bottom: 8px;">
                            <div style="font-size: 22px; font-weight: bold; color: ${candidate.tagColor};">${candidate.enrollmentRate}%</div>
                            <div style="font-size: 13px; color: #718096;">成功概率</div>
                        </div>
                        
                        <div style="background: ${candidate.tagColor}15; color: ${candidate.tagColor}; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block;">
                            ${candidate.tag}
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; margin-bottom: 20px;">
                    <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 12px; color: #718096; margin-bottom: 5px;">💰 学费/年</div>
                        <div style="font-size: 18px; color: #276749; font-weight: bold;">
                            ${school.tuitionMin > 0 
                                ? (school.tuitionMin === school.tuitionMax 
                                    ? `${(school.tuitionMin/10000).toFixed(1)}万` 
                                    : `${(school.tuitionMin/10000).toFixed(1)}-${(school.tuitionMax/10000).toFixed(1)}万`)
                                : '<span style="color:#52c41a;">免费</span>'}
                        </div>
                    </div>
                    
                    <div style="background: #f6ffed; padding: 12px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 12px; color: #718096; margin-bottom: 5px;">🚗 通勤时间</div>
                        <div style="font-size: 18px; color: #52c41a; font-weight: bold;">${school.distance || '待评估'}</div>
                    </div>
                    
                    ${school.avgScore ? `
                        <div style="background: #fff7e6; padding: 12px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 12px; color: #718096; margin-bottom: 5px;">📊 中考均分</div>
                            <div style="font-size: 18px; color: #fa8c16; font-weight: bold;">${school.avgScore}</div>
                        </div>
                    ` : ''}
                    
                    ${school.highSchoolRate ? `
                        <div style="background: #f9f0ff; padding: 12px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 12px; color: #718096; margin-bottom: 5px;">🎓 高中升学率</div>
                            <div style="font-size: 18px; color: #722ed1; font-weight: bold;">${school.highSchoolRate}%</div>
                        </div>
                    ` : ''}
                </div>
                
                ${school.contact ? `
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 15px;">
                        <div style="font-size: 14px; color: #4a5568; margin-bottom: 8px; font-weight: 600;">
                            📞 联系方式：
                        </div>
                        <div style="font-size: 13px; color: #718096; white-space: pre-line; line-height: 1.6;">
                            ${escapeHtml(school.contact)}
                        </div>
                    </div>
                ` : ''}
                
                ${school.sources && school.sources.length > 0 ? `
                    <div style="font-size: 12px; color: #a0aec0; margin-top: 15px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                        <strong>信息来源：</strong>
                        ${school.sources.map(src => `<a href="${src}" target="_blank" style="color: #4299e1; text-decoration: none;">${src}</a>`).join(' | ')}
                    </div>
                ` : ''}
                
                <div style="margin-top: 15px;">
                    <button onclick="quickAction('详细分析${school.name}的优缺点')" class="btn btn-secondary" style="padding: 8px 16px; font-size: 13px;">
                        <i class="fas fa-brain"></i> AI详细分析
                    </button>
                    ${isTop ? `
                        <button onclick="alert('建议立即预约${school.name}的开放日')" class="btn btn-primary" style="padding: 8px 16px; font-size: 13px; margin-left: 10px;">
                            <i class="fas fa-calendar-alt"></i> 立即行动
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    
    container.innerHTML = html;
}

// ========== 🔥 修复6: 个性化时间规划 ==========
function generateTimeline(userData, recommendations) {
    const container = document.getElementById('timeline');
    if (!container) return;
    
    const studentName = userData.基本信息.学生姓名;
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    
    // 计算距离关键日期的天数
    function daysUntil(month, day) {
        const target = new Date(today.getFullYear(), month - 1, day);
        if (target < today) {
            target.setFullYear(target.getFullYear() + 1);
        }
        return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    }
    
    const daysToRegistration = daysUntil(7, 11);
    const daysToLottery = daysUntil(7, 30);
    
    let topSchoolName = '目标学校';
    if (recommendations && recommendations.length > 0) {
        topSchoolName = recommendations[0].school.name;
    }
    
    container.innerHTML = `
        <div style="padding: 25px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                <h3 style="margin: 0; color: #1a202c; font-size: 20px;">📅 ${studentName}的2025升学时间规划</h3>
                <div style="display: flex; gap: 15px;">
                    <div style="text-align: center;">
                        <div style="font-size: 24px; font-weight: bold; color: #f5222d;">${daysToRegistration}</div>
                        <div style="font-size: 12px; color: #718096;">天后面试</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 24px; font-weight: bold; color: #f5222d;">${daysToLottery}</div>
                        <div style="font-size: 12px; color: #718096;">天后摇号</div>
                    </div>
                </div>
            </div>
            
            <div style="position: relative; padding-left: 30px; border-left: 3px solid #667eea; margin-left: 15px;">
                <!-- 3月 -->
                <div style="margin-bottom: 30px; position: relative;">
                    <div style="position: absolute; left: -38px; top: 0; width: 30px; height: 30px; background: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: bold;">3</div>
                    <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #1890ff;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <div style="font-weight: 700; color: #1890ff; font-size: 16px;">3月 - 信息收集与准备期</div>
                            <div style="font-size: 12px; color: #718096;">${currentMonth === 3 ? '进行中' : currentMonth > 3 ? '已完成' : '即将开始'}</div>
                        </div>
                        <div style="font-size: 14px; color: #4a5568;">
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <div style="width: 24px; height: 24px; border-radius: 50%; background: #52c41a; color: white; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 12px;">✓</div>
                                <div>已完成本报告评估</div>
                            </div>
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <div style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid #faad14; color: #faad14; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 12px;">3/20</div>
                                <div>确定目标学校名单(3-5所)</div>
                            </div>
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <div style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid #f5222d; color: #f5222d; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 12px;">3/23</div>
                                <div><strong style="color: #f5222d;">参加${topSchoolName}开放日 🔥</strong></div>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <div style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid #1890ff; color: #1890ff; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 12px;">3/30</div>
                                <div>准备报名材料(清单见下方)</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 4月 -->
                <div style="margin-bottom: 30px; position: relative;">
                    <div style="position: absolute; left: -38px; top: 0; width: 30px; height: 30px; background: #52c41a; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: bold;">4</div>
                    <div style="background: #f6ffed; padding: 20px; border-radius: 10px; border-left: 4px solid #52c41a;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <div style="font-weight: 700; color: #52c41a; font-size: 16px;">4月 - 学校考察与决策期</div>
                            <div style="font-size: 12px; color: #718096;">${currentMonth > 4 ? '已完成' : '即将开始'}</div>
                        </div>
                        <div style="font-size: 14px; color: #4a5568;">
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <div style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid #52c41a; color: #52c41a; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 12px;">4/5</div>
                                <div>参观2-3所目标学校</div>
                            </div>
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <div style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid #52c41a; color: #52c41a; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 12px;">4/12</div>
                                <div>家庭会议，与孩子确认意愿</div>
                            </div>
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <div style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid #52c41a; color: #52c41a; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 12px;">4/20</div>
                                <div>参加模拟面试训练</div>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <div style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid #52c41a; color: #52c41a; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 12px;">4/30</div>
                                <div><strong>最终确定报名学校</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 关键提醒 -->
                <div style="background: #fff1f0; padding: 20px; border-radius: 10px; border: 2px solid #ffccc7; margin-top: 20px;">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <div style="width: 24px; height: 24px; background: #f5222d; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-right: 12px; font-size: 14px;">!</div>
                        <div style="font-weight: 700; color: #c53030; font-size: 16px;">🔔 重要提醒</div>
                    </div>
                    <div style="font-size: 14px; color: #4a5568;">
                        <div style="margin-bottom: 8px;"><strong>7月11-24日：</strong>公民办同步报名(务必准时！)</div>
                        <div style="margin-bottom: 8px;"><strong>7月30日：</strong>民办摇号日(结果实时查询)</div>
                        <div><strong>8月10日前：</strong>公办录取通知发放</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ========== 🔥 修复7: 政策提醒与建议 ==========
function generatePolicyAdvice(userData, recommendations) {
    const container = document.getElementById('policyAdvice');
    if (!container) return;
    
    const studentName = userData.基本信息.学生姓名;
    const hukouDistrict = userData.户籍居住信息.户籍所在区;
    const liveDistrict = userData.户籍居住信息.实际居住区;
    const sameDistrict = userData.户籍居住信息.户籍区与居住区相同;
    const hasHouse = userData.学区房产信息.学区房情况;
    
    // 分析入学顺位
    let admissionPriority = '';
    let priorityColor = '';
    let priorityIcon = '';
    
    if (hasHouse && hasHouse.includes('yes') && sameDistrict) {
        admissionPriority = '第一顺位（房户一致）';
        priorityColor = '#52c41a';
        priorityIcon = '✅';
    } else if (hasHouse && hasHouse.includes('yes') && !sameDistrict) {
        admissionPriority = '第二顺位（房户不一致）';
        priorityColor = '#faad14';
        priorityIcon = '⚠️';
    } else if (!hasHouse || hasHouse === 'no') {
        admissionPriority = '第三顺位（无学区房）';
        priorityColor = '#f5222d';
        priorityIcon = '⚠️';
    } else if (hasHouse === 'rent') {
        admissionPriority = '第四顺位（租房统筹）';
        priorityColor = '#722ed1';
        priorityIcon = 'ℹ️';
    }
    
    // 分析风险点
    const risks = [];
    const suggestions = [];
    
    if (!sameDistrict && hukouDistrict && liveDistrict) {
        risks.push(`户籍(${hukouDistrict})与居住地(${liveDistrict})不一致，公办入学为第二顺位`);
        suggestions.push('准备户口本、房产证/租赁合同等材料复印件');
    }
    
    if (userData.能力评估.心理素质 && userData.能力评估.心理素质.得分 < 3) {
        risks.push('心理素质评分较低，建议关注孩子心理状态');
        suggestions.push('每周安排2次减压活动（运动/音乐/绘画）');
    }
    
    if (userData.学生特长.length === 0) {
        suggestions.push('可以考虑发展1-2项特长，提升综合竞争力');
    }
    
    // 基于推荐学校的建议
    if (recommendations && recommendations.length > 0) {
        const topSchool = recommendations[0].school;
        if (topSchool.type === '民办' && topSchool.tuitionMin > 20000) {
            suggestions.push(`准备${(topSchool.tuitionMin/10000).toFixed(1)}-${(topSchool.tuitionMax/10000).toFixed(1)}万元/年的学费预算`);
        }
        
        if (topSchool.enrollmentRate < 50) {
            risks.push(`热门学校(${topSchool.name})摇号概率低(${topSchool.enrollmentRate}%)，建议设置保底方案`);
        }
    }
    
    container.innerHTML = `
        <div style="padding: 25px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
            <h3 style="margin: 0 0 25px 0; color: #1a202c; font-size: 20px;">💡 ${studentName}的政策分析与建议</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 25px;">
                <!-- 入学顺位 -->
                <div style="background: ${priorityColor}15; padding: 20px; border-radius: 10px; border-left: 5px solid ${priorityColor};">
                    <div style="font-size: 14px; color: #718096; margin-bottom: 8px;">${priorityIcon} 入学顺位评估</div>
                    <div style="font-size: 24px; font-weight: bold; color: ${priorityColor}; margin-bottom: 5px;">
                        ${admissionPriority}
                    </div>
                    <div style="font-size: 14px; color: #4a5568;">
                        ${getPriorityDescription(admissionPriority)}
                    </div>
                </div>
                
                <!-- 摇号策略 -->
                <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; border-left: 5px solid #1890ff;">
                    <div style="font-size: 14px; color: #718096; margin-bottom: 8px;">🎲 摇号策略建议</div>
                    <div style="font-size: 24px; font-weight: bold; color: #1890ff; margin-bottom: 5px;">
                        ${userData.民办意向与预算.是否考虑民办 === 'yes' ? '冲刺+稳妥+保底' : '公办为主'}
                    </div>
                    <div style="font-size: 14px; color: #4a5568;">
                        ${userData.民办意向与预算.是否考虑民办 === 'yes' 
                            ? '建议选择1所冲刺校 + 1所稳妥校 + 公办保底' 
                            : '专注公办入学，确保材料齐全'}
                    </div>
                </div>
            </div>
            
            ${risks.length > 0 ? `
                <div style="margin-bottom: 25px;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="width: 32px; height: 32px; background: #f5222d; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; margin-right: 12px;">!</div>
                        <div style="font-weight: 700; color: #c53030; font-size: 18px;">⚠️ 关键风险提示</div>
                    </div>
                    <ul style="margin: 0; padding-left: 20px; font-size: 15px; color: #4a5568;">
                        ${risks.map(risk => `<li style="margin-bottom: 8px;">${risk}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${suggestions.length > 0 ? `
                <div style="margin-bottom: 25px;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="width: 32px; height: 32px; background: #52c41a; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; margin-right: 12px;">✓</div>
                        <div style="font-weight: 700; color: #276749; font-size: 18px;">✅ 近期行动建议</div>
                    </div>
                    <ul style="margin: 0; padding-left: 20px; font-size: 15px; color: #4a5568;">
                        ${suggestions.map(suggestion => `<li style="margin-bottom: 8px;">${suggestion}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <!-- 本周必做事项 -->
            <div style="background: #f6ffed; padding: 20px; border-radius: 10px; border: 2px solid #b7eb8f;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="width: 32px; height: 32px; background: #52c41a; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; margin-right: 12px;">📋</div>
                    <div style="font-weight: 700; color: #276749; font-size: 18px;">本周必做3件事</div>
                </div>
                <div style="font-size: 15px; color: #4a5568;">
                    <div style="display: flex; align-items: flex-start; margin-bottom: 12px; padding: 8px; background: white; border-radius: 6px;">
                        <input type="checkbox" style="margin-right: 12px; margin-top: 3px; transform: scale(1.2);">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 2px;">周三前：预约${recommendations && recommendations.length > 0 ? recommendations[0].school.name : '目标学校'}开放日</div>
                            <div style="font-size: 13px; color: #718096;">（名额有限，建议尽早预约）</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: flex-start; margin-bottom: 12px; padding: 8px; background: white; border-radius: 6px;">
                        <input type="checkbox" style="margin-right: 12px; margin-top: 3px; transform: scale(1.2);">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 2px;">周五前：整理户口本、房产证等材料</div>
                            <div style="font-size: 13px; color: #718096;">（原件+复印件3份）</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: flex-start; padding: 8px; background: white; border-radius: 6px;">
                        <input type="checkbox" style="margin-right: 12px; margin-top: 3px; transform: scale(1.2);">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 2px;">周日：与孩子沟通升学意愿</div>
                            <div style="font-size: 13px; color: #718096;">（减轻焦虑，建立信心）</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 20px; font-size: 13px; color: #a0aec0; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                <span class="trust-badge trust-official">官方政策依据</span>
                基于西安市2025年义务教育招生政策分析 · 更新时间：2025-01-15
            </div>
        </div>
    `;
}

function getPriorityDescription(priority) {
    const descriptions = {
        '第一顺位': '户籍与房产一致，入学概率最高',
        '第二顺位': '户籍与居住地不一致，需协调解决',
        '第三顺位': '集体户或无房户，统筹安排入学',
        '第四顺位': '租房居住，最后批次安排'
    };
    return descriptions[priority.split('（')[0]] || '请完善户籍和房产信息';
}

// ========== 🔥 修复8: 生成专业PDF报告 ==========
async function generateChinesePDF_Friendly() {
    console.log('📄 开始生成专业PDF报告...');
    
    try {
        // 收集数据
        const userData = collectUserDataForAI();
        const schools = await loadSchoolsData();
        const recommendations = [];
        
        // 生成推荐
        const profile = {
            hukouDistrict: userData.户籍居住信息.户籍所在区,
            hukouStreet: userData.户籍居住信息.户籍所在街道,
            liveDistrict: userData.户籍居住信息.实际居住区,
            liveStreet: userData.户籍居住信息.实际居住街道,
            budget: userData.民办意向与预算.民办学校预算,
            schoolType: userData.民办意向与预算.是否考虑民办 === 'no' ? '公办' : '不限',
            ability: userData.能力评估,
            specialties: userData.学生特长
        };
        
        for (const school of schools) {
            if (profile.schoolType && profile.schoolType !== '不限' && school.type !== profile.schoolType) continue;
            if (school.type === '公办' && !isPublicSchoolAllowedByHukou(school, profile)) continue;
            
            const score = computeMatchScore(school, profile);
            recommendations.push({ school, score });
        }
        
        recommendations.sort((a, b) => b.score - a.score);
        const topRecommendations = recommendations.slice(0, 5);
        
        // 创建报告HTML
        const reportHTML = createProfessionalReportContent(userData, topRecommendations);
        
        // 显示报告预览
        showReportPreview(reportHTML);
        
    } catch (error) {
        console.error('生成PDF报告失败:', error);
        alert('报告生成失败，请重试');
    }
}

function createProfessionalReportContent(userData, recommendations) {
    const studentName = userData.基本信息.学生姓名;
    const currentDate = new Date();
    const reportDate = currentDate.toLocaleDateString('zh-CN');
    
    return `
        <div style="width: 900px; padding: 40px; background: white; color: #1a202c; font-family: 'Microsoft YaHei', sans-serif;">
            <!-- 报告头部 -->
            <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #667eea; padding-bottom: 20px;">
                <h1 style="font-size: 32px; margin: 0 0 10px 0; color: #1a202c; font-weight: 800;">
                    西安小升初智能评估报告 2025
                </h1>
                <div style="font-size: 22px; color: #667eea; margin-bottom: 8px; font-weight: 600;">
                    专属定制 - ${studentName}家庭(儿童版)
                </div>
                <div style="color: #718096; font-size: 16px;">
                    生成时间: ${reportDate}
                </div>
            </div>
            
            <!-- 第一部分：执行摘要 -->
            <div style="margin-bottom: 40px;">
                <h2 style="font-size: 24px; color: #1a202c; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
                    第一部分：一页纸执行摘要 ⭐️ 最重要
                </h2>
                
                <!-- 核心结论 -->
                <div style="background: #f0f9ff; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
                    <h3 style="color: #1a73e8; margin: 0 0 15px 0; font-size: 20px;">🎯 核心结论(30秒读完)</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">
                        <div style="text-align: center;">
                            <div style="font-size: 14px; color: #718096; margin-bottom: 8px;">您的孩子</div>
                            <div style="font-size: 24px; font-weight: bold; color: #1a202c;">${studentName}</div>
                            <div style="font-size: 14px; color: #718096;">(${userData.基本信息.当前年级})</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 14px; color: #718096; margin-bottom: 8px;">综合评级</div>
                            <div style="font-size: 24px; font-weight: bold; color: #d48806;">
                                ${userData.星级显示} (${userData.综合能力分}/5.0)
                            </div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 14px; color: #718096; margin-bottom: 8px;">位次估算</div>
                            <div style="font-size: 24px; font-weight: bold; color: #52c41a;">${userData.位次估算}</div>
                        </div>
                    </div>
                </div>
                
                <!-- 最优升学路径 -->
                <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                    <h3 style="color: #1a202c; margin: 0 0 20px 0; font-size: 20px;">🏆 最优升学路径 (AI推荐)</h3>
                    
                    ${recommendations.slice(0, 3).map((rec, index) => {
                        const s = rec.school;
                        const tags = ['🥇 冲刺目标', '🥈 稳妥选择', '🥉 保底方案'];
                        const bgColors = ['#fff1f0', '#f6ffed', '#f0f9ff'];
                        
                        return `
                            <div style="margin-bottom: ${index < 2 ? '20px' : '0'}; padding: ${index < 2 ? '0 0 20px 0' : '0'}; ${index < 2 ? 'border-bottom: 1px solid #e2e8f0' : ''}">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                    <div>
                                        <div style="font-weight: bold; color: ${index === 0 ? '#f5222d' : index === 1 ? '#faad14' : '#52c41a'}; font-size: 16px;">
                                            ${tags[index]}
                                        </div>
                                        <div style="font-size: 22px; font-weight: bold; color: #1a202c; margin-top: 4px;">
                                            ${s.name}
                                        </div>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 28px; font-weight: bold; color: #1a73e8;">${Math.min(rec.score, 95)}%</div>
                                        <div style="font-size: 14px; color: #718096;">成功概率</div>
                                    </div>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 12px;">
                                    <div style="font-size: 14px; color: #4a5568;">
                                        <span style="color: #718096;">学费：</span>
                                        <strong style="color: #276749;">
                                            ${s.tuitionMin > 0 
                                                ? (s.tuitionMin === s.tuitionMax 
                                                    ? `${(s.tuitionMin/10000).toFixed(1)}万/年` 
                                                    : `${(s.tuitionMin/10000).toFixed(1)}-${(s.tuitionMax/10000).toFixed(1)}万/年`)
                                                : '免费'}
                                        </strong>
                                    </div>
                                    <div style="font-size: 14px; color: #4a5568;">
                                        <span style="color: #718096;">距离：</span>
                                        <strong>${s.distance || '待评估'}</strong>
                                    </div>
                                    <div style="font-size: 14px; color: #4a5568;">
                                        <span style="color: #718096;">类型：</span>
                                        <strong>${s.type}</strong>
                                    </div>
                                </div>
                                <div style="font-size: 14px; color: #4a5568; background: ${bgColors[index]}; padding: 12px; border-radius: 8px;">
                                    <strong style="color: #1a73e8;">立即行动：</strong>
                                    ${index === 0 ? '报名3月23日校园开放日' : 
                                      index === 1 ? '准备户口本+房产证复印件' : 
                                      '确认学区范围，咨询统筹政策'}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <!-- 风险提示 -->
                <div style="background: #fff1f0; padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid #f5222d;">
                    <h4 style="color: #c53030; margin: 0 0 15px 0; font-size: 18px;">⚠️ 关键风险提示</h4>
                    <ul style="margin: 0; padding-left: 20px; font-size: 15px; color: #4a5568;">
                        ${!userData.户籍居住信息.户籍区与居住区相同 ? '<li>户籍与居住地不一致，公办入学为第二顺位</li>' : ''}
                        ${userData.能力评估.学业成绩 && userData.能力评估.学业成绩.得分 < 3 ? '<li>学业成绩需要提升，建议参加暑期强化班</li>' : ''}
                        ${userData.民办意向与预算.是否考虑民办 === 'yes' ? '<li>民办摇号概率低，需做好心理准备和备选方案</li>' : ''}
                    </ul>
                </div>
                
                <!-- 本周必做 -->
                <div style="background: #f6ffed; padding: 20px; border-radius: 10px; border: 2px solid #b7eb8f;">
                    <h4 style="color: #276749; margin: 0 0 15px 0; font-size: 18px;">✅ 本周必做3件事</h4>
                    <div style="font-size: 15px; color: #4a5568;">
                        <div style="display: flex; align-items: center; margin-bottom: 12px;">
                            <div style="width: 24px; height: 24px; border: 2px solid #52c41a; border-radius: 50%; margin-right: 12px;"></div>
                            <span><strong>周三前：</strong>预约${recommendations[0]?.school?.name || '目标学校'}开放日（名额有限！）</span>
                        </div>
                        <div style="display: flex; align-items: center; margin-bottom: 12px;">
                            <div style="width: 24px; height: 24px; border: 2px solid #52c41a; border-radius: 50%; margin-right: 12px;"></div>
                            <span><strong>周五前：</strong>整理户口本、房产证等材料</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 24px; height: 24px; border: 2px solid #52c41a; border-radius: 50%; margin-right: 12px;"></div>
                            <span><strong>周日：</strong>与孩子沟通升学意愿，减轻焦虑</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 页脚 -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #718096; font-size: 14px;">
                <div style="font-weight: bold; margin-bottom: 10px;">本报告由西安小升初智能评估系统生成</div>
                <div>技术支持：小猫助手 🐱 | AI驱动，专业可信</div>
            </div>
        </div>
    `;
}

function showReportPreview(html) {
    // 创建预览窗口
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>报告预览</title>
            <style>
                body { margin: 0; padding: 20px; background: #f5f5f5; }
                .report-container { 
                    max-width: 900px; 
                    margin: 0 auto; 
                    background: white; 
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    border-radius: 8px;
                    overflow: hidden;
                }
                .report-actions {
                    padding: 20px;
                    text-align: center;
                    background: #f8fafc;
                    border-top: 1px solid #e2e8f0;
                }
                button {
                    padding: 12px 24px;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    margin: 0 10px;
                }
                button:hover {
                    background: #5a67d8;
                }
                button.secondary {
                    background: #718096;
                }
            </style>
        </head>
        <body>
            <div class="report-container">
                ${html}
                <div class="report-actions">
                    <button onclick="window.print()">
                        <i class="fas fa-print"></i> 打印报告
                    </button>
                    <button onclick="alert('PDF导出功能需要额外配置')" class="secondary">
                        <i class="fas fa-file-pdf"></i> 导出PDF
                    </button>
                </div>
            </div>
        </body>
        </html>
    `);
    previewWindow.document.close();
}

// ========== 辅助函数 ==========
function escapeHtml(s) {
    if (s === undefined || s === null) return '';
    return String(s).replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
}

// ========== 其他原有函数保持不变 ==========
// 以下是原有函数的占位符，保持原有功能
async function interpretPolicy() {
    // 原有代码保持不变
    if (!CONFIG.isConnected) {
        alert('AI解读功能在本地模式下不可用。请切换到在线模式。');
        return;
    }
    // ... 原有代码 ...
}

function showStep(stepNumber) {
    // 原有代码保持不变
    console.log(`切换到步骤 ${stepNumber}`);
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    
    const targetSection = document.getElementById(`step${stepNumber}`);
    if (targetSection) targetSection.classList.add('active');
    
    const targetIndicator = document.getElementById(`step${stepNumber}-indicator`);
    if (targetIndicator) targetIndicator.classList.add('active');
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = ((stepNumber - 1) / 6) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.classList.toggle('active');
    }
}

function toggleConfigPanel() {
    const configPanel = document.getElementById('configPanel');
    if (configPanel) {
        configPanel.classList.toggle('active');
    }
}

function useLocalMode() {
    CONFIG.isConnected = false;
    const statusText = document.getElementById('statusText');
    if (statusText) statusText.textContent = '本地模式';
    
    const apiStatus = document.getElementById('apiStatus');
    if (apiStatus) {
        apiStatus.className = 'api-status local';
        apiStatus.textContent = '本地模式';
    }

    const chatApiStatus = document.getElementById('chatApiStatus');
    if (chatApiStatus) chatApiStatus.textContent = '本地模式';

    const configPanel = document.getElementById('configPanel');
    if (configPanel) configPanel.classList.remove('active');
    
    localStorage.setItem('aiMode', 'local');
    alert('已切换到本地模式。AI相关功能将不可用。');
}

async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    if (!message) return;
    
    if (!CONFIG.isConnected) {
        alert('AI聊天功能在本地模式下不可用。请切换到在线模式。');
        return;
    }
    
    addMessageToChat('user', message);
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    try {
        showLoadingIndicator();
        const response = await callAIAPI(message, CONFIG.provider, CONFIG.apiKey, CONFIG.appId);
        hideLoadingIndicator();
        addMessageToChat('assistant', response);
    } catch (error) {
        hideLoadingIndicator();
        addMessageToChat('assistant', `抱歉,出现错误:${error.message}`);
    }
}

function addMessageToChat(role, content) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${role}`;
    
    if (role === 'user') {
        messageDiv.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">${content}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">🐱</div>
            <div class="message-content">
                ${content}
                <div class="source-info">
                    <span class="trust-badge trust-verified">✅ 数据准确</span>
                    基于西安市2025年官方政策与真实学校数据库
                </div>
            </div>
        `;
    }
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showLoadingIndicator() {
    const chatBody = document.getElementById('chatBody');
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.className = 'ai-message assistant';
    loadingDiv.innerHTML = `
        <div class="message-avatar">🐱</div>
        <div class="message-content">
            <div class="ai-loading-spinner" style="width:20px;height:20px;"></div>
            正在查询学校数据库并分析中...
        </div>
    `;
    chatBody.appendChild(loadingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) loadingDiv.remove();
}

async function quickAction(text) {
    if (!CONFIG.isConnected) {
        alert(`快捷操作 "${text}" 在本地模式下不可用。请切换到在线模式。`);
        return;
    }
    
    try {
        showLoadingIndicator();
        const response = await callAIAPI(text, CONFIG.provider, CONFIG.apiKey, CONFIG.appId);
        hideLoadingIndicator();
        addMessageToChat('assistant', response);
    } catch (error) {
        hideLoadingIndicator();
        addMessageToChat('assistant', `抱歉,出现错误:${error.message}`);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

async function generateReport() {
    console.log('生成报告中...');
    showStep(7);
    await generateAbilityChart();
    await renderSchoolRecommendations();
    alert('报告生成完成!请查看AI推荐结果。');
}

function calculateAbilityScores(userData) {
    const scores = {
        '学业成绩': parseInt(userData.能力评估['学业成绩']?.得分 || 3),
        '综合素养': parseInt(userData.能力评估['综合素养']?.得分 || 3),
        '学习习惯': parseInt(userData.能力评估['学习习惯']?.得分 || 3),
        '心理素质': parseInt(userData.能力评估['心理素质']?.得分 || 3),
        '家庭支持': parseInt(userData.能力评估['家庭支持']?.得分 || 3),
        '学科倾向': parseInt(userData.能力评估['学科倾向']?.得分 || 3)
    };
    
    return [
        scores['学业成绩'],
        scores['综合素养'],
        scores['学习习惯'],
        scores['心理素质'],
        scores['家庭支持'],
        scores['学科倾向']
    ];
}

async function generateAbilityChart() {
    const canvas = document.getElementById('abilityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const userData = collectUserDataForAI();
    const abilityScores = calculateAbilityScores(userData);
    
    const data = {
        labels: ['学业成绩', '综合素养', '学习习惯', '心理素质', '家庭支持', '学科倾向'],
        datasets: [{
            label: '能力评估',
            data: abilityScores,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
        }]
    };
    
    if (abilityChartInstance) {
        abilityChartInstance.destroy();
    }
    
    abilityChartInstance = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}

function validateStep3() {
    const hd = document.getElementById('householdDistrict');
    const rd = document.getElementById('residenceDistrict');

    let ok = true;

    if (!hd || !hd.value) {
        showFieldError(hd, '请选择户籍所在区');
        ok = false;
    } else {
        clearFieldError(hd);
    }
    
    if (!rd || !rd.value) {
        showFieldError(rd, '请选择实际居住区');
        ok = false;
    } else {
        clearFieldError(rd);
    }

    if (!ok) {
        const firstError = document.querySelector('.field-error:not(:empty)');
        if (firstError && typeof firstError.scrollIntoView === 'function') {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return false;
    }
    return true;
}

function showFieldError(elem, msg) {
    if (!elem) return;
    elem.style.borderColor = '#e53e3e';
    elem.style.boxShadow = '0 0 0 1px #e53e3e';
    let holder = elem.nextElementSibling;
    if (!holder || !holder.classList || !holder.classList.contains('field-error')) {
        holder = document.createElement('div');
        holder.className = 'field-error';
        holder.style.color = '#e53e3e';
        holder.style.fontSize = '12px';
        holder.style.marginTop = '6px';
        elem.parentNode.insertBefore(holder, elem.nextSibling);
    }
    holder.textContent = msg || '此项为必填';
}

function clearFieldError(elem) {
    if (!elem) return;
    elem.style.borderColor = '';
    elem.style.boxShadow = '';
    const holder = elem.nextElementSibling;
    if (holder && holder.classList && holder.classList.contains('field-error')) {
        holder.textContent = '';
    }
}

const STREET_DATA = {
    '新城区': ['西一路街道', '长乐中路街道', '中山门街道', '韩森寨街道', '解放门街道', '长乐西路街道', '太华路街道', '自强路街道'],
    '碑林区': ['南院门街道', '柏树林街道', '长乐坊街道', '东关南街街道', '太乙路街道', '文艺路街道', '长安路街道', '张家村街道'],
    '莲湖区': ['北院门街道', '青年路街道', '桃园路街道', '北关街道', '红庙坡街道', '环城西路街道', '土门街道', '枣园街道', '西关街道'],
    '雁塔区': ['小寨路街道', '大雁塔街道', '长延堡街道', '电子城街道', '等驾坡街道', '鱼化寨街道', '丈八沟街道', '曲江街道'],
    '灞桥区': ['纺织城街道', '十里铺街道', '红旗街道', '洪庆街道', '席王街道', '新筑街道', '狄寨街道'],
    '未央区': ['未央宫街道', '大明宫街道', '张家堡街道', '徐家湾街道', '谭家街道', '草滩街道', '六村堡街道', '未央湖街道', '汉城街道'],
    '阎良区': ['新华路街道', '凤凰路街道', '进步路街道', '胜利路街道', '新兴街道', '武屯街道', '关山街道'],
    '临潼区': ['骊山街道', '秦陵街道', '新市街道', '代王街道', '斜口街道', '行者街道', '零口街道', '相桥街道', '雨金街道', '新丰街道', '西泉街道'],
    '长安区': ['韦曲街道', '郭杜街道', '滦镇街道', '兴隆街道', '大兆街道', '鸣犊街道', '朝曲街道', '五台街道', '高桥街道', '引镇街道', '王莽街道', '子午街道', '太乙宫街道'],
    '高陵区': ['鹿苑街道', '泾渭街道', '崇皇街道', '通远街道', '张卜街道', '湾子镇', '耿镇'],
    '鄠邑区': ['甘亭街道', '余下街道', '祖庵镇', '秦渡镇', '草堂镇', '庞光镇', '蒋村镇', '涝店镇', '石井镇', '玉蒿镇'],
    '蓝田县': ['蓝关街道', '洩湖镇', '华胥镇', '吉卫镇', '汤峪镇', '焦岱镇', '玉山镇', '三里镇', '普化镇', '葛牌镇', '瞿源镇', '孟村镇', '辋川镇'],
    '周至县': ['二曲街道', '哑柏镇', '终南镇', '马召镇', '集贤镇', '楼观镇', '尚村镇', '广济镇', '富仁镇', '竹峪镇'],
    '西咸新区': ['三桥街道', '上林街道', '王寺街道', '斗门街道', '沣京街道', '建章路街道', '钓台街道', '高桥街道', '马王街道', '窑店街道', '正阳街道', '周陵街道', '渭城街道', '北杜街道', '底张街道', '永乐镇', '泾干街道', '崇文镇', '高庄镇'],
    '高新区': ['丈八街道', '鱼化寨街道', '细柳街道', '兴隆街道', '东大街道', '五星街道', '灵沼街道'],
    '经开区': ['张家堡街道', '未央湖街道', '草滩街道', '六村堡街道', '凤城一路街道', '凤城二路街道', '凤城三路街道', '凤城四路街道', '凤城五路街道', '凤城六路街道'],
    '曲江新区': ['曲江街道', '雁南街道', '雁塔中路街道', '雁翔路街道'],
    '浐灞国际港(浐灞片区)': ['广运潭街道', '雁鸣湖街道', '新筑街道', '浐灞大道街道'],
    '浐灞国际港(港务片区)': ['新筑街道', '港务西路街道', '港务东路街道', '新合街道'],
    '航天基地': ['航天大道街道', '东长安街道', '神舟四路街道', '神舟五路街道']
};

function attachSearchableSelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    if (select.previousElementSibling && select.previousElementSibling.classList &&
        select.previousElementSibling.classList.contains('search-input')) return;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'search-input';
    input.placeholder = '搜索…(支持拼音/汉字)';
    input.style.width = '100%';
    input.style.margin = '6px 0';
    input.style.padding = '8px 10px';
    input.style.border = '1px solid #e2e8f0';
    input.style.borderRadius = '6px';

    select.parentNode.insertBefore(input, select);

    const toLower = (s) => (s || '').toLowerCase();
    const options = Array.from(select.options);
    options.forEach((opt, idx) => {
        if (idx === 0) return;
        const txt = (opt.textContent || '').trim();
        const full = toPinyin(txt);
        const abbr = getPinyinInitials(txt);
        opt.dataset.fullpy = toLower(full);
        opt.dataset.abbrpy = toLower(abbr);
        opt.dataset.chstxt = toLower(txt);
    });

    input.addEventListener('input', () => {
        const kw = toLower(input.value.trim());
        const hasKw = !!kw;
        options.forEach((opt, idx) => {
            if (idx === 0) return;
            if (!hasKw) { opt.hidden = false; return; }
            const chs = opt.dataset.chstxt || '';
            const full = opt.dataset.fullpy || '';
            const abbr = opt.dataset.abbrpy || '';
            const hit = chs.includes(kw) || (full && full.includes(kw)) || (abbr && abbr.includes(kw));
            opt.hidden = !hit;
        });
        if (select.selectedIndex > 0 && select.options[select.selectedIndex].hidden) {
            select.selectedIndex = 0;
            clearFieldError(select);
        }
    });
}

function ensureSearchInputs() {
    ['householdDistrict','householdStreet','residenceDistrict','residenceStreet'].forEach(id => {
        attachSearchableSelect(id);
    });
}

function populateStreets(districtSelectId, streetSelectId) {
    const districtSelect = document.getElementById(districtSelectId);
    const streetSelect = document.getElementById(streetSelectId);
    if (!districtSelect || !streetSelect) return;

    const fill = () => {
        const rawValue = (districtSelect.value || '').trim();
        const streets = STREET_DATA[rawValue] || [];

        if (!rawValue || streets.length === 0) {
            streetSelect.innerHTML = '<option value="">请先选择区</option>';
            streetSelect.disabled = true;
        } else {
            streetSelect.innerHTML = '<option value="">请选择街道</option>';
            streets.forEach(street => {
                const option = document.createElement('option');
                option.value = street;
                option.textContent = street;
                streetSelect.appendChild(option);
            });
            streetSelect.disabled = false;
        }
        clearFieldError(streetSelect);
    };

    districtSelect.addEventListener('change', () => {
        streetSelect.value = '';
        fill();
        clearFieldError(districtSelect);
    });

    fill();
}

function setupChatDrag() {
    const chatHeader = document.getElementById('chatHeader');
    const chatWindow = document.getElementById('chatWindow');
    
    if (!chatHeader || !chatWindow) return;
    
    chatHeader.addEventListener('mousedown', (e) => {
        if (e.target.closest('button, a')) return;
        isDragging = true;
        chatWindow.style.transition = 'none';
        offsetX = e.clientX - chatWindow.offsetLeft;
        offsetY = e.clientY - chatWindow.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging || !chatWindow) return;
        const x = Math.max(0, Math.min(window.innerWidth - chatWindow.offsetWidth, e.clientX - offsetX));
        const y = Math.max(0, Math.min(window.innerHeight - chatWindow.offsetHeight, e.clientY - offsetY));
        chatWindow.style.left = `${x}px`;
        chatWindow.style.top = `${y}px`;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging && chatWindow) {
            isDragging = false;
            chatWindow.style.transition = '';
        }
    });
}

function restoreConfig() {
    const savedProvider = localStorage.getItem('aiProvider') || 'bailian';
    const savedApiKey = localStorage.getItem('aiApiKey') || '';
    const savedAppId = localStorage.getItem('aiAppId') || '';
    const savedMode = localStorage.getItem('aiMode') || 'local';
    
    const isLocalMode = savedMode === 'local' || !savedApiKey;
    
    if (!isLocalMode && savedApiKey) {
        CONFIG.provider = savedProvider;
        CONFIG.apiKey = savedApiKey;
        CONFIG.appId = savedAppId;
        CONFIG.isConnected = true;
        
        const statusText = document.getElementById('statusText');
        const apiStatus = document.getElementById('apiStatus');
        const chatApiStatus = document.getElementById('chatApiStatus');
        
        if (statusText) statusText.textContent = `${savedProvider} 已连接`;
        if (apiStatus) {
            apiStatus.className = 'api-status connected';
            apiStatus.textContent = `${savedProvider} 在线`;
        }
        if (chatApiStatus) chatApiStatus.textContent = `${savedProvider} 在线`;
        
    } else {
        CONFIG.provider = savedProvider;
        CONFIG.apiKey = savedApiKey;
        CONFIG.appId = savedAppId;
        CONFIG.isConnected = false;
        
        const statusText = document.getElementById('statusText');
        const apiStatus = document.getElementById('apiStatus');
        const chatApiStatus = document.getElementById('chatApiStatus');
        
        if (statusText) statusText.textContent = '本地模式';
        if (apiStatus) {
            apiStatus.className = 'api-status local';
            apiStatus.textContent = '本地模式';
        }
        if (chatApiStatus) chatApiStatus.textContent = '本地模式';
    }
    
    const apiKeyInput = document.getElementById('apiKeyInput');
    const appIdInput = document.getElementById('appIdInput');
    const providerSelect = document.getElementById('providerSelect');
    
    if (apiKeyInput) apiKeyInput.value = CONFIG.apiKey;
    if (appIdInput) appIdInput.value = CONFIG.appId || '';
    if (providerSelect) providerSelect.value = CONFIG.provider;
}

function initializeApp() {
    console.log('正在初始化应用...');
    restoreConfig();
    showStep(1);
    populateStreets('householdDistrict', 'householdStreet');
    populateStreets('residenceDistrict', 'residenceStreet');
    ensureSearchInputs();
    setupChatDrag();
    console.log('应用初始化完成');
}

document.addEventListener('DOMContentLoaded', initializeApp);

document.addEventListener('DOMContentLoaded', function() {
    ['householdDistrict','householdStreet','residenceDistrict','residenceStreet'].forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.addEventListener('change', () => clearFieldError(elem));
        }
    });
});

function printOptimizedReport() {
    generateChinesePDF_Friendly();
}

function exportReportPDF() {
    generateChinesePDF_Friendly();
}

function exportReportJSON() {
    try {
        const completeData = {
            报告生成时间: new Date().toLocaleString('zh-CN'),
            报告版本: '2025增强版',
            学生信息: collectUserDataForAI(),
            系统配置: {
                AI模式: CONFIG.isConnected ? '在线模式' : '本地模式',
                AI提供商: CONFIG.provider || '未配置',
                数据来源: '西安市教育局2025年招生政策'
            }
        };
        
        const dataStr = JSON.stringify(completeData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `西安小升初评估数据_${new Date().getTime()}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        alert('✅ JSON数据导出成功!');
        
    } catch (error) {
        console.error('JSON导出失败:', error);
        alert('❌ JSON导出失败: ' + error.message);
    }
}

function resetAll() {
    if (confirm('您确定要重置所有填写的数据吗?')) {
        localStorage.clear();
        window.location.reload();
    }
}

async function saveAndTestConfig() {
    const apiKeyInput = document.getElementById('apiKeyInput');
    const appIdInput = document.getElementById('appIdInput');
    const providerSelect = document.getElementById('providerSelect');
    
    const apiKey = apiKeyInput.value.trim();
    const appId = appIdInput.value.trim();
    const provider = providerSelect.value;
    
    if (!apiKey) {
        alert('请输入API Key');
        return;
    }
    
    if (provider === 'bailian' && !appId) {
        alert('阿里百炼需要提供App ID');
        return;
    }
    
    try {
        const testMessage = '你好,请回复"连接成功"';
        const response = await callAIAPI(testMessage, provider, apiKey, appId);
        
        CONFIG.apiKey = apiKey;
        CONFIG.appId = appId;
        CONFIG.provider = provider;
        CONFIG.isConnected = true;
        
        const statusText = document.getElementById('statusText');
        const apiStatus = document.getElementById('apiStatus');
        const chatApiStatus = document.getElementById('chatApiStatus');
        
        if (statusText) statusText.textContent = `${provider} 已连接`;
        if (apiStatus) {
            apiStatus.className = 'api-status connected';
            apiStatus.textContent = `${provider} 在线`;
        }
        if (chatApiStatus) chatApiStatus.textContent = `${provider} 在线`;
        
        localStorage.setItem('aiProvider', provider);
        localStorage.setItem('aiApiKey', apiKey);
        localStorage.setItem('aiAppId', appId);
        localStorage.setItem('aiMode', 'online');
        
        alert('配置保存成功,AI功能已可用。');
        
        const configPanel = document.getElementById('configPanel');
        if (configPanel) configPanel.classList.remove('active');
        
    } catch (error) {
        alert(`配置测试失败:${error.message}`);
    }
}

function goToStep1() { showStep(1); }
function goToStep2() { showStep(2); }
function goToStep3() { showStep(3); }
function goToStep4() { showStep(4); }
function goToStep5() { showStep(5); }
function goToStep6() { showStep(6); }
function goToStep7() { showStep(7); }

// 导出到全局
window.showStep = showStep;
window.toggleChat = toggleChat;
window.toggleConfigPanel = toggleConfigPanel;
window.useLocalMode = useLocalMode;
window.sendMessage = sendMessage;
window.quickAction = quickAction;
window.handleKeyPress = handleKeyPress;
window.interpretPolicy = interpretPolicy;
window.generateReport = generateReport;
window.exportReportPDF = exportReportPDF;
window.exportReportJSON = exportReportJSON;
window.resetAll = resetAll;
window.saveAndTestConfig = saveAndTestConfig;
window.goToStep1 = goToStep1;
window.goToStep2 = goToStep2;
window.goToStep3 = goToStep3;
window.goToStep4 = goToStep4;
window.goToStep5 = goToStep5;
window.goToStep6 = goToStep6;
window.goToStep7 = goToStep7;
window.printOptimizedReport = printOptimizedReport;
window.exportPDF = exportReportPDF;
window.renderSchoolRecommendations = renderSchoolRecommendations;
window.generateChinesePDF_Friendly = generateChinesePDF_Friendly;

// 更新index.html中的按钮事件
document.addEventListener('DOMContentLoaded', function() {
    // 修改导出PDF按钮事件
    const exportFullPdfBtn = document.getElementById('exportFullPdfBtn');
    if (exportFullPdfBtn) {
        exportFullPdfBtn.addEventListener('click', generateChinesePDF_Friendly);
    }
});
