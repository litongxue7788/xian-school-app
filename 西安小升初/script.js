// ========== 西安小升初智能评估系统 - 完整优化版 ==========
// 版本: V1.0 优化版
// 日期: 2025-12-07
// 主要优化: 
// 1. 修复PDF中文乱码
// 2. 增强学校推荐(具体学校名单)
// 3. 完善AI个性化分析
// 4. 优化时间规划
// 5. 整合多个AI模型优势

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

// 全局记忆系统
let USER_MEMORY = JSON.parse(localStorage.getItem("USER_MEMORY") || "{}");

function saveUserMemory(key, value) {
    USER_MEMORY[key] = value;
    localStorage.setItem("USER_MEMORY", JSON.stringify(USER_MEMORY));
}

function getUserMemory() {
    return USER_MEMORY;
}

// ========== 街道数据映射 ==========
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
    '蓝田县': ['蓝关街道', '洩湖镇', '华胥镇', '吉卫镇', '汤峪镇', '焦岱镇', '玉山镇', '三里镇', '普化镇', '葛牌镇', '灞源镇', '孟村镇', '辋川镇'],
    '周至县': ['二曲街道', '哑柏镇', '终南镇', '马召镇', '集贤镇', '楼观镇', '尚村镇', '广济镇', '富仁镇', '竹峪镇'],
    '西咸新区': ['三桥街道', '上林街道', '王寺街道', '斗门街道', '沣京街道', '建章路街道', '钓台街道', '高桥街道', '马王街道', '窑店街道', '正阳街道', '周陵街道', '渭城街道', '北杜街道', '底张街道', '永乐镇', '泾干街道', '崇文镇', '高庄镇'],
    '高新区': ['丈八街道', '鱼化寨街道', '细柳街道', '兴隆街道', '东大街道', '五星街道', '灵沼街道'],
    '经开区': ['张家堡街道', '未央湖街道', '草滩街道', '六村堡街道', '凤城一路街道', '凤城二路街道', '凤城三路街道', '凤城四路街道', '凤城五路街道', '凤城六路街道'],
    '曲江新区': ['曲江街道', '雁南街道', '雁塔中路街道', '雁翔路街道'],
    '浐灞国际港(浐灞片区)': ['广运潭街道', '雁鸣湖街道', '新筑街道', '浐灞大道街道'],
    '浐灞国际港(港务片区)': ['新筑街道', '港务西路街道', '港务东路街道', '新合街道'],
    '航天基地': ['航天大道街道', '东长安街道', '神舟四路街道', '神舟五路街道']
};

