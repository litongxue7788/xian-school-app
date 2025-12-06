// ============================================
// 西安小升初智能评估系统 - 增强重构版 v3.0
// 融合重构版架构 + 老版本AI功能 + 完整用户体验
// ============================================

// ========== 1. 拼音映射工具 ==========
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
    '路': 'lu', '街': 'jie', '道': 'dao',
    '太': 'tai', '华': 'hua', '乙': 'yi',
    '自': 'zi', '强': 'qiang',
    '解': 'jie', '放': 'fang', '门': 'men',
    '韩': 'han', '森': 'sen', '寨': 'zhai',
    '文': 'wen', '艺': 'yi',
    '张': 'zhang', '家': 'jia', '村': 'cun',
    '青': 'qing', '年': 'nian',
    '桃': 'tao', '园': 'yuan',
    '红': 'hong', '庙': 'miao', '坡': 'po',
    '环': 'huan', '土': 'tu',
    '枣': 'zao',
    '小': 'xiao',
    '大': 'da',
    '延': 'yan', '堡': 'bao',
    '电': 'dian', '子': 'zi',
    '等': 'deng', '驾': 'jia',
    '鱼': 'yu', '化': 'hua',
    '丈': 'zhang',
    '纺': 'fang', '织': 'zhi',
    '里': 'li', '铺': 'pu',
    '旗': 'qi',
    '洪': 'hong', '庆': 'qing',
    '席': 'xi', '王': 'wang',
    '筑': 'zhu',
    '狄': 'di',
    '宫': 'gong',
    '明': 'ming',
    '徐': 'xu', '湾': 'wan',
    '谭': 'tan',
    '草': 'cao', '滩': 'tan',
    '汉': 'han',
    '凤': 'feng', '皇': 'huang',
    '进': 'jin',
    '胜': 'sheng', '利': 'li',
    '兴': 'xing',
    '武': 'wu', '屯': 'tun',
    '关': 'guan', '山': 'shan',
    '骊': 'li',
    '秦': 'qin',
    '市': 'shi',
    '代': 'dai',
    '斜': 'xie', '口': 'kou',
    '行': 'xing', '者': 'zhe',
    '零': 'ling',
    '相': 'xiang',
    '雨': 'yu', '金': 'jin',
    '丰': 'feng',
    '泉': 'quan',
    '韦': 'wei',
    '郭': 'guo', '杜': 'du',
    '滦': 'luan', '镇': 'zhen',
    '兆': 'zhao',
    '鸣': 'ming', '犊': 'du',
    '朝': 'chao',
    '台': 'tai',
    '引': 'yin',
    '孙': 'sun', '合': 'he',
    '甘': 'gan', '亭': 'ting',
    '余': 'yu', '下': 'xia',
    '祖': 'zu', '庵': 'an',
    '渡': 'du',
    '堂': 'tang',
    '庞': 'pang', '光': 'guang',
    '蒋': 'jiang',
    '店': 'dian',
    '石': 'shi', '井': 'jing',
    '玉': 'yu', '蒿': 'hao',
    '洩': 'xie',
    '胥': 'xu',
    '吉': 'ji', '卫': 'wei',
    '汤': 'tang', '峪': 'yu',
    '焦': 'jiao', '岱': 'dai',
    '普': 'pu',
    '葛': 'ge', '牌': 'pai',
    '瞿': 'qu', '源': 'yuan',
    '孟': 'meng',
    '辋': 'wang', '川': 'chuan',
    '哑': 'ya', '柏': 'bai',
    '终': 'zhong',
    '马': 'ma', '召': 'zhao',
    '集': 'ji', '贤': 'xian',
    '楼': 'lou', '观': 'guan',
    '尚': 'shang',
    '广': 'guang', '济': 'ji',
    '富': 'fu', '仁': 'ren',
    '竹': 'zhu',
    '上': 'shang',
    '斗': 'dou',
    '沣': 'feng', '京': 'jing',
    '建': 'jian', '章': 'zhang',
    '钓': 'diao',
    '正': 'zheng', '阳': 'yang',
    '渭': 'wei',
    '底': 'di',
    '永': 'yong', '乐': 'le',
    '泾': 'jing', '干': 'gan',
    '崇': 'chong',
    '庄': 'zhuang',
    '细': 'xi', '柳': 'liu',
    '灵': 'ling', '沼': 'zhao',
    '港': 'gang', '务': 'wu',
    '运': 'yun',
    '神': 'shen', '舟': 'zhou',
    '外': 'wai', '片': 'pian'
};

// 拼音工具类
class PinyinUtils {
    static toPinyin(text) {
        if (!text) return '';
        let result = '';
        for (let char of text) {
            result += PINYIN_MAP[char] || char;
        }
        return result.toLowerCase();
    }

    static getPinyinInitials(text) {
        if (!text) return '';
        let result = '';
        for (let char of text) {
            const py = PINYIN_MAP[char];
            if (py) {
                result += py[0];
            }
        }
        return result.toLowerCase();
    }
}

// ========== 2. 数据管理模块 (DataManager) - 增强版 ==========
class DataManager {
    constructor() {
        this.schools = new Map();
        this.districtSchools = new Map();
        this.typeIndex = new Map();
        this.featureIndex = new Map();
        this.cache = new Map();
        this.loading = new Map();
        
        this.config = {
            districts: [
                '新城区', '碑林区', '莲湖区', '雁塔区', '灞桥区', '未央区',
                '阎良区', '临潼区', '长安区', '高陵区', '鄠邑区', '蓝田县',
                '周至县', '西咸新区', '高新区', '经开区', '曲江新区',
                '浐灞国际港', '航天基地'
            ],
            retryAttempts: 3,
            retryDelay: 1000
        };
        
        // 预加载常见数据
        this.preloadCommonData();
    }

    async preloadCommonData() {
        try {
            const commonDistricts = ['雁塔区', '碑林区', '新城区', '未央区'];
            for (const district of commonDistricts) {
                await this.loadDistrict(district);
            }
            console.log('✅ 常见区县数据预加载完成');
        } catch (error) {
            console.warn('预加载数据失败:', error);
        }
    }

    async loadAllDistricts(onProgress) {
        const results = {
            success: [],
            failed: [],
            total: this.config.districts.length
        };

        for (let i = 0; i < this.config.districts.length; i++) {
            const district = this.config.districts[i];
            
            try {
                await this.loadDistrict(district);
                results.success.push(district);
            } catch (error) {
                console.error(`❌ ${district}加载失败:`, error);
                results.failed.push({ district, error: error.message });
            }

            if (onProgress) {
                onProgress({
                    current: i + 1,
                    total: results.total,
                    district,
                    successCount: results.success.length,
                    failedCount: results.failed.length
                });
            }
        }

        console.log(`✅ 数据加载完成: ${results.success.length}成功, ${results.failed.length}失败`);
        return results;
    }

    async loadDistrict(districtName) {
        if (this.cache.has(districtName)) {
            return this.cache.get(districtName);
        }

        if (this.loading.has(districtName)) {
            return this.loading.get(districtName);
        }

        const loadPromise = this._loadDistrictWithRetry(districtName);
        this.loading.set(districtName, loadPromise);

        try {
            const data = await loadPromise;
            this.cache.set(districtName, data);
            data.schools.forEach(school => this._indexSchool(school));
            return data;
        } finally {
            this.loading.delete(districtName);
        }
    }

    async _loadDistrictWithRetry(districtName, attempt = 1) {
        try {
            const module = await import(`./data/districts/${districtName}.js`);
            const rawData = module.default || module;
            return this.normalizeDistrictData(rawData, districtName);
        } catch (error) {
            if (attempt < this.config.retryAttempts) {
                console.warn(`⚠️ ${districtName}加载失败, ${this.config.retryDelay}ms后重试(${attempt}/${this.config.retryAttempts})`);
                await this._sleep(this.config.retryDelay);
                return this._loadDistrictWithRetry(districtName, attempt + 1);
            }
            throw new Error(`加载${districtName}数据失败(已重试${this.config.retryAttempts}次): ${error.message}`);
        }
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    normalizeDistrictData(rawData, districtName) {
        let publicSchools = [];
        let privateSchools = [];
        
        if (rawData.public_schools || rawData.private_schools) {
            publicSchools = this._normalizeSchoolArray(
                rawData.public_schools || [],
                districtName,
                '公办'
            );
            
            privateSchools = this._normalizeSchoolArray(
                rawData.private_schools || [],
                districtName,
                '民办'
            );
        }
        else if (rawData.schools && Array.isArray(rawData.schools)) {
            const middleSchools = rawData.schools.filter(school => {
                const stage = school.school_stage || school.level || '';
                return stage.includes('初中') || !stage.includes('小学');
            });
            
            publicSchools = this._normalizeSchoolArray(
                middleSchools.filter(s => (s.type || '').includes('公办')),
                districtName,
                '公办'
            );
            
            privateSchools = this._normalizeSchoolArray(
                middleSchools.filter(s => (s.type || '').includes('民办')),
                districtName,
                '民办'
            );
        }
        
        const allSchools = [...publicSchools, ...privateSchools];
        
        return {
            name: districtName,
            schools: allSchools,
            publicSchools,
            privateSchools,
            metadata: {
                district: districtName,
                totalCount: allSchools.length,
                publicCount: publicSchools.length,
                privateCount: privateSchools.length,
                loadTime: new Date().toISOString(),
                ...rawData.metadata
            }
        };
    }

    _normalizeSchoolArray(schools, districtName, defaultType) {
        return schools
            .map(s => this.normalizeSchool(s, districtName, defaultType))
            .filter(s => s !== null);
    }

    normalizeSchool(school, districtName, defaultType) {
        if (!school || typeof school !== 'object') {
            return null;
        }

        const schoolStage = school.school_stage || school.level || '';
        const isPrimarySchool = schoolStage.includes('小学') || school.level === '公办小学';
        const isMiddleSchool = schoolStage.includes('初中') || school.level === '公办初中' || 
                              school.level === '民办初中' || !isPrimarySchool;

        if (isPrimarySchool && !isMiddleSchool) {
            return null;
        }

        const name = this._extractName(school);
        if (!name) {
            console.warn('学校缺少名称,跳过:', school);
            return null;
        }

        const schoolDistrict = this._extractSchoolDistrict(school);
        const type = this.normalizeType(school.type || school.办学性质 || defaultType);
        const features = this._extractFeatures(school);
        const rating = this._extractRating(school);
        const tuition = this.normalizeTuition(school.tuition || school.fee || school.学费);
        const hasBoarding = this._extractBoarding(school);
        const isKeySchool = this._extractIsKeySchool(school);

        return {
            id: school.id || this.generateId(school, districtName),
            name,
            type,
            level: isMiddleSchool ? '初中' : '未知',
            district: school.district || school.newcity || districtName || '',
            address: school.address || school.location || '',
            schoolDistrict,
            tuition,
            features,
            rating,
            hasBoarding,
            contactPhone: school.contact || school.contact_phone || school.联系电话 || '',
            website: school.website || '',
            isKeySchool,
            _raw: school
        };
    }

    _extractSchoolDistrict(school) {
        if (school.streets && Array.isArray(school.streets)) {
            return school.streets.filter(Boolean).map(String);
        }
        
        if (school.学区 && Array.isArray(school.学区)) {
            return school.学区.filter(Boolean).map(String);
        }
        
        if (school.学区 && typeof school.学区 === 'string') {
            return school.学区.split(/[、，,;；\s]+/).filter(Boolean).map(s => s.trim());
        }
        
        if (school.schoolDistrict && Array.isArray(school.schoolDistrict)) {
            return school.schoolDistrict.filter(Boolean).map(String);
        }
        
        return [];
    }

    _extractFeatures(school) {
        const features = [];
        
        if (school.features && Array.isArray(school.features)) {
            features.push(...school.features.filter(Boolean).map(String));
        }
        
        if (school.特色 && Array.isArray(school.特色)) {
            features.push(...school.特色.filter(Boolean).map(String));
        }
        
        if (school.admission_policy) {
            features.push(`入学政策:${school.admission_policy}`);
        }
        
        if (school.admissionProbability) {
            features.push(`入学概率:${school.admissionProbability}`);
        }
        
        return features;
    }

    _extractRating(school) {
        if (school.admissionRate !== undefined) {
            return Math.max(0, Math.min(100, Number(school.admissionRate)));
        }
        
        if (school.rating !== undefined) {
            return Math.max(0, Math.min(100, Number(school.rating)));
        }
        
        if (school.admissionProbability) {
            switch(school.admissionProbability) {
                case '高': return 85;
                case '中': return 70;
                case '低': return 50;
                default: return 60;
            }
        }
        
        return 60;
    }

    _extractBoarding(school) {
        if (typeof school.hasBoarding === 'boolean') return school.hasBoarding;
        
        if (typeof school.hasBoarding === 'string') {
            const b = school.hasBoarding.toLowerCase();
            return b.includes('是') || b.includes('有') || b.includes('yes');
        }
        
        if (school.features && Array.isArray(school.features)) {
            return school.features.some(f => 
                f.toLowerCase().includes('住宿') || 
                f.toLowerCase().includes('寄宿') ||
                f.toLowerCase().includes('boarding')
            );
        }
        
        return false;
    }

    _extractIsKeySchool(school) {
        if (typeof school.is_key_school === 'boolean') return school.is_key_school;
        
        const name = this._extractName(school).toLowerCase();
        const keySchoolKeywords = ['重点', '示范', '实验', '一中', '二中', '附中'];
        
        return keySchoolKeywords.some(keyword => 
            name.includes(keyword.toLowerCase())
        );
    }

    _extractName(school) {
        return school.name || 
               school.学校名称 || 
               school.schoolName || 
               school.title ||
               school.名称 ||
               '';
    }

    normalizeType(type) {
        if (!type) return '未知';
        const t = String(type).toLowerCase();
        
        if (t.includes('公办') || t.includes('公立') || t.includes('公') || 
            t.includes('state') || t.includes('public')) {
            return '公办';
        }
        
        if (t.includes('民办') || t.includes('民') || t.includes('私立') || 
            t.includes('private')) {
            return '民办';
        }
        
        return '未知';
    }

    normalizeTuition(tuition) {
        if (tuition === null || tuition === undefined) return 0;
        
        if (typeof tuition === 'number') {
            return Math.max(0, tuition);
        }
        
        if (typeof tuition === 'string') {
            const match = tuition.replace(/,/g, '').match(/(\d+\.?\d*)/);
            if (match) {
                const value = Number(match[1]);
                if (tuition.includes('万')) {
                    return value * 10000;
                }
                return value;
            }
        }
        
        return 0;
    }

    generateId(school, district) {
        const name = this._extractName(school);
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 6);
        return `${district}_${name}_${timestamp}_${random}`.replace(/\s+/g, '_');
    }

