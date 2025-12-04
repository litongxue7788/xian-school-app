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

// ========== 修复4：街道数据（基于本地数据库） ==========
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
    '浐灞国际港': ['广运潭街道', '雁鸣湖街道', '新筑街道', '浐灞大道街道', '港务西路街道', '港务东路街道', '新合街道'],
    '航天基地': ['航天大道街道', '东长安街道', '神舟四路街道', '神舟五路街道'],
    '西安浐灞生态区': ['广运潭街道', '雁鸣湖街道', '新筑街道', '浐灞大道街道'],
    '西安国际港务区': ['新筑街道', '港务西路街道', '港务东路街道', '新合街道']
};

// ========== 修复6：用户记忆系统 ==========
let USER_MEMORY = JSON.parse(localStorage.getItem("XA_USER_MEMORY") || "{}");

function saveUserMemory(key, value) {
    USER_MEMORY[key] = value;
    USER_MEMORY['last_updated'] = new Date().toISOString();
    localStorage.setItem("XA_USER_MEMORY", JSON.stringify(USER_MEMORY));
    console.log(`📝 用户记忆已保存: ${key} = ${value}`);
}

function getUserMemory() {
    return USER_MEMORY;
}

function getCompleteUserProfile() {
    return {
        basicInfo: {
            姓名: USER_MEMORY.student_name || '未填写',
            年级: USER_MEMORY.current_grade || '未填写',
            性别: USER_MEMORY.student_gender || '未填写',
            现读学校: USER_MEMORY.current_school || '未填写',
            户籍: `${USER_MEMORY.household_district || ''} ${USER_MEMORY.household_street || ''}`,
            居住: `${USER_MEMORY.residence_district || ''} ${USER_MEMORY.residence_street || ''}`,
            户籍居住一致: USER_MEMORY.same_district ? '是' : '否'
        },
        familyInfo: {
            房产情况: USER_MEMORY.property_situation || '未填写',
            房产类型: USER_MEMORY.property_type || '未填写',
            房产年限: USER_MEMORY.property_years || '未填写',
            居住类型: USER_MEMORY.residence_type || '未填写'
        },
        preferences: {
            考虑民办: USER_MEMORY.consider_private || '未明确',
            接受跨区: USER_MEMORY.cross_district || '未明确',
            预算范围: USER_MEMORY.budget || '未设定',
            接受摇号: USER_MEMORY.lottery_attitude || '未明确'
        },
        abilities: {
            综合评分: USER_MEMORY.ability_average || 0,
            星级评价: USER_MEMORY.ability_stars || '',
            位次估算: USER_MEMORY.rank_estimate || '',
            详细得分: USER_MEMORY.ability_scores || {},
            特长项目: USER_MEMORY.specialties || []
        },
        systemEvaluation: {
            入学顺位: USER_MEMORY.admission_priority || { text: '待评估' },
            匹配优势: USER_MEMORY.match_advantages || '',
            潜在风险: USER_MEMORY.potential_risks || '',
            建议策略: USER_MEMORY.suggested_strategy || ''
        }
    };
}

// ========== 修复5：本地数据库加载器 ==========
class LocalDatabase {
    constructor() {
        this.districts = {};
        this.allSchools = [];
        this.loaded = false;
    }

    async loadAllDistricts() {
        if (this.loaded) return this.districts;
        
        console.log('📚 开始加载本地数据库...');
        
        try {
            // 尝试动态加载各个区县的数据文件
            const districtFiles = [
                '新城区', '碑林区', '莲湖区', '雁塔区', '灞桥区', '未央区', '阎良区', '临潼区',
                '长安区', '高陵区', '鄠邑区', '蓝田县', '周至县', '西咸新区', '高新区', '经开区',
                '曲江新区', '浐灞国际港', '航天基地', '西安浐灞生态区', '西安国际港务区'
            ];

            // 这里假设你的数据文件可以通过相对路径访问
            // 在实际部署时，可能需要调整路径
            for (const district of districtFiles) {
                try {
                    // 尝试从 data/districts/ 目录加载
                    const response = await fetch(`data/districts/${district}.js`);
                    if (response.ok) {
                        const text = await response.text();
                        // 解析模块导出
                        const moduleMatch = text.match(/module\.exports\s*=\s*({[\s\S]*?});/);
                        if (moduleMatch) {
                            const districtData = eval(`(${moduleMatch[1]})`);
                            this.districts[district] = districtData;
                            console.log(`✅ 加载 ${district} 数据成功: ${districtData.public_schools?.length || 0} 所学校`);
                        }
                    }
                } catch (e) {
                    console.warn(`⚠️ 加载 ${district} 失败:`, e.message);
                }
            }

            // 如果动态加载失败，使用内置的示例数据
            if (Object.keys(this.districts).length === 0) {
                console.log('使用内置示例数据...');
                this.districts = this.getExampleData();
            }

            // 汇总所有学校
            this.allSchools = [];
            for (const district in this.districts) {
                const data = this.districts[district];
                if (data.public_schools) {
                    data.public_schools.forEach(school => {
                        this.allSchools.push({
                            ...school,
                            district: district,
                            districtData: data
                        });
                    });
                }
            }

            console.log(`✅ 数据库加载完成: ${this.allSchools.length} 所学校, ${Object.keys(this.districts).length} 个区县`);
            this.loaded = true;
            
        } catch (error) {
            console.error('❌ 数据库加载失败:', error);
            // 使用示例数据作为后备
            this.districts = this.getExampleData();
            this.allSchools = this.getAllSchoolsFromExample();
            this.loaded = true;
        }
        
        return this.districts;
    }

    getExampleData() {
        // 临潼区示例数据（基于你提供的结构）
        return {
            '临潼区': {
                metadata: {
                    district: "临潼区",
                    data_year: "2025",
                    last_updated: "2025-01-20",
                    total_schools: 24,
                    description: "临潼区初中学校数据",
                    source: "西安市教育局2025年招生计划"
                },
                public_schools: [
                    {
                        "id": "lt_001",
                        "name": "骊山初中",
                        "type": "公办",
                        "level": "初中",
                        "features": ["文化路以南区域"],
                        "admission_policy": "学区对口入学",
                        "学区": "文化路、秦陵南路以南,会昌路以西，连霍高速公路以东"
                    },
                    {
                        "id": "lt_002",
                        "name": "化工院中学",
                        "type": "公办",
                        "level": "初中",
                        "features": ["文化路以北区域"],
                        "admission_policy": "学区对口入学",
                        "学区": "文化路以北，陇海铁路线以东，城区108国道以西"
                    },
                    {
                        "id": "lt_003",
                        "name": "秦陵初中",
                        "type": "公办",
                        "level": "初中",
                        "features": ["秦陵街办片区"],
                        "admission_policy": "学区对口入学",
                        "学区": "秦陵街办各小学，标缝子弟，城区108国道以东、会昌路以东，秦陵南路以北"
                    }
                ]
            },
            '新城区': {
                metadata: {
                    district: "新城区",
                    data_year: "2025",
                    last_updated: "2025-01-20",
                    total_schools: 15,
                    description: "新城区初中学校数据",
                    source: "西安市教育局2025年招生计划"
                },
                public_schools: [
                    {
                        "id": "xc_001",
                        "name": "西安市第八十九中学",
                        "type": "公办",
                        "level": "初中",
                        "features": ["重点中学", "省级示范"],
                        "admission_policy": "学区对口入学",
                        "学区": "西一路街道、长乐中路街道部分区域"
                    },
                    {
                        "id": "xc_002",
                        "name": "西安市第三中学",
                        "type": "公办",
                        "level": "初中",
                        "features": ["优质公办", "高升学率"],
                        "admission_policy": "学区对口入学",
                        "学区": "中山门街道、韩森寨街道部分区域"
                    }
                ]
            }
        };
    }

    getAllSchoolsFromExample() {
        const schools = [];
        const exampleData = this.getExampleData();
        for (const district in exampleData) {
            const data = exampleData[district];
            if (data.public_schools) {
                data.public_schools.forEach(school => {
                    schools.push({
                        ...school,
                        district: district,
                        districtData: data
                    });
                });
            }
        }
        return schools;
    }

    async getSchoolsByDistrict(districtName) {
        await this.loadAllDistricts();
        return this.districts[districtName]?.public_schools || [];
    }

    async searchSchools(keyword) {
        await this.loadAllDistricts();
        keyword = keyword.toLowerCase();
        return this.allSchools.filter(school => 
            school.name.toLowerCase().includes(keyword) ||
            school.district.toLowerCase().includes(keyword) ||
            (school.features && school.features.some(f => f.toLowerCase().includes(keyword)))
        );
    }

    async findSchoolsByStreet(streetName) {
        await this.loadAllDistricts();
        streetName = streetName.replace('街道', '').replace('镇', '');
        return this.allSchools.filter(school => 
            school.学区 && school.学区.includes(streetName)
        );
    }
}

// ========== 修复1：本地模式切换按钮 ==========
function useLocalMode() {
    console.log('🔄 切换到本地模式...');
    
    // 更新配置
    CONFIG.aiConnected = false;
    CONFIG.isConnected = false;
    
    // 更新UI显示
    const statusElement = document.getElementById('apiStatus');
    if (statusElement) {
        statusElement.textContent = '本地模式';
        statusElement.className = 'api-status local';
        statusElement.style.cssText = `
            background: #52C41A;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        `;
    }
    
    // 保存到本地存储
    localStorage.setItem('XA_SYSTEM_MODE', 'local');
    localStorage.setItem('aiMode', 'local');
    
    // 显示成功通知
    showNotification('✅ 已成功切换到本地模式', 'success');
    
    console.log('✅ 本地模式已激活');
    return true;
}

// ========== 修复2：小猫按钮功能 ==========
function toggleChat() {
    console.log('🐱 小猫按钮被点击');
    
    const chatWindow = document.getElementById('chatWindow');
    if (!chatWindow) {
        createChatWindow();
        setTimeout(() => {
            const newChatWindow = document.getElementById('chatWindow');
            if (newChatWindow) {
                newChatWindow.classList.add('active');
                initializeChat();
            }
        }, 100);
        return;
    }
    
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
        initializeChat();
    }
}

function createChatWindow() {
    console.log('创建聊天窗口...');
    
    // 移除已存在的聊天窗口
    const existingChat = document.getElementById('chatWindow');
    if (existingChat) existingChat.remove();
    
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatWindow';
    chatWindow.className = 'chat-window';
    chatWindow.innerHTML = `
        <div class="chat-header" id="chatHeader">
            <div class="chat-title">
                <span class="chat-icon">🐱</span>
                <h3>小猫助手</h3>
                <span class="chat-subtitle">西安小升初智能顾问</span>
            </div>
            <div class="chat-actions">
                <button class="chat-btn" onclick="toggleChat()" title="关闭">×</button>
            </div>
        </div>
        <div class="chat-body" id="chatBody">
            <div class="welcome-message">
                <p>👋 你好！我是小猫助手，你的西安小升初智能顾问。</p>
                <p>我可以帮你：</p>
                <ul>
                    <li>分析学校匹配度</li>
                    <li>解读招生政策</li>
                    <li>制定升学策略</li>
                    <li>生成个性化建议</li>
                </ul>
                <p>请告诉我你的问题，或使用下面的快捷提问：</p>
            </div>
        </div>
        <div class="chat-quick-actions">
            <button class="quick-btn" onclick="askCatAssistant('帮我分析学校推荐')">🏫 学校分析</button>
            <button class="quick-btn" onclick="askCatAssistant('我的入学顺位是什么')">📋 顺位评估</button>
            <button class="quick-btn" onclick="askCatAssistant('我应该准备什么材料')">📄 材料清单</button>
            <button class="quick-btn" onclick="askCatAssistant('制定时间规划')">📅 时间规划</button>
        </div>
        <div class="chat-input-area">
            <input type="text" id="chatInput" placeholder="输入你的问题..." onkeypress="if(event.key==='Enter') sendMessage()">
            <button class="send-btn" onclick="sendMessage()">发送</button>
        </div>
    `;
    
    document.body.appendChild(chatWindow);
    setupChatDrag();
    
    // 添加样式
    if (!document.getElementById('chat-styles')) {
        const style = document.createElement('style');
        style.id = 'chat-styles';
        style.textContent = `
            .chat-window {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 400px;
                height: 500px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 5px 30px rgba(0,0,0,0.2);
                display: flex;
                flex-direction: column;
                z-index: 9999;
                display: none;
            }
            .chat-window.active {
                display: flex;
            }
            .chat-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 20px;
                border-radius: 12px 12px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: move;
            }
            .chat-title {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .chat-icon {
                font-size: 24px;
            }
            .chat-title h3 {
                margin: 0;
                font-size: 18px;
            }
            .chat-subtitle {
                font-size: 12px;
                opacity: 0.8;
            }
            .chat-body {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #f8fafc;
            }
            .welcome-message {
                background: white;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 15px;
                border-left: 4px solid #667eea;
            }
            .chat-quick-actions {
                padding: 10px 15px;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }
            .quick-btn {
                padding: 6px 12px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 16px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
            }
            .quick-btn:hover {
                background: #667eea;
                color: white;
                border-color: #667eea;
            }
            .chat-input-area {
                padding: 15px;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 10px;
            }
            #chatInput {
                flex: 1;
                padding: 10px 15px;
                border: 1px solid #e2e8f0;
                border-radius: 25px;
                outline: none;
            }
            .send-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 25px;
                padding: 10px 20px;
                cursor: pointer;
                font-weight: 500;
            }
            .ai-message {
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
            }
            .ai-message.user {
                flex-direction: row-reverse;
            }
            .message-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                color: white;
            }
            .ai-message.user .message-avatar {
                background: #52C41A;
            }
            .message-content {
                max-width: 280px;
                padding: 10px 15px;
                border-radius: 12px;
                background: white;
                border: 1px solid #e2e8f0;
                line-height: 1.5;
            }
            .ai-message.user .message-content {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
            }
        `;
        document.head.appendChild(style);
    }
}