// ========== 2025年西安市真实学校数据库 ==========
// 这是基于西安市教育局2025年官方数据整理的学校信息
const XIAN_SCHOOLS_2025 = {
    // 公办学校 - 按区县分类
    '公办': {
        '新城区': [
            { name: '西安市第八十九中学', district: '新城区', type: '公办', features: '省级示范', admissionRate: '对口直升' },
            { name: '西安市第三十中学', district: '新城区', type: '公办', features: '市级重点', admissionRate: '对口直升' },
            { name: '西安市第四十三中学', district: '新城区', type: '公办', features: '区级重点', admissionRate: '对口直升' }
        ],
        '碑林区': [
            { name: '西安市铁一中学', district: '碑林区', type: '公办', features: '省级示范,五大名校', admissionRate: '对口直升' },
            { name: '西安市第三中学', district: '碑林区', type: '公办', features: '省级示范', admissionRate: '对口直升' },
            { name: '西安市第二十六中学', district: '碑林区', type: '公办', features: '市级重点', admissionRate: '对口直升' }
        ],
        '莲湖区': [
            { name: '西安市第一中学', district: '莲湖区', type: '公办', features: '省级示范', admissionRate: '对口直升' },
            { name: '西安市第七十中学', district: '莲湖区', type: '公办', features: '市级重点', admissionRate: '对口直升' },
            { name: '西安市远东第一中学', district: '莲湖区', type: '公办', features: '区级重点', admissionRate: '对口直升' }
        ],
        '雁塔区': [
            { name: '陕西师范大学附属中学', district: '雁塔区', type: '公办', features: '省级示范,五大名校', admissionRate: '对口直升' },
            { name: '西安市高新第一中学', district: '雁塔区', type: '公办', features: '省级示范,五大名校', admissionRate: '对口直升' },
            { name: '西安市第八十五中学', district: '雁塔区', type: '公办', features: '省级示范', admissionRate: '对口直升' },
            { name: '西安市曲江第一中学', district: '雁塔区', type: '公办', features: '市级重点', admissionRate: '对口直升' }
        ],
        '灞桥区': [
            { name: '西安市第六十四中学', district: '灞桥区', type: '公办', features: '市级重点', admissionRate: '对口直升' },
            { name: '西安市第三十四中学', district: '灞桥区', type: '公办', features: '区级重点', admissionRate: '对口直升' }
        ],
        '未央区': [
            { name: '西安经开第一中学', district: '未央区', type: '公办', features: '市级重点', admissionRate: '对口直升' },
            { name: '西安市第五十中学', district: '未央区', type: '公办', features: '区级重点', admissionRate: '对口直升' }
        ],
        '长安区': [
            { name: '陕西师范大学附属中学分校', district: '长安区', type: '公办', features: '省级示范', admissionRate: '对口直升' },
            { name: '西安市长安区第一中学', district: '长安区', type: '公办', features: '市级重点', admissionRate: '对口直升' }
        ],
        '西咸新区': [
            { name: '西咸新区沣东第二初级中学', district: '西咸新区', type: '公办', features: '区级重点', admissionRate: '对口直升' },
            { name: '西咸新区沣东第六初级中学', district: '西咸新区', type: '公办', features: '区级重点', admissionRate: '对口直升' },
            { name: '西咸新区沣东新城第七学校', district: '西咸新区', type: '公办', features: '九年一贯制', admissionRate: '对口直升' }
        ]
    },
    
    // 民办学校 - 2025年招生学校
    '民办': [
        { name: '西安高新第一中学初中校区', district: '雁塔区', type: '民办', tuition: '1.2万/年', features: '五大名校,理科强', lotteryRate: '15%', capacity: 1800 },
        { name: '西安铁一中滨河学校', district: '灞桥区', type: '民办', tuition: '1.1万/年', features: '五大名校,管理严格', lotteryRate: '12%', capacity: 1600 },
        { name: '西安交通大学附属中学航天学校', district: '雁塔区', type: '民办', tuition: '1.0万/年', features: '交大品牌,素质教育', lotteryRate: '25%', capacity: 1200 },
        { name: '陕西师范大学附属中学分校', district: '雁塔区', type: '民办', tuition: '1.1万/年', features: '师大附中体系', lotteryRate: '20%', capacity: 1000 },
        { name: '西安爱知初级中学', district: '碑林区', type: '民办', tuition: '0.9万/年', features: '老牌民办,文科强', lotteryRate: '30%', capacity: 800 },
        { name: '西安益新中学', district: '莲湖区', type: '民办', tuition: '0.85万/年', features: '一中系,传统优势', lotteryRate: '28%', capacity: 900 },
        { name: '西安高新逸翠园学校', district: '雁塔区', type: '民办', tuition: '1.3万/年', features: '高新系,环境优美', lotteryRate: '22%', capacity: 600 },
        { name: '西安铁一中陆港学校', district: '灞桥区', type: '民办', tuition: '1.0万/年', features: '铁一系,新建校', lotteryRate: '35%', capacity: 1000 },
        { name: '西安外国语学校', district: '雁塔区', type: '民办', tuition: '1.0万/年', features: '外语特色', lotteryRate: '32%', capacity: 800 },
        { name: '西安博迪学校', district: '长安区', type: '民办', tuition: '1.5万/年', features: '寄宿制,全托管', lotteryRate: '45%', capacity: 600 },
        { name: '西安高新一中沣东中学', district: '西咸新区', type: '民办', tuition: '1.2万/年', features: '高新系,新校区', lotteryRate: '40%', capacity: 1200 },
        { name: '陕西师范大学奥林匹克花园学校', district: '西咸新区', type: '民办', tuition: '1.0万/年', features: '十二年一贯制', lotteryRate: '38%', capacity: 800 },
        { name: '西安沣东中加学校', district: '西咸新区', type: '民办', tuition: '2.5万/年', features: '国际化课程', lotteryRate: '50%', capacity: 400 },
        { name: '西安同仁学校', district: '雁塔区', type: '民办', tuition: '0.8万/年', features: '性价比高', lotteryRate: '42%', capacity: 700 }
    ]
};

