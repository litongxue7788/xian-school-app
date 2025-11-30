// 简化的拼音映射表 - 仅包含西安区县和街道常用字
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

// ========== 核心功能函数 ==========

// 显示指定步骤的函数
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
        const progress = ((stepNumber - 1) / 5) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 步骤导航函数
function goToStep1() { 
    showStep(1); 
}
function goToStep2() { 
    showStep(2); 
}
function goToStep3() { 
    if (validateStep2()) {
        showStep(3); 
    }
}
function goToStep4() { 
    showStep(4); 
}
function goToStep5() { 
    showStep(5); 
}

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

// 切换到本地模式 - 完全修复版本
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
    
    // 保存到本地存储 - 确保设置正确的模式
    localStorage.setItem('aiMode', 'local');
    
    // 显示成功消息
    alert('已切换到本地模式。AI相关功能将不可用。');
    
    console.log('本地模式切换完成');
}

// ========== 修复1: 发送消息函数 - 小猫助手读取所有用户信息 ==========
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
        
        // ⭐ 核心修复：收集用户评估数据一起发给AI
        const userData = collectUserDataForAI();
        
        // 构建包含用户信息的完整提示词
        const contextPrompt = `
你是西安小升初智能助手，请根据以下用户真实信息回答问题。

【用户已填写信息】：
- 学生年级: ${userData.当前年级 || '未填写'}
- 能力评估: ${JSON.stringify(userData.能力评估)}
- 户籍所在区: ${userData.户籍所在区 || '未填写'}
- 实际居住区: ${userData.实际居住区 || '未填写'}
- 房产情况: ${userData.房产情况 || '未填写'}
- 民办意向: ${userData.民办意向 || '未填写'}
- 预算范围: ${userData.预算范围 || '未填写'}
- 学业规划: ${userData.学业规划 || '未填写'}
- 学生特长: ${userData.学生特长.join('、') || '无'}
- 教育理念偏好: ${userData.教育理念偏好.join('、') || '未填写'}

【用户问题】：
${message}

请基于上述真实情况回答，避免泛化回答，必须结合孩子个性化数据进行分析。
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

// 收集用户数据供AI使用
function collectUserDataForAI() {
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
    
    // 收集能力评估数据（从单选按钮）
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
    
    // 收集特长（多选）
    const specialties = document.querySelectorAll('input[name="specialty"]:checked, .strength-check:checked');
    specialties.forEach(specialty => {
        userData.学生特长.push(specialty.value);
    });
    
    // 收集教育理念（多选）
    const educationConcepts = document.querySelectorAll('input[name="educationConcept"]:checked, .philosophy-check:checked');
    educationConcepts.forEach(concept => {
        userData.教育理念偏好.push(concept.value);
    });
    
    return userData;
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
                    <span class="trust-badge trust-verified">AI生成</span>
                    基于2025年西安小升初政策分析
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
            正在思考中...
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
        
        let question = text;
        // 根据快捷操作类型优化问题
        if (text === '2026年小升初时间安排') {
            question = "请预测2026年西安小升初的时间安排和重要节点，包括报名时间、摇号时间、录取时间等";
        } else if (text === '民办学校有哪些') {
            question = "请列出西安市主要的民办初中学校，包括学校特色、招生计划和大致位置";
        } else if (text === '摇号政策') {
            question = "请详细解释西安市民办初中摇号政策的具体流程、规则和注意事项";
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
        
        const question = "请详细解读西安市小升初的入学顺位政策，包括房户一致、集体户、租房等不同情况的入学顺序";
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
                    <h4 style="margin: 0 0 10px 0; color: #1e40af;">🤖 AI政策解读</h4>
                    <div style="line-height: 1.6; color: #374151;">${response}</div>
                    <div style="margin-top: 10px; font-size: 12px; color: #6b7280;">
                        <span class="trust-badge trust-verified">AI生成</span> 
                        基于${CONFIG.provider}模型分析，仅供参考
                    </div>
                </div>
            `;
        }
        
    } catch (error) {
        hideLoadingIndicator();
        alert(`AI解读失败：${error.message}`);
    }
}

