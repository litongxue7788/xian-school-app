// api/ai.js - Vercel API路由
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
    const { provider = 'bailian', message = '', apiKey = '' } = req.body;

    console.log('AI请求:', { provider, messageLength: message.length });

    if (!message) {
      return res.status(400).json({ error: '消息内容不能为空' });
    }

    if (!apiKey) {
      return res.status(400).json({ error: 'API Key不能为空' });
    }

    let result;
    
    // 阿里百炼API
    if (provider === 'bailian') {
      result = await callBailianAPI(message, apiKey);
    } 
    // DeepSeek API
    else if (provider === 'deepseek') {
      result = await callDeepSeekAPI(message, apiKey);
    } 
    // OpenAI API
    else if (provider === 'openai') {
      result = await callOpenAIAPI(message, apiKey);
    } 
    // Google Gemini API
    else if (provider === 'google') {
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

// 阿里百炼API - 优化版本
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
          {
            role: "system",
            content: `你是一个专业的西安小升初升学顾问专家，请基于2025年西安义务教育招生政策提供准确、全面、实用的信息。

你的核心服务内容包括：

🎯 学校推荐服务：
- 根据学生能力、家庭情况、地理位置等因素推荐5所最适合的学校
- 包含2所冲刺校（匹配度高但竞争激烈）、2所稳妥校（匹配度适中录取概率高）、1所保底校（确保入学）
- 每所学校提供：学校名称、类型（民办/公办）、匹配度（百分比）、推荐理由、预估摇号概率（民办）、入学概率（公办）、学校特色、推荐类型（sprint/steady/fallback）、收费标准、入学要求
- 以JSON数组格式返回推荐结果

📚 政策咨询服务：
- 详细解读西安市小升初入学顺位政策（房户一致、集体户、租房等）
- 2025年招生时间安排和重要节点
- 民办学校摇号政策和流程
- 公办学校对口入学政策
- 特殊群体入学政策

🏫 学校信息服务：
- 各学校教学质量、师资力量、校园设施
- 学校特色课程和社团活动
- 历年升学率和学生发展情况

📅 升学规划服务：
- 个性化升学时间规划
- 学业能力提升建议
- 面试准备和材料准备指导

💡 请遵循以下要求：
1. 保持专业、准确、友好的态度
2. 提供具体、可操作的建议
3. 基于真实数据和政策信息
4. 学校推荐必须返回标准JSON格式
5. 考虑学生的个性化需求和家庭实际情况

请用中文回答，确保信息准确有用。`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 4000,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`阿里百炼API错误: ${response.status}`);
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

// DeepSeek API
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
          {
            role: "system",
            content: `你是一个专业的西安小升初升学顾问专家，请基于2025年西安义务教育招生政策提供准确、全面、实用的信息。

你的核心服务内容包括：

🎯 学校推荐服务：
- 根据学生能力、家庭情况、地理位置等因素推荐5所最适合的学校
- 包含2所冲刺校（匹配度高但竞争激烈）、2所稳妥校（匹配度适中录取概率高）、1所保底校（确保入学）
- 每所学校提供：学校名称、类型（民办/公办）、匹配度（百分比）、推荐理由、预估摇号概率（民办）、入学概率（公办）、学校特色、推荐类型（sprint/steady/fallback）、收费标准、入学要求
- 以JSON数组格式返回推荐结果

📚 政策咨询服务：
- 详细解读西安市小升初入学顺位政策（房户一致、集体户、租房等）
- 2025年招生时间安排和重要节点
- 民办学校摇号政策和流程
- 公办学校对口入学政策

请用中文回答，确保信息准确有用。`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 4000,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API错误: ${response.status}`);
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

// OpenAI API
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
          {
            role: "system",
            content: `你是一个专业的西安小升初升学顾问专家，请基于2025年西安义务教育招生政策提供准确、全面、实用的信息。

你的核心服务内容包括：

🎯 学校推荐服务：
- 根据学生能力、家庭情况、地理位置等因素推荐5所最适合的学校
- 包含2所冲刺校（匹配度高但竞争激烈）、2所稳妥校（匹配度适中录取概率高）、1所保底校（确保入学）
- 每所学校提供：学校名称、类型（民办/公办）、匹配度（百分比）、推荐理由、预估摇号概率（民办）、入学概率（公办）、学校特色、推荐类型（sprint/steady/fallback）、收费标准、入学要求
- 以JSON数组格式返回推荐结果

📚 政策咨询服务：
- 详细解读西安市小升初入学顺位政策（房户一致、集体户、租房等）
- 2025年招生时间安排和重要节点
- 民办学校摇号政策和流程
- 公办学校对口入学政策

请用中文回答，确保信息准确有用。`
          },
          {
            role: "user", 
            content: message
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API错误: ${response.status}`);
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

// Google Gemini API - 优化版本
async function callGoogleAPI(message, apiKey) {
  try {
    console.log('调用 Google Gemini API');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `你是一个专业的西安小升初升学顾问专家，请基于2025年西安义务教育招生政策提供准确、全面、实用的信息。

你的核心服务内容包括：

🎯 学校推荐服务：
- 根据学生能力、家庭情况、地理位置等因素推荐5所最适合的学校
- 包含2所冲刺校（匹配度高但竞争激烈）、2所稳妥校（匹配度适中录取概率高）、1所保底校（确保入学）
- 每所学校提供：学校名称、类型（民办/公办）、匹配度（百分比）、推荐理由、预估摇号概率（民办）、入学概率（公办）、学校特色、推荐类型（sprint/steady/fallback）、收费标准、入学要求
- 以JSON数组格式返回推荐结果

📚 政策咨询服务：
- 详细解读西安市小升初入学顺位政策（房户一致、集体户、租房等）
- 2025年招生时间安排和重要节点
- 民办学校摇号政策和流程
- 公办学校对口入学政策
- 特殊群体（随迁子女、残疾儿童等）入学政策

🏫 学校信息服务：
- 各学校教学质量、师资力量、校园设施
- 学校特色课程和社团活动
- 历年升学率和学生发展情况
- 校园文化和教育理念

📅 升学规划服务：
- 个性化升学时间规划
- 学业能力提升建议
- 面试准备和材料准备指导
- 心理调适和压力管理

💡 请遵循以下要求：
1. 保持专业、准确、友好的态度
2. 提供具体、可操作的建议
3. 基于真实数据和政策信息
4. 学校推荐必须返回标准JSON格式
5. 考虑学生的个性化需求和家庭实际情况

用户问题：${message}`
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 4000,
          temperature: 0.7,
          topP: 0.8,
          topK: 40
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API 错误响应:', errorText);
      throw new Error(`Google Gemini API错误: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      const result = data.candidates[0].content.parts[0].text;
      console.log('Gemini API 成功返回，内容长度:', result.length);
      return result;
    } else {
      console.error('Gemini 返回格式异常:', JSON.stringify(data));
      throw new Error('Google Gemini返回格式异常');
    }

  } catch (error) {
    console.error('Gemini 服务异常:', error);
    throw new Error('Google Gemini服务异常: ' + error.message);
  }
}