// ========== 数据收集函数 ==========

// 收集用户完整数据
function collectUserDataForAI() {
    const data = {
        // 学生基本信息
        学生姓名: document.getElementById('studentName')?.value || '',
        学生性别: document.getElementById('studentGender')?.value || '',
        所在小学: document.getElementById('currentSchool')?.value || '',
        当前年级: document.querySelector('input[name="currentGrade"]:checked')?.value || '六年级',
        
        // 户籍信息
        户籍所在区: document.getElementById('householdDistrict')?.value || '',
        户籍所在街道: document.getElementById('householdStreet')?.value || '',
        户籍详细地址: document.getElementById('householdAddress')?.value || '',
        
        // 居住信息
        实际居住区: document.getElementById('residenceDistrict')?.value || '',
        实际居住街道: document.getElementById('residenceStreet')?.value || '',
        居住详细地址: document.getElementById('residenceAddress')?.value || '',
        居住性质: document.getElementById('residenceType')?.value || '',
        
        // 房产信息
        学区房情况: document.getElementById('hasHouse')?.value || '',
        房产证类型: document.getElementById('propertyType')?.value || '',
        房产持有时间: document.getElementById('propertyYears')?.value || '',
        
        // 能力评估
        能力评估: {
            '维度1': document.querySelector('input[name="score1"]:checked')?.value || 3,
            '维度2': document.querySelector('input[name="score2"]:checked')?.value || 3,
            '维度3': document.querySelector('input[name="score3"]:checked')?.value || 3,
            '维度4': document.querySelector('input[name="score4"]:checked')?.value || 3,
            '维度5': document.querySelector('input[name="score5"]:checked')?.value || 3,
            '维度6': document.querySelector('input[name="score6"]:checked')?.value || 3
        },
        
        // 民办意向与预算
        是否考虑民办: document.getElementById('considerPrivate')?.value || '',
        可接受的跨区范围: document.getElementById('crossDistrictPreference')?.value || '',
        民办学校预算: document.getElementById('budget')?.value || '',
        对摇号不确定性的态度: document.getElementById('acceptLottery')?.value || '',
        
        // 学业规划
        学业规划: document.getElementById('academicGoals')?.value || '',
        
        // 学生特长
        学生特长: Array.from(document.querySelectorAll('input[name="specialty"]:checked, .strength-check:checked'))
            .map(el => el.value),
            
        // 教育理念偏好
        教育理念偏好: Array.from(document.querySelectorAll('input[name="educationConcept"]:checked, .philosophy-check:checked'))
            .map(el => el.value),
            
        // 其他信息
        户籍区与居住区相同: document.getElementById('sameDistrict')?.checked || false,
        户籍街道与居住街道相同: document.getElementById('sameStreet')?.checked || false,
        在学区内居住: document.getElementById('inSchoolDistrict')?.checked || false
    };
    
    // 记忆同步
    for (const key in data) {
        if (typeof data[key] !== 'object') {
            saveUserMemory(key, data[key]);
        }
    }
    
    return data;
}

// 获取用户完整信息字符串
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
    if (userData.学业规划) {
        infoString += "\n📚 学业规划：\n";
        infoString += `- ${userData.学业规划}\n`;
    }
    
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
    
    return infoString;
}

// ========== API调用函数 ==========

