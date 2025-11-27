// ========== 全局配置与数据 ==========
const CONFIG = {
    apiKey: '',
    appId: '',
    provider: localStorage.getItem('aiProvider') || 'bailian',
    isConnected: false,
    isChatInitialized: false
};

let assessmentData = { scores: {}, familyInfo: {}, totalScore: 0 };
let chatHistory = [];
let isDragging = false;
let chatWindow, chatHeader, chatInput, sendBtn, chatBody, apiStatus, statusText, configPanel, configStatus;
let offsetX, offsetY;
let abilityChartInstance = null;

const STREET_DATA = {
    '新城区': ['西一路街道', '长乐中路街道', '中山门街道', '韩森寨街道', '解放门街道', '长乐西路街道', '太华路街道', '自强路街道'],
    '碑林区': ['南院门街道', '柏树林街道', '长乐坊街道', '东关南街街道', '太乙路街道', '文艺路街道', '长安路街道', '张家村街道'],
    '莲湖区': ['北院门街道', '青年路街道', '桃园路街道', '北关街道', '红庙坡街道', '环城西路街道', '土门街道', '枣园街道', '西关街道'],
    '雁塔区': ['小寨路街道', '大雁塔街道', '长延堡街道', '电子城街道', '等驾坡街道', '鱼化寨街道', '丈八沟街道', '曲江街道'],
    '灞桥区': ['纺织城街道', '十里铺街道', '红旗街道', '洪庆街道', '席王街道', '新筑街道', '狄寨街道'],
    '未央区': ['未央宫街道', '大明宫街道', '张家堡街道', '徐家湾街道', '谭家街道', '草滩街道', '六村堡街道', '未央湖街道', '汉城街道'],
    '阎良区': ['新华路街道', '凤凰路街道', '前进路街道', '胜利路街道', '新兴街道', '武屯街道', '关山街道'],
    '临潼区': ['骊山街道', '秦陵街道', '新市街道', '代王街道', '斜口街道', '行者街道', '零口街道', '相桥街道', '雨金街道', '新丰街道', '西泉街道'],
    '长安区': ['韦曲街道', '郭杜街道', '滦镇街道', '兴隆街道', '大兆街道', '鸣犊街道', '杜曲街道', '五台街道', '高桥街道', '引镇街道', '王莽街道', '子午街道', '太乙宫街道'],
    '高陵区': ['鹿苑街道', '泾渭街道', '崇皇街道', '通远街道', '张卜街道', '湾子镇', '耿镇'],
    '鄠邑区': ['甘亭街道', '余下街道', '祖庵镇', '秦渡镇', '草堂镇', '庞光镇', '蒋村镇', '涝店镇', '石井镇', '玉蝉镇'],
    '蓝田县': ['蓝关街道', '洩湖镇', '华胥镇', '前卫镇', '汤峪镇', '焦岱镇', '玉山镇', '三里镇', '普化镇', '葛牌镇', '灞源镇', '孟村镇', '辋川镇'],
    '周至县': ['二曲街道', '哑柏镇', '终南镇', '马召镇', '集贤镇', '楼观镇', '青化镇', '司竹镇', '尚村镇', '广济镇', '富仁镇', '竹峪镇'],
    '西咸新区': ['三桥街道', '上林街道', '王寺街道', '斗门街道', '镐京街道', '建章路街道', '钓台街道', '高桥街道', '马王街道', '窑店街道', '正阳街道', '周陵街道', '渭城街道', '北杜街道', '底张街道', '永乐镇', '泾干街道', '崇文镇', '高庄镇'],
    '高新区': ['丈八街道', '鱼化寨街道', '细柳街道', '兴隆街道', '东大街道', '五星街道', '灵沼街道'],
    '经开区': ['张家堡街道', '未央湖街道', '草滩街道', '六村堡街道', '凤城一路街道', '凤城二路街道', '凤城三路街道', '凤城四路街道', '凤城五路街道', '凤城六路街道'],
    '曲江新区': ['曲江街道', '雁南街道', '雁塔中路街道', '雁翔路街道'],
    '浐灞国际港（浐灞片区）': ['广运潭街道', '雁鸣湖街道', '新筑街道', '浐灞大道街道'],
    '浐灞国际港（港务片区）': ['新筑街道', '港务西路街道', '港务东路街道', '新合街道'],
    '航天基地': ['航天大道街道', '东长安街道', '神舟四路街道', '神舟五路街道']
};

// 允许用外部数据覆盖（若 data/streets.json 或 window.STREETS_DATA 存在）
async function loadExternalStreets() {
    try {
        if (window && window.STREETS_DATA && typeof window.STREETS_DATA === 'object') {
            Object.assign(STREET_DATA, window.STREETS_DATA);
            return;
        }
        const resp = await fetch('data/streets.json', { cache: 'no-store' });
        if (resp.ok) {
            const ext = await resp.json();
            if (ext && typeof ext === 'object') Object.assign(STREET_DATA, ext);
        }
    } catch (e) {
        console.warn('外部街道数据未加载（可忽略）：', e.message || e);
    }
}

function populateStreets(districtSelectId, streetSelectId) {
    const districtSelect = document.getElementById(districtSelectId);
    const streetSelect = document.getElementById(streetSelectId);
    if (!districtSelect || !streetSelect) return;

    const fill = () => {
        const selectedDistrict = districtSelect.value;
        const streets = STREET_DATA[selectedDistrict] || [];
        streetSelect.innerHTML = '<option value="">请选择街道</option>';
        streets.forEach(street => {
            const option = document.createElement('option');
            option.value = street;
            option.textContent = street;
            streetSelect.appendChild(option);
        });
        // 每次填充后清理错误提示
        clearFieldError(streetSelect);
    };

    districtSelect.addEventListener('change', () => {
        fill();
        clearFieldError(districtSelect);
    });
    // 初始化时根据当前已选区填充一次
    fill();
}

