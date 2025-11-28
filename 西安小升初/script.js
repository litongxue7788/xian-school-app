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
    '明
': 'ming',
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
    provider: localStorage.getItem('aiProvider') || 'bailian',
    isConnected: false, // 强制为离线模式，禁用网络功能
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

// 允许用外部数据覆盖(若 window.STREETS_DATA 存在) - 网络加载已禁用
async function loadExternalStreets() {
    try {
        if (window && window.STREETS_DATA && typeof window.STREETS_DATA === 'object') {
            const keys = Object.keys(window.STREETS_DATA || {});
            if (keys.length > 0) Object.assign(STREET_DATA, window.STREETS_DATA);
            return;
        }
    } catch (e) {
        console.warn('外部街道数据(window.STREETS_DATA)未加载(可忽略):', e.message || e);
    }
}

function populateStreets(districtSelectId, streetSelectId) {
    const districtSelect = document.getElementById(districtSelectId);
    const streetSelect = document.getElementById(streetSelectId);
    if (!districtSelect || !streetSelect) return;

    // 将下拉中的值或文本规范化为 STREET_DATA 的有效键
    const mapDistrictKey = (raw) => {
        if (!raw) return '';
        let name = String(raw).trim();
        // 去掉常见括号内容、空白与标点
        name = name.replace(/[()（）]/g, '').replace(/\s+/g, '');
        // 先尝试直接命中
        if (STREET_DATA[name]) return name;
        // 尝试用原始未去括号的文本直接命中
        if (STREET_DATA[raw]) return raw;
        // 模糊包含:如"西咸新区沣东新城"包含"西咸新区"
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

// ======= 可搜索下拉(轻量实现,使用内置拼音映射) =======
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

    const toLower = (s) => (s || '').toLowerCase();

    // 预计算每个 option 的全拼与简拼
    const options = Array.from(select.options);
    options.forEach((opt, idx) => {
        if (idx === 0) return; // 跳过"请选择"
        const txt = (opt.textContent || '').trim();
        // 使用内置拼音函数
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
            if (idx === 0) return; // 保留"请选择"
            if (!hasKw) { opt.hidden = false; return; }
            const chs = opt.dataset.chstxt || '';
            const full = opt.dataset.fullpy || '';
            const abbr = opt.dataset.abbrpy || '';
            const hit = chs.includes(kw) || (full && full.includes(kw)) || (abbr && abbr.includes(kw));
            opt.hidden = !hit;
        });
        // 如果当前选项被隐藏,则清空选择
        if (select.selectedIndex > 0 && select.options[select.selectedIndex].hidden) {
            select.selectedIndex = 0;
            clearFieldError(select);
        }
    });
}

function ensureSearchInputs() {
    ['householdDistrict','householdStreet','residenceDistrict','residenceStreet'].forEach(id => {
        const sel = document.getElementById(id);
        if (!sel) return;
        const has = sel.previousElementSibling && sel.previousElementSibling.classList && sel.previousElementSibling.classList.contains('search-input');
        if (!has) attachSearchableSelect(id);
    });
}

// ========== 条款级引用工具 ==========
// 注意：此部分功能依赖 window.POLICY_INDEX 全局数据
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

// ========== 学校热度与概率估算(已截断) ==========
// 此部分功能原始代码不完整，为保证脚本可运行，已移除损坏部分。


// ========== 页面交互与事件绑定 (代码已补全) ==========

