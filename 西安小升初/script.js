// ========== 修复6：完整的街道数据 ==========
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

// ========== 修复1：本地模式切换按钮 ==========
function useLocalMode() {
    console.log('🔄 切换到本地模式...');
    
    // 更新系统配置
    SYSTEM_CONFIG.aiConnected = false;
    SYSTEM_STATE.aiConnected = false;
    
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
    
    // 显示成功通知
    const notification = document.createElement('div');
    notification.id = 'mode-notification';
    notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: #52C41A; color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 9999;">
            ✅ 已成功切换到本地模式
        </div>
    `;
    document.body.appendChild(notification);
    
    // 3秒后移除通知
    setTimeout(() => {
        const notif = document.getElementById('mode-notification');
        if (notif) notif.remove();
    }, 3000);
    
    // 保存模式到本地存储
    localStorage.setItem('XA_SYSTEM_MODE', 'local');
    
    // 强制重新初始化AI助手
    if (window.app && window.app.aiAssistant) {
        window.app.aiAssistant.initialize();
    }
    
    console.log('✅ 本地模式已激活');
    return true;
}

// ========== 修复2：小猫按钮点击无效 ==========
function toggleChat() {
    const chatBox = document.getElementById('aiChatBox');
    if (!chatBox) {
        createEnhancedChatBox();
        return;
    }
    
    if (chatBox.style.display === 'none' || chatBox.style.display === '') {
        chatBox.style.display = 'block';
        // 自动加载用户上下文
        loadUserContextToChat();
        document.getElementById('chatInput').focus();
    } else {
        chatBox.style.display = 'none';
    }
}

function createEnhancedChatBox() {
    const chatBox = document.createElement('div');
    chatBox.id = 'aiChatBox';
    chatBox.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 450px;
        height: 600px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 15px 40px rgba(0,0,0,0.25);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
        overflow: hidden;
    `;
    
    chatBox.innerHTML = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px 20px; display: flex; justify-content: space-between; align-items: center; border-radius: 16px 16px 0 0;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 36px; height: 36px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px;">🐱</div>
                <div>
                    <div style="font-weight: bold; font-size: 16px;">小猫助手</div>
                    <div style="font-size: 12px; opacity: 0.9; margin-top: 2px;">深度了解您需求的升学顾问</div>
                </div>
            </div>
            <div style="display: flex; gap: 10px;">
                <button onclick="toggleUserContext()" title="查看用户信息" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px;">👤</button>
                <button onclick="toggleChat()" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">×</button>
            </div>
        </div>
        
        <div style="display: flex; flex: 1; overflow: hidden;">
            <!-- 用户信息侧边栏 -->
            <div id="userContextPanel" style="width: 0; overflow: hidden; transition: width 0.3s; background: #f8fafc; border-right: 1px solid #e2e8f0;">
                <div id="userContextContent" style="padding: 15px; width: 200px;">
                    <!-- 用户信息将动态加载 -->
                </div>
            </div>
            
            <!-- 主聊天区域 -->
            <div style="flex: 1; display: flex; flex-direction: column;">
                <div id="chatBody" style="flex: 1; padding: 15px; overflow-y: auto; background: white;">
                    <div class="ai-message assistant">
                        <div class="message-avatar">🐱</div>
                        <div class="message-content">
                            <strong>您好！我是您的小升初AI助手小猫</strong>
                            <div style="margin-top: 8px; font-size: 13px;">
                                🤖 <strong>我已了解您的完整信息：</strong>
                                <div id="userContextSummary" style="margin-top: 5px; font-size: 12px; color: #666;">
                                    <!-- 用户信息摘要 -->
                                </div>
                            </div>
                            <div style="margin-top: 10px;">
                                <strong>我可以帮您：</strong>
                                <br>• 分析学校匹配度
                                <br>• 解读招生政策
                                <br>• 制定升学策略
                                <br>• 生成个性化建议
                                <br>• 回答任何升学问题
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="padding: 15px; border-top: 1px solid #e2e8f0; background: #f8fafc;">
                    <div style="margin-bottom: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
                        <button onclick="quickQuestion('帮我分析学校推荐')" class="quick-question-btn">🏫 学校分析</button>
                        <button onclick="quickQuestion('我的入学顺位是什么')" class="quick-question-btn">📋 顺位评估</button>
                        <button onclick="quickQuestion('我应该准备什么材料')" class="quick-question-btn">📄 材料清单</button>
                        <button onclick="quickQuestion('制定时间规划')" class="quick-question-btn">📅 时间规划</button>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="chatInput" placeholder="输入您的问题..." style="flex: 1; padding: 12px 18px; border: 1px solid #e2e8f0; border-radius: 25px; outline: none; font-size: 14px;">
                        <button onclick="sendEnhancedMessage()" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 25px; padding: 12px 24px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-weight: 500;">
                            <span>发送</span>
                            <span style="font-size: 16px;">🚀</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatBox);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .ai-message {
            display: flex;
            gap: 12px;
            margin-bottom: 18px;
            animation: fadeIn 0.3s ease;
        }
        .ai-message.user {
            flex-direction: row-reverse;
        }
        .message-avatar {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            flex-shrink: 0;
            color: white;
        }
        .ai-message.user .message-avatar {
            background: #52C41A;
        }
        .message-content {
            max-width: 300px;
            padding: 14px 18px;
            border-radius: 18px;
            line-height: 1.5;
            font-size: 14px;
            position: relative;
        }
        .ai-message.assistant .message-content {
            background: #f0f9ff;
            border: 1px solid #91d5ff;
            border-radius: 18px 18px 18px 4px;
        }
        .ai-message.user .message-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 18px 18px 4px 18px;
        }
        .quick-question-btn {
            padding: 6px 12px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .quick-question-btn:hover {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }
        .typing-dots {
            display: flex;
            gap: 4px;
        }
        .typing-dots span {
            width: 8px;
            height: 8px;
            background: #667eea;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out;
        }
        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        #chatBody::-webkit-scrollbar {
            width: 8px;
        }
        #chatBody::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
        }
        #chatBody::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
        }
        #chatBody::-webkit-scrollbar-thumb:hover {
            background: #a0a0a0;
        }
    `;
    document.head.appendChild(style);
}

// ========== 修复8：让小猫助手了解用户信息和各环节结论 ==========
class EnhancedAIAssistant extends AIAssistant {
    constructor() {
        super();
        this.userCompleteProfile = null;
        this.analysisHistory = []; // 存储各环节分析结论
        this.decisionContext = {}; // 决策上下文
    }
    
    async initialize() {
        // 加载完整的用户信息和历史分析
        this.loadCompleteUserProfile();
        this.loadAnalysisHistory();
        
        // 增强系统提示
        const userContext = this.getCompleteUserContext();
        
        this.conversationHistory[0] = {
            role: 'system',
            content: `# 角色：西安小升初专家助手小猫