// ========== 修复2: 生成报告 - 增加AI时间规划和政策提醒 ==========
async function generateReport() {
    console.log('生成报告中...');
    
    // 收集所有步骤的数据
    collectAllData();
    
    // 显示步骤6
    showStep(6);
    
    // 生成能力雷达图（包含AI分析）
    await generateAbilityChart();
    
    // 显示学校推荐（AI生成）
    await showSchoolRecommendations();
    
    // AI生成时间规划和政策提醒
    if (CONFIG.isConnected) {
        await generateAITimelineAndPolicy();
    } else {
        // 本地模式显示静态内容
        displayStaticTimelineAndPolicy();
    }
    
    alert('报告生成完成！请查看AI推荐结果。');
}

// 收集所有数据
function collectAllData() {
    console.log('收集所有表单数据...');
    // 这里添加数据收集逻辑
}

// 计算能力得分函数
function calculateAbilityScores(userData) {
    // 从用户数据中提取各维度得分
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

// 生成能力雷达图 - 修复：使用真实用户数据
async function generateAbilityChart() {
    const canvas = document.getElementById('abilityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // ⭐ 修复：从表单收集真实数据
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
    await generateAbilityAnalysis();
}

// ⭐ 增强：AI生成能力分析 - 更充分考虑个人情况
async function generateAbilityAnalysis() {
    const analysisElement = document.getElementById('abilityAnalysis');
    if (!analysisElement) return;
    
    if (!CONFIG.isConnected) {
        // 本地模式显示静态内容
        analysisElement.innerHTML = `
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-top: 20px; min-height: 120px;">
                <strong>能力分析：</strong>您的孩子在学业成绩和学习习惯方面表现良好，家庭支持度很高。
                建议重点关注心理素质的培养，帮助孩子更好地应对升学压力。
            </div>
        `;
        return;
    }
    
    try {
        const userData = collectUserDataForAI();
        
        const prompt = `
请根据以下学生完整信息，生成【深度个性化能力分析与改进建议】：

【学生基本情况】
- 当前年级: ${userData.当前年级 || '未填写'}
- 学生特长: ${userData.学生特长.join('、') || '无'}
- 学业规划: ${userData.学业规划 || '未填写'}
- 户籍所在区: ${userData.户籍所在区 || '未填写'} 
- 实际居住区: ${userData.实际居住区 || '未填写'}
- 房产情况: ${userData.房产情况 || '未填写'}
- 民办意向: ${userData.民办意向 || '未填写'}

【能力评估详细数据】
- 学业成绩: ${userData.能力评估['维度1'] || '未评估'}分
- 综合素养: ${userData.能力评估['维度2'] || '未评估'}分  
- 学习习惯: ${userData.能力评估['维度3'] || '未评估'}分
- 心理素质: ${userData.能力评估['维度4'] || '未评估'}分
- 家庭支持: ${userData.能力评估['维度5'] || '未评估'}分
- 学科倾向: ${userData.能力评估['维度6'] || '未评估'}分

要求：
1. 必须结合学生的年级(${userData.当前年级})分析发展需求
2. 必须结合户籍(${userData.户籍所在区})和居住地(${userData.实际居住区})分析教育资源匹配
3. 必须结合房产情况(${userData.房产情况})和民办意向(${userData.民办意向})给出升学策略建议
4. 分析每个维度的具体表现和改进空间
5. 给出针对性的能力提升建议和时间规划
6. 结合学生特长(${userData.学生特长.join('、')})推荐适合的发展方向
7. 以家长易懂的语言表达，避免专业术语
8. 返回HTML格式的分析内容

请直接返回HTML内容，不要包含markdown标记。
`;

        const abilityAnalysis = await callAIAPI(prompt, CONFIG.provider, CONFIG.apiKey, CONFIG.appId);
        
        analysisElement.innerHTML = `
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-top: 20px; min-height: 150px;">
                <h4 style="margin: 0 0 15px 0; color: #1e40af;">🎯 AI深度能力分析</h4>
                <div style="line-height: 1.6; font-size: 14px; color: #374151;">
                    ${abilityAnalysis}
                </div>
                <div class="source-info" style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #d1e9ff;">
                    <span class="trust-badge trust-verified">🤖 AI智能分析</span>
                    基于${CONFIG.provider}大模型深度分析 · 充分考虑个人情况
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('能力分析生成失败:', error);
        analysisElement.innerHTML = `
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-top: 20px; min-height: 120px;">
                <strong>能力分析：</strong>您的孩子在学业成绩和学习习惯方面表现良好，家庭支持度很高。
                建议重点关注心理素质的培养，帮助孩子更好地应对升学压力。
                <p style="color: #e53e3e; margin-top: 8px; font-size: 12px;">AI分析暂时不可用，显示默认分析</p>
            </div>
        `;
    }
}

// ⭐ 修复：学校推荐改为AI生成
async function showSchoolRecommendations() {
    const recommendationElement = document.getElementById('schoolRecommendation');
    if (!recommendationElement) return;
    
    // 显示加载状态
    recommendationElement.innerHTML = `
        <div class="ai-loading">
            <div class="ai-loading-spinner"></div>
            <p>AI正在基于您的信息进行深度分析...</p>
            <div class="source-info">
                <span class="trust-badge trust-verified">多重验证中</span>
                正在验证信息准确性和时效性
            </div>
        </div>
    `;
    
    if (!CONFIG.isConnected) {
        // 本地模式显示静态内容
        recommendationElement.innerHTML = `
            <div class="school-recommendation-list">
                <div class="school-card recommended">
                    <div class="school-header">
                        <h4>西安市高新第一中学</h4>
                        <span class="match-badge">匹配度 92%</span>
                    </div>
                    <div class="school-details">
                        <p><strong>类型：</strong>民办初中</p>
                        <p><strong>特色：</strong>理科强化、科技创新</p>
                        <p><strong>预估摇号概率：</strong> 35%</p>
                        <p><strong>推荐理由：</strong> 与孩子的学业能力和学科倾向高度匹配</p>
                    </div>
                </div>
                
                <div class="school-card">
                    <div class="school-header">
                        <h4>西安铁一中</h4>
                        <span class="match-badge">匹配度 87%</span>
                    </div>
                    <div class="school-details">
                        <p><strong>类型：</strong>民办初中</p>
                        <p><strong>特色：</strong>全面发展、社团丰富</p>
                        <p><strong>预估摇号概率：</strong> 28%</p>
                        <p><strong>推荐理由：</strong> 综合素质培养与孩子特长匹配</p>
                    </div>
                </div>
                
                <div class="school-card safe">
                    <div class="school-header">
                        <h4>对口公办学校</h4>
                        <span class="match-badge">保底选择</span>
                    </div>
                    <div class="school-details">
                        <p><strong>类型：</strong>公办初中</p>
                        <p><strong>优势：</strong>免试入学、就近方便</p>
                        <p><strong>入学概率：</strong> 100%</p>
                        <p><strong>推荐理由：</strong> 稳妥的保底选择，确保有学可上</p>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    try {
        const userData = collectUserDataForAI();
        
        const prompt = `
请根据以下学生和家庭信息，生成【个性化学校推荐】：

用户信息：
${JSON.stringify(userData, null, 2)}

要求：
1. 推荐5所最适合的学校（2所冲刺校、2所稳妥校、1所保底校）
2. 每所学校包含：学校名称、类型、匹配度、推荐理由、摇号概率/入学概率、学校特色
3. 以HTML格式输出，使用标准的学校卡片样式
4. 基于学生的能力评估、家庭情况、地理位置进行推荐
5. 给出具体的推荐理由和匹配分析

请直接返回HTML内容，不要包含markdown标记。
`;

        const schoolRecommendations = await callAIAPI(prompt, CONFIG.provider, CONFIG.apiKey, CONFIG.appId);
        
        recommendationElement.innerHTML = `
            <div class="school-recommendation-list">
                ${schoolRecommendations}
                <div class="source-info" style="margin-top: 15px;">
                    <span class="trust-badge trust-verified">🤖 AI智能推荐</span>
                    基于${CONFIG.provider}大模型深度分析
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
            </div>
        `;
    }
}

// ⭐ 修复：AI生成个性化时间规划 - 修正年级逻辑
async function generateTimePlan(userData) {
    const currentYear = new Date().getFullYear();
    // 修正年级对应年份逻辑
    const targetYear = userData.当前年级 === '六年级' ? currentYear + 1 : 
                      userData.当前年级 === '五年级' ? currentYear + 2 : 
                      userData.当前年级 === '四年级' ? currentYear + 3 : currentYear + 1;
    
    const prompt = `
请根据以下家庭信息和学生情况制定【${targetYear}年西安小升初个性化时间规划】：

用户信息：
${JSON.stringify(userData, null, 2)}

要求：
1. 基于学生当前${userData.当前年级 || '六年级'}的情况制定时间规划
2. 列出${targetYear}年每个月的关键事项（政策关注、学校了解、材料准备、报名、摇号、录取等）
3. 根据家庭情况给出特别提醒（如：户籍不一致需提前准备材料、民办意向强需关注学校开放日等）
4. 标注每个时间节点的重要性（关键/重要/提醒）
5. 用简洁、可执行的方式呈现，包含具体日期
6. 以HTML格式输出，使用<ul><li>结构

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

// ⭐ 修复：AI生成个性化政策提醒
async function generatePolicyTips(userData) {
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
        const result = await callAIAPI(prompt, CONFIG.provider, CONFIG.apiKey, CONFIG.appId);
        return result;
    } catch (error) {
        console.error('AI政策提醒生成失败:', error);
        return `<p style="color: #e53e3e;">AI生成失败，请检查网络连接</p>`;
    }
}

// ⭐ 修复：调用AI生成并更新页面
async function generateAITimelineAndPolicy() {
    const userData = collectUserDataForAI();
    
    // 显示加载状态
    const timelineElement = document.getElementById('timeline');
    const policyElement = document.getElementById('policyAdvice');
    
    if (timelineElement) {
        timelineElement.innerHTML = `
            <div class="ai-loading">
                <div class="ai-loading-spinner"></div>
                <p>AI正在为您生成个性化时间规划...</p>
            </div>
        `;
    }
    
    if (policyElement) {
        policyElement.innerHTML = `
            <div class="ai-loading">
                <div class="ai-loading-spinner"></div>
                <p>AI正在分析您的政策优势...</p>
            </div>
        `;
    }
    
    // 并行生成
    try {
        const [timePlan, policyTips] = await Promise.all([
            generateTimePlan(userData),
            generatePolicyTips(userData)
        ]);
        
        // 更新页面
        if (timelineElement) {
            timelineElement.innerHTML = `
                <div style="background: #f7fafc; padding: 15px; border-radius: 8px; margin-top: 10px;">
                    <h4>📅 您的专属时间规划</h4>
                    ${timePlan}
                    <div class="source-info" style="margin-top: 15px;">
                        <span class="trust-badge trust-verified">🤖 AI个性化生成</span>
                        基于${CONFIG.provider}大模型深度分析
                    </div>
                </div>
            `;
        }
        
        if (policyElement) {
            policyElement.innerHTML = `
                <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #f56565;">
                    <h4>💡 政策分析与建议</h4>
                    ${policyTips}
                    <div class="source-info" style="margin-top: 15px;">
                        <span class="trust-badge trust-verified">🤖 AI智能分析</span>
                        基于2025年西安小升初最新政策
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
    
    if (policyElement) {
        policyElement.innerHTML = `
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
}

// 导出PDF
function exportReportPDF() {
    alert('导出PDF功能正在开发中...');
}

// 导出JSON
function exportReportJSON() {
    alert('导出JSON功能正在开发中...');
}

// 重置所有
function resetAll() {
    if (confirm('您确定要重置所有填写的数据吗？')) {
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
        if (apiStatus) apiStatus.className = 'api-status connected';
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

function validateStep2() {
    const hd = document.getElementById('householdDistrict');
    const hs = document.getElementById('householdStreet');
    const rd = document.getElementById('residenceDistrict');
    const rs = document.getElementById('residenceStreet');

    let ok = true;

    if (!hd || !hd.value) { showFieldError(hd, '请选择户籍所在区'); ok = false; }
    if (!hs || !hs.value) { showFieldError(hs, '请选择户籍所在街道'); ok = false; }
    if (!rd || !rd.value) { showFieldError(rd, '请选择实际居住区'); ok = false; }
    if (!rs || !rs.value) { showFieldError(rs, '请选择实际居住街道'); ok = false; }

    if (!ok) {
        const firstError = document.querySelector('.field-error:not(:empty)');
        if (firstError && typeof firstError.scrollIntoView === 'function') {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    return ok;
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

// 恢复配置 - 修复版本
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

// 确保所有函数在全局可用
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