// ======= 表单校验与错误提示 =======
function ensureErrorHolder(afterElem) {
    // 在元素后方插入/复用一个错误提示容器
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
        // 滚动到第一个错误
        const firstError = document.querySelector('.field-error:not(:empty)');
        if (firstError && typeof firstError.scrollIntoView === 'function') {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    return ok;
}

// 输入时清除错误样式
['householdDistrict','householdStreet','residenceDistrict','residenceStreet'].forEach(id => {
    document.addEventListener('change', (e) => {
        if (e.target && e.target.id === id) clearFieldError(e.target);
    });
});

// ======= 可搜索下拉（轻量实现） =======
function attachSearchableSelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    // 已经装配过则跳过
    if (select.previousElementSibling && select.previousElementSibling.classList && select.previousElementSibling.classList.contains('search-input')) return;

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

    const normalize = (s) => (s || '').toLowerCase();

    input.addEventListener('input', () => {
        const keyword = normalize(input.value.trim());
        const options = Array.from(select.options);
        options.forEach((opt, idx) => {
            if (idx === 0) return; // 保留“请选择”
            const txt = normalize(opt.textContent);
            opt.hidden = keyword && !txt.includes(keyword);
        });
        // 如果当前选项被隐藏，则清空选择
        if (select.selectedIndex > 0 && select.options[select.selectedIndex].hidden) {
            select.selectedIndex = 0;
            clearFieldError(select);
        }
    });
}

// ========== 条款级引用工具 ==========
function findPolicyClausesByText(text) {
    if (!text || !window.POLICY_INDEX) return [];
    const t = text.toLowerCase();
    const hits = [];
    for (const clause of POLICY_INDEX) {
        const ok = (clause.keywords || []).some(k => t.includes(String(k).toLowerCase()));
        if (ok) hits.push({ id: clause.id, title: clause.title });
    }
    // 去重
    const seen = new Set();
    return hits.filter(c => { if (seen.has(c.id)) return false; seen.add(c.id); return true; });
}

function formatClauseBadge(clauses) {
    if (!clauses || clauses.length === 0) return '';
    const txt = clauses.map(c => c.id).join('、');
    return `<div class="source-info"><span class="trust-badge trust-verified">条款</span> ${txt}</div>`;
}

// ========== 学校热度与概率估算 ==========
function getSchoolByName(name) {
    return SCHOOLS_DATA.find(s => s.name === name);
}

function estimateLotteryRate(name, userScores = {}, familyInfo = {}) {
    const s = getSchoolByName(name);
    if (!s) return null;
    const seats = Math.max(0, (s.quota || 0) - (s.directPromotion || 0));
    // 学校自身热度→基础需求系数
    const heat = s.heat || 3;
    const demandMultiplierMap = { 1: 0.8, 2: 1.2, 3: 1.6, 4: 2.0, 5: 2.5 };
    const baseDemand = demandMultiplierMap[heat] || 1.6;
    // 区级热度加权
    const districtHeat = (typeof DISTRICT_HEAT !== 'undefined' && DISTRICT_HEAT[s.district]) ? DISTRICT_HEAT[s.district] : 1.0;
    // 历年报名倍率（优先读取数据内嵌字段）
    const applyRatio = (s.apply_ratio ? s.apply_ratio : ((typeof APPLY_RATIO !== 'undefined' && APPLY_RATIO[name]) ? APPLY_RATIO[name] : 1.4));
    // 学校特色标签对需求的细化影响（与家庭偏好关联，优先读取数据内嵌字段）
    let featureDemand = 1.0;
    const tags = Array.isArray(s.tags) ? s.tags : ((typeof SCHOOL_FEATURES !== 'undefined' && SCHOOL_FEATURES[name]) ? SCHOOL_FEATURES[name] : []);
    if (typeof TAG_WEIGHTS !== 'undefined') {
        // 家庭偏好映射
        const prefersAcademic = (familyInfo.philosophy || []).includes('学术成绩和升学率');
        const prefersQuality = (familyInfo.philosophy || []).includes('综合素质培养');
        const prefersArtsSports = (familyInfo.strengths || []).some(x => ['艺术','体育'].includes(x));
        for (const t of tags) {
            let w = TAG_WEIGHTS[t] || 0;
            if ((t === '学术导向' || t === '理科强' || t === '竞赛浓度高') && prefersAcademic) w += 0.05;
            if ((t === '素质教育') && prefersQuality) w += 0.05;
            if ((t === '艺术体育强') && prefersArtsSports) w += 0.05;
            featureDemand *= (1 + w);
        }
    }
    // 综合需求估计
    const demand = baseDemand * districtHeat * applyRatio * featureDemand;
    const applicants = Math.max(seats, Math.round(seats * demand));
    let rate = seats === 0 ? 0 : (seats / applicants) * 100;
    const score1 = userScores.score1 || 0;
    const score3 = userScores.score3 || 0;
    const abilityFactor = ((score1 + score3) / 10 - 0.5) * 10; // -5% ~ +5%
    rate = Math.max(3, Math.min(95, rate + abilityFactor));
    return Math.round(rate);
}