## 用户完整画像：
${JSON.stringify(userContext.basicInfo, null, 2)}

## 核心能力分析：
${JSON.stringify(userContext.abilityAnalysis, null, 2)}

## 升学风险评估：
${JSON.stringify(userContext.riskAnalysis, null, 2)}

## 学校推荐结论：
${JSON.stringify(userContext.schoolRecommendations, null, 2)}

## 时间规划策略：
${JSON.stringify(userContext.timelineStrategy, null, 2)}

## 你的任务：
1. 基于完整的用户画像提供个性化建议
2. 考虑所有历史分析结论
3. 预测各种选择的结果
4. 提供具体的行动步骤
5. 解释背后的原因和逻辑

## 回答格式：
- 先总结用户的整体情况
- 再针对具体问题分析
- 最后给出建议和理由
- 保持专业但友好的语气`
        };
        
        console.log('🤖 小猫助手已加载完整用户信息');
    }
    
    loadCompleteUserProfile() {
        const userProfile = userManager.collect();
        
        // 增强用户画像
        this.userCompleteProfile = {
            // 基础信息
            basicInfo: {
                姓名: userProfile.student_name || '未填写',
                年级: userProfile.current_grade || '未填写',
                性别: userProfile.student_gender || '未填写',
                现读学校: userProfile.current_school || '未填写',
                户籍: `${userProfile.household_district || ''}${userProfile.household_street || ''}`,
                居住: `${userProfile.residence_district || ''}${userProfile.residence_street || ''}`,
                户籍居住一致: userProfile.same_district ? '是' : '否'
            },
            
            // 家庭情况
            familyInfo: {
                房产情况: userProfile.property_situation || '未填写',
                房产类型: userProfile.property_type || '未填写',
                房产年限: userProfile.property_years || '未填写',
                居住类型: userProfile.residence_type || '未填写'
            },
            
            // 升学意向
            preferences: {
                考虑民办: userProfile.consider_private || '未明确',
                接受跨区: userProfile.cross_district || '未明确',
                预算范围: userProfile.budget || '未设定',
                接受摇号: userProfile.lottery_attitude || '未明确'
            },
            
            // 能力特长
            abilities: {
                综合评分: userProfile.ability_average || 0,
                星级评价: userProfile.ability_stars || '',
                位次估算: userProfile.rank_estimate || '',
                详细得分: userProfile.ability_scores || {},
                特长项目: userProfile.specialties || []
            },
            
            // 系统评估
            systemEvaluation: {
                入学顺位: userProfile.admission_priority || { text: '待评估' },
                匹配优势: this.calculateUserAdvantages(userProfile),
                潜在风险: this.calculateUserRisks(userProfile),
                建议策略: this.generateDefaultStrategy(userProfile)
            }
        };
    }
    
    loadAnalysisHistory() {
        // 加载各环节的历史分析结论
        this.analysisHistory = JSON.parse(localStorage.getItem('XA_ANALYSIS_HISTORY') || '[]');
        
        // 如果没有历史，创建初始记录
        if (this.analysisHistory.length === 0) {
            this.analysisHistory = [
                {
                    timestamp: new Date().toISOString(),
                    type: 'user_profile',
                    conclusion: '用户信息已收集，待分析',
                    data: this.userCompleteProfile
                }
            ];
            this.saveAnalysisHistory();
        }
    }
    
    async ask(question) {
        const questionType = this.analyzeQuestionType(question);
        const userProfile = this.userCompleteProfile;
        
        try {
            // 生成深度分析
            const analysis = await this.generateDeepAnalysis(question, questionType, userProfile);
            
            // 保存到分析历史
            this.saveAnalysisToHistory(question, analysis);
            
            // 生成友好回复
            const response = this.formatResponse(question, analysis, userProfile);
            
            // 更新对话历史
            this.conversationHistory.push(
                { role: 'user', content: question },
                { role: 'assistant', content: response }
            );
            
            return response;
            
        } catch (error) {
            console.error('深度分析失败:', error);
            return this.getEnhancedFallbackResponse(question, userProfile, questionType);
        }
    }
    
    async generateDeepAnalysis(question, questionType, userProfile) {
        // 这里应该是调用大模型进行深度分析
        // 为简化，我们先模拟一个深度分析结果
        return {
            questionType: questionType,
            userContext: this.summarizeUserContext(userProfile),
            analysis: await this.simulateDeepAnalysis(question, userProfile),
            recommendations: await this.generatePersonalizedRecommendations(question, userProfile),
            nextSteps: this.generateNextSteps(userProfile),
            confidence: this.calculateConfidenceLevel(userProfile)
        };
    }
    
    async simulateDeepAnalysis(question, userProfile) {
        // 模拟AI深度分析
        const analyses = [];
        
        // 基于用户画像的分析
        analyses.push(`🧑‍🎓 **学生画像分析**：`);
        if (userProfile.abilities.综合评分 >= 4) {
            analyses.push(`- 综合能力优秀（${userProfile.abilities.综合评分}/5.0），全市排名约${userProfile.abilities.位次估算}`);
            analyses.push(`- 具备冲刺优质民办学校的能力基础`);
        } else if (userProfile.abilities.综合评分 >= 3) {
            analyses.push(`- 综合能力良好，有提升空间`);
            analyses.push(`- 建议聚焦匹配度高的学校`);
        }
        
        // 基于家庭情况的分析
        analyses.push(`\n🏠 **家庭背景分析**：`);
        if (userProfile.basicInfo.户籍居住一致 === '是') {
            analyses.push(`- 户籍与居住地一致，公办入学为第一顺位`);
            analyses.push(`- 入学确定性高，建议充分利用此优势`);
        } else {
            analyses.push(`- 户籍居住不一致，可能影响公办入学优先级`);
            analyses.push(`- 需要制定备选方案`);
        }
        
        // 基于升学意向的分析
        analyses.push(`\n🎯 **升学策略分析**：`);
        if (userProfile.preferences.考虑民办 === 'yes') {
            analyses.push(`- 考虑民办学校，需准备摇号策略`);
            analyses.push(`- 预算范围：${this.translateBudget(userProfile.preferences.预算范围)}`);
        } else {
            analyses.push(`- 专注公办学校，需确保材料齐全`);
        }
        
        return analyses.join('\n');
    }
    
    getCompleteUserContext() {
        const userProfile = userManager.collect();
        const recommendations = SYSTEM_STATE.recommendations || [];
        const timeline = SYSTEM_STATE.timeline;
        const policyAdvice = SYSTEM_STATE.policyAdvice;
        
        return {
            basicInfo: {
                姓名: userProfile.student_name || '未填写',
                年级: userProfile.current_grade,
                户籍: `${userProfile.household_district || ''} ${userProfile.household_street || ''}`,
                居住: `${userProfile.residence_district || ''} ${userProfile.residence_street || ''}`
            },
            abilityAnalysis: {
                综合评分: userProfile.ability_average || 0,
                星级: userProfile.ability_stars || '',
                位次: userProfile.rank_estimate || '',
                优势科目: this.findStrengths(userProfile.ability_scores),
                待提升科目: this.findWeaknesses(userProfile.ability_scores)
            },
            riskAnalysis: {
                入学顺位: userProfile.admission_priority?.text || '待评估',
                户籍风险: userProfile.same_district ? '低风险' : '中高风险',
                预算风险: this.assessBudgetRisk(userProfile.budget, recommendations),
                摇号风险: userProfile.consider_private === 'yes' ? '中风险' : '无风险'
            },
            schoolRecommendations: {
                推荐总数: recommendations.length,
                最优推荐: recommendations.slice(0, 3).map(r => ({
                    学校: r.school.name,
                    匹配度: r.score,
                    标签: r.tag.name,
                    成功率: r.successRate + '%'
                })),
                推荐策略: this.generateRecommendationStrategy(recommendations)
            },
            timelineStrategy: timeline ? {
                当前阶段: timeline.currentPhase,
                剩余月数: timeline.monthsUntilTarget,
                关键日期: timeline.keyMilestones?.slice(0, 3).map(m => `${m.date}: ${m.event}`) || []
            } : null
        };
    }
    
    // 辅助函数
    findStrengths(abilityScores) {
        if (!abilityScores) return [];
        return Object.entries(abilityScores)
            .filter(([_, score]) => score.得分 >= 4)
            .map(([dimension, _]) => dimension);
    }
    
    findWeaknesses(abilityScores) {
        if (!abilityScores) return [];
        return Object.entries(abilityScores)
            .filter(([_, score]) => score.得分 <= 3)
            .map(([dimension, _]) => dimension);
    }
    
    assessBudgetRisk(budget, recommendations) {
        if (!budget || recommendations.length === 0) return '未知';
        
        const budgetMap = {
            'low': 30000,
            'medium': 100000,
            'high': 999999
        };
        const maxBudget = budgetMap[budget] || 30000;
        
        const expensiveSchools = recommendations.filter(r => 
            r.school.type === '民办' && r.school.tuitionMax > maxBudget
        );
        
        if (expensiveSchools.length === 0) return '低风险';
        if (expensiveSchools.length <= 2) return '中风险';
        return '高风险';
    }
    
    generateRecommendationStrategy(recommendations) {
        if (recommendations.length === 0) return '暂无推荐策略';
        
        const types = recommendations.map(r => r.school.type);
        const hasPublic = types.includes('公办');
        const hasPrivate = types.includes('民办');
        
        if (hasPublic && hasPrivate) return '公民办结合策略';
        if (hasPublic) return '公办优先策略';
        if (hasPrivate) return '民办冲刺策略';
        return '待定策略';
    }
    
    translateBudget(budget) {
        const map = {
            'low': '经济型（3万以内/年）',
            'medium': '中等预算（3-10万/年）',
            'high': '高预算（10万以上/年）'
        };
        return map[budget] || '未设定';
    }
    
    saveAnalysisToHistory(question, analysis) {
        this.analysisHistory.push({
            timestamp: new Date().toISOString(),
            question: question,
            analysis: analysis,
            type: 'ai_response'
        });
        
        // 保持历史记录在合理范围内
        if (this.analysisHistory.length > 50) {
            this.analysisHistory = this.analysisHistory.slice(-50);
        }
        
        this.saveAnalysisHistory();
    }
    
    saveAnalysisHistory() {
        try {
            localStorage.setItem('XA_ANALYSIS_HISTORY', JSON.stringify(this.analysisHistory));
        } catch (error) {
            console.error('保存分析历史失败:', error);
        }
    }
}

// ========== 修复7：雷达图增加个人能力分析总结 ==========
function generateEnhancedAbilityChart() {
    const userProfile = userManager.collect();
    
    if (!userProfile.ability_scores) {
        console.warn('没有能力数据');
        return;
    }
    
    // 检查是否已有图表容器
    let chartContainer = document.getElementById('abilityChartContainer');
    if (!chartContainer) {
        chartContainer = document.createElement('div');
        chartContainer.id = 'abilityChartContainer';
        chartContainer.style.cssText = `
            margin-top: 20px;
            padding: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        `;
        
        const abilitySection = document.getElementById('step5') || document.querySelector('.section[data-step="5"]');
        if (abilitySection) {
            abilitySection.appendChild(chartContainer);
        }
    }
    
    // 准备数据
    const dimensions = ['学业成绩', '综合素养', '学习习惯', '心理素质', '家庭支持', '学科倾向'];
    const scores = [];
    const descriptions = [];
    
    dimensions.forEach((dimension, index) => {
        const scoreData = userProfile.ability_scores[dimension];
        if (scoreData) {
            scores.push(scoreData.得分 || 3);
            descriptions.push(scoreData.描述 || '');
        } else {
            scores.push(3);
            descriptions.push('');
        }
    });
    
    // 计算综合得分
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    // 生成图表和分析
    chartContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <!-- 左侧：雷达图 -->
            <div>
                <h3 style="color: #1a202c; margin-bottom: 20px; font-size: 18px;">📊 能力雷达图</h3>
                <canvas id="abilityRadarChart" width="300" height="300"></canvas>
            </div>
            
            <!-- 右侧：详细分析 -->
            <div>
                <h3 style="color: #1a202c; margin-bottom: 20px; font-size: 18px;">🔍 能力分析报告</h3>
                
                <!-- 总体评价 -->
                <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%); padding: 15px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #1890ff;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <div style="font-weight: bold; color: #1890ff;">总体评价</div>
                        <div style="font-size: 24px; font-weight: bold; color: #1890ff;">${averageScore.toFixed(1)}/5.0</div>
                    </div>
                    <div style="font-size: 14px; color: #4a5568;">
                        ${generateOverallAssessment(averageScore)}
                    </div>
                </div>
                
                <!-- 优势分析 -->
                <div style="background: linear-gradient(135deg, #f6ffed 0%, #e6ffd7 100%); padding: 15px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #52c41a;">
                    <div style="font-weight: bold; color: #52c41a; margin-bottom: 10px;">✨ 核心优势</div>
                    <div style="font-size: 14px; color: #4a5568;">
                        ${generateStrengthsAnalysis(scores, dimensions, descriptions)}
                    </div>
                </div>
                
                <!-- 提升建议 -->
                <div style="background: linear-gradient(135deg, #fff7e6 0%, #ffeed7 100%); padding: 15px; border-radius: 10px; border-left: 4px solid #fa8c16;">
                    <div style="font-weight: bold; color: #fa8c16; margin-bottom: 10px;">📈 提升建议</div>
                    <div style="font-size: 14px; color: #4a5568;">
                        ${generateImprovementSuggestions(scores, dimensions)}
                    </div>
                </div>
                
                <!-- AI建议 -->
                <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <span style="font-size: 18px;">🤖</span>
                        <div style="font-weight: bold; color: #1a202c;">AI升学建议</div>
                    </div>
                    <div style="font-size: 13px; color: #4a5568;">
                        ${generateAIRecommendation(averageScore, scores, userProfile)}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 渲染雷达图
    setTimeout(() => {
        renderRadarChart(scores, dimensions);
    }, 100);
}

function generateOverallAssessment(averageScore) {
    if (averageScore >= 4.5) {
        return '综合能力非常优秀，在全市属于顶尖水平。具备冲刺西安一流学校的实力，建议大胆挑战优质民办学校。';
    } else if (averageScore >= 4.0) {
        return '综合能力优秀，在全市排名靠前。适合选择匹配度高的优质学校，可以适当冲刺热门学校。';
    } else if (averageScore >= 3.5) {
        return '综合能力良好，有较好的发展潜力。建议选择适合自身特点的学校，重点提升优势科目。';
    } else if (averageScore >= 3.0) {
        return '综合能力中等，有提升空间。建议夯实基础，选择学风良好的学校，获得更好发展。';
    } else {
        return '综合能力有待提升。建议制定详细的学习计划，重点加强基础，选择管理严格的学校。';
    }
}

function generateStrengthsAnalysis(scores, dimensions, descriptions) {
    const strengths = [];
    
    scores.forEach((score, index) => {
        if (score >= 4) {
            strengths.push(`
                <div style="margin-bottom: 8px;">
                    <strong>${dimensions[index]}（${score}分）</strong>
                    ${descriptions[index] ? `<div style="font-size: 12px; color: #718096;">${descriptions[index]}</div>` : ''}
                </div>
            `);
        }
    });
    
    if (strengths.length === 0) {
        return '<div style="color: #718096;">各项能力发展均衡，无明显短板。</div>';
    }
    
    return strengths.join('');
}

function generateImprovementSuggestions(scores, dimensions) {
    const suggestions = [];
    const minScore = Math.min(...scores);
    const minIndex = scores.indexOf(minScore);
    
    if (minScore <= 3) {
        suggestions.push(`
            <div style="margin-bottom: 8px;">
                <strong>重点关注：${dimensions[minIndex]}</strong>
                <div style="font-size: 12px; color: #718096;">
                    ${getImprovementTip(dimensions[minIndex])}
                </div>
            </div>
        `);
    }
    
    // 针对性建议
    scores.forEach((score, index) => {
        if (score <= 3 && index !== minIndex) {
            suggestions.push(`
                <div style="font-size: 12px; color: #718096;">
                    • ${dimensions[index]}：建议${getSpecificSuggestion(dimensions[index])}
                </div>
            `);
        }
    });
    
    if (suggestions.length === 0) {
        return '<div style="color: #718096;">各项能力发展良好，继续保持即可。</div>';
    }
    
    return suggestions.join('');
}

function getImprovementTip(dimension) {
    const tips = {
        '学业成绩': '制定每日学习计划，重点补习薄弱科目，寻求老师或课外辅导帮助。',
        '综合素养': '多参加课外活动、社会实践，培养领导力和团队协作能力。',
        '学习习惯': '建立固定的学习时间表，培养专注力和自主学习能力。',
        '心理素质': '进行适当的压力管理训练，培养抗挫折能力和自信心。',
        '家庭支持': '加强家校沟通，营造良好的家庭学习氛围。',
        '学科倾向': '探索兴趣领域，参加相关兴趣班或竞赛活动。'
    };
    return tips[dimension] || '制定针对性的提升计划。';
}

function generateAIRecommendation(averageScore, scores, userProfile) {
    const recommendations = [];
    
    // 基于能力的学校类型建议
    if (averageScore >= 4.0) {
        recommendations.push('建议报考管理严格、学术氛围浓厚的优质学校。');
        if (scores[0] >= 4) { // 学业成绩好
            recommendations.push('可以考虑参加学校的重点班或实验班选拔。');
        }
    } else {
        recommendations.push('建议选择学风良好、关注个体发展的学校。');
    }
    
    // 基于特长的建议
    if (userProfile.specialties && userProfile.specialties.length > 0) {
        recommendations.push(`发挥${userProfile.specialties.join('、')}特长优势，考虑相关特色学校。`);
    }
    
    // 基于家庭情况的建议
    if (userProfile.admission_priority?.level <= 2) {
        recommendations.push('户籍优势明显，可以优先考虑公办学校。');
    }
    
    return recommendations.join(' ');
}

function renderRadarChart(scores, dimensions) {
    const ctx = document.getElementById('abilityRadarChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx.getContext('2d'), {
        type: 'radar',
        data: {
            labels: dimensions,
            datasets: [{
                label: '能力评估',
                data: scores,
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        color: '#e2e8f0'
                    },
                    grid: {
                        color: '#e2e8f0'
                    },
                    pointLabels: {
                        font: {
                            size: 12
                        },
                        color: '#4a5568'
                    },
                    ticks: {
                        display: false,
                        max: 5,
                        min: 0,
                        stepSize: 1
                    },
                    suggestedMin: 0,
                    suggestedMax: 5
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${dimensions[context.dataIndex]}: ${context.raw}分`;
                        }
                    }
                }
            }
        }
    });
}

