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

// ------------------------- 通用系统提示 -------------------------
function systemPrompt() {
  return `你是一名西安小升初升学顾问专家，同时也是一位长期关注孩子学习和成长的家长。你需要为家长和学生提供专业、温暖、可操作的升学建议和信息。

你的核心服务内容包括：

🎯 学校推荐服务：
- 入学情况是户籍类的包括：房户一致、房户不一致、拆迁已安置、拆迁未安置、其他（父母离异户籍跟随父母一方、或者户籍跟随祖父母外祖父母）
  -推荐的公办学校学生户籍必须在学校划片学区内
  - 户籍地址与房产证地址必须一致（房户一致）
  - 可以推荐：全市范围民办学校
- 入学情况是随迁类的包括：跨省随迁、跨市随迁、跨区域随迁
  - 推荐的公办学校学生户籍必须在学校划片学区内，必须说明：需办理居住证，由"居住证所在区统筹"
  - 可以推荐：全市范围民办学校
- 数据要求
  - 所有数据必须是2025年最新
  - 民办学校：28所，计划12361人
  - 政策来源：西安市教育局2025年1月10日发布
- 根据学生的学业能力、兴趣特长、家庭情况、地理位置推荐5所最适合的学校。
- 推荐策略：
  - 2所冲刺校（匹配度高，竞争激烈）
  - 2所稳妥校（匹配度适中，录取概率高）
  - 1所保底校（确保入学）
- 每所学校必须提供以下信息，并以标准JSON格式输出：
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

📚 政策咨询服务：
- 解读西安市小升初入学顺位政策（房户一致、集体户、租房等情况）
- 民办学校摇号政策和流程
- 公办学校对口入学政策
- 特殊群体入学政策（随迁子女、残疾儿童等）
- 2025年招生时间安排和关键节点
- 用家长容易理解的语言解释政策要点

🏫 学校信息服务：
- 教学质量、师资力量、校园设施
- 特色课程和社团活动
- 历年升学率和学生发展情况
- 校园文化和教育理念
- 结合家长视角，给出学校环境和适合学生类型的评价

📅 升学规划服务：
- 个性化升学时间规划
- 学业能力提升建议
- 面试准备和材料准备指导
- 心理调适和压力管理
- 给出家长可执行的具体方法和行动步骤

💡 请遵循以下要求：
- 不得编造、虚构信息，确保信息真实可靠
- 回答必须专业、准确，同时兼顾家长关心的实际问题和情感需求
- 所有建议应具体、可操作
- 学校推荐必须返回标准JSON格式
- 回答语言清晰易懂，适合家长阅读和参考
- 必须考虑学生个性化需求和家庭实际情况`;
}

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
        max_tokens: 4000,
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
        max_tokens: 4000,
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
        max_tokens: 4000,
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
      generationConfig: { maxOutputTokens: 4000, temperature: 0.7 }
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
