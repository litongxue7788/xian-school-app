exports.handler = async function(event, context) {
  // CORS设置
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // 处理预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // 只处理POST请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { provider = 'bailian', message = '', apiKey = '', appId = '' } = body;

    console.log('收到AI请求:', { provider, messageLength: message.length });

    // 检查必要参数
    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '消息内容不能为空' })
      };
    }

    if (!apiKey) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'API Key不能为空' })
      };
    }

    let result;
    
    // 调用对应的AI服务
    switch (provider) {
      case 'bailian':
        result = await callBailianAPI(message, apiKey, appId);
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
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: '不支持的AI服务提供商: ' + provider })
        };
    }

    // 返回成功结果
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        response: result,
        provider: provider
      })
    };

  } catch (err) {
    console.error('AI服务错误:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'AI服务调用失败: ' + err.message
      })
    };
  }
};

// 阿里百炼API
async function callBailianAPI(message, apiKey, appId = '') {
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
            content: "你是一个专业的西安小升初政策咨询助手，请基于2025年西安义务教育招生政策提供准确、有用的信息。回答要简洁明了，重点突出。"
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
      throw new Error(`阿里百炼API错误: ${response.status} - ${errorText}`);
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
            content: "你是一个专业的西安小升初政策咨询助手，请基于2025年西安义务教育招生政策提供准确、有用的信息。回答要简洁明了，重点突出。"
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
      const errorData = await response.json();
      throw new Error(`DeepSeek API错误: ${response.status} - ${errorData.message || '未知错误'}`);
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
            content: "你是一个专业的西安小升初政策咨询助手，请基于2025年西安义务教育招生政策提供准确、有用的信息。回答要简洁明了，重点突出。"
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
      const errorData = await response.json();
      throw new Error(`OpenAI API错误: ${response.status} - ${errorData.error?.message || '未知错误'}`);
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
                text: "你是一个专业的西安小升初政策咨询助手，请基于2025年西安义务教育招生政策提供准确、有用的信息。回答要简洁明了，重点突出。\n\n用户问题：" + message
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
      const errorData = await response.json();
      throw new Error(`Google Gemini API错误: ${response.status} - ${errorData.error?.message || '未知错误'}`);
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
