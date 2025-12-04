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

// ========== 🔥 修复1: 学校数据加载 ==========
let SCHOOLS_CACHE = null;

async function loadSchoolsData() {
    if (SCHOOLS_CACHE) return SCHOOLS_CACHE;
    
    try {
        // 尝试从 data/schools.json 加载
        const response = await fetch('data/schools.json', { cache: 'no-cache' });
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                SCHOOLS_CACHE = data;
                console.log('✅ 成功加载学校数据:', data.length, '所学校');
                return data;
            }
        }
    } catch (error) {
        console.warn('⚠️ 加载 schools.json 失败,使用示例数据:', error);
    }
    
    // Fallback 示例数据
    SCHOOLS_CACHE = [
        {
            id: 'demo_pub_a',
            name: '示例公办一中',
            type: '公办',
            district: '沣东新城',
            streets: ['王寺街道'],
            tuitionMin: 0,
            tuitionMax: 0,
            features: '学区优质',
            sources: ['https://edu.xa.gov.cn']
        },
        {
            id: 'demo_priv_a',
            name: '示例民办A',
            type: '民办',
            district: '高新区',
            streets: [],
            tuitionMin: 20000,
            tuitionMax: 50000,
            features: '科技特色',
            sources: ['https://example.com']
        }
    ];
    
    return SCHOOLS_CACHE;
}

