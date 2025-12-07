// api/ai.js - 增强合并版（兼容原始方式和intent-based方式）
export default async function handler(req, res) {
    // CORS设置
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const body = req.body || {};
        
        // 支持两种调用方式
        const provider = body.provider || 'bailian';
        const message = body.message || '';
        const apiKey = body.apiKey || '';
        const payload = body.payload || {};
        
        // 【增强】接收完整的用户信息
        const userFullInfo = body.userFullInfo || '';
        const userData = body.userData || {};
        
        console.log('AI请求:', { 
            provider, 
            messageLength: message ? message.length : 0,
            hasPayload: !!payload.intent,
            hasUserInfo: !!userFullInfo || Object.keys(userData).length > 0
        });
        
        // 【增强】如果使用payload方式，处理intent-based请求
        if (payload.intent) {
            return await handleIntentBasedRequest(provider, payload, res);
        }
        
        // 原始方式处理（保持兼容）
        if (!message) {
            return res.status(400).json({ error: '消息内容不能为空' });
        }

        if (!apiKey) {
            return res.status(400).json({ error: 'API Key不能为空' });
        }

        // 【增强】构建包含完整用户信息的上下文消息
        const contextualMessage = buildContextualMessage(message, userFullInfo, userData);
        
        let result;

        // 根据提供商调用不同API
        if (provider === 'bailian') {
            result = await callBailianAPI(contextualMessage, apiKey);
        } else if (provider === 'deepseek') {
            result = await callDeepSeekAPI(contextualMessage, apiKey);
        } else if (provider === 'openai') {
            result = await callOpenAIAPI(contextualMessage, apiKey);
        } else if (provider === 'google') {
            result = await callGoogleAPI(contextualMessage, apiKey);
        } else {
            return res.status(400).json({ error: '不支持的AI服务提供商' });
        }

        return res.status(200).json({
            success: true,
            response: result,
            provider
        });

    } catch (err) {
        console.error('AI服务错误:', err);
        return res.status(500).json({
            error: 'AI服务调用失败: ' + err.message
        });
    }
}

// 【增强】处理intent-based请求
async function handleIntentBasedRequest(provider, payload, res) {
    try {
        const intent = payload.intent;
        const userMemory = payload.userMemory || payload.userProfile || {};
        const apiKey = payload.apiKey || process.env[`${provider.toUpperCase()}_API_KEY`] || '';
        
        console.log('处理intent请求:', { intent, provider });
        
        // 读取学校数据（如果存在）
        let schoolsSnippet = '';
        try {
            // 在Vercel环境中，需要动态导入
            if (typeof process !== 'undefined' && process.env) {
                const fs = await import('fs');
                const path = await import('path');
                
                // 尝试读取schools.json
                const dataDir = path.resolve('./data');
                const schoolsFile = path.join(dataDir, 'schools.json');
                
                // 检查文件是否存在（需要正确配置Vercel）
                if (fs.existsSync && fs.existsSync(schoolsFile)) {
                    const txt = fs.readFileSync(schoolsFile, 'utf8');
                    const arr = JSON.parse(txt);
                    // 包含一小部分数据
                    const slice = (arr || []).slice(0, 12).map(s => ({ 
                        id: s.id, 
                        name: s.name, 
                        type: s.type, 
                        district: s.district, 
                        streets: s.streets || [], 
                        sources: s.sources || [] 
                    }));
                    schoolsSnippet = `\nSCHOOLS_DATA: ${JSON.stringify(slice)}\n`;
                }
            }
        } catch (e) {
            console.warn('读取schools.json失败（可能在生产环境中不可用）', e.message);
            // 在生产环境中可能无法访问文件系统，这是正常的
        }
        
        // 【增强】构建包含用户完整信息的系统提示词
        const enhancedSystemPrompt = getEnhancedSystemPrompt() + schoolsSnippet + 
                                   `\n用户完整信息: ${JSON.stringify(userMemory)}`;
        
        // 构建用户消息
        let userMessage = '';
        if (intent === 'school_analysis') {
            userMessage = `请基于提供的学校信息和用户信息做结构化分析，并按规则返回JSON。学校：${JSON.stringify(payload.school || payload.schoolId || {})}。用户：${JSON.stringify(userMemory)}。`;
        } else if (intent === 'generate_plan_and_policy') {
            userMessage = `请基于用户信息生成${payload.requirements?.years || 3}年升学规划（HTML），包含关键节点、材料清单、风险提示，并在末尾列出sources数组。用户信息：${JSON.stringify(userMemory)}。`;
        } else {
            userMessage = `请回答用户提问：${payload.question || ''}。用户信息：${JSON.stringify(userMemory)}`;
        }
        
        // 根据provider调用
        if (!apiKey && provider !== 'bailian') {
            return res.status(400).json({ 
                error: `请配置${provider.toUpperCase()}_API_KEY环境变量或提供apiKey参数` 
            });
        }
        
        let result;
        if (provider === 'openai') {
            result = await callOpenAIStructured(enhancedSystemPrompt, userMessage, apiKey);
        } else if (provider === 'bailian') {
            result = await callBailianAPI(userMessage, apiKey);
        } else {
            result = await callGenericAPI(provider, enhancedSystemPrompt, userMessage, apiKey);
        }
        
        // 解析结果
        if (intent === 'school_analysis') {
            try {
                const parsed = JSON.parse(result);
                return res.status(200).json({ success: true, result: parsed });
            } catch (e) {
                // 如果不是JSON，包装成分析字段
                return res.status(200).json({ 
                    success: true, 
                    result: { analysis: result } 
                });
            }
        } else {
            return res.status(200).json({ 
                success: true, 
                result: result 
            });
        }
        
    } catch (err) {
        console.error('Intent处理错误:', err);
        return res.status(500).json({ 
            error: 'AI处理失败: ' + err.message 
        });
    }
}