function formatHeatBadge(name) {
    const s = getSchoolByName(name);
    const heat = (s && s.heat) ? s.heat : 3;
    const stars = '★★★★★'.slice(0, heat);
    return `<div class="source-info"><span class="trust-badge trust-verified">热度</span> ${heat}/5 ${stars}</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有UI元素
    chatWindow = document.getElementById('chatWindow');
    chatHeader = document.getElementById('chatHeader');
    chatInput = document.getElementById('chatInput');
    sendBtn = document.getElementById('sendBtn');
    chatBody = document.getElementById('chatBody');
    apiStatus = document.getElementById('apiStatus');
    statusText = document.getElementById('statusText');
    configPanel = document.getElementById('configPanel');
    configStatus = document.getElementById('configStatus');

    loadConfig();
    setupStepLogic();
    setupDragAndDrop();
        setupInputValidation();
    updateAdmissionPriority();
    loadExternalStreets().then(() => {
        populateStreets('householdDistrict', 'householdStreet');
        populateStreets('residenceDistrict', 'residenceStreet');
        attachSearchableSelect('householdDistrict');
        attachSearchableSelect('householdStreet');
        attachSearchableSelect('residenceDistrict');
        attachSearchableSelect('residenceStreet');
    });
    
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('click', (e) => {
            const currentSection = e.target.closest('.section');
            if (currentSection && currentSection.id === 'step1') return;
            
            const currentStep = parseInt(currentSection.id.replace('step', ''));
            if (currentStep < 5) {
                setTimeout(() => showStep(currentStep + 1), 200); 
            }
        });
    });
});

// ========== API 与模式管理 ==========
function toggleConfigPanel() {
    configPanel.classList.toggle('show');
}

function loadConfig() {
    CONFIG.apiKey = localStorage.getItem('bailianApiKey') || '';
    CONFIG.appId = localStorage.getItem('bailianAppId') || '';
    CONFIG.provider = localStorage.getItem('aiProvider') || CONFIG.provider || 'bailian';
    document.getElementById('apiKeyInput').value = CONFIG.apiKey;
    document.getElementById('appIdInput').value = CONFIG.appId;
    const providerSelect = document.getElementById('providerSelect');
    if (providerSelect) {
        providerSelect.value = CONFIG.provider;
        providerSelect.addEventListener('change', updateProviderHelp);
    }
    updateProviderHelp();
    if (CONFIG.apiKey && CONFIG.appId) {
        testConfig(true);
    } else {
        updateApiStatus(false);
    }
}

function saveAndTestConfig() {
    CONFIG.apiKey = document.getElementById('apiKeyInput').value;
    CONFIG.appId = document.getElementById('appIdInput').value;
    const providerSelect = document.getElementById('providerSelect');
    CONFIG.provider = providerSelect ? providerSelect.value : (CONFIG.provider || 'bailian');
    if (!CONFIG.apiKey || !CONFIG.appId) {
        showConfigStatus('API Key和APP ID不能为空', 'error');
        return;
    }
    localStorage.setItem('bailianApiKey', CONFIG.apiKey);
    localStorage.setItem('bailianAppId', CONFIG.appId);
    localStorage.setItem('aiProvider', CONFIG.provider);
    testConfig();
}

async function testConfig(isSilent = false) {
    if (!isSilent) {
        showConfigStatus('正在测试连接...', 'info');
    }
    try {
        const resp = await fetch('/api/ai/route', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                provider: CONFIG.provider || 'bailian',
                action: 'chat',
                prompt: 'Test', 
                history: []
            })
        });
        if (!resp.ok) {
            const errorBody = await resp.json();
            throw new Error(errorBody.details || 'Unknown API error');
        }

        updateApiStatus(true);
        if (!isSilent) {
            showConfigStatus('连接成功！AI功能已激活', 'success');
            setTimeout(() => configPanel.classList.remove('show'), 1500);
        }
    } catch (error) {
        updateApiStatus(false);
        if (!isSilent) {
            showConfigStatus(`连接失败: ${error.message}`, 'error');
        }
        console.error("Config test error:", error);
    }
}

function useLocalMode() {
    updateApiStatus(false);
    configPanel.classList.remove('show');
}

function updateApiStatus(isConnected) {
    CONFIG.isConnected = isConnected;
    const icon = apiStatus.querySelector('i');
    if (isConnected) {
        apiStatus.className = 'api-status connected';
        icon.className = 'fas fa-brain';
        statusText.textContent = 'AI增强模式';
        document.getElementById('chatApiStatus').textContent = 'AI增强模式';
    } else {
        apiStatus.className = 'api-status local';
        icon.className = 'fas fa-laptop';
        statusText.textContent = '本地模式';
        document.getElementById('chatApiStatus').textContent = '本地模式';
    }
}

function showConfigStatus(message, type) {
    configStatus.textContent = message;
    configStatus.className = `config-status ${type}`;
}

function updateProviderHelp() {
    const provider = (document.getElementById('providerSelect')?.value) || 'bailian';
    const help = document.getElementById('providerHelp');
    if (!help) return;
    const base = `
      <strong>通用说明：</strong><br>
      - 前端仅访问本站 <code>/api/ai/route</code>，由后端转发到所选模型提供商，避免跨域与地域限制。<br>
      - 请在部署平台的环境变量中配置密钥，前端不保存密钥。<br>
      - 如需移动端全国可用：建议国内节点部署后端并开启 HTTPS/CDN。<br>
      <br>
    `;
    const map = {
      bailian: base + `
        <strong>阿里百炼/通义：</strong><br>
        - 设置环境变量：<code>BAILIAN_API_KEY</code>、<code>BAILIAN_APP_ID</code><br>
        - 控制台：<a href="https://bailian.console.aliyun.com" target="_blank">阿里云百炼控制台</a>
      `,
      openai: base + `
        <strong>OpenAI：</strong><br>
        - 设置环境变量：<code>OPENAI_API_KEY</code>（可选 <code>OPENAI_MODEL</code>，默认 gpt-4o-mini）<br>
        - 建议通过本站后端转发，客户端不直连。
      `,
      deepseek: base + `
        <strong>DeepSeek：</strong><br>
        - 设置环境变量：<code>DEEPSEEK_API_KEY</code>（可选 <code>DEEPSEEK_MODEL</code>，默认 deepseek-chat）<br>
        - 访问频繁时建议开启后端 Keep-Alive 与重试策略。
      `
    };
    help.innerHTML = map[provider] || base;
}


// ========== 步骤导航逻辑 ==========
let currentStep = 1;

function showStep(step) {
    currentStep = step;
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active', 'completed'));
    for (let i = 1; i <= 6; i++) {
        const indicator = document.getElementById(`step${i}-indicator`);
        if (i < step) indicator.classList.add('completed');
        else if (i === step) indicator.classList.add('active');
    }
    
    const progress = (step - 1) / 5 * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function setupStepLogic() {
    showStep(1);
}

function goToStep1() { showStep(1); }
function goToStep2() { showStep(2); }
function goToStep3() { if (!validateStep2()) return; showStep(3); }
function goToStep4() { showStep(4); }
function goToStep5() { showStep(5); }

// ========== AI聊天助手 ==========
function toggleChat() {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active') && !CONFIG.isChatInitialized) {
        const welcomeMsg = "你好！我是小喵升学助手，有什么可以帮你的吗？";
        appendMessage(welcomeMsg, 'assistant');
        chatHistory.push({ role: 'assistant', content: welcomeMsg });
        CONFIG.isChatInitialized = true;
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !sendBtn.disabled) {
        sendMessage();
    }
}

function quickAction(text) {
    chatInput.value = text;
    sendMessage();
}

async function sendMessage() {
    const question = chatInput.value.trim();
    if (!question) return;

    appendMessage(question, 'user');
    chatHistory.push({ role: 'user', content: question });
    chatInput.value = '';
    sendBtn.disabled = true;

    showTypingIndicator();

    try {
        if (CONFIG.isConnected) {
            const prompt = buildChatPrompt(chatHistory);
            console.log("Chat AI Prompt (for debugging):", prompt);
            const resp = await fetch('/api/ai/route', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    provider: CONFIG.provider || 'bailian',
                    action: 'chat',
                    prompt: prompt, 
                    history: chatHistory,
                    context: assessmentData // Pass assessment data as context
                })
            });

            if (!resp.ok) {
                const errorBody = await resp.text();
                throw new Error(`AI 服务返回错误 (状态: ${resp.status}): ${errorBody}`);
            }
            
            const data = await resp.json();
            const aiResponseText = data && data.text ? data.text : 'AI暂未返回有效结果（骨架模式）';
            hideTypingIndicator();
            appendMessage(aiResponseText, 'assistant');
            chatHistory.push({ role: 'assistant', content: aiResponseText });
        } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const answer = getLocalAnswer(question);
            hideTypingIndicator();
            appendMessage(answer, 'assistant', true);
        }
    } catch(error) {
        console.error("Chat Error:", error);
        hideTypingIndicator();
        appendMessage("抱歉，我好像出了一点问题，请稍后再试。", 'assistant');
    } finally {
        sendBtn.disabled = false;
        chatInput.focus();
    }
}

function buildChatPrompt(history) {
    const formattedHistory = history.map(msg => {
        return `${msg.role === 'user' ? '用户' : '助手'}: ${msg.content}`;
    }).join('\n');
    const citationContext = Object.values(CITATION_DATA).map(c => `- ${c.title}: ${BASE_URL}${c.url}`).join('\n');
    const policyContext = `\n\n== 2025年西安市义务教育招生入学工作通知 (核心政策) ==\n${POLICY_DATA}\n`;

    return `你是西安小升初升学规划专家“小喵助手”。请根据下面的“核心政策”、“官方资料”和对话历史，用友好、简洁、专业的语气回答用户最后提出的问题。${policyContext}\n\n== 官方资料引用列表 ==\n${citationContext}\n\n== 对话历史 ==\n${formattedHistory}\n\n== 任务与指令 ==\n1. **优先在“核心政策”中寻找答案**。如果找不到，再使用“官方资料引用列表”或结合对话历史和你的知识回答。\n2.  如果你的回答内容可以被“官方资料引用列表”中的文件所支持，你必须在回答的末尾，用markdown格式附上来源，例如：[来源：2025年西安市义务教育阳光招生政策问答]。\n`;
}

function appendMessage(content, sender, useMarkdown = false) {
    const avatar = sender === 'user' ? '🧑' : '🐱';
    const messageElem = document.createElement('div');
    messageElem.className = `ai-message ${sender}`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    if (useMarkdown) {
        // A simple markdown to HTML converter
        let html = content.replace(/\n/g, '<br>');
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
        contentDiv.innerHTML = html;
    } else {
        contentDiv.textContent = content;
    }
    messageElem.innerHTML = `<div class="message-avatar">${avatar}</div>`;
    messageElem.appendChild(contentDiv);
    chatBody.appendChild(messageElem);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator() {
    const typingElem = document.createElement('div');
    typingElem.id = 'typingIndicator';
    typingElem.className = 'ai-message assistant';
    typingElem.innerHTML = `\n        <div class="message-avatar">🐱</div>\n        <div class="message-content typing-indicator">\n            <span></span><span></span><span></span>\n        </div>\n    `;
    chatBody.appendChild(typingElem);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function getLocalAnswer(question) {
    let bestMatch = null;
    let maxScore = 0;
    let bestCitation = null;

    const questionKeywords = question.toLowerCase().split(/[\s,.?？，。]+/).filter(Boolean);

    FAQ_DATA.forEach(item => {
        const titleKeywords = item.q.toLowerCase();
        let score = 0;
        if (titleKeywords === question.toLowerCase()) {
            score = 100;
        } else {
            questionKeywords.forEach(qKeyword => {
                if (titleKeywords.includes(qKeyword)) {
                    score += 1;
                }
            });
        }

        if (score > maxScore) {
            maxScore = score;
            bestMatch = item;
        }
    });

    if (maxScore > 0) {
        // 匹配引用
        for (const key in CITATION_DATA) {
            const citation = CITATION_DATA[key];
            for (const keyword of citation.keywords) {
                if (bestMatch.q.includes(keyword) || question.includes(keyword)) {
                    bestCitation = citation;
                    break;
                }
            }
            if(bestCitation) break;
        }
        
        let answer = bestMatch.a;
        if (bestCitation) {
            answer += `\n\n[来源: ${bestCitation.title}](${BASE_URL}${bestCitation.url})`;
        }
        return answer;
    }

    return "抱歉，关于这个问题，我的知识库里还没有相关信息。您可以尝试连接AI增强模式，获取更深度的解答。";
}


// ========== 拖拽功能 ==========
function setupDragAndDrop() {
    chatHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - chatWindow.offsetLeft;
        offsetY = e.clientY - chatWindow.offsetTop;
        chatWindow.style.transition = 'none';
    });
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
        const maxX = window.innerWidth - chatWindow.offsetWidth;
        const maxY = window.innerHeight - chatWindow.offsetHeight;
        chatWindow.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
        chatWindow.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        chatWindow.style.transition = '';
    });
}

// ========== 表单逻辑与数据收集 ==========
function setupInputValidation() {
    document.querySelectorAll('#step3 select').forEach(select => {
        select.addEventListener('change', updateAdmissionPriority);
    });
}

function updateAdmissionPriority() {
    const hasHouse = document.getElementById('hasHouse').value;
    const priorityDiv = document.getElementById('admissionPriority');
    const reasonDiv = document.getElementById('priorityReason');

    let priority = '评估中...';
    let reason = '';

    if (hasHouse === 'yes-good' || hasHouse === 'yes-normal') {
        priority = '第一顺位 (房户一致)';
        reason = '您拥有学区内房产，这是最优先的入学顺位。';
    } else if (hasHouse === 'no') {
        priority = '第三顺位 (集体户/挂靠户等)';
        reason = '无房产情况下，通常被划分为第三顺位，由区教育局统筹安排。';
    } else if (hasHouse === 'rent') {
        priority = '第四顺位 (租房)';
        reason = '租房家庭属于第四顺位，将由区教育局在满足前序顺位后进行统筹安排。';
    } else {
        priority = '请选择房产情况以评估';
        reason = '';
    }
    priorityDiv.textContent = priority;
    reasonDiv.textContent = reason;
}

function collectAssessmentData() {
    const data = { scores: {}, familyInfo: {} };
    for (let i = 1; i <= 6; i++) {
        const selected = document.querySelector(`input[name="score${i}"]:checked`);
        data.scores[`score${i}`] = selected ? parseInt(selected.value) : 0;
    }
    data.familyInfo.householdDistrict = document.getElementById('householdDistrict').value;
    data.familyInfo.residenceDistrict = document.getElementById('residenceDistrict').value;
    data.familyInfo.hasHouse = document.getElementById('hasHouse').value;
    data.familyInfo.considerPrivate = document.getElementById('considerPrivate').value;
    data.familyInfo.budget = document.getElementById('budget').value;
    data.familyInfo.strengths = Array.from(document.querySelectorAll('.strength-check:checked')).map(cb => cb.value);
    data.familyInfo.philosophy = Array.from(document.querySelectorAll('.philosophy-check:checked')).map(cb => cb.value);
    data.familyInfo.specificNeeds = document.getElementById('specificNeeds').value;
    data.familyInfo.riskTolerance = document.getElementById('riskTolerance').value;
    data.familyInfo.timeCommitment = document.getElementById('timeCommitment').value;
    return data;
}


// ========== 报告生成 ==========
function generateReport() {
    assessmentData = collectAssessmentData();
    showStep(6);

    // 清空旧内容
    document.getElementById('familyProfile').innerHTML = '';
    document.getElementById('abilityAnalysis').innerHTML = '';
    document.getElementById('schoolRecommendation').innerHTML = `<div class="ai-loading"><div class="ai-loading-spinner"></div><p>AI正在分析您的信息...</p></div>`;
    document.getElementById('timeline').innerHTML = '';
    document.getElementById('policyAdvice').innerHTML = '';

    // 异步生成各个模块
    generateFamilyProfile(assessmentData.familyInfo);
    renderAbilityChart(assessmentData.scores);
    generateAbilityAnalysis(assessmentData.scores);

    setTimeout(() => {
        if (CONFIG.isConnected) {
            generateAIRecommendations(assessmentData);
        } else {
            generateLocalRecommendations(assessmentData);
        }
    }, 1000);
}

function generateLocalRecommendations(data) {
    const schoolRecDiv = document.getElementById('schoolRecommendation');
    let recHTML = '<p>基于您的选择，我们为您提供以下本地模式推荐：</p>';
    recHTML += `<div class="public-match-card">
        <div class="public-match-header"><span class="public-match-title">🛡️ 保底公办选择</span></div>
        <p class="public-match-desc">您的主要公办去向将是 <strong>${data.familyInfo.residenceDistrict}</strong> 的对口/统筹学校。请务必关注该区教育局发布的学区划分方案。</p>
    </div>`;
    if (data.familyInfo.considerPrivate === 'yes') {
        recHTML += `<p style="margin-top:20px;"><strong>民办学校建议：</strong></p><p>本地模式下我们建议您重点关注“高新一中”、“铁一中分校”等热门学校，同时结合自身情况选择1-2所稳妥学校作为备选。</p>`;
    }
    schoolRecDiv.innerHTML = recHTML;

    const timelineDiv = document.getElementById('timeline');
    timelineDiv.innerHTML = `
        <div class="timeline-item">
            <div class="timeline-date">2025-07-11 ~ 2025-07-24</div>
            <div class="timeline-content"><strong>民办学校网上报名</strong><br>请登录市教育局指定平台，在规定时间内完成报名和志愿填报。</div>
        </div>
        <div class="timeline-item">
            <div class="timeline-date">2025-07-30</div>
            <div class="timeline-content"><strong>民办学校摇号录取</strong><br>全市统一进行电脑随机录取，请关注摇号结果。</div>
        </div>
    `;
    const policyDiv = document.getElementById('policyAdvice');
    policyDiv.innerHTML = `<div class="policy-box"><h4>💡 本地建议</h4><p>无论是否参与民办摇号，都请确保您的户籍、房产等材料符合<strong>${data.familyInfo.residenceDistrict}</strong>的公办入学要求，这是您最稳妥的底线。</p></div>`;
}

async function generateAIRecommendations(data) {
    const schoolRecDiv = document.getElementById('schoolRecommendation');
    const timelineDiv = document.getElementById('timeline');
    const policyDiv = document.getElementById('policyAdvice');

    try {
        const prompt = buildAIPrompt(data);
        console.log("AI Prompt (for debugging):", prompt);
        
        const resp = await fetch('/api/ai/route', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                provider: CONFIG.provider || 'bailian',
                action: 'recommend',
                prompt: prompt
            })
        });

        if (!resp.ok) {
            const errorBody = await resp.text();
            throw new Error(`AI API request failed with status ${resp.status}: ${errorBody}`);
        }

        const aiResponse = await resp.json();

        renderAIRecommendations(aiResponse, data);

    } catch (error) {
        schoolRecDiv.innerHTML = '<p style="color:red">AI推荐生成失败，请检查网络或API配置后重试。</p>';
        console.error("AI Recommendation Error:", error);
        timelineDiv.innerHTML = '';
        policyDiv.innerHTML = '';
    }
}

function renderAIRecommendations(response, data) {
    const schoolRecDiv = document.getElementById('schoolRecommendation');
    const timelineDiv = document.getElementById('timeline');
    const policyDiv = document.getElementById('policyAdvice');

    let recHTML = '';
    const typeMap = {
        "冲刺": { icon: "🏆", class: "sprint", color: "var(--accent-color)" },
        "稳妥": { icon: "✅", class: "steady", color: "var(--primary-color)" },
        "保底": { icon: "🛡️", class: "fallback", color: "var(--gray-dark)" }
    };
    response.recommendations.forEach(rec => {
        const info = typeMap[rec.type] || typeMap["稳妥"];
        const clauseBadge = formatClauseBadge(findPolicyClausesByText(rec.reason));
        const computedRate = estimateLotteryRate(rec.name, assessmentData.scores, assessmentData.familyInfo);
        const rateText = (computedRate !== null) ? `摇号率: 约${computedRate}%` : (rec.rate ? `摇号率: 约${rec.rate}` : '');
        const heatBadge = formatHeatBadge(rec.name);
        recHTML += `
            <div class="public-match-card" style="border-color: ${info.color};">
                <div class="public-match-header">
                    <span class="public-match-title">${info.icon} AI${rec.type}推荐</span>
                    <span class="match-indicator">${rateText}</span>
                </div>
                <p class="public-match-desc"><strong>${rec.name}:</strong> ${rec.reason}</p>
                ${heatBadge}
                ${clauseBadge}
            </div>
        `;
    });
    schoolRecDiv.innerHTML = recHTML;

    let timelineHTML = '';
    response.timeline.forEach(item => {
        const htmlContent = item.content.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
        const clauseBadge = formatClauseBadge(findPolicyClausesByText(item.title + ' ' + item.content));
        timelineHTML += `
            <div class="timeline-item">
                <div class="timeline-date">AI建议: ${item.date}</div>
                <div class="timeline-content"><strong>${item.title}</strong><br>${htmlContent}${clauseBadge}</div>
            </div>
        `;
    });
    timelineDiv.innerHTML = timelineHTML;

    const adviceHtml = response.advice.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
    const adviceBadge = formatClauseBadge(findPolicyClausesByText(response.advice));
    policyDiv.innerHTML = `
        <div class="policy-box" style="border-color:var(--primary-color-dark);">
            <h4 style="color:var(--primary-color-dark);">💡 AI核心策略</h4>
            <p>${adviceHtml}</p>
            ${adviceBadge}
        </div>
    `;
}

function buildAIPrompt(data) {
    // 将可用的学校列表转化为字符串，供AI参考
    const availableSchools = SCHOOLS_DATA.map(s => {
        const lotteryQuota = s.quota - s.directPromotion;
        const heat = s.heat || 3;
        const dHeat = (typeof DISTRICT_HEAT !== 'undefined' && DISTRICT_HEAT[s.district]) ? DISTRICT_HEAT[s.district] : 1.0;
        return `- ${s.name} (区域: ${s.district}, 总计划: ${s.quota}, 直升:${s.directPromotion}, 预估摇号名额: ${lotteryQuota > 0 ? lotteryQuota : '极少'}, 热度:${heat}/5, 区级热度系数:${dHeat})`;
    }).join('\n');

    let userInfo = `
- **学生能力评估**:\n  - 学业成绩: ${data.scores.score1}/5\n  - 综合素养: ${data.scores.score2}/5\n  - 学习习惯: ${data.scores.score3}/5\n  - 心理素质: ${data.scores.score4}/5\n  - 家庭支持: ${data.scores.score5}/5\n  - 学科倾向: ${data.scores.score6}/5\n- **家庭与意向信息**:\n  - 户籍区: ${data.familyInfo.householdDistrict}, 居住区: ${data.familyInfo.residenceDistrict}\n  - 房产情况: ${data.familyInfo.hasHouse} (用于评估入学顺位)\n  - 民办意向: ${data.familyInfo.considerPrivate}, 预算: ${data.familyInfo.budget}\n  - 风险偏好: ${data.familyInfo.riskTolerance}\n  - 学生特长: ${data.familyInfo.strengths.join(', ') || '无'}\n  - 家长看重方面: ${data.familyInfo.philosophy.join(', ')}\n  - 特殊需求: ${data.familyInfo.specificNeeds || '无'}\n`;
    
    const citationContext = Object.values(CITATION_DATA).map(c => `- ${c.title}: ${c.url.startsWith('http') ? c.url : BASE_URL + c.url}`).join('\n');

    const policyContext = `\n\n== 2025年西安市义务教育招生入学工作通知 (核心政策) ==\n${POLICY_DATA}\n`;

    return `\n你是一位顶级的西安小升初升学规划专家。你的所有回答都必须严格依据“2025年西安市义务教育招生入学工作通知”。请根据以下政策、数据、用户情况和**必须严格遵守的指令**，为他们生成一份专业、个性化的升学规划报告。${policyContext}\n\n== 官方资料引用列表 ==\n${citationContext}\n\n== 2025年民办初中官方招生计划 (你必须且只能从以下列表中选择学校) ==\n${availableSchools}\n\n== 用户信息 ==\n${userInfo}\n\n== 核心任务与指令 ==\n请严格按照以下JSON格式输出，禁止任何额外解释。\n\n1.  **\"recommendations\"**: 一个包含2-3个学校推荐对象的数组。\n    - **严格约束1**: 所有推荐的学校名称(\"name\")，必须**精确匹配**自上面提供的“招生计划列表”。禁止编造、缩写或使用列表之外的任何学校。\n    - **严格约束2**: 在决定学校的“冲刺”、“稳妥”分类时，必须将“预估摇号名额”作为核心量化指标。摇号名额越少，竞争越激烈，越应归为“冲刺”；名额越多，则越“稳妥”。\n    - **严格约束3**: 所有的推荐理由、日期、建议，都必须以“核心政策”为最终依据。\n    - 每个对象必须包含 \"type\" (从 \"冲刺\", \"稳妥\", \"保底\" 中选择), \"name\" (学校全名), \"reason\" (结合用户信息和学校的摇号名额，生成100字以内的推荐理由), \"rate\" (根据摇号名额和学校热度，预估一个大致的摇号率，例如 \"20%\")。\n\n2.  **\"timeline\"**: 一个包含1-2个关键时间点对象的数组，提供具体的行动建议。如果内容有政策依据，必须在content字段中用markdown格式附上来源，例如：[来源: 2025年西安市义务教育阳光招生政策图解]。\n\n3.  **\"advice\"**: 一个字符串，提供给家庭的核心升学策略总结，200字以内。如果内容有政策依据，必须在字符串末尾用markdown格式附上来源。\n\n== 输出格式 (必须严格遵守) ==\n{\n  \"recommendations\": [\n    { \"type\": \"冲刺\", \"name\": \"列表中的某个学校名\", \"reason\": \"...\", \"rate\": \"...%\" },\n    { \"type\": \"稳妥\", \"name\": \"列表中的另一个学校名\", \"reason\": \"...\", \"rate\": \"...%\" }\n  ],\n  \"timeline\": [\n    { \"date\": \"...\", \"title\": \"...\", \"content\": \"... [来源: 文件名]...\" }\n  ],
  \"advice\": \"... [来源: 文件名]...\"\n}\n`;
}

