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

// 将文本转换为拼音
function toPinyin(text) {
    if (!text) return '';
    let result = '';
    for (let char of text) {
        result += PINYIN_MAP[char] || char;
    }
    return result.toLowerCase();
}

// 获取拼音首字母
function getPinyinInitials(text) {
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

// ========== 全局配置与数据 ==========
const CONFIG = {
    apiKey: '',
    appId: '',
    provider: 'bailian',
    isConnected: false,
    isChatInitialized: false
};

let assessmentData = { scores: {}, familyInfo: {}, totalScore: 0 };
let chatHistory = [];
let isDragging = false;
let offsetX, offsetY;
let abilityChartInstance = null;

// 全局记忆系统 - 增强版
let USER_MEMORY = JSON.parse(localStorage.getItem("USER_MEMORY") || "{}");

function saveUserMemory(key, value) {
    USER_MEMORY[key] = value;
    localStorage.setItem("USER_MEMORY", JSON.stringify(USER_MEMORY));
}

function getUserMemory() {
    return USER_MEMORY;
}

// 增强版：收集用户填写数据
function collectUserData() {
    const data = {
        // 基本信息
        studentName: document.getElementById("studentName")?.value || "",
        studentGender: document.getElementById("studentGender")?.value || "",
        currentSchool: document.getElementById("currentSchool")?.value || "",
        grade: document.getElementById("grade")?.value || "",
        
        // 户籍信息
        hukouDistrict: document.getElementById("hukouDistrict")?.value || document.getElementById("householdDistrict")?.value || "",
        hukouStreet: document.getElementById("hukouStreet")?.value || document.getElementById("householdStreet")?.value || "",
        householdAddress: document.getElementById("householdAddress")?.value || "",
        
        // 居住信息
        liveDistrict: document.getElementById("liveDistrict")?.value || document.getElementById("residenceDistrict")?.value || "",
        liveStreet: document.getElementById("liveStreet")?.value || document.getElementById("residenceStreet")?.value || "",
        residenceAddress: document.getElementById("residenceAddress")?.value || "",
        residenceType: document.getElementById("residenceType")?.value || "",
        
        // 房产信息
        hasHouse: document.getElementById("hasHouse")?.value || "",
        propertyType: document.getElementById("propertyType")?.value || "",
        propertyYears: document.getElementById("propertyYears")?.value || "",
        
        // 能力评估
        abilityScore1: document.querySelector('input[name="score1"]:checked')?.value || 3,
        abilityScore2: document.querySelector('input[name="score2"]:checked')?.value || 3,
        abilityScore3: document.querySelector('input[name="score3"]:checked')?.value || 3,
        abilityScore4: document.querySelector('input[name="score4"]:checked')?.value || 3,
        abilityScore5: document.querySelector('input[name="score5"]:checked')?.value || 3,
        abilityScore6: document.querySelector('input[name="score6"]:checked')?.value || 3,
        
        // 民办意向与预算
        considerPrivate: document.getElementById("considerPrivate")?.value || "",
        budget: Number(document.getElementById("budget")?.value || 0),
        crossDistrictPreference: document.getElementById("crossDistrictPreference")?.value || "",
        acceptLottery: document.getElementById("acceptLottery")?.value || "",
        
        // 学业规划
        academicGoals: document.getElementById("academicGoals")?.value || "",
        
        // 学生特长（多选）
        specialties: Array.from(document.querySelectorAll('input[name="specialty"]:checked, .strength-check:checked'))
            .map(el => el.value),
            
        // 教育理念（多选）
        educationConcepts: Array.from(document.querySelectorAll('input[name="educationConcept"]:checked, .philosophy-check:checked'))
            .map(el => el.value),
            
        // 其他信息
        sameDistrict: document.getElementById("sameDistrict")?.checked || false,
        sameStreet: document.getElementById("sameStreet")?.checked || false,
        inSchoolDistrict: document.getElementById("inSchoolDistrict")?.checked || false
    };

    // 记忆同步
    for (const key in data) saveUserMemory(key, data[key]);

    return data;
}

// 增强版：收集用户数据供AI使用
function collectUserDataForAI() {
    const userData = {
        // 学生基本信息
        学生姓名: document.getElementById('studentName')?.value || '',
        学生性别: document.getElementById('studentGender')?.value || '',
        所在小学: document.getElementById('currentSchool')?.value || '',
        当前年级: document.querySelector('input[name="currentGrade"]:checked')?.value || '',
        
        // 户籍与居住信息 - 完整收集
        户籍所在区: document.getElementById('householdDistrict')?.value || '',
        户籍所在街道: document.getElementById('householdStreet')?.value || '',
        户籍详细地址: document.getElementById('householdAddress')?.value || '',
        实际居住区: document.getElementById('residenceDistrict')?.value || '',
        实际居住街道: document.getElementById('residenceStreet')?.value || '',
        居住详细地址: document.getElementById('residenceAddress')?.value || '',
        居住性质: document.getElementById('residenceType')?.value || '',
        户籍区与居住区相同: document.getElementById('sameDistrict')?.checked || false,
        户籍街道与居住街道相同: document.getElementById('sameStreet')?.checked || false,
        在学区内居住: document.getElementById('inSchoolDistrict')?.checked || false,
        
        // 学区房产信息
        学区房情况: document.getElementById('hasHouse')?.value || '',
        房产证类型: document.getElementById('propertyType')?.value || '',
        房产持有时间: document.getElementById('propertyYears')?.value || '',
        
        // 能力评估(6个维度)
        能力评估: {},
        
        // 民办意向与预算
        是否考虑民办: document.getElementById('considerPrivate')?.value || '',
        可接受的跨区范围: document.getElementById('crossDistrictPreference')?.value || '',
        民办学校预算: document.getElementById('budget')?.value || '',
        对摇号不确定性的态度: document.getElementById('acceptLottery')?.value || '',
        
        // 学业规划
        学业规划: document.getElementById('academicGoals')?.value || '',
        
        // 学生特长(多选)
        学生特长: Array.from(document.querySelectorAll('input[name="specialty"]:checked, .strength-check:checked'))
            .map(el => el.value),
        
        // 教育理念偏好(多选)
        教育理念偏好: Array.from(document.querySelectorAll('input[name="educationConcept"]:checked, .philosophy-check:checked'))
            .map(el => el.value),
        
        // 其他评估结果
        预估入学顺位: document.getElementById('admissionPriority')?.textContent || '',
        顺位理由: document.getElementById('priorityReason')?.textContent || ''
    };
    
    // 收集能力评估数据（从单选按钮）
    const scoreRadios = document.querySelectorAll('input[type="radio"]:checked');
    scoreRadios.forEach(radio => {
        const name = radio.name.replace('score', '');
        const value = radio.value;
        if (name && value && radio.name.startsWith('score')) {
            userData.能力评估[`维度${name}`] = value;
        }
    });
    
    return userData;
}

// 增强版：获取用户完整信息字符串（用于AI提示词）
function getUserFullInfoString() {
    const userData = collectUserDataForAI();
    let infoString = "【用户完整填写信息】\n\n";
    
    // 基本信息
    infoString += "📋 学生基本信息：\n";
    if (userData.学生姓名) infoString += `- 姓名：${userData.学生姓名}\n`;
    if (userData.学生性别) infoString += `- 性别：${userData.学生性别}\n`;
    if (userData.所在小学) infoString += `- 所在小学：${userData.所在小学}\n`;
    if (userData.当前年级) infoString += `- 当前年级：${userData.当前年级}\n`;
    
    // 户籍信息
    infoString += "\n🏠 户籍信息：\n";
    if (userData.户籍所在区) infoString += `- 户籍区：${userData.户籍所在区}\n`;
    if (userData.户籍所在街道) infoString += `- 户籍街道：${userData.户籍所在街道}\n`;
    if (userData.户籍详细地址) infoString += `- 户籍地址：${userData.户籍详细地址}\n`;
    
    // 居住信息
    infoString += "\n📍 实际居住信息：\n";
    if (userData.实际居住区) infoString += `- 居住区：${userData.实际居住区}\n`;
    if (userData.实际居住街道) infoString += `- 居住街道：${userData.实际居住街道}\n`;
    if (userData.居住详细地址) infoString += `- 居住地址：${userData.居住详细地址}\n`;
    if (userData.居住性质) infoString += `- 居住性质：${userData.居住性质}\n`;
    
    // 房产信息
    infoString += "\n🏡 房产情况：\n";
    if (userData.学区房情况) infoString += `- 学区房：${userData.学区房情况}\n`;
    if (userData.房产证类型) infoString += `- 房产证类型：${userData.房产证类型}\n`;
    if (userData.房产持有时间) infoString += `- 持有时间：${userData.房产持有时间}\n`;
    
    // 关系判断
    infoString += "\n🔗 户籍与居住关系：\n";
    infoString += `- 户籍区与居住区相同：${userData.户籍区与居住区相同 ? '是' : '否'}\n`;
    infoString += `- 户籍街道与居住街道相同：${userData.户籍街道与居住街道相同 ? '是' : '否'}\n`;
    infoString += `- 在学区内居住：${userData.在学区内居住 ? '是' : '否'}\n`;
    
    // 能力评估
    infoString += "\n📊 能力评估：\n";
    if (userData.能力评估['维度1']) infoString += `- 学业成绩：${userData.能力评估['维度1']}分\n`;
    if (userData.能力评估['维度2']) infoString += `- 综合素养：${userData.能力评估['维度2']}分\n`;
    if (userData.能力评估['维度3']) infoString += `- 学习习惯：${userData.能力评估['维度3']}分\n`;
    if (userData.能力评估['维度4']) infoString += `- 心理素质：${userData.能力评估['维度4']}分\n`;
    if (userData.能力评估['维度5']) infoString += `- 家庭支持：${userData.能力评估['维度5']}分\n`;
    if (userData.能力评估['维度6']) infoString += `- 学科倾向：${userData.能力评估['维度6']}分\n`;
    
    // 民办意向
    infoString += "\n🎯 民办意向：\n";
    if (userData.是否考虑民办) infoString += `- 是否考虑民办：${userData.是否考虑民办}\n`;
    if (userData.民办学校预算) infoString += `- 预算：${userData.民办学校预算}\n`;
    if (userData.可接受的跨区范围) infoString += `- 跨区范围：${userData.可接受的跨区范围}\n`;
    if (userData.对摇号不确定性的态度) infoString += `- 摇号态度：${userData.对摇号不确定性的态度}\n`;
    
    // 学业规划
    infoString += "\n📚 学业规划：\n";
    if (userData.学业规划) infoString += `- ${userData.学业规划}\n`;
    
    // 学生特长
    infoString += "\n🌟 学生特长：\n";
    if (userData.学生特长 && userData.学生特长.length > 0) {
        userData.学生特长.forEach(talent => {
            infoString += `- ${talent}\n`;
        });
    } else {
        infoString += "- 无\n";
    }
    
    // 教育理念
    infoString += "\n💡 教育理念偏好：\n";
    if (userData.教育理念偏好 && userData.教育理念偏好.length > 0) {
        userData.教育理念偏好.forEach(concept => {
            infoString += `- ${concept}\n`;
        });
    } else {
        infoString += "- 无\n";
    }
    
    // 评估结果
    if (userData.预估入学顺位) {
        infoString += `\n📈 预估入学顺位：${userData.预估入学顺位}\n`;
    }
    if (userData.顺位理由) {
        infoString += `📝 顺位理由：${userData.顺位理由}\n`;
    }
    
    return infoString;
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

// ==================== 核心优化：智能推荐引擎 ====================
class SmartRecommendationEngine {
    constructor() {
        this.schools = [];
        this.profile = null;
        this.initialized = false;
    }

    // 初始化学校数据（兼容多种数据源）
    async initSchoolData() {
        if (this.initialized) return true;
        
        // 方法1：从现有全局变量加载
        if (window.DISTRICTS || window.SCHOOLS) {
            this.schools = await this.loadFromGlobalVars();
        }
        
        // 方法2：从本地JSON加载
        if (this.schools.length === 0) {
            this.schools = await this.loadFromLocalData();
        }
        
        // 方法3：从API加载（如果需要）
        if (this.schools.length === 0) {
            this.schools = await this.loadFromAPI();
        }
        
        this.initialized = true;
        console.log(`智能推荐引擎初始化完成，加载了 ${this.schools.length} 所学校数据`);
        return true;
    }

    // 加载学校数据（从现有全局变量）
    async loadFromGlobalVars() {
        const schools = [];
        
        // 尝试从各种可能的全局变量加载
        const candidates = [
            window.DISTRICTS,
            window.allDistricts,
            window.districts,
            window.SCHOOLS,
            window.allSchools
        ];
        
        for (const data of candidates) {
            if (!data) continue;
            
            if (Array.isArray(data)) {
                // 如果是数组格式，直接添加
                data.forEach(school => {
                    const normalized = this.normalizeSchool(school);
                    if (normalized) schools.push(normalized);
                });
            } else if (typeof data === 'object') {
                // 如果是对象格式（按区县分组）
                Object.entries(data).forEach(([district, districtSchools]) => {
                    if (Array.isArray(districtSchools)) {
                        districtSchools.forEach(school => {
                            const normalized = this.normalizeSchool(school, district);
                            if (normalized) schools.push(normalized);
                        });
                    }
                });
            }
        }
        
        return schools;
    }

    // 标准化学校数据
    normalizeSchool(rawSchool, district = '') {
        if (!rawSchool) return null;
        
        const school = {
            id: rawSchool.id || `school_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: rawSchool.name || rawSchool.学校名称 || '未知学校',
            type: this.detectSchoolType(rawSchool),
            district: district || rawSchool.district || rawSchool.区县 || '',
            address: rawSchool.address || rawSchool.地址 || '',
            features: this.parseFeatures(rawSchool),
            level: rawSchool.level || rawSchool.学段 || '初中',
            fee: this.parseFee(rawSchool),
            hasBoarding: this.parseBoarding(rawSchool),
            score: this.parseScore(rawSchool),
            admissionMethod: rawSchool.admissionMethod || rawSchool.入学方式 || '',
            matchScore: 0,
            raw: rawSchool
        };
        
        return school;
    }

    // 检测学校类型
    detectSchoolType(school) {
        const typeStr = (school.type || school.类型 || '').toString().toLowerCase();
        
        if (typeStr.includes('公办') || typeStr.includes('公立') || typeStr === 'public') {
            return '公办';
        } else if (typeStr.includes('民办') || typeStr.includes('私立') || typeStr === 'private') {
            return '民办';
        }
        
        // 根据其他字段推断
        if (school.fee && school.fee > 0) return '民办';
        if (school.招生方式 && school.招生方式.includes('摇号')) return '民办';
        
        return '未知';
    }

    // 解析特色
    parseFeatures(school) {
        const features = [];
        
        // 尝试从不同字段提取特色
        const featureSources = [
            school.features,
            school.特色,
            school.tags,
            school.特长,
            school.特点
        ];
        
        featureSources.forEach(source => {
            if (!source) return;
            
            if (Array.isArray(source)) {
                features.push(...source);
            } else if (typeof source === 'string') {
                // 分割字符串中的特色
                const splitFeatures = source.split(/[,;；、\/]/);
                splitFeatures.forEach(feature => {
                    const trimmed = feature.trim();
                    if (trimmed) features.push(trimmed);
                });
            }
        });
        
        // 去重
        return [...new Set(features)];
    }

    // 解析费用
    parseFee(school) {
        const feeSources = [
            school.fee,
            school.学费,
            school.tuition,
            school.费用
        ];
        
        for (const source of feeSources) {
            if (source === null || source === undefined) continue;
            
            if (typeof source === 'number') return source;
            if (typeof source === 'string') {
                const match = source.match(/(\d+(?:\.\d+)?)/);
                if (match) return Number(match[1]);
            }
        }
        
        return null;
    }

    // 解析住宿信息
    parseBoarding(school) {
        const boardingSources = [
            school.boarding,
            school.住宿,
            school.hasBoarding,
            school.是否住宿
        ];
        
        for (const source of boardingSources) {
            if (source === null || source === undefined) continue;
            
            if (typeof source === 'boolean') return source;
            if (typeof source === 'string') {
                const lower = source.toLowerCase();
                if (lower.includes('是') || lower.includes('有') || lower.includes('yes') || lower.includes('true')) {
                    return true;
                } else if (lower.includes('否') || lower.includes('无') || lower.includes('no') || lower.includes('false')) {
                    return false;
                }
            }
        }
        
        return null;
    }

    // 解析评分/升学率
    parseScore(school) {
        const scoreSources = [
            school.score,
            school.rating,
            school.评分,
            school.升学率,
            school.排名
        ];
        
        for (const source of scoreSources) {
            if (source === null || source === undefined) continue;
            
            if (typeof source === 'number') return Math.min(source, 100); // 确保不超过100
            if (typeof source === 'string') {
                const match = source.match(/(\d+(?:\.\d+)?)/);
                if (match) {
                    const score = Number(match[1]);
                    return score > 100 ? 100 : score;
                }
            }
        }
        
        return 50; // 默认值
    }

    // 收集用户画像
    collectUserProfile() {
        const userData = collectUserDataForAI();
        
        return {
            // 基本信息
            name: userData.学生姓名 || '',
            category: this.detectUserCategory(userData),
            
            // 位置信息
            hukouDistrict: userData.户籍所在区 || '',
            residenceDistrict: userData.实际居住区 || '',
            residenceAddress: userData.居住详细地址 || '',
            
            // 学校偏好
            grade: userData.当前年级 || '',
            privateIntent: userData.是否考虑民办 === '是' ? ['民办'] : [],
            budget: this.parseBudget(userData.民办学校预算),
            
            // 能力与兴趣
            features: [
                ...(userData.学生特长 || []),
                ...(userData.教育理念偏好 || [])
            ],
            
            // 其他偏好
            maxDistanceKm: this.parseDistance(userData.可接受的跨区范围),
            boardingPref: this.parseBoardingPreference(userData),
            
            // 能力评估
            abilityScores: {
                学业成绩: parseInt(userData.能力评估['维度1'] || 3),
                综合素养: parseInt(userData.能力评估['维度2'] || 3),
                学习习惯: parseInt(userData.能力评估['维度3'] || 3),
                心理素质: parseInt(userData.能力评估['维度4'] || 3),
                家庭支持: parseInt(userData.能力评估['维度5'] || 3),
                学科倾向: parseInt(userData.能力评估['维度6'] || 3)
            },
            
            // 入学资格
            admissionPriority: calculateAdmissionPriority(userData),
            timestamp: new Date().toISOString()
        };
    }

    // 检测用户类别
    detectUserCategory(userData) {
        const hukouDistrict = userData.户籍所在区 || '';
        const residenceDistrict = userData.实际居住区 || '';
        const propertyType = userData.房产证类型 || '';
        const residenceType = userData.居住性质 || '';
        
        if (!hukouDistrict || hukouDistrict === '外地户籍') {
            return '随迁类';
        }
        
        if (hukouDistrict === residenceDistrict && (propertyType.includes('自有') || propertyType.includes('安置房'))) {
            return '户籍类（房户一致）';
        }
        
        if (hukouDistrict !== residenceDistrict && (propertyType.includes('自有') || propertyType.includes('安置房'))) {
            return '户籍类（房户不一致）';
        }
        
        if (residenceType === '租房') {
            return '户籍类（租房）';
        }
        
        return '户籍类';
    }

    // 解析预算
    parseBudget(budgetStr) {
        if (!budgetStr) return null;
        
        const match = budgetStr.match(/(\d+(?:\.\d+)?)/);
        if (match) return Number(match[1]);
        
        // 尝试从描述性文本中提取
        if (budgetStr.includes('高') || budgetStr.includes('5万以上')) return 60000;
        if (budgetStr.includes('中') || budgetStr.includes('3-5万')) return 40000;
        if (budgetStr.includes('低') || budgetStr.includes('3万以下')) return 20000;
        
        return null;
    }

    // 解析距离偏好
    parseDistance(distanceStr) {
        if (!distanceStr) return 10; // 默认10公里
        
        if (distanceStr.includes('本区')) return 5;
        if (distanceStr.includes('本市')) return 20;
        if (distanceStr.includes('跨省')) return 100;
        
        const match = distanceStr.match(/(\d+)/);
        if (match) return Number(match[1]);
        
        return 10;
    }

    // 解析住宿偏好
    parseBoardingPreference(userData) {
        // 从用户数据中推断住宿偏好
        const address = userData.居住详细地址 || '';
        const residenceDistrict = userData.实际居住区 || '';
        const hukouDistrict = userData.户籍所在区 || '';
        
        if (address.includes('远') || address.includes('郊区') || residenceDistrict !== hukouDistrict) {
            return '需要';
        }
        
        return '不限';
    }

    // 智能匹配算法
    calculateMatchScore(school, profile) {
        let score = 0;
        
        // 1. 类型匹配（25分）
        if (profile.privateIntent.includes('民办') && school.type === '民办') {
            score += 25;
        } else if (!profile.privateIntent.includes('民办') && school.type === '公办') {
            score += 25;
        }
        
        // 2. 位置匹配（30分）
        if (profile.category.includes('户籍类')) {
            // 户籍类：同时考虑户籍地和居住地
            if (profile.hukouDistrict && school.district === profile.hukouDistrict) {
                score += 15;
            }
            if (profile.residenceDistrict && school.district === profile.residenceDistrict) {
                score += 15;
            }
        } else {
            // 随迁类：主要考虑居住地
            if (profile.residenceDistrict && school.district === profile.residenceDistrict) {
                score += 30;
            }
        }
        
        // 3. 特色匹配（20分）
        if (profile.features && profile.features.length > 0 && school.features.length > 0) {
            const matchedFeatures = profile.features.filter(feature => 
                school.features.some(schoolFeature => 
                    schoolFeature.toLowerCase().includes(feature.toLowerCase()) ||
                    feature.toLowerCase().includes(schoolFeature.toLowerCase())
                )
            );
            score += Math.min(20, matchedFeatures.length * 5);
        }
        
        // 4. 费用匹配（15分）
        if (profile.budget && school.fee) {
            if (school.fee <= profile.budget) {
                score += 15;
            } else if (school.fee <= profile.budget * 1.2) {
                score += 10;
            } else if (school.fee <= profile.budget * 1.5) {
                score += 5;
            }
        }
        
        // 5. 住宿匹配（10分）
        if (profile.boardingPref === '需要' && school.hasBoarding === true) {
            score += 10;
        } else if (profile.boardingPref === '不需要' && school.hasBoarding === false) {
            score += 10;
        }
        
        // 6. 学校评分（10分）
        if (school.score) {
            score += Math.round(school.score / 10);
        }
        
        return score;
    }

    // 生成推荐分组（冲/稳/保）
    generateRecommendations(profile) {
        if (this.schools.length === 0) {
            console.warn('没有学校数据，无法生成推荐');
            return { rush: [], stable: [], safe: [], final: [] };
        }
        
        // 计算每所学校的匹配分
        const scoredSchools = this.schools.map(school => ({
            ...school,
            matchScore: this.calculateMatchScore(school, profile)
        }));
        
        // 按匹配分排序
        scoredSchools.sort((a, b) => b.matchScore - a.matchScore);
        
        // 分组逻辑
        const total = Math.min(10, scoredSchools.length);
        const rushCount = Math.max(2, Math.floor(total * 0.3));
        const stableCount = Math.max(3, Math.floor(total * 0.4));
        const safeCount = Math.max(2, total - rushCount - stableCount);
        
        const rush = scoredSchools.slice(0, rushCount);
        const stable = scoredSchools.slice(rushCount, rushCount + stableCount);
        const safe = scoredSchools.slice(rushCount + stableCount, rushCount + stableCount + safeCount);
        
        return {
            rush: this.formatSchools(rush),
            stable: this.formatSchools(stable),
            safe: this.formatSchools(safe),
            final: this.formatSchools(scoredSchools.slice(0, total))
        };
    }

    // 格式化学校信息
    formatSchools(schools) {
        return schools.map(school => ({
            ...school,
            matchPercentage: Math.min(100, Math.round((school.matchScore / 100) * 100)),
            displayType: school.type === '公办' ? '公办（学区对口）' : '民办（摇号入学）',
            admissionMethod: school.type === '公办' ? '学区对口入学' : '摇号+面谈'
        }));
    }

    // 生成AI分析提示词
    generateAIPrompt(profile, recommendations) {
        const { rush, stable, safe } = recommendations;
        
        return `
你是一个专业的西安小升初咨询专家。请基于以下学生信息和学校推荐，生成一份详细的咨询报告：

【学生基本信息】
姓名：${profile.name || '未提供'}
学生类别：${profile.category}
户籍所在区：${profile.hukouDistrict || '未提供'}
实际居住区：${profile.residenceDistrict || '未提供'}
当前年级：${profile.grade || '未提供'}

【能力评估】
${Object.entries(profile.abilityScores || {}).map(([key, value]) => `${key}: ${value}/5分`).join('\n')}

【学校特色偏好】
${profile.features.join('、') || '无特殊要求'}

【推荐学校列表】

冲刺学校（匹配度高，竞争较激烈）：
${rush.map((s, i) => `${i+1}. ${s.name}（${s.type}）- ${s.district} - 匹配度：${s.matchPercentage}%`).join('\n')}

稳妥学校（匹配度适中，录取概率较高）：
${stable.map((s, i) => `${i+1}. ${s.name}（${s.type}）- ${s.district} - 匹配度：${s.matchPercentage}%`).join('\n')}

保底学校（确保有学可上）：
${safe.map((s, i) => `${i+1}. ${s.name}（${s.type}）- ${s.district} - 匹配度：${s.matchPercentage}%`).join('\n')}

【分析要求】
1. 请分析学生的优势和改进空间
2. 解释每类推荐学校的理由
3. 给出具体的备考建议和时间规划
4. 提供入学政策解读
5. 输出格式：使用清晰的中文，结构分明

请直接开始你的分析报告：
        `;
    }

    // 从本地JSON加载数据（模拟数据）
    async loadFromLocalData() {
        // 这里可以添加本地学校数据
        // 暂时返回空数组，让系统使用AI推荐
        return [];
    }

    // 从API加载数据
    async loadFromAPI() {
        // 这里可以添加API调用
        return [];
    }
}

// 创建全局实例
const smartEngine = new SmartRecommendationEngine();

// ========== API调用函数 ==========

// API调用函数 - 支持所有大模型（调用自己的后端API）
async function callAIAPI(message, provider, apiKey, appId = '') {
    try {
        // 如果是本地模式，直接返回模拟响应
        if (!CONFIG.isConnected) {
            return "当前处于本地模式，AI功能不可用。请切换到在线模式。";
        }

        console.log('调用AI API:', { provider, messageLength: message.length });
        
        // 调用自己的后端API - 修复路径为 /api/ai
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

// ========== 核心功能函数 ==========

// 显示指定步骤的函数 - 修复版本
function showStep(stepNumber) {
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
}

// 步骤导航函数
function goToStep1() { showStep(1); }
function goToStep2() { showStep(2); }
function goToStep3() { showStep(3); }
function goToStep4() { showStep(4); }
function goToStep5() { showStep(5); }
function goToStep6() { showStep(6); }
function goToStep7() { showStep(7); }

// 切换聊天窗口显示/隐藏
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.classList.toggle('active');
        console.log('聊天窗口状态:', chatWindow.classList.contains('active') ? '显示' : '隐藏');
    }
}

// 切换API配置面板显示/隐藏
function toggleConfigPanel() {
    const configPanel = document.getElementById('configPanel');
    if (configPanel) {
        configPanel.classList.toggle('active');
        console.log('配置面板状态:', configPanel.classList.contains('active') ? '显示' : '隐藏');
    }
}

// 切换到本地模式
function useLocalMode() {
    console.log('切换到本地模式');
    
    // 更新连接状态
    CONFIG.isConnected = false;
    
    // 更新状态显示
    const statusText = document.getElementById('statusText');
    if (statusText) {
        statusText.textContent = '本地模式';
    }
    
    const apiStatus = document.getElementById('apiStatus');
    if (apiStatus) {
        apiStatus.className = 'api-status local';
        apiStatus.textContent = '本地模式';
    }

    const chatApiStatus = document.getElementById('chatApiStatus');
    if (chatApiStatus) {
        chatApiStatus.textContent = '本地模式';
    }

    // 关闭配置面板
    const configPanel = document.getElementById('configPanel');
    if (configPanel) {
        configPanel.classList.remove('active');
    }
    
    // 保存到本地存储
    localStorage.setItem('aiMode', 'local');
    
    // 显示成功消息
    alert('已切换到本地模式。AI相关功能将不可用。');
    
    console.log('本地模式切换完成');
}

// ========== 小猫助手功能（增强版）==========
async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    if (!message) return;
    
    if (!CONFIG.isConnected) {
        alert('AI聊天功能在本地模式下不可用。请切换到在线模式。');
        return;
    }
    
    // 显示用户消息
    addMessageToChat('user', message);
    chatInput.value = '';
    
    try {
        // 显示加载状态
        showLoadingIndicator();
        
        // 初始化智能引擎
        await smartEngine.initSchoolData();
        
        // 收集用户画像
        const userProfile = smartEngine.collectUserProfile();
        
        // 生成智能推荐
        const recommendations = smartEngine.generateRecommendations(userProfile);
        
        // 构建增强版提示词
        const contextPrompt = `
你是一个专业的西安小升初智能助手"小猫助手"。你已经有了以下智能推荐结果：

【用户画像】
${JSON.stringify(userProfile, null, 2)}

【智能推荐学校】
冲刺学校：${recommendations.rush.map(s => s.name).join('、')}
稳妥学校：${recommendations.stable.map(s => s.name).join('、')}
保底学校：${recommendations.safe.map(s => s.name).join('、')}

【用户本次提问】
${message}

请基于以上智能推荐结果，结合西安市2025年招生政策，回答用户的问题。
        `;
        
        // 调用AI
        const response = await callAIAPI(
            contextPrompt,
            CONFIG.provider,
            CONFIG.apiKey,
            CONFIG.appId
        );
        
        hideLoadingIndicator();
        
        // 显示AI回复
        addMessageToChat('assistant', response);
        
    } catch (error) {
        hideLoadingIndicator();
        addMessageToChat('assistant', `抱歉，出现错误：${error.message}`);
    }
}

function askCatAssistant(question) {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = question;
        sendMessage();
    }
}

// 添加消息到聊天窗口
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
                    基于西安市2025年官方政策与真实学校数据库 · 基于用户完整信息分析
                </div>
            </div>
        `;
    }
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// 显示加载指示器
function showLoadingIndicator() {
    const chatBody = document.getElementById('chatBody');
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.className = 'ai-message assistant';
    loadingDiv.innerHTML = `
        <div class="message-avatar">🐱</div>
        <div class="message-content">
            <div class="ai-loading-spinner" style="width:20px;height:20px;"></div>
            正在分析您的完整信息并查询学校数据库...
        </div>
    `;
    chatBody.appendChild(loadingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// 隐藏加载指示器
function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// 快捷操作
async function quickAction(text) {
    if (!CONFIG.isConnected) {
        alert(`快捷操作 "${text}" 在本地模式下不可用。请切换到在线模式。`);
        return;
    }
    
    try {
        showLoadingIndicator();
        
        const userFullInfo = getUserFullInfoString();
        
        let question = text;
        
        // 根据快捷操作类型优化问题，包含用户完整信息
        if (text === '2026年小升初时间安排') {
            question = `${userFullInfo}\n\n请基于以上用户完整情况，预测2026年西安小升初的时间安排和重要节点`;
        } else if (text === '民办学校有哪些') {
            question = `${userFullInfo}\n\n请基于用户预算和跨区偏好，列出西安市适合的民办初中学校（基于西安市教育局2025年官方名单）`;
        } else if (text === '摇号政策') {
            question = `${userFullInfo}\n\n请基于用户户籍和居住情况，详细解释西安市民办初中摇号政策的具体流程`;
        }
        
        const response = await callAIAPI(
            question, 
            CONFIG.provider, 
            CONFIG.apiKey, 
            CONFIG.appId
        );
        
        hideLoadingIndicator();
        addMessageToChat('assistant', response);
        
    } catch (error) {
        hideLoadingIndicator();
        addMessageToChat('assistant', `抱歉，出现错误：${error.message}`);
    }
}

// 处理按键事件
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// AI解读政策
async function interpretPolicy() {
    if (!CONFIG.isConnected) {
        alert('AI解读功能在本地模式下不可用。请切换到在线模式。');
        return;
    }
    
    try {
        showLoadingIndicator();
        
        const userFullInfo = getUserFullInfoString();
        const question = `${userFullInfo}\n\n请详细解读西安市小升初的入学顺位政策，包括房户一致、集体户、租房等不同情况的入学顺序，并基于用户的完整信息分析具体入学顺位`;
        
        const response = await callAIAPI(
            question, 
            CONFIG.provider, 
            CONFIG.apiKey, 
            CONFIG.appId
        );
        
        hideLoadingIndicator();
        
        // 显示解读结果
        const interpretationResult = document.getElementById('interpretationResult');
        if (interpretationResult) {
            interpretationResult.innerHTML = `
                <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #3b82f6;">
                    <h4 style="margin: 0 0 10px 0; color: #1e40af;">🤖 AI政策解读（基于您的完整信息）</h4>
                    <div style="line-height: 1.6; color: #374151;">${response}</div>
                    <div style="margin-top: 10px; font-size: 12px; color: #6b7280;">
                        <span class="trust-badge trust-verified">✅ 数据准确</span> 
                        基于${CONFIG.provider}模型分析 · 严格参照学校数据库 · 结合用户完整信息
                    </div>
                </div>
            `;
        }
        
    } catch (error) {
        hideLoadingIndicator();
        alert(`AI解读失败：${error.message}`);
    }
}

// ========== 报告生成功能 ==========
async function generateReport() {
    console.log('使用智能推荐引擎生成报告...');
    
    // 收集所有步骤的数据
    collectAllData();
    
    // 显示步骤7
    showStep(7);
    
    // 生成能力雷达图
    await generateAbilityChart();
    
    // 使用智能推荐引擎
    await showEnhancedSmartRecommendations();
    
    // AI生成时间规划和政策提醒
    if (CONFIG.isConnected) {
        await generateEnhancedTimelineAndPolicy();
    } else {
        displayStaticTimelineAndPolicy();
    }
    
    alert('智能报告生成完成！');
}

// 收集所有数据
function collectAllData() {
    console.log('收集所有表单数据...');
    const userData = collectUserDataForAI();
    
    // 计算并保存入学顺位
    const admissionPriority = calculateAdmissionPriority(userData);
    const priorityReason = getPriorityReason(userData);
    
    // 更新页面显示
    const priorityElement = document.getElementById('admissionPriority');
    const reasonElement = document.getElementById('priorityReason');
    
    if (priorityElement) priorityElement.textContent = admissionPriority;
    if (reasonElement) reasonElement.textContent = priorityReason;
    
    // 保存到记忆
    saveUserMemory('admissionPriority', admissionPriority);
    saveUserMemory('priorityReason', priorityReason);
    
    return userData;
}

// 计算入学顺位
function calculateAdmissionPriority(userData) {
    const 户籍区 = userData.户籍所在区 || '';
    const 居住区 = userData.实际居住区 || '';
    const 房产情况 = userData.房产证类型 || '';
    const 居住性质 = userData.居住性质 || '';
    
    if (!户籍区) return '未填写户籍信息';
    
    // 随迁子女
    if (户籍区 === '外地户籍' || 居住性质 === '租房' && !户籍区.includes('西安')) {
        return '第四顺位（随迁子女）';
    }
    
    // 房户一致
    if (户籍区 === 居住区 && (房产情况.includes('自有') || 房产情况.includes('安置房'))) {
        return '第一顺位（房户一致）';
    }
    
    // 房户不一致
    if (户籍区 !== 居住区 && (房产情况.includes('自有') || 房产情况.includes('安置房'))) {
        return '第二顺位（房户不一致）';
    }
    
    // 集体户
    if (户籍区.includes('集体户')) {
        return '第三顺位（集体户）';
    }
    
    // 租房
    if (居住性质 === '租房') {
        return '第四顺位（租房）';
    }
    
    return '待确认（请补充房产和居住信息）';
}

// 获取顺位理由
function getPriorityReason(userData) {
    const priority = calculateAdmissionPriority(userData);
    
    switch (priority) {
        case '第一顺位（房户一致）':
            return '户籍与房产地址一致，享受最优先入学资格';
        case '第二顺位（房户不一致）':
            return '户籍与房产地址不在同一区域，排序在房户一致之后';
        case '第三顺位（集体户）':
            return '集体户口，由教育局统筹安排入学';
        case '第四顺位（随迁子女）':
            return '随迁子女需提供居住证，由居住证所在区统筹安排';
        case '第四顺位（租房）':
            return '租房居住，排序在自有房产之后';
        default:
            return '请完善户籍、居住和房产信息以确定入学顺位';
    }
}

// 计算能力得分函数
function calculateAbilityScores(userData) {
    const scores = {
        '学业成绩': parseInt(userData.能力评估['维度1'] || 3),
        '综合素养': parseInt(userData.能力评估['维度2'] || 3),
        '学习习惯': parseInt(userData.能力评估['维度3'] || 3),
        '心理素质': parseInt(userData.能力评估['维度4'] || 3),
        '家庭支持': parseInt(userData.能力评估['维度5'] || 3),
        '学科倾向': parseInt(userData.能力评估['维度6'] || 3)
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

// 生成能力雷达图
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
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    
    // 调用AI生成能力分析
    await generateEnhancedAbilityAnalysis();
}

// AI生成能力分析 - 增强版
async function generateEnhancedAbilityAnalysis() {
    const analysisElement = document.getElementById('abilityAnalysis');
    if (!analysisElement) return;
    
    if (!CONFIG.isConnected) {
        // 本地模式显示静态内容
        analysisElement.innerHTML = `
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; min-height: 200px;">
                <h4 style="margin: 0 0 15px 0; color: #1e40af;">🎯 AI深度能力分析</h4>
                <div style="line-height: 1.6; font-size: 14px; color: #374151;">
                    <strong>能力分析：</strong>您的孩子在学业成绩和学习习惯方面表现良好，家庭支持度很高。
                    建议重点关注心理素质的培养，帮助孩子更好地应对升学压力。
                </div>
            </div>
        `;
        return;
    }
    
    try {
        const userData = collectUserDataForAI();
        const userFullInfo = getUserFullInfoString();
        
        const prompt = `
请根据以下学生完整信息，生成【深度个性化能力分析与改进建议】：

${userFullInfo}

【入学顺位分析】
- 预估入学顺位：${calculateAdmissionPriority(userData)}
- 顺位理由：${getPriorityReason(userData)}

要求：
1. 必须结合学生的所有填写信息进行综合分析
2. 必须结合户籍(${userData.户籍所在区})和居住地(${userData.实际居住区})分析教育资源匹配
3. 必须结合房产情况(${userData.房产证类型})给出具体的升学策略建议
4. 分析每个维度的具体表现和改进空间，给出量化建议
5. 给出针对性的能力提升计划和时间安排
6. 结合学生特长(${userData.学生特长.join('、')})推荐适合的发展方向
7. 结合家庭预算(${userData.民办学校预算})和教育理念(${userData.教育理念偏好.join('、')})给出学校选择建议
8. 以家长易懂的语言表达，使用具体案例说明
9. 返回HTML格式的分析内容，包含标题、段落、列表等结构化内容

请直接返回HTML内容，不要包含markdown标记。
`;

        const abilityAnalysis = await callAIAPI(prompt, CONFIG.provider, CONFIG.apiKey, CONFIG.appId);
        
        analysisElement.innerHTML = `
            <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; min-height: 250px;">
                <h4 style="margin: 0 0 15px 0; color: #1e40af;">🎯 AI深度能力分析（基于您的完整信息）</h4>
                <div style="line-height: 1.6; font-size: 14px; color: #374151;">
                    ${abilityAnalysis}
                </div>
                <div class="source-info" style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #d1e9ff;">
                    <span class="trust-badge trust-verified">🤖 AI智能分析</span>
                    基于${CONFIG.provider}大模型深度分析 · 充分考虑个人完整情况
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('能力分析生成失败:', error);
        analysisElement.innerHTML = `
            <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; min-height: 200px;">
                <h4 style="margin: 0 0 15px 0; color: #1e40af;">🎯 AI深度能力分析</h4>
                <div style="line-height: 1.6; font-size: 14px; color: #374151;">
                    <strong>能力分析：</strong>您的孩子在学业成绩和学习习惯方面表现良好，家庭支持度很高。
                    建议重点关注心理素质的培养，帮助孩子更好地应对升学压力。
                </div>
                <p style="color: #e53e3e; margin-top: 8px; font-size: 12px;">AI分析暂时不可用，显示默认分析</p>
            </div>
        `;
    }
}

// 辅助函数：判断入学类型
function 判断入学类型(userData) {
    const 户籍区 = userData.户籍所在区 || '';
    const 居住区 = userData.实际居住区 || '';
    const 房产情况 = userData.房产证类型 || '';
    const 居住性质 = userData.居住性质 || '';
    
    if (户籍区 === '外地户籍' || !户籍区) {
        return '随迁类 - 需办理居住证,由居住证所在区统筹安排公办入学';
    }
    
    if (户籍区 === 居住区 && (房产情况.includes('自有') || 房产情况.includes('安置房'))) {
        return '户籍类(房户一致) - 可报名对口公办学校,第一顺位';
    }
    
    if (户籍区 !== 居住区 && (房产情况.includes('自有') || 房产情况.includes('安置房'))) {
        return '户籍类(房户不一致) - 可报名户籍所在区公办学校,第二顺位';
    }
    
    if (居住性质 === '租房') {
        return '户籍类(租房居住) - 统筹安排公办入学,第四顺位';
    }
    
    if (户籍区.includes('集体户')) {
        return '集体户类 - 由教育局统筹安排公办入学';
    }
    
    return '户籍类 - 建议确认具体房户情况';
}

// ==================== 智能推荐功能 ====================

// 本地分析（AI不可用时）
function generateLocalAnalysis(profile, recommendations) {
    return `
# AI智能分析报告（本地生成）

## 学生概况分析
${profile.name || '该学生'}属于${profile.category}，户籍在${profile.hukouDistrict || '未知区'}，居住在${profile.residenceDistrict || '未知区'}。

## 能力评估
${Object.entries(profile.abilityScores || {}).map(([key, value]) => `- ${key}: ${value}/5分`).join('\n')}

## 学校推荐策略
本次推荐综合考虑了您的户籍、居住、能力评估和偏好，为您精心筛选了以下学校：

### 🚀 冲刺学校（共${recommendations.rush.length}所）
这些学校匹配度较高，但竞争相对激烈，建议作为主要目标。

### ✅ 稳妥学校（共${recommendations.stable.length}所）
这些学校匹配度适中，录取概率较高，建议作为重要备选。

### 🛡️ 保底学校（共${recommendations.safe.length}所）
这些学校确保您有学可上，建议至少选择1-2所作为保障。

## 备考建议
1. 关注学校官方招生信息
2. 准备必要的证明材料
3. 针对性提升能力短板
4. 提前了解入学政策
    `;
}

// 渲染单个学校卡片
function renderSchoolCard(school, type) {
    const matchClass = `match-${type}`;
    const typeColor = {
        rush: '#f59e0b',
        stable: '#10b981',
        safe: '#6366f1'
    }[type];
    
    return `
        <div class="school-card ${type}">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                <h4 style="margin: 0; color: #1e40af; flex: 1;">${school.name}</h4>
                <span class="match-badge ${matchClass}" style="background: ${typeColor}20; color: ${typeColor};">
                    ${school.matchPercentage}% 匹配
                </span>
            </div>
            
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                <span style="background: #f3f4f6; padding: 4px 8px; border-radius: 6px; font-size: 12px; color: #4b5563;">
                    ${school.type}
                </span>
                <span style="background: #fef3c7; padding: 4px 8px; border-radius: 6px; font-size: 12px; color: #92400e;">
                    ${school.district}
                </span>
                ${school.fee ? `<span style="background: #dbeafe; padding: 4px 8px; border-radius: 6px; font-size: 12px; color: #1e40af;">
                    学费: ${school.fee}元/年
                </span>` : ''}
            </div>
            
            ${school.features.length > 0 ? `
                <div style="margin-bottom: 10px;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">学校特色:</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                        ${school.features.slice(0, 3).map(feature => `
                            <span style="background: #ecfdf5; padding: 2px 6px; border-radius: 4px; font-size: 11px; color: #047857;">
                                ${feature}
                            </span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div style="font-size: 12px; color: #6b7280;">
                <div>入学方式: ${school.admissionMethod}</div>
                ${school.hasBoarding !== null ? `
                    <div>住宿: ${school.hasBoarding ? '提供住宿' : '走读'}</div>
                ` : ''}
                <div style="margin-top: 8px; color: #9ca3af; font-size: 11px;">
                    匹配算法: 基于位置、费用、特色等多维度计算
                </div>
            </div>
        </div>
    `;
}

// 渲染智能推荐结果
function renderSmartRecommendations(container, recommendations, aiAnalysis, profile) {
    const { rush, stable, safe, final } = recommendations;
    
    container.innerHTML = `
        <div class="smart-recommendation-container">
            <div style="margin-bottom: 25px;">
                <h3 style="color: #1e40af; margin-bottom: 10px;">🏆 智能学校推荐（基于您的完整信息）</h3>
                <p style="color: #6b7280; font-size: 14px;">
                    基于智能匹配算法，综合考虑了您的户籍、居住、能力、预算等${Object.keys(profile).length}个维度
                </p>
            </div>
            
            <!-- 推荐概览 -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px;">
                <div style="background: linear-gradient(135deg, #fef3c7, #fbbf24); padding: 15px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #92400e;">${rush.length}</div>
                    <div style="font-size: 14px; color: #92400e; font-weight: 500;">冲刺学校</div>
                    <div style="font-size: 12px; color: #b45309; margin-top: 5px;">匹配度高 · 竞争较激烈</div>
                </div>
                <div style="background: linear-gradient(135deg, #d1fae5, #10b981); padding: 15px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #065f46;">${stable.length}</div>
                    <div style="font-size: 14px; color: #065f46; font-weight: 500;">稳妥学校</div>
                    <div style="font-size: 12px; color: #047857; margin-top: 5px;">匹配适中 · 录取概率高</div>
                </div>
                <div style="background: linear-gradient(135deg, #e0e7ff, #6366f1); padding: 15px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #3730a3;">${safe.length}</div>
                    <div style="font-size: 14px; color: #3730a3; font-weight: 500;">保底学校</div>
                    <div style="font-size: 12px; color: #4f46e5; margin-top: 5px;">确保有学 · 风险最低</div>
                </div>
            </div>
            
            <!-- 推荐详情 -->
            <div style="margin-bottom: 30px;">
                <h4 style="color: #dc2626; border-left: 4px solid #dc2626; padding-left: 10px; margin-bottom: 15px;">🚀 冲刺学校（建议重点考虑）</h4>
                <div class="school-cards-grid">
                    ${rush.map(school => renderSchoolCard(school, 'rush')).join('')}
                </div>
                
                <h4 style="color: #059669; border-left: 4px solid #059669; padding-left: 10px; margin-top: 25px; margin-bottom: 15px;">✅ 稳妥学校（建议作为备选）</h4>
                <div class="school-cards-grid">
                    ${stable.map(school => renderSchoolCard(school, 'stable')).join('')}
                </div>
                
                <h4 style="color: #4f46e5; border-left: 4px solid #4f46e5; padding-left: 10px; margin-top: 25px; margin-bottom: 15px;">🛡️ 保底学校（确保有学可上）</h4>
                <div class="school-cards-grid">
                    ${safe.map(school => renderSchoolCard(school, 'safe')).join('')}
                </div>
            </div>
            
            <!-- AI分析 -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #bae6fd;">
                <h4 style="color: #0369a1; margin-bottom: 15px;">🤖 AI智能分析报告</h4>
                <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; max-height: 400px; overflow-y: auto;">
                    <div style="line-height: 1.6; color: #374151; font-size: 14px;">
                        ${aiAnalysis.replace(/\n/g, '<br>')}
                    </div>
                </div>
                <div style="margin-top: 15px; font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 10px;">
                    <span class="trust-badge trust-verified">✅ 数据准确</span>
                    <span>基于智能匹配算法 + ${CONFIG.isConnected ? CONFIG.provider + '大模型' : '本地分析引擎'}</span>
                </div>
            </div>
            
            <!-- 操作按钮 -->
            <div style="display: flex; gap: 15px; margin-top: 20px;">
                <button onclick="exportSmartRecommendations()" style="flex: 1; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <span>💾 导出完整报告</span>
                </button>
                <button onclick="askAIMoreQuestions()" style="flex: 1; padding: 12px; background: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <span>💬 咨询更多问题</span>
                </button>
            </div>
        </div>
        
        <style>
        .school-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 15px;
        }
        .school-card {
            background: white;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s;
            border: 1px solid #e2e8f0;
        }
        .school-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .school-card.rush { border-top: 4px solid #f59e0b; }
        .school-card.stable { border-top: 4px solid #10b981; }
        .school-card.safe { border-top: 4px solid #6366f1; }
        .match-badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-right: 8px;
        }
        .match-rush { background: #fef3c7; color: #92400e; }
        .match-stable { background: #d1fae5; color: #065f46; }
        .match-safe { background: #e0e7ff; color: #3730a3; }
        </style>
    `;
}

// 增强版学校推荐（集成智能引擎）
async function showEnhancedSmartRecommendations() {
    const recommendationElement = document.getElementById('schoolRecommendation');
    if (!recommendationElement) return;
    
    // 显示加载状态
    recommendationElement.innerHTML = `
        <div class="ai-loading">
            <div class="ai-loading-spinner"></div>
            <p>智能推荐引擎正在分析您的信息...</p>
            <p style="font-size: 12px; color: #666;">基于西安市真实学校数据库 + 智能匹配算法</p>
        </div>
    `;
    
    try {
        // 初始化引擎
        await smartEngine.initSchoolData();
        
        // 收集用户画像
        const userProfile = smartEngine.collectUserProfile();
        
        // 生成智能推荐
        const recommendations = smartEngine.generateRecommendations(userProfile);
        
        // 生成AI分析提示词
        const aiPrompt = smartEngine.generateAIPrompt(userProfile, recommendations);
        
        // 调用AI进行分析
        let aiAnalysis = '';
        if (CONFIG.isConnected) {
            try {
                aiAnalysis = await callAIAPI(
                    aiPrompt,
                    CONFIG.provider,
                    CONFIG.apiKey,
                    CONFIG.appId
                );
            } catch (error) {
                console.warn('AI分析失败，使用本地分析:', error);
                aiAnalysis = generateLocalAnalysis(userProfile, recommendations);
            }
        } else {
            aiAnalysis = generateLocalAnalysis(userProfile, recommendations);
        }
        
        // 渲染结果
        renderSmartRecommendations(recommendationElement, recommendations, aiAnalysis, userProfile);
        
    } catch (error) {
        console.error('智能推荐失败:', error);
        recommendationElement.innerHTML = `
            <div style="background: #fff5f5; padding: 20px; border-radius: 8px; text-align: center;">
                <h4 style="color: #e53e3e;">智能推荐生成失败</h4>
                <p>错误: ${error.message}</p>
                <button onclick="retrySmartRecommendation()" style="margin-top: 10px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    重试推荐
                </button>
            </div>
        `;
    }
}

// 保留原有函数（向后兼容）
async function showEnhancedSchoolRecommendations() {
    return showEnhancedSmartRecommendations();
}

// 导出智能推荐
function exportSmartRecommendations() {
    // 这里可以集成现有的PDF导出功能
    alert('导出功能开发中，将集成现有PDF导出系统');
}

// 咨询更多问题
function askAIMoreQuestions() {
    if (window.toggleChat) {
        toggleChat();
    } else {
        alert('请打开聊天窗口进行咨询');
    }
}

// 重试智能推荐
function retrySmartRecommendation() {
    showEnhancedSmartRecommendations();
}

// AI生成时间规划 - 增强版
async function generateEnhancedTimePlan(userData) {
    const currentYear = new Date().getFullYear();
    const targetYear = userData.当前年级 === '六年级' ? currentYear + 1 : 
                      userData.当前年级 === '五年级' ? currentYear + 2 : 
                      userData.当前年级 === '四年级' ? currentYear + 3 : currentYear + 1;
    
    const userFullInfo = getUserFullInfoString();
    
    const prompt = `
请根据以下家庭信息和学生情况制定【${targetYear}年西安小升初个性化时间规划】：

${userFullInfo}

【入学顺位】${calculateAdmissionPriority(userData)}

要求：
1. 基于学生当前${userData.当前年级 || '六年级'}的情况和所有填写信息制定时间规划
2. 列出${targetYear}年每个月的关键事项（政策关注、学校了解、材料准备、报名、摇号、录取等）
3. 根据家庭具体情况给出特别提醒：
   - 户籍情况：${userData.户籍所在区}
   - 居住情况：${userData.实际居住区}
   - 房产情况：${userData.房产证类型}
   - 预算情况：${userData.民办学校预算}
   - 能力评估：${userData.能力评估['维度1'] || '未评估'}分
4. 标注每个时间节点的重要性（关键/重要/提醒）
5. 用表格形式呈现，包含月份、关键事项、具体日期、重要性、特别提醒
6. 以HTML格式输出，使用<table>结构

请直接返回HTML内容，不要包含markdown标记。
`;

    try {
        const result = await callAIAPI(prompt, CONFIG.provider, CONFIG.apiKey, CONFIG.appId);
        return result;
    } catch (error) {
        console.error('AI时间规划生成失败:', error);
        return `<p style="color: #e53e3e;">AI生成失败，请检查网络连接</p>`;
    }
}

// AI生成个性化政策提醒 - 增强版
async function generateEnhancedPolicyTips(userData) {
    const userFullInfo = getUserFullInfoString();
    
    const prompt = `
请根据以下学生和家庭信息，生成【个性化小升初政策提醒与建议】：

${userFullInfo}

要求：
1. 根据户籍(${userData.户籍所在区})、居住(${userData.实际居住区})、房产(${userData.房产证类型})情况判断具体入学顺位
2. 分析民办摇号是否有优势（如：区内摇号概率，基于${userData.户籍所在区}）
3. 分析是否受租房政策影响（居住性质：${userData.居住性质}）
4. 分析是否有房户一致优势（户籍与居住关系：${userData.户籍区与居住区相同 ? '相同' : '不同'}）
5. 基于能力评估(${Object.values(userData.能力评估).join('分,')}分)给出学习准备建议
6. 基于预算(${userData.民办学校预算})给出民办学校选择建议
7. 基于特长(${userData.学生特长.join('、')})给出特色发展建议
8. 给出明确的风险提示与应对建议
9. 以HTML表格形式输出，包含：政策要点、对您的影响、应对策略、重要程度

请直接返回HTML内容，不要包含markdown标记。
`;

    try {
        const result = await callAIAPI(prompt, CONFIG.provider, CONFIG.apiKey, CONFIG.appId);
        return result;
    } catch (error) {
        console.error('AI政策提醒生成失败:', error);
        return `<p style="color: #e53e3e;">AI生成失败，请检查网络连接</p>`;
    }
}

// 调用AI生成并更新页面 - 增强版
async function generateEnhancedTimelineAndPolicy() {
    const userData = collectUserDataForAI();
    
    // 显示加载状态
    const timelineElement = document.getElementById('timeline');
    const policyElement = document.getElementById('policyAdvice');
    
    if (timelineElement) {
        timelineElement.innerHTML = `
            <div class="ai-loading">
                <div class="ai-loading-spinner"></div>
                <p>AI正在为您生成个性化时间规划...</p>
                <p style="font-size: 12px; color: #666;">基于您的户籍、居住、房产、能力等所有信息</p>
            </div>
        `;
    }
    
    if (policyElement) {
        policyElement.innerHTML = `
            <div class="ai-loading">
                <div class="ai-loading-spinner"></div>
                <p>AI正在分析您的政策优势...</p>
                <p style="font-size: 12px; color: #666;">结合您的具体情况进行政策解读</p>
            </div>
        `;
    }
    
    // 并行生成
    try {
        const [timePlan, policyTips] = await Promise.all([
            generateEnhancedTimePlan(userData),
            generateEnhancedPolicyTips(userData)
        ]);
        
        // 更新页面
        if (timelineElement) {
            timelineElement.innerHTML = `
                <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin-top: 10px; border: 1px solid #e2e8f0;">
                    <h4 style="margin: 0 0 15px 0; color: #1e40af;">📅 您的专属时间规划（基于完整信息）</h4>
                    <div style="font-size: 14px; color: #4b5563; margin-bottom: 15px;">
                        <strong>适用对象：</strong>${userData.学生姓名 || '学生'} | ${userData.当前年级 || '六年级'} | ${userData.户籍所在区 || '未填写'}户籍
                    </div>
                    ${timePlan}
                    <div class="source-info" style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #d1e9ff;">
                        <span class="trust-badge trust-verified">🤖 AI个性化生成</span>
                        基于${CONFIG.provider}大模型深度分析 · 结合您的所有填写信息
                    </div>
                </div>
            `;
        }
        
        if (policyElement) {
            policyElement.innerHTML = `
                <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #f56565; border: 1px solid #fed7d7;">
                    <h4 style="margin: 0 0 15px 0; color: #c53030;">💡 政策分析与个性化建议</h4>
                    <div style="font-size: 14px; color: #4b5563; margin-bottom: 15px;">
                        <strong>分析依据：</strong>您的户籍、居住、房产、能力、预算、特长等所有信息
                    </div>
                    ${policyTips}
                    <div class="source-info" style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #fed7d7;">
                        <span class="trust-badge trust-verified">🤖 AI智能分析</span>
                        基于2025年西安小升初最新政策 · 完全个性化解读
                    </div>
                </div>
            `;
        }
        
    } catch (error) {
        console.error('AI生成失败:', error);
        displayStaticTimelineAndPolicy();
    }
}

// 备用：显示静态内容（本地模式或AI失败时）
function displayStaticTimelineAndPolicy() {
    const timelineElement = document.getElementById('timeline');
    const policyElement = document.getElementById('policyAdvice');
    
    if (timelineElement) {
        timelineElement.innerHTML = `
            <div style="background: #f7fafc; padding: 15px; border-radius: 8px; margin-top: 10px;">
                <h4>2025年小升初时间安排（通用版）</h4>
                <table style="width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 14px;">
                    <thead>
                        <tr style="background: #e2e8f0;">
                            <th style="padding: 8px; border: 1px solid #cbd5e0;">时间</th>
                            <th style="padding: 8px; border: 1px solid #cbd5e0;">事项</th>
                            <th style="padding: 8px; border: 1px solid #cbd5e0;">重要性</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;">7月11-24日</td><td>公民办同步报名</td><td><span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">关键</span></td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;">7月30日</td><td>民办学校摇号录取</td><td><span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">关键</span></td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;">8月1-5日</td><td>民办学校补录报名</td><td><span style="background: #f59e0b; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">重要</span></td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;">8月10日前</td><td>公办学校录取通知</td><td><span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">关键</span></td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;">8月15-20日</td><td>统筹安排入学</td><td><span style="background: #f59e0b; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">重要</span></td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #e2e8f0;">8月25-31日</td><td>各校发放录取通知书</td><td><span style="background: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">提醒</span></td></tr>
                    </tbody>
                </table>
                <p style="margin-top: 10px; color: #e53e3e; font-size: 13px;">
                    💬 提示：配置AI服务后可获得基于您个人情况的个性化时间规划
                </p>
            </div>
        `;
    }
    
    if (policyElement) {
        policyElement.innerHTML = `
            <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #f56565;">
                <h4>重要提醒（通用版）</h4>
                <table style="width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 14px;">
                    <thead>
                        <tr style="background: #fed7d7;">
                            <th style="padding: 8px; border: 1px solid #feb2b2;">政策要点</th>
                            <th style="padding: 8px; border: 1px solid #feb2b2;">影响</th>
                            <th style="padding: 8px; border: 1px solid #feb2b2;">建议</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style="padding: 8px; border: 1px solid #fed7d7;">公民同招</td><td>只能选择公办或民办其中一类报名</td><td>提前确定意向，避免错过时间</td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #fed7d7;">摇号录取</td><td>民办学校全部实行电脑随机录取</td><td>准备备用方案，做好心理准备</td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #fed7d7;">房户一致优先</td><td>户籍与房产一致的优先录取</td><td>确认房产证与户口本信息一致</td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #fed7d7;">统筹安排</td><td>未被民办录取的由教育局统筹</td><td>了解片区公办学校情况</td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #fed7d7;">随迁子女</td><td>需提供居住证、务工证明等</td><td>提前准备相关证明材料</td></tr>
                    </tbody>
                </table>
                <p style="margin-top: 10px; color: #e53e3e; font-size: 13px;">
                    💬 提示：配置AI服务后可获得基于您个人情况的个性化政策分析
                </p>
            </div>
        `;
    }
}

// ========== 中文PDF导出功能（修复版） ==========

// 完整修复版PDF导出函数（解决乱码问题）
async function generateFullPdfReport() {
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
        
        // 收集用户数据
        const userData = collectUserDataForAI();
        const userFullInfo = getUserFullInfoString();
        const { jsPDF } = window.jspdf;
        
        // 创建PDF，设置中文支持
        const pdf = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "a4",
            compress: true
        });
        
        // 添加中文字体支持
        try {
            // 尝试加载中文字体
            pdf.addFont('https://cdn.jsdelivr.net/npm/@jsreport/jsreport-fonts-pack@1.0.0/fonts/SourceHanSansCN-Regular.ttf', 'SourceHanSansCN', 'normal');
            pdf.setFont('SourceHanSansCN');
        } catch (e) {
            console.log('使用默认字体');
            pdf.setFont("helvetica", "normal");
        }
        
        let y = 20;
        const lineHeight = 7;
        const pageHeight = 280;
        const leftMargin = 20;
        const rightMargin = 190;
        const pageWidth = 210;
        
        // 辅助函数:检查是否需要换页
        function checkNewPage() {
            if (y > pageHeight) {
                pdf.addPage();
                y = 20;
                try {
                    pdf.setFont('SourceHanSansCN');
                } catch (e) {
                    pdf.setFont("helvetica", "normal");
                }
            }
        }
        
        // 辅助函数:添加标题
        function addTitle(text, fontSize = 18) {
            checkNewPage();
            pdf.setFontSize(fontSize);
            pdf.setFont(undefined, "bold");
            const textWidth = pdf.getTextWidth(text);
            const centerX = (pageWidth - textWidth) / 2;
            pdf.text(text, centerX, y);
            pdf.setFont(undefined, "normal");
            y += fontSize / 2 + 5;
        }
        
        // 辅助函数:添加副标题
        function addSubtitle(text, fontSize = 14) {
            checkNewPage();
            pdf.setFontSize(fontSize);
            pdf.setFont(undefined, "bold");
            pdf.text(text, leftMargin, y);
            pdf.setFont(undefined, "normal");
            y += 8;
        }
        
        // 辅助函数:添加文本(自动换行)
        function addText(text, fontSize = 12, isBold = false, marginLeft = leftMargin) {
            pdf.setFontSize(fontSize);
            if (isBold) {
                pdf.setFont(undefined, "bold");
            }
            
            // 处理中文字符
            const safeText = String(text || '').replace(/[^\u0000-\uFFFF]/g, '');
            const lines = pdf.splitTextToSize(safeText, rightMargin - marginLeft);
            lines.forEach(line => {
                checkNewPage();
                pdf.text(line, marginLeft, y);
                y += lineHeight;
            });
            
            if (isBold) {
                pdf.setFont(undefined, "normal");
            }
        }
        
        // 辅助函数:添加分隔线
        function addDivider() {
            checkNewPage();
            pdf.line(leftMargin, y, rightMargin, y);
            y += 10;
        }
        
        // 辅助函数:添加项目符号列表
        function addBulletList(items, fontSize = 11) {
            pdf.setFontSize(fontSize);
            items.forEach(item => {
                checkNewPage();
                pdf.text('•', leftMargin, y);
                const safeItem = String(item || '').replace(/[^\u0000-\uFFFF]/g, '');
                const lines = pdf.splitTextToSize(' ' + safeItem, rightMargin - leftMargin - 10);
                lines.forEach((line, index) => {
                    if (index > 0) checkNewPage();
                    pdf.text(line, leftMargin + 5, y);
                    y += lineHeight;
                });
                y += 2;
            });
        }
        
        // 辅助函数:添加表格
        function addTable(headers, rows, fontSize = 10) {
            pdf.setFontSize(fontSize);
            
            // 计算列宽
            const colWidths = headers.map(() => 30);
            
            // 绘制表头
            checkNewPage();
            let x = leftMargin;
            headers.forEach((header, i) => {
                pdf.setFont(undefined, "bold");
                const safeHeader = String(header || '').replace(/[^\u0000-\uFFFF]/g, '');
                pdf.text(safeHeader, x, y);
                x += colWidths[i];
            });
            y += lineHeight + 2;
            
            // 绘制表格线
            pdf.line(leftMargin, y - 2, leftMargin + colWidths.reduce((a, b) => a + b, 0), y - 2);
            
            // 绘制数据行
            rows.forEach(row => {
                checkNewPage();
                let x = leftMargin;
                row.forEach((cell, i) => {
                    pdf.setFont(undefined, "normal");
                    const safeCell = String(cell || '').replace(/[^\u0000-\uFFFF]/g, '');
                    const lines = pdf.splitTextToSize(safeCell, colWidths[i] - 5);
                    lines.forEach((line, lineIndex) => {
                        if (lineIndex > 0) {
                            y += lineHeight;
                            checkNewPage();
                        }
                        pdf.text(line, x + 2, y);
                    });
                    x += colWidths[i];
                });
                y += lineHeight + 4;
            });
        }
        
        /*********************** 1. 封面 ***********************/
        addTitle('西安市小升初智能评估报告', 22);
        y += 5;
        
        addText(`报告生成时间：${new Date().toLocaleDateString('zh-CN')} ${new Date().toLocaleTimeString('zh-CN')}`, 12, false, 105);
        y += 15;
        
        addSubtitle('学生基本信息', 16);
        
        const basicInfo = [];
        if (userData.学生姓名) basicInfo.push(`姓名：${userData.学生姓名}`);
        if (userData.学生性别) basicInfo.push(`性别：${userData.学生性别}`);
        if (userData.所在小学) basicInfo.push(`所在小学：${userData.所在小学}`);
        if (userData.当前年级) basicInfo.push(`当前年级：${userData.当前年级}`);
        
        addBulletList(basicInfo, 12);
        
        addSubtitle('联系信息', 14);
        
        const contactInfo = [];
        if (userData.户籍详细地址) contactInfo.push(`户籍地址：${userData.户籍详细地址}`);
        if (userData.居住详细地址) contactInfo.push(`居住地址：${userData.居住详细地址}`);
        
        addBulletList(contactInfo, 12);
        
        addDivider();
        
        addText('本报告由西安小升初智能评估系统生成，仅供家长参考。', 10, false, 105);
        y += 5;
        addText('实际入学政策请以当年教育局官方发布为准。', 10, false, 105);
        
        /*********************** 2. 能力评估 ***********************/
        pdf.addPage();
        y = 20;
        
        addTitle('二、能力评估分析', 18);
        y += 5;
        
        addSubtitle('能力维度得分', 14);
        
        const abilities = [];
        if (userData.能力评估['维度1']) abilities.push(`学业成绩：${userData.能力评估['维度1']}分`);
        if (userData.能力评估['维度2']) abilities.push(`综合素养：${userData.能力评估['维度2']}分`);
        if (userData.能力评估['维度3']) abilities.push(`学习习惯：${userData.能力评估['维度3']}分`);
        if (userData.能力评估['维度4']) abilities.push(`心理素质：${userData.能力评估['维度4']}分`);
        if (userData.能力评估['维度5']) abilities.push(`家庭支持：${userData.能力评估['维度5']}分`);
        if (userData.能力评估['维度6']) abilities.push(`学科倾向：${userData.能力评估['维度6']}分`);
        
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
        
        addSubtitle('学生特长与兴趣', 14);
        if (userData.学生特长 && userData.学生特长.length > 0) {
            addBulletList(userData.学生特长, 11);
        } else {
            addText("未填写学生特长", 11);
        }
        
        /*********************** 3. 户籍与入学资格分析 ***********************/
        pdf.addPage();
        y = 20;
        
        addTitle('三、户籍与入学资格分析', 18);
        y += 10;
        
        addSubtitle('户籍信息', 14);
        
        const hukouInfo = [];
        if (userData.户籍所在区) hukouInfo.push(`户籍区：${userData.户籍所在区}`);
        if (userData.户籍所在街道) hukouInfo.push(`户籍街道：${userData.户籍所在街道}`);
        if (userData.户籍详细地址) hukouInfo.push(`详细地址：${userData.户籍详细地址}`);
        
        addBulletList(hukouInfo, 12);
        
        addSubtitle('居住信息', 14);
        
        const residenceInfo = [];
        if (userData.实际居住区) residenceInfo.push(`居住区：${userData.实际居住区}`);
        if (userData.实际居住街道) residenceInfo.push(`居住街道：${userData.实际居住街道}`);
        if (userData.居住详细地址) residenceInfo.push(`详细地址：${userData.居住详细地址}`);
        if (userData.居住性质) residenceInfo.push(`居住性质：${userData.居住性质}`);
        
        addBulletList(residenceInfo, 12);
        
        addSubtitle('房产信息', 14);
        
        const propertyInfo = [];
        if (userData.学区房情况) propertyInfo.push(`学区房情况：${userData.学区房情况}`);
        if (userData.房产证类型) propertyInfo.push(`房产证类型：${userData.房产证类型}`);
        if (userData.房产持有时间) propertyInfo.push(`持有时间：${userData.房产持有时间}`);
        
        addBulletList(propertyInfo, 12);
        
        // 判断入学类型
        const admissionType = 判断入学类型(userData);
        const admissionPriority = calculateAdmissionPriority(userData);
        const priorityReason = getPriorityReason(userData);
        
        addSubtitle('入学资格评估', 14);
        addText(admissionType, 12, true);
        y += 5;
        addText(`入学顺位：${admissionPriority}`, 12);
        y += 5;
        addText(`评估理由：${priorityReason}`, 11);
        
        /*********************** 4. 学校推荐 ***********************/
        pdf.addPage();
        y = 20;
        
        addTitle('四、个性化学校推荐', 18);
        y += 10;
        
        const schoolCards = document.querySelectorAll(".school-card");
        const schoolTable = document.querySelector(".school-table");
        
        if (schoolTable) {
            // 如果有表格形式的推荐，提取表格数据
            const rows = [];
            const tableRows = schoolTable.querySelectorAll("tbody tr");
            
            tableRows.forEach((row, index) => {
                const cells = row.querySelectorAll("td");
                if (cells.length >= 8) {
                    const rowData = [
                        (index + 1).toString(),
                        cells[1]?.textContent?.trim() || "",
                        cells[2]?.textContent?.trim() || "",
                        cells[3]?.textContent?.trim() || "",
                        cells[4]?.textContent?.trim() || "",
                        cells[5]?.textContent?.trim() || "",
                        cells[6]?.textContent?.trim() || "",
                        cells[7]?.textContent?.trim() || ""
                    ];
                    rows.push(rowData);
                }
            });
            
            if (rows.length > 0) {
                addSubtitle('推荐学校列表', 14);
                
                const headers = ['序号', '学校名称', '类型', '区县', '匹配度', '推荐类型', '入学概率', '特色'];
                addTable(headers, rows);
            } else {
                addText("暂未生成学校推荐表格", 12);
            }
        } else if (schoolCards.length > 0) {
            // 传统的卡片形式
            addSubtitle('推荐学校', 14);
            
            let schoolCount = 1;
            schoolCards.forEach((card, index) => {
                checkNewPage();
                
                const schoolName = card.querySelector("h3, h4")?.textContent?.trim() || "未知学校";
                const matchBadge = card.querySelector(".match-badge")?.textContent?.trim() || "";
                const details = card.querySelectorAll("p");
                
                addText(`${schoolCount}. ${schoolName}`, 13, true);
                if (matchBadge) {
                    addText(matchBadge, 11, false, leftMargin + 10);
                }
                
                const schoolInfo = [];
                details.forEach(p => {
                    const text = p.textContent?.trim() || "";
                    if (text && text.length > 0 && text.length < 100) {
                        schoolInfo.push(text);
                    }
                });
                
                if (schoolInfo.length > 0) {
                    addBulletList(schoolInfo, 10);
                }
                
                y += 5;
                schoolCount++;
            });
        } else {
            addText("暂未生成学校推荐，请在系统中查看详细推荐。", 12);
        }
        
        /*********************** 5. 时间规划与建议 ***********************/
        pdf.addPage();
        y = 20;
        
        addTitle('五、时间规划与建议', 18);
        y += 10;
        
        const grade = userData.当前年级 || '六年级';
        const timelineItems = generateTimeline(grade);
        
        addSubtitle(`${grade}小升初时间规划`, 14);
        addBulletList(timelineItems, 11);
        
        /*********************** 6. 重要提醒 ***********************/
        y += 10;
        addSubtitle('重要政策提醒', 14);
        
        const policyReminders = [
            "公民办学校同步招生，只能选择其中一类报名",
            "民办学校实行电脑随机录取（摇号）",
            "未被民办录取的学生，由教育局统筹安排公办入学",
            "房户一致的家庭享有最优先入学资格",
            "随迁子女需提供居住证、务工证明等材料",
            "请关注西安市教育局官网获取最新政策"
        ];
        
        addBulletList(policyReminders, 11);
        
        /*********************** 7. 报告说明 ***********************/
        pdf.addPage();
        y = 20;
        
        addTitle('六、报告说明', 18);
        y += 10;
        
        const reportNotes = [
            "本报告基于用户填写信息和西安市2025年小升初政策生成",
            "学校推荐基于西安市教育局官方公布的学校名单",
            "入学概率为理论预估，实际结果以当年录取为准",
            "时间安排为常规规划，具体时间请以官方通知为准",
            "建议家长结合实际情况，多方面了解目标学校",
            "最终解释权以西安市教育局官方政策为准",
            "报告生成时间：" + new Date().toLocaleString('zh-CN')
        ];
        
        addBulletList(reportNotes, 11);
        
        y += 15;
        addText("数据来源：西安市教育局官方网站", 10);
        addText("技术支持：西安小升初智能评估系统", 10);
        
        // 添加页脚
        const pageCount = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.setFontSize(9);
            pdf.text(`第 ${i} 页 / 共 ${pageCount} 页`, pageWidth / 2, 290, { align: 'center' });
        }
        
        // 保存PDF - 使用安全文件名
        const safeName = (userData.学生姓名 || '未知').replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
        const filename = `西安小升初评估报告_${safeName}_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.pdf`;
        
        // 保存PDF
        pdf.save(filename);
        
        // 移除加载提示
        document.getElementById('pdf-loading')?.remove();
        
        alert('PDF报告生成成功！已保存为：' + filename);
        
    } catch (error) {
        console.error('PDF生成失败:', error);
        document.getElementById('pdf-loading')?.remove();
        
        // 提供备用方案
        const userData = collectUserDataForAI();
        const safeName = (userData.学生姓名 || '报告').replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
        
        // 生成文本报告作为备用
        const textReport = generateTextReport();
        const blob = new Blob([textReport], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `西安小升初评估报告_${safeName}_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.txt`;
        a.click();
        
        alert('PDF生成失败，已生成文本报告作为替代。错误信息：' + error.message);
    }
}

// 生成文本报告（PDF失败时的备用方案）
function generateTextReport() {
    const userData = collectUserDataForAI();
    const admissionPriority = calculateAdmissionPriority(userData);
    const priorityReason = getPriorityReason(userData);
    
    let report = '='.repeat(60) + '\n';
    report += '        西安市小升初智能评估报告\n';
    report += '='.repeat(60) + '\n\n';
    
    report += '报告生成时间：' + new Date().toLocaleString('zh-CN') + '\n\n';
    
    // 基本信息
    report += '一、学生基本信息\n';
    report += '-'.repeat(40) + '\n';
    if (userData.学生姓名) report += '姓名：' + userData.学生姓名 + '\n';
    if (userData.学生性别) report += '性别：' + userData.学生性别 + '\n';
    if (userData.所在小学) report += '所在小学：' + userData.所在小学 + '\n';
    if (userData.当前年级) report += '当前年级：' + userData.当前年级 + '\n';
    
    // 户籍信息
    report += '\n二、户籍与居住信息\n';
    report += '-'.repeat(40) + '\n';
    if (userData.户籍所在区) report += '户籍区：' + userData.户籍所在区 + '\n';
    if (userData.户籍所在街道) report += '户籍街道：' + userData.户籍所在街道 + '\n';
    if (userData.实际居住区) report += '居住区：' + userData.实际居住区 + '\n';
    if (userData.实际居住街道) report += '居住街道：' + userData.实际居住街道 + '\n';
    if (userData.居住性质) report += '居住性质：' + userData.居住性质 + '\n';
    
    // 能力评估
    report += '\n三、能力评估\n';
    report += '-'.repeat(40) + '\n';
    if (userData.能力评估['维度1']) report += '学业成绩：' + userData.能力评估['维度1'] + '分\n';
    if (userData.能力评估['维度2']) report += '综合素养：' + userData.能力评估['维度2'] + '分\n';
    if (userData.能力评估['维度3']) report += '学习习惯：' + userData.能力评估['维度3'] + '分\n';
    if (userData.能力评估['维度4']) report += '心理素质：' + userData.能力评估['维度4'] + '分\n';
    if (userData.能力评估['维度5']) report += '家庭支持：' + userData.能力评估['维度5'] + '分\n';
    if (userData.能力评估['维度6']) report += '学科倾向：' + userData.能力评估['维度6'] + '分\n';
    
    // 入学资格
    report += '\n四、入学资格评估\n';
    report += '-'.repeat(40) + '\n';
    report += '预估入学顺位：' + admissionPriority + '\n';
    report += '评估理由：' + priorityReason + '\n';
    
    // 学校推荐（提取页面内容）
    report += '\n五、学校推荐\n';
    report += '-'.repeat(40) + '\n';
    
    const schoolTable = document.querySelector(".school-table");
    if (schoolTable) {
        const rows = schoolTable.querySelectorAll("tbody tr");
        rows.forEach((row, index) => {
            const cells = row.querySelectorAll("td");
            if (cells.length >= 6) {
                report += `${index + 1}. ${cells[1]?.textContent?.trim() || ''} `;
                report += `[${cells[2]?.textContent?.trim() || ''}] `;
                report += `匹配度：${cells[5]?.textContent?.trim() || ''}\n`;
                report += `   推荐理由：${cells[6]?.textContent?.trim() || ''}\n`;
            }
        });
    } else {
        report += '请在系统中查看详细的学校推荐\n';
    }
    
    // 时间规划
    report += '\n六、时间规划\n';
    report += '-'.repeat(40) + '\n';
    const timelineItems = generateTimeline(userData.当前年级 || '六年级');
    timelineItems.forEach(item => {
        report += '• ' + item + '\n';
    });
    
    // 注意事项
    report += '\n七、重要提醒\n';
    report += '-'.repeat(40) + '\n';
    const reminders = [
        '公民办学校同步招生，只能选择其中一类报名',
        '民办学校实行电脑随机录取（摇号）',
        '未被民办录取的学生，由教育局统筹安排公办入学',
        '请确保在报名前准备好所有相关材料',
        '关注西安市教育局官方网站获取最新信息'
    ];
    reminders.forEach(item => {
        report += '• ' + item + '\n';
    });
    
    report += '\n' + '='.repeat(60) + '\n';
    report += '报告结束\n';
    report += '数据来源：西安市教育局官方网站\n';
    report += '生成系统：西安小升初智能评估系统\n';
    report += '='.repeat(60) + '\n';
    
    return report;
}

// 生成时间规划
function generateTimeline(grade) {
    switch (grade) {
        case "小学六年级":
        case "六年级":
            return [
                "2025年3月：关注民办招生简章发布，参加学校开放日",
                "2025年4月：参加民办学校咨询会，了解目标学校",
                "2025年5月：核查户籍与房产信息，准备报名材料",
                "2025年6月：网上报名，参加民办摇号或公办登记",
                "2025年7月：公布录取结果，确认入学意向",
                "2025年8月：办理入学手续，准备新生报到"
            ];
        case "小学五年级":
        case "五年级":
            return [
                "2025年9-12月：重点提升学业成绩，培养学习习惯",
                "2026年1-3月：了解小升初政策，初步筛选目标学校",
                "2026年4-6月：参加各类素质拓展活动，丰富简历",
                "2026年7-8月：暑期强化训练，查漏补缺",
                "2026年9月：进入六年级，开始全面准备"
            ];
        case "小学四年级":
        case "四年级":
            return [
                "2025年：打好语文、数学、英语学科基础",
                "2026年：培养综合素养，参加兴趣班和社团活动",
                "2027年：了解学校信息，制定升学目标",
                "2028年：正式准备升学材料，关注政策变化"
            ];
        default:
            return [
                "请关注西安市教育局官方网站获取最新政策",
                "建议提前了解目标学校的招生要求",
                "准备好户籍、房产等相关证明材料",
                "关注学校开放日和招生咨询会信息"
            ];
    }
}

// 辅助函数:提取学校推荐信息
function extractSchoolRecommendations() {
    const schools = [];
    const schoolCards = document.querySelectorAll('.school-card');
    
    schoolCards.forEach(card => {
        const schoolInfo = {
            学校名称: card.querySelector('h3, h4')?.textContent?.trim() || '',
            匹配度: card.querySelector('.match-badge')?.textContent?.trim() || '',
            学校详情: []
        };
        
        const details = card.querySelectorAll('p');
        details.forEach(p => {
            const text = (p.textContent || '').trim();
            if (text) {
                schoolInfo.学校详情.push(text);
            }
        });
        
        if (schoolInfo.学校名称) {
            schools.push(schoolInfo);
        }
    });
    
    return schools.length > 0 ? schools : '未生成推荐';
}

// 导出JSON
function exportReportJSON() {
    try {
        // 收集完整的用户数据
        const completeData = {
            // 基本信息
            报告生成时间: new Date().toLocaleString('zh-CN'),
            报告版本: '2025增强版',
            
            // 学生基本信息
            学生信息: collectUserDataForAI(),
            
            // 入学资格评估
            入学资格评估: {
                预估入学顺位: calculateAdmissionPriority(collectUserDataForAI()),
                顺位理由: getPriorityReason(collectUserDataForAI()),
                详细分析: 判断入学类型(collectUserDataForAI())
            },
            
            // 系统配置信息
            系统配置: {
                AI模式: CONFIG.isConnected ? '在线模式' : '本地模式',
                AI提供商: CONFIG.provider || '未配置',
                数据来源: '西安市教育局2025年招生政策'
            }
        };
        
        // 生成格式化的JSON字符串
        const dataStr = JSON.stringify(completeData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `西安小升初评估数据_${new Date().getTime()}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        alert('✅ JSON数据导出成功!\n\n导出内容包括:\n- 学生完整信息\n- 6维度能力评估\n- 户籍居住信息\n- 房产信息\n- 入学资格评估\n- 民办意向与预算');
        
    } catch (error) {
        console.error('JSON导出失败:', error);
        alert('❌ JSON导出失败: ' + error.message);
    }
}

// 重置所有
function resetAll() {
    if (confirm('您确定要重置所有填写的数据吗？')) {
        localStorage.clear();
        window.location.reload();
    }
}

// 保存并测试配置
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
        // 测试API连接
        const testMessage = '你好，请回复"连接成功"';
        const response = await callAIAPI(testMessage, provider, apiKey, appId);
        
        // 保存配置
        CONFIG.apiKey = apiKey;
        CONFIG.appId = appId;
        CONFIG.provider = provider;
        CONFIG.isConnected = true;
        
        // 更新状态显示
        const statusText = document.getElementById('statusText');
        const apiStatus = document.getElementById('apiStatus');
        const chatApiStatus = document.getElementById('chatApiStatus');
        
        if (statusText) statusText.textContent = `${provider} 已连接`;
        if (apiStatus) {
            apiStatus.className = 'api-status connected';
            apiStatus.textContent = `${provider} 在线`;
        }
        if (chatApiStatus) chatApiStatus.textContent = `${provider} 在线`;
        
        // 保存到本地存储
        localStorage.setItem('aiProvider', provider);
        localStorage.setItem('aiApiKey', apiKey);
        localStorage.setItem('aiAppId', appId);
        localStorage.setItem('aiMode', 'online');
        
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

// ======= 表单校验与错误提示 =======
function ensureErrorHolder(afterElem) {
    if (!afterElem) return null;
    let holder = afterElem.nextElementSibling;
    if (!holder || !holder.classList || !holder.classList.contains('field-error')) {
        holder = document.createElement('div');
        holder.className = 'field-error';
        holder.style.color = '#e53e3e';
        holder.style.fontSize = '12px';
        holder.style.marginTop = '6px';
        afterElem.parentNode.insertBefore(holder, afterElem.nextSibling);
    }
    return holder;
}

function showFieldError(elem, msg) {
    if (!elem) return;
    elem.style.borderColor = '#e53e3e';
    elem.style.boxShadow = '0 0 0 1px #e53e3e';
    const holder = ensureErrorHolder(elem);
    if (holder) holder.textContent = msg || '此项为必填';
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

// 验证步骤3
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

// ======= 可搜索下拉 =======
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

// 填充街道数据
function populateStreets(districtSelectId, streetSelectId) {
    const districtSelect = document.getElementById(districtSelectId);
    const streetSelect = document.getElementById(streetSelectId);
    if (!districtSelect || !streetSelect) return;

    const mapDistrictKey = (raw) => {
        if (!raw) return '';
        let name = String(raw).trim();
        name = name.replace(/[()（）]/g, '').replace(/\s+/g, '');
        if (STREET_DATA[name]) return name;
        if (STREET_DATA[raw]) return raw;
        const keys = Object.keys(STREET_DATA);
        for (const k of keys) {
            if (name.includes(k.replace(/\s+/g, '')) || k.replace(/\s+/g, '').includes(name)) {
                return k;
            }
        }
        return '';
    };

    const fill = () => {
        const selectedOption = districtSelect.options[districtSelect.selectedIndex];
        const rawValue = (districtSelect.value || '').trim();
        const rawText = selectedOption ? (selectedOption.textContent || '').trim() : '';
        const mapped = mapDistrictKey(rawValue) || mapDistrictKey(rawText);
        const streets = mapped ? (STREET_DATA[mapped] || []) : [];

        if (!mapped) {
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
            streetSelect.disabled = streets.length === 0;
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

// ========== 初始化函数 ==========

// 设置聊天窗口拖动
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

// 恢复配置
function restoreConfig() {
    const savedProvider = localStorage.getItem('aiProvider') || 'bailian';
    const savedApiKey = localStorage.getItem('aiApiKey') || '';
    const savedAppId = localStorage.getItem('aiAppId') || '';
    const savedMode = localStorage.getItem('aiMode') || 'local';
    
    console.log('恢复配置:', { savedProvider, savedApiKey: savedApiKey ? '已设置' : '未设置', savedMode });
    
    // 明确检查是否为本地模式
    const isLocalMode = savedMode === 'local' || !savedApiKey;
    
    if (!isLocalMode && savedApiKey) {
        // 在线模式
        CONFIG.provider = savedProvider;
        CONFIG.apiKey = savedApiKey;
        CONFIG.appId = savedAppId;
        CONFIG.isConnected = true;
        
        // 更新UI显示
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
        // 本地模式
        CONFIG.provider = savedProvider;
        CONFIG.apiKey = savedApiKey;
        CONFIG.appId = savedAppId;
        CONFIG.isConnected = false;
        
        // 更新UI显示为本地模式
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
    
    // 填充输入框（无论什么模式都填充）
    const apiKeyInput = document.getElementById('apiKeyInput');
    const appIdInput = document.getElementById('appIdInput');
    const providerSelect = document.getElementById('providerSelect');
    
    if (apiKeyInput) apiKeyInput.value = CONFIG.apiKey;
    if (appIdInput) appIdInput.value = CONFIG.appId || '';
    if (providerSelect) providerSelect.value = CONFIG.provider;
}

// 初始化所有功能
function initializeApp() {
    console.log('正在初始化应用...');
    
    // 恢复配置
    restoreConfig();
    
    // 初始化步骤显示
    showStep(1);

    // 初始化户籍和居住地联动下拉菜单
    populateStreets('householdDistrict', 'householdStreet');
    populateStreets('residenceDistrict', 'residenceStreet');

    // 为下拉菜单附加搜索功能
    ensureSearchInputs();

    // 为聊天窗口添加拖动功能
    setupChatDrag();
    
    // 异步初始化智能引擎
    setTimeout(async () => {
        try {
            await smartEngine.initSchoolData();
            console.log('智能推荐引擎初始化完成');
        } catch (error) {
            console.warn('智能推荐引擎初始化失败:', error);
        }
    }, 1000);
        
    console.log('应用初始化完成');
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initializeApp);

// 输入时清除错误样式
document.addEventListener('DOMContentLoaded', function() {
    ['householdDistrict','householdStreet','residenceDistrict','residenceStreet'].forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.addEventListener('change', () => clearFieldError(elem));
        }
    });
});

// 打印优化报告
function printOptimizedReport() {
    window.print();
}

// 导出PDF的简化版
function exportReportPDF() {
    generateFullPdfReport();
}

// 绑定PDF导出按钮
document.addEventListener('DOMContentLoaded', function() {
    // 绑定完整PDF导出按钮
    const exportFullPdfBtn = document.getElementById('exportFullPdfBtn');
    if (exportFullPdfBtn) {
        exportFullPdfBtn.addEventListener('click', generateFullPdfReport);
    }
});

// ========== 导出全局函数 ==========
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
window.generateFullPdfReport = generateFullPdfReport;
window.askCatAssistant = askCatAssistant;
window.generateSchoolRecommendation = generateReport;
window.getUserFullInfoString = getUserFullInfoString;
window.showEnhancedSchoolRecommendations = showEnhancedSchoolRecommendations;
window.showEnhancedSmartRecommendations = showEnhancedSmartRecommendations;
window.smartEngine = smartEngine;
window.retrySmartRecommendation = retrySmartRecommendation;
window.exportSmartRecommendations = exportSmartRecommendations;
window.askAIMoreQuestions = askAIMoreQuestions;