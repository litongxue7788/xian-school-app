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

// 阿里百炼API - OpenAI兼容模式
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
            content: "你是一个专业的西安小升初政策咨询助手，请基于2025年西安义务教育招生政策提供准确、有用的信息。"
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 2000,
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
            content: "你是一个专业的西安小升初政策咨询助手，请基于2025年西安义务教育招生政策提供准确、有用的信息。"
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 2000,
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
            content: "你是一个专业的西安小升初政策咨询助手，请基于2025年西安义务教育招生政策提供准确、有用的信息。"
          },
          {
            role: "user", 
            content: message
          }
        ],
        max_tokens: 2000,
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

// Google Gemini API
async function callGoogleAPI(message, apiKey) {
  try {
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
                text: "你是一个专业的西安小升初政策咨询助手，请基于2025年西安义务教育招生政策提供准确、有用的信息。\n\n用户问题：" + message
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 2000,
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Google Gemini API错误: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Google Gemini返回格式异常');
    }

  } catch (error) {
    throw new Error('Google Gemini服务异常: ' + error.message);
  }
}