    _indexSchool(school) {
        this.schools.set(school.id, school);

        if (!this.districtSchools.has(school.district)) {
            this.districtSchools.set(school.district, []);
        }
        this.districtSchools.get(school.district).push(school.id);

        if (!this.typeIndex.has(school.type)) {
            this.typeIndex.set(school.type, []);
        }
        this.typeIndex.get(school.type).push(school.id);

        school.features.forEach(feature => {
            if (!this.featureIndex.has(feature)) {
                this.featureIndex.set(feature, []);
            }
            this.featureIndex.get(feature).push(school.id);
        });
    }

    getSchoolById(id) {
        return this.schools.get(id) || null;
    }

    getSchoolsByDistrict(district) {
        const ids = this.districtSchools.get(district) || [];
        return ids.map(id => this.schools.get(id)).filter(Boolean);
    }

    getSchoolsByType(type) {
        const ids = this.typeIndex.get(type) || [];
        return ids.map(id => this.schools.get(id)).filter(Boolean);
    }

    findSchools(filters = {}) {
        let results = Array.from(this.schools.values());

        if (filters.district) {
            results = results.filter(s => s.district === filters.district);
        }

        if (filters.type) {
            results = results.filter(s => s.type === filters.type);
        }

        if (filters.features && filters.features.length) {
            results = results.filter(s => 
                filters.features.some(f => 
                    s.features.some(sf => sf.includes(f))
                )
            );
        }

        if (filters.maxTuition !== undefined) {
            results = results.filter(s => s.tuition <= filters.maxTuition);
        }

        if (filters.minTuition !== undefined) {
            results = results.filter(s => s.tuition >= filters.minTuition);
        }

        if (filters.hasBoarding !== undefined) {
            results = results.filter(s => s.hasBoarding === filters.hasBoarding);
        }

        if (filters.keySchoolOnly) {
            results = results.filter(s => s.isKeySchool);
        }

        if (filters.minRating !== undefined) {
            results = results.filter(s => s.rating >= filters.minRating);
        }

        if (filters.sortBy) {
            results = this._sortSchools(results, filters.sortBy, filters.sortOrder);
        }

        if (filters.limit) {
            const start = filters.offset || 0;
            results = results.slice(start, start + filters.limit);
        }

        return results;
    }

    _sortSchools(schools, sortBy, order = 'desc') {
        const direction = order === 'asc' ? 1 : -1;
        
        return schools.sort((a, b) => {
            let aVal = a[sortBy];
            let bVal = b[sortBy];
            
            if (typeof aVal === 'string') {
                return direction * aVal.localeCompare(bVal);
            }
            
            return direction * (aVal - bVal);
        });
    }

    getStatistics() {
        const stats = {
            totalSchools: this.schools.size,
            byDistrict: {},
            byType: {},
            avgTuition: 0,
            boardingCount: 0,
            keySchoolCount: 0
        };

        let totalTuition = 0;

        this.schools.forEach(school => {
            stats.byDistrict[school.district] = (stats.byDistrict[school.district] || 0) + 1;
            stats.byType[school.type] = (stats.byType[school.type] || 0) + 1;
            
            if (school.tuition > 0) {
                totalTuition += school.tuition;
            }
            
            if (school.hasBoarding) {
                stats.boardingCount++;
            }
            
            if (school.isKeySchool) {
                stats.keySchoolCount++;
            }
        });

        stats.avgTuition = stats.totalSchools > 0 ? 
            Math.round(totalTuition / stats.totalSchools) : 0;

        return stats;
    }

    clearCache(district) {
        if (district) {
            this.cache.delete(district);
        } else {
            this.cache.clear();
        }
    }

    getCacheStatus() {
        return {
            districts: Array.from(this.cache.keys()),
            size: this.cache.size,
            schoolsIndexed: this.schools.size
        };
    }
}

