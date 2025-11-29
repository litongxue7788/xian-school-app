// api/ai.js - 完整可运行版本
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // CORS设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { provider = 'bailian', message = '', apiKey = '' } = req.body;

    if (!message) return res.status(400).json({ error: '消息内容不能为空' });
    if (!apiKey) return res.status(400).json({ error: 'API Key不能为空' });

    let result;

    switch(provider) {
      case 'bailian':
        result = await callBailianAPI(message, apiKey);
        break;
      case 'deepseek':
        result = await callDeepSeekAPI(message, apiKey);
        break;
      case 'openai':
        result = await callOpenAIAPI(message, apiKey);
        break;
      case 'google':
        result = await callGoogleAPI(message, apiKey);
        break;
      default:
        return res.status(400).json({ error: '不支持的AI服务提供商' });
    }

    return res.status(200).json({ success: true, response: result, provider });

  } catch (err) {
    console.error('AI服务错误:', err);
    return res.status(500).json({ error: 'AI服务调用失败: ' + err.message });
  }
}

// ====== Bailian API ======
async function callBailianAPI(message, apiKey) {
  const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'qwen-plus',
      messages: [{ role: 'system', content: generatePrompt() }, { role: 'user', content: message }],
      max_tokens: 4000,
      temperature: 0.7
    })
  });

  if (!response.ok) throw new Error(`Bailian API错误: ${response.status}`);
  const data = await response.json();
  if (data.choices?.[0]?.message?.content) return data.choices[0].message.content;
  throw new Error('Bailian返回格式异常');
}

// ====== DeepSeek API ======
async function callDeepSeekAPI(message, apiKey) {
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'system', content: generatePrompt() }, { role: 'user', content: message }],
      max_tokens: 4000,
      temperature: 0.7
    })
  });

  if (!response.ok) throw new Error(`DeepSeek API错误: ${response.status}`);
  const data = await response.json();
  if (data.choices?.[0]?.message?.content) return data.choices[0].message.content;
  throw new Error('DeepSeek返回格式异常');
}

// ====== OpenAI API ======
async function callOpenAIAPI(message, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: generatePrompt() }, { role: 'user', content: message }],
      max_tokens: 4000,
      temperature: 0.7
    })
  });

  if (!response.ok) throw new Error(`OpenAI API错误: ${response.status}`);
  const data = await response.json();
  if (data.choices?.[0]?.message?.content) return data.choices[0].message.content;
  throw new Error('OpenAI返回格式异常');
}

// ====== Google Gemini API ======
async function callGoogleAPI(message, apiKey) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: generatePrompt() + '\n用户问题：' + message }] }],
      generationConfig: { maxOutputTokens: 4000, temperature: 0.7, topP: 0.8, topK: 40 },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
      ]
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google Gemini API错误: ${response.status}, ${text}`);
  }

  const data = await response.json();
  if (data.candidates?.[0]?.content?.parts?.[0]?.text) return data.candidates[0].content.parts[0].text;
  throw new Error('Google Gemini返回格式异常');
}

// ====== 提示词生成 ======
function generatePrompt() {
  return `你是一个专业的西安小升初升学顾问专家，请基于2025年西安义务教育招生政策提供准确、全面、实用的信息。

🎯 学校推荐服务：
- 根据学生能力、家庭情况、地理位置等因素推荐5所最适合的学校
- 包含2所冲刺校、2所稳妥校、1所保底校
- 每所学校提供：学校名称、类型、匹配度、推荐理由、预估摇号概率/入学概率、学校特色、推荐类型、收费标准、入学要求
- JSON数组返回

📚 政策咨询服务：
- 详细解读西安市小升初入学顺位政策（房户一致、集体户、租房等）
- 民办摇号政策和流程、公办对口入学政策
- 特殊群体入学政策

🏫 学校信息服务：
- 教学质量、师资力量、校园设施、特色课程和社团、历年升学率、校园文化

📅 升学规划服务：
- 个性化时间规划、学业能力提升建议、面试和材料准备、心理调适

💡 遵循要求：
1. 保持专业、准确、友好
2. 提供可操作建议
3. 基于真实数据
4. 学校推荐必须为标准JSON格式
5. 考虑学生个性化和家庭实际情况`;
}