// 【新增】构建包含完整上下文的消息
function buildContextualMessage(userQuestion, userFullInfo, userData) {
    let contextMessage = '';
    
    // 1. 如果有完整的用户信息字符串，直接使用
    if (userFullInfo) {
        contextMessage += userFullInfo + '\n\n';
    }
    
    // 2. 如果有结构化的用户数据，添加关键信息
    if (userData && Object.keys(userData).length > 0) {
        contextMessage += '【关键信息摘要】\n';
        
        // 入学类型
        if (userData.户籍所在区) {
            contextMessage += `- 户籍：${userData.户籍所在区} ${userData.户籍所在街道 || ''}\n`;
        }
        
        if (userData.实际居住区) {
            contextMessage += `- 居住：${userData.实际居住区} ${userData.实际居住街道 || ''}\n`;
        }
        
        // 房产情况
        if (userData.学区房情况) {
            contextMessage += `- 学区房：${userData.学区房情况}\n`;
        }
        
        // 预算
        if (userData.民办学校预算) {
            contextMessage += `- 预算：${userData.民办学校预算}\n`;
        }
        
        // 特长
        if (userData.学生特长 && userData.学生特长.length > 0) {
            contextMessage += `- 特长：${userData.学生特长.join('、')}\n`;
        }
        
        contextMessage += '\n';
    }
    
    // 3. 添加用户问题
    contextMessage += `【用户问题】\n${userQuestion}`;
    
    return contextMessage;
}

// 【增强】系统提示词 - 强调使用用户完整信息
function getEnhancedSystemPrompt() {
    return `你是西安小升初升学顾问专家"小喵助手"🐱，专门帮助家长解答升学问题。

**核心原则**:
1. **必须基于用户提供的完整信息回答** - 用户会在消息开头提供完整的填写信息，你必须仔细阅读并使用这些信息
2. **户籍居住分析** - 重点分析户籍区、居住区的匹配关系，判断学生是户籍类还是随迁类
3. **公办推荐规则** - 户籍类学生只能报户籍所在区的公办学校，随迁类只能报居住证所在区
4. **民办推荐规则** - 民办学校全市可报，但要考虑距离、预算、特长匹配等因素
5. **数据真实性** - 只使用本地学校数据库的信息，不得编造学校名称或数据

**回答格式要求**:
- 简洁明了，每次回答控制在150字以内
- 使用要点形式，方便快速阅读
- 亲切友好，使用家长容易理解的语言
- 针对性强，直接回答用户问题

**服务内容**:

🎯 **学校推荐** (仅在用户明确要求推荐学校时详细展开)
- 根据户籍情况、居住地、房产情况推荐
- 公办推荐: 必须在学区内
- 民办推荐: 全市28所可选
- 推荐策略: 2冲刺+2稳妥+1保底
- 所有数据必须是2025年最新
- 政策来源：西安市教育局2025年6月5日发布

📚 **政策咨询** (简短回答,除非追问)
- 入学顺位判断（基于用户实际情况）
- 民办摇号流程
- 随迁子女入学要求
- 2025年关键时间节点

🏫 **学校信息** (仅回答被问到的学校)
- 学校特色和教学质量
- 历年升学率
- 收费标准(民办)
- 地理位置和交通

📅 **升学规划** (给出3-5条核心建议即可)
- 个性化升学时间规划
- 学业能力提升建议
- 心理调适和压力管理

**重要提示**:
- 用户填写信息会自动提供在消息开头，你必须仔细分析这些信息
- 如果用户信息不完整，用一句话请他补充，不要猜测
- 所有建议应具体、可操作
- 不得编造、虚构信息，确保信息真实可靠
- 必须考虑学生个性化需求和家庭实际情况

**关键判断逻辑**:
1. 户籍类（房户一致）→ 第一顺位 → 可报户籍区公办
2. 户籍类（房户不一致）→ 第二顺位 → 可报户籍区公办
3. 集体户 → 第三顺位 → 统筹安排
4. 随迁类 → 第四顺位 → 居住证所在区统筹

现在请用简洁、针对性强的方式回答用户问题喵~`;
}