function initializeChat() {
    // 加载用户上下文
    const userProfile = getCompleteUserProfile();
    const summary = document.createElement('div');
    summary.className = 'user-context-summary';
    summary.innerHTML = `
        <div style="background: #f0f9ff; padding: 10px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #1890ff;">
            <strong>👤 当前用户信息</strong>
            <div style="font-size: 12px; margin-top: 5px; color: #666;">
                ${userProfile.basicInfo.户籍 ? `📍 户籍：${userProfile.basicInfo.户籍}` : ''}
                ${userProfile.abilities.综合评分 ? `<br>🎓 能力：${userProfile.abilities.综合评分}/5.0` : ''}
                ${userProfile.systemEvaluation.入学顺位.text ? `<br>📋 顺位：${userProfile.systemEvaluation.入学顺位.text}` : ''}
            </div>
        </div>
    `;
    
    const chatBody = document.getElementById('chatBody');
    if (chatBody) {
        const welcomeMsg = chatBody.querySelector('.welcome-message');
        if (welcomeMsg) {
            welcomeMsg.appendChild(summary);
        }
    }
    
    // 聚焦输入框
    const chatInput = document.getElementById('chatInput');
    if (chatInput) chatInput.focus();
}

// ========== 修复3：下一步按钮功能 ==========
function goToNextStep(currentStep) {
    console.log(`前往下一步，当前步骤: ${currentStep}`);
    
    // 验证当前步骤
    if (currentStep === 3) {
        if (!validateStep3()) {
            alert('请先填写完整的户籍和居住信息！');
            return;
        }
        saveStep3Data();
    }
    
    // 导航到下一步
    const nextStep = parseInt(currentStep) + 1;
    if (nextStep <= 7) {
        showStep(nextStep);
    }
}

function validateStep3() {
    const householdDistrict = document.getElementById('householdDistrict');
    const residenceDistrict = document.getElementById('residenceDistrict');
    
    let valid = true;
    
    if (!householdDistrict || !householdDistrict.value) {
        showFieldError(householdDistrict, '请选择户籍所在区');
        valid = false;
    } else {
        clearFieldError(householdDistrict);
    }
    
    if (!residenceDistrict || !residenceDistrict.value) {
        showFieldError(residenceDistrict, '请选择实际居住区');
        valid = false;
    } else {
        clearFieldError(residenceDistrict);
    }
    
    return valid;
}

function saveStep3Data() {
    const householdDistrict = document.getElementById('householdDistrict')?.value;
    const householdStreet = document.getElementById('householdStreet')?.value;
    const residenceDistrict = document.getElementById('residenceDistrict')?.value;
    const residenceStreet = document.getElementById('residenceStreet')?.value;
    
    saveUserMemory('household_district', householdDistrict);
    saveUserMemory('household_street', householdStreet);
    saveUserMemory('residence_district', residenceDistrict);
    saveUserMemory('residence_street', residenceStreet);
    
    console.log('✅ 户籍居住信息已保存');
}

// ========== 修复4：街道联动功能 ==========
function populateStreets(districtSelectId, streetSelectId) {
    const districtSelect = document.getElementById(districtSelectId);
    const streetSelect = document.getElementById(streetSelectId);
    
    if (!districtSelect || !streetSelect) return;
    
    const updateStreets = () => {
        const district = districtSelect.value;
        streetSelect.innerHTML = '<option value="">请选择街道</option>';
        
        if (district && STREET_DATA[district]) {
            STREET_DATA[district].forEach(street => {
                const option = document.createElement('option');
                option.value = street;
                option.textContent = street;
                streetSelect.appendChild(option);
            });
            streetSelect.disabled = false;
            clearFieldError(streetSelect);
        } else {
            streetSelect.disabled = true;
            streetSelect.innerHTML = '<option value="">请先选择区</option>';
        }
    };
    
    districtSelect.addEventListener('change', updateStreets);
    
    // 初始加载
    updateStreets();
}

// ========== 修复5：学校推荐系统（基于本地数据库） ==========
class EnhancedSchoolMatcher {
    constructor() {
        this.db = new LocalDatabase();
        this.recommendations = [];
    }
    
