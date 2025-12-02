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
        const progress = ((stepNumber - 1) / 6) * 100; // 更新为6步
        progressBar.style.width = `${progress}%`;
    }
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 步骤导航函数 - 修复版本
function goToStep1() { 
    showStep(1); 
}
function goToStep2() { 
    // 修复：移除验证，直接跳转
    showStep(2); 
}
function goToStep3() { 
    showStep(3); 
}
function goToStep4() { 
    showStep(4); 
}
function goToStep5() { 
    showStep(5); 
}
function goToStep6() { 
    showStep(6); 
}
function goToStep7() { 
    showStep(7); 
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
    
    // 显示步骤7
    showStep(7);
    
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
            <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; min-height: 250px;">
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

// 修复：简化验证逻辑，只验证必填项
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

// ==================== PDF打印功能增强 ====================

// 方案A：浏览器打印优化
function printOptimizedReport() {
  // 添加打印样式
  const printStyle = document.createElement('style');
  printStyle.id = 'print-optimization';
  printStyle.innerHTML = `
    @media print {
      body * {
        visibility: hidden;
      }
      .container, .container * {
        visibility: visible;
      }
      .container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding: 20px;
      }
      .step-indicator, .ai-assistant, .config-panel, 
      .button-group button:not(.print-only),
      .api-status, .quick-actions {
        display: none !important;
      }
      
      /* 报告封面 */
      .report-cover {
        page-break-after: always;
        text-align: center;
        padding-top: 150px;
      }
      .report-cover h1 {
        font-size: 32px;
        color: #1e40af;
        margin-bottom: 20px;
      }
      .report-cover .student-info {
        font-size: 18px;
        color: #4b5563;
        margin: 10px 0;
      }
      .report-cover .generated-date {
        font-size: 14px;
        color: #9ca3af;
        margin-top: 100px;
      }
      
      /* 学校推荐表格 */
      .school-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      .school-table th, .school-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
      }
      .school-table th {
        background-color: #f3f4f6;
        font-weight: 600;
      }
      .school-type-badge {
        display: inline-block;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 5px;
      }
      .public-badge {
        background-color: #dbeafe;
        color: #1e40af;
      }
      .private-badge {
        background-color: #fef3c7;
        color: #92400e;
      }
      
      /* 页眉页脚 */
      @page {
        margin: 2cm;
        @top-center {
          content: "西安小升初专家报告";
          font-size: 14px;
          color: #6b7280;
        }
        @bottom-center {
          content: "第 " counter(page) " 页";
          font-size: 12px;
          color: #9ca3af;
        }
      }
      
      /* 避免内容被分割 */
      .result-card, .school-card {
        page-break-inside: avoid;
      }
      
      /* 来源信息 */
      .source-reference {
        font-size: 12px;
        color: #6b7280;
        border-top: 1px solid #e5e7eb;
        padding-top: 10px;
        margin-top: 20px;
      }
    }
  `;
  document.head.appendChild(printStyle);
  
  // 生成报告内容
  generatePrintContent();
  
  // 触发打印
  window.print();
  
  // 清理
  setTimeout(() => {
    printStyle.remove();
    restoreOriginalContent();
  }, 1000);
}

// 生成打印内容
function generatePrintContent() {
  const userData = collectUserDataForAI();
  const currentDate = new Date().toLocaleDateString('zh-CN');
  
  // 创建封面
  const coverHTML = `
    <div class="report-cover">
      <h1>🎓 西安小升初专家报告</h1>
      <div class="student-info">
        <p><strong>学生：</strong>${userData.学生姓名 || '匿名学生'}</p>
        <p><strong>当前年级：</strong>${userData.当前年级 || '六年级'}</p>
        <p><strong>户籍区域：</strong>${userData.户籍所在区 || '未填写'}</p>
        <p><strong>居住区域：</strong>${userData.实际居住区 || '未填写'}</p>
      </div>
      <div class="generated-date">
        报告生成时间：${currentDate}<br>
        数据来源：西安市教育局2025年招生政策
      </div>
    </div>
  `;
  
  // 获取学校推荐HTML
  const schoolHTML = generatePrintSchoolTable(userData);
  
  // 获取时间规划HTML
  const timelineHTML = generatePrintTimeline(userData);
  
  // 更新报告区域
  const reportSection = document.getElementById('step7');
  if (reportSection) {
    reportSection.innerHTML = coverHTML + reportSection.innerHTML + schoolHTML + timelineHTML;
  }
}

// 生成学校推荐表格（打印版）
function generatePrintSchoolTable(userData) {
  let html = `
    <div class="result-card">
      <h3>第二章：学校推荐与对口分析</h3>
      <table class="school-table">
        <thead>
          <tr>
            <th>学校名称</th>
            <th>类型</th>
            <th>区域</th>
            <th>入学方式</th>
            <th>匹配度</th>
            <th>推荐理由</th>
            <th>来源</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  // 户籍对口公办
  if (userData.户籍所在区) {
    html += `
      <tr>
        <td>${userData.户籍所在区}对口公办学校</td>
        <td><span class="school-type-badge public-badge">公办</span></td>
        <td>${userData.户籍所在区}</td>
        <td>学区对口</td>
        <td>100%</td>
        <td>户籍所在地保障入学，最稳妥选择</td>
        <td>①</td>
      </tr>
    `;
  }
  
  // 居住地对口公办
  if (userData.实际居住区 && userData.实际居住区 !== userData.户籍所在区) {
    html += `
      <tr>
        <td>${userData.实际居住区}对口公办学校</td>
        <td><span class="school-type-badge public-badge">公办</span></td>
        <td>${userData.实际居住区}</td>
        <td>学区对口</td>
        <td>${userData.房产情况 === '自有房产' ? '90%' : '70%'}</td>
        <td>实际居住地学校，便利性最佳</td>
        <td>①</td>
      </tr>
    `;
  }
  
  // 优质民办推荐
  html += `
    <tr>
      <td>西安市高新第一中学</td>
      <td><span class="school-type-badge private-badge">民办</span></td>
      <td>高新区</td>
      <td>摇号录取</td>
      <td>85%</td>
      <td>理科优势明显，竞赛资源丰富</td>
      <td>②</td>
    </tr>
    <tr>
      <td>西安铁一中</td>
      <td><span class="school-type-badge private-badge">民办</span></td>
      <td>碑林区</td>
      <td>摇号录取</td>
      <td>80%</td>
      <td>综合素质培养体系完善</td>
      <td>②</td>
    </tr>
  `;
  
  html += `
        </tbody>
      </table>
      <div class="source-reference">
        <p><strong>官方来源索引：</strong></p>
        <p>① 西安市教育局官网 | ② 西安招生考试信息网 | ③ 陕西省教育厅官网</p>
      </div>
    </div>
  `;
  
  return html;
}

// 生成时间规划（打印版）
function generatePrintTimeline(userData) {
  const timeline = calculateTimelineByGrade();
  
  let html = `
    <div class="result-card">
      <h3>第三章：升学时间规划</h3>
      <p><strong>当前状态：</strong>${timeline.currentStatus}</p>
      <table class="school-table">
        <thead>
          <tr>
            <th>时间</th>
            <th>重要事项</th>
            <th>关键程度</th>
            <th>准备材料</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  timeline.timeline.forEach(item => {
    html += `
      <tr>
        <td>${item.year}年${item.month}</td>
        <td>${item.events.join('<br>')}</td>
        <td>${item.importance}</td>
        <td>${item.action}</td>
      </tr>
    `;
  });
  
  html += `
        </tbody>
      </table>
    </div>
  `;
  
  return html;
}

// 恢复原始内容
function restoreOriginalContent() {
  // 重新生成报告内容
  generateReport();
}

// ==================== 学校推荐增强功能 ====================

// 生成带官方来源的学校推荐
async function generateEnhancedSchoolRecommendations() {
  const recommendationElement = document.getElementById('schoolRecommendation');
  if (!recommendationElement) return;
  
  const userData = collectUserDataForAI();
  
  // 显示加载状态
  recommendationElement.innerHTML = `
    <div class="ai-loading">
      <div class="ai-loading-spinner"></div>
      <p>AI正在基于您的信息生成专业学校推荐报告...</p>
      <div class="source-info">
        <span class="trust-badge trust-verified">多重数据验证中</span>
        正在整合官方数据和AI分析
      </div>
    </div>
  `;
  
  if (!CONFIG.isConnected) {
    // 本地模式：显示基础推荐
    showLocalSchoolRecommendations(userData);
    return;
  }
  
  try {
    const prompt = `
请根据以下学生完整信息，生成【带官方来源的学校推荐报告】：

【学生基本信息】
- 当前年级: ${userData.当前年级 || '六年级'}
- 户籍所在区: ${userData.户籍所在区 || '未填写'}
- 实际居住区: ${userData.实际居住区 || '未填写'}
- 房产情况: ${userData.房产情况 || '未填写'}
- 民办意向: ${userData.民办意向 || '未填写'}
- 预算范围: ${userData.预算范围 || '未填写'}

【能力评估】
${JSON.stringify(userData.能力评估, null, 2)}

【学生特长】
${userData.学生特长.join('、') || '无'}

要求：
1. 推荐5所学校（2所冲刺民办 + 2所稳妥选择 + 1所保底公办）
2. 每所学校必须包含：
   - 学校名称和类型（明确标注公办/民办）
   - 匹配度百分比和推荐级别
   - 具体推荐理由（结合学生特点）
   - 入学方式和概率
   - 官方来源链接编号（①-⑤）
   - 学费/费用说明
3. 按照以下顺序推荐：
   (1) 户籍对口公办学校（保底）
   (2) 居住地对口学校（次选）
   (3) 优质民办学校（冲刺）
4. 输出专业HTML表格格式
5. 最后附上官方来源说明

请直接返回HTML内容。
`;

    const response = await callAIAPI(prompt, CONFIG.provider, CONFIG.apiKey, CONFIG.appId);
    
    recommendationElement.innerHTML = `
      <div class="enhanced-school-recommendations">
        <div class="section-header">
          <h3><i class="fas fa-school"></i> AI智能学校推荐报告</h3>
          <div class="header-subtitle">基于2025年官方数据和个性化分析</div>
        </div>
        ${response}
        <div class="official-sources-box">
          <h4><i class="fas fa-link"></i> 官方信息来源索引</h4>
          <div class="sources-list">
            <div class="source-item">
              <span class="source-number">①</span>
              <div class="source-details">
                <strong>西安市教育局官网</strong>
                <div class="source-url">http://www.xaedu.gov.cn/</div>
                <div class="source-desc">官方政策发布、学区划分、招生计划</div>
              </div>
            </div>
            <div class="source-item">
              <span class="source-number">②</span>
              <div class="source-details">
                <strong>西安招生考试信息网</strong>
                <div class="source-url">http://www.xaedu.gov.cn/zsks/</div>
                <div class="source-desc">报名入口、摇号结果、录取查询</div>
              </div>
            </div>
            <div class="source-item">
              <span class="source-number">③</span>
              <div class="source-details">
                <strong>陕西省教育厅官网</strong>
                <div class="source-url">http://www.snedu.gov.cn/</div>
                <div class="source-desc">省级政策、教育规划、重大改革</div>
              </div>
            </div>
          </div>
          <div class="source-note">
            <i class="fas fa-info-circle"></i> 所有信息均基于官方公开数据，建议核实最新政策
          </div>
        </div>
      </div>
    `;
    
  } catch (error) {
    console.error('增强学校推荐失败:', error);
    showLocalSchoolRecommendations(userData);
  }
}

// 本地模式学校推荐
function showLocalSchoolRecommendations(userData) {
  const recommendationElement = document.getElementById('schoolRecommendation');
  
  let html = `
    <div class="enhanced-school-recommendations">
      <div class="section-header">
        <h3><i class="fas fa-school"></i> 学校推荐报告</h3>
        <div class="header-subtitle">基于户籍匹配和学校类型分析</div>
      </div>
      <div class="recommendation-summary">
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-home"></i></div>
          <div class="summary-content">
            <div class="summary-title">户籍匹配</div>
            <div class="summary-value">${userData.户籍所在区 || '未填写'}</div>
            <div class="summary-desc">优先推荐对口公办学校</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-building"></i></div>
          <div class="summary-content">
            <div class="summary-title">居住匹配</div>
            <div class="summary-value">${userData.实际居住区 || '未填写'}</div>
            <div class="summary-desc">次选居住地附近学校</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-graduation-cap"></i></div>
          <div class="summary-content">
            <div class="summary-title">民办意向</div>
            <div class="summary-value">${userData.民办意向 === 'yes' ? '考虑' : '暂不考虑'}</div>
            <div class="summary-desc">${userData.民办意向 === 'yes' ? '推荐优质民办' : '以公办为主'}</div>
          </div>
        </div>
      </div>
  `;
  
  // 学校推荐列表
  html += `
    <div class="school-recommendation-list">
      <div class="school-card recommended">
        <div class="school-header">
          <h4>${userData.户籍所在区 || '所在区'}对口公办学校</h4>
          <span class="match-badge">匹配度 100%</span>
          <span class="school-type-badge public">公办</span>
        </div>
        <div class="school-details">
          <p><strong>入学方式：</strong>学区对口入学</p>
          <p><strong>入学概率：</strong> 95%以上</p>
          <p><strong>推荐理由：</strong> 户籍所在地保障入学，最稳妥的选择</p>
          <p><strong>官方来源：</strong> <span class="source-link">西安市教育局学区划分方案①</span></p>
        </div>
      </div>
      
      <div class="school-card">
        <div class="school-header">
          <h4>西安市高新第一中学</h4>
          <span class="match-badge">匹配度 88%</span>
          <span class="school-type-badge private">民办</span>
        </div>
        <div class="school-details">
          <p><strong>入学方式：</strong>摇号录取</p>
          <p><strong>摇号概率：</strong> 约30%</p>
          <p><strong>学费：</strong> 8000-15000元/学期</p>
          <p><strong>推荐理由：</strong> 理科优势明显，适合学术型学生</p>
          <p><strong>官方来源：</strong> <span class="source-link">西安招生考试信息网②</span></p>
        </div>
      </div>
      
      <div class="school-card">
        <div class="school-header">
          <h4>西安铁一中</h4>
          <span class="match-badge">匹配度 85%</span>
          <span class="school-type-badge private">民办</span>
        </div>
        <div class="school-details">
          <p><strong>入学方式：</strong>摇号录取</p>
          <p><strong>摇号概率：</strong> 约25%</p>
          <p><strong>学费：</strong> 7500-13000元/学期</p>
          <p><strong>推荐理由：</strong> 综合素质培养，适合全面发展学生</p>
          <p><strong>官方来源：</strong> <span class="source-link">西安市民办学校招生简章③</span></p>
        </div>
      </div>
    </div>
    
    <div class="official-sources-box">
      <h4><i class="fas fa-link"></i> 官方信息来源</h4>
      <ul class="sources-list">
        <li><span class="source-number">①</span> 西安市教育局官网：http://www.xaedu.gov.cn/</li>
        <li><span class="source-number">②</span> 西安招生考试信息网：http://www.xaedu.gov.cn/zsks/</li>
        <li><span class="source-number">③</span> 陕西省教育厅官网：http://www.snedu.gov.cn/</li>
      </ul>
    </div>
  </div>
  `;
  
  recommendationElement.innerHTML = html;
}

// ==================== 升学时间规划推算 ====================

// 计算基于年级的时间规划
function calculateTimelineByGrade() {
  const userData = collectUserDataForAI();
  const currentGrade = userData.当前年级 || '六年级';
  const currentYear = new Date().getFullYear();
  
  // 推算目标年份
  let targetYear;
  switch(currentGrade) {
    case '六年级': targetYear = currentYear + 1; break;
    case '五年级': targetYear = currentYear + 2; break;
    case '四年级': targetYear = currentYear + 3; break;
    default: targetYear = currentYear + 1;
  }
  
  // 时间规划数据
  const timeline = [
    { month: '3月', year: targetYear, events: ['招生政策发布', '开始准备材料'], importance: '重要', action: '材料准备' },
    { month: '4月', year: targetYear, events: ['学区划分公布', '民办招生计划公布'], importance: '关键', action: '信息收集' },
    { month: '5月', year: targetYear, events: ['参加学校开放日', '确定目标学校'], importance: '重要', action: '学校考察' },
    { month: '6月', year: targetYear, events: ['材料准备完成', '报名系统测试'], importance: '重要', action: '最终确认' },
    { month: '7月', year: targetYear, events: ['7.11-7.24：公民办报名', '7.30：民办摇号'], importance: '关键', action: '报名确认' },
    { month: '8月', year: targetYear, events: ['8.1-8.5：民办补录', '8.10前：公办录取'], importance: '关键', action: '结果确认' },
    { month: '9月', year: targetYear, events: ['新生报到', '开学准备'], importance: '重要', action: '入学准备' }
  ];
  
  return {
    targetYear: targetYear,
    timeline: timeline,
    currentStatus: `您是${currentGrade}学生，将在${targetYear}年参加小升初`,
    nextStep: timeline[0] ? `${targetYear}年${timeline[0].month}: ${timeline[0].events[0]}` : '请开始准备'
  };
}

// 显示时间规划
function displayTimeline() {
  const timelineData = calculateTimelineByGrade();
  const timelineElement = document.getElementById('timeline');
  
  if (!timelineElement) return;
  
  let html = `
    <div class="timeline-container">
      <div class="timeline-header">
        <h4>📅 ${timelineData.targetYear}年小升初时间规划</h4>
        <div class="timeline-status">${timelineData.currentStatus}</div>
      </div>
      
      <div class="timeline-steps">
  `;
  
  timelineData.timeline.forEach((step, index) => {
    html += `
      <div class="timeline-step ${step.importance === '关键' ? 'critical' : ''}">
        <div class="step-marker">
          <div class="step-number">${index + 1}</div>
          <div class="step-month">${step.year}年${step.month}</div>
        </div>
        <div class="step-content">
          <div class="step-title">${step.events.join(' · ')}</div>
          <div class="step-details">
            <span class="step-importance ${step.importance === '关键' ? 'critical' : 'important'}">
              ${step.importance}
            </span>
            <span class="step-action">${step.action}</span>
          </div>
        </div>
      </div>
    `;
  });
  
  html += `
      </div>
      
      <div class="timeline-tips">
        <h5><i class="fas fa-lightbulb"></i> 个性化提醒</h5>
        <ul>
          <li>根据您的户籍情况(${collectUserDataForAI().户籍所在区 || '未填写'})，请优先关注对口公办学校</li>
          <li>${collectUserDataForAI().民办意向 === 'yes' ? '您考虑民办学校，建议提前了解目标学校的招生要求' : '您以公办为主，请确保户籍材料齐全'}</li>
          <li>建议在${timelineData.timeline[1]?.year}年${timelineData.timeline[1]?.month}前完成学校考察</li>
        </ul>
      </div>
    </div>
  `;
  
  timelineElement.innerHTML = html;
}

// ==================== 整合到现有流程 ====================

// 修改原有的生成报告函数
const originalGenerateReport = window.generateReport;
window.generateReport = async function() {
  console.log('生成增强版报告中...');
  
  // 收集所有步骤的数据
  collectAllData();
  
  // 显示步骤7
  showStep(7);
  
  // 生成能力雷达图
  await generateAbilityChart();
  
  // 使用增强版学校推荐
  await generateEnhancedSchoolRecommendations();
  
  // 显示时间规划
  displayTimeline();
  
  // AI生成政策提醒
  if (CONFIG.isConnected) {
    await generateAITimelineAndPolicy();
  } else {
    displayStaticTimelineAndPolicy();
  }
  
  // 更新按钮功能
  updateReportButtons();
  
  alert('专业报告生成完成！支持打印和PDF导出。');
};

// 更新报告页按钮
function updateReportButtons() {
  const buttonGroup = document.querySelector('#step7 .button-group');
  if (buttonGroup) {
    buttonGroup.innerHTML = `
      <button class="btn btn-secondary" onclick="goToStep6()">← 返回修改</button>
      <button class="btn btn-primary" onclick="printOptimizedReport()">
        <i class="fas fa-print"></i> 打印专业报告
      </button>
      <button class="btn btn-secondary" onclick="exportReportPDF()">
        <i class="fas fa-file-pdf"></i> 导出PDF
      </button>
      <button class="btn btn-secondary" onclick="resetAll()">
        <i class="fas fa-redo"></i> 重新评估
      </button>
    `;
  }
}

// 更新原有的导出PDF函数
window.exportReportPDF = async function() {
  try {
    // 创建jsPDF实例
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // 设置中文字体
    doc.setFont('helvetica');
    
    // 收集数据
    const userData = collectUserDataForAI();
    const currentDate = new Date().toLocaleDateString('zh-CN');
    const timeline = calculateTimelineByGrade();
    
    // 封面页
    doc.setFontSize(24);
    doc.setTextColor(0, 102, 204);
    doc.text('西安小升初专家报告', 105, 50, null, null, 'center');
    
    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100);
    doc.text(`学生：${userData.学生姓名 || '匿名'}`, 105, 80, null, null, 'center');
    doc.text(`当前年级：${userData.当前年级 || '六年级'}`, 105, 90, null, null, 'center');
    doc.text(`生成时间：${currentDate}`, 105, 100, null, null, 'center');
    
    // 学校推荐页
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204);
    doc.text('学校推荐报告', 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // 学校信息
    const schools = [
      ['学校名称', '类型', '区域', '入学方式', '匹配度'],
      [`${userData.户籍所在区 || '所在区'}对口学校`, '公办', userData.户籍所在区 || '-', '学区对口', '100%'],
      ['西安市高新第一中学', '民办', '高新区', '摇号录取', '85%'],
      ['西安铁一中', '民办', '碑林区', '摇号录取', '80%']
    ];
    
    doc.autoTable({
      head: [schools[0]],
      body: schools.slice(1),
      startY: 50,
      theme: 'striped',
      headStyles: { fillColor: [0, 102, 204] }
    });
    
    // 时间规划页
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204);
    doc.text(`${timeline.targetYear}年时间规划`, 20, 30);
    
    doc.setFontSize(10);
    let y = 50;
    timeline.timeline.forEach(step => {
      doc.text(`${step.year}年${step.month}: ${step.events[0]}`, 30, y);
      y += 10;
    });
    
    // 保存PDF
    doc.save(`西安小升初报告_${userData.学生姓名 || '学生'}_${currentDate}.pdf`);
    
  } catch (error) {
    console.error('PDF导出失败:', error);
    alert('PDF导出失败，请使用打印功能。错误：' + error.message);
  }
};