function resetAll() {
    document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
    document.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = false);
    document.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
    assessmentData = { scores: {}, familyInfo: {}, totalScore: 0 };
    showStep(1);
}

function renderAbilityChart(scores) {
    const ctx = document.getElementById('abilityChart').getContext('2d');
    const labels = ['学业成绩', '综合素养', '学习习惯', '心理素质', '家庭支持', '学科倾向'];
    const data = labels.map((_, i) => scores[`score${i + 1}`] || 0);

    if (abilityChartInstance) {
        abilityChartInstance.destroy();
    }

    abilityChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: '学生能力评估',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.r !== null) {
                                label += context.parsed.r + ' 分';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// ========== 动态政策解读 ==========
async function interpretPolicy() {
    const interpretBtn = document.getElementById('interpretBtn');
    const resultDiv = document.getElementById('interpretationResult');

    if (!CONFIG.isConnected) {
        resultDiv.innerHTML = `<p style="color: #e53e3e;">此功能需要连接AI增强模式。请点击页面顶部的“本地模式”按钮进行配置。</p>`;
        resultDiv.style.display = 'block';
        return;
    }

    interpretBtn.disabled = true;
    interpretBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI正在解读中...';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<p>正在连接AI专家，请稍候...</p>';

    const householdDistrict = document.getElementById('householdDistrict').value;
    const residenceDistrict = document.getElementById('residenceDistrict').value;
    const hasHouse = document.getElementById('hasHouse').value;
    const priority = document.getElementById('admissionPriority').textContent;

    const prompt = buildInterpretationPrompt(householdDistrict, residenceDistrict, hasHouse, priority);
    console.log("Policy Interpretation Prompt (for debugging):", prompt);

    try {
        const resp = await fetch('/api/ai/route', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ provider: CONFIG.provider || 'bailian', action: 'interpret', prompt })
        });
        const dataResp = await resp.json();
        const interpretation = dataResp && dataResp.text ? dataResp.text : 'AI暂未返回有效结果（骨架模式）';

        const html = interpretation.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
        const clauseBadge = formatClauseBadge(findPolicyClausesByText(householdDistrict + ' ' + residenceDistrict + ' ' + hasHouse + ' ' + priority));
        resultDiv.innerHTML = `<p>${html}</p>${clauseBadge}`;

    } catch (error) {
        console.error("Policy Interpretation Error:", error);
        resultDiv.innerHTML = '<p style="color: #e53e3e;">抱歉，AI解读失败，请稍后重试。</p>';
    } finally {
        interpretBtn.disabled = false;
        interpretBtn.innerHTML = '<i class="fas fa-brain"></i> AI为你解读顺位';
    }
}