// DOM加载完成后执行初始化
document.addEventListener('DOMContentLoaded', () => {
    // 获取元素引用
    chatWindow = document.getElementById('chatWindow');
    chatHeader = document.getElementById('chatHeader');
    configPanel = document.getElementById('configPanel');
    apiStatus = document.getElementById('apiStatus');
    statusText = document.getElementById('statusText');

    // 初始化步骤显示
    showStep(1);

    // 初始化户籍和居住地联动下拉菜单
    populateStreets('householdDistrict', 'householdStreet');
    populateStreets('residenceDistrict', 'residenceStreet');

    // 为下拉菜单附加搜索功能
    ensureSearchInputs();

    // 为聊天窗口添加拖动功能
    if (chatHeader) {
        chatHeader.addEventListener('mousedown', (e) => {
            if (e.target.closest('button, a')) return; // 如果点击的是按钮或链接，则不拖动
            isDragging = true;
            if (chatWindow) {
                chatWindow.style.transition = 'none'; // 拖动时移除过渡效果
                offsetX = e.clientX - chatWindow.offsetLeft;
                offsetY = e.clientY - chatWindow.offsetTop;
            }
        });
    }

    document.addEventListener('mousemove', (e) => {
        if (!isDragging || !chatWindow) return;
        // 防止拖出视窗
        const x = Math.max(0, Math.min(window.innerWidth - chatWindow.offsetWidth, e.clientX - offsetX));
        const y = Math.max(0, Math.min(window.innerHeight - chatWindow.offsetHeight, e.clientY - offsetY));
        chatWindow.style.left = `${x}px`;
        chatWindow.style.top = `${y}px`;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging && chatWindow) {
            isDragging = false;
            chatWindow.style.transition = ''; // 恢复过渡效果
        }
    });
});

// 显示指定步骤的函数
function showStep(stepNumber) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));

    const section = document.getElementById(`step${stepNumber}`);
    if (section) section.classList.add('active');

    const indicator = document.getElementById(`step${stepNumber}-indicator`);
    if (indicator) indicator.classList.add('active');
    
    // 更新进度条
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = ((stepNumber - 1) / 5) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 切换聊天窗口显示/隐藏
function toggleChat() {
    chatWindow = chatWindow || document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.classList.toggle('active');
    }
}

// 切换API配置面板显示/隐藏
function toggleConfigPanel() {
    configPanel = configPanel || document.getElementById('configPanel');
    if (configPanel) {
        configPanel.classList.toggle('active');
    }
}

// 切换到本地模式
function useLocalMode() {
    CONFIG.isConnected = false;
    
    statusText = statusText || document.getElementById('statusText');
    if (statusText) statusText.textContent = '本地模式';
    
    apiStatus = apiStatus || document.getElementById('apiStatus');
    if (apiStatus) apiStatus.className = 'api-status local';
    
    const chatApiStatus = document.getElementById('chatApiStatus');
    if(chatApiStatus) chatApiStatus.textContent = '本地模式';

    configPanel = configPanel || document.getElementById('configPanel');
    if (configPanel && configPanel.classList.contains('active')) {
        configPanel.classList.remove('active');
    }
    
    alert('已切换到本地模式。AI相关功能将不可用。');
}


// 步骤导航函数
function goToStep1() { showStep(1); }
function goToStep2() { 
    // 此处可以加入步骤1的验证逻辑，暂时省略
    showStep(2); 
}
function goToStep3() { 
    if (validateStep2()) { // 使用已有的验证函数
        showStep(3); 
    }
}
function goToStep4() { 
    // 此处可以加入步骤3的验证逻辑
    showStep(4); 
}
function goToStep5() { 
    // 此处可以加入步骤4的验证逻辑
    showStep(5); 
}

// 生成报告（空函数，避免报错）
function generateReport() {
    alert('报告生成功能正在开发中...');
    // 未来会在这里收集所有数据并跳转到步骤6
    // showStep(6);
}

// 其他按钮的空函数，防止点击时报错
function saveAndTestConfig() { alert('此功能在本地模式下不可用。'); }
function sendMessage() { alert('AI聊天功能在本地模式下不可用。'); }
function handleKeyPress(event) { if (event.key === 'Enter') sendMessage(); }
function quickAction(text) { alert(`快捷操作 "${text}" 在本地模式下不可用。`); }
function interpretPolicy() { alert('AI解读功能在本地模式下不可用。'); }
function exportReportPDF() { alert('导出PDF功能正在开发中...'); }
function exportReportJSON() { alert('导出JSON功能正在开发中...'); }
function resetAll() { if(confirm('您确定要重置所有填写的数据吗？')) { window.location.reload(); } }