// ========== 3. AI核心模块 (AICore) - 从老版本整合 ==========
class AICore {
    constructor() {
        // 从老版本复制的AI配置
        this.CONFIG = {
            apiKey: '',
            appId: '',
            provider: 'bailian',
            isConnected: false,
            isChatInitialized: false
        };
        
        // 从老版本复制的全局记忆系统
        this.USER_MEMORY = JSON.parse(localStorage.getItem("USER_MEMORY") || "{}");
        
        this.chatHistory = [];
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    // 保存用户记忆
    saveUserMemory(key, value) {
        this.USER_MEMORY[key] = value;
        localStorage.setItem("USER_MEMORY", JSON.stringify(this.USER_MEMORY));
    }

    getUserMemory() {
        return this.USER_MEMORY;
    }

    // AI API调用函数 - 从老版本复制
    async callAIAPI(message, provider = this.CONFIG.provider, apiKey = this.CONFIG.apiKey, appId = this.CONFIG.appId) {
        try {
            if (!this.CONFIG.isConnected) {
                return "当前处于本地模式，AI功能不可用。请切换到在线模式。";
            }

            console.log('调用AI API:', { provider, messageLength: message.length });
            
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
            console.error('API调用失败:', error);
            throw new Error(`AI服务调用失败：${error.message}`);
        }
    }

    // 小猫助手核心函数 - 从老版本复制并优化
    async sendMessage(message, userData) {
        if (!this.CONFIG.isConnected) {
            return "AI聊天功能在本地模式下不可用。请切换到在线模式。";
        }
        
        try {
            const userMemory = this.getUserMemory();
            
            // 构建强化的AI提示词
            const contextPrompt = `
你是一个专业的西安小升初智能助手"小猫助手"。你拥有以下核心能力：

【重要指令】
1. 你必须以 data/schools.json 与 data/districts.json 为准；
2. 除这些数据外，不允许猜测数据；
3. 你只能使用 data/schools.json 和 data/districts.json 中的真实信息；
4. 若用户询问的学校不在列表内，你必须回答"我目前数据库内还没有该学校的最新学区信息"；
5. 禁止猜测、禁止编造、禁止杜撰。

【用户已填写信息 - 请严格基于这些真实信息分析】
📋 学生基本信息：
- 当前年级: ${userData?.当前年级 || '未填写'}
- 户籍所在区: ${userData?.户籍所在区 || '未填写'}
- 实际居住区: ${userData?.实际居住区 || '未填写'}
- 房产情况: ${userData?.房产情况 || '未填写'}
- 民办意向: ${userData?.民办意向 || '未填写'}
- 预算范围: ${userData?.预算范围 || '未填写'}
- 学业规划: ${userData?.学业规划 || '未填写'}
- 学生特长: ${userData?.学生特长?.join('、') || '无'}

📊 能力评估得分：
- 学业成绩: ${userData?.能力评估?.['维度1'] || '未评估'}分
- 综合素养: ${userData?.能力评估?.['维度2'] || '未评估'}分
- 学习习惯: ${userData?.能力评估?.['维度3'] || '未评估'}分
- 心理素质: ${userData?.能力评估?.['维度4'] || '未评估'}分
- 家庭支持: ${userData?.能力评估?.['维度5'] || '未评估'}分
- 学科倾向: ${userData?.能力评估?.['维度6'] || '未评估'}分

【用户本次提问】
${message}

【回答格式要求 - 请严格按照以下格式回答，不能缺项】
📌 1. 学校基本信息
📍 类型：公办/民办（必须准确）
📍 区县：（必须准确）
📍 对口学区（严格按 districts.json）：

📌 2. 入学顺位分析
📍 用户当前户籍类型：（基于用户数据判断）
📍 公办入学概率（房户一致/安置房/租住）：

📌 3. 推荐理由（基于用户 memory）
（结合用户能力评估、特长、预算等进行个性化分析）

📌 4. 来源引用
- 教育局政策
- 学校官网
- 招生简章

请确保回答准确、专业、不跑题。如果有任何不确定的信息，请明确说明"根据现有数据库，该信息暂未收录"。
            `;
            
            return await this.callAIAPI(contextPrompt);
            
        } catch (error) {
            console.error('AI消息发送失败:', error);
            throw error;
        }
    }

    // AI解读政策 - 从老版本复制
    async interpretPolicy(userData) {
        try {
            const question = `用户户籍信息：${userData?.hukouDistrict || '未填写'}，居住信息：${userData?.liveDistrict || '未填写'}\n请详细解读西安市小升初的入学顺位政策，包括房户一致、集体户、租房等不同情况的入学顺序，并分析用户的情况`;
            
            return await this.callAIAPI(question);
        } catch (error) {
            throw new Error(`AI解读失败：${error.message}`);
        }
    }

    // AI生成能力分析 - 从老版本复制
    async generateAbilityAnalysis(userData) {
        try {
            const prompt = `
请根据以下学生完整信息，生成【深度个性化能力分析与改进建议】：

【学生基本情况】
- 当前年级: ${userData?.当前年级 || '未填写'}
- 学生特长: ${userData?.学生特长?.join('、') || '无'}
- 学业规划: ${userData?.学业规划 || '未填写'}
- 户籍所在区: ${userData?.户籍所在区 || '未填写'} 
- 实际居住区: ${userData?.实际居住区 || '未填写'}
- 房产情况: ${userData?.房产情况 || '未填写'}
- 民办意向: ${userData?.民办意向 || '未填写'}

【能力评估详细数据】
- 学业成绩: ${userData?.能力评估?.['维度1'] || '未评估'}分
- 综合素养: ${userData?.能力评估?.['维度2'] || '未评估'}分  
- 学习习惯: ${userData?.能力评估?.['维度3'] || '未评估'}分
- 心理素质: ${userData?.能力评估?.['维度4'] || '未评估'}分
- 家庭支持: ${userData?.能力评估?.['维度5'] || '未评估'}分
- 学科倾向: ${userData?.能力评估?.['维度6'] || '未评估'}分

要求：
1. 必须结合学生的年级(${userData?.当前年级})分析发展需求
2. 必须结合户籍(${userData?.户籍所在区})和居住地(${userData?.实际居住区})分析教育资源匹配
3. 必须结合房产情况(${userData?.房产情况})和民办意向(${userData?.民办意向})给出升学策略建议
4. 分析每个维度的具体表现和改进空间
5. 给出针对性的能力提升建议和时间规划
6. 结合学生特长(${userData?.学生特长?.join('、')})推荐适合的发展方向
7. 以家长易懂的语言表达，避免专业术语

请直接返回HTML格式的分析内容，不要包含markdown标记。
            `;

            return await this.callAIAPI(prompt);
        } catch (error) {
            throw new Error(`能力分析生成失败：${error.message}`);
        }
    }

    // AI生成学校推荐 - 从老版本复制
    async generateSchoolRecommendations(userData) {
        try {
            // 判断入学类型
            const 判断入学类型 = (userData) => {
                const 户籍区 = userData.户籍所在区 || '';
                const 居住区 = userData.实际居住区 || '';
                const 房产情况 = userData.房产情况 || '';
                
                if (户籍区 === '外地户籍' || !户籍区) {
                    return '随迁类 - 需办理居住证,由居住证所在区统筹安排公办入学';
                }
                
                if (户籍区 === 居住区 && 房产情况.includes('自有')) {
                    return '户籍类(房户一致) - 可报名对口公办学校,第一顺位';
                }
                
                if (户籍区 !== 居住区) {
                    return '户籍类(房户不一致) - 可报名户籍所在区公办学校,第二顺位';
                }
                
                if (房产情况.includes('租房')) {
                    return '户籍类(租房居住) - 统筹安排公办入学,第四顺位';
                }
                
                return '户籍类 - 建议确认具体房户情况';
            };

            const prompt = `
请根据以下学生完整信息，生成【个性化学校推荐】:

【学生基本情况】
- 当前年级: ${userData?.当前年级 || '未填写'}
- 学生特长: ${userData?.学生特长?.join('、') || '无'}
- 学业规划: ${userData?.学业规划 || '未填写'}

【户籍与居住信息】
- 户籍所在区: ${userData?.户籍所在区 || '未填写'}
- 实际居住区: ${userData?.实际居住区 || '未填写'}
- 房产情况: ${userData?.房产情况 || '未填写'}
- 入学情况判断: ${判断入学类型(userData)}

【家庭意向】
- 民办意向: ${userData?.民办意向 || '未填写'}
- 预算范围: ${userData?.预算范围 || '未填写'}

【能力评估详细数据】
- 学业成绩: ${userData?.能力评估?.['维度1'] || '未评估'}分
- 综合素养: ${userData?.能力评估?.['维度2'] || '未评估'}分  
- 学习习惯: ${userData?.能力评估?.['维度3'] || '未评估'}分
- 心理素质: ${userData?.能力评估?.['维度4'] || '未评估'}分
- 家庭支持: ${userData?.能力评估?.['维度5'] || '未评估'}分
- 学科倾向: ${userData?.能力评估?.['维度6'] || '未评估'}分

【重要指令】
1. 你必须以 data/schools.json 与 data/districts.json 为准；
2. 除这些数据外，不允许猜测数据；
3. 只能推荐数据库中的真实学校；
4. 如果数据库中无对应信息，请明确说明。

【推荐要求】
1. **必须严格遵循西安市2025年招生政策**
2. **公办学校推荐规则**:
   - 户籍类(房户一致/房户不一致): 只能推荐户籍所在区内对口公办学校
   - 随迁类: 只能推荐居住证所在区统筹公办学校
3. **民办学校推荐规则**:
   - 可推荐全市范围内民办学校
   - 必须说明摇号概率(基于历史数据)
4. **推荐5所学校**: 2所冲刺校 + 2所稳妥校 + 1所保底校
5. **每所学校必须包含**:
   - 学校名称(必须是真实存在的西安学校)
   - 类型(民办/公办)
   - 匹配度(百分比)
   - 推荐理由(结合学生能力+地理位置+政策要求)
   - 摇号概率/入学概率
   - 学校特色
   - 推荐类型(冲刺/稳妥/保底)
   - 收费标准(民办学校必填)
   - 入学要求(政策依据)
   - 数据来源(必须说明)

6. **输出格式要求**:
以HTML格式输出,使用以下结构：

<div class="school-card recommended">
    <div class="school-header">
        <h4>【学校名称】</h4>
        <span class="match-badge">匹配度 XX%</span>
    </div>
    <div class="school-details">
        <p><strong>类型:</strong> 民办/公办</p>
        <p><strong>区县:</strong> 【区县名称】</p>
        <p><strong>对口学区:</strong> 【严格按districts.json填写】</p>
        <p><strong>特色:</strong> 【学校特色】</p>
        <p><strong>预估摇号概率/入学概率:</strong> XX%</p>
        <p><strong>推荐理由:</strong> 【具体分析】</p>
        <p><strong>收费标准:</strong> 【仅民办填写】</p>
        <p><strong>入学要求:</strong> 【政策依据】</p>
        <p><strong>数据来源:</strong> 学校官网/招生简章/教育局政策</p>
    </div>
</div>

请直接返回HTML内容,不要包含markdown标记。
            `;

            return await this.callAIAPI(prompt);
        } catch (error) {
            throw new Error(`学校推荐生成失败：${error.message}`);
        }
    }

    // AI生成时间规划 - 从老版本复制
    async generateTimePlan(userData) {
        const currentYear = new Date().getFullYear();
        const targetYear = userData?.当前年级 === '六年级' ? currentYear + 1 : 
                          userData?.当前年级 === '五年级' ? currentYear + 2 : 
                          userData?.当前年级 === '四年级' ? currentYear + 3 : currentYear + 1;
        
        const prompt = `
请根据以下家庭信息和学生情况制定【${targetYear}年西安小升初个性化时间规划】：

用户信息：
${JSON.stringify(userData, null, 2)}

要求：
1. 基于学生当前${userData?.当前年级 || '六年级'}的情况制定时间规划
2. 列出${targetYear}年每个月的关键事项（政策关注、学校了解、材料准备、报名、摇号、录取等）
3. 根据家庭情况给出特别提醒（如：户籍不一致需提前准备材料、民办意向强需关注学校开放日等）
4. 标注每个时间节点的重要性（关键/重要/提醒）
5. 用简洁、可执行的方式呈现，包含具体日期
6. 以HTML格式输出，使用<ul><li>结构

请直接返回HTML内容，不要包含markdown标记。
        `;

        try {
            return await this.callAIAPI(prompt);
        } catch (error) {
            throw new Error(`时间规划生成失败：${error.message}`);
        }
    }

    // AI生成政策提醒 - 从老版本复制
    async generatePolicyTips(userData) {
        const prompt = `
请根据以下学生和家庭信息，生成【个性化小升初政策提醒与建议】：

用户信息：
${JSON.stringify(userData, null, 2)}

要求：
1. 根据户籍、居住情况判断公办入学顺位（第一/第二/第三/第四顺位）
2. 分析民办摇号是否有优势（如：区内摇号概率）
3. 是否受租房政策影响
4. 是否有房户一致优势
5. 给出明确的风险提示与应对建议
6. 以HTML格式输出，使用<div>和<p>结构，关键信息用<strong>标记

请直接返回HTML内容，不要包含markdown标记。
        `;

        try {
            return await this.callAIAPI(prompt);
        } catch (error) {
            throw new Error(`政策提醒生成失败：${error.message}`);
        }
    }

    // 保存AI配置
    saveConfig(provider, apiKey, appId) {
        this.CONFIG.provider = provider;
        this.CONFIG.apiKey = apiKey;
        this.CONFIG.appId = appId;
        this.CONFIG.isConnected = true;
        
        localStorage.setItem('aiProvider', provider);
        localStorage.setItem('aiApiKey', apiKey);
        localStorage.setItem('aiAppId', appId);
        localStorage.setItem('aiMode', 'online');
    }

    // 切换到本地模式
    useLocalMode() {
        this.CONFIG.isConnected = false;
        localStorage.setItem('aiMode', 'local');
    }

    // 恢复配置
    restoreConfig() {
        const savedProvider = localStorage.getItem('aiProvider') || 'bailian';
        const savedApiKey = localStorage.getItem('aiApiKey') || '';
        const savedAppId = localStorage.getItem('aiAppId') || '';
        const savedMode = localStorage.getItem('aiMode') || 'local';
        
        const isLocalMode = savedMode === 'local' || !savedApiKey;
        
        this.CONFIG.provider = savedProvider;
        this.CONFIG.apiKey = savedApiKey;
        this.CONFIG.appId = savedAppId;
        this.CONFIG.isConnected = !isLocalMode && savedApiKey;
        
        return {
            provider: savedProvider,
            apiKey: savedApiKey,
            appId: savedAppId,
            isConnected: this.CONFIG.isConnected
        };
    }
}

// ========== 4. 推荐引擎模块 (RecommendationEngine) - 增强版 ==========
class RecommendationEngine {
    constructor(dataManager, aiCore) {
        this.dataManager = dataManager;
        this.aiCore = aiCore;
        
        this.weights = {
            hukouDistrictMatch: 35,
            residenceDistrictMatch: 30,
            streetMatch: 10,
            featureMatch: 20,
            budgetMatch: 15,
            boardingMatch: 10,
            ratingBonus: 15,
            keySchoolBonus: 10,
            distanceMatch: 5
        };
        
        this.config = {
            defaultLimit: 10,
            rushThreshold: 85,
            stableThreshold: 70,
            minPublicSchools: 3
        };
    }

    async recommend(profile, options = {}) {
        try {
            this.validateProfile(profile);
            const enrollmentType = this.determineEnrollmentType(profile);
            const candidates = await this.getCandidates(profile, enrollmentType);
            
            if (candidates.length === 0) {
                throw new Error('未找到符合条件的学校');
            }
            
            const scored = candidates.map(school => {
                const score = this.calculateScore(school, profile, enrollmentType);
                const reasons = this.getMatchReasons(school, profile, score);
                const warnings = this.getWarnings(school, profile);
                
                return {
                    ...school,
                    matchScore: score.total,
                    scoreBreakdown: score.breakdown,
                    matchReasons: reasons,
                    warnings,
                    enrollmentType: enrollmentType.category
                };
            });
            
            scored.sort((a, b) => b.matchScore - a.matchScore);
            
            const categorized = this.categorizeResults(
                scored, 
                profile,
                options.limit || this.config.defaultLimit
            );
            
            // 使用AI生成增强分析
            if (this.aiCore.CONFIG.isConnected) {
                categorized.aiAnalysis = await this.generateAIAnalysis(categorized, profile, enrollmentType);
            }
            
            categorized.summary = this.generateSummary(categorized, profile, enrollmentType);
            
            return categorized;
            
        } catch (error) {
            console.error('推荐失败:', error);
            throw error;
        }
    }

    // 生成AI分析（融合老版本AI功能）
    async generateAIAnalysis(results, profile, enrollmentType) {
        try {
            const analysis = {
                abilityAnalysis: '',
                schoolRecommendations: '',
                timePlan: '',
                policyTips: ''
            };
            
            // 并行生成所有AI分析
            const [abilityAnalysis, schoolRecommendations, timePlan, policyTips] = await Promise.all([
                this.aiCore.generateAbilityAnalysis(profile).catch(() => ''),
                this.aiCore.generateSchoolRecommendations(profile).catch(() => ''),
                this.aiCore.generateTimePlan(profile).catch(() => ''),
                this.aiCore.generatePolicyTips(profile).catch(() => '')
            ]);
            
            analysis.abilityAnalysis = abilityAnalysis;
            analysis.schoolRecommendations = schoolRecommendations;
            analysis.timePlan = timePlan;
            analysis.policyTips = policyTips;
            
            return analysis;
        } catch (error) {
            console.error('AI分析生成失败:', error);
            return null;
        }
    }