function buildInterpretationPrompt(household, residence, house, priority) {
    const userInfo = `户籍在 ${household}，居住在 ${residence}，房产情况是 ${house}，初步评估为 ${priority}。`;
    const citationContext = Object.values(CITATION_DATA).map(c => `- ${c.title}: ${c.url.startsWith('http') ? c.url : BASE_URL + c.url}`).join('\n');

    return `你是一位专业的西安小升初升学顾问。请严格依据下面提供的“2025年西安市义务教育招生入学工作通知”全文，并结合用户情况，用通俗易懂、有温度的语言，为用户解释他所处的“入学顺位”到底意味着什么，以及可能面临的真实情况和潜在风险。请直接输出解释内容，不要超过150字。在解释的结尾，必须根据政策内容判断，从“官方资料引用列表”中引用最相关的官方文件来源。\n\n== 2025年西安市义务教育招生入学工作通知 (核心政策) ==\n${POLICY_DATA}\n\n== 官方资料引用列表 ==\n${citationContext}\n\n== 用户情况 ==\n${userInfo}`;
}

// ========== 学生能力画像分析 ==========
async function generateAbilityAnalysis(scores) {
    const analysisDiv = document.getElementById('abilityAnalysis');
    
    if (!CONFIG.isConnected) {
        analysisDiv.innerHTML = '<p style="font-size:13px; color:#a0aec0;"><i>配置AI增强模式可获得专家级定性分析</i></p>';
        analysisDiv.style.display = 'block';
        return;
    }

    analysisDiv.style.display = 'block';
    analysisDiv.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> AI正在生成能力画像分析...</p>';

    const prompt = buildAbilityAnalysisPrompt(scores);
    console.log("Ability Analysis Prompt (for debugging):", prompt);

    try {
        const resp = await fetch('/api/ai/route', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ provider: CONFIG.provider || 'bailian', action: 'analyze', prompt })
        });
        const dataResp = await resp.json();
        const analysisText = dataResp && dataResp.text ? dataResp.text : 'AI暂未返回有效结果（骨架模式）';

        analysisDiv.innerHTML = `<p><strong>AI专家解读:</strong> ${analysisText}</p>`;

    } catch (error) {
        console.error("Ability Analysis Error:", error);
        analysisDiv.innerHTML = '<p style="color: #e53e3e;">抱歉，能力画像分析生成失败。</p>';
    }
}

