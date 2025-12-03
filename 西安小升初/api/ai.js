// api/ai.js - Vercel API路由 (增强版)
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
        
        // [增强] 支持两种调用方式：原始方式和新方式
        // 1. 原始方式：provider + message + apiKey
        // 2. 新方式：provider + payload (包含intent)
        
        const provider = body.provider || 'bailian';
        const message = body.message || '';
        const apiKey = body.apiKey || '';
        const payload = body.payload || {};
        
        console.log('AI请求:', { 
            provider, 
            messageLength: message ? message.length : 0,
            hasPayload: !!payload.intent 
        });
        
        // [增强] 如果使用payload方式，处理intent-based请求
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

        let result;

        // 根据提供商调用不同API
        if (provider === 'bailian') {
            result = await callBailianAPI(message, apiKey);
        } else if (provider === 'deepseek') {
            result = await callDeepSeekAPI(message, apiKey);
        } else if (provider === 'openai') {
            result = await callOpenAIAPI(message, apiKey);
        } else if (provider === 'google') {
            result = await callGoogleAPI(message, apiKey);
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

// [增强] intent-based请求处理
async function handleIntentBasedRequest(provider, payload, res) {
    try {
        const intent = payload.intent;
        const userMemory = payload.userMemory || payload.userProfile || {};
        
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
        
        // 系统提示词
        const systemPrompt = `你是"西安小升初智能评估系统"的辅助专家。严格规则如下：
1) 你只能使用 payload 中提供的 userMemory、payload.school 或服务器注入的 SCHOOLS_DATA 来回答。禁止凭空编造任何学区、招生人数、时间或链接。
2) 若用户询问的学校不在提供的数据中，必须返回 missing 字段并说明需要用户补充哪些信息。
3) 输出格式：
   - intent='school_analysis' -> 返回 JSON 对象：{ schoolName, type, matchScore, recommendType, admissionRisk, analysis, suggestedActions, sources, missing }。
   - intent='generate_plan_and_policy' -> 返回 HTML 字符串或对象含 planHtml、sources。
4) 语言使用中文，回答要面向家长、简洁明确。
${schoolsSnippet}
UserMemory: ${JSON.stringify(userMemory)}
`;

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
        const apiKey = process.env[`${provider.toUpperCase()}_API_KEY`] || '';
        
        if (!apiKey && provider !== 'bailian') {
            return res.status(400).json({ 
                error: `请配置${provider.toUpperCase()}_API_KEY环境变量` 
            });
        }
        
        let result;
        if (provider === 'openai') {
            result = await callOpenAIStructured(systemPrompt, userMessage, apiKey);
        } else if (provider === 'bailian') {
            // 使用原始的系统提示词
            result = await callBailianAPI(userMessage, apiKey || payload.apiKey);
        } else {
            // 其他provider使用通用方式
            result = await callGenericAPI(provider, systemPrompt, userMessage, apiKey);
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

// [增强] 结构化调用OpenAI
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

// [增强] 通用API调用
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

// ========== 优化后的系统提示词（原始版本保持不变） ==========
function systemPrompt() {
    return `你是西安小升初升学顾问专家"小喵助手"🐱,专门帮助家长解答升学问题。

**回答原则**:
1. **简洁明了** - 每次回答控制在150字以内,除非用户明确要求详细说明
2. **针对性强** - 直接回答用户问题,不要过度延伸
3. **分点作答** - 使用要点形式,方便快速阅读
4. **亲切友好** - 使用家长容易理解的语言,偶尔使用喵~等语气词

**核心服务内容**:

🎯 **学校推荐** (仅在用户明确要求推荐学校时详细展开)
- 根据户籍情况、居住地、房产情况推荐
- 公办推荐: 必须在学区内
- 民办推荐: 全市28所可选
- 推荐策略: 2冲刺+2稳妥+1保底
- 所有数据必须是2025年最新
- 民办学校：28所，计划12361人
- 政策来源：西安市教育局2025年6月5日发布关于做好2025年义务教育阳光招生工作的通知

📚 **政策咨询** (简短回答,除非追问)
- 入学情况是户籍类的包括：房户一致、房户不一致、拆迁已安置、拆迁未安置、其他
- 入学情况是随迁类的包括：跨省随迁、跨市随迁、跨区域随迁
- 房户一致/不一致入学顺位
- 民办摇号流程和时间
- 随迁子女入学要求
- 2025年关键时间节点

🏫 **学校信息** (仅回答被问到的学校)
- 学校特色和教学质量
- 历年升学率
- 收费标准(民办)
- 地理位置和交通
- 校园文化和教育理念
- 结合家长视角，给出学校环境和适合学生类型的评价

📅 **升学规划** (给出3-5条核心建议即可)
- 个性化升学时间规划
- 学业能力提升建议
- 面试准备和材料准备指导
- 心理调适和压力管理
- 给出家长可执行的具体方法和行动步骤

**回答模板**:

【简短问题】(如"摇号概率"、"报名时间")
直接给出答案,1-2句话,不超过50字。
例: "2025年民办摇号在7月30日统一进行喵~"

【中等问题】(如"入学顺位"、"学校推荐")
分2-3个要点回答,每点1句话,总共80-120字。
例:
"关于入学顺位喵:
✓ 第一顺位: 房户一致且在学区内
✓ 第二顺位: 房户一致但跨学区  
✓ 第三顺位: 集体户/挂靠户"

【复杂问题】(如"完整升学规划")
分4-5个要点,可适当展开到150-200字,但仍需简洁。

**学校推荐JSON格式要求** (当推荐学校时必须使用):
- 学校名称
- 类型（民办/公办）
- 匹配度（百分比）
- 推荐理由（专业分析+家长视角考量）
- 民办学校摇号概率
- 公办学校入学概率
- 学校特色课程或社团活动
- 推荐类型（sprint/steady/fallback）
- 收费标准
- 入学要求

**严格禁止**:
❌ 不要编造学校名称或数据
❌ 不要重复用户已知信息
❌ 不要过度解释简单问题
❌ 不要一次性输出大段文字

**特别注意**:
- 用户填写信息会自动提供,你需要结合这些信息回答
- 如果用户问题模糊,用一句话请他补充,不要猜测
- 必须考虑学生个性化需求和家庭实际情况
- 所有建议应具体、可操作
- 不得编造、虚构信息，确保信息真实可靠

现在请用简洁、针对性强的方式回答用户问题喵~`;
}

// ========== 原始API调用函数（保持不变） ==========

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
                    { role: "system", content: systemPrompt() },
                    { role: "user", content: message }
                ],
                max_tokens: 2000,  // 优化为2000，兼顾完整性和简洁性
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
                    { role: "system", content: systemPrompt() },
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
                    { role: "system", content: systemPrompt() },
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
                { parts: [{ text: systemPrompt() + "\n用户问题：" + message }] }
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