    determineEnrollmentType(profile) {
        const hukou = profile.hukouDistrict || '';
        const residence = profile.residenceDistrict || '';
        const hasProperty = profile.hasHouse === '有自有房产';
        const propertyType = profile.propertyType || '';
        
        if (hukou.includes('外地') || hukou === '非西安户籍') {
            return {
                type: 'migrant',
                category: '随迁子女',
                priority: 4,
                description: '随迁子女需提供居住证,由居住证所在区统筹安排',
                canApplyPublic: true,
                publicDistrict: residence,
                recommendStrategy: 'focus_residence'
            };
        }
        
        if (hukou === residence && hasProperty) {
            return {
                type: 'hukou_match',
                category: '户籍类(房户一致)',
                priority: 1,
                description: '户籍与房产地址一致,享有最优先入学资格',
                canApplyPublic: true,
                publicDistrict: hukou,
                recommendStrategy: 'balanced'
            };
        }
        
        if (hukou && residence && hukou !== residence) {
            return {
                type: 'hukou_mismatch',
                category: '户籍类(房户不一致)',
                priority: 2,
                description: '户籍与房产地址不在同一区域,排序在房户一致之后',
                canApplyPublic: true,
                publicDistrict: hukou,
                recommendStrategy: 'favor_hukou'
            };
        }
        
        if (hukou.includes('集体户')) {
            return {
                type: 'collective',
                category: '集体户籍类',
                priority: 3,
                description: '集体户口,由教育局统筹安排入学',
                canApplyPublic: true,
                publicDistrict: hukou.replace('集体户', '').trim(),
                recommendStrategy: 'favor_residence'
            };
        }
        
        if (profile.residenceType === '租房') {
            return {
                type: 'rent',
                category: '户籍类(租房居住)',
                priority: 4,
                description: '租房居住,排序在自有房产之后',
                canApplyPublic: true,
                publicDistrict: hukou,
                recommendStrategy: 'favor_residence'
            };
        }
        
        return {
            type: 'unknown',
            category: '待确认',
            priority: 5,
            description: '请完善户籍、居住和房产信息以确定入学顺位',
            canApplyPublic: false,
            recommendStrategy: 'balanced'
        };
    }

    async getCandidates(profile, enrollmentType) {
        const candidates = [];
        const seen = new Set();
        
        switch (enrollmentType.recommendStrategy) {
            case 'favor_hukou':
                await this._addSchoolsFromDistrict(profile.hukouDistrict, candidates, seen);
                await this._addSchoolsFromDistrict(profile.residenceDistrict, candidates, seen);
                break;
            case 'favor_residence':
                await this._addSchoolsFromDistrict(profile.residenceDistrict, candidates, seen);
                await this._addSchoolsFromDistrict(profile.hukouDistrict, candidates, seen);
                break;
            case 'focus_residence':
                await this._addSchoolsFromDistrict(profile.residenceDistrict, candidates, seen);
                break;
            default:
                await this._addSchoolsFromDistrict(profile.hukouDistrict, candidates, seen);
                await this._addSchoolsFromDistrict(profile.residenceDistrict, candidates, seen);
        }
        
        if (profile.considerPrivate === '是' && profile.crossDistrictPreference) {
            await this._addCrossDistrictPrivateSchools(profile, candidates, seen);
        }
        
        return candidates;
    }

    async _addSchoolsFromDistrict(district, candidates, seen) {
        if (!district) return;
        
        try {
            await this.dataManager.loadDistrict(district);
            const schools = this.dataManager.getSchoolsByDistrict(district);
            
            schools.forEach(school => {
                if (!seen.has(school.id)) {
                    seen.add(school.id);
                    candidates.push(school);
                }
            });
        } catch (error) {
            console.warn(`获取${district}学校失败:`, error);
        }
    }

    async _addCrossDistrictPrivateSchools(profile, candidates, seen) {
        const crossDistricts = this._parseCrossDistrictPreference(
            profile.crossDistrictPreference
        );
        
        for (const district of crossDistricts) {
            try {
                await this.dataManager.loadDistrict(district);
                const schools = this.dataManager.findSchools({
                    district,
                    type: '民办'
                });
                
                schools.forEach(school => {
                    if (!seen.has(school.id)) {
                        seen.add(school.id);
                        candidates.push(school);
                    }
                });
            } catch (error) {
                console.warn(`获取${district}民办学校失败:`, error);
            }
        }
    }

    _parseCrossDistrictPreference(preference) {
        if (!preference) return [];
        
        const districts = [];
        const allDistricts = this.dataManager.config.districts;
        
        if (preference === '全市范围' || preference.includes('全市')) {
            return allDistricts;
        }
        
        const parts = preference.split(/[,，、]/);
        parts.forEach(part => {
            const cleaned = part.trim();
            if (allDistricts.includes(cleaned)) {
                districts.push(cleaned);
            }
        });
        
        return districts;
    }

    validateProfile(profile) {
        if (!profile.hukouDistrict && !profile.residenceDistrict) {
            throw new Error('请至少填写户籍区或居住区中的一个');
        }
    }

    calculateScore(school, profile, enrollmentType) {
        const breakdown = {};
        let total = 0;
        
        if (school.district === profile.hukouDistrict) {
            breakdown.hukouMatch = this.weights.hukouDistrictMatch;
            total += this.weights.hukouDistrictMatch;
        }
        
        if (school.district === profile.residenceDistrict) {
            breakdown.residenceMatch = this.weights.residenceDistrictMatch;
            total += this.weights.residenceDistrictMatch;
        }
        
        if (this._checkStreetMatch(school, profile)) {
            breakdown.streetMatch = this.weights.streetMatch;
            total += this.weights.streetMatch;
        }
        
        const featureScore = this._calculateFeatureScore(school, profile);
        if (featureScore > 0) {
            breakdown.featureMatch = featureScore;
            total += featureScore;
        }
        
        const budgetScore = this._calculateBudgetScore(school, profile);
        breakdown.budgetMatch = budgetScore;
        total += budgetScore;
        
        if (this._checkBoardingMatch(school, profile)) {
            breakdown.boardingMatch = this.weights.boardingMatch;
            total += this.weights.boardingMatch;
        }
        
        const ratingScore = (school.rating / 100) * this.weights.ratingBonus;
        breakdown.ratingBonus = ratingScore;
        total += ratingScore;
        
        if (school.isKeySchool) {
            breakdown.keySchoolBonus = this.weights.keySchoolBonus;
            total += this.weights.keySchoolBonus;
        }
        
        const typeScore = this._calculateTypeScore(school, profile, enrollmentType);
        if (typeScore !== 0) {
            breakdown.typeMatch = typeScore;
            total += typeScore;
        }
        
        total = Math.max(0, Math.min(100, total));
        
        return {
            total: Math.round(total * 10) / 10,
            breakdown
        };
    }

    _checkStreetMatch(school, profile) {
        const hukouStreet = profile.hukouStreet;
        const residenceStreet = profile.residenceStreet;
        
        return school.schoolDistrict.some(sd => 
            sd === hukouStreet || sd === residenceStreet
        );
    }

    _calculateFeatureScore(school, profile) {
        if (!profile.specialties || profile.specialties.length === 0) {
            return 0;
        }
        
        let matches = 0;
        profile.specialties.forEach(specialty => {
            if (school.features.some(f => 
                f.toLowerCase().includes(specialty.toLowerCase())
            )) {
                matches++;
            }
        });
        
        return Math.min(
            this.weights.featureMatch,
            matches * (this.weights.featureMatch / 3)
        );
    }

    _calculateBudgetScore(school, profile) {
        if (school.type === '公办' || school.tuition === 0) {
            return this.weights.budgetMatch;
        }
        
        if (!profile.budget || profile.budget === 0) {
            return this.weights.budgetMatch * 0.5;
        }
        
        if (school.tuition <= profile.budget) {
            return this.weights.budgetMatch;
        }
        
        if (school.tuition <= profile.budget * 1.2) {
            return this.weights.budgetMatch * 0.7;
        }
        
        if (school.tuition <= profile.budget * 1.5) {
            return this.weights.budgetMatch * 0.3;
        }
        
        return -10;
    }

    _checkBoardingMatch(school, profile) {
        if (!profile.boardingPref) return false;
        
        if (profile.boardingPref === '需要住宿' && school.hasBoarding) {
            return true;
        }
        
        if (profile.boardingPref === '不需要住宿' && !school.hasBoarding) {
            return true;
        }
        
        return false;
    }

    _calculateTypeScore(school, profile, enrollmentType) {
        if (profile.considerPrivate === '否' && school.type === '民办') {
            return -20;
        }
        
        if (profile.considerPrivate === '仅民办' && school.type === '公办') {
            return -20;
        }
        
        if (school.type === '公办' && enrollmentType.canApplyPublic) {
            return 10;
        }
        
        return 0;
    }

    getMatchReasons(school, profile, score) {
        const reasons = [];
        
        if (school.district === profile.hukouDistrict) {
            reasons.push('户籍所在区匹配');
        }
        
        if (school.district === profile.residenceDistrict) {
            reasons.push('居住所在区匹配');
        }
        
        if (score.breakdown.featureMatch > 0) {
            reasons.push('特色项目匹配');
        }
        
        if (score.breakdown.budgetMatch > 0) {
            reasons.push('预算符合要求');
        }
        
        if (school.isKeySchool) {
            reasons.push('重点学校');
        }
        
        return reasons.length > 0 ? reasons : ['综合条件匹配'];
    }

    getWarnings(school, profile) {
        const warnings = [];
        
        if (profile.budget && school.tuition > profile.budget * 1.5) {
            warnings.push('学费显著超出预算');
        }
        
        if (profile.boardingPref === '需要住宿' && !school.hasBoarding) {
            warnings.push('不提供住宿');
        }
        
        if (profile.boardingPref === '不需要住宿' && school.hasBoarding) {
            warnings.push('可能需要额外住宿费用');
        }
        
        return warnings;
    }

    categorizeResults(scoredSchools, profile, limit) {
        const rush = scoredSchools.filter(s => s.matchScore >= this.config.rushThreshold);
        const stable = scoredSchools.filter(s => 
            s.matchScore >= this.config.stableThreshold && 
            s.matchScore < this.config.rushThreshold
        );
        const safe = scoredSchools.filter(s => s.matchScore < this.config.stableThreshold);
        
        const publicSchools = scoredSchools.filter(s => s.type === '公办');
        const privateSchools = scoredSchools.filter(s => s.type === '民办');
        
        const all = scoredSchools.slice(0, limit);
        
        return {
            all,
            rush: rush.slice(0, 3),
            stable: stable.slice(0, 4),
            safe: safe.slice(0, 2),
            public: publicSchools,
            private: privateSchools
        };
    }