function buildAbilityAnalysisPrompt(scores) {
    const scoreMapping = {
        score1: '学业成绩',
        score2: '综合素养',
        score3: '学习习惯',
        score4: '心理素质',
        score5: '家庭支持',
        score6: '学科倾向'
    };
    
    let scoreText = Object.keys(scores).map(key => {
        return `- ${scoreMapping[key]}: ${scores[key]}/5`;
    }).join('\n');

    return `你是一位资深的儿童教育心理学专家和升学规划顾问。请根据以下学生的能力评估分数（5分制），为家长提供一段专业的、有温度的、建设性的定性分析。\n\n你的任务是：\n1.  **识别核心优势**: 点出学生最突出的1-2项能力。\n2.  **发现潜在关联**: 结合不同维度的分数，进行综合分析（例如，学业好但心理素质一般，意味着什么）。\n3.  **提出建设性意见**: 根据分析结果，给出1-2条具体、可操作的建议。\n4.  **保持积极和鼓励的语气**，即使分数较低，也要发现闪光点（如家庭支持），并给出积极的改进方向。\n\n请直接输出分析和建议的文本，总字数在150字以内。\n\n== 学生能力分数 ==\n${scoreText}`;
}

// ========== 家庭需求总结 (最终新增) ==========
async function generateFamilyProfile(familyInfo) {
    const profileDiv = document.getElementById('familyProfile');

    if (!CONFIG.isConnected) {
        profileDiv.style.display = 'none';
        return;
    }

    profileDiv.style.display = 'block';
    profileDiv.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> AI正在为您生成家庭画像...</p>';

    const prompt = buildFamilyProfilePrompt(familyInfo);
    console.log("Family Profile Prompt (for debugging):", prompt);

    try {
        const profileText = await new Promise(resolve => {
            setTimeout(() => {
                // 这是一个基于输入的高度个性化的模拟回复
                let profile = "AI为您家庭描绘的画像是：";
                if (familyInfo.riskTolerance === '愿意冒险追求最好学校') {
                    profile += "一个**目标远大、敢于挑战**的家庭，";
                } else if (familyInfo.riskTolerance === '偏好稳妥可靠的选择') {
                    profile += "一个**注重稳健、偏好确定性**的家庭，";
                } else {
                    profile += "一个**理性务实、希望在风险和收益间寻求平衡**的家庭，";
                }

                if (familyInfo.philosophy.includes('学术成绩和升学率')) {
                    profile += "高度重视孩子的**学业成果与未来发展**。";
                } else if (familyInfo.philosophy.includes('综合素质培养')) {
                    profile += "非常关注孩子的**全面发展与综合素养**。";
                }
                resolve(profile);
            }, 1200);
        });

        profileDiv.innerHTML = `<p>“${profileText}”</p>`;

    } catch (error) {
        console.error("Family Profile Error:", error);
        profileDiv.innerHTML = '<p style="color: #e53e3e;">抱歉，家庭画像生成失败。</p>';
    }
}