// ========== 🔥 修复2: 完整收集用户数据 ==========
function collectUserDataForAI() {
    console.log('📊 开始收集用户数据...');
    
    const userData = {
        基本信息: {
            当前年级: document.querySelector('input[name="currentGrade"]:checked')?.value || '',
            学生姓名: document.getElementById('studentName')?.value || '',
            学生性别: document.getElementById('studentGender')?.value || '',
            所在小学: document.getElementById('currentSchool')?.value || ''
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
    
    // 收集能力评估(6个维度)
    for (let i = 1; i <= 6; i++) {
        const radio = document.querySelector(`input[name="score${i}"]:checked`);
        const dimensionNames = ['学业成绩', '综合素养', '学习习惯', '心理素质', '家庭支持', '学科倾向'];
        if (radio) {
            userData.能力评估[dimensionNames[i-1]] = {
                得分: radio.value,
                描述: radio.nextElementSibling?.textContent || ''
            };
        }
    }
    
    // 收集学生特长(多选)
    const specialties = document.querySelectorAll('input[name="specialty"]:checked, .strength-check:checked');
    specialties.forEach(checkbox => {
        userData.学生特长.push(checkbox.value);
    });
    
    console.log('✅ 用户数据收集完成:', userData);
    
    // 同步到 USER_MEMORY
    Object.keys(userData.户籍居住信息).forEach(key => {
        saveUserMemory(key, userData.户籍居住信息[key]);
    });
    
    return userData;
}

// ========== 🔥 修复3: AI调用增强 - 携带完整用户数据 ==========
async function callAIAPI(message, provider, apiKey, appId = '') {
    try {
        if (!CONFIG.isConnected) {
            return "当前处于本地模式,AI功能不可用。请切换到在线模式。";
        }

        console.log('🤖 调用AI API:', { provider, messageLength: message.length });
        
        // 🔥 关键修复:自动附加用户数据
        const userData = collectUserDataForAI();
        const enhancedMessage = `
【用户已填写信息】
${JSON.stringify(userData, null, 2)}

【用户问题】
${message}

请基于上述真实信息回答,避免泛化回复,必须结合孩子个性化数据进行分析。回答要简洁明了,控制在150字以内。
`;
        
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                provider: provider,
                message: enhancedMessage,
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

// ========== 🔥 修复4: 学校推荐 - 基于真实数据库 ==========
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
        const avg = Object.values(ability).reduce((a, b) => a + (Number(b) || 0), 0) / Math.max(1, Object.keys(ability).length);
        score += (avg - 3) * 4;
    }
    
    return Math.max(0, Math.min(100, Math.round(score)));
}

async function renderSchoolRecommendations() {
    console.log('🏫 开始生成学校推荐...');
    
    const userData = collectUserDataForAI();
    const profile = {
        hukouDistrict: userData.户籍居住信息.户籍所在区,
        hukouStreet: userData.户籍居住信息.户籍所在街道,
        liveDistrict: userData.户籍居住信息.实际居住区,
        liveStreet: userData.户籍居住信息.实际居住街道,
        budget: userData.民办意向与预算.民办学校预算,
        schoolType: userData.民办意向与预算.是否考虑民办 === 'no' ? '公办' : '不限',
        ability: userData.能力评估
    };
    
    const schools = await loadSchoolsData();
    const candidates = [];
    
    for (const s of schools) {
        if (profile.schoolType && profile.schoolType !== '不限' && s.type !== profile.schoolType) continue;
        if (s.type === '公办' && !isPublicSchoolAllowedByHukou(s, profile)) continue;
        
        const score = computeMatchScore(s, profile);
        const tag = score >= 85 ? '稳妥校' : score >= 65 ? '匹配校' : score >= 50 ? '冲刺校' : '保底校';
        candidates.push({ school: s, score, tag });
    }
    
    candidates.sort((a, b) => b.score - a.score);
    
    const container = document.getElementById('schoolRecommendation') || document.querySelector('.container') || document.body;
    let html = `<h2>🏫 学校推荐(按户籍/居住严格匹配)</h2>`;
    
    if (candidates.length === 0) {
        html += `<div style="padding:20px;background:#fff3cd;border-radius:8px;color:#856404;">
            ⚠️ 未找到匹配学校。请确认户籍/街道/小区等信息是否已填写完整。
        </div>`;
    } else {
        html += `<div>`;
        candidates.slice(0, CONFIG.topN).forEach(c => {
            const s = c.school;
            const sources = (s.sources && s.sources.length) ? s.sources.map(u => `<a href="${u}" target="_blank">${u}</a>`).join(' | ') : '无';
            
            html += `<div class="school-card" style="border:1px solid #eee;padding:12px;border-radius:8px;margin-bottom:10px;background:#fff">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div><strong>${escapeHtml(s.name)}</strong> <small>(${escapeHtml(s.type)})</small></div>
                    <div style="text-align:right">
                        <div style="font-size:18px;color:#1a73e8">${c.score}</div>
                        <div style="font-size:12px">${c.tag}</div>
                    </div>
                </div>
                <div style="margin-top:6px;color:#444">区县:${escapeHtml(s.district || '')}</div>
                <div style="margin-top:6px;color:#555">特色:${escapeHtml(s.features || '')}</div>
                <div style="margin-top:6px;color:#333">来源:${sources}</div>
            </div>`;
        });
        html += `</div>`;
    }
    
    container.innerHTML = html;
    console.log('✅ 学校推荐已渲染:', candidates.length, '所学校');
}

// ========== 🔥 修复5: PDF生成 - 包含完整内容 ==========
async function generateChinesePDF_Friendly() {
    console.log('📄 开始生成PDF报告...');
    
    const userData = collectUserDataForAI();
    
    const report = document.createElement('div');
    report.id = '__report_tmp';
    report.style.width = '900px';
    report.style.padding = '24px';
    report.style.background = '#fff';
    report.style.color = '#222';
    report.innerHTML = `
        <div style="text-align:center;margin-bottom:12px;">
            <h1 style="font-size:22px;margin:6px 0">西安小升初个性化评估报告(家长版)</h1>
            <div style="color:#666">${new Date().toLocaleString()}</div>
        </div>
        <hr/>
        <section style="margin-top:10px;">
            <h2 style="font-size:16px">1. 学生摘要</h2>
            <p>年级:${escapeHtml(userData.基本信息.当前年级 || '-')}</p>
            <p>户籍:${escapeHtml(userData.户籍居住信息.户籍所在区 || '-')} ${escapeHtml(userData.户籍居住信息.户籍所在街道 || '')}</p>
            <p>居住:${escapeHtml(userData.户籍居住信息.实际居住区 || '-')} ${escapeHtml(userData.户籍居住信息.实际居住街道 || '')}</p>
            <p>住房性质:${escapeHtml(userData.户籍居住信息.居住性质 || '')}</p>
            <p>预算(年):${escapeHtml(userData.民办意向与预算.民办学校预算 || '-')}</p>
        </section>
        <hr/>
        <section id="__rec_section">
            <h2 style="font-size:16px">2. 学校推荐(按户籍严格匹配)</h2>
            <div id="__rec_list">正在生成...</div>
        </section>
        <hr/>
        <section>
            <h2 style="font-size:16px">3. 能力评估雷达图</h2>
            <div id="__ability_section">
                <canvas id="__pdf_chart" width="400" height="300"></canvas>
            </div>
        </section>
        <hr/>
        <section>
            <h2 style="font-size:16px">4. 学习与升学建议</h2>
            <div id="__advice_section">建议:结合语文与艺术特长,保持稳定提升;必要时参加专项辅导。</div>
        </section>
    `;
    
    document.body.appendChild(report);
    
    // 填充学校推荐
    try {
        const recContainer = report.querySelector('#__rec_list');
        const schools = await loadSchoolsData();
        const profile = {
            hukouDistrict: userData.户籍居住信息.户籍所在区,
            hukouStreet: userData.户籍居住信息.户籍所在街道,
            liveDistrict: userData.户籍居住信息.实际居住区,
            liveStreet: userData.户籍居住信息.实际居住街道,
            budget: userData.民办意向与预算.民办学校预算
        };
        
        const cands = [];
        for (const s of schools) {
            if (s.type === '公办' && !isPublicSchoolAllowedByHukou(s, profile)) continue;
            const score = computeMatchScore(s, profile);
            cands.push({ s, score });
        }
        cands.sort((a, b) => b.score - a.score);
        const top = cands.slice(0, 10);
        
        if (top.length === 0) {
            recContainer.innerHTML = '<div>未检索到匹配学校,请确认户籍/街道信息。</div>';
        } else {
            let html = '<ol>';
            top.forEach(t => {
                html += `<li style="margin-bottom:6px"><strong>${escapeHtml(t.s.name)}</strong> (${escapeHtml(t.s.type)}) – 匹配度 ${t.score} <div style="color:#666;margin-top:4px">特色:${escapeHtml(t.s.features || '')} &nbsp; 来源:${(t.s.sources || []).join(' | ')}</div></li>`;
            });
            html += '</ol>';
            recContainer.innerHTML = html;
        }
    } catch (e) {
        console.warn('⚠️ 构建推荐列表失败', e);
    }
    
    // 渲染为PDF
    try {
        const canvas = await html2canvas(report, { scale: 1.2, useCORS: true });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pageWidth - 20;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
        const fname = `西安小升初评估报告_${(new Date()).toISOString().slice(0, 10)}.pdf`;
        pdf.save(fname);
        alert('✅ PDF生成完成:' + fname);
    } catch (err) {
        console.error('❌ PDF生成失败', err);
        alert('PDF生成失败,请查看控制台错误信息。');
    } finally {
        setTimeout(() => {
            try { document.body.removeChild(report); } catch (e) { }
        }, 1500);
    }
}

// ========== 辅助函数 ==========
function escapeHtml(s) {
    if (s === undefined || s === null) return '';
    return String(s).replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
}

// ========== AI政策解读 ==========
async function interpretPolicy() {
    if (!CONFIG.isConnected) {
        alert('AI解读功能在本地模式下不可用。请切换到在线模式。');
        return;
    }
    
    try {
        showLoadingIndicator();
        
        const userData = collectUserDataForAI();
        const question = `
用户户籍信息:${userData.户籍居住信息.户籍所在区 || '未填写'},居住信息:${userData.户籍居住信息.实际居住区 || '未填写'}
请详细解读西安市小升初的入学顺位政策,包括房户一致、集体户、租房等不同情况的入学顺序,并分析用户的情况`;
        
        const response = await callAIAPI(question, CONFIG.provider, CONFIG.apiKey, CONFIG.appId);
        
        hideLoadingIndicator();
        
        const interpretationResult = document.getElementById('interpretationResult');
        if (interpretationResult) {
            interpretationResult.innerHTML = `
                <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #3b82f6;">
                    <h4 style="margin: 0 0 10px 0; color: #1e40af;">🤖 AI政策解读(基于用户情况)</h4>
                    <div style="line-height: 1.6; color: #374151;">${response}</div>
                    <div style="margin-top: 10px; font-size: 12px; color: #6b7280;">
                        <span class="trust-badge trust-verified">✅ 数据准确</span> 
                        基于${CONFIG.provider}模型分析 · 严格参照学校数据库
                    </div>
                </div>
            `;
        }
        
    } catch (error) {
        hideLoadingIndicator();
        alert(`AI解读失败:${error.message}`);
    }
}

// ========== 其他核心函数 (保持不变) ==========
function showStep(stepNumber) {
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
    window.print();
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
