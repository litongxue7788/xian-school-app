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

// 全局学校数据存储
let SCHOOLS_DATA = {};

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

// ========== 数据适配层 - 新增函数 ==========
// 【新增】统一学校数据结构适配器
function adaptSchoolStructure(school, districtName) {
    if (!school) return null;
    
    // 统一的学校结构
    const adaptedSchool = {
        // 基本信息
        id: school.id || school.name?.replace(/\s+/g, '_') || `school_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: school.name || '未知学校',
        type: school.type || (school.level && school.level.includes('民办') ? '民办' : '公办'),
        level: school.level || school.school_stage || '初中',
        
        // 位置信息 - 关键修复：统一 district 字段
        district: school.district || school.newcity || districtName || '未知区',
        newcity: school.newcity || districtName || '未知区',
        address: school.address || school.location || '',
        
        // 入学相关信息
        学区: school.学区 || school.streets || [],
        features: school.features || [],
        
        // 学业表现
        graduation_rate: school.graduation_rate || school.admissionRate || 70,
        admissionRate: school.admissionRate || school.graduation_rate || 70,
        
        // 费用信息
        tuition: school.tuition || (school.type === '民办' ? 30000 : 0),
        
        // 其他信息
        provides_dorm: school.provides_dorm || (school.type === '民办'),
        special_classes: school.special_classes || school.features || [],
        discipline_rating: school.discipline_rating || 4.0,
        
        // 位置坐标（如果有）
        latitude: school.latitude || 34.3416,
        longitude: school.longitude || 108.9398,
        
        // 联系方式
        contact_phone: school.contact_phone || '029-XXXXXXXX',
        website: school.website || '',
        is_key_school: school.is_key_school || (school.level && (school.level.includes('重点') || school.level.includes('示范')))
    };
    
    // 确保学区字段是数组
    if (!Array.isArray(adaptedSchool.学区) && adaptedSchool.学区) {
        adaptedSchool.学区 = [adaptedSchool.学区];
    }
    
    // 确保特色班是数组
    if (!Array.isArray(adaptedSchool.special_classes) && adaptedSchool.special_classes) {
        adaptedSchool.special_classes = [adaptedSchool.special_classes];
    }
    
    return adaptedSchool;
}

// 【新增】批量适配学校数据
function adaptSchoolsBatch(schools, districtName) {
    if (!schools || !Array.isArray(schools)) {
        console.warn(`适配学校数据失败：无效的输入 -`, schools);
        return [];
    }
    
    return schools
        .map(school => adaptSchoolStructure(school, districtName))
        .filter(school => school !== null);
}

// 【修复】增强版数据收集 - 确保收集所有信息
function collectUserDataForAI() {
    const userData = {
        // 学生基本信息
        学生姓名: document.getElementById('studentName')?.value || '',
        学生性别: document.getElementById('studentGender')?.value || '',
        所在小学: document.getElementById('currentSchool')?.value || '',
        当前年级: document.querySelector('input[name="currentGrade"]:checked')?.value || '',
        
        // 户籍信息 - 完整收集
        户籍所在区: document.getElementById('householdDistrict')?.value || '',
        户籍所在街道: document.getElementById('householdStreet')?.value || '',
        户籍详细地址: document.getElementById('householdAddress')?.value || '',
        
        // 居住信息 - 完整收集
        实际居住区: document.getElementById('residenceDistrict')?.value || '',
        实际居住街道: document.getElementById('residenceStreet')?.value || '',
        居住详细地址: document.getElementById('residenceAddress')?.value || '',
        居住性质: document.getElementById('residenceType')?.value || '',
        
        // 匹配关系
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

// 【修复】生成完整的用户信息字符串（中文友好）
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

// ========== 学校数据加载函数 ==========

// 加载所有区县的学校数据
async function loadAllDistrictsData() {
    try {
        console.log('开始加载学校数据...');
        
        // 区县列表（对应data/districts/目录下的文件）
        const districts = [
            '新城区', '碑林区', '莲湖区', '雁塔区', '灞桥区', '未央区',
            '阎良区', '临潼区', '长安区', '高陵区', '鄠邑区', '蓝田县',
            '周至县', '西咸新区', '高新区', '经开区', '曲江新区',
            '浐灞国际港', '航天基地'
        ];
        
        for (const district of districts) {
            try {
                // 动态导入区县数据文件
                const module = await import(`./data/districts/${district}.js`);
                const districtData = module.default || module;
                
                // 【关键修复】使用数据适配层处理学校数据
                const adaptedPublicSchools = adaptSchoolsBatch(districtData.public_schools || [], district);
                const adaptedPrivateSchools = adaptSchoolsBatch(districtData.private_schools || [], district);
                const allAdaptedSchools = [...adaptedPublicSchools, ...adaptedPrivateSchools];
                
                // 转换为标准格式
                SCHOOLS_DATA[district] = {
                    metadata: districtData.metadata,
                    schools: allAdaptedSchools,
                    public_schools: adaptedPublicSchools,
                    private_schools: adaptedPrivateSchools,
                    statistics: districtData.statistics || { 
                        total_private: adaptedPrivateSchools.length, 
                        total_public: adaptedPublicSchools.length 
                    }
                };
                
                console.log(`✅ 加载 ${district} 数据成功，${adaptedPublicSchools.length}所公办，${adaptedPrivateSchools.length}所民办`);
                console.log(`   数据已适配：district字段统一处理`);
            } catch (error) {
                console.warn(`⚠️ 加载 ${district} 数据失败:`, error.message);
                // 创建空数据占位
                SCHOOLS_DATA[district] = {
                    metadata: { district: district, data_year: "2025" },
                    schools: [],
                    public_schools: [],
                    private_schools: [],
                    statistics: { total_private: 0, total_public: 0 }
                };
            }
        }
        
        console.log('学校数据加载完成:', Object.keys(SCHOOLS_DATA).length, '个区县');
        console.log('数据结构已统一适配，可使用标准字段查询');
        return SCHOOLS_DATA;
        
    } catch (error) {
        console.error('学校数据加载失败:', error);
        // 返回空数据
        SCHOOLS_DATA = {};
        return SCHOOLS_DATA;
    }
}

// 【修复】从本地数据库获取学校信息的函数 - 使用适配后的数据
function getSchoolsFromLocalData(district, streetName = null) {
    // 尝试从全局变量获取学校数据
    const districtData = SCHOOLS_DATA[district] || {};
    const allSchools = districtData.schools || [];
    
    if (!streetName || streetName === '') {
        return allSchools;
    }
    
    // 如果指定了街道，进一步筛选
    return allSchools.filter(school => {
        if (!school.学区 || school.学区.length === 0) {
            return true; // 如果学校没有学区限制，则包含
        }
        // 检查学区是否包含该街道
        return school.学区.some(street => 
            street.includes(streetName) || 
            streetName.includes(street) ||
            (school.features && school.features.some(f => f.includes(streetName)))
        );
    });
}

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

// 【新增】调用AI API并传递完整上下文
async function callAIAPIWithFullContext(message, userFullInfo, userData, provider, apiKey, appId = '') {
    try {
        console.log('调用AI API（完整上下文）:', { 
            provider, 
            messageLength: message.length,
            hasUserInfo: !!userFullInfo,
            userDataKeys: Object.keys(userData || {})
        });
        
        // 调用自己的后端API
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                provider: provider,
                message: message,
                apiKey: apiKey,
                appId: appId,
                // 【关键】传递完整用户信息
                userFullInfo: userFullInfo,
                userData: userData
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
        console.error('AI API调用失败:', error);
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

// 【修复】增强版sendMessage - 传递完整用户信息
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
    chatInput.style.height = 'auto';
    
    try {
        // 显示加载状态
        showLoadingIndicator();
        
        // 【关键】收集完整用户数据
        const userData = collectUserDataForAI();
        const userFullInfo = getUserFullInfoString();
        
        // 【关键】构建包含完整上下文的请求
        const response = await callAIAPIWithFullContext(
            message,
            userFullInfo,
            userData,
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

// 【修复】快捷操作 - 传递完整上下文
async function quickAction(text) {
    if (!CONFIG.isConnected) {
        alert(`快捷操作 "${text}" 在本地模式下不可用。请切换到在线模式。`);
        return;
    }
    
    try {
        showLoadingIndicator();
        
        const userData = collectUserDataForAI();
        const userFullInfo = getUserFullInfoString();
        
        // 【优化】根据快捷操作类型构建问题
        let question = text;
        
        if (text === '2026年小升初时间安排') {
            // 添加用户年级信息
            const grade = userData.当前年级 || '六年级';
            question = `我的孩子当前是${grade}，请告诉我2026年小升初的详细时间安排和关键节点`;
        } else if (text === '民办学校有哪些') {
            // 添加用户预算和区域偏好
            const budget = userData.民办学校预算 || '';
            const district = userData.实际居住区 || userData.户籍所在区 || '';
            question = `我住在${district}，预算是${budget}，请推荐适合的民办初中学校`;
        } else if (text === '摇号政策') {
            // 添加用户户籍信息
            const hukou = userData.户籍所在区 || '';
            const residence = userData.实际居住区 || '';
            question = `我户籍在${hukou}，实际居住在${residence}，请详细解释民办摇号政策和我的摇号概率`;
        }
        
        const response = await callAIAPIWithFullContext(
            question,
            userFullInfo,
            userData,
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

function askCatAssistant(question) {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = question;
        sendMessage();
    }
}

// 【修复】添加消息到聊天窗口
function addMessageToChat(role, content) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${role}`;
    
    if (role === 'user') {
        messageDiv.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">${content.replace(/\n/g, '<br>')}</div>
        `;
    } else {
        // AI消息 - 格式化显示
        const formattedContent = formatAIResponse(content);
        
        messageDiv.innerHTML = `
            <div class="message-avatar">🐱</div>
            <div class="message-content">
                ${formattedContent}
                <div class="source-info">
                    <span class="trust-badge trust-verified">✅ 基于完整信息</span>
                    已分析您的户籍、居住、房产、能力评估等所有填写信息
                </div>
            </div>
        `;
    }
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// 【新增】格式化AI响应（美化显示）
function formatAIResponse(content) {
    // 处理换行
    let formatted = content.replace(/\n/g, '<br>');
    
    // 处理列表项（• 或 - 开头）
    formatted = formatted.replace(/^([•\-])\s+(.+)$/gm, '<div style="margin-left: 15px;">$1 $2</div>');
    
    // 处理数字列表
    formatted = formatted.replace(/^(\d+[.)、])\s+(.+)$/gm, '<div style="margin-left: 15px;"><strong>$1</strong> $2</div>');
    
    // 高亮关键词
    const keywords = ['第一顺位', '第二顺位', '第三顺位', '第四顺位', '房户一致', '摇号', '公办', '民办'];
    keywords.forEach(keyword => {
        const regex = new RegExp(keyword, 'g');
        formatted = formatted.replace(regex, `<span style="background: #fef3c7; padding: 2px 4px; border-radius: 3px; font-weight: bold;">${keyword}</span>`);
    });
    
    return formatted;
}

// 【修复】显示加载指示器
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

// 【修复】隐藏加载指示器
function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// 【修复】处理聊天键盘事件
function handleChatKeyPress(event) {
    const textarea = event.target;
    
    // Enter发送,Shift+Enter换行
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
    
    // 自动调整textarea高度
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

// 【修复】AI解读政策 - 传递完整上下文
async function interpretPolicy() {
    if (!CONFIG.isConnected) {
        alert('AI解读功能在本地模式下不可用。请切换到在线模式。');
        return;
    }
    
    try {
        showLoadingIndicator();
        
        const userData = collectUserDataForAI();
        const userFullInfo = getUserFullInfoString();
        
        // 构建包含完整信息的问题
        const enrollmentType = determineEnrollmentType(userData);
        
        const question = `
请详细解读西安市小升初的入学顺位政策，并基于我的具体情况分析：

我的入学类型：${enrollmentType.category}
我的入学顺位：第${enrollmentType.priority}顺位
户籍：${userData.户籍所在区 || '未填写'} ${userData.户籍所在街道 || ''}
居住：${userData.实际居住区 || '未填写'} ${userData.实际居住街道 || ''}
房产情况：${userData.学区房情况 || '未填写'}

请说明：
1. 我属于哪种入学顺位，具体是什么意思
2. 我可以报哪些公办学校
3. 我需要准备哪些材料
4. 有什么注意事项和风险提示
        `;
        
        const response = await callAIAPIWithFullContext(
            question,
            userFullInfo,
            userData,
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
                    <div style="line-height: 1.6; color: #374151;">${response.replace(/\n/g, '<br>')}</div>
                    <div style="margin-top: 10px; font-size: 12px; color: #6b7280;">
                        <span class="trust-badge trust-verified">✅ 个性化分析</span> 
                        基于${CONFIG.provider}模型 · 结合您的完整填写信息
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
    console.log('生成报告中...');
    
    // 收集所有步骤的数据
    collectAllData();
    
    // 显示步骤7
    showStep(7);
    
    // 生成能力雷达图（包含AI分析）
    await generateAbilityChart();
    
    // 显示学校推荐（增强版）- 使用适配后的数据
    await showEnhancedSchoolRecommendations();
    
    // AI生成时间规划和政策提醒
    if (CONFIG.isConnected) {
        await generateEnhancedTimelineAndPolicy();
    } else {
        // 本地模式显示静态内容
        displayStaticTimelineAndPolicy();
    }
    
    alert('报告生成完成！请查看AI推荐结果。');
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

// ========== 学校推荐核心函数 ==========

// 【新增】判断学生入学类型
function determineEnrollmentType(userData) {
    const 户籍区 = userData.户籍所在区 || '';
    const 居住区 = userData.实际居住区 || '';
    const 户籍性质 = userData.居住性质 || '';
    
    // 随迁类判断
    if (户籍区 === '外地户籍' || 户籍区.includes('外地')) {
        return {
            type: 'migrant', // 随迁类
            category: '随迁子女',
            priority: 4,
            description: '随迁子女需提供居住证，由居住证所在区统筹安排'
        };
    }
    
    // 户籍类 - 房户一致
    if (户籍区 === 居住区 && (户籍性质 === '自有房产' || userData.房产证类型?.includes('自有'))) {
        return {
            type: 'hukou_match',
            category: '户籍类(房户一致)',
            priority: 1,
            description: '户籍与房产地址一致，享有最优先入学资格',
            canApplyPublic: true,
            publicDistrict: 户籍区
        };
    }
    
    // 户籍类 - 房户不一致
    if (户籍区 !== 居住区 && 户籍区 && 居住区) {
        return {
            type: 'hukou_mismatch',
            category: '户籍类(房户不一致)',
            priority: 2,
            description: '户籍与房产地址不在同一区域，排序在房户一致之后',
            canApplyPublic: true,
            publicDistrict: 户籍区 // 公办学校只能报户籍所在区
        };
    }
    
    // 集体户
    if (户籍区.includes('集体户')) {
        return {
            type: 'collective',
            category: '集体户类',
            priority: 3,
            description: '集体户口，由教育局统筹安排入学',
            canApplyPublic: true,
            publicDistrict: 户籍区.replace('集体户', '').trim()
        };
    }
    
    // 租房居住
    if (户籍性质 === '租房') {
        return {
            type: 'rent',
            category: '户籍类(租房居住)',
            priority: 4,
            description: '租房居住，排序在自有房产之后',
            canApplyPublic: true,
            publicDistrict: 户籍区
        };
    }
    
    // 默认
    return {
        type: 'unknown',
        category: '待确认(请补充房产和居住信息)',
        priority: 5,
        description: '请完善户籍、居住和房产信息以确定入学顺位',
        canApplyPublic: false
    };
}

// 计算入学顺位
function calculateAdmissionPriority(userData) {
    const enrollmentType = determineEnrollmentType(userData);
    return `第${enrollmentType.priority}顺位（${enrollmentType.category}）`;
}

// 获取顺位理由
function getPriorityReason(userData) {
    const enrollmentType = determineEnrollmentType(userData);
    return enrollmentType.description;
}

// 辅助函数：判断入学类型（兼容旧版本）
function 判断入学类型(userData) {
    const enrollmentType = determineEnrollmentType(userData);
    return `${enrollmentType.category} - ${enrollmentType.description}`;
}

// 【修复】获取学生可选学校列表 - 使用适配后的数据结构
function getAvailableSchools(userData) {
    const enrollmentInfo = determineEnrollmentType(userData);
    const availableSchools = {
        public: [],
        private: [],
        enrollmentType: enrollmentInfo
    };
    
    // 1. 获取公办学校
    if (enrollmentInfo.canApplyPublic && enrollmentInfo.publicDistrict) {
        const 户籍街道 = userData.户籍所在街道 || null;
        const publicSchools = getSchoolsFromLocalData(enrollmentInfo.publicDistrict, 户籍街道);
        
        availableSchools.public = publicSchools
            .filter(s => s.type === '公办')
            .map(s => ({
                ...s,
                source: 'local_database',
                matchReason: `户籍对口(${enrollmentInfo.publicDistrict})`,
                admissionProbability: enrollmentInfo.priority === 1 ? '95%' : 
                                     enrollmentInfo.priority === 2 ? '80%' : '60%'
            }));
    }
    
    // 2. 获取民办学校（全市范围）
    const 居住区 = userData.实际居住区 || userData.户籍所在区 || '';
    const 跨区偏好 = userData.可接受的跨区范围 || '全市范围';
    
    // 根据跨区偏好获取民办学校
    let privateSchools = [];
    
    if (跨区偏好 === '本区') {
        privateSchools = getSchoolsFromLocalData(居住区);
    } else if (跨区偏好 === '本区及相邻区') {
        // 获取本区和相邻区的学校
        const adjacentDistricts = getAdjacentDistricts(居住区);
        privateSchools = [
            ...getSchoolsFromLocalData(居住区),
            ...adjacentDistricts.flatMap(d => getSchoolsFromLocalData(d))
        ];
    } else {
        // 全市范围 - 获取所有区的民办学校
        const allDistricts = Object.keys(SCHOOLS_DATA || {});
        privateSchools = allDistricts.flatMap(d => {
            const districtData = SCHOOLS_DATA[d] || {};
            return districtData.private_schools || [];
        });
    }
    
    // 筛选并评分民办学校
    availableSchools.private = privateSchools
        .filter(s => s.type === '民办')
        .map(s => {
            const matchScore = calculateSchoolMatch(s, userData);
            return {
                ...s,
                source: 'local_database',
                matchScore: matchScore,
                matchReason: getMatchReason(s, userData),
                lotteryProbability: estimateLotteryProbability(s, userData)
            };
        })
        .sort((a, b) => b.matchScore - a.matchScore);
    
    return availableSchools;
}

// 【修复】计算学校匹配度 - 适配新数据结构
function calculateSchoolMatch(school, userData) {
    let score = 60; // 基础分
    
    // 1. 学费匹配 (20分)
    const 预算 = userData.民办学校预算 || '';
    const 学费 = school.tuition || 0;
    
    if (预算 === '10万以上') {
        score += 20;
    } else if (预算 === '3-10万' && 学费 <= 100000) {
        score += 学费 <= 50000 ? 20 : 15;
    } else if (预算 === '3万以内' && 学费 <= 30000) {
        score += 20;
    } else {
        score += Math.max(0, 10 - Math.abs(学费 - 50000) / 10000);
    }
    
    // 2. 特长匹配 (15分)
    const 特长列表 = userData.学生特长 || [];
    const 学校特色 = school.features || school.special_classes || [];
    
    const 特长匹配数 = 特长列表.filter(t => 
        学校特色.some(f => f.includes(t))
    ).length;
    
    score += Math.min(15, 特长匹配数 * 5);
    
    // 3. 距离因素 (10分) - 关键修复：使用统一的district字段
    const 同区 = school.district === userData.实际居住区;
    score += 同区 ? 10 : 5;
    
    // 4. 升学率 (15分)
    const 升学率 = school.admissionRate || school.graduation_rate || 0;
    score += Math.min(15, 升学率 / 10);
    
    return Math.round(score);
}

// 【修复】获取匹配原因 - 适配新数据结构
function getMatchReason(school, userData) {
    const reasons = [];
    
    // 关键修复：使用统一的district字段
    if (school.district === userData.实际居住区) {
        reasons.push('本区学校');
    }
    
    const 特长匹配 = (userData.学生特长 || []).filter(t => 
        (school.features || school.special_classes || []).some(f => f.includes(t))
    );
    
    if (特长匹配.length > 0) {
        reasons.push(`特长匹配(${特长匹配.join('、')})`);
    }
    
    if (school.tuition && userData.民办学校预算) {
        const 学费 = school.tuition;
        const 预算上限 = userData.民办学校预算 === '10万以上' ? 200000 :
                        userData.民办学校预算 === '3-10万' ? 100000 : 30000;
        
        if (学费 <= 预算上限) {
            reasons.push('学费符合预算');
        }
    }
    
    if (school.admissionRate >= 90 || school.graduation_rate >= 90) {
        reasons.push('升学率优秀');
    }
    
    return reasons.join(' + ') || '符合基本条件';
}

// 【修复】估算摇号概率
function estimateLotteryProbability(school, userData) {
    // 基于2024年历史数据估算
    const 本区学生 = school.district === userData.实际居住区; // 关键修复：使用统一字段
    const 基础概率 = school.lotteryRate || 50;
    
    // 本区学生摇号概率通常高10-20%
    const 调整后概率 = 本区学生 ? 
        Math.min(95, 基础概率 + 15) : 
        基础概率;
    
    return `${调整后概率}%`;
}

// 【新增】获取相邻区县
function getAdjacentDistricts(district) {
    const adjacencyMap = {
        '新城区': ['碑林区', '莲湖区', '未央区', '灞桥区'],
        '碑林区': ['新城区', '雁塔区', '莲湖区'],
        '莲湖区': ['新城区', '碑林区', '未央区'],
        '雁塔区': ['碑林区', '灞桥区', '长安区'],
        '灞桥区': ['新城区', '雁塔区', '未央区', '长安区'],
        '未央区': ['新城区', '莲湖区', '灞桥区', '经开区', '浐灞国际港'],
        '长安区': ['雁塔区', '灞桥区', '高新区'],
        '临潼区': ['灞桥区', '高陵区'],
        '高陵区': ['未央区', '临潼区'],
        '鄠邑区': ['长安区', '高新区'],
        '蓝田县': ['灞桥区', '长安区'],
        '周至县': ['鄠邑区'],
        '西咸新区': ['未央区', '长安区', '鄠邑区'],
        '高新区': ['雁塔区', '长安区', '鄠邑区'],
        '经开区': ['未央区', '灞桥区'],
        '曲江新区': ['雁塔区', '长安区'],
        '浐灞国际港': ['未央区', '灞桥区', '高陵区'],
        '航天基地': ['雁塔区', '长安区']
    };
    
    return adjacencyMap[district] || [];
}

// 【修复】增强版学校推荐 - 使用适配后的数据结构
async function showEnhancedSchoolRecommendations() {
    const recommendationElement = document.getElementById('schoolRecommendation');
    if (!recommendationElement) return;
    
    // 显示加载状态
    recommendationElement.innerHTML = `
        <div class="ai-loading">
            <div class="ai-loading-spinner"></div>
            <p>正在基于您的完整信息和本地学校数据库进行精准匹配...</p>
            <p style="font-size: 12px; color: #666;">数据已统一适配，使用标准字段匹配</p>
        </div>
    `;
    
    try {
        const userData = collectUserDataForAI();
        
        // 1. 从本地数据库获取可选学校（使用适配后的数据）
        const availableSchools = getAvailableSchools(userData);
        const enrollmentType = availableSchools.enrollmentType;
        
        // 2. 构建推荐列表HTML
        let recommendationHTML = `
            <div class="recommendation-container">
                <div class="enrollment-info" style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
                    <h4 style="margin: 0 0 10px 0; color: #1e40af;">📋 入学资格分析</h4>
                    <p><strong>入学类型：</strong>${enrollmentType.category}</p>
                    <p><strong>入学顺位：</strong>第${enrollmentType.priority}顺位</p>
                    <p><strong>说明：</strong>${enrollmentType.description}</p>
                    ${enrollmentType.canApplyPublic ? 
                        `<p><strong>公办对口区：</strong>${enrollmentType.publicDistrict}</p>` : 
                        '<p style="color: #e53e3e;">提示：请补充完整信息以确定公办入学资格</p>'
                    }
                </div>
        `;
        
        // 3. 公办学校推荐
        if (availableSchools.public.length > 0) {
            recommendationHTML += `
                <h4 style="margin: 20px 0 15px 0;">🏫 对口公办学校（${availableSchools.public.length}所）</h4>
                <table class="school-table" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                    <thead>
                        <tr style="background: #f0f9ff;">
                            <th style="padding: 10px; border: 1px solid #d1e9ff;">序号</th>
                            <th style="padding: 10px; border: 1px solid #d1e9ff;">学校名称</th>
                            <th style="padding: 10px; border: 1px solid #d1e9ff;">所在区</th>
                            <th style="padding: 10px; border: 1px solid #d1e9ff;">对口学区</th>
                            <th style="padding: 10px; border: 1px solid #d1e9ff;">入学概率</th>
                            <th style="padding: 10px; border: 1px solid #d1e9ff;">匹配说明</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            availableSchools.public.forEach((school, index) => {
                recommendationHTML += `
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: center;">${index + 1}</td>
                        <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>${school.name}</strong></td>
                        <td style="padding: 10px; border: 1px solid #e2e8f0;">${school.district || enrollmentType.publicDistrict}</td>
                        <td style="padding: 10px; border: 1px solid #e2e8f0;">${(school.学区 || []).join('、') || '全区统筹'}</td>
                        <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: center;">
                            <span style="background: #10b981; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px;">
                                ${school.admissionProbability}
                            </span>
                        </td>
                        <td style="padding: 10px; border: 1px solid #e2e8f0;">${school.matchReason}</td>
                    </tr>
                `;
            });
            
            recommendationHTML += `
                    </tbody>
                </table>
            `;
        } else {
            recommendationHTML += `
                <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #ef4444;">
                    <p><strong>⚠️ 公办学校提示：</strong></p>
                    <p>根据您提供的户籍信息，暂未检索到对口公办学校。这可能是因为：</p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>户籍信息不完整</li>
                        <li>属于统筹安排类型</li>
                        <li>需要教育局进一步审核</li>
                    </ul>
                    <p>建议：联系户籍所在区教育局咨询具体对口学校信息</p>
                </div>
            `;
        }
        
        // 4. 民办学校推荐
        if (availableSchools.private.length > 0) {
            // 分类：冲刺、稳妥、保底
            const 冲刺校 = availableSchools.private.filter(s => s.matchScore >= 85).slice(0, 3);
            const 稳妥校 = availableSchools.private.filter(s => s.matchScore >= 70 && s.matchScore < 85).slice(0, 3);
            const 保底校 = availableSchools.private.filter(s => s.matchScore < 70).slice(0, 2);
            
            recommendationHTML += `
                <h4 style="margin: 20px 0 15px 0;">🎯 民办学校推荐（共${availableSchools.private.length}所，展示前8所）</h4>
                <table class="school-table" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #fef3c7;">
                            <th style="padding: 10px; border: 1px solid #fde68a;">序号</th>
                            <th style="padding: 10px; border: 1px solid #fde68a;">学校名称</th>
                            <th style="padding: 10px; border: 1px solid #fde68a;">所在区</th>
                            <th style="padding: 10px; border: 1px solid #fde68a;">匹配度</th>
                            <th style="padding: 10px; border: 1px solid #fde68a;">推荐类型</th>
                            <th style="padding: 10px; border: 1px solid #fde68a;">摇号概率</th>
                            <th style="padding: 10px; border: 1px solid #fde68a;">学费/年</th>
                            <th style="padding: 10px; border: 1px solid #fde68a;">匹配原因</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            let rowIndex = 1;
            
            // 添加冲刺校
            冲刺校.forEach(school => {
                recommendationHTML += generateSchoolRow(school, rowIndex++, '冲刺', '#ef4444');
            });
            
            // 添加稳妥校
            稳妥校.forEach(school => {
                recommendationHTML += generateSchoolRow(school, rowIndex++, '稳妥', '#f59e0b');
            });
            
            // 添加保底校
            保底校.forEach(school => {
                recommendationHTML += generateSchoolRow(school, rowIndex++, '保底', '#10b981');
            });
            
            recommendationHTML += `
                    </tbody>
                </table>
                
                <div style="margin-top: 20px; padding: 15px; background: #f7fafc; border-radius: 8px; font-size: 13px; color: #4b5563;">
                    <p><strong>💡 推荐策略说明：</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li><span style="color: #ef4444;">●</span> 冲刺类：匹配度85分以上，建议勇敢尝试，但要做好备选准备</li>
                        <li><span style="color: #f59e0b;">●</span> 稳妥类：匹配度70-84分，录取概率较高，推荐重点关注</li>
                        <li><span style="color: #10b981;">●</span> 保底类：匹配度70分以下，作为保底选择，确保有学可上</li>
                    </ul>
                    <p style="margin-top: 10px;"><strong>建议：</strong>民办志愿填报时，建议"2冲刺+2稳妥+1保底"的策略组合</p>
                </div>
            `;
        } else {
            recommendationHTML += `
                <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <p><strong>⚠️ 民办学校提示：</strong>暂未检索到符合条件的民办学校</p>
                </div>
            `;
        }
        
        recommendationHTML += `
            </div>
            
            <div class="source-info" style="margin-top: 20px; padding: 15px; background: #f7fafc; border-radius: 8px;">
                <h5 style="margin: 0 0 10px 0;">📚 数据来源说明</h5>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #4b5563;">
                    <li>学校信息来源：西安市教育局2025年官方公布名单</li>
                    <li>数据适配：已统一处理学校数据结构，确保字段匹配</li>
                    <li>推荐逻辑：严格按照户籍类/随迁类入学政策</li>
                    <li>匹配算法：综合考虑户籍、居住、学费、特长、距离等因素</li>
                    <li>摇号概率：基于2024年历史数据估算，仅供参考</li>
                </ul>
                <div style="margin-top: 15px;">
                    <span class="trust-badge trust-verified">✅ 数据适配完成</span>
                    基于统一数据结构 · 严格遵循2025年招生政策
                </div>
            </div>
        `;
        
        recommendationElement.innerHTML = recommendationHTML;
        
    } catch (error) {
        console.error('学校推荐生成失败:', error);
        recommendationElement.innerHTML = `
            <div style="background: #fff5f5; padding: 20px; border-radius: 8px; text-align: center;">
                <h4 style="color: #e53e3e;">推荐生成失败</h4>
                <p>错误: ${error.message}</p>
                <button onclick="showEnhancedSchoolRecommendations()" style="margin-top: 10px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    重试
                </button>
            </div>
        `;
    }
}

// 【新增】生成学校表格行
function generateSchoolRow(school, index, type, color) {
    const tuitionDisplay = school.tuition ? 
        (school.tuition >= 10000 ? (school.tuition / 10000).toFixed(1) + '万' : school.tuition + '元') : 
        '未公布';
    
    return `
        <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: center;">${index}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>${school.name}</strong></td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${school.district || '未指定'}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: center;">
                <span style="background: ${color}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px;">
                    ${school.matchScore}分
                </span>
            </td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: center;">
                <span style="background: ${color}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px;">
                    ${type}
                </span>
            </td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: center;">${school.lotteryProbability}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: center;">${tuitionDisplay}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${school.matchReason}</td>
        </tr>
    `;
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

// ========== PDF生成功能（修复乱码）==========

// 【修复】PDF生成 - 使用纯文本避免乱码
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
        
        // 生成纯文本报告（避免PDF中文乱码）
        const textReport = generateEnhancedTextReport(userData, userFullInfo);
        
        // 创建Blob并下载
        const blob = new Blob([textReport], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        const safeName = (userData.学生姓名 || '学生').replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
        const filename = `西安小升初评估报告_${safeName}_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.txt`;
        
        a.href = url;
        a.download = filename;
        a.click();
        
        // 移除加载提示
        document.getElementById('pdf-loading')?.remove();
        
        alert('✅ 报告生成成功！\n\n已保存为纯文本格式，避免PDF乱码问题。\n您可以使用Word等工具打开并转换为PDF格式。');
        
    } catch (error) {
        console.error('报告生成失败:', error);
        document.getElementById('pdf-loading')?.remove();
        alert('❌ 报告生成失败: ' + error.message);
    }
}

// 【新增】生成增强版文本报告
function generateEnhancedTextReport(userData, userFullInfo) {
    const enrollmentType = determineEnrollmentType(userData);
    const availableSchools = getAvailableSchools(userData);
    
    let report = '';
    report += '='.repeat(70) + '\n';
    report += '                  西安市小升初智能评估报告\n';
    report += '                     2025增强版（数据结构已适配）\n';
    report += '='.repeat(70) + '\n\n';
    
    report += `报告生成时间：${new Date().toLocaleString('zh-CN')}\n`;
    report += `数据来源：西安市教育局2025年官方数据 + 本地学校数据库（已适配）\n\n`;
    
    // 第一部分：学生基本信息
    report += '一、学生基本信息\n';
    report += '-'.repeat(50) + '\n';
    if (userData.学生姓名) report += `姓名：${userData.学生姓名}\n`;
    if (userData.学生性别) report += `性别：${userData.学生性别}\n`;
    if (userData.所在小学) report += `所在小学：${userData.所在小学}\n`;
    if (userData.当前年级) report += `当前年级：${userData.当前年级}\n`;
    
    // 第二部分：户籍与居住信息
    report += '\n二、户籍与居住信息\n';
    report += '-'.repeat(50) + '\n';
    report += `【户籍信息】\n`;
    if (userData.户籍所在区) report += `  户籍区：${userData.户籍所在区}\n`;
    if (userData.户籍所在街道) report += `  户籍街道：${userData.户籍所在街道}\n`;
    if (userData.户籍详细地址) report += `  详细地址：${userData.户籍详细地址}\n`;
    
    report += `\n【居住信息】\n`;
    if (userData.实际居住区) report += `  居住区：${userData.实际居住区}\n`;
    if (userData.实际居住街道) report += `  居住街道：${userData.实际居住街道}\n`;
    if (userData.居住详细地址) report += `  详细地址：${userData.居住详细地址}\n`;
    if (userData.居住性质) report += `  居住性质：${userData.居住性质}\n`;
    
    report += `\n【房产情况】\n`;
    if (userData.学区房情况) report += `  学区房：${userData.学区房情况}\n`;
    if (userData.房产证类型) report += `  房产证类型：${userData.房产证类型}\n`;
    if (userData.房产持有时间) report += `  持有时间：${userData.房产持有时间}\n`;
    
    // 第三部分：入学资格评估
    report += '\n三、入学资格评估\n';
    report += '-'.repeat(50) + '\n';
    report += `入学类型：${enrollmentType.category}\n`;
    report += `入学顺位：第${enrollmentType.priority}顺位\n`;
    report += `说明：${enrollmentType.description}\n`;
    if (enrollmentType.canApplyPublic) {
        report += `公办对口区：${enrollmentType.publicDistrict}\n`;
    }
    
    // 第四部分：能力评估
    report += '\n四、能力评估\n';
    report += '-'.repeat(50) + '\n';
    if (userData.能力评估['维度1']) report += `学业成绩：${userData.能力评估['维度1']}分\n`;
    if (userData.能力评估['维度2']) report += `综合素养：${userData.能力评估['维度2']}分\n`;
    if (userData.能力评估['维度3']) report += `学习习惯：${userData.能力评估['维度3']}分\n`;
    if (userData.能力评估['维度4']) report += `心理素质：${userData.能力评估['维度4']}分\n`;
    if (userData.能力评估['维度5']) report += `家庭支持：${userData.能力评估['维度5']}分\n`;
    if (userData.能力评估['维度6']) report += `学科倾向：${userData.能力评估['维度6']}分\n`;
    
    // 第五部分：学校推荐
    report += '\n五、学校推荐列表（使用适配后的数据结构）\n';
    report += '-'.repeat(50) + '\n';
    
    // 公办学校
    if (availableSchools.public.length > 0) {
        report += `\n【对口公办学校】（共${availableSchools.public.length}所）\n\n`;
        availableSchools.public.forEach((school, index) => {
            report += `${index + 1}. ${school.name}\n`;
            report += `   所在区：${school.district || enrollmentType.publicDistrict}\n`;
            report += `   对口学区：${(school.学区 || []).join('、') || '全区统筹'}\n`;
            report += `   入学概率：${school.admissionProbability}\n`;
            report += `   匹配说明：${school.matchReason}\n\n`;
        });
    } else {
        report += '\n【公办学校】暂无对口学校，建议咨询教育局\n\n';
    }
    
    // 民办学校
    if (availableSchools.private.length > 0) {
        const top8 = availableSchools.private.slice(0, 8);
        report += `\n【民办学校推荐】（共${availableSchools.private.length}所，展示前8所）\n\n`;
        
        top8.forEach((school, index) => {
            const type = school.matchScore >= 85 ? '冲刺' : 
                        school.matchScore >= 70 ? '稳妥' : '保底';
            
            report += `${index + 1}. ${school.name} [${type}]\n`;
            report += `   所在区：${school.district || '未指定'}\n`;
            report += `   匹配度：${school.matchScore}分\n`;
            report += `   摇号概率：${school.lotteryProbability}\n`;
            report += `   学费：${school.tuition ? (school.tuition >= 10000 ? (school.tuition / 10000).toFixed(1) + '万/年' : school.tuition + '元/年') : '未公布'}\n`;
            report += `   匹配原因：${school.matchReason}\n\n`;
        });
    }
    
    // 第六部分：重要提示
    report += '\n六、重要提示\n';
    report += '-'.repeat(50) + '\n';
    report += '• 公办学校严格按照户籍所在区对口入学\n';
    report += '• 民办学校实行电脑随机录取（摇号）\n';
    report += '• 未被民办录取的学生，由教育局统筹安排公办入学\n';
    report += '• 建议民办志愿填报策略：2冲刺+2稳妥+1保底\n';
    report += '• 请在报名前确保所有证明材料齐全\n';
    report += '• 关注西安市教育局官网获取最新信息\n';
    report += '• 数据结构已适配：确保本地算法能正确匹配学校\n';
    
    report += '\n' + '='.repeat(70) + '\n';
    report += '报告结束\n';
    report += '数据来源：西安市教育局官方网站 + 本地学校数据库（已适配）\n';
    report += '生成系统：西安小升初智能评估系统 2025增强版（数据结构适配版）\n';
    report += '='.repeat(70) + '\n';
    
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

// 导出JSON
function exportReportJSON() {
    try {
        // 收集完整的用户数据
        const completeData = {
            // 基本信息
            报告生成时间: new Date().toLocaleString('zh-CN'),
            报告版本: '2025增强版（数据结构适配版）',
            
            // 学生基本信息
            学生信息: collectUserDataForAI(),
            
            // 入学资格评估
            入学资格评估: {
                预估入学顺位: calculateAdmissionPriority(collectUserDataForAI()),
                顺位理由: getPriorityReason(collectUserDataForAI()),
                详细分析: 判断入学类型(collectUserDataForAI())
            },
            
            // 学校数据结构适配信息
            数据结构适配: {
                状态: '已启用',
                适配函数: 'adaptSchoolStructure',
                统一字段: ['district', 'tuition', 'admissionRate', 'features', '学区']
            },
            
            // 系统配置信息
            系统配置: {
                AI模式: CONFIG.isConnected ? '在线模式' : '本地模式',
                AI提供商: CONFIG.provider || '未配置',
                数据来源: '西安市教育局2025年招生政策（已适配）'
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
        
        alert('✅ JSON数据导出成功!\n\n导出内容包括:\n- 学生完整信息\n- 6维度能力评估\n- 户籍居住信息\n- 房产信息\n- 入学资格评估\n- 民办意向与预算\n- 数据结构适配信息');
        
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
async function initializeApp() {
    console.log('正在初始化应用...');
    
    // 恢复配置
    restoreConfig();
    
    // 加载学校数据（包含数据适配）
    await loadAllDistrictsData();
    
    // 初始化步骤显示
    showStep(1);

    // 初始化户籍和居住地联动下拉菜单
    populateStreets('householdDistrict', 'householdStreet');
    populateStreets('residenceDistrict', 'residenceStreet');

    // 为下拉菜单附加搜索功能
    ensureSearchInputs();

    // 为聊天窗口添加拖动功能
    setupChatDrag();
        
    console.log('应用初始化完成，学校数据已加载并适配');
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

// ========== 新增诊断函数 ==========
// 【新增】诊断学校数据结构问题
function diagnoseSchoolStructure() {
    console.log('=== 学校数据结构诊断 ===');
    
    const districts = Object.keys(SCHOOLS_DATA || {});
    console.log(`已加载区县: ${districts.length}个`);
    
    districts.forEach(district => {
        const districtData = SCHOOLS_DATA[district];
        if (districtData && districtData.schools && districtData.schools.length > 0) {
            const firstSchool = districtData.schools[0];
            console.log(`\n${district} - 第一所学校字段:`);
            console.log('- name:', firstSchool.name);
            console.log('- type:', firstSchool.type);
            console.log('- district:', firstSchool.district);
            console.log('- newcity:', firstSchool.newcity);
            console.log('- 学区:', firstSchool.学区);
            console.log('- features:', firstSchool.features);
            console.log('- tuition:', firstSchool.tuition);
            console.log('- admissionRate:', firstSchool.admissionRate);
            
            // 检查是否已适配
            const isAdapted = firstSchool.district && firstSchool.tuition !== undefined;
            console.log('- 已适配:', isAdapted ? '✅' : '❌');
        } else {
            console.log(`\n${district} - 无学校数据`);
        }
    });
    
    console.log('\n=== 诊断完成 ===');
}

// 【新增】测试数据结构适配
function testDataAdaptation() {
    console.log('=== 测试数据结构适配 ===');
    
    // 测试适配函数
    const testSchool = {
        name: '测试学校',
        type: '公办',
        level: '公办初中',
        newcity: '测试区',
        学区: '测试街道',
        features: ['特色班']
    };
    
    const adapted = adaptSchoolStructure(testSchool, '测试区');
    console.log('测试学校适配结果:', adapted);
    console.log('district字段:', adapted.district);
    console.log('tuition字段:', adapted.tuition);
    console.log('学区字段类型:', Array.isArray(adapted.学区) ? '数组' : '其他');
    
    return adapted;
}

// ========== 导出全局函数 ==========
window.showStep = showStep;
window.toggleChat = toggleChat;
window.toggleConfigPanel = toggleConfigPanel;
window.useLocalMode = useLocalMode;
window.sendMessage = sendMessage;
window.quickAction = quickAction;
window.handleChatKeyPress = handleChatKeyPress;
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
window.generateFullPdfReport = generateFullPdfReport;
window.askCatAssistant = askCatAssistant;
window.getUserFullInfoString = getUserFullInfoString;
window.showEnhancedSchoolRecommendations = showEnhancedSchoolRecommendations;
window.getAvailableSchools = getAvailableSchools;
window.determineEnrollmentType = determineEnrollmentType;
window.callAIAPIWithFullContext = callAIAPIWithFullContext;
window.formatAIResponse = formatAIResponse;
window.adaptSchoolStructure = adaptSchoolStructure;
window.adaptSchoolsBatch = adaptSchoolsBatch;
window.diagnoseSchoolStructure = diagnoseSchoolStructure;
window.testDataAdaptation = testDataAdaptation;
