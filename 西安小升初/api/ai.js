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

// ========== 优化后的系统提示词 ==========
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