// ========== 修复3：学校推荐数量少 ==========
class EnhancedSchoolMatcher extends SchoolMatcher {
    async matchSchools(userProfile, limit = 15) {
        console.log('🎯 开始智能匹配学校...');
        
        const allSchools = await schoolManager.loadAllSchools();
        const candidates = [];
        
        // 增强的筛选策略
        for (const school of allSchools) {
            // 1. 基础筛选
            if (!this.passEnhancedBasicFilter(school, userProfile)) continue;
            
            // 2. 计算匹配度
            const matchResult = this.calculateEnhancedMatchScore(school, userProfile);
            
            if (matchResult.score >= 40) {
                // 3. AI深度分析（模拟）
                const aiAnalysis = this.simulateAIAnalysis(school, userProfile);
                
                candidates.push({
                    school: school,
                    score: matchResult.score,
                    tag: this.determineRecommendationTag(matchResult.score + aiAnalysis.scoreBoost),
                    tagColor: this.getTagColor(this.determineRecommendationTag(matchResult.score + aiAnalysis.scoreBoost)),
                    successRate: this.calculateEnhancedSuccessRate(school, userProfile, matchResult.score),
                    matchReasons: this.generateEnhancedMatchReasons(school, userProfile, matchResult),
                    aiAnalysis: aiAnalysis, // 新增AI深度分析
                    details: matchResult.details,
                    isPerfectMatch: this.isPerfectMatch(school, userProfile),
                    immediateActions: this.getEnhancedImmediateActions(school, userProfile)
                });
            }
        }
        
        // 多样化选择
        const diversifiedCandidates = this.diversifyRecommendations(candidates, userProfile);
        
        // 保存结果
        SYSTEM_STATE.recommendations = diversifiedCandidates.slice(0, limit);
        
        console.log(`✅ 智能匹配完成: ${SYSTEM_STATE.recommendations.length} 所学校`);
        
        // 保存AI分析结果供小猫助手使用
        this.saveAIAnalysisToHistory(SYSTEM_STATE.recommendations, userProfile);
        
        return SYSTEM_STATE.recommendations;
    }
    