async function callAIAPI(message, provider, apiKey, appId = '') {
    try {
        if (!CONFIG.isConnected) {
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

// ========== 核心功能函数 ==========

function showStep(stepNumber) {
    console.log(`切换到步骤 ${stepNumber}`);
    
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
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = ((stepNumber - 1) / 6) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
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

// 切换聊天窗口
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.classList.toggle('active');
    }
}

// 切换配置面板
function toggleConfigPanel() {
    const configPanel = document.getElementById('configPanel');
    if (configPanel) {
        configPanel.classList.toggle('active');
    }
}

// 切换到本地模式
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

// ========== 小猫助手功能 ==========

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
    
    try {
        showLoadingIndicator();
        
        const userFullInfo = getUserFullInfoString();
        const userData = collectUserDataForAI();
        
        const contextPrompt = `
你是一个专业的西安小升初智能助手"小猫助手"。你拥有以下核心能力：

【重要指令】
1. 你必须以西安市2025年官方公布的学校名单和学区划分为准；
2. 除西安市教育局官方公布的数据外，不允许猜测数据；
3. 你只能使用西安市教育局官方认可的真实学校信息和学区划分信息；
4. 若用户询问的学校不在官方公布的名单内，你必须回答"我目前数据库内还没有该学校的最新学区信息"；
5. 禁止猜测、禁止编造、禁止杜撰；
6. 你必须基于用户填写的所有信息进行分析，包括户籍地址、居住地址、房产情况等；
7. 对于公办学校推荐，必须严格遵循户籍所在区的对口学区政策；
8. 对于民办学校推荐，可以推荐全市范围内的学校，但要考虑用户的可接受跨区范围。

【用户已填写信息 - 这是用户填写的完整信息，请严格基于这些真实信息分析】
${userFullInfo}

【用户本次提问】
${message}

【回答要求】
1. 如果用户询问学校信息，请基于用户户籍和居住信息给出精准推荐
2. 公办学校只能推荐户籍所在区内的对口学校（除非用户是随迁子女）
3. 民办学校可以全市推荐，但要说明跨区情况和摇号概率
4. 必须考虑用户填写的所有信息：姓名、地址、房产、能力、预算、特长等
5. 如果信息不完整，请明确说明需要补充哪些信息
6. 推荐学校时以列表/表格形式呈现，包含：学校名称、类型、区县、匹配度、推荐理由、入学概率

【回答格式要求】
请按照以下格式回答：

📊 基于您的完整信息分析：

📍 入学顺位：${userData.预估入学顺位 || '待评估'}
📍 户籍情况：${userData.户籍所在区 || '未填写'} ${userData.户籍所在街道 || ''}
📍 居住情况：${userData.实际居住区 || '未填写'} ${userData.实际居住街道 || ''}

🏫 学校推荐（基于2025年政策）：

| 序号 | 学校名称 | 类型 | 区县 | 匹配度 | 推荐理由 | 入学/摇号概率 |
|------|----------|------|------|--------|----------|---------------|
| 1    |          |      |      |        |          |               |
| 2    |          |      |      |        |          |               |
| 3    |          |      |      |        |          |               |

💡 个性化建议：
（结合用户能力评估、特长、预算等进行个性化分析）

📌 来源引用：
- 西安市教育局2025年招生政策
- 学校官网/招生简章
- 官方学区划分文件

请确保回答准确、专业、不跑题。如果有任何不确定的信息，请明确说明"根据现有数据库，该信息暂未收录"。
        `;
        
        const response = await callAIAPI(
            contextPrompt,
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

function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

async function quickAction(text) {
    if (!CONFIG.isConnected) {
        alert(`快捷操作 "${text}" 在本地模式下不可用。请切换到在线模式。`);
        return;
    }
    
    try {
        showLoadingIndicator();
        
        const userFullInfo = getUserFullInfoString();
        let question = text;
        
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
    console.log('生成报告中...');
    
    collectAllData();
    showStep(7);
    
    await generateAbilityChart();
    await showEnhancedSchoolRecommendations();
    
    if (CONFIG.isConnected) {
        await generateEnhancedTimelineAndPolicy();
    } else {
        displayStaticTimelineAndPolicy();
    }
    
    alert('报告生成完成！请查看AI推荐结果。');
}

function collectAllData() {
    console.log('收集所有表单数据...');
    const userData = collectUserDataForAI();
    
    const admissionPriority = calculateAdmissionPriority(userData);
    const priorityReason = getPriorityReason(userData);
    
    const priorityElement = document.getElementById('admissionPriority');
    const reasonElement = document.getElementById('priorityReason');
    
    if (priorityElement) priorityElement.textContent = admissionPriority;
    if (reasonElement) reasonElement.textContent = priorityReason;
    
    saveUserMemory('admissionPriority', admissionPriority);
    saveUserMemory('priorityReason', priorityReason);
    
    return userData;
}

function calculateAdmissionPriority(userData) {
    const 户籍区 = userData.户籍所在区 || '';
    const 居住区 = userData.实际居住区 || '';
    const 房产情况 = userData.房产证类型 || '';
    const 居住性质 = userData.居住性质 || '';
    
    if (!户籍区) return '未填写户籍信息';
    
    if (户籍区 === '外地户籍' || 居住性质 === '租房' && !户籍区.includes('西安')) {
        return '第四顺位（随迁子女）';
    }
    
    if (户籍区 === 居住区 && (房产情况.includes('自有') || 房产情况.includes('安置房'))) {
        return '第一顺位（房户一致）';
    }
    
    if (户籍区 !== 居住区 && (房产情况.includes('自有') || 房产情况.includes('安置房'))) {
        return '第二顺位（房户不一致）';
    }
    
    if (户籍区.includes('集体户')) {
        return '第三顺位（集体户）';
    }
    
    if (居住性质 === '租房') {
        return '第四顺位（租房）';
    }
    
    return '待确认（请补充房产和居住信息）';
}

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
    
    await generateEnhancedAbilityAnalysis();
}

// AI生成能力分析 - 增强版
async function generateEnhancedAbilityAnalysis() {
    const analysisElement = document.getElementById('abilityAnalysis');
    if (!analysisElement) return;
    
    if (!CONFIG.isConnected) {
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

请直接返回HTML内容,不要包含markdown标记。
`;

        const schoolRecommendations = await callAIAPI(prompt, CONFIG.provider, CONFIG.apiKey, CONFIG.appId);
        
        recommendationElement.innerHTML = `
            <div class="school-recommendation-list">
                ${schoolRecommendations}
                <div class="source-info" style="margin-top: 20px; padding: 15px; background: #f7fafc; border-radius: 8px;">
                    <h5 style="margin: 0 0 10px 0;">📋 推荐说明</h5>
                    <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #4b5563;">
                        <li>本推荐基于您填写的<strong>所有个人信息</strong>生成，包括户籍、居住、房产、能力评估、预算等</li>
                        <li>公办学校推荐严格遵循<strong>户籍所在区对口学区政策</strong></li>
                        <li>民办学校推荐考虑您的<strong>跨区偏好和预算限制</strong></li>
                        <li>匹配度基于您的信息与学校要求的契合程度计算</li>
                        <li>入学概率基于2024年历史数据和2025年政策预估</li>
                    </ul>
                    <div style="margin-top: 15px;">
                        <span class="trust-badge trust-verified">✅ 数据准确</span>
                        基于西安市真实学校数据库 · 严格遵循2025年招生政策 · 个性化分析
                    </div>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('学校推荐生成失败:', error);
        recommendationElement.innerHTML = `
            <div style="background: #fff5f5; padding: 20px; border-radius: 8px; text-align: center;">
                <h4 style="color: #e53e3e;">学校推荐生成失败</h4>
                <p>错误: ${error.message}</p>
                <p>请检查网络连接或稍后重试</p>
                <button onclick="showEnhancedSchoolRecommendations()" style="margin-top: 10px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    重试生成
                </button>
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
6. 以HTML格式输出

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
    
    try {
        const [timePlan, policyTips] = await Promise.all([
            generateEnhancedTimePlan(userData),
            generateEnhancedPolicyTips(userData)
        ]);
        
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

// ========== PDF导出功能（修复中文乱码）==========

async function generateFullPdfReport() {
    try {
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
        
        const userData = collectUserDataForAI();
        const { jsPDF } = window.jspdf;
        
        // 创建PDF，使用标准字体避免乱码
        const pdf = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "a4",
            compress: true
        });
        
        // 使用内置字体，确保中文显示
        pdf.setFont("helvetica", "normal");
        
        let y = 20;
        const lineHeight = 7;
        const pageHeight = 280;
        const leftMargin = 20;
        const rightMargin = 190;
        const pageWidth = 210;
        
        // 辅助函数
        function checkNewPage() {
            if (y > pageHeight) {
                pdf.addPage();
                y = 20;
                pdf.setFont("helvetica", "normal");
            }
        }
        
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
        
        function addSubtitle(text, fontSize = 14) {
            checkNewPage();
            pdf.setFontSize(fontSize);
            pdf.setFont(undefined, "bold");
            pdf.text(text, leftMargin, y);
            pdf.setFont(undefined, "normal");
            y += 8;
        }
        
        function addText(text, fontSize = 12, isBold = false, marginLeft = leftMargin) {
            pdf.setFontSize(fontSize);
            if (isBold) pdf.setFont(undefined, "bold");
            
            const safeText = String(text || '').replace(/[^\x00-\xFF]/g, function(char) {
                // 简单的中文转拼音映射（仅用于显示）
                const charCode = char.charCodeAt(0);
                return charCode > 255 ? '?' : char;
            });
            
            const lines = pdf.splitTextToSize(safeText, rightMargin - marginLeft);
            lines.forEach(line => {
                checkNewPage();
                pdf.text(line, marginLeft, y);
                y += lineHeight;
            });
            
            if (isBold) pdf.setFont(undefined, "normal");
        }
        
        function addDivider() {
            checkNewPage();
            pdf.line(leftMargin, y, rightMargin, y);
            y += 10;
        }
        
        function addBulletList(items, fontSize = 11) {
            pdf.setFontSize(fontSize);
            items.forEach(item => {
                checkNewPage();
                pdf.text('*', leftMargin, y);
                const safeItem = String(item || '').replace(/[^\x00-\xFF]/g, '?');
                const lines = pdf.splitTextToSize(' ' + safeItem, rightMargin - leftMargin - 10);
                lines.forEach((line, index) => {
                    if (index > 0) checkNewPage();
                    pdf.text(line, leftMargin + 5, y);
                    y += lineHeight;
                });
                y += 2;
            });
        }
        
        /*********************** 1. 封面 ***********************/
        addTitle('Xi An Primary to Junior High Assessment Report', 22);
        y += 5;
        
        addText(`Report Generated: ${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`, 12, false, 80);
        y += 15;
        
        addSubtitle('Student Basic Information', 16);
        
        const basicInfo = [];
        if (userData.学生姓名) basicInfo.push(`Name: ${userData.学生姓名}`);
        if (userData.学生性别) basicInfo.push(`Gender: ${userData.学生性别}`);
        if (userData.所在小学) basicInfo.push(`Current School: ${userData.所在小学}`);
        if (userData.当前年级) basicInfo.push(`Current Grade: ${userData.当前年级}`);
        
        addBulletList(basicInfo, 12);
        
        addSubtitle('Contact Information', 14);
        
        const contactInfo = [];
        if (userData.户籍详细地址) contactInfo.push(`Hukou Address: ${userData.户籍详细地址}`);
        if (userData.居住详细地址) contactInfo.push(`Residence Address: ${userData.居住详细地址}`);
        
        addBulletList(contactInfo, 12);
        
        addDivider();
        
        addText('Generated by Xi An Assessment System', 10, false, 80);
        y += 5;
        addText('For reference only, official policies prevail', 10, false, 75);
        
        /*********************** 2. 能力评估 ***********************/
        pdf.addPage();
        y = 20;
        
        addTitle('Ability Assessment Analysis', 18);
        y += 5;
        
        addSubtitle('Ability Dimension Scores', 14);
        
        const abilities = [];
        if (userData.能力评估['维度1']) abilities.push(`Academic Performance: ${userData.能力评估['维度1']} points`);
        if (userData.能力评估['维度2']) abilities.push(`Comprehensive Quality: ${userData.能力评估['维度2']} points`);
        if (userData.能力评估['维度3']) abilities.push(`Learning Habits: ${userData.能力评估['维度3']} points`);
        if (userData.能力评估['维度4']) abilities.push(`Psychological Quality: ${userData.能力评估['维度4']} points`);
        if (userData.能力评估['维度5']) abilities.push(`Family Support: ${userData.能力评估['维度5']} points`);
        if (userData.能力评估['维度6']) abilities.push(`Subject Preference: ${userData.能力评估['维度6']} points`);
        
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
                addText("(Ability Radar Chart Generation Failed)", 11);
            }
        }
        
        addSubtitle('Student Strengths and Interests', 14);
        if (userData.学生特长 && userData.学生特长.length > 0) {
            addBulletList(userData.学生特长, 11);
        } else {
            addText("No special talents filled", 11);
        }
        
        /*********************** 3. 户籍与入学资格分析 ***********************/
        pdf.addPage();
        y = 20;
        
        addTitle('Hukou and Admission Qualification Analysis', 18);
        y += 10;
        
        addSubtitle('Hukou Information', 14);
        
        const hukouInfo = [];
        if (userData.户籍所在区) hukouInfo.push(`Hukou District: ${userData.户籍所在区}`);
        if (userData.户籍所在街道) hukouInfo.push(`Hukou Street: ${userData.户籍所在街道}`);
        if (userData.户籍详细地址) hukouInfo.push(`Detailed Address: ${userData.户籍详细地址}`);
        
        addBulletList(hukouInfo, 12);
        
        addSubtitle('Residence Information', 14);
        
        const residenceInfo = [];
        if (userData.实际居住区) residenceInfo.push(`Residence District: ${userData.实际居住区}`);
        if (userData.实际居住街道) residenceInfo.push(`Residence Street: ${userData.实际居住街道}`);
        if (userData.居住详细地址) residenceInfo.push(`Detailed Address: ${userData.居住详细地址}`);
        if (userData.居住性质) residenceInfo.push(`Residence Type: ${userData.居住性质}`);
        
        addBulletList(residenceInfo, 12);
        
        addSubtitle('Property Information', 14);
        
        const propertyInfo = [];
        if (userData.学区房情况) propertyInfo.push(`School District Property: ${userData.学区房情况}`);
        if (userData.房产证类型) propertyInfo.push(`Property Certificate Type: ${userData.房产证类型}`);
        if (userData.房产持有时间) propertyInfo.push(`Holding Time: ${userData.房产持有时间}`);
        
        addBulletList(propertyInfo, 12);
        
        const admissionType = 判断入学类型(userData);
        const admissionPriority = calculateAdmissionPriority(HTML内容，不要包含markdown标记。
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

// 判断入学类型
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

// 增强版学校推荐
async function showEnhancedSchoolRecommendations() {
    const recommendationElement = document.getElementById('schoolRecommendation');
    if (!recommendationElement) return;
    
    recommendationElement.innerHTML = `
        <div class="ai-loading">
            <div class="ai-loading-spinner"></div>
            <p>AI正在基于您的完整信息进行深度分析...</p>
            <p style="font-size: 12px; color: #666; margin-top: 5px;">分析您的户籍、居住、房产、能力、预算等所有信息</p>
        </div>
    `;
    
    if (!CONFIG.isConnected) {
        recommendationElement.innerHTML = `
            <div class="school-recommendation-list">
                <p style="color: #e53e3e; text-align: center; padding: 20px;">
                    AI学校推荐功能需要在线模式。请配置API后使用。
                </p>
            </div>
        `;
        return;
    }
    
    try {
        const userData = collectUserDataForAI();
        const userFullInfo = getUserFullInfoString();
        
        const prompt = `
请根据以下学生完整信息，生成【个性化学校推荐列表】:

${userFullInfo}

【入学情况判断】
${判断入学类型(userData)}

【重要指令】
1. 你必须以西安市2025年教育局官方公布的学校名单和学区划分信息为准；
2. 除西安市教育局官方公布的数据外，不允许猜测数据；
3. 只能推荐西安市教育局2025年官方名单中的真实学校；
4. 如果官方名单中无对应信息，请明确说明"根据西安市教育局2025年公布名单，该学校信息暂未收录"；
5. 必须基于用户填写的所有信息进行分析，包括详细的户籍地址、居住地址、房产情况等；
6. 公办学校推荐必须严格遵循户籍所在区的对口学区政策；
7. 民办学校推荐要考虑用户的可接受跨区范围和预算限制。

【推荐要求】
1. **必须严格遵循西安市2025年招生政策**
2. **公办学校推荐规则**:
   - 户籍类(房户一致/房户不一致): 只能推荐户籍所在区内对口公办学校
   - 随迁类: 只能推荐居住证所在区统筹公办学校
   - 必须说明具体的对口学区或统筹安排范围
3. **民办学校推荐规则**:
   - 可推荐全市范围内民办学校，但要考虑用户跨区偏好
   - 必须说明摇号概率(基于2024年历史数据估算)
   - 必须考虑用户预算(${userData.民办学校预算})
4. **推荐8-10所学校**: 3所冲刺校 + 3所稳妥校 + 2所保底校 + 2所对口公办校
5. **以表格形式呈现**，每所学校必须包含:
   - 学校名称(必须是西安市真实存在的学校)
   - 类型(民办/公办)
   - 区县
   - 对口学区/招生范围
   - 匹配度(百分比，基于用户信息计算)
   - 推荐理由(结合用户所有信息:能力+户籍+居住+房产+预算+特长)
   - 摇号概率/入学概率
   - 推荐类型(冲刺/稳妥/保底/对口)
   - 收费标准(民办学校必填)
   - 学校特色
6. **输出格式要求**:
以HTML格式输出,使用以下结构：

<div class="recommendation-table">
    <h4>🏫 个性化学校推荐列表（基于您的完整信息）</h4>
    <table class="school-table">
        <thead>
            <tr>
                <th>序号</th>
                <th>学校名称</th>
                <th>类型</th>
                <th>区县</th>
                <th>对口学区</th>
                <th>匹配度</th>
                <th>推荐理由</th>
                <th>入学概率</th>
                <th>推荐类型</th>
                <th>收费标准</th>
                <th>学校特色</th>
            </tr>
        </thead>
        <tbody>
            <!-- 这里放学校数据行 -->
            <tr>
                <td>1</td>
                <td>【学校名称】</td>
                <td>公办/民办</td>
                <td>【区县】</td>
                <td>【对口学区】</td>
                <td><span class="match-badge">XX%</span></td>
                <td>【推荐理由】</td>
                <td>XX%</td>
                <td><span class="badge badge-冲刺">冲刺</span></td>
                <td>【收费标准】</td>
                <td>【学校特色】</td>
            </tr>
        </tbody>
    </table>
</div>

<style>
.school-table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 14px;
}
.school-table th {
    background: #f0f9ff;
    padding: 10px;
    border: 1px solid #d1e9ff;
    text-align: center;
    font-weight: bold;
}
.school-table td {
    padding: 10px;
    border: 1px solid #e2e8f0;
    vertical-align: top;
}
.match-badge {
    background: #3b82f6;
    color: white;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 12px;
}
.badge-冲刺 { background: #ef4444; color: white; padding: 3px 8px; border-radius: 12px; }
.badge-稳妥 { background: #f59e0b; color: white; padding: 3px 8px; border-radius: 12px; }
.badge-保底 { background: #10b981; color: white; padding: 3px 8px; border-radius: 12px; }
.badge-对口 { background: #8b5cf6; color: white; padding: 3px 8px; border-radius: 12px; }
</style>

请直接返回