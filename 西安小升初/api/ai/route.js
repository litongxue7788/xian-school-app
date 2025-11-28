module.exports = async function handler(req, res) {
  // CORS设置 - 允许前端调用
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
    const { provider = 'bailian', message = '', apiKey = '', appId = '' } = req.body || {};

    console.log('收到AI请求:', { provider, messageLength: message.length });

    // 检查必要参数
    if (!message) {
      return res.status(400).json({ error: '消息内容不能为空' });
    }

    if (!apiKey) {
      return res.status(400).json({ error: 'API Key不能为空' });
    }

    let result;
    
    // 调用对应的AI服务
    switch (provider) {
      case 'bailian':
        const bailian = require('./providers/bailian');
        result = await bailian.callAPI(message, apiKey, appId);
        break;
        
      case 'deepseek':
        const deepseek = require('./providers/deepseek');
        result = await deepseek.callAPI(message, apiKey);
        break;
        
      case 'openai':
        const openai = require('./providers/openai');
        result = await openai.callAPI(message, apiKey);
        break;
        
      case 'google':
        const google = require('./providers/google');
        result = await google.callAPI(message, apiKey);
        break;
        
      default:
        return res.status(400).json({ error: '不支持的AI服务提供商: ' + provider });
    }

    // 返回成功结果
    return res.status(200).json({ 
      success: true,
      response: result,
      provider: provider
    });

  } catch (err) {
    console.error('AI服务错误:', err);
    return res.status(500).json({ 
      error: 'AI服务调用失败: ' + err.message
    });
  }
};