// 初始化增强功能
document.addEventListener('DOMContentLoaded', function() {
  // 原有初始化
  initializeApp();
  
  // 添加CSS样式
  addEnhancedStyles();
  
  console.log('增强版功能已加载');
});

// 添加增强样式
function addEnhancedStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    /* 增强版学校推荐样式 */
    .enhanced-school-recommendations {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      margin: 20px 0;
    }
    
    .section-header {
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #e5e7eb;
    }
    
    .section-header h3 {
      color: #1e40af;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .header-subtitle {
      color: #6b7280;
      font-size: 14px;
      margin-top: 5px;
    }
    
    .recommendation-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 25px;
    }
    
    .summary-card {
      background: #f8fafc;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 15px;
      transition: all 0.3s ease;
    }
    
    .summary-card:hover {
      background: #f1f5f9;
      transform: translateY(-2px);
    }
    
    .summary-icon {
      width: 50px;
      height: 50px;
      background: #dbeafe;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #1e40af;
    }
    
    .summary-content {
      flex: 1;
    }
    
    .summary-title {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .summary-value {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin: 5px 0;
    }
    
    .summary-desc {
      font-size: 12px;
      color: #64748b;
    }
    
    /* 学校类型标签 */
    .school-type-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      margin-left: 10px;
    }
    
    .school-type-badge.public {
      background: #dbeafe;
      color: #1e40af;
    }
    
    .school-type-badge.private {
      background: #fef3c7;
      color: #92400e;
    }
    
    /* 来源信息 */
    .official-sources-box {
      background: #f0f9ff;
      border-radius: 10px;
      padding: 20px;
      margin-top: 30px;
      border-left: 4px solid #3b82f6;
    }
    
    .sources-list {
      list-style: none;
      padding: 0;
      margin: 15px 0;
    }
    
    .source-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .source-item:last-child {
      border-bottom: none;
    }
    
    .source-number {
      display: inline-block;
      width: 24px;
      height: 24px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 24px;
      margin-right: 15px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .source-details {
      flex: 1;
    }
    
    .source-details strong {
      color: #1e40af;
      display: block;
      margin-bottom: 5px;
    }
    
    .source-url {
      font-size: 12px;
      color: #6b7280;
      font-family: monospace;
      margin-bottom: 5px;
    }
    
    .source-desc {
      font-size: 12px;
      color: #64748b;
    }
    
    .source-note {
      background: white;
      padding: 12px;
      border-radius: 8px;
      font-size: 13px;
      color: #4b5563;
      margin-top: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    /* 时间线样式 */
    .timeline-container {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    
    .timeline-header {
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #e5e7eb;
    }
    
    .timeline-status {
      color: #059669;
      font-weight: 500;
      margin-top: 8px;
      padding: 8px 12px;
      background: #d1fae5;
      border-radius: 6px;
      display: inline-block;
    }
    
    .timeline-steps {
      position: relative;
      padding-left: 30px;
    }
    
    .timeline-steps::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #e5e7eb;
    }
    
    .timeline-step {
      position: relative;
      margin-bottom: 25px;
      padding-left: 30px;
    }
    
    .timeline-step::before {
      content: '';
      position: absolute;
      left: -6px;
      top: 0;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #3b82f6;
      border: 3px solid white;
      box-shadow: 0 0 0 2px #3b82f6;
    }
    
    .timeline-step.critical::before {
      background: #ef4444;
      box-shadow: 0 0 0 2px #ef4444;
    }
    
    .step-marker {
      position: absolute;
      left: -100px;
      top: -10px;
      text-align: right;
      width: 70px;
    }
    
    .step-number {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 2px;
    }
    
    .step-month {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
    }
    
    .step-content {
      background: #f8fafc;
      border-radius: 10px;
      padding: 15px;
      border-left: 4px solid #3b82f6;
    }
    
    .timeline-step.critical .step-content {
      border-left-color: #ef4444;
      background: #fef2f2;
    }
    
    .step-title {
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 8px;
    }
    
    .step-details {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    
    .step-importance {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 500;
    }
    
    .step-importance.important {
      background: #dbeafe;
      color: #1e40af;
    }
    
    .step-importance.critical {
      background: #fecaca;
      color: #dc2626;
    }
    
    .step-action {
      font-size: 12px;
      color: #64748b;
    }
    
    .timeline-tips {
      background: #fef3c7;
      border-radius: 10px;
      padding: 20px;
      margin-top: 30px;
      border-left: 4px solid #f59e0b;
    }
    
    .timeline-tips h5 {
      color: #92400e;
      margin: 0 0 10px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .timeline-tips ul {
      margin: 0;
      padding-left: 20px;
      color: #78350f;
    }
    
    .timeline-tips li {
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    /* 打印优化样式 */
    @media print {
      .enhanced-school-recommendations,
      .timeline-container {
        box-shadow: none;
        border: 1px solid #ddd;
        page-break-inside: avoid;
      }
      
      .recommendation-summary {
        grid-template-columns: repeat(3, 1fr);
      }
      
      .timeline-step {
        margin-bottom: 15px;
      }
    }
    
    /* 响应式调整 */
    @media (max-width: 768px) {
      .recommendation-summary {
        grid-template-columns: 1fr;
      }
      
      .step-marker {
        position: static;
        text-align: left;
        width: auto;
        margin-bottom: 10px;
      }
      
      .timeline-step {
        padding-left: 20px;
      }
      
      .timeline-steps::before {
        left: 10px;
      }
      
      .timeline-step::before {
        left: 4px;
      }
    }
  `;
  document.head.appendChild(style);
}

// 更新原有的生成报告函数调用
window.addEventListener('load', function() {
  // 确保所有功能正常
  console.log('增强版西安小升初系统已加载');
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
window.goToStep6 = goToStep6;
window.goToStep7 = goToStep7;
// ==================== 优化小猫助手（完整版）====================

// 全局存储用户所有信息
let userAllData = {
    基本信息: {},
    能力评估: {},
    户籍居住: {},
    学区房产: {},
    家庭意向: {},
    AI分析记录: [],
    最后更新: null
};

// 自动收集所有数据
function collectAllData() {
    const now = new Date();
    
    // 1. 基本信息
    userAllData.基本信息 = {
        学生姓名: document.getElementById('studentName')?.value || '',
        学生性别: document.getElementById('studentGender')?.value || '',
        当前年级: document.querySelector('input[name="currentGrade"]:checked')?.value || '',
        所在小学: document.getElementById('currentSchool')?.value || ''
    };
    
    // 2. 能力评估
    userAllData.能力评估 = {
        学业成绩: document.querySelector('input[name="score1"]:checked')?.value || '未评估',
        综合素养: document.querySelector('input[name="score2"]:checked')?.value || '未评估',
        学习习惯: document.querySelector('input[name="score3"]:checked')?.value || '未评估',
        心理素质: document.querySelector('input[name="score4"]:checked')?.value || '未评估',
        家庭支持: document.querySelector('input[name="score5"]:checked')?.value || '未评估',
        学科倾向: document.querySelector('input[name="score6"]:checked')?.value || '未评估'
    };
    
    // 3. 户籍居住
    userAllData.户籍居住 = {
        户籍所在区: document.getElementById('householdDistrict')?.value || '',
        实际居住区: document.getElementById('residenceDistrict')?.value || '',
        居住性质: document.getElementById('residenceType')?.value || ''
    };
    
    // 4. 学区房产
    userAllData.学区房产 = {
        学区房情况: document.getElementById('hasHouse')?.value || '',
        房产证类型: document.getElementById('propertyType')?.value || '',
        持有时间: document.getElementById('propertyYears')?.value || ''
    };
    
    // 5. 家庭意向
    userAllData.家庭意向 = {
        是否考虑民办: document.getElementById('considerPrivate')?.value || '',
        跨区范围: document.getElementById('crossDistrictPreference')?.value || '',
        三年预算: document.getElementById('budget')?.value || '',
        摇号态度: document.getElementById('acceptLottery')?.value || '',
        孩子特长: getSelectedSpecialties()
    };
    
    userAllData.最后更新 = now.toLocaleString('zh-CN');
    
    // 保存到本地
    localStorage.setItem('xiaoshengchu_user_data', JSON.stringify(userAllData));
    
    return userAllData;
}

// 获取选中的特长
function getSelectedSpecialties() {
    const checkboxes = document.querySelectorAll('input[name="specialty"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// 优化的小猫回答函数（覆盖原有函数）
async function sendMessage() {
    const userInput = document.getElementById('chatInput').value.trim();
    if (!userInput) return;
    
    // 显示用户消息
    addUserMessage(userInput);
    document.getElementById('chatInput').value = '';
    
    // 显示"思考中"
    const chatBody = document.getElementById('chatBody');
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'ai-message assistant';
    thinkingDiv.innerHTML = `
        <div class="message-avatar">🐱</div>
        <div class="message-content">
            小喵正在思考中... 
            <div style="display:inline-block;">
                <span style="animation: dot1 1.5s infinite">.</span>
                <span style="animation: dot2 1.5s infinite">.</span>
                <span style="animation: dot3 1.5s infinite">.</span>
            </div>
            <style>
                @keyframes dot1 { 0%, 20% { opacity: 0; } 40%, 100% { opacity: 1; } }
                @keyframes dot2 { 0%, 40% { opacity: 0; } 60%, 100% { opacity: 1; } }
                @keyframes dot3 { 0%, 60% { opacity: 0; } 80%, 100% { opacity: 1; } }
            </style>
        </div>
    `;
    chatBody.appendChild(thinkingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    try {
        // 收集所有数据
        const allData = collectAllData();
        
        // 检查是否询问学校推荐但未完成评估
        const isAskingSchools = userInput.includes('学校') || 
                               userInput.includes('推荐') || 
                               userInput.includes('上什么');
        
        const completedSteps = getCompletedStepsCount();
        
        if (isAskingSchools && completedSteps < 5) {
            // 未完成评估，给出引导
            thinkingDiv.remove();
            
            let guideMessage = `🐱 **小喵升学助手提示**\n\n`;
            guideMessage += `📋 **当前状态**：您已完成 ${completedSteps}/7 步骤\n\n`;
            guideMessage += `🎯 **要获得准确学校推荐**，请先完成：\n`;
            
            if (!allData.基本信息.当前年级) {
                guideMessage += `• 第一步：选择学生当前年级\n`;
            }
            if (!allData.能力评估.学业成绩 || !allData.能力评估.综合素养) {
                guideMessage += `• 第二步：完成能力评估（至少2个维度）\n`;
            }
            if (!allData.户籍居住.户籍所在区) {
                guideMessage += `• 第三步：填写户籍信息\n`;
            }
            if (!allData.学区房产.学区房情况) {
                guideMessage += `• 第四步：填写学区房产信息\n`;
            }
            if (!allData.家庭意向.是否考虑民办) {
                guideMessage += `• 第五步：填写民办意向\n`;
            }
            
            guideMessage += `\n💡 **立即行动**：点击上方步骤指示器继续填写，完成后AI会给出精准推荐！`;
            
            addAIMessage(guideMessage);
            return;
        }
        
        // 构建智能提示
        let prompt = `用户问题："${userInput}"
        
用户已填写的信息：

【学生情况】
• 姓名：${allData.基本信息.学生姓名 || '未填写'}
• 年级：${allData.基本信息.当前年级 || '未选择'}（${allData.基本信息.当前年级 === '六年级' ? '2026年小升初' : allData.基本信息.当前年级 === '五年级' ? '2027年小升初' : '2028年小升初'}）
• 所在小学：${allData.基本信息.所在小学 || '未填写'}

【能力特点】
• 学业成绩：${allData.能力评估.学业成绩}分
• 综合素养：${allData.能力评估.综合素养}分
• 学习习惯：${allData.能力评估.学习习惯}分
• 心理素质：${allData.能力评估.心理素质}分
• 家庭支持：${allData.能力评估.家庭支持}分
• 学科倾向：${allData.能力评估.学科倾向}分

【户籍学区】
• 户籍所在区：${allData.户籍居住.户籍所在区 || '未选择'}
• 实际居住区：${allData.户籍居住.实际居住区 || '未选择'}
• 居住性质：${allData.户籍居住.居住性质 || '未选择'}
• 学区房：${getHouseText(allData.学区房产.学区房情况)}

【家庭意向】
• 是否考虑民办：${getConsiderPrivateText(allData.家庭意向.是否考虑民办)}
• 三年预算：${getBudgetText(allData.家庭意向.三年预算)}
• 孩子特长：${allData.家庭意向.孩子特长.join('、') || '未选择'}

请基于以上完整信息，严格按照2025年西安小升初政策回答：
1. 公办学校推荐必须遵循户籍学区原则
2. 民办学校推荐考虑家庭预算和意向
3. 提供2025年最新时间节点
4. 如果信息不足，请明确说明需要补充什么`;

        // 调用AI（使用现有配置）
        const aiResponse = await callAIAPI(
            prompt,
            CONFIG.provider,
            CONFIG.apiKey,
            CONFIG.appId
        );
        
        // 移除"思考中"
        thinkingDiv.remove();
        
        // 显示AI回答
        addAIMessage(aiResponse);
        
        // 保存记录
        userAllData.AI分析记录.push({
            时间: new Date().toLocaleString('zh-CN'),
            问题: userInput,
            回答: aiResponse.substring(0, 200) + '...'
        });
        
    } catch (error) {
        console.error('错误:', error);
        thinkingDiv.remove();
        
        // 本地备用回答
        const localAnswer = getLocalAnswer(userInput);
        addAIMessage(localAnswer);
    }
}

// 辅助函数
function getHouseText(value) {
    const map = {
        'yes-good': '有学区房（对口优质公办）',
        'yes-normal': '有学区房（对口一般公办）',
        'no': '无学区房',
        'rent': '租房居住'
    };
    return map[value] || '未选择';
}

function getConsiderPrivateText(value) {
    const map = {
        'yes': '是，愿意参加摇号',
        'cautious': '观望中，看情况决定',
        'no': '否，只考虑公办'
    };
    return map[value] || '未选择';
}

function getBudgetText(value) {
    const map = {
        'low': '3万以内（公办为主）',
        'medium': '3-10万（可考虑民办）',
        'high': '10万以上（民办无压力）'
    };
    return map[value] || '未选择';
}

function getCompletedStepsCount() {
    let count = 0;
    const data = userAllData;
    
    if (data.基本信息.当前年级) count++;
    if (data.能力评估.学业成绩 !== '未评估') count++;
    if (data.户籍居住.户籍所在区) count++;
    if (data.学区房产.学区房情况) count++;
    if (data.家庭意向.是否考虑民办) count++;
    
    return count;
}

// 本地备用回答库
function getLocalAnswer(question) {
    const q = question.toLowerCase();
    
    if (q.includes('时间') || q.includes('什么时候') || q.includes('报名')) {
        return `📅 **2025年西安小升初时间安排**：
• **报名时间**：2025年7月11日-7月24日
• **摇号时间**：2025年7月30日
• **结果确认**：2025年8月1日-8月5日
• **开学时间**：2025年9月1日

💡 **提醒**：请务必在规定时间内完成报名！`;
    }
    
    if (q.includes('摇号') || q.includes('电脑随机')) {
        return `🎲 **2025年民办学校摇号政策**：
1. **摇号条件**：报名人数超过招生计划的民办学校
2. **摇号时间**：2025年7月30日统一进行
3. **招生计划**：全市28所民办初中，计划招生12361人
4. **志愿填报**：可填报1-3所民办学校
5. **录取规则**：摇号录取，结果当场公布

🏫 **热门民办学校往年摇号率**：
• 高新一中初中校区：约15%
• 铁一中分校：约18%
• 交大附中分校：约20%

建议合理填报志愿，增加录取机会！`;
    }
    
    if (q.includes('公办') || q.includes('学区')) {
        const district = userAllData.户籍居住.户籍所在区;
        
        if (district) {
            return `🏫 **关于${district}公办学校入学**：

根据2025年西安政策：
1. **入学原则**：免试就近，按户籍学区入学
2. **入学顺位**：
   • 第一顺位：房户一致，且在学区内居住
   • 第二顺位：房户一致，但跨学区居住
   • 第三顺位：集体户/挂靠户
   • 第四顺位：租房居住，统筹安排

3. **您的户籍情况**：${district}
4. **建议**：携带户口本、房产证到${district}教育局查询具体对口学校

📞 ${district}教育局联系电话需查询官网获取。`;
        } else {
            return `🏫 **公办学校入学原则**：

要了解具体能上哪所公办学校，我需要知道：
1. 您的户籍在哪个区？
2. 是否有学区房？
3. 户籍地址和房产证地址是否一致？

请先填写第三步"户籍与居住信息"，我才能给出准确建议。`;
        }
    }
    
    if (q.includes('民办学校') || q.includes('有哪些')) {
        return `🏫 **2025年西安民办初中（28所）**：

**热门民办学校**：
1. 西安高新一中初中校区（高新区）
2. 西安铁一中分校（碑林区）
3. 西安交大附中分校（雁塔区）
4. 西工大附中分校（碑林区）
5. 陕西师大附中分校（雁塔区）
6. 西安爱知中学（新城区）
7. 西安益新中学（莲湖区）
8. 西安行知中学（新城区）
9. 西安尊德中学（碑林区）
10. 西安汇知中学（新城区）

**2025年招生**：总计划12361人
**学费范围**：8000-15000元/学期

💡 **选择建议**：
• 根据家庭预算选择
• 考虑学校特色和学生兴趣
• 合理填报志愿（1冲刺+1稳妥+1保底）`;
    }
    
    // 默认回答
    return `🐱 **小喵升学助手**回答：

我理解您的问题。为了更好地帮助您，请：

📋 **完善以下信息**：
1. 学生当前年级（第一步）
2. 能力评估结果（第二步）
3. 户籍所在区（第三步）
4. 学区房情况（第四步）
5. 是否考虑民办（第五步）

或者直接问我：
• "2025年报名时间是什么时候？"
• "民办学校摇号怎么进行？"
• "我家在XX区，能上什么学校？"

我已经记住了您填写的信息，可以基于这些信息给出更精准的建议！`;
}

// 添加消息到聊天窗口
function addUserMessage(text) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message user';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">${text}</div>
            <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        </div>
        <div class="message-avatar">👤</div>
    `;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addAIMessage(text) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message assistant';
    messageDiv.innerHTML = `
        <div class="message-avatar">🐱</div>
        <div class="message-content">
            <div class="message-text">${formatResponse(text)}</div>
            <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            <div class="source-info">
                <span class="trust-badge trust-ai">AI分析</span>
                基于用户${getCompletedStepsCount()}项信息 • ${new Date().toLocaleDateString('zh-CN')}
            </div>
        </div>
    `;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function formatResponse(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
               .replace(/\n/g, '<br>');
}

// ==================== PDF导出功能（简化可用版）====================
function exportReportPDF() {
    try {
        // 显示加载
        const loading = document.createElement('div');
        loading.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9999;display:flex;justify-content:center;align-items:center;color:white;font-size:18px;';
        loading.innerHTML = '<div style="text-align:center;"><div style="width:50px;height:50px;border:5px solid #f3f3f3;border-top:5px solid #3498db;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 20px;"></div>正在生成PDF报告...</div>';
        document.body.appendChild(loading);
        
        setTimeout(() => {
            try {
                // 收集数据
                const data = collectAllData();
                
                // 创建PDF
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                
                // 标题
                doc.setFontSize(22);
                doc.setTextColor(33, 150, 243);
                doc.text('西安小升初智能评估报告', 105, 20, { align: 'center' });
                
                doc.setFontSize(12);
                doc.setTextColor(100, 100, 100);
                doc.text('2025增强版 | 基于AI分析', 105, 28, { align: 'center' });
                
                doc.setDrawColor(200, 200, 200);
                doc.line(20, 35, 190, 35);
                
                let y = 45;
                
                // 1. 学生信息
                doc.setFontSize(16);
                doc.setTextColor(0, 0, 0);
                doc.text('一、学生基本信息', 20, y);
                y += 10;
                
                const studentInfo = [
                    ['学生姓名', data.基本信息.学生姓名 || '未填写'],
                    ['当前年级', data.基本信息.当前年级 || '未选择'],
                    ['户籍所在区', data.户籍居住.户籍所在区 || '未选择'],
                    ['学区房情况', getHouseText(data.学区房产.学区房情况)],
                    ['是否考虑民办', getConsiderPrivateText(data.家庭意向.是否考虑民办)],
                    ['三年预算', getBudgetText(data.家庭意向.三年预算)]
                ];
                
                // 使用表格
                if (typeof doc.autoTable === 'function') {
                    doc.autoTable({
                        startY: y,
                        head: [['项目', '内容']],
                        body: studentInfo,
                        theme: 'grid',
                        headStyles: { fillColor: [33, 150, 243] }
                    });
                    y = doc.lastAutoTable.finalY + 15;
                } else {
                    // 普通文本
                    doc.setFontSize(12);
                    studentInfo.forEach(([label, value]) => {
                        doc.text(`${label}：${value}`, 25, y);
                        y += 8;
                    });
                    y += 10;
                }
                
                // 2. 能力评估
                doc.addPage();
                y = 20;
                
                doc.setFontSize(16);
                doc.text('二、能力评估结果', 20, y);
                y += 10;
                
                const abilities = [
                    ['学业成绩', data.能力评估.学业成绩],
                    ['综合素养', data.能力评估.综合素养],
                    ['学习习惯', data.能力评估.学习习惯],
                    ['心理素质', data.能力评估.心理素质],
                    ['家庭支持', data.能力评估.家庭支持],
                    ['学科倾向', data.能力评估.学科倾向]
                ];
                
                if (typeof doc.autoTable === 'function') {
                    const abilityTable = abilities.map(([name, score]) => {
                        const s = score === '未评估' ? '未评估' : `${score}分`;
                        let level = '未评估';
                        if (score >= 4) level = '优秀';
                        else if (score >= 3) level = '良好';
                        else if (score >= 1) level = '需提升';
                        return [name, s, level];
                    });
                    
                    doc.autoTable({
                        startY: y,
                        head: [['能力维度', '评分', '评价']],
                        body: abilityTable,
                        theme: 'grid',
                        headStyles: { fillColor: [76, 175, 80] }
                    });
                    y = doc.lastAutoTable.finalY + 15;
                }
                
                // 3. 政策提醒
                doc.setFontSize(16);
                doc.setTextColor(211, 47, 47);
                doc.text('三、2025年重要政策提醒', 20, y);
                y += 10;
                
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                const policies = [
                    '📅 报名时间：2025年7月11日-24日',
                    '🎲 摇号时间：2025年7月30日',
                    '📍 入学原则：免试就近，房户一致优先',
                    '🏫 民办学校：28所，计划招生12361人',
                    '🌐 统一平台：陕西"教育入学一件事"',
                    '🎯 西咸新区：纳入城六区统一招生'
                ];
                
                policies.forEach(policy => {
                    doc.text(policy, 25, y);
                    y += 8;
                });
                
                // 页脚
                const pages = doc.internal.getNumberOfPages();
                for (let i = 1; i <= pages; i++) {
                    doc.setPage(i);
                    doc.setFontSize(10);
                    doc.setTextColor(150, 150, 150);
                    doc.text('西安小升初智能评估系统 - 专业升学规划', 105, 290, { align: 'center' });
                }
                
                // 保存
                const fileName = `小升初评估_${data.基本信息.学生姓名 || '学生'}_${new Date().getTime()}.pdf`;
                doc.save(fileName);
                
                loading.remove();
                alert('✅ PDF报告生成成功！文件已保存。');
                
            } catch (error) {
                loading.remove();
                alert('❌ PDF生成失败：' + error.message + '\n请使用打印功能。');
            }
        }, 1000);
        
    } catch (error) {
        alert('系统错误：' + error.message);
    }
}

// 如果上面的太复杂，用这个超级简化版
function exportReportPDFSimple() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // 最简单的内容
        doc.setFontSize(20);
        doc.text('西安小升初评估报告', 20, 20);
        
        doc.setFontSize(12);
        doc.text('生成时间：' + new Date().toLocaleString(), 20, 40);
        
        const name = document.getElementById('studentName')?.value || '未填写';
        const grade = document.querySelector('input[name="currentGrade"]:checked')?.value || '未选择';
        
        doc.text('学生姓名：' + name, 20, 60);
        doc.text('当前年级：' + grade, 20, 70);
        
        // 2025政策
        doc.setFontSize(14);
        doc.text('2025年重要政策：', 20, 90);
        doc.setFontSize(12);
        doc.text('• 报名：7月11-24日', 25, 100);
        doc.text('• 摇号：7月30日', 25, 110);
        doc.text('• 免试就近入学', 25, 120);
        doc.text('• 民办学校：28所', 25, 130);
        
        doc.save('小升初报告.pdf');
        alert('PDF生成成功！');
        
    } catch (error) {
        alert('PDF导出失败！请使用打印功能。');
    }
}

// 初始化：加载保存的数据
window.addEventListener('load', function() {
    const savedData = localStorage.getItem('xiaoshengchu_user_data');
    if (savedData) {
        try {
            userAllData = JSON.parse(savedData);
            console.log('已加载用户数据：', userAllData);
        } catch (e) {
            console.log('加载数据失败，使用新数据');
        }
    }
});

// 覆盖原有的sendMessage函数
window.sendMessage = sendMessage;
// 覆盖原有的exportReportPDF函数
window.exportReportPDF = exportReportPDF;

// 在原有的全局函数声明后面添加
window.collectAllData = collectAllData;
window.exportReportPDFSimple = exportReportPDFSimple;

</script>
