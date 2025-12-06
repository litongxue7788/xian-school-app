// ============================================
// 西安小升初智能评估系统 v2.0 - 模块化优化版
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
    '凤': 'feng', '凰': 'huang',
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

// 拼音工具函数
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

// ========== 2. 数据管理模块 (DataManager) ==========
class DataManager {
    constructor() {
        this.schools = new Map(); // 学校ID -> 学校对象
        this.districtSchools = new Map(); // 区名 -> 学校ID数组
        this.typeIndex = new Map(); // 类型 -> 学校ID数组
        this.featureIndex = new Map(); // 特色 -> 学校ID数组
        this.cache = new Map(); // 区县数据缓存
        this.loading = new Map(); // 加载中的Promise
        
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
    }

    // 数据加载
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
        // 检查缓存
        if (this.cache.has(districtName)) {
            return this.cache.get(districtName);
        }

        // 检查是否正在加载
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

    // 数据标准化
    normalizeDistrictData(rawData, districtName) {
        const publicSchools = this._normalizeSchoolArray(
            rawData.public_schools || [],
            districtName,
            '公办'
        );

        const privateSchools = this._normalizeSchoolArray(
            rawData.private_schools || [],
            districtName,
            '民办'
        );

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

        const name = this._extractName(school);
        if (!name) {
            console.warn('学校缺少名称,跳过:', school);
            return null;
        }

        return {
            id: school.id || this.generateId(school, districtName),
            name,
            type: this.normalizeType(school.type || school.办学性质 || defaultType),
            level: school.level || school.学段 || '初中',
            district: school.district || school.newcity || districtName || '',
            address: school.address || school.location || '',
            schoolDistrict: this._normalizeArray(school.学区 || school.schoolDistrict),
            tuition: this.normalizeTuition(school.tuition || school.fee || school.学费),
            features: this._normalizeArray(school.features || school.特色 || school.tags),
            rating: this._normalizeRating(school),
            hasBoarding: this._normalizeBoarding(school),
            contactPhone: school.contact_phone || school.联系电话 || '',
            website: school.website || '',
            isKeySchool: this._isKeySchool(school),
            _raw: school
        };
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

    _normalizeArray(value) {
        if (Array.isArray(value)) {
            return value.filter(Boolean).map(String);
        }
        if (value && typeof value === 'string') {
            return value.split(/[,;、，；\s]+/).filter(Boolean);
        }
        return [];
    }

    _normalizeRating(school) {
        const rating = school.rating || 
                       school.score || 
                       school.admissionRate || 
                       school.graduation_rate ||
                       school.评分 ||
                       0;
        
        if (typeof rating === 'number') {
            return Math.max(0, Math.min(100, rating));
        }
        
        if (typeof rating === 'string') {
            const match = rating.match(/(\d+\.?\d*)/);
            return match ? Number(match[1]) : 0;
        }
        
        return 0;
    }

    _normalizeBoarding(school) {
        const boarding = school.hasBoarding || 
                         school.provides_dorm || 
                         school.boarding ||
                         school.住宿;
        
        if (typeof boarding === 'boolean') return boarding;
        if (typeof boarding === 'string') {
            const b = boarding.toLowerCase();
            return b.includes('是') || b.includes('有') || 
                   b.includes('yes') || b.includes('提供');
        }
        
        return false;
    }

    _isKeySchool(school) {
        const level = school.level || school.学段 || '';
        return level.includes('重点') || 
               level.includes('示范') ||
               school.is_key_school === true;
    }

    generateId(school, district) {
        const name = this._extractName(school);
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 6);
        return `${district}_${name}_${timestamp}_${random}`.replace(/\s+/g, '_');
    }

    // 索引管理
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