    simulateAIAnalysis(school, userProfile) {
        // 模拟AI深度分析
        const analysis = {
            scoreBoost: 0,
            insights: [],
            recommendations: []
        };
        
        // 基于用户能力的分析
        if (userProfile.ability_average >= 4.0 && school.avg_score > 600) {
            analysis.scoreBoost += 5;
            analysis.insights.push('学生能力与学校学术水平匹配度高');
        }
        
        // 基于特长的分析
        if (userProfile.specialties && this.checkSpecialtyMatch(school, userProfile.specialties)) {
            analysis.scoreBoost += 8;
            analysis.insights.push('学生特长与学校特色高度契合');
        }
        
        // 基于家庭情况的分析
        if (school.type === '公办' && this.isPerfectMatch(school, userProfile)) {
            analysis.scoreBoost += 10;
            analysis.insights.push('户籍学区完全匹配，入学确定性高');
        }
        
        return analysis;
    }
    
    saveAIAnalysisToHistory(recommendations, userProfile) {
        const analysisHistory = JSON.parse(localStorage.getItem('XA_SCHOOL_ANALYSIS') || '[]');
        
        analysisHistory.push({
            timestamp: new Date().toISOString(),
            userProfile: {
                综合能力: userProfile.ability_average,
                入学顺位: userProfile.admission_priority?.text
            },
            recommendations: recommendations.slice(0, 5).map(r => ({
                学校: r.school.name,
                匹配度: r.score,
                AI分析: r.aiAnalysis?.insights || []
            })),
            aiConclusions: this.generateAIConclusions(recommendations, userProfile)
        });
        
        if (analysisHistory.length > 20) {
            analysisHistory.shift();
        }
        
        localStorage.setItem('XA_SCHOOL_ANALYSIS', JSON.stringify(analysisHistory));
    }
}