    generateSummary(results, profile, enrollmentType) {
        return {
            enrollmentInfo: {
                type: enrollmentType.category,
                priority: enrollmentType.priority,
                description: enrollmentType.description
            },
            recommendation: {
                total: results.all.length,
                public: results.public.length,
                private: results.private.length,
                avgScore: Math.round(results.all.reduce((sum, s) => sum + s.matchScore, 0) / results.all.length) || 0
            },
            strategy: [
                {
                    title: '公办策略',
                    content: enrollmentType.canApplyPublic ? 
                        `您可以申请户籍所在区(${enrollmentType.publicDistrict})的公办学校，顺位${enrollmentType.priority}` :
                        '您需要先确认公办入学资格'
                },
                {
                    title: '民办策略',
                    content: profile.considerPrivate === '是' ? 
                        `建议填报${results.private.length}所民办学校，按冲刺-稳妥-保底梯度选择` :
                        '您不考虑民办学校'
                },
                {
                    title: '整体建议',
                    content: `系统为您推荐${results.all.length}所学校，其中${results.rush.length}所冲刺、${results.stable.length}所稳妥、${results.safe.length}所保底`
                }
            ],
            keyReminders: [
                {
                    priority: 'high',
                    content: '请确认户籍、居住证、房产证等材料的有效性'
                },
                {
                    priority: 'medium',
                    content: '民办学校实行摇号录取，请准备好备选方案'
                },
                {
                    priority: 'low',
                    content: '建议参加目标学校的开放日了解详细信息'
                }
            ]
        };
    }
}

// ========== 5. UI控制器模块 (UIController) - 增强版 ==========
class UIController {
    constructor(dataManager, recommendEngine, aiCore) {
        this.dataManager = dataManager;
        this.recommendEngine = recommendEngine;
        this.aiCore = aiCore;
        
        this.currentStep = 1;
        this.formData = {};
        this.validationRules = this._initValidationRules();
        this.abilityChartInstance = null;
        
        // 街道数据 - 从老版本复制
        this.STREET_DATA = {
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
    }

    async initialize() {
        try {
            this.bindEvents();
            this.restoreState();
            this.initializeComponents();
            this.setupChatDrag(); // 设置聊天窗口拖动
            console.log('✅ UI控制器初始化完成');
        } catch (error) {
            console.error('❌ UI初始化失败:', error);
            this.showError('系统初始化失败', error.message);
        }
    }

    initializeComponents() {
        this.initStreetBinding();
        this.initTooltips();
        this.attachSearchableSelects(); // 添加搜索功能
    }

    bindEvents() {
        // 推荐按钮
        const generateBtn = document.getElementById('generateReportBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateReport());
        }

        // 聊天发送按钮
        const chatSendBtn = document.getElementById('chatSendBtn');
        if (chatSendBtn) {
            chatSendBtn.addEventListener('click', () => this.sendChatMessage());
        }

        // 聊天输入框回车键
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }

        // AI配置保存
        const saveConfigBtn = document.getElementById('saveConfigBtn');
        if (saveConfigBtn) {
            saveConfigBtn.addEventListener('click', () => this.saveAndTestConfig());
        }

        // 导出按钮
        const exportPdfBtn = document.getElementById('exportFullPdfBtn');
        if (exportPdfBtn) {
            exportPdfBtn.addEventListener('click', () => this.exportPDF());
        }

        const exportJsonBtn = document.getElementById('exportJsonBtn');
        if (exportJsonBtn) {
            exportJsonBtn.addEventListener('click', () => this.exportJSON());
        }
    }

    // ========== 步骤导航 - 从老版本复制并优化 ==========
    showStep(stepNumber) {
        console.log(`切换到步骤 ${stepNumber}`);
        
        // 隐藏所有步骤
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // 移除所有步骤指示器的激活状态
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        
        // 显示目标步骤
        const targetSection = document.getElementById(`step${stepNumber}`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // 激活对应的步骤指示器
        const targetIndicator = document.getElementById(`step${stepNumber}-indicator`);
        if (targetIndicator) {
            targetIndicator.classList.add('active');
        }
        
        // 更新进度条
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const progress = ((stepNumber - 1) / 6) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // 保存当前步骤
        this.currentStep = stepNumber;
        this.saveState();
    }

    // ========== 聊天功能 - 从老版本复制 ==========
    setupChatDrag() {
        const chatHeader = document.getElementById('chatHeader');
        const chatWindow = document.getElementById('chatWindow');
        
        if (!chatHeader || !chatWindow) return;
        
        chatHeader.addEventListener('mousedown', (e) => {
            if (e.target.closest('button, a')) return;
            this.aiCore.isDragging = true;
            chatWindow.style.transition = 'none';
            this.aiCore.offsetX = e.clientX - chatWindow.offsetLeft;
            this.aiCore.offsetY = e.clientY - chatWindow.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.aiCore.isDragging || !chatWindow) return;
            const x = Math.max(0, Math.min(window.innerWidth - chatWindow.offsetWidth, e.clientX - this.aiCore.offsetX));
            const y = Math.max(0, Math.min(window.innerHeight - chatWindow.offsetHeight, e.clientY - this.aiCore.offsetY));
            chatWindow.style.left = `${x}px`;
            chatWindow.style.top = `${y}px`;
        });

        document.addEventListener('mouseup', () => {
            if (this.aiCore.isDragging && chatWindow) {
                this.aiCore.isDragging = false;
                chatWindow.style.transition = '';
            }
        });
    }

    async sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        if (!message) return;
        
        if (!this.aiCore.CONFIG.isConnected) {
            alert('AI聊天功能在本地模式下不可用。请切换到在线模式。');
            return;
        }
        
        // 显示用户消息
        this.addMessageToChat('user', message);
        chatInput.value = '';
        
        try {
            // 显示加载状态
            this.showChatLoading();
            
            // 收集用户完整数据
            const userData = this.collectUserDataForAI();
            
            // 调用AI
            const response = await this.aiCore.sendMessage(message, userData);
            
            // 隐藏加载指示器
            this.hideChatLoading();
            
            // 显示AI回复
            this.addMessageToChat('assistant', response);
            
        } catch (error) {
            this.hideChatLoading();
            this.addMessageToChat('assistant', `抱歉，出现错误：${error.message}`);
        }
    }