    // 查询接口
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

// ========== 3. 推荐引擎模块 (RecommendationEngine) ==========
class RecommendationEngine {
    constructor(dataManager) {
        this.dataManager = dataManager;
        
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
            
            categorized.summary = this.generateSummary(categorized, profile, enrollmentType);
            
            return categorized;
            
        } catch (error) {
            console.error('推荐失败:', error);
            throw error;
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

// ========== 4. UI控制器模块 (UIController) ==========
class UIController {
    constructor(dataManager, recommendEngine) {
        this.dataManager = dataManager;
        this.recommendEngine = recommendEngine;
        this.currentStep = 1;
        this.formData = {};
        this.validationRules = this._initValidationRules();
        
        // 街道数据
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
            await this.preloadCommonDistricts();
            this.initializeComponents();
            console.log('✅ UI控制器初始化完成');
        } catch (error) {
            console.error('❌ UI初始化失败:', error);
            this.showError('系统初始化失败', error.message);
        }
    }

    async preloadCommonDistricts() {
        const commonDistricts = ['雁塔区', '碑林区', '新城区', '未央区'];
        const loadingEl = this.showLoading('正在加载学校数据...');
        
        try {
            for (const district of commonDistricts) {
                await this.dataManager.loadDistrict(district);
            }
        } catch (error) {
            console.warn('预加载失败:', error);
        } finally {
            this.hideLoading(loadingEl);
        }
    }

    initializeComponents() {
        this.initSearchableSelects();
        this.initStreetBinding();
        this.initTooltips();
    }

    bindEvents() {
        // 步骤导航
        document.querySelectorAll('[data-next-step]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const nextStep = parseInt(e.target.dataset.nextStep);
                this.goToStep(nextStep);
            });
        });