// 【增强】结构化调用OpenAI
async function callOpenAIStructured(systemPrompt, userMessage, apiKey) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
            max_tokens: 1400,
            temperature: 0.15
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API错误: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
    } else {
        throw new Error('OpenAI返回格式异常');
    }
}

// 【增强】通用API调用
async function callGenericAPI(provider, systemPrompt, userMessage, apiKey) {
    let url, headers, body;
    
    if (provider === 'deepseek') {
        url = 'https://api.deepseek.com/chat/completions';
        headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        };
        body = {
            model: "deepseek-chat",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
            max_tokens: 1400,
            temperature: 0.15
        };
    } else if (provider === 'google') {
        url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        headers = { "Content-Type": "application/json" };
        body = {
            contents: [
                { parts: [{ text: systemPrompt + "\n用户问题：" + userMessage }] }
            ],
            generationConfig: { maxOutputTokens: 1400, temperature: 0.15 }
        };
    } else {
        throw new Error(`不支持的provider: ${provider}`);
    }
    
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${provider} API错误: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    
    if (provider === 'google') {
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini 返回为空";
    } else {
        return data.choices?.[0]?.message?.content || data.choices?.[0]?.text || '';
    }
}

// ========== API调用函数（保持不变） ==========

// ------------------------- 阿里百炼 API -------------------------
async function callBailianAPI(message, apiKey) {
    try {
        const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "qwen-plus",
                messages: [
                    { role: "system", content: getEnhancedSystemPrompt() },
                    { role: "user", content: message }
                ],
                max_tokens: 2000,
                temperature: 0.7,
                stream: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`阿里百炼API错误: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            throw new Error('阿里百炼返回格式异常');
        }
    } catch (error) {
        throw new Error('阿里百炼服务异常: ' + error.message);
    }
}

// ------------------------- DeepSeek API -------------------------
async function callDeepSeekAPI(message, apiKey) {
    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: getEnhancedSystemPrompt() },
                    { role: "user", content: message }
                ],
                max_tokens: 2000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`DeepSeek API错误: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            throw new Error('DeepSeek返回格式异常');
        }
    } catch (error) {
        throw new Error('DeepSeek服务异常: ' + error.message);
    }
}

// ------------------------- OpenAI API -------------------------
async function callOpenAIAPI(message, apiKey) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: getEnhancedSystemPrompt() },
                    { role: "user", content: message }
                ],
                max_tokens: 2000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenAI API错误: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            throw new Error('OpenAI返回格式异常');
        }
    } catch (error) {
        throw new Error('OpenAI服务异常: ' + error.message);
    }
}

// ------------------------- Google Gemini API -------------------------
async function callGoogleAPI(message, apiKey) {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const body = {
            contents: [
                { parts: [{ text: getEnhancedSystemPrompt() + "\n用户问题：" + message }] }
            ],
            generationConfig: { maxOutputTokens: 2000, temperature: 0.7 }
        };

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("Gemini 错误响应:", errText);
            throw new Error(`Google Gemini API 错误: ${response.status}`);
        }

        const data = await response.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini 返回为空";
    } catch (error) {
        console.error('Gemini 服务异常:', error);
        throw new Error('Google Gemini服务异常: ' + error.message);
    }
}