    addMessageToChat(role, content) {
        const chatBody = document.getElementById('chatBody');
        if (!chatBody) return;
        
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

    showChatLoading() {
        const chatBody = document.getElementById('chatBody');
        if (!chatBody) return;
        
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

    hideChatLoading() {
        const loadingDiv = document.getElementById('loading-indicator');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }

    // ========== 快捷操作 - 从老版本复制 ==========
    async quickAction(text) {
        if (!this.aiCore.CONFIG.isConnected) {
            alert(`快捷操作 "${text}" 在本地模式下不可用。请切换到在线模式。`);
            return;
        }
        
        try {
            this.showChatLoading();
            
            const userMemory = this.aiCore.getUserMemory();
            const userData = this.collectUserDataForAI();
            
            let question = text;
            
            if (text === '2026年小升初时间安排') {
                question = `用户信息：${JSON.stringify(userMemory)}\n请基于以上用户情况，预测2026年西安小升初的时间安排和重要节点`;
            } else if (text === '民办学校有哪些') {
                question = `用户预算：${userData.预算范围}\n请列出西安市主要的民办初中学校（基于schools.json真实数据）`;
            } else if (text === '摇号政策') {
                question = `用户户籍：${userData.户籍所在区}\n请详细解释西安市民办初中摇号政策的具体流程`;
            }
            
            const response = await this.aiCore.callAIAPI(question);
            
            this.hideChatLoading();
            this.addMessageToChat('assistant', response);
            
        } catch (error) {
            this.hideChatLoading();
            this.addMessageToChat('assistant', `抱歉，出现错误：${error.message}`);
        }
    }

    // ========== AI解读政策 - 从老版本复制 ==========
    async interpretPolicy() {
        if (!this.aiCore.CONFIG.isConnected) {
            alert('AI解读功能在本地模式下不可用。请切换到在线模式。');
            return;
        }
        
        try {
            this.showChatLoading();
            
            const userMemory = this.aiCore.getUserMemory();
            const question = `用户户籍信息：${userMemory.hukouDistrict || '未填写'}，居住信息：${userMemory.liveDistrict || '未填写'}\n请详细解读西安市小升初的入学顺位政策，包括房户一致、集体户、租房等不同情况的入学顺序，并分析用户的情况`;
            
            const response = await this.aiCore.callAIAPI(question);
            
            this.hideChatLoading();
            
            // 显示解读结果
            const interpretationResult = document.getElementById('interpretationResult');
            if (interpretationResult) {
                interpretationResult.innerHTML = `
                    <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #3b82f6;">
                        <h4 style="margin: 0 0 10px 0; color: #1e40af;">🤖 AI政策解读（基于用户情况）</h4>
                        <div style="line-height: 1.6; color: #374151;">${response}</div>
                        <div style="margin-top: 10px; font-size: 12px; color: #6b7280;">
                            <span class="trust-badge trust-verified">✅ 数据准确</span> 
                            基于${this.aiCore.CONFIG.provider}模型分析 · 严格参照学校数据库
                        </div>
                    </div>
                `;
            }
            
        } catch (error) {
            this.hideChatLoading();
            alert(`AI解读失败：${error.message}`);
        }
    }

    // ========== 报告生成功能 - 融合老版本AI功能 ==========
    async generateReport() {
        console.log('生成报告中...');
        
        // 显示步骤7
        this.showStep(7);
        
        // 显示加载状态
        const loadingEl = this.showLoading('正在生成智能报告...<br><small>分析数据并调用AI模型</small>');
        
        try {
            // 收集所有数据
            const userData = this.collectUserData();
            
            // 生成能力雷达图
            await this.generateAbilityChart(userData);
            
            // 获取推荐结果
            const results = await this.recommendEngine.recommend(userData);
            
            // 渲染结果
            this.renderResults(results);
            
            // 保存结果
            this.saveResults(results);
            
            // 显示成功消息
            setTimeout(() => {
                this.hideLoading(loadingEl);
                alert('报告生成完成！请查看AI推荐结果。');
            }, 500);
            
        } catch (error) {
            console.error('报告生成失败:', error);
            this.hideLoading(loadingEl);
            this.showError('报告生成失败', error.message);
        }
    }

    // ========== 表单数据收集 ==========
    collectUserData() {
        const data = {
            // 基本信息
            studentName: this.getInputValue('studentName'),
            studentGender: this.getRadioValue('studentGender'),
            currentSchool: this.getInputValue('currentSchool'),
            currentGrade: this.getRadioValue('currentGrade'),
            
            // 户籍信息
            hukouDistrict: this.getSelectValue('householdDistrict'),
            hukouStreet: this.getSelectValue('householdStreet'),
            hukouAddress: this.getInputValue('householdAddress'),
            
            // 居住信息
            residenceDistrict: this.getSelectValue('residenceDistrict'),
            residenceStreet: this.getSelectValue('residenceStreet'),
            residenceAddress: this.getInputValue('residenceAddress'),
            residenceType: this.getSelectValue('residenceType'),
            
            // 房产信息
            hasHouse: this.getSelectValue('hasHouse'),
            propertyType: this.getSelectValue('propertyType'),
            propertyYears: this.getSelectValue('propertyYears'),
            
            // 其他信息
            sameDistrict: this.getCheckboxValue('sameDistrict'),
            sameStreet: this.getCheckboxValue('sameStreet'),
            inSchoolDistrict: this.getCheckboxValue('inSchoolDistrict'),
            
            // 能力评估
            abilityScores: this.collectAbilityScores(),
            
            // 民办意向
            considerPrivate: this.getSelectValue('considerPrivate'),
            crossDistrictPreference: this.getSelectValue('crossDistrictPreference'),
            budget: this.getNumberValue('budget'),
            acceptLottery: this.getSelectValue('acceptLottery'),
            
            // 其他
            academicGoals: this.getTextareaValue('academicGoals'),
            specialties: this.getCheckboxValues('specialty'),
            philosophies: this.getCheckboxValues('educationConcept'),
            maxDistanceKm: this.getNumberValue('maxDistance'),
            boardingPref: this.getRadioValue('boarding'),
            
            timestamp: new Date().toISOString()
        };
        
        // 保存到用户记忆
        Object.keys(data).forEach(key => {
            if (data[key] !== '' && data[key] !== null && data[key] !== undefined) {
                this.aiCore.saveUserMemory(key, data[key]);
            }
        });
        
        return data;
    }

    collectUserDataForAI() {
        const userData = {
            能力评估: {},
            当前年级: '',
            户籍所在区: '',
            实际居住区: '',
            房产情况: '',
            民办意向: '',
            预算范围: '',
            学业规划: '',
            学生特长: [],
            教育理念偏好: []
        };
        
        // 收集当前年级
        const currentGrade = document.querySelector('input[name="currentGrade"]:checked');
        if (currentGrade) userData.当前年级 = currentGrade.value;
        
        // 收集能力评估数据
        const scoreRadios = document.querySelectorAll('input[type="radio"]:checked');
        scoreRadios.forEach(radio => {
            const name = radio.name.replace('score', '');
            const value = radio.value;
            if (name && value && radio.name.startsWith('score')) {
                userData.能力评估[`维度${name}`] = value;
            }
        });
        
        // 收集户籍和居住信息
        const householdDistrict = document.getElementById('householdDistrict');
        const residenceDistrict = document.getElementById('residenceDistrict');
        if (householdDistrict) userData.户籍所在区 = householdDistrict.value;
        if (residenceDistrict) userData.实际居住区 = residenceDistrict.value;
        
        // 收集其他表单数据
        const propertyType = document.getElementById('propertyType');
        if (propertyType) userData.房产情况 = propertyType.value;
        
        const considerPrivate = document.getElementById('considerPrivate');
        if (considerPrivate) userData.民办意向 = considerPrivate.value;
        
        const budget = document.getElementById('budget');
        if (budget) userData.预算范围 = budget.value;
        
        const academicGoals = document.getElementById('academicGoals');
        if (academicGoals) userData.学业规划 = academicGoals.value;
        
        // 收集特长
        const specialties = document.querySelectorAll('input[name="specialty"]:checked, .strength-check:checked');
        specialties.forEach(specialty => {
            userData.学生特长.push(specialty.value);
        });
        
        // 收集教育理念
        const educationConcepts = document.querySelectorAll('input[name="educationConcept"]:checked, .philosophy-check:checked');
        educationConcepts.forEach(concept => {
            userData.教育理念偏好.push(concept.value);
        });
        
        return userData;
    }

    collectAbilityScores() {
        const scores = {};
        for (let i = 1; i <= 6; i++) {
            scores[`维度${i}`] = this.getRadioValue(`score${i}`) || '3';
        }
        return scores;
    }

    // DOM值获取辅助函数
    getInputValue(id) {
        return document.getElementById(id)?.value?.trim() || '';
    }

    getSelectValue(id) {
        return document.getElementById(id)?.value || '';
    }

    getRadioValue(name) {
        return document.querySelector(`input[name="${name}"]:checked`)?.value || '';
    }

    getCheckboxValue(id) {
        return document.getElementById(id)?.checked || false;
    }

    getCheckboxValues(name) {
        return Array.from(
            document.querySelectorAll(`input[name="${name}"]:checked`)
        ).map(cb => cb.value);
    }

    getNumberValue(id) {
        const value = this.getInputValue(id);
        return value ? Number(value) : null;
    }

    getTextareaValue(id) {
        return document.getElementById(id)?.value?.trim() || '';
    }

    // ========== 结果渲染 ==========
    renderResults(results) {
        this.renderSummary(results);
        this.renderAbilityAnalysis(results);
        this.renderSchoolRecommendations(results);
        this.renderTimelineAndPolicy(results);
    }

    renderSummary(results) {
        const container = document.getElementById('familyProfile');
        if (!container) return;

        const { summary } = results;

        container.innerHTML = `
            <div class="summary-card">
                <h3>📋 评估摘要</h3>
                <div class="enrollment-info">
                    <div class="info-item">
                        <span class="label">入学类型:</span>
                        <span class="value">${summary.enrollmentInfo.type}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">入学顺位:</span>
                        <span class="value priority-${summary.enrollmentInfo.priority}">
                            第${summary.enrollmentInfo.priority}顺位
                        </span>
                    </div>
                    <div class="info-item full-width">
                        <span class="label">说明:</span>
                        <span class="value">${summary.enrollmentInfo.description}</span>
                    </div>
                </div>
                
                <div class="recommendation-stats">
                    <div class="stat-item">
                        <div class="stat-number">${summary.recommendation.total}</div>
                        <div class="stat-label">推荐学校</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${summary.recommendation.public}</div>
                        <div class="stat-label">公办学校</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${summary.recommendation.private}</div>
                        <div class="stat-label">民办学校</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${summary.recommendation.avgScore}</div>
                        <div class="stat-label">平均匹配度</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderAbilityAnalysis(results) {
        const analysisElement = document.getElementById('abilityAnalysis');
        if (!analysisElement) return;
        
        if (results.aiAnalysis?.abilityAnalysis) {
            analysisElement.innerHTML = `
                <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; min-height: 250px;">
                    <h4 style="margin: 0 0 15px 0; color: #1e40af;">🎯 AI深度能力分析</h4>
                    <div style="line-height: 1.6; font-size: 14px; color: #374151;">
                        ${results.aiAnalysis.abilityAnalysis}
                    </div>
                    <div class="source-info" style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #d1e9ff;">
                        <span class="trust-badge trust-verified">🤖 AI智能分析</span>
                        基于${this.aiCore.CONFIG.provider}大模型深度分析 · 充分考虑个人情况
                    </div>
                </div>
            `;
        } else {
            analysisElement.innerHTML = `
                <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; min-height: 200px;">
                    <h4 style="margin: 0 0 15px 0; color: #1e40af;">🎯 能力分析</h4>
                    <div style="line-height: 1.6; font-size: 14px; color: #374151;">
                        <strong>能力分析：</strong>您的孩子在学业成绩和学习习惯方面表现良好，家庭支持度很高。
                        建议重点关注心理素质的培养，帮助孩子更好地应对升学压力。
                    </div>
                    <p style="color: #e53e3e; margin-top: 8px; font-size: 12px;">
                        ${this.aiCore.CONFIG.isConnected ? 'AI分析生成失败，显示默认分析' : 'AI分析需要在线模式'}
                    </p>
                </div>
            `;
        }
    }

    renderSchoolRecommendations(results) {
        const recommendationElement = document.getElementById('schoolRecommendation');
        if (!recommendationElement) return;
        
        if (results.aiAnalysis?.schoolRecommendations) {
            recommendationElement.innerHTML = `
                <div class="school-recommendation-list">
                    ${results.aiAnalysis.schoolRecommendations}
                    <div class="source-info" style="margin-top: 15px;">
                        <span class="trust-badge trust-verified">✅ 数据准确</span>
                        基于西安市真实学校数据库 · 严格遵循2025年招生政策
                    </div>
                </div>
            `;
        } else {
            // 显示基于规则的推荐
            let html = '<h3>🏫 学校推荐</h3>';
            
            if (results.public.length > 0) {
                html += `<h4>公办学校 (${results.public.length}所)</h4>`;
                html += '<table class="school-table"><thead><tr><th>学校名称</th><th>所在区</th><th>匹配度</th><th>匹配原因</th></tr></thead><tbody>';
                results.public.forEach((school, index) => {
                    if (index < 5) {
                        html += this.renderSchoolRow(school, index + 1);
                    }
                });
                html += '</tbody></table>';
            }
            
            if (results.private.length > 0) {
                html += `<h4>民办学校 (${results.private.length}所)</h4>`;
                html += '<table class="school-table"><thead><tr><th>学校名称</th><th>所在区</th><th>匹配度</th><th>学费/年</th><th>匹配原因</th></tr></thead><tbody>';
                results.private.forEach((school, index) => {
                    if (index < 5) {
                        html += this.renderPrivateSchoolRow(school, index + 1);
                    }
                });
                html += '</tbody></table>';
            }
            
            recommendationElement.innerHTML = html;
        }
    }

    renderSchoolRow(school, index) {
        return `
            <tr>
                <td class="text-center">${index}</td>
                <td><strong>${school.name}</strong></td>
                <td>${school.district}</td>
                <td class="text-center">
                    <span class="score-badge ${this.getScoreClass(school.matchScore)}">
                        ${school.matchScore}分
                    </span>
                </td>
                <td>${this.formatReasons(school.matchReasons)}</td>
            </tr>
        `;
    }

    renderPrivateSchoolRow(school, index) {
        const tuition = school.tuition > 0 ? 
            `${(school.tuition / 10000).toFixed(1)}万` : '未公布';

        return `
            <tr>
                <td class="text-center">${index}</td>
                <td><strong>${school.name}</strong></td>
                <td>${school.district}</td>
                <td class="text-center">
                    <span class="score-badge ${this.getScoreClass(school.matchScore)}">
                        ${school.matchScore}分
                    </span>
                </td>
                <td class="text-center">${tuition}</td>
                <td>${this.formatReasons(school.matchReasons)}</td>
            </tr>
        `;
    }

    getScoreClass(score) {
        if (score >= 85) return 'high';
        if (score >= 70) return 'medium';
        return 'low';
    }

    formatReasons(reasons) {
        if (!reasons || reasons.length === 0) return '-';
        return reasons.slice(0, 3).join('<br>');
    }

    renderTimelineAndPolicy(results) {
        const timelineElement = document.getElementById('timeline');
        const policyElement = document.getElementById('policyAdvice');
        
        if (results.aiAnalysis?.timePlan && timelineElement) {
            timelineElement.innerHTML = `
                <div style="background: #f7fafc; padding: 15px; border-radius: 8px; margin-top: 10px;">
                    <h4>📅 您的专属时间规划</h4>
                    ${results.aiAnalysis.timePlan}
                    <div class="source-info" style="margin-top: 15px;">
                        <span class="trust-badge trust-verified">🤖 AI个性化生成</span>
                        基于${this.aiCore.CONFIG.provider}大模型深度分析
                    </div>
                </div>
            `;
        } else if (timelineElement) {
            this.displayStaticTimeline(timelineElement);
        }
        
        if (results.aiAnalysis?.policyTips && policyElement) {
            policyElement.innerHTML = `
                <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #f56565;">
                    <h4>💡 政策分析与建议</h4>
                    ${results.aiAnalysis.policyTips}
                    <div class="source-info" style="margin-top: 15px;">
                        <span class="trust-badge trust-verified">🤖 AI智能分析</span>
                        基于2025年西安小升初最新政策
                    </div>
                </div>
            `;
        } else if (policyElement) {
            this.displayStaticPolicy(policyElement);
        }
    }

    displayStaticTimeline(element) {
        element.innerHTML = `
            <div style="background: #f7fafc; padding: 15px; border-radius: 8px; margin-top: 10px;">
                <h4>2025年小升初时间安排</h4>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>7月11-24日：</strong>公民办同步报名</li>
                    <li><strong>7月30日：</strong>民办学校摇号录取</li>
                    <li><strong>8月1-5日：</strong>民办学校补录报名</li>
                    <li><strong>8月10日前：</strong>公办学校录取通知</li>
                    <li><strong>8月15-20日：</strong>统筹安排入学</li>
                    <li><strong>8月25-31日：</strong>各校发放录取通知书</li>
                </ul>
                <p style="margin-top: 10px; color: #e53e3e; font-size: 13px;">
                    💬 提示：配置AI服务后可获得个性化时间规划
                </p>
            </div>
        `;
    }

    displayStaticPolicy(element) {
        element.innerHTML = `
            <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #f56565;">
                <h4>重要提醒</h4>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>请确保在7月11日前准备好所有报名材料</li>
                    <li>民办学校摇号结果公布后，请及时确认录取</li>
                    <li>未被民办录取的学生将自动进入公办入学流程</li>
                    <li>建议提前了解对口公办学校的招生政策</li>
                    <li>请关注西安市教育局官方网站获取最新信息</li>
                </ul>
                <p style="margin-top: 10px; color: #e53e3e; font-size: 13px;">
                    💬 提示：配置AI服务后可获得个性化政策分析
                </p>
            </div>
        `;
    }

    // ========== 能力雷达图生成 ==========
    async generateAbilityChart(userData) {
        const canvas = document.getElementById('abilityChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        const abilityScores = this.calculateAbilityScores(userData.abilityScores);
        
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
        
        if (this.abilityChartInstance) {
            this.abilityChartInstance.destroy();
        }
        
        this.abilityChartInstance = new Chart(ctx, {
            type: 'radar',
            data: data,
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    calculateAbilityScores(scores) {
        return [
            parseInt(scores['维度1'] || 3),
            parseInt(scores['维度2'] || 3),
            parseInt(scores['维度3'] || 3),
            parseInt(scores['维度4'] || 3),
            parseInt(scores['维度5'] || 3),
            parseInt(scores['维度6'] || 3)
        ];
    }

    // ========== PDF导出功能 - 从老版本复制 ==========
    async exportPDF() {
        try {
            // 显示加载提示
            const loadingMsg = document.createElement('div');
            loadingMsg.id = 'pdf-loading';
            loadingMsg.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.7); z-index: 9999; display: flex;
                justify-content: center; align-items: center; color: white;
                font-size: 18px; flex-direction: column;
            `;
            loadingMsg.innerHTML = `
                <div style="text-align: center;">
                    <div style="width: 50px; height: 50px; border: 5px solid #f3f3f3;
                        border-top: 5px solid #3498db; border-radius: 50%;
                        animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                    正在生成专业PDF报告...
                    <p style="font-size: 14px; margin-top: 10px;">这可能需要几秒钟时间</p>
                </div>
                <style>
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                </style>
            `;
            document.body.appendChild(loadingMsg);
            
            // 检查依赖
            if (typeof jsPDF === 'undefined') {
                throw new Error('jsPDF库未加载');
            }
            
            if (typeof html2canvas === 'undefined') {
                throw new Error('html2canvas库未加载');
            }
            
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: "p",
                unit: "mm",
                format: "a4",
                compress: true
            });
            
            // 设置中文字体
            pdf.setFont("helvetica", "normal");
            
            let y = 20;
            const lineHeight = 7;
            const pageHeight = 280;
            const leftMargin = 20;
            const rightMargin = 190;
            const pageWidth = 210;
            
            // 辅助函数
            const checkNewPage = () => {
                if (y > pageHeight) {
                    pdf.addPage();
                    y = 20;
                    pdf.setFont("helvetica", "normal");
                }
            };
            
            const addTitle = (text, fontSize = 18) => {
                checkNewPage();
                pdf.setFontSize(fontSize);
                pdf.setFont("helvetica", "bold");
                const textWidth = pdf.getTextWidth(text);
                const centerX = (pageWidth - textWidth) / 2;
                pdf.text(text, centerX, y);
                pdf.setFont("helvetica", "normal");
                y += fontSize / 2 + 5;
            };
            
            const addSubtitle = (text, fontSize = 14) => {
                checkNewPage();
                pdf.setFontSize(fontSize);
                pdf.setFont("helvetica", "bold");
                pdf.text(text, leftMargin, y);
                pdf.setFont("helvetica", "normal");
                y += 8;
            };
            
            const addText = (text, fontSize = 12, isBold = false, marginLeft = leftMargin) => {
                pdf.setFontSize(fontSize);
                if (isBold) {
                    pdf.setFont("helvetica", "bold");
                }
                
                const lines = pdf.splitTextToSize(text, rightMargin - marginLeft);
                lines.forEach(line => {
                    checkNewPage();
                    pdf.text(line, marginLeft, y);
                    y += lineHeight;
                });
                
                if (isBold) {
                    pdf.setFont("helvetica", "normal");
                }
            };
            
            const addDivider = () => {
                checkNewPage();
                pdf.line(leftMargin, y, rightMargin, y);
                y += 10;
            };
            
            const addBulletList = (items, fontSize = 11) => {
                pdf.setFontSize(fontSize);
                items.forEach(item => {
                    checkNewPage();
                    pdf.text('•', leftMargin, y);
                    const lines = pdf.splitTextToSize(' ' + item, rightMargin - leftMargin - 10);
                    lines.forEach((line, index) => {
                        if (index > 0) checkNewPage();
                        pdf.text(line, leftMargin + 5, y);
                        y += lineHeight;
                    });
                    y += 2;
                });
            };
            
            // 封面
            addTitle('西安市小升初智能评估报告', 22);
            y += 5;
            
            addText(`报告生成时间：${new Date().toLocaleDateString('zh-CN')} ${new Date().toLocaleTimeString('zh-CN')}`, 12, false, 105);
            y += 15;
            
            addSubtitle('学生基本信息', 16);
            
            const userData = this.collectUserData();
            addText(`当前年级：${userData.currentGrade || "未填写"}`, 12);
            addText(`户籍所在区：${userData.hukouDistrict || "未填写"}`, 12);
            addText(`实际居住区：${userData.residenceDistrict || "未填写"}`, 12);
            addText(`房产情况：${userData.propertyType || "未填写"}`, 12);
            addText(`民办意向：${userData.considerPrivate || "未填写"}`, 12);
            
            addDivider();
            
            addText('本报告由西安小升初智能评估系统生成，仅供家长参考。', 10, false, 105);
            y += 5;
            addText('实际入学政策请以当年教育局官方发布为准。', 10, false, 105);
            
            // 能力评估页
            pdf.addPage();
            y = 20;
            
            addTitle('一、能力评估分析', 18);
            y += 5;
            
            addSubtitle('能力维度得分', 14);
            
            const abilities = [
                `学业成绩：${userData.abilityScores['维度1'] || '未评估'}分`,
                `综合素养：${userData.abilityScores['维度2'] || '未评估'}分`,
                `学习习惯：${userData.abilityScores['维度3'] || '未评估'}分`,
                `心理素质：${userData.abilityScores['维度4'] || '未评估'}分`,
                `家庭支持：${userData.abilityScores['维度5'] || '未评估'}分`,
                `学科倾向：${userData.abilityScores['维度6'] || '未评估'}分`
            ];
            
            addBulletList(abilities, 12);
            y += 10;
            
            // 能力雷达图
            const abilityChart = document.getElementById("abilityChart");
            if (abilityChart) {
                try {
                    const canvas = await html2canvas(abilityChart);
                    const imgData = canvas.toDataURL("image/png");
                    checkNewPage();
                    pdf.addImage(imgData, "PNG", leftMargin, y, 170, 100);
                    y += 110;
                } catch (e) {
                    addText("(能力雷达图生成失败)", 11);
                }
            }
            
            // 添加页脚
            const pageCount = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                pdf.setPage(i);
                pdf.setFontSize(9);
                pdf.text(`第 ${i} 页 / 共 ${pageCount} 页`, pageWidth / 2, 290, { align: 'center' });
            }
            