        document.querySelectorAll('[data-prev-step]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const prevStep = parseInt(e.target.dataset.prevStep);
                this.goToStep(prevStep);
            });
        });

        // 表单验证
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // 推荐按钮
        const generateBtn = document.getElementById('generateReportBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateRecommendations());
        }

        // 导出按钮
        document.getElementById('exportPdfBtn')?.addEventListener('click', 
            () => this.exportPDF()
        );
        document.getElementById('exportJsonBtn')?.addEventListener('click', 
            () => this.exportJSON()
        );

        // 重置按钮
        document.getElementById('resetBtn')?.addEventListener('click', 
            () => this.resetForm()
        );
    }

    goToStep(stepNumber) {
        if (stepNumber > this.currentStep) {
            if (!this.validateCurrentStep()) {
                return;
            }
        }

        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });

        const targetSection = document.getElementById(`step${stepNumber}`);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        const targetIndicator = document.getElementById(`step${stepNumber}-indicator`);
        if (targetIndicator) {
            targetIndicator.classList.add('active');
        }

        this.updateProgressBar(stepNumber);
        this.currentStep = stepNumber;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.saveState();
    }

    updateProgressBar(stepNumber) {
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const progress = ((stepNumber - 1) / 6) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    validateCurrentStep() {
        const stepValidators = {
            1: () => this.validateStep1(),
            2: () => this.validateStep2(),
            3: () => this.validateStep3(),
            4: () => this.validateStep4(),
            5: () => this.validateStep5(),
            6: () => this.validateStep6()
        };

        const validator = stepValidators[this.currentStep];
        return validator ? validator() : true;
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

    // 表单数据收集
    collectUserData() {
        return {
            name: this.getInputValue('studentName'),
            gender: this.getRadioValue('studentGender'),
            currentSchool: this.getInputValue('currentSchool'),
            grade: this.getRadioValue('currentGrade'),
            hukouDistrict: this.getSelectValue('householdDistrict'),
            hukouStreet: this.getSelectValue('householdStreet'),
            hukouAddress: this.getInputValue('householdAddress'),
            residenceDistrict: this.getSelectValue('residenceDistrict'),
            residenceStreet: this.getSelectValue('residenceStreet'),
            residenceAddress: this.getInputValue('residenceAddress'),
            residenceType: this.getSelectValue('residenceType'),
            hasHouse: this.getSelectValue('hasHouse'),
            propertyType: this.getSelectValue('propertyType'),
            propertyYears: this.getSelectValue('propertyYears'),
            sameDistrict: this.getCheckboxValue('sameDistrict'),
            sameStreet: this.getCheckboxValue('sameStreet'),
            inSchoolDistrict: this.getCheckboxValue('inSchoolDistrict'),
            abilityScores: this.collectAbilityScores(),
            considerPrivate: this.getSelectValue('considerPrivate'),
            crossDistrictPreference: this.getSelectValue('crossDistrictPreference'),
            budget: this.getNumberValue('budget'),
            acceptLottery: this.getSelectValue('acceptLottery'),
            academicGoals: this.getTextareaValue('academicGoals'),
            specialties: this.getCheckboxValues('specialty'),
            philosophies: this.getCheckboxValues('educationConcept'),
            maxDistanceKm: this.getNumberValue('maxDistance'),
            boardingPref: this.getRadioValue('boarding'),
            timestamp: new Date().toISOString()
        };
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

    // 推荐生成
    async generateRecommendations() {
        const loadingEl = this.showLoading('正在智能匹配学校...<br><small>分析您的户籍、居住、预算等信息</small>');

        try {
            const profile = this.collectUserData();
            const results = await this.recommendEngine.recommend(profile);
            this.renderResults(results);
            this.renderAbilityChart(profile.abilityScores);
            this.goToStep(7);
            this.saveResults(results);

        } catch (error) {
            console.error('推荐生成失败:', error);
            this.showError('推荐生成失败', error.message);
        } finally {
            this.hideLoading(loadingEl);
        }
    }

    // 结果渲染
    renderResults(results) {
        this.renderSummary(results);
        this.renderPublicSchools(results.public);
        this.renderPrivateSchools(results);
        this.renderStrategy(results.summary);
    }

    renderSummary(results) {
        const container = document.getElementById('summarySection');
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

    renderPublicSchools(schools) {
        const container = document.getElementById('publicSchoolsSection');
        if (!container || schools.length === 0) return;

        container.innerHTML = `
            <h3>🏫 公办学校推荐 (${schools.length}所)</h3>
            <table class="school-table">
                <thead>
                    <tr>
                        <th width="50">序号</th>
                        <th>学校名称</th>
                        <th width="100">所在区</th>
                        <th width="100">匹配度</th>
                        <th>匹配原因</th>
                    </tr>
                </thead>
                <tbody>
                    ${schools.map((s, i) => this.renderSchoolRow(s, i + 1)).join('')}
                </tbody>
            </table>
        `;
    }

    renderPrivateSchools(results) {
        const container = document.getElementById('privateSchoolsSection');
        if (!container || results.private.length === 0) return;

        container.innerHTML = `
            <h3>🎯 民办学校推荐 (${results.private.length}所)</h3>
            <p class="strategy-note">建议按"冲刺-稳妥-保底"梯度填报志愿</p>
            
            ${this.renderPrivateCategory('冲刺类', results.rush.filter(s => s.type === '民办'), 'rush')}
            ${this.renderPrivateCategory('稳妥类', results.stable.filter(s => s.type === '民办'), 'stable')}
            ${this.renderPrivateCategory('保底类', results.safe.filter(s => s.type === '民办'), 'safe')}
        `;
    }

    renderPrivateCategory(title, schools, type) {
        if (schools.length === 0) return '';

        return `
            <div class="category-section ${type}">
                <h4>${title} (${schools.length}所)</h4>
                <table class="school-table">
                    <thead>
                        <tr>
                            <th width="50">序号</th>
                            <th>学校名称</th>
                            <th width="100">所在区</th>
                            <th width="100">匹配度</th>
                            <th width="100">学费/年</th>
                            <th>匹配原因</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${schools.map((s, i) => this.renderPrivateSchoolRow(s, i + 1)).join('')}
                    </tbody>
                </table>
            </div>
        `;
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

    renderStrategy(summary) {
        const container = document.getElementById('strategySection');
        if (!container) return;

        container.innerHTML = `
            <div class="strategy-card">
                <h3>💡 推荐策略</h3>
                ${summary.strategy.map(s => `
                    <div class="strategy-item">
                        <h4>${s.title}</h4>
                        <p>${s.content}</p>
                    </div>
                `).join('')}
                
                <h3>⚠️ 重要提醒</h3>
                ${summary.keyReminders.map(r => `
                    <div class="reminder-item priority-${r.priority}">
                        ${r.content}
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderAbilityChart(scores) {
        const canvas = document.getElementById('abilityChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const labels = ['学业成绩', '综合素养', '学习习惯', '心理素质', '家庭支持', '学科倾向'];
        const data = Object.values(scores).map(v => parseInt(v));

        if (window.abilityChartInstance) {
            window.abilityChartInstance.destroy();
        }

        window.abilityChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels,
                datasets: [{
                    label: '能力评估',
                    data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                }]
            },
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

    // UI工具函数
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

    initSearchableSelects() {
        ['householdDistrict','householdStreet','residenceDistrict','residenceStreet'].forEach(id => {
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
        input.style.cssText = `
            width: 100%;
            margin: 6px 0;
            padding: 8px 10px;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
        `;

        select.parentNode.insertBefore(input, select);

        const options = Array.from(select.options);
        options.forEach((opt, idx) => {
            if (idx === 0) return;
            const txt = (opt.textContent || '').trim();
            const full = PinyinUtils.toPinyin(txt);
            const abbr = PinyinUtils.getPinyinInitials(txt);
            opt.dataset.fullpy = full.toLowerCase();
            opt.dataset.abbrpy = abbr.toLowerCase();
            opt.dataset.chstxt = txt.toLowerCase();
        });

        input.addEventListener('input', () => {
            const kw = input.value.trim().toLowerCase();
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

    initTooltips() {
        // 初始化工具提示（可根据需要实现）
    }

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
            this.goToStep(this.currentStep);
        }
    }

    populateForm(data) {
        // 填充表单数据（简化实现，实际需要根据表单结构实现）
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

    exportPDF() {
        console.log('导出PDF功能');
        // 实现PDF导出逻辑
    }

    exportJSON() {
        const profile = this.collectUserData();
        const results = JSON.parse(localStorage.getItem('recommendationResults') || '{}');
        const statistics = this.dataManager.getStatistics();
        
        const exportData = {
            version: '2.0',
            exportTime: new Date().toISOString(),
            profile,
            results,
            statistics
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
    }

    resetForm() {
        if (confirm('您确定要重置所有填写的数据吗？')) {
            localStorage.clear();
            window.location.reload();
        }
    }

    _initValidationRules() {
        return {
            studentName: {
                required: true,
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

    validateStep1() { return this.validateStep(['studentName', 'studentGender']); }
    validateStep2() { return this.validateStep(['currentSchool', 'currentGrade']); }
    validateStep4() { return this.validateStep(['hasHouse', 'propertyType']); }
    validateStep5() { return true; } // 能力评估必填已在UI中处理
    validateStep6() { return true; } // 可选项

    validateStep(fieldIds) {
        let isValid = true;
        fieldIds.forEach(id => {
            const field = document.getElementById(id);
            if (field && !this.validateField(field)) {
                isValid = false;
            }
        });
        return isValid;
    }
}

// ========== 5. 应用主模块 (Application) ==========
class Application {
    constructor() {
        this.dataManager = null;
        this.recommendEngine = null;
        this.uiController = null;
        this.initialized = false;
        
        // AI配置
        this.CONFIG = {
            apiKey: '',
            appId: '',
            provider: 'bailian',
            isConnected: false,
            isChatInitialized: false
        };
    }

    async initialize() {
        if (this.initialized) {
            console.warn('应用已初始化');
            return;
        }

        try {
            console.log('🚀 开始初始化应用...');

            // 1. 创建数据管理器
            this.dataManager = new DataManager();
            console.log('✅ 数据管理器创建完成');

            // 2. 创建推荐引擎
            this.recommendEngine = new RecommendationEngine(this.dataManager);
            console.log('✅ 推荐引擎创建完成');

            // 3. 创建UI控制器
            this.uiController = new UIController(this.dataManager, this.recommendEngine);
            console.log('✅ UI控制器创建完成');

            // 4. 初始化UI
            await this.uiController.initialize();
            console.log('✅ UI初始化完成');

            // 5. 恢复AI配置
            this.restoreConfig();

            // 6. 设置全局错误处理
            this.setupErrorHandlers();

            // 7. 标记为已初始化
            this.initialized = true;

            // 8. 暴露到全局
            window.app = this;

            console.log('🎉 应用初始化完成!');
            
            // 9. 触发就绪事件
            this.dispatchReadyEvent();

        } catch (error) {
            console.error('❌ 应用初始化失败:', error);
            this.handleInitError(error);
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
                recommendEngine: this.recommendEngine,
                uiController: this.uiController
            }
        });
        
        window.dispatchEvent(event);
    }

    restoreConfig() {
        const savedProvider = localStorage.getItem('aiProvider') || 'bailian';
        const savedApiKey = localStorage.getItem('aiApiKey') || '';
        const savedAppId = localStorage.getItem('aiAppId') || '';
        const savedMode = localStorage.getItem('aiMode') || 'local';
        
        const isLocalMode = savedMode === 'local' || !savedApiKey;
        
        if (!isLocalMode && savedApiKey) {
            this.CONFIG.provider = savedProvider;
            this.CONFIG.apiKey = savedApiKey;
            this.CONFIG.appId = savedAppId;
            this.CONFIG.isConnected = true;
            
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
            this.CONFIG.provider = savedProvider;
            this.CONFIG.apiKey = savedApiKey;
            this.CONFIG.appId = savedAppId;
            this.CONFIG.isConnected = false;
            
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
        
        if (apiKeyInput) apiKeyInput.value = this.CONFIG.apiKey;
        if (appIdInput) appIdInput.value = this.CONFIG.appId || '';
        if (providerSelect) providerSelect.value = this.CONFIG.provider;
    }

    // AI相关函数（保持与原代码兼容）
    async callAIAPI(message, provider, apiKey, appId = '') {
        try {
            if (!this.CONFIG.isConnected) {
                return "当前处于本地模式，AI功能不可用。请切换到在线模式。";
            }

            console.log('调用AI API:', { provider, messageLength: message.length });
            
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
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

// ========== 6. 全局函数（保持与原代码兼容）==========
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

// 导出全局函数（保持与原代码兼容）
window.showStep = (stepNumber) => {
    if (appInstance && appInstance.uiController) {
        appInstance.uiController.goToStep(stepNumber);
    }
};

window.toggleChat = () => {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.classList.toggle('active');
    }
};

window.toggleConfigPanel = () => {
    const configPanel = document.getElementById('configPanel');
    if (configPanel) {
        configPanel.classList.toggle('active');
    }
};

window.useLocalMode = () => {
    console.log('切换到本地模式');
    
    if (appInstance) {
        appInstance.CONFIG.isConnected = false;
    }
    
    const statusText = document.getElementById('statusText');
    const apiStatus = document.getElementById('apiStatus');
    const chatApiStatus = document.getElementById('chatApiStatus');
    
    if (statusText) statusText.textContent = '本地模式';
    if (apiStatus) {
        apiStatus.className = 'api-status local';
        apiStatus.textContent = '本地模式';
    }
    if (chatApiStatus) chatApiStatus.textContent = '本地模式';

    const configPanel = document.getElementById('configPanel');
    if (configPanel) {
        configPanel.classList.remove('active');
    }
    
    localStorage.setItem('aiMode', 'local');
    alert('已切换到本地模式。AI相关功能将不可用。');
};

window.generateReport = async () => {
    if (appInstance && appInstance.uiController) {
        await appInstance.uiController.generateRecommendations();
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

// 步骤导航快捷函数
window.goToStep1 = () => window.showStep(1);
window.goToStep2 = () => window.showStep(2);
window.goToStep3 = () => window.showStep(3);
window.goToStep4 = () => window.showStep(4);
window.goToStep5 = () => window.showStep(5);
window.goToStep6 = () => window.showStep(6);
window.goToStep7 = () => window.showStep(7);

// AI配置保存
window.saveAndTestConfig = async () => {
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
        const testMessage = '你好，请回复"连接成功"';
        const response = await appInstance.callAIAPI(testMessage, provider, apiKey, appId);
        
        if (appInstance) {
            appInstance.CONFIG.apiKey = apiKey;
            appInstance.CONFIG.appId = appId;
            appInstance.CONFIG.provider = provider;
            appInstance.CONFIG.isConnected = true;
        }
        
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
        
        alert('配置保存成功！AI功能已启用。');
        
        const configPanel = document.getElementById('configPanel');
        if (configPanel) {
            configPanel.classList.remove('active');
        }
        
    } catch (error) {
        alert(`配置测试失败：${error.message}`);
    }
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
    performanceTest: async () => {
        if (!appInstance?.dataManager) return;
        const start = performance.now();
        await appInstance.dataManager.loadAllDistricts();
        const end = performance.now();
        console.log(`加载所有区县耗时: ${(end - start).toFixed(2)}ms`);
    }
};

// 版本信息
console.log(`
%c西安小升初智能评估系统 v2.0
%c优化版 - 模块化架构
%c© 2025 - 技术支持`,
'color: #3b82f6; font-size: 16px; font-weight: bold;',
'color: #10b981; font-size: 12px;',
'color: #6b7280; font-size: 10px;'
);