function buildFamilyProfilePrompt(familyInfo) {
    const info = `\n- 初中学业规划: ${familyInfo.academicGoals || '未选择'}\n- 看重的方面: ${familyInfo.philosophy.join(', ') || '未选择'}\n- 特殊需求: ${familyInfo.specificNeeds || '未选择'}\n- 风险偏好: ${familyInfo.riskTolerance || '未选择'}\n- 时间投入: ${familyInfo.timeCommitment || '未选择'}\n`;

    return `你是一位专业的家庭教育顾问和心理分析师。请根据一个家庭在升学规划中提供的“深度需求”信息，为他们生成一句高度凝练、一针见血的“家庭画像”总结。\n\n你的任务是：\n1.  **捕捉核心动机**: 识别出这个家庭最关心的是什么（例如：追求顶尖、寻求稳妥、看重全面发展等）。\n2.  **提炼关键特质**: 将他们的选择凝聚成1-2个核心特质。\n3.  **使用引人入胜的语言**: 你的输出应该像一句引言，让用户看到后立刻产生“是的，这就是我们”的感觉。\n4.  **严格控制长度**: 整段话必须被包含在一对中文引号“ ”里，并且总字数严格控制在50字以内。\n\n请直接输出这句带引号的话，不要有任何额外的解释。\n\n== 家庭深度需求信息 ==\n${info}`;
}