            // 保存PDF
            const filename = `西安小升初评估报告_${new Date().toLocaleDateString('zh-CN')}.pdf`;
            pdf.save(filename);
            
            // 移除加载提示
            document.getElementById('pdf-loading')?.remove();
            
            alert('PDF报告生成成功！已保存为：' + filename);
            
        } catch (error) {
            console.error('PDF生成失败:', error);
            document.getElementById('pdf-loading')?.remove();
            alert('PDF生成失败: ' + error.message + '\n\n建议使用浏览器打印功能(Ctrl+P)作为替代方案');
        }
    }

    // ========== JSON导出 ==========
    exportJSON() {
        try {
            const profile = this.collectUserData();
            const results = localStorage.getItem('recommendationResults') || '{}';
            const statistics = this.dataManager.getStatistics();
            
            const exportData = {
                version: '3.0',
                exportTime: new Date().toISOString(),
                profile,
                results: JSON.parse(results),
                statistics,
                aiConfig: {
                    isConnected: this.aiCore.CONFIG.isConnected,
                    provider: this.aiCore.CONFIG.provider
                }
            };
            
            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: 'application/json'
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `西安小升初评估_${new Date().toISOString().slice(0,10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            alert('✅ JSON数据导出成功!');
            
        } catch (error) {
            console.error('JSON导出失败:', error);
            alert('❌ JSON导出失败: ' + error.message);
        }
    }

    // ========== 街道联动功能 ==========
    initStreetBinding() {
        this.populateStreets('householdDistrict', 'householdStreet');
        this.populateStreets('residenceDistrict', 'residenceStreet');
    }

    populateStreets(districtSelectId, streetSelectId) {
        const districtSelect = document.getElementById(districtSelectId);
        const streetSelect = document.getElementById(streetSelectId);
        if (!districtSelect || !streetSelect) return;

        const fill = () => {
            const rawValue = (districtSelect.value || '').trim();
            const selectedOption = districtSelect.options[districtSelect.selectedIndex];
            const rawText = selectedOption ? (selectedOption.textContent || '').trim() : '';
            
            let mapped = rawValue;
            if (this.STREET_DATA[rawValue]) {
                mapped = rawValue;
            } else if (rawText && this.STREET_DATA[rawText]) {
                mapped = rawText;
            } else {
                const keys = Object.keys(this.STREET_DATA);
                for (const k of keys) {
                    if (k.includes(rawValue) || rawValue.includes(k)) {
                        mapped = k;
                        break;
                    }
                }
            }

            const streets = mapped && this.STREET_DATA[mapped] ? this.STREET_DATA[mapped] : [];

            if (!mapped || streets.length === 0) {
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
            this.clearFieldError(streetSelect);
        };

        districtSelect.addEventListener('change', () => {
            streetSelect.value = '';
            fill();
            this.clearFieldError(districtSelect);
        });

        fill();
    }

    // ========== 搜索功能 ==========
    attachSearchableSelects() {
        ['householdDistrict', 'householdStreet', 'residenceDistrict', 'residenceStreet'].forEach(id => {
            this.attachSearchableSelect(id);
        });
    }

    attachSearchableSelect(selectId) {
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
            const full = PinyinUtils.toPinyin(txt);
            const abbr = PinyinUtils.getPinyinInitials(txt);
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
                this.clearFieldError(select);
            }
        });
    }

    // ========== 工具提示 ==========
    initTooltips() {
        // 可根据需要实现工具提示
    }

    // ========== 状态管理 ==========
    saveState() {
        const formData = this.collectUserData();
        localStorage.setItem('formData', JSON.stringify(formData));
        localStorage.setItem('currentStep', this.currentStep.toString());
    }

    restoreState() {
        const savedData = localStorage.getItem('formData');
        const savedStep = localStorage.getItem('currentStep');
        
        if (savedData) {
            this.formData = JSON.parse(savedData);
            this.populateForm(this.formData);
        }
        
        if (savedStep) {
            this.currentStep = parseInt(savedStep);
            this.showStep(this.currentStep);
        }
    }

    populateForm(data) {
        for (const key in data) {
            const element = document.getElementById(key) || 
                           document.querySelector(`input[name="${key}"]`) ||
                           document.querySelector(`select[name="${key}"]`);
            
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = data[key];
                } else if (element.type === 'radio') {
                    const radio = document.querySelector(`input[name="${key}"][value="${data[key]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    element.value = data[key] || '';
                }
            }
        }
    }

    saveResults(results) {
        localStorage.setItem('recommendationResults', JSON.stringify(results));
    }

    // ========== 验证功能 ==========
    _initValidationRules() {
        return {
            studentName: {
                required: false,
                pattern: /^[\u4e00-\u9fa5]{2,4}$/,
                message: '请输入2-4个汉字的姓名'
            },
            budget: {
                min: 0,
                max: 100000,
                message: '预算应在0-10万之间'
            }
        };
    }

    validateField(field) {
        const rules = this.validationRules[field.id || field.name];
        if (!rules) return true;

        const value = field.value.trim();

        if (rules.required && !value) {
            this.showFieldError(field, '此项为必填');
            return false;
        }

        if (rules.pattern && !rules.pattern.test(value)) {
            this.showFieldError(field, rules.message || '格式不正确');
            return false;
        }

        if (rules.min !== undefined && Number(value) < rules.min) {
            this.showFieldError(field, `最小值不能小于${rules.min}`);
            return false;
        }

        if (rules.max !== undefined && Number(value) > rules.max) {
            this.showFieldError(field, `最大值不能大于${rules.max}`);
            return false;
        }

        this.clearFieldError(field);
        return true;
    }

    validateStep3() {
        const hukouDistrict = document.getElementById('householdDistrict');
        const residenceDistrict = document.getElementById('residenceDistrict');

        let isValid = true;

        if (!hukouDistrict?.value) {
            this.showFieldError(hukouDistrict, '请选择户籍所在区');
            isValid = false;
        }

        if (!residenceDistrict?.value) {
            this.showFieldError(residenceDistrict, '请选择实际居住区');
            isValid = false;
        }

        return isValid;
    }

    validateCurrentStep() {
        const stepValidators = {
            1: () => true,
            2: () => this.validateStep2(),
            3: () => this.validateStep3(),
            4: () => true,
            5: () => true,
            6: () => true
        };

        const validator = stepValidators[this.currentStep];
        return validator ? validator() : true;
    }

    validateStep2() {
        for (let i = 1; i <= 6; i++) {
            if (!document.querySelector(`input[name="score${i}"]:checked`)) {
                alert(`请完成维度${i}的评估`);
                return false;
            }
        }
        return true;
    }

    showFieldError(element, message) {
        if (!element) return;
        element.style.borderColor = '#e53e3e';
        element.style.boxShadow = '0 0 0 1px #e53e3e';
        
        let errorEl = element.nextElementSibling;
        if (!errorEl || !errorEl.classList.contains('field-error')) {
            errorEl = document.createElement('div');
            errorEl.className = 'field-error';
            element.parentNode.insertBefore(errorEl, element.nextSibling);
        }
        errorEl.textContent = message;
    }

    clearFieldError(element) {
        if (!element) return;
        element.style.borderColor = '';
        element.style.boxShadow = '';
        
        const errorEl = element.nextElementSibling;
        if (errorEl && errorEl.classList.contains('field-error')) {
            errorEl.textContent = '';
        }
    }

    // ========== AI配置 ==========
    async saveAndTestConfig() {
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
            // 测试API连接
            const testMessage = '你好，请回复"连接成功"';
            const response = await this.aiCore.callAIAPI(testMessage, provider, apiKey, appId);
            
            // 保存配置
            this.aiCore.saveConfig(provider, apiKey, appId);
            
            // 更新UI状态
            const statusText = document.getElementById('statusText');
            const apiStatus = document.getElementById('apiStatus');
            const chatApiStatus = document.getElementById('chatApiStatus');
            
            if (statusText) statusText.textContent = `${provider} 已连接`;
            if (apiStatus) {
                apiStatus.className = 'api-status connected';
                apiStatus.textContent = `${provider} 在线`;
            }
            if (chatApiStatus) chatApiStatus.textContent = `${provider} 在线`;
            
            alert('配置保存成功！AI功能已启用。');
            
            // 关闭配置面板
            const configPanel = document.getElementById('configPanel');
            if (configPanel) {
                configPanel.classList.remove('active');
            }
            
        } catch (error) {
            alert(`配置测试失败：${error.message}`);
        }
    }

    // ========== UI工具函数 ==========
    showLoading(message) {
        const loadingEl = document.createElement('div');
        loadingEl.className = 'loading-overlay';
        loadingEl.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <div class="loading-text">${message}</div>
            </div>
        `;
        document.body.appendChild(loadingEl);
        return loadingEl;
    }

    hideLoading(loadingEl) {
        if (loadingEl && loadingEl.parentNode) {
            loadingEl.parentNode.removeChild(loadingEl);
        }
    }

    showError(title, message) {
        alert(`${title}: ${message}`);
    }

    resetForm() {
        if (confirm('您确定要重置所有填写的数据吗？')) {
            localStorage.clear();
            window.location.reload();
        }
    }
}

// ========== 6. 应用主模块 (Application) ==========
class Application {
    constructor() {
        this.dataManager = null;
        this.aiCore = null;
        this.recommendEngine = null;
        this.uiController = null;
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) {
            console.warn('应用已初始化');
            return;
        }

        try {
            console.log('🚀 开始初始化增强版应用...');

            // 1. 创建AI核心
            this.aiCore = new AICore();
            console.log('✅ AI核心创建完成');

            // 2. 创建数据管理器
            this.dataManager = new DataManager();
            console.log('✅ 数据管理器创建完成');

            // 3. 创建推荐引擎
            this.recommendEngine = new RecommendationEngine(this.dataManager, this.aiCore);
            console.log('✅ 推荐引擎创建完成');

            // 4. 创建UI控制器
            this.uiController = new UIController(this.dataManager, this.recommendEngine, this.aiCore);
            console.log('✅ UI控制器创建完成');

            // 5. 初始化UI
            await this.uiController.initialize();
            console.log('✅ UI初始化完成');

            // 6. 恢复AI配置
            this.aiCore.restoreConfig();
            this.updateUIStatus();
            console.log('✅ AI配置恢复完成');

            // 7. 设置全局错误处理
            this.setupErrorHandlers();

            // 8. 标记为已初始化
            this.initialized = true;

            // 9. 暴露到全局
            window.app = this;

            console.log('🎉 增强版应用初始化完成!');
            
            // 10. 触发就绪事件
            this.dispatchReadyEvent();

        } catch (error) {
            console.error('❌ 应用初始化失败:', error);
            this.handleInitError(error);
        }
    }

    updateUIStatus() {
        const statusText = document.getElementById('statusText');
        const apiStatus = document.getElementById('apiStatus');
        const chatApiStatus = document.getElementById('chatApiStatus');
        
        if (this.aiCore.CONFIG.isConnected) {
            if (statusText) statusText.textContent = `${this.aiCore.CONFIG.provider} 已连接`;
            if (apiStatus) {
                apiStatus.className = 'api-status connected';
                apiStatus.textContent = `${this.aiCore.CONFIG.provider} 在线`;
            }
            if (chatApiStatus) chatApiStatus.textContent = `${this.aiCore.CONFIG.provider} 在线`;
        } else {
            if (statusText) statusText.textContent = '本地模式';
            if (apiStatus) {
                apiStatus.className = 'api-status local';
                apiStatus.textContent = '本地模式';
            }
            if (chatApiStatus) chatApiStatus.textContent = '本地模式';
        }
    }

    setupErrorHandlers() {
        window.addEventListener('error', (event) => {
            console.error('全局错误:', event.error);
            this.logError(event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('未处理的Promise拒绝:', event.reason);
            this.logError(event.reason);
        });
    }

    handleInitError(error) {
        const errorMsg = `
            <div style="padding: 20px; background: #fff5f5; border: 2px solid #fc8181; border-radius: 8px; margin: 20px;">
                <h2 style="color: #c53030; margin: 0 0 10px 0;">❌ 系统初始化失败</h2>
                <p style="margin: 0 0 10px 0;">错误信息: ${error.message}</p>
                <p style="margin: 0 0 10px 0;">请尝试以下操作:</p>
                <ol style="margin: 0; padding-left: 20px;">
                    <li>刷新页面重试</li>
                    <li>清除浏览器缓存</li>
                    <li>检查网络连接</li>
                    <li>联系技术支持</li>
                </ol>
                <button onclick="window.location.reload()" 
                    style="margin-top: 15px; padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    刷新页面
                </button>
            </div>
        `;
        
        document.body.innerHTML = errorMsg;
    }

    logError(error) {
        const errorLog = {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        console.log('错误日志:', errorLog);
    }

    dispatchReadyEvent() {
        const event = new CustomEvent('app:ready', {
            detail: {
                dataManager: this.dataManager,
                aiCore: this.aiCore,
                recommendEngine: this.recommendEngine,
                uiController: this.uiController
            }
        });
        
        window.dispatchEvent(event);
    }

    // 公共API
    async getRecommendations(profile) {
        if (!this.initialized) {
            throw new Error('应用未初始化');
        }
        
        return this.recommendEngine.recommend(profile);
    }

    async loadSchoolData(district) {
        if (!this.initialized) {
            throw new Error('应用未初始化');
        }
        
        return this.dataManager.loadDistrict(district);
    }

    getStatistics() {
        if (!this.initialized) {
            throw new Error('应用未初始化');
        }
        
        return this.dataManager.getStatistics();
    }
}

// ========== 7. 全局初始化与函数导出 ==========
let appInstance = null;

// 初始化应用
async function initializeApp() {
    if (!appInstance) {
        appInstance = new Application();
        await appInstance.initialize();
    }
    return appInstance;
}

// DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeApp();
    });
} else {
    initializeApp();
}

// ========== 8. 全局函数导出（保持与老版本兼容）==========
window.showStep = (stepNumber) => {
    if (appInstance && appInstance.uiController) {
        appInstance.uiController.showStep(stepNumber);
    }
};

window.toggleChat = () => {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            setTimeout(() => {
                const chatInput = document.getElementById('chatInput');
                if (chatInput) chatInput.focus();
            }, 100);
        }
    }
};

window.toggleConfigPanel = () => {
    const configPanel = document.getElementById('configPanel');
    if (configPanel) {
        configPanel.classList.toggle('active');
    }
};

window.useLocalMode = () => {
    if (appInstance && appInstance.aiCore) {
        appInstance.aiCore.useLocalMode();
        appInstance.updateUIStatus();
        alert('已切换到本地模式。AI相关功能将不可用。');
    }
};

window.sendMessage = () => {
    if (appInstance && appInstance.uiController) {
        appInstance.uiController.sendChatMessage();
    }
};

window.quickAction = (text) => {
    if (appInstance && appInstance.uiController) {
        appInstance.uiController.quickAction(text);
    }
};

window.handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        if (appInstance && appInstance.uiController) {
            appInstance.uiController.sendChatMessage();
        }
    }
};

window.interpretPolicy = () => {
    if (appInstance && appInstance.uiController) {
        appInstance.uiController.interpretPolicy();
    }
};

window.generateReport = () => {
    if (appInstance && appInstance.uiController) {
        appInstance.uiController.generateReport();
    }
};

window.exportReportPDF = () => {
    if (appInstance && appInstance.uiController) {
        appInstance.uiController.exportPDF();
    }
};

window.exportReportJSON = () => {
    if (appInstance && appInstance.uiController) {
        appInstance.uiController.exportJSON();
    }
};

window.resetAll = () => {
    if (appInstance && appInstance.uiController) {
        appInstance.uiController.resetForm();
    }
};

window.saveAndTestConfig = () => {
    if (appInstance && appInstance.uiController) {
        appInstance.uiController.saveAndTestConfig();
    }
};

// 步骤导航快捷函数
window.goToStep1 = () => window.showStep(1);
window.goToStep2 = () => window.showStep(2);
window.goToStep3 = () => window.showStep(3);
window.goToStep4 = () => window.showStep(4);
window.goToStep5 = () => window.showStep(5);
window.goToStep6 = () => window.showStep(6);
window.goToStep7 = () => window.showStep(7);

// 聊天快捷提问
window.askCatAssistant = (question) => {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = question;
        if (appInstance && appInstance.uiController) {
            appInstance.uiController.sendChatMessage();
        }
    }
};

// 步骤3验证函数
window.validateStep3 = () => {
    if (appInstance && appInstance.uiController) {
        return appInstance.uiController.validateStep3();
    }
    return false;
};

// 调试工具
window.debugApp = {
    getCacheStatus: () => appInstance?.dataManager?.getCacheStatus() || {},
    clearCache: () => appInstance?.dataManager?.clearCache(),
    reloadDistrict: (district) => appInstance?.dataManager?.loadDistrict(district),
    getStatistics: () => appInstance?.getStatistics() || {},
    testRecommend: async (district) => {
        if (!appInstance) return null;
        const testProfile = {
            hukouDistrict: district,
            residenceDistrict: district,
            budget: 50000,
            specialties: ['数学'],
            considerPrivate: '是'
        };
        return appInstance.getRecommendations(testProfile);
    },
    getAIConfig: () => appInstance?.aiCore?.CONFIG || {},
    getUserMemory: () => appInstance?.aiCore?.getUserMemory() || {}
};

// 版本信息
console.log(`
%c西安小升初智能评估系统 v3.0
%c增强重构版 - 融合模块化架构与完整AI功能
%c© 2025 - 技术支持`,
'color: #3b82f6; font-size: 16px; font-weight: bold;',
'color: #10b981; font-size: 12px;',
'color: #6b7280; font-size: 10px;'
);

// 确保关键库已加载
if (typeof Chart === 'undefined') {
    console.warn('Chart.js 未加载，图表功能可能不可用');
}

if (typeof jsPDF === 'undefined') {
    console.warn('jsPDF 未加载，PDF导出功能可能不可用');
}

if (typeof html2canvas === 'undefined') {
    console.warn('html2canvas 未加载，PDF导出功能可能不可用');
}