    async matchSchools(userProfile, limit = 10) {
        console.log('🎯 开始智能匹配学校...', userProfile);
        
        try {
            await this.db.loadAllDistricts();
            
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

// ========== [修复6] 用户记忆系统增强 ==========
let USER_MEMORY = JSON.parse(localStorage.getItem("USER_MEMORY") || "{}");

function saveUserMemory(key, value) {
    USER_MEMORY[key] = value;
    USER_MEMORY['last_updated'] = new Date().toISOString();
    localStorage.setItem("USER_MEMORY", JSON.stringify(USER_MEMORY));
    console.log(`📝 用户记忆已保存: ${key} = ${value}`);
    
    // 同时保存到XA_USER_MEMORY（兼容原有系统）
    localStorage.setItem("XA_USER_MEMORY", JSON.stringify(USER_MEMORY));
}

function getUserMemory() {
    const xaMemory = JSON.parse(localStorage.getItem("XA_USER_MEMORY") || "{}");
    const localMemory = JSON.parse(localStorage.getItem("USER_MEMORY") || "{}");
    
    // 合并两个记忆系统，优先使用XA
    return { ...localMemory, ...xaMemory };
}

function getCompleteUserContext() {
    const memory = getUserMemory();
    const userProfile = collectUserDataForAI();
    
    return {
        basicInfo: {
            姓名: memory.student_name || '未填写',
            年级: memory.current_grade || '未填写',
            性别: memory.student_gender || '未填写',
            现读学校: memory.current_school || '未填写',
            户籍: `${memory.household_district || ''} ${memory.household_street || ''}`,
            居住: `${memory.residence_district || ''} ${memory.residence_street || ''}`,
            户籍居住一致: memory.same_district ? '是' : '否'
        },
        familyInfo: {
            房产情况: memory.property_situation || '未填写',
            房产类型: memory.property_type || '未填写',
            房产年限: memory.property_years || '未填写',
            居住类型: memory.residence_type || '未填写'
        },
        preferences: {
            考虑民办: memory.consider_private || '未明确',
            接受跨区: memory.cross_district || '未明确',
            预算范围: memory.budget || '未设定',
            接受摇号: memory.lottery_attitude || '未明确'
        },
        abilities: {
            综合评分: memory.ability_average || 0,
            星级评价: memory.ability_stars || '',
            位次估算: memory.rank_estimate || '',
            详细得分: memory.ability_scores || {},
            特长项目: memory.specialties || []
        },
        systemEvaluation: {
            入学顺位: memory.admission_priority || { text: '待评估' },
            匹配优势: memory.match_advantages || '',
            潜在风险: memory.potential_risks || '',
            建议策略: memory.suggested_strategy || ''
        },
        currentSession: userProfile
    };
}

// ========== [修复5] 本地数据库加载器增强 ==========
let SCHOOLS_CACHE = null;
async function loadSchoolsData() {
    if (SCHOOLS_CACHE) return SCHOOLS_CACHE;
    
    console.log('📚 加载本地学校数据库...');
    
    try {
        // 先尝试从districts目录加载
        const districts = [
            '新城区', '碑林区', '莲湖区', '雁塔区', '灞桥区', '未央区', '阎良区', '临潼区',
            '长安区', '高陵区', '鄠邑区', '蓝田县', '周至县', '西咸新区', '高新区', '经开区',
            '曲江新区', '浐灞国际港', '航天基地'
        ];
        
        const allSchools = [];
        
        for (const district of districts) {
            try {
                const response = await fetch(`data/districts/${district}.js`);
                if (response.ok) {
                    const text = await response.text();
                    const moduleMatch = text.match(/module\.exports\s*=\s*({[\s\S]*?});/);
                    if (moduleMatch) {
                        const districtData = eval(`(${moduleMatch[1]})`);
                        
                        // 提取公办学校
                        if (districtData.public_schools && Array.isArray(districtData.public_schools)) {
                            districtData.public_schools.forEach(school => {
                                allSchools.push({
                                    ...school,
                                    district: district,
                                    districtData: districtData.metadata,
                                    type: '公办',
                                    tuitionMin: 0,
                                    tuitionMax: 0
                                });
                            });
                        }
                        
                        // 提取民办学校
                        if (districtData.private_schools && Array.isArray(districtData.private_schools)) {
                            districtData.private_schools.forEach(school => {
                                allSchools.push({
                                    ...school,
                                    district: district,
                                    districtData: districtData.metadata,
                                    type: '民办',
                                    tuitionMin: school.tuitionMin || 20000,
                                    tuitionMax: school.tuitionMax || 50000
                                });
                            });
                        }
                        
                        console.log(`✅ 加载 ${district}: ${(districtData.public_schools?.length || 0) + (districtData.private_schools?.length || 0)} 所学校`);
                    }
                }
            } catch (e) {
                console.warn(`⚠️ 加载 ${district} 失败:`, e.message);
            }
        }
        
        if (allSchools.length === 0) {
            // 使用示例数据
            allSchools.push(...getExampleSchools());
        }
        
        SCHOOLS_CACHE = allSchools;
        console.log(`✅ 数据库加载完成: ${allSchools.length} 所学校`);
        return allSchools;
        
    } catch (error) {
        console.error('❌ 数据库加载失败:', error);
        SCHOOLS_CACHE = getExampleSchools();
        return SCHOOLS_CACHE;
    }
}

function getExampleSchools() {
    return [
        {
            id: 'xc_001',
            name: '西安市第八十九中学',
            type: '公办',
            district: '新城区',
            features: ['重点中学', '省级示范'],
            admission_policy: '学区对口入学',
            学区: '西一路街道、长乐中路街道部分区域',
            tuitionMin: 0,
            tuitionMax: 0
        },
        {
            id: 'xc_002',
            name: '西安市第三中学',
            type: '公办',
            district: '新城区',
            features: ['优质公办', '高升学率'],
            admission_policy: '学区对口入学',
            学区: '中山门街道、韩森寨街道部分区域',
            tuitionMin: 0,
            tuitionMax: 0
        },
        {
            id: 'lt_001',
            name: '骊山初中',
            type: '公办',
            district: '临潼区',
            features: ['文化路以南区域'],
            admission_policy: '学区对口入学',
            学区: '文化路、秦陵南路以南,会昌路以西，连霍高速公路以东',
            tuitionMin: 0,
            tuitionMax: 0
        },
        {
            id: 'mf_001',
            name: '西安高新第一中学',
            type: '民办',
            district: '高新区',
            features: ['顶尖民办', '科技创新'],
            admission_policy: '摇号入学',
            tuitionMin: 30000,
            tuitionMax: 50000
        }
    ];
}

// ========== [修复5] 严格的学区匹配 ==========
function isPublicSchoolAllowedByHukou(school, profile) {
    if (!school || school.type !== '公办') return true;
    
    const hukouDistrict = profile.household_district || profile.hukouDistrict;
    const hukouStreet = profile.household_street || profile.hukouStreet;
    
    if (!hukouDistrict) return false;
    
    // 1. 检查区匹配
    if (school.district !== hukouDistrict) return false;
    
    // 2. 检查街道匹配（如果学校有学区信息）
    if (school.学区 && hukouStreet) {
        const streetName = hukouStreet.replace('街道', '').replace('镇', '');
        return school.学区.includes(streetName);
    }
    
    return true;
}

function computeMatchScore(school, profile) {
    let score = 50;
    
    // 公办学校匹配
    if (school.type === '公办') {
        const hukouDistrict = profile.household_district || profile.hukouDistrict;
        const hukouStreet = profile.household_street || profile.hukouStreet;
        
        if (hukouDistrict === school.district) score += 30;
        if (hukouStreet && school.学区 && school.学区.includes(hukouStreet.replace('街道', '').replace('镇', ''))) {
            score += 25;
        }
    } else {
        // 民办学校匹配
        const budget = profile.budget || '';
        if (budget) {
            if (budget === 'low' && school.tuitionMax <= 30000) score += 15;
            if (budget === 'medium' && school.tuitionMax <= 100000) score += 10;
            if (budget === 'high') score += 20;
        }
        
        // 距离因素
        const liveDistrict = profile.residence_district || profile.liveDistrict;
        if (liveDistrict === school.district) score += 15;
    }
    
    // 能力匹配
    const ability = profile.ability_average || 3;
    if (ability >= 4 && school.features?.some(f => f.includes('重点') || f.includes('优质'))) {
        score += 20;
    }
    
    // 特长匹配
    const specialties = profile.specialties || [];
    if (specialties.length > 0 && school.features) {
        const hasSpecialtyMatch = specialties.some(specialty => 
            school.features.some(f => f.toLowerCase().includes(specialty.toLowerCase()))
        );
        if (hasSpecialtyMatch) score += 15;
    }
    
    return Math.max(0, Math.min(100, score));
}

function recommendTagByScore(score) {
    if (score >= 85) return { name: '稳妥校', color: '#52c41a', description: '匹配度高，入学可能性大' };
    if (score >= 65) return { name: '匹配校', color: '#1890ff', description: '良好匹配，建议重点考虑' };
    if (score >= 50) return { name: '冲刺校', color: '#fa8c16', description: '有一定挑战，可尝试冲刺' };
    return { name: '保底校', color: '#f5222d', description: '确保有学可上' };
}

// ========== [修复5] 学校推荐渲染 ==========
async function renderSchoolRecommendations() {
    console.log('开始生成学校推荐...');
    
    const profile = getUserMemory();
    const schools = await loadSchoolsData();
    
    const candidates = [];
    
    for (const school of schools) {
        // 类型筛选
        const considerPrivate = profile.consider_private;
        if (considerPrivate === 'no' && school.type === '民办') continue;
        if (considerPrivate === 'yes' && school.type === '公办') continue;
        
        // 公办学校严格学区检查
        if (school.type === '公办' && !isPublicSchoolAllowedByHukou(school, profile)) continue;
        
        const score = computeMatchScore(school, profile);
        const tag = recommendTagByScore(score);
        
        if (score >= 40) {
            candidates.push({
                school: school,
                score: score,
                tag: tag,
                successRate: calculateSuccessRate(school, profile, score),
                matchReasons: generateMatchReasons(school, profile),
                isPerfectMatch: score >= 85
            });
        }
    }
    
    candidates.sort((a, b) => b.score - a.score);
    const recommendations = candidates.slice(0, CONFIG.topN);
    
    // 保存推荐结果
    localStorage.setItem('XA_SCHOOL_RECOMMENDATIONS', JSON.stringify(recommendations));
    
    // 渲染到页面
    displaySchoolRecommendations(recommendations, profile);
    
    return recommendations;
}

function calculateSuccessRate(school, profile, score) {
    let rate = score;
    
    if (school.type === '公办') {
        const hukouDistrict = profile.household_district;
        const hukouStreet = profile.household_street;
        
        if (hukouDistrict === school.district) rate += 10;
        if (hukouStreet && school.学区 && school.学区.includes(hukouStreet.replace('街道', '').replace('镇', ''))) {
            rate += 20;
        }
    } else {
        // 民办学校考虑摇号率
        rate *= 0.8; // 摇号有不确定性
        const budget = profile.budget;
        if ((budget === 'high' && school.tuitionMax > 80000) || 
            (budget === 'medium' && school.tuitionMax <= 50000)) {
            rate += 10;
        }
    }
    
    return Math.min(95, Math.max(20, Math.round(rate)));
}

function generateMatchReasons(school, profile) {
    const reasons = [];
    
    if (school.type === '公办') {
        const hukouDistrict = profile.household_district;
        const hukouStreet = profile.household_street;
        
        if (hukouDistrict === school.district) {
            reasons.push(`📍 户籍所在区匹配（${hukouDistrict}）`);
        }
        if (hukouStreet && school.学区 && school.学区.includes(hukouStreet.replace('街道', '').replace('镇', ''))) {
            reasons.push(`🏠 户籍街道在学区内（${hukouStreet}）`);
        }
    } else {
        const budget = profile.budget;
        if (budget === 'low' && school.tuitionMax <= 30000) {
            reasons.push(`💰 学费在预算范围内`);
        } else if (budget === 'medium' && school.tuitionMax <= 100000) {
            reasons.push(`💰 学费适中符合预算`);
        } else if (budget === 'high') {
            reasons.push(`💰 高预算可承担学费`);
        }
        
        const liveDistrict = profile.residence_district;
        if (liveDistrict === school.district) {
            reasons.push(`🚗 距离较近，通勤方便`);
        }
    }
    
    // 能力匹配
    const ability = profile.ability_average;
    if (ability >= 4 && school.features?.some(f => f.includes('重点') || f.includes('优质'))) {
        reasons.push(`🎓 学生能力匹配学校水平`);
    }
    
    // 特长匹配
    const specialties = profile.specialties || [];
    if (specialties.length > 0 && school.features) {
        const matchedSpecialty = specialties.find(specialty => 
            school.features.some(f => f.toLowerCase().includes(specialty.toLowerCase()))
        );
        if (matchedSpecialty) {
            reasons.push(`✨ 特长匹配：${matchedSpecialty}`);
        }
    }
    
    return reasons.length > 0 ? reasons : ['综合评估匹配'];
}

function displaySchoolRecommendations(recommendations, profile) {
    const container = document.getElementById('schoolRecommendation') || 
                     document.getElementById('schoolResult') || 
                     document.querySelector('.container') || 
                     document.body;
    
    let html = `
        <div class="school-recommendations">
            <h2 style="color: #1a202c; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                🏫 智能学校推荐（基于本地数据库）
            </h2>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 10px 0; color: #4a5568;">📋 用户条件</h4>
                <div style="font-size: 14px; color: #718096;">
                    ${profile.household_district ? `户籍：${profile.household_district} ${profile.household_street || ''}<br>` : ''}
                    ${profile.residence_district ? `居住：${profile.residence_district} ${profile.residence_street || ''}<br>` : ''}
                    ${profile.budget ? `预算：${profile.budget === 'low' ? '经济型' : profile.budget === 'medium' ? '中等' : '高预算'}<br>` : ''}
                    ${profile.consider_private ? `民办意向：${profile.consider_private === 'yes' ? '考虑' : '不考虑'}<br>` : ''}
                    ${profile.ability_average ? `综合能力：${profile.ability_average}/5.0<br>` : ''}
                    共找到 ${recommendations.length} 所匹配学校
                </div>
            </div>
    `;
    
    if (recommendations.length === 0) {
        html += `
            <div style="text-align: center; padding: 40px 20px; background: white; border-radius: 8px; border: 2px dashed #e2e8f0;">
                <div style="font-size: 48px; margin-bottom: 20px;">🏫</div>
                <h3 style="color: #4a5568; margin-bottom: 10px;">未找到匹配学校</h3>
                <p style="color: #718096; margin-bottom: 20px;">建议检查户籍信息或放宽筛选条件</p>
                <button onclick="showStep(3)" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                    修改户籍信息
                </button>
            </div>
        `;
    } else {
        html += '<div class="school-list">';
        
        recommendations.forEach((rec, index) => {
            const school = rec.school;
            const tag = rec.tag;
            
            html += `
                <div class="school-card" style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                        <div>
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                                <h3 style="margin: 0; font-size: 18px; color: #1a202c;">${school.name}</h3>
                                <span style="background: ${school.type === '公办' ? '#1890ff' : '#722ed1'}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                                    ${school.type}
                                </span>
                            </div>
                            <div style="color: #4a5568; font-size: 14px;">
                                <span style="margin-right: 15px;">📍 ${school.district}</span>
                                <span>🎯 ${school.features ? school.features.join(' · ') : '暂无特色'}</span>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 28px; font-weight: bold; color: #1a73e8; margin-bottom: 5px;">${rec.score}</div>
                            <span style="background: ${tag.color}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                                ${tag.name}
                            </span>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                            <span style="background: #f6ffed; color: #52c41a; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 10px;">
                                📈 成功率 ${rec.successRate}%
                            </span>
                            <span style="font-size: 13px; color: #666;">${tag.description}</span>
                        </div>
                        
                        <div style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 10px;">
                            <div style="font-size: 13px; color: #4a5568; font-weight: 500; margin-bottom: 8px;">✨ 匹配理由：</div>
                            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #718096;">
                                ${rec.matchReasons.map(reason => `<li>${reason}</li>`).join('')}
                            </ul>
                        </div>
                        
                        ${school.学区 ? `
                            <div style="background: #f0f9ff; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
                                <div style="font-size: 13px; color: #1890ff; font-weight: 500; margin-bottom: 5px;">🗺️ 学区范围：</div>
                                <div style="font-size: 13px; color: #666;">${school.学区}</div>
                            </div>
                        ` : ''}
                        
                        ${school.type === '民办' ? `
                            <div style="display: flex; justify-content: space-between; align-items: center; background: #f9f0ff; padding: 10px; border-radius: 6px;">
                                <div>
                                    <div style="font-size: 13px; color: #722ed1; font-weight: 500;">💰 学费标准：</div>
                                    <div style="font-size: 13px; color: #666;">${school.tuitionMin ? `${school.tuitionMin.toLocaleString()}` : '待公布'} - ${school.tuitionMax ? `${school.tuitionMax.toLocaleString()}` : '待公布'} 元/年</div>
                                </div>
                                <span style="background: #f5222d; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                                    ⚠️ 摇号入学
                                </span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        <button onclick="askCatAssistant('请详细分析${school.name}')" style="flex: 1; background: #667eea; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                            🤖 AI深度分析
                        </button>
                        <button onclick="addToFavorites('${school.id}')" style="background: white; border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px; cursor: pointer; font-size: 14px;" title="加入收藏">
                            ⭐ 收藏
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
    }
    
    html += `
        <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #52c41a;">
            <h4 style="margin: 0 0 10px 0; color: #1a202c;">💡 推荐策略建议</h4>
            <div style="font-size: 14px; color: #4a5568; line-height: 1.6;">
                ${generateRecommendationStrategy(recommendations, profile)}
            </div>
        </div>
    </div>`;
    
    container.innerHTML = html;
}

function generateRecommendationStrategy(recommendations, profile) {
    const strategy = [];
    const publicSchools = recommendations.filter(r => r.school.type === '公办');
    const privateSchools = recommendations.filter(r => r.school.type === '民办');
    
    if (publicSchools.length > 0 && privateSchools.length > 0) {
        strategy.push('**公民办结合策略**：建议以公办学校为主，民办学校为备选。');
        strategy.push('**操作建议**：先确认公办学校录取情况，同时参加民办摇号。');
    } else if (publicSchools.length > 0) {
        strategy.push('**公办优先策略**：专注公办学校入学。');
        strategy.push('**操作建议**：确保户籍材料齐全，按时参加学区报名。');
    } else if (privateSchools.length > 0) {
        strategy.push('**民办冲刺策略**：主攻民办学校。');
        strategy.push('**操作建议**：准备充足预算，关注学校开放日和摇号时间。');
    }
    
    // 根据能力给出建议
    const ability = profile.ability_average;
    if (ability >= 4) {
        strategy.push('**能力优势**：学生综合能力优秀，可以挑战更优质学校。');
    } else if (ability >= 3) {
        strategy.push('**能力匹配**：学生能力与推荐学校匹配良好。');
    } else {
        strategy.push('**能力提升**：建议重点提升学习基础，选择管理严格的学校。');
    }
    
    return strategy.map(s => `<p style="margin: 5px 0;">${s}</p>`).join('');
}

// ========== [修复9] 智能时间线生成器 ==========
class TimelineGenerator {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth() + 1;
    }
    
    generateMultiYearPlan(userProfile, years = 3) {
        const startYear = this.currentYear;
        const targetYear = this.estimateTargetYear(userProfile);
        const plan = [];
        
        for (let i = 0; i < years; i++) {
            const year = startYear + i;
            const yearsLeft = targetYear - year;
            
            const milestones = this.generateMilestones(year, yearsLeft, userProfile);
            const materials = this.generateMaterials(year, yearsLeft, userProfile);
            const actions = this.generateActions(year, yearsLeft, userProfile);
            
            plan.push({
                year: year,
                yearsLeft: yearsLeft,
                phase: this.getPhase(yearsLeft),
                milestones: milestones,
                materials: materials,
                actions: actions
            });
        }
        
        return {
            targetYear: targetYear,
            currentPhase: this.getPhase(targetYear - startYear),
            totalYears: years,
            plan: plan
        };
    }
    
    estimateTargetYear(userProfile) {
        const grade = userProfile.current_grade || userProfile.grade || '六年级';
        
        const gradeMap = {
            '六年级': this.currentYear + 1,
            '五年级': this.currentYear + 2,
            '四年级': this.currentYear + 3,
            '三年级': this.currentYear + 4,
            '二年级': this.currentYear + 5,
            '一年级': this.currentYear + 6
        };
        
        return gradeMap[grade] || this.currentYear + 1;
    }
    
    getPhase(yearsLeft) {
        if (yearsLeft > 2) return '准备期';
        if (yearsLeft === 2) return '规划期';
        if (yearsLeft === 1) return '冲刺期';
        if (yearsLeft === 0) return '录取期';
        return '已完成';
    }
    
    generateMilestones(year, yearsLeft, userProfile) {
        const milestones = [];
        
        if (yearsLeft > 2) {
            // 准备期
            milestones.push(`夯实语文、数学、英语学科基础`);
            milestones.push(`培养良好的学习习惯`);
            milestones.push(`参加兴趣班，发展特长`);
            
            if (userProfile.specialties && userProfile.specialties.length > 0) {
                milestones.push(`重点培养${userProfile.specialties.join('、')}特长`);
            }
        } else if (yearsLeft === 2) {
            // 规划期
            milestones.push(`了解各区学校信息和招生政策`);
            milestones.push(`初步筛选目标学校`);
            milestones.push(`关注学校开放日和咨询会`);
            
            if (userProfile.consider_private === 'yes') {
                milestones.push(`了解民办学校招生要求和学费`);
            }
        } else if (yearsLeft === 1) {
            // 冲刺期
            milestones.push(`核查户籍、房产等入学材料`);
            milestones.push(`准备报名所需的各种证明`);
            milestones.push(`参加学校模拟面试或测评`);
            milestones.push(`关注教育局官方通知`);
            
            const currentMonth = this.currentMonth;
            if (currentMonth >= 1 && currentMonth <= 3) milestones.push(`参加学校开放日`);
            if (currentMonth >= 4 && currentMonth <= 6) milestones.push(`网上报名准备`);
            if (currentMonth >= 7) milestones.push(`关注录取结果`);
        } else if (yearsLeft === 0) {
            // 录取期
            milestones.push(`确认录取结果`);
            milestones.push(`办理入学手续`);
            milestones.push(`准备新生报到`);
            milestones.push(`适应新学校环境`);
        }
        
        return milestones;
    }
    
    generateMaterials(year, yearsLeft, userProfile) {
        const materials = [];
        
        if (yearsLeft >= 1) {
            materials.push(`户口本原件及复印件`);
            materials.push(`房产证或购房合同（如有）`);
            materials.push(`学生一寸照片若干`);
            
            if (userProfile.household_district !== userProfile.residence_district) {
                materials.push(`居住证或租房合同`);
            }
            
            if (yearsLeft <= 1) {
                materials.push(`学生学籍信息表`);
                materials.push(`预防接种证明`);
                materials.push(`体检报告`);
            }
        }
        
        return materials;
    }
    
    generateActions(year, yearsLeft, userProfile) {
        const actions = [];
        
        if (yearsLeft >= 2) {
            actions.push(`每月检查学习进度`);
            actions.push(`每学期参加家长会`);
            actions.push(`关注教育局官网政策变化`);
        }
        
        if (yearsLeft === 1) {
            actions.push(`每月核对一次报名材料`);
            actions.push(`关注目标学校官网动态`);
            actions.push(`参加学校组织的咨询活动`);
        }
        
        return actions;
    }
    
    renderTimeline(timelineData) {
        let html = `
            <div class="timeline-container">
                <div class="timeline-header">
                    <h3>📅 ${timelineData.targetYear}年小升初时间规划</h3>
                    <div class="timeline-summary">
                        当前阶段：<span class="phase-badge">${timelineData.currentPhase}</span>
                        距目标年：<span class="years-badge">${timelineData.targetYear - this.currentYear}年</span>
                    </div>
                </div>
                
                <div class="timeline-content">
        `;
        
        timelineData.plan.forEach((yearPlan, index) => {
            const isCurrent = yearPlan.year === this.currentYear;
            const isTarget = yearPlan.year === timelineData.targetYear;
            
            html += `
                <div class="timeline-year ${isCurrent ? 'current-year' : ''} ${isTarget ? 'target-year' : ''}">
                    <div class="year-header">
                        <div class="year-title">
                            <span class="year-number">${yearPlan.year}年</span>
                            ${isCurrent ? '<span class="current-label">当前</span>' : ''}
                            ${isTarget ? '<span class="target-label">目标入学年</span>' : ''}
                        </div>
                        <div class="year-info">
                            阶段：${yearPlan.phase} | 距目标：${yearPlan.yearsLeft}年
                        </div>
                    </div>
                    
                    <div class="year-content">
                        <div class="milestones-section">
                            <h4>📌 关键节点</h4>
                            <ul>
                                ${yearPlan.milestones.map(m => `<li>${m}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="materials-section">
                            <h4>📄 材料准备</h4>
                            <ul>
                                ${yearPlan.materials.map(m => `<li>${m}</li>`).join('')}
                            </ul>
                        </div>
                        
                        ${yearPlan.actions.length > 0 ? `
                            <div class="actions-section">
                                <h4>🎯 行动建议</h4>
                                <ul>
                                    ${yearPlan.actions.map(a => `<li>${a}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
            
            <style>
                .timeline-container {
                    background: white;
                    border-radius: 12px;
                    padding: 25px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                }
                .timeline-header {
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #e2e8f0;
                }
                .timeline-header h3 {
                    margin: 0 0 10px 0;
                    color: #1a202c;
                    font-size: 20px;
                }
                .timeline-summary {
                    display: flex;
                    gap: 20px;
                    font-size: 14px;
                    color: #4a5568;
                }
                .phase-badge, .years-badge {
                    background: #f0f9ff;
                    color: #1890ff;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-weight: bold;
                    margin-left: 5px;
                }
                .years-badge {
                    background: #f6ffed;
                    color: #52c41a;
                }
                .timeline-year {
                    margin-bottom: 20px;
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }
                .timeline-year.current-year {
                    border-left: 4px solid #1890ff;
                    background: #f0f9ff;
                }
                .timeline-year.target-year {
                    border-left: 4px solid #52c41a;
                    background: #f6ffed;
                }
                .year-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #e2e8f0;
                }
                .year-title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .year-number {
                    font-size: 18px;
                    font-weight: bold;
                    color: #1a202c;
                }
                .current-label, .target-label {
                    font-size: 12px;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-weight: bold;
                }
                .current-label {
                    background: #1890ff;
                    color: white;
                }
                .target-label {
                    background: #52c41a;
                    color: white;
                }
                .year-info {
                    font-size: 13px;
                    color: #718096;
                }
                .year-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                }
                .milestones-section h4,
                .materials-section h4,
                .actions-section h4 {
                    margin: 0 0 10px 0;
                    color: #4a5568;
                    font-size: 15px;
                }
                .milestones-section ul,
                .materials-section ul,
                .actions-section ul {
                    margin: 0;
                    padding-left: 20px;
                    font-size: 14px;
                    color: #718096;
                    line-height: 1.6;
                }
                .milestones-section li {
                    margin-bottom: 5px;
                }
            </style>
        `;
        
        return html;
    }
}

// ========== [修复10] 个性化政策分析引擎 ==========
class PolicyAnalyzer {
    constructor() {
        this.policies = {
            // 2025年西安小升初主要政策
            admission_priority: [
                { level: 1, description: '房户一致：户籍与房产均在学区', requirements: ['户口本', '房产证'] },
                { level: 2, description: '集体户：父母为集体户，子女随迁', requirements: ['集体户口证明', '居住证明'] },
                { level: 3, description: '优抚对象：军人、消防员、公安英烈等子女', requirements: ['相关证明文件'] },
                { level: 4, description: '挂靠户：挂靠祖父母、外祖父母', requirements: ['户口本', '亲属关系证明'] },
                { level: 5, description: '随迁子女：父母持有居住证', requirements: ['居住证', '务工证明'] },
                { level: 6, description: '其他特殊情况', requirements: ['情况说明', '相关证明'] }
            ],
            
            private_school_rules: {
                lottery: true,
                lottery_date: '2025年7月下旬',
                application_period: '2025年6月15日-7月15日',
                requirements: ['户口本', '身份证', '报名表'],
                restrictions: '每人限报2所民办学校'
            },
            
            public_school_rules: {
                registration_date: '2025年8月1日-8月10日',
                document_verification: '2025年8月15日前',
                admission_notice: '2025年8月25日前',
                requirements: ['户口本', '房产证/租房合同', '学籍证明']
            },
            
            special_policies: {
                talent_students: '特长生需参加学校专业测试',
                disabled_students: '残疾学生享有同等入学权利',
                returned_students: '外地返回学生需提供转学证明'
            }
        };
    }
    
    analyzeUserSituation(userProfile) {
        const analysis = {
            admissionPriority: this.calculateAdmissionPriority(userProfile),
            policyCompliance: this.checkPolicyCompliance(userProfile),
            risks: this.identifyRisks(userProfile),
            recommendations: this.generateRecommendations(userProfile),
            deadlines: this.getImportantDeadlines(userProfile)
        };
        
        return analysis;
    }
    
    calculateAdmissionPriority(userProfile) {
        const hukouDistrict = userProfile.household_district;
        const residenceDistrict = userProfile.residence_district;
        const hukouStreet = userProfile.household_street;
        const residenceStreet = userProfile.residence_street;
        const propertyType = userProfile.property_type;
        const residenceType = userProfile.residence_type;
        
        let priority = { level: 6, description: '其他情况' };
        
        // 房户一致
        if (hukouDistrict && residenceDistrict && 
            hukouDistrict === residenceDistrict &&
            hukouStreet && residenceStreet &&
            hukouStreet === residenceStreet &&
            propertyType && propertyType.includes('自有')) {
            priority = { level: 1, description: '房户一致（第一顺位）' };
        }
        // 户籍在学区，居住不一致
        else if (hukouDistrict && propertyType && propertyType.includes('自有')) {
            priority = { level: 2, description: '户籍在学区（第二顺位）' };
        }
        // 集体户
        else if (residenceType && residenceType.includes('集体')) {
            priority = { level: 3, description: '集体户口（第三顺位）' };
        }
        // 租房
        else if (residenceType && residenceType.includes('租')) {
            priority = { level: 4, description: '租房居住（第四顺位）' };
        }
        // 随迁子女
        else if (!hukouDistrict || hukouDistrict.includes('外地')) {
            priority = { level: 5, description: '随迁子女（第五顺位）' };
        }
        
        return priority;
    }
    
    checkPolicyCompliance(userProfile) {
        const issues = [];
        const warnings = [];
        
        // 检查户籍信息
        if (!userProfile.household_district) {
            issues.push('❌ 未填写户籍所在区');
        }
        
        if (!userProfile.household_street) {
            warnings.push('⚠️ 未填写户籍所在街道（影响公办学校精准匹配）');
        }
        
        // 检查居住信息
        if (!userProfile.residence_district) {
            issues.push('❌ 未填写实际居住区');
        }
        
        // 检查房产信息（如果考虑公办）
        if (userProfile.consider_private !== 'yes' && !userProfile.property_type) {
            warnings.push('⚠️ 未填写房产情况（公办入学重要信息）');
        }
        
        // 检查预算（如果考虑民办）
        if (userProfile.consider_private === 'yes' && !userProfile.budget) {
            warnings.push('⚠️ 未填写预算范围（民办学校选择重要依据）');
        }
        
        return { issues, warnings, isCompliant: issues.length === 0 };
    }
    
    identifyRisks(userProfile) {
        const risks = [];
        
        // 户籍风险
        if (!userProfile.household_district) {
            risks.push({ level: 'high', description: '无户籍信息，无法确定公办入学资格' });
        } else if (userProfile.household_district.includes('外地')) {
            risks.push({ level: 'medium', description: '外地户籍，公办入学为统筹安排' });
        }
        
        // 房产风险
        if (userProfile.property_type && userProfile.property_type.includes('租')) {
            risks.push({ level: 'medium', description: '租房居住，公办入学顺位较低' });
        }
        
        // 民办风险
        if (userProfile.consider_private === 'yes') {
            risks.push({ level: 'high', description: '民办学校摇号录取，存在不确定性' });
            
            if (userProfile.budget === 'low') {
                risks.push({ level: 'medium', description: '预算有限，民办学校选择范围小' });
            }
        }
        
        // 能力风险
        if (userProfile.ability_average && userProfile.ability_average < 3) {
            risks.push({ level: 'medium', description: '综合能力有待提升，可能影响学校选择' });
        }
        
        return risks;
    }
    
    generateRecommendations(userProfile) {
        const recommendations = [];
        
        // 户籍相关建议
        if (userProfile.household_district && userProfile.residence_district &&
            userProfile.household_district === userProfile.residence_district) {
            recommendations.push('✅ **户籍居住一致**：您的情况属于最佳入学条件，建议优先考虑公办学校');
        } else if (userProfile.household_district && userProfile.residence_district) {
            recommendations.push('📌 **户籍居住不一致**：建议准备房产证或租房合同等相关证明');
        }
        
        // 民办相关建议
        if (userProfile.consider_private === 'yes') {
            recommendations.push('🎯 **民办意向**：建议准备2-3所目标学校，了解各校摇号历史数据');
            
            if (userProfile.budget === 'low') {
                recommendations.push('💰 **预算建议**：经济型预算，建议关注学费3万/年以下的民办学校');
            } else if (userProfile.budget === 'medium') {
                recommendations.push('💰 **预算建议**：中等预算，可选择范围较广，建议结合学校特色选择');
            } else if (userProfile.budget === 'high') {
                recommendations.push('💰 **预算建议**：高预算，可考虑顶尖民办学校，关注学校教学质量');
            }
        }
        
        // 能力相关建议
        if (userProfile.ability_average) {
            if (userProfile.ability_average >= 4) {
                recommendations.push('🎓 **能力优势**：学生综合能力优秀，可以挑战优质学校');
            } else if (userProfile.ability_average >= 3) {
                recommendations.push('🎓 **能力匹配**：学生能力中等，建议选择匹配度高的学校');
            } else {
                recommendations.push('🎓 **能力提升**：建议加强基础学习，选择管理严格的学校');
            }
        }
        
        // 时间建议
        const currentMonth = new Date().getMonth() + 1;
        if (currentMonth >= 1 && currentMonth <= 3) {
            recommendations.push('⏰ **时间提醒**：现在是了解学校、参加开放日的好时机');
        } else if (currentMonth >= 4 && currentMonth <= 6) {
            recommendations.push('⏰ **时间提醒**：报名季即将开始，请准备好所有材料');
        } else if (currentMonth >= 7) {
            recommendations.push('⏰ **时间提醒**：录取季，请及时关注录取结果');
        }
        
        return recommendations;
    }
    
    getImportantDeadlines(userProfile) {
        const currentYear = new Date().getFullYear();
        const isTargetYear = userProfile.current_grade === '六年级';
        
        const deadlines = [
            { date: `${currentYear}-03-15`, event: '各区发布义务教育招生入学政策', important: true },
            { date: `${currentYear}-04-01`, event: '学校开放日开始', important: true },
            { date: `${currentYear}-05-15`, event: '公布学区划分方案', important: true },
            { date: `${currentYear}-06-15`, event: '民办学校网上报名开始', important: isTargetYear },
            { date: `${currentYear}-07-15`, event: '民办学校报名截止', important: isTargetYear },
            { date: `${currentYear}-07-25`, event: '民办学校摇号录取', important: isTargetYear },
            { date: `${currentYear}-08-01`, event: '公办学校登记报名', important: true },
            { date: `${currentYear}-08-10`, event: '公办学校登记截止', important: true },
            { date: `${currentYear}-08-25`, event: '发放录取通知书', important: true },
            { date: `${currentYear}-09-01`, event: '新生报到', important: true }
        ];
        
        // 过滤出重要或与用户相关的截止日期
        return deadlines.filter(d => d.important);
    }
    
    renderPolicyAnalysis(analysis) {
        let html = `
            <div class="policy-analysis">
                <div class="analysis-header">
                    <h3>📋 个性化政策分析与建议</h3>
                    <div class="priority-display">
                        <span class="priority-label">入学顺位：</span>
                        <span class="priority-value ${analysis.admissionPriority.level <= 2 ? 'high-priority' : 'medium-priority'}">
                            ${analysis.admissionPriority.description}
                        </span>
                    </div>
                </div>
                
                <div class="compliance-section">
                    <h4>✅ 政策合规性检查</h4>
                    ${analysis.policyCompliance.isCompliant ? 
                        '<div class="compliance-pass">🎉 所有必填信息完整，符合报名要求</div>' : 
                        '<div class="compliance-fail">⚠️ 部分信息缺失，请补充</div>'
                    }
                    
                    ${analysis.policyCompliance.issues.length > 0 ? `
                        <div class="issues-list">
                            <h5>需要解决的问题：</h5>
                            <ul>
                                ${analysis.policyCompliance.issues.map(issue => `<li>${issue}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${analysis.policyCompliance.warnings.length > 0 ? `
                        <div class="warnings-list">
                            <h5>注意事项：</h5>
                            <ul>
                                ${analysis.policyCompliance.warnings.map(warning => `<li>${warning}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
                
                ${analysis.risks.length > 0 ? `
                    <div class="risks-section">
                        <h4>⚠️ 风险评估</h4>
                        <div class="risks-grid">
                            ${analysis.risks.map(risk => `
                                <div class="risk-item risk-${risk.level}">
                                    <div class="risk-level">${risk.level === 'high' ? '高风险' : '中风险'}</div>
                                    <div class="risk-description">${risk.description}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="recommendations-section">
                    <h4>💡 个性化建议</h4>
                    <div class="recommendations-list">
                        ${analysis.recommendations.map(rec => `
                            <div class="recommendation-item">${rec}</div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="deadlines-section">
                    <h4>⏰ 重要时间节点</h4>
                    <div class="deadlines-timeline">
                        ${analysis.deadlines.map(deadline => `
                            <div class="deadline-item">
                                <div class="deadline-date">${deadline.date}</div>
                                <div class="deadline-event">${deadline.event}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <style>
                .policy-analysis {
                    background: white;
                    border-radius: 12px;
                    padding: 25px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                }
                .analysis-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #e2e8f0;
                }
                .analysis-header h3 {
                    margin: 0;
                    color: #1a202c;
                }
                .priority-display {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .priority-label {
                    font-size: 14px;
                    color: #718096;
                }
                .priority-value {
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: bold;
                }
                .high-priority {
                    background: #f6ffed;
                    color: #52c41a;
                    border: 1px solid #b7eb8f;
                }
                .medium-priority {
                    background: #fff7e6;
                    color: #fa8c16;
                    border: 1px solid #ffd591;
                }
                .compliance-section,
                .risks-section,
                .recommendations-section,
                .deadlines-section {
                    margin-bottom: 25px;
                }
                .compliance-section h4,
                .risks-section h4,
                .recommendations-section h4,
                .deadlines-section h4 {
                    margin: 0 0 15px 0;
                    color: #4a5568;
                    font-size: 16px;
                }
                .compliance-pass {
                    background: #f6ffed;
                    color: #52c41a;
                    padding: 12px;
                    border-radius: 8px;
                    border: 1px solid #b7eb8f;
                    margin-bottom: 15px;
                }
                .compliance-fail {
                    background: #fff2f0;
                    color: #ff4d4f;
                    padding: 12px;
                    border-radius: 8px;
                    border: 1px solid #ffccc7;
                    margin-bottom: 15px;
                }
                .issues-list,
                .warnings-list {
                    margin-top: 15px;
                }
                .issues-list h5,
                .warnings-list h5 {
                    margin: 0 0 10px 0;
                    color: #ff4d4f;
                    font-size: 14px;
                }
                .warnings-list h5 {
                    color: #fa8c16;
                }
                .issues-list ul,
                .warnings-list ul {
                    margin: 0;
                    padding-left: 20px;
                    font-size: 14px;
                    color: #666;
                }
                .risks-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 15px;
                }
                .risk-item {
                    padding: 15px;
                    border-radius: 8px;
                    border: 1px solid;
                }
                .risk-high {
                    background: #fff2f0;
                    border-color: #ffccc7;
                }
                .risk-medium {
                    background: #fff7e6;
                    border-color: #ffd591;
                }
                .risk-level {
                    font-size: 12px;
                    font-weight: bold;
                    margin-bottom: 8px;
                    padding: 2px 8px;
                    border-radius: 12px;
                    display: inline-block;
                }
                .risk-high .risk-level {
                    background: #ff4d4f;
                    color: white;
                }
                .risk-medium .risk-level {
                    background: #fa8c16;
                    color: white;
                }
                .risk-description {
                    font-size: 14px;
                    color: #666;
                }
                .recommendations-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .recommendation-item {
                    padding: 12px;
                    background: #f0f9ff;
                    border-radius: 8px;
                    border-left: 4px solid #1890ff;
                    font-size: 14px;
                    line-height: 1.5;
                }
                .deadlines-timeline {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .deadline-item {
                    display: flex;
                    padding: 12px;
                    background: #f8fafc;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }
                .deadline-date {
                    min-width: 100px;
                    font-weight: bold;
                    color: #1890ff;
                }
                .deadline-event {
                    flex: 1;
                    color: #4a5568;
                }
            </style>
        `;
        
        return html;
    }
}

// ========== [修复7] 结构化中文专业报告 ==========
class ProfessionalReportGenerator {
    constructor() {
        this.reportData = {};
    }
    
    async generateFullReport() {
        console.log('📄 开始生成专业报告...');
        
        // 收集所有数据
        await this.collectAllData();
        
        // 生成报告HTML
        const reportHTML = this.generateReportHTML();
        
        // 显示报告
        this.displayReport(reportHTML);
        
        // 保存报告数据
        this.saveReportData();
        
        return reportHTML;
    }
    
    async collectAllData() {
        // 用户信息
        this.reportData.user = getUserMemory();
        this.reportData.completeProfile = getCompleteUserContext();
        
        // 学校推荐
        this.reportData.recommendations = JSON.parse(
            localStorage.getItem('XA_SCHOOL_RECOMMENDATIONS') || '[]'
        );
        
        if (this.reportData.recommendations.length === 0) {
            this.reportData.recommendations = await renderSchoolRecommendations();
        }
        
        // 时间规划
        const timelineGenerator = new TimelineGenerator();
        this.reportData.timeline = timelineGenerator.generateMultiYearPlan(
            this.reportData.user, 3
        );
        
        // 政策分析
        const policyAnalyzer = new PolicyAnalyzer();
        this.reportData.policyAnalysis = policyAnalyzer.analyzeUserSituation(
            this.reportData.user
        );
        
        // 能力分析
        this.reportData.abilityAnalysis = await this.generateAbilityAnalysis();
        
        // 报告元数据
        this.reportData.metadata = {
            generatedAt: new Date().toLocaleString('zh-CN'),
            reportId: `XA_${Date.now()}`,
            version: '2025增强版',
            dataSource: '西安市教育局2025年招生数据'
        };
    }
    
    async generateAbilityAnalysis() {
        const userProfile = getUserMemory();
        const scores = userProfile.ability_scores || {};
        
        const analysis = {
            overall: {
                average: userProfile.ability_average || 0,
                stars: userProfile.ability_stars || '',
                rank: userProfile.rank_estimate || ''
            },
            dimensions: {},
            strengths: [],
            weaknesses: [],
            recommendations: []
        };
        
        // 分析各个维度
        if (scores) {
            Object.entries(scores).forEach(([dimension, data]) => {
                const score = data.得分 || 3;
                analysis.dimensions[dimension] = {
                    score: score,
                    description: data.描述 || '',
                    level: score >= 4 ? '优秀' : score >= 3 ? '良好' : '需提升'
                };
                
                if (score >= 4) analysis.strengths.push(dimension);
                if (score <= 3) analysis.weaknesses.push(dimension);
            });
        }
        
        // 生成建议
        if (analysis.overall.average >= 4) {
            analysis.recommendations.push('学生综合能力优秀，建议挑战优质学校');
            analysis.recommendations.push('继续保持优势，同时注意全面发展');
        } else if (analysis.overall.average >= 3) {
            analysis.recommendations.push('学生能力良好，有提升空间');
            analysis.recommendations.push('建议重点提升短板科目');
        } else {
            analysis.recommendations.push('建议加强基础学习，制定提升计划');
            analysis.recommendations.push('选择学风良好、管理严格的学校');
        }
        
        if (analysis.strengths.length > 0) {
            analysis.recommendations.push(`发挥${analysis.strengths.join('、')}优势`);
        }
        if (analysis.weaknesses.length > 0) {
            analysis.recommendations.push(`重点提升${analysis.weaknesses.join('、')}`);
        }
        
        return analysis;
    }
    
    generateReportHTML() {
        const data = this.reportData;
        
        let html = `
            <!DOCTYPE html>
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>西安小升初个性化评估报告 - ${data.metadata.generatedAt}</title>
                <style>
                    body {
                        font-family: 'Microsoft YaHei', 'SimSun', sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 20px;
                        background: #f8f9fa;
                    }
                    .report-container {
                        max-width: 900px;
                        margin: 0 auto;
                        background: white;
                        border-radius: 12px;
                        box-shadow: 0 5px 30px rgba(0,0,0,0.1);
                        overflow: hidden;
                    }
                    .report-header {
                        background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
                        color: white;
                        padding: 40px 30px;
                        text-align: center;
                    }
                    .report-title {
                        font-size: 28px;
                        font-weight: bold;
                        margin: 0 0 10px 0;
                    }
                    .report-subtitle {
                        font-size: 16px;
                        opacity: 0.9;
                        margin: 0 0 20px 0;
                    }
                    .report-meta {
                        display: flex;
                        justify-content: center;
                        gap: 30px;
                        font-size: 14px;
                        opacity: 0.8;
                    }
                    .section {
                        padding: 30px;
                        border-bottom: 1px solid #eaeaea;
                    }
                    .section:last-child {
                        border-bottom: none;
                    }
                    .section-title {
                        font-size: 20px;
                        color: #1a237e;
                        margin: 0 0 20px 0;
                        padding-bottom: 10px;
                        border-bottom: 2px solid #eaeaea;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .section-title i {
                        font-size: 24px;
                    }
                    .info-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                        margin-bottom: 20px;
                    }
                    .info-card {
                        background: #f8f9fa;
                        padding: 20px;
                        border-radius: 8px;
                        border-left: 4px solid #1a237e;
                    }
                    .info-card h4 {
                        margin: 0 0 10px 0;
                        color: #333;
                        font-size: 16px;
                    }
                    .info-card p {
                        margin: 5px 0;
                        font-size: 14px;
                        color: #666;
                    }
                    .school-card {
                        background: white;
                        border: 1px solid #eaeaea;
                        border-radius: 8px;
                        padding: 20px;
                        margin-bottom: 20px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    }
                    .school-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 15px;
                    }
                    .school-name {
                        font-size: 18px;
                        font-weight: bold;
                        color: #333;
                        margin: 0;
                    }
                    .school-type {
                        background: #1a237e;
                        color: white;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 12px;
                    }
                    .match-score {
                        font-size: 24px;
                        font-weight: bold;
                        color: #1a73e8;
                        text-align: right;
                    }
                    .tag {
                        display: inline-block;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: bold;
                        margin-right: 10px;
                    }
                    .tag-steady { background: #4caf50; color: white; }
                    .tag-match { background: #2196f3; color: white; }
                    .tag-challenge { background: #ff9800; color: white; }
                    .tag-safe { background: #f44336; color: white; }
                    .timeline-year {
                        margin-bottom: 30px;
                        padding: 20px;
                        background: #f8f9fa;
                        border-radius: 8px;
                        border-left: 4px solid #1a237e;
                    }
                    .year-title {
                        font-size: 18px;
                        font-weight: bold;
                        color: #1a237e;
                        margin: 0 0 15px 0;
                    }
                    .policy-item {
                        background: #f0f9ff;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 15px;
                        border-left: 4px solid #1890ff;
                    }
                    .risk-item {
                        background: #fff2f0;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 15px;
                        border-left: 4px solid #ff4d4f;
                    }
                    .recommendation-item {
                        background: #f6ffed;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 15px;
                        border-left: 4px solid #52c41a;
                    }
                    .footer {
                        text-align: center;
                        padding: 20px;
                        background: #f8f9fa;
                        color: #666;
                        font-size: 12px;
                        border-top: 1px solid #eaeaea;
                    }
                    @media print {
                        body {
                            background: white;
                            padding: 0;
                        }
                        .report-container {
                            box-shadow: none;
                            margin: 0;
                        }
                        .no-print {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="report-container">
                    <div class="report-header">
                        <h1 class="report-title">西安小升初个性化评估报告</h1>
                        <p class="report-subtitle">基于西安市2025年招生政策与真实学校数据库</p>
                        <div class="report-meta">
                            <span>生成时间：${data.metadata.generatedAt}</span>
                            <span>报告编号：${data.metadata.reportId}</span>
                            <span>数据来源：${data.metadata.dataSource}</span>
                        </div>
                    </div>
                    
                    <!-- 学生基本信息 -->
                    <div class="section">
                        <h2 class="section-title">👤 学生基本信息</h2>
                        <div class="info-grid">
                            <div class="info-card">
                                <h4>个人资料</h4>
                                <p><strong>姓名：</strong>${data.user.student_name || '未填写'}</p>
                                <p><strong>年级：</strong>${data.user.current_grade || '未填写'}</p>
                                <p><strong>性别：</strong>${data.user.student_gender || '未填写'}</p>
                                <p><strong>现读学校：</strong>${data.user.current_school || '未填写'}</p>
                            </div>
                            <div class="info-card">
                                <h4>户籍信息</h4>
                                <p><strong>户籍所在区：</strong>${data.user.household_district || '未填写'}</p>
                                <p><strong>户籍街道：</strong>${data.user.household_street || '未填写'}</p>
                                <p><strong>实际居住区：</strong>${data.user.residence_district || '未填写'}</p>
                                <p><strong>居住街道：</strong>${data.user.residence_street || '未填写'}</p>
                            </div>
                            <div class="info-card">
                                <h4>家庭情况</h4>
                                <p><strong>房产情况：</strong>${data.user.property_situation || '未填写'}</p>
                                <p><strong>房产类型：</strong>${data.user.property_type || '未填写'}</p>
                                <p><strong>民办意向：</strong>${data.user.consider_private === 'yes' ? '考虑' : '不考虑'}</p>
                                <p><strong>预算范围：</strong>${data.user.budget === 'low' ? '经济型' : data.user.budget === 'medium' ? '中等' : '高预算'}</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 能力评估 -->
                    <div class="section">
                        <h2 class="section-title">📊 能力评估分析</h2>
                        <div class="info-grid">
                            <div class="info-card">
                                <h4>总体评价</h4>
                                <p><strong>综合评分：</strong>${data.abilityAnalysis.overall.average || 0}/5.0</p>
                                <p><strong>星级评价：</strong>${data.abilityAnalysis.overall.stars || '未评级'}</p>
                                <p><strong>预估位次：</strong>${data.abilityAnalysis.overall.rank || '未估算'}</p>
                            </div>
                            ${data.abilityAnalysis.strengths.length > 0 ? `
                                <div class="info-card">
                                    <h4>优势项目</h4>
                                    ${data.abilityAnalysis.strengths.map(strength => `
                                        <p>✅ ${strength}</p>
                                    `).join('')}
                                </div>
                            ` : ''}
                            ${data.abilityAnalysis.weaknesses.length > 0 ? `
                                <div class="info-card">
                                    <h4>待提升项目</h4>
                                    ${data.abilityAnalysis.weaknesses.map(weakness => `
                                        <p>📈 ${weakness}</p>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                        
                        ${data.abilityAnalysis.recommendations.length > 0 ? `
                            <div style="margin-top: 20px;">
                                <h4>能力提升建议：</h4>
                                ${data.abilityAnalysis.recommendations.map(rec => `
                                    <div class="recommendation-item">${rec}</div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- 学校推荐 -->
                    <div class="section">
                        <h2 class="section-title">🏫 智能学校推荐</h2>
                        <p style="color: #666; margin-bottom: 20px;">
                            基于您的户籍信息、家庭情况和能力评估，系统为您推荐以下 ${data.recommendations.length} 所学校：
                        </p>
                        
                        ${data.recommendations.map((rec, index) => {
                            const school = rec.school;
                            const tagClass = rec.tag.name === '稳妥校' ? 'tag-steady' : 
                                           rec.tag.name === '匹配校' ? 'tag-match' :
                                           rec.tag.name === '冲刺校' ? 'tag-challenge' : 'tag-safe';
                            
                            return `
                                <div class="school-card">
                                    <div class="school-header">
                                        <div>
                                            <h3 class="school-name">${index + 1}. ${school.name}</h3>
                                            <div style="margin-top: 5px;">
                                                <span class="school-type">${school.type}</span>
                                                <span class="tag ${tagClass}">${rec.tag.name}</span>
                                                <span style="color: #666; font-size: 14px;">📍 ${school.district}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="match-score">${rec.score}</div>
                                            <div style="text-align: right; font-size: 12px; color: #666;">
                                                成功率 ${rec.successRate}%
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div style="margin: 15px 0;">
                                        <strong>学校特色：</strong>
                                        <span style="color: #666;">${school.features ? school.features.join(' · ') : '暂无特色'}</span>
                                    </div>
                                    
                                    ${school.学区 ? `
                                        <div style="margin: 15px 0; padding: 10px; background: #f8f9fa; border-radius: 4px;">
                                            <strong>学区范围：</strong>
                                            <div style="color: #666; font-size: 14px; margin-top: 5px;">${school.学区}</div>
                                        </div>
                                    ` : ''}
                                    
                                    <div style="margin: 15px 0;">
                                        <strong>匹配理由：</strong>
                                        <ul style="color: #666; margin: 10px 0; padding-left: 20px;">
                                            ${rec.matchReasons.map(reason => `<li>${reason}</li>`).join('')}
                                        </ul>
                                    </div>
                                    
                                    ${school.type === '民办' ? `
                                        <div style="margin: 15px 0; padding: 10px; background: #fff7e6; border-radius: 4px;">
                                            <strong>💰 学费标准：</strong>
                                            <span style="color: #666;">${school.tuitionMin ? `${school.tuitionMin.toLocaleString()}` : '待公布'} - ${school.tuitionMax ? `${school.tuitionMax.toLocaleString()}` : '待公布'} 元/年</span>
                                            <span style="margin-left: 10px; color: #fa8c16; font-weight: bold;">⚡ 摇号入学</span>
                                        </div>
                                    ` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <!-- 时间规划 -->
                    <div class="section">
                        <h2 class="section-title">📅 升学时间规划</h2>
                        <p style="color: #666; margin-bottom: 20px;">
                            目标入学年：<strong>${data.timeline.targetYear}</strong> | 
                            当前阶段：<strong>${data.timeline.currentPhase}</strong>
                        </p>
                        
                        ${data.timeline.plan.map(yearPlan => `
                            <div class="timeline-year">
                                <h3 class="year-title">${yearPlan.year}年（${yearPlan.phase}）</h3>
                                
                                <div style="margin-bottom: 15px;">
                                    <strong>关键节点：</strong>
                                    <ul style="color: #666; margin: 10px 0; padding-left: 20px;">
                                        ${yearPlan.milestones.map(m => `<li>${m}</li>`).join('')}
                                    </ul>
                                </div>
                                
                                <div style="margin-bottom: 15px;">
                                    <strong>材料准备：</strong>
                                    <ul style="color: #666; margin: 10px 0; padding-left: 20px;">
                                        ${yearPlan.materials.map(m => `<li>${m}</li>`).join('')}
                                    </ul>
                                </div>
                                
                                ${yearPlan.actions.length > 0 ? `
                                    <div>
                                        <strong>行动建议：</strong>
                                        <ul style="color: #666; margin: 10px 0; padding-left: 20px;">
                                            ${yearPlan.actions.map(a => `<li>${a}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- 政策分析与建议 -->
                    <div class="section">
                        <h2 class="section-title">📋 政策分析与建议</h2>
                        
                        <div class="policy-item">
                            <h4 style="margin: 0 0 10px 0;">入学顺位分析</h4>
                            <p style="margin: 0; color: #666;">
                                <strong>${data.policyAnalysis.admissionPriority.description}</strong>
                            </p>
                        </div>
                        
                        ${data.policyAnalysis.risks.length > 0 ? `
                            <div style="margin: 20px 0;">
                                <h4>风险评估</h4>
                                ${data.policyAnalysis.risks.map(risk => `
                                    <div class="risk-item">
                                        <strong>${risk.level === 'high' ? '高风险' : '中风险'}：</strong>
                                        ${risk.description}
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        <div style="margin: 20px 0;">
                            <h4>个性化建议</h4>
                            ${data.policyAnalysis.recommendations.map(rec => `
                                <div class="recommendation-item">${rec}</div>
                            `).join('')}
                        </div>
                        
                        ${data.policyAnalysis.deadlines.length > 0 ? `
                            <div style="margin: 20px 0;">
                                <h4>重要时间节点</h4>
                                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                    ${data.policyAnalysis.deadlines.map(deadline => `
                                        <div style="display: flex; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eaeaea;">
                                            <div style="min-width: 120px; font-weight: bold; color: #1a237e;">${deadline.date}</div>
                                            <div style="flex: 1; color: #666;">${deadline.event}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="footer">
                        <p>© 2025 西安小升初智能评估系统</p>
                        <p>本报告基于西安市教育局官方数据生成，仅供参考。具体入学政策以当年官方发布为准。</p>
                        <p>报告编号：${data.metadata.reportId} | 生成时间：${data.metadata.generatedAt}</p>
                    </div>
                </div>
                
                <div class="no-print" style="text-align: center; margin-top: 20px; padding: 20px;">
                    <button onclick="window.print()" style="background: #1a237e; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; cursor: pointer;">
                        🖨️ 打印报告
                    </button>
                    <button onclick="exportPDF()" style="background: #4caf50; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; cursor: pointer; margin-left: 10px;">
                        📄 导出PDF
                    </button>
                </div>
            </body>
            </html>
        `;
        
        return html;
    }
    
    displayReport(html) {
        // 在新的窗口或页面显示报告
        const reportWindow = window.open('', '_blank');
        reportWindow.document.write(html);
        reportWindow.document.close();
    }
    
    saveReportData() {
        // 保存报告数据到本地存储
        localStorage.setItem('XA_LAST_REPORT', JSON.stringify(this.reportData));
        console.log('✅ 报告数据已保存');
    }
    
    async exportToPDF() {
        console.log('📄 开始生成PDF...');
        
        try {
            // 生成报告HTML
            const reportHTML = await this.generateFullReport();
            
            // 创建临时容器
            const tempDiv = document.createElement('div');
            tempDiv.style.cssText = `
                position: absolute;
                left: -10000px;
                top: 0;
                width: 800px;
                background: white;
                font-family: 'Microsoft YaHei', 'SimSun', sans-serif;
            `;
            tempDiv.innerHTML = reportHTML;
            document.body.appendChild(tempDiv);
            
            // 等待DOM渲染
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // 使用html2canvas和jsPDF生成PDF
            const canvas = await html2canvas(tempDiv, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });
            
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * pageWidth) / imgProps.width;
            
            pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, imgHeight);
            
            // 保存文件
            const fileName = `西安小升初评估报告_${new Date().toISOString().slice(0,10)}.pdf`;
            pdf.save(fileName);
            
            // 清理
            document.body.removeChild(tempDiv);
            
            console.log('✅ PDF生成成功:', fileName);
            return true;
            
        } catch (error) {
            console.error('PDF导出失败:', error);
            alert('PDF生成失败，请使用打印功能。');
            return false;
        }
    }
}

// ========== [修复8] 小猫助手深度集成 ==========
class EnhancedAIAssistant {
    constructor() {
        this.conversationHistory = [];
        this.userContext = null;
        this.initialize();
    }
    
    initialize() {
        // 加载用户上下文
        this.userContext = getCompleteUserContext();
        
        // 初始化系统提示
        this.conversationHistory = [{
            role: 'system',
            content: `# 角色：西安小升初专家助手小猫

## 你的身份
你是西安小升初智能助手小猫，拥有以下特点：
1. 熟悉西安市2025年所有公办民办初中学校信息
2. 了解西安市小升初政策、入学顺位、摇号规则
3. 能够基于用户的具体情况提供个性化建议
4. 回答准确、专业、友好
5. 数据基于本地真实数据库，不猜测不编造

## 用户完整画像
${JSON.stringify(this.userContext, null, 2)}

## 你的任务
1. 基于用户完整信息提供个性化建议
2. 考虑户籍、居住、房产、能力等所有因素
3. 提供具体的行动步骤和政策建议
4. 解释背后的原因和逻辑
5. 如果信息不足，主动询问补充

## 回答要求
- 先总结用户的整体情况
- 再针对具体问题分析
- 最后给出建议和理由
- 保持专业但友好的语气
- 使用emoji让回答更生动

## 数据来源
所有学校信息基于西安市教育局2025年官方数据`
        }];
    }
    
    async ask(question) {
        console.log('🤖 AI助手收到问题:', question);
        
        // 更新用户上下文
        this.userContext = getCompleteUserContext();
        
        // 构建消息
        const userMessage = {
            role: 'user',
            content: question
        };
        
        this.conversationHistory.push(userMessage);
        
        try {
            // 生成AI回复（模拟或调用API）
            const response = await this.generateResponse(question);
            
            const assistantMessage = {
                role: 'assistant',
                content: response
            };
            
            this.conversationHistory.push(assistantMessage);
            
            return response;
            
        } catch (error) {
            console.error('AI回复失败:', error);
            return this.getFallbackResponse(question);
        }
    }
    
    async generateResponse(question) {
        // 如果AI未连接，使用本地逻辑生成回复
        if (!CONFIG.isConnected) {
            return this.generateLocalResponse(question);
        }
        
        // 否则调用AI API
        try {
            const prompt = this.buildPrompt(question);
            const response = await callAIAPI(prompt, CONFIG.provider, CONFIG.apiKey, CONFIG.appId);
            return response;
        } catch (error) {
            console.warn('AI API调用失败，使用本地回复:', error);
            return this.generateLocalResponse(question);
        }
    }
    
    buildPrompt(question) {
        return `
用户提问：${question}

用户完整信息：
${JSON.stringify(this.userContext, null, 2)}

基于以上用户信息，请以西安小升初专家小猫的身份回答用户问题。
要求：
1. 结合用户的具体情况分析
2. 提供可操作的建议
3. 引用相关政策和数据
4. 如果问题需要更多信息，请询问
5. 保持专业、友好、有帮助

请直接回答问题：
        `;
    }
    
    generateLocalResponse(question) {
        const context = this.userContext;
        let response = '';
        
        // 分析问题类型
        if (question.includes('学校') || question.includes('推荐')) {
            response = this.generateSchoolResponse(context);
        } else if (question.includes('顺位') || question.includes('入学资格')) {
            response = this.generateAdmissionResponse(context);
        } else if (question.includes('时间') || question.includes('规划')) {
            response = this.generateTimelineResponse(context);
        } else if (question.includes('政策') || question.includes('摇号')) {
            response = this.generatePolicyResponse(context);
        } else if (question.includes('材料') || question.includes('准备')) {
            response = this.generateMaterialsResponse(context);
        } else if (question.includes('民办') || question.includes('公办')) {
            response = this.generateSchoolTypeResponse(context, question);
        } else if (question.includes('能力') || question.includes('评估')) {
            response = this.generateAbilityResponse(context);
        } else {
            response = this.generateGeneralResponse(context, question);
        }
        
        return response;
    }
    
    generateSchoolResponse(context) {
        const { basicInfo, abilities } = context;
        
        return `🎓 **基于您的信息分析：**

**您的条件：**
📍 户籍：${basicInfo.户籍 || '未填写'}
🎯 能力：综合评分 ${abilities.综合评分 || '未评估'}/5.0
💰 预算：${context.preferences.预算范围 === 'low' ? '经济型' : context.preferences.预算范围 === 'medium' ? '中等' : '高预算'}

**推荐策略：**
1. **公办学校**：基于您的户籍信息，建议优先考虑对口公办学校
2. **民办学校**：${context.preferences.考虑民办 === 'yes' ? '可以适当选择1-2所民办学校作为备选' : '您不考虑民办学校'}
3. **匹配建议**：${abilities.综合评分 >= 4 ? '您的能力优秀，可以挑战优质学校' : abilities.综合评分 >= 3 ? '您的能力良好，建议选择匹配度高的学校' : '建议选择管理严格、学风良好的学校'}

**具体建议：**
请点击"学校推荐"按钮，系统会基于您的户籍信息和能力评估，为您推荐匹配的学校。

需要我为您分析具体的学校吗？`;
    }
    
    generateAdmissionResponse(context) {
        const { basicInfo, systemEvaluation } = context;
        const sameDistrict = basicInfo.户籍居住一致 === '是';
        
        return `📋 **入学顺位分析：**

**您的具体情况：**
✅ 户籍：${basicInfo.户籍 || '未填写'}
✅ 居住：${basicInfo.居住 || '未填写'}
${sameDistrict ? '✅ 户籍与居住地一致' : '⚠️ 户籍与居住地不一致'}

**入学顺位评估：**
${systemEvaluation.入学顺位.text || '待评估'}

**关键影响因素：**
1. **户籍信息**：${basicInfo.户籍 ? '已填写，这是最重要的入学依据' : '未填写，请尽快补充'}
2. **房产情况**：${context.familyInfo.房产情况 ? `房产类型：${context.familyInfo.房产类型}` : '未填写，影响入学顺位'}
3. **居住情况**：${basicInfo.居住 ? '居住信息完整' : '居住信息待补充'}

**建议：**
${sameDistrict ? '🎉 您的条件很好，属于较高入学顺位' : '📌 建议确保户籍材料齐全，关注户籍所在区招生政策'}

您需要我详细解释某个区的入学政策吗？`;
    }
    
    generateTimelineResponse(context) {
        const grade = context.basicInfo.年级 || '六年级';
        const currentYear = new Date().getFullYear();
        const targetYear = grade.includes('六') ? currentYear + 1 : 
                          grade.includes('五') ? currentYear + 2 :
                          grade.includes('四') ? currentYear + 3 : currentYear + 1;
        
        return `📅 **时间规划建议：**

**您的情况：**
🏫 当前年级：${grade}
🎯 目标入学年：${targetYear}年

**关键时间节点：**
**现在 - ${targetYear}年3月**：了解政策、参加学校开放日
**${targetYear}年4-5月**：关注学区划分、准备报名材料
**${targetYear}年6月**：民办学校网上报名（如考虑）
**${targetYear}年7月**：民办学校摇号、公办学校登记
**${targetYear}年8月**：录取结果公布、办理入学手续
**${targetYear}年9月**：新生报到

**当前阶段重点：**
1. 确认户籍和房产信息的准确性
2. 关注目标学校的官方网站和公众号
3. 准备报名所需的各种材料
4. ${context.preferences.考虑民办 === 'yes' ? '了解民办学校的招生要求和学费' : '专注公办学校入学准备'}

您需要我为您的具体情况制定更详细的时间表吗？`;
    }
    
    generateGeneralResponse(context, question) {
        return `🤔 **关于"${question}"：**

我理解您的问题。基于您的信息：

**您的背景：**
- 📍 户籍：${context.basicInfo.户籍 || '未填写'}
- 🎓 能力：综合评分 ${context.abilities.综合评分 || '未评估'}/5.0
- 💰 预算：${context.preferences.预算范围 === 'low' ? '经济型' : context.preferences.预算范围 === 'medium' ? '中等' : '高预算'}
- 🏠 ${context.familyInfo.房产情况 ? `房产：${context.familyInfo.房产情况}` : '房产情况待填写'}

**我的建议：**
对于您的问题，建议结合以下考虑：
1. 优先基于户籍信息选择学校
2. 考虑家庭预算和学校学费
3. 匹配学生能力和学校特色
4. 关注官方政策和时间节点

为了给您更准确的建议，您可以：
- 点击"学校推荐"查看匹配学校
- 使用"时间规划"功能制定升学计划
- 告诉我更多具体信息

有什么其他问题我可以帮您解答吗？`;
    }
    
    getFallbackResponse(question) {
        return `抱歉，我暂时无法回答这个问题。😅

但我可以帮您：
1. 🏫 分析学校匹配度
2. 📋 评估入学顺位  
3. 📅 制定时间规划
4. 📄 准备报名材料
5. 💡 解读招生政策

您可以：
- 点击左侧的快捷按钮提问
- 重新表述您的问题
- 检查是否填写完整的个人信息

有什么其他我可以帮您的吗？`;
    }
}

// ========== 主程序入口 ==========
let enhancedAI = null;

// 初始化应用
function initializeApp() {
    console.log('🚀 初始化增强版西安小升初系统...');
    
    // 恢复配置
    restoreConfig();
    
    // 初始化AI助手
    enhancedAI = new EnhancedAIAssistant();
    
    // 初始化步骤
    showStep(1);
    
    // 初始化街道联动
    initializeStreetSelects();
    
    // 初始化聊天功能
    initializeChatSystem();
    
    // 绑定事件
    bindEvents();
    
    // 加载本地数据库
    preloadDatabase();
    
    console.log('✅ 系统初始化完成');
}

function initializeStreetSelects() {
    // 初始化户籍和居住街道联动
    populateStreets('householdDistrict', 'householdStreet');
    populateStreets('residenceDistrict', 'residenceStreet');
    
    // 为所有下拉菜单添加搜索功能
    addSearchToSelects();
}

function addSearchToSelects() {
    const selectIds = ['householdDistrict', 'residenceDistrict', 'householdStreet', 'residenceStreet'];
    
    selectIds.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            // 添加拼音搜索数据
            addPinyinSearch(select);
        }
    });
}

function addPinyinSearch(select) {
    if (!select) return;
    
    // 为每个选项添加拼音数据
    Array.from(select.options).forEach(option => {
        if (option.value) {
            const text = option.text;
            option.dataset.pinyin = toPinyin(text);
            option.dataset.initials = getPinyinInitials(text);
        }
    });
    
    // 创建搜索输入框
    if (!select.previousElementSibling || !select.previousElementSibling.classList.contains('search-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'search-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.marginBottom = '8px';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = '搜索...（支持拼音首字母）';
        input.className = 'search-input';
        input.style.width = '100%';
        input.style.padding = '8px 12px';
        input.style.border = '1px solid #e2e8f0';
        input.style.borderRadius = '6px';
        input.style.fontSize = '14px';
        
        input.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase().trim();
            
            Array.from(select.options).forEach(option => {
                if (!option.value) return; // 跳过提示选项
                
                const text = option.text.toLowerCase();
                const pinyin = option.dataset.pinyin || '';
                const initials = option.dataset.initials || '';
                
                const match = keyword === '' || 
                    text.includes(keyword) ||
                    pinyin.includes(keyword) ||
                    initials.includes(keyword);
                
                option.style.display = match ? '' : 'none';
            });
            
            // 如果当前选中项被隐藏，重置选择
            if (select.selectedIndex > 0 && select.options[select.selectedIndex].style.display === 'none') {
                select.selectedIndex = 0;
            }
        });
        
        wrapper.appendChild(input);
        select.parentNode.insertBefore(wrapper, select);
    }
}

function initializeChatSystem() {
    // 确保聊天按钮可点击
    const catButtons = document.querySelectorAll('.cat-button, .ai-assistant-btn, [onclick*="toggleChat"], [onclick*="askCatAssistant"]');
    
    catButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            toggleChat();
        });
    });
    
    // 确保本地模式按钮可点击
    const localModeButtons = document.querySelectorAll('[onclick*="useLocalMode"], .local-mode-btn');
    
    localModeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            useLocalMode();
        });
    });
}

function bindEvents() {
    // 绑定下一步按钮
    const nextButtons = document.querySelectorAll('.next-btn, [onclick*="goToNextStep"], [onclick*="goToStep"]');
    
    nextButtons.forEach(button => {
        const onclick = button.getAttribute('onclick');
        if (onclick && onclick.includes('goToNextStep')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const currentStep = this.dataset.step || '1';
                goToNextStep(currentStep);
            });
        }
    });
    
    // 绑定学校推荐按钮
    const recButtons = document.querySelectorAll('[onclick*="generateReport"], [onclick*="renderSchoolRecommendations"]');
    
    recButtons.forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            showStep(7); // 显示结果页
            await renderSchoolRecommendations();
        });
    });
    
    // 绑定报告生成按钮
    const reportButtons = document.querySelectorAll('[onclick*="generateFullReport"], [onclick*="exportToPDF"]');
    
    reportButtons.forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            const generator = new ProfessionalReportGenerator();
            await generator.exportToPDF();
        });
    });
}

async function preloadDatabase() {
    // 预加载学校数据库
    console.log('📚 预加载本地数据库...');
    try {
        await loadSchoolsData();
        console.log('✅ 数据库预加载完成');
    } catch (error) {
        console.warn('⚠️ 数据库预加载失败:', error);
    }
}

// ========== 工具函数 ==========
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
        if (py) {
            result += py[0];
        }
    }
    return result.toLowerCase();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; 
                    background: ${type === 'success' ? '#52C41A' : type === 'error' ? '#F5222D' : '#1890FF'}; 
                    color: white; padding: 12px 20px; border-radius: 8px; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 9999;
                    display: flex; align-items: center; gap: 10px;">
            ${type === 'success' ? '✅' : type === 'error' ? '❌' : '💡'} ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showFieldError(element, message) {
    if (!element) return;
    
    // 移除旧的错误信息
    clearFieldError(element);
    
    // 添加错误样式
    element.style.borderColor = '#F5222D';
    element.style.boxShadow = '0 0 0 2px rgba(245, 34, 45, 0.1)';
    
    // 添加错误信息
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#F5222D';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    element.parentNode.insertBefore(errorDiv, element.nextSibling);
}

function clearFieldError(element) {
    if (!element) return;
    
    element.style.borderColor = '';
    element.style.boxShadow = '';
    
    const errorDiv = element.nextElementSibling;
    if (errorDiv && errorDiv.className === 'field-error') {
        errorDiv.remove();
    }
}

function setupChatDrag() {
    const chatHeader = document.getElementById('chatHeader');
    const chatWindow = document.getElementById('chatWindow');
    
    if (!chatHeader || !chatWindow) return;
    
    let isDragging = false;
    let offsetX, offsetY;
    
    chatHeader.addEventListener('mousedown', (e) => {
        if (e.target.closest('button')) return;
        
        isDragging = true;
        chatWindow.style.transition = 'none';
        
        const rect = chatWindow.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        document.body.style.userSelect = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const x = Math.max(0, Math.min(window.innerWidth - chatWindow.offsetWidth, e.clientX - offsetX));
        const y = Math.max(0, Math.min(window.innerHeight - chatWindow.offsetHeight, e.clientY - offsetY));
        
        chatWindow.style.left = `${x}px`;
        chatWindow.style.top = `${y}px`;
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            chatWindow.style.transition = '';
            document.body.style.userSelect = '';
        }
    });
}

// ========== 原有函数兼容 ==========
// 保持原有函数的兼容性
window.showStep = function(stepNumber) {
    console.log(`切换到步骤 ${stepNumber}`);
    
    // 隐藏所有步骤
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标步骤
    const targetSection = document.getElementById(`step${stepNumber}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 导出全局函数
window.toggleChat = toggleChat;
window.useLocalMode = useLocalMode;
window.goToNextStep = goToNextStep;
window.renderSchoolRecommendations = renderSchoolRecommendations;
window.askCatAssistant = async function(question) {
    if (!enhancedAI) {
        enhancedAI = new EnhancedAIAssistant();
    }
    
    // 显示聊天窗口
    toggleChat();
    
    // 等待聊天窗口打开
    setTimeout(async () => {
        // 添加用户消息
        addMessageToChat('user', question);
        
        try {
            // 显示加载状态
            showLoadingIndicator();
            
            // 获取AI回复
            const response = await enhancedAI.ask(question);
            
            // 隐藏加载状态
            hideLoadingIndicator();
            
            // 添加AI回复
            addMessageToChat('assistant', response);
            
        } catch (error) {
            hideLoadingIndicator();
            addMessageToChat('assistant', '抱歉，我暂时无法回答这个问题。请稍后再试。');
        }
    }, 300);
};

// 原有的聊天函数
window.sendMessage = async function() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // 添加用户消息
    addMessageToChat('user', message);
    input.value = '';
    
    try {
        showLoadingIndicator();
        
        if (!enhancedAI) {
            enhancedAI = new EnhancedAIAssistant();
        }
        
        const response = await enhancedAI.ask(message);
        
        hideLoadingIndicator();
        addMessageToChat('assistant', response);
        
    } catch (error) {
        hideLoadingIndicator();
        addMessageToChat('assistant', '抱歉，出现错误：' + error.message);
    }
};

function addMessageToChat(role, content) {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${role}`;
    
    // 格式化内容
    const formattedContent = content
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${role === 'user' ? '👤' : '🐱'}</div>
        <div class="message-content">${formattedContent}</div>
    `;
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showLoadingIndicator() {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) return;
    
    const indicator = document.createElement('div');
    indicator.id = 'typing-indicator';
    indicator.className = 'ai-message assistant';
    indicator.innerHTML = `
        <div class="message-avatar">🐱</div>
        <div class="message-content">
            <div style="display: flex; gap: 4px; align-items: center;">
                <div style="width: 8px; height: 8px; background: #667eea; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out;"></div>
                <div style="width: 8px; height: 8px; background: #667eea; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; animation-delay: 0.2s;"></div>
                <div style="width: 8px; height: 8px; background: #667eea; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; animation-delay: 0.4s;"></div>
            </div>
        </div>
    `;
    
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function hideLoadingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

// 原有的配置函数
function restoreConfig() {
    const savedMode = localStorage.getItem('aiMode') || 'local';
    
    if (savedMode === 'local') {
        CONFIG.isConnected = false;
        
        const statusElement = document.getElementById('apiStatus');
        if (statusElement) {
            statusElement.textContent = '本地模式';
            statusElement.className = 'api-status local';
        }
    } else {
        CONFIG.isConnected = true;
    }
}

// ========== 启动应用 ==========
document.addEventListener('DOMContentLoaded', initializeApp);

// 全局导出
window.ProfessionalReportGenerator = ProfessionalReportGenerator;
window.TimelineGenerator = TimelineGenerator;
window.PolicyAnalyzer = PolicyAnalyzer;
window.EnhancedAIAssistant = EnhancedAIAssistant;

console.log('🚀 西安小升初智能评估系统 - 增强版已加载完成！');