// ========== 报告导出 ==========
function exportReportJSON() {
    try {
        const mode = CONFIG.isConnected ? 'AI' : 'local';
        const familyInfo = assessmentData.familyInfo || {};
        const scores = assessmentData.scores || {};

        // 解析学校推荐
        const recCards = Array.from(document.querySelectorAll('#schoolRecommendation .public-match-card'));
        const recommendations = recCards.map(card => {
            const titleEl = card.querySelector('.public-match-title');
            const type = titleEl ? titleEl.textContent.replace('AI', '').replace('推荐', '').trim() : '';
            const descEl = card.querySelector('.public-match-desc');
            const descText = descEl ? descEl.textContent.trim() : '';
            let name = '';
            let reason = '';
            const colonIdx = descText.indexOf(':');
            if (colonIdx > -1) {
                name = descText.substring(0, colonIdx).replace(/\s/g,'');
                reason = descText.substring(colonIdx + 1).trim();
            } else {
                reason = descText;
            }
            const rateEl = card.querySelector('.match-indicator');
            const rate = rateEl ? rateEl.textContent.replace('摇号率: 约','').trim() : '';
            return { type, name, reason, rate };
        });

        // 解析时间线
        const tlItems = Array.from(document.querySelectorAll('#timeline .timeline-item'));
        const timeline = tlItems.map(item => {
            const date = item.querySelector('.timeline-date')?.textContent.replace('AI建议:','').trim() || '';
            const title = item.querySelector('.timeline-content strong')?.textContent.trim() || '';
            const contentRaw = item.querySelector('.timeline-content')?.innerText || '';
            const content = contentRaw.replace(title, '').trim();
            return { date, title, content };
        });

        // 政策建议
        const policyAdviceText = document.querySelector('#policyAdvice')?.innerText || '';

        const payload = {
            timestamp: new Date().toISOString(),
            mode,
            familyInfo,
            scores,
            recommendations,
            timeline,
            advice: policyAdviceText
        };

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const ts = new Date();
        const pad = n => String(n).padStart(2,'0');
        const filename = `report-${ts.getFullYear()}${pad(ts.getMonth()+1)}${pad(ts.getDate())}-${pad(ts.getHours())}${pad(ts.getMinutes())}.json`;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    } catch (e) {
        alert('导出失败，请稍后重试');
        console.error('Export error:', e);
    }
}

function exportReportPDF() {
    try {
        const target = document.getElementById('step6');
        const { jsPDF } = window.jspdf || {};
        if (!window.html2canvas || !jsPDF) {
            alert('PDF组件未加载，请稍后重试');
            return;
        }
        const scale = 2;
        html2canvas(target, { scale, useCORS: true }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = 210;
            const pageHeight = 297;
            const imgWidth = pageWidth;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                pdf.addPage();
                position = heightLeft * -1;
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            const ts = new Date();
            const pad = n => String(n).padStart(2,'0');
            const filename = `report-${ts.getFullYear()}${pad(ts.getMonth()+1)}${pad(ts.getDate())}-${pad(ts.getHours())}${pad(ts.getMinutes())}.pdf`;
            pdf.save(filename);
        });
    } catch (e) {
        alert('导出失败，请稍后重试');
        console.error('PDF export error:', e);
    }
}