// ========== 辅助函数 ==========
function loadUserContextToChat() {
    const summaryDiv = document.getElementById('userContextSummary');
    if (!summaryDiv) return;
    
    const userProfile = userManager.collect();
    
    let summary = '';
    if (userProfile.household_district) {
        summary += `📍 户籍：${userProfile.household_district}`;
        if (userProfile.household_street) summary += ` ${userProfile.household_street}`;
        summary += '<br>';
    }
    
    if (userProfile.ability_average) {
        summary += `🎓 能力：${userProfile.ability_average}/5.0 ${userProfile.ability_stars}`;
        if (userProfile.rank_estimate) summary += `（${userProfile.rank_estimate}）`;
        summary += '<br>';
    }
    
    if (userProfile.admission_priority?.text) {
        summary += `📋 顺位：${userProfile.admission_priority.text}`;
    }
    
    summaryDiv.innerHTML = summary || '请先填写个人信息';
}

function toggleUserContext() {
    const panel = document.getElementById('userContextPanel');
    if (panel.style.width === '200px') {
        panel.style.width = '0';
    } else {
        panel.style.width = '200px';
        updateUserContextPanel();
    }
}

function updateUserContextPanel() {
    const contentDiv = document.getElementById('userContextContent');
    if (!contentDiv) return;
    
    const userProfile = userManager.collect();
    
    contentDiv.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: bold; color: #1a202c; margin-bottom: 10px;">👤 学生信息</div>
            <div style="font-size: 12px; color: #4a5568; line-height: 1.5;">
                ${userProfile.student_name ? `<div>姓名：${userProfile.student_name}</div>` : ''}
                ${userProfile.current_grade ? `<div>年级：${userProfile.current_grade}</div>` : ''}
                ${userProfile.current_school ? `<div>学校：${userProfile.current_school}</div>` : ''}
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: bold; color: #1a202c; margin-bottom: 10px;">🏠 户籍信息</div>
            <div style="font-size: 12px; color: #4a5568; line-height: 1.5;">
                ${userProfile.household_district ? `<div>区域：${userProfile.household_district}</div>` : ''}
                ${userProfile.household_street ? `<div>街道：${userProfile.household_street}</div>` : ''}
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: bold; color: #1a202c; margin-bottom: 10px;">🏠 居住信息</div>
            <div style="font-size: 12px; color: #4a5568; line-height: 1.5;">
                ${userProfile.residence_district ? `<div>区域：${userProfile.residence_district}</div>` : ''}
                ${userProfile.residence_street ? `<div>街道：${userProfile.residence_street}</div>` : ''}
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: bold; color: #1a202c; margin-bottom: 10px;">🎯 能力评估</div>
            <div style="font-size: 12px; color: #4a5568; line-height: 1.5;">
                ${userProfile.ability_average ? `<div>综合：${userProfile.ability_average}/5.0</div>` : ''}
                ${userProfile.rank_estimate ? `<div>位次：${userProfile.rank_estimate}</div>` : ''}
                ${userProfile.admission_priority?.text ? `<div>顺位：${userProfile.admission_priority.text}</div>` : ''}
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: bold; color: #1a202c; margin-bottom: 10px;">💰 升学意向</div>
            <div style="font-size: 12px; color: #4a5568; line-height: 1.5;">
                ${userProfile.consider_private ? `<div>民办：${userProfile.consider_private === 'yes' ? '考虑' : '不考虑'}</div>` : ''}
                ${userProfile.budget ? `<div>预算：${userProfile.budget === 'low' ? '经济型' : userProfile.budget === 'medium' ? '中等' : '高预算'}</div>` : ''}
            </div>
        </div>
        
        <button onclick="viewFullProfile()" style="width: 100%; padding: 8px; background: #667eea; color: white; border: none; border-radius: 6px; font-size: 12px; cursor: pointer;">
            查看完整档案
        </button>
    `;
}

function viewFullProfile() {
    const userProfile = userManager.collect();
    const message = `这是我的完整信息，请根据这些信息为我提供建议：\n\n` +
        `学生姓名：${userProfile.student_name || '未填写'}\n` +
        `当前年级：${userProfile.current_grade || '未填写'}\n` +
        `户籍区域：${userProfile.household_district || '未填写'} ${userProfile.household_street || ''}\n` +
        `居住区域：${userProfile.residence_district || '未填写'} ${userProfile.residence_street || ''}\n` +
        `综合能力：${userProfile.ability_average || '未评估'}分 ${userProfile.ability_stars || ''}\n` +
        `入学顺位：${userProfile.admission_priority?.text || '待评估'}\n` +
        `民办意向：${userProfile.consider_private === 'yes' ? '考虑' : userProfile.consider_private === 'no' ? '不考虑' : '未明确'}\n` +
        `预算范围：${userProfile.budget === 'low' ? '经济型' : userProfile.budget === 'medium' ? '中等' : userProfile.budget === 'high' ? '高预算' : '未设定'}\n` +
        `特长项目：${userProfile.specialties?.join('、') || '无'}`;
    
    const chatInput = document.getElementById('chatInput');
    chatInput.value = message;
    chatInput.focus();
}

async function quickQuestion(question) {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = question;
    await sendEnhancedMessage();
}

async function sendEnhancedMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // 添加用户消息
    addEnhancedMessageToChat('user', message);
    input.value = '';
    
    try {
        // 显示正在输入
        showTypingIndicator();
        
        // 获取AI回复
        const response = await window.app.enhancedAIAssistant.ask(message);
        
        // 移除输入指示器
        removeTypingIndicator();
        
        // 添加AI回复
        addEnhancedMessageToChat('assistant', response);
        
    } catch (error) {
        console.error('AI回复失败:', error);
        removeTypingIndicator();
        addEnhancedMessageToChat('assistant', '抱歉，我暂时无法回答这个问题。请检查网络或稍后再试。');
    }
}

function addEnhancedMessageToChat(role, content) {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${role}`;
    
    // 格式化内容，支持换行和链接
    const formattedContent = content
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${role === 'user' ? '👤' : '🐱'}</div>
        <div class="message-content">${formattedContent}</div>
    `;
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator() {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) return;
    
    const indicator = document.createElement('div');
    indicator.className = 'ai-message assistant';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = `
        <div class="message-avatar">🐱</div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

// ========== 修复4：PDF文档不完整 ==========
class EnhancedReportGenerator extends ProfessionalReportGenerator {
    async exportToPDF(html) {
        console.log('📄 开始生成完整PDF报告...');
        
        try {
            // 创建优化后的HTML结构
            const optimizedHTML = this.optimizeHTMLForPDF(html);
            
            // 创建临时容器
            const tempDiv = document.createElement('div');
            tempDiv.id = 'pdf-temp-container';
            tempDiv.innerHTML = optimizedHTML;
            tempDiv.style.cssText = `
                position: absolute;
                left: -10000px;
                top: 0;
                width: 800px;
                background: white;
                font-family: 'Microsoft YaHei', 'SimSun', sans-serif;
            `;
            document.body.appendChild(tempDiv);
            
            // 等待DOM渲染
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // 动态加载PDF库
            await this.loadPDFLibraries();
            
            // 生成PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const pageHeight = pdf.internal.pageSize.height;
            const pageWidth = pdf.internal.pageSize.width;
            const margin = 20;
            
            // 分页生成PDF
            await this.generateMultiPagePDF(pdf, tempDiv, pageWidth, pageHeight, margin);
            
            // 保存PDF
            const fileName = `西安小升初评估报告_${new Date().toISOString().slice(0,10)}.pdf`;
            pdf.save(fileName);
            
            // 清理
            document.body.removeChild(tempDiv);
            
            console.log('✅ PDF生成成功:', fileName);
            return true;
            
        } catch (error) {
            console.error('PDF导出失败:', error);
            alert('PDF生成失败，已转为打印预览模式。');
            window.print();
            return false;
        }
    }
    
    optimizeHTMLForPDF(html) {
        // 优化HTML结构以适应PDF分页
        return html.replace(/<style[\s\S]*?<\/style>/gi, '') // 移除原有样式
            + `
            <style>
                @media print {
                    body { 
                        font-family: 'Microsoft YaHei', 'SimSun', sans-serif;
                        font-size: 12pt;
                        line-height: 1.5;
                        color: #000;
                        padding: 0;
                        margin: 0;
                    }
                    .report-container {
                        width: 100%;
                        max-width: none;
                        box-shadow: none;
                        border-radius: 0;
                    }
                    .report-header {
                        page-break-after: avoid;
                        background: #f8f9fa !important;
                        color: #000 !important;
                        border-bottom: 2px solid #666;
                    }
                    .section {
                        page-break-inside: avoid;
                        margin-bottom: 20px;
                    }
                    .school-card {
                        page-break-inside: avoid;
                        border: 1px solid #ddd;
                        margin-bottom: 15px;
                    }
                    h1, h2, h3, h4 {
                        page-break-after: avoid;
                    }
                    table {
                        page-break-inside: avoid;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
            </style>
        `;
    }
    
    async generateMultiPagePDF(pdf, element, pageWidth, pageHeight, margin) {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        let heightLeft = imgHeight;
        let position = margin;
        
        pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight + margin;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
    }
}

// ========== 初始化增强功能 ==========
// 在Application类初始化时使用增强版组件
window.app = new Application();

// 替换原有的组件
window.app.enhancedAIAssistant = new EnhancedAIAssistant();
window.app.enhancedSchoolMatcher = new EnhancedSchoolMatcher();
window.app.enhancedReportGenerator = new EnhancedReportGenerator();

// 更新原有的函数调用
window.app.generateRecommendations = async function() {
    try {
        const userProfile = this.userManager.collect();
        const recommendations = await this.enhancedSchoolMatcher.matchSchools(userProfile, 15);
        // ... 其他代码保持不变
    } catch (error) {
        console.error('生成推荐失败:', error);
    }
};

// ========== 页面加载时自动初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // 自动加载街道数据
        const householdDistrict = document.getElementById('householdDistrict');
        const residenceDistrict = document.getElementById('residenceDistrict');
        
        if (householdDistrict) {
            householdDistrict.addEventListener('change', function() {
                populateStreets('householdDistrict', 'householdStreet');
            });
        }
        
        if (residenceDistrict) {
            residenceDistrict.addEventListener('change', function() {
                populateStreets('residenceDistrict', 'residenceStreet');
            });
        }
        
        // 初始化能力图表
        const abilityScores = document.querySelectorAll('input[name^="score"]');
        abilityScores.forEach(input => {
            input.addEventListener('change', function() {
                setTimeout(() => {
                    generateEnhancedAbilityChart();
                }, 100);
            });
        });
        
        console.log('🎉 所有增强功能已加载完成！');
    }, 1000);
});

console.log('🚀 西安小升初智能评估系统 - 增强版已加载完成！');
