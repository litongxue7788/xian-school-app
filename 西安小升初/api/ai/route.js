// 简化的路由 - 直接处理所有AI请求
const bailian = require('./providers/bailian');
const openai = require('./providers/openai');
const deepseek = require('./providers/deepseek');
const google = require('./providers/google');

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

    console.log('AI请求:', { provider, messageLength: message.length });

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
    if (provider === 'bailian') {
      result = await bailian.callAPI(message, apiKey, appId);
    } else if (provider === 'deepseek') {
      result = await deepseek.callAPI(message, apiKey);
    } else if (provider === 'openai') {
      result = await openai.callAPI(message, apiKey);
    } else if (provider === 'google') {
      result = await google.callAPI(message, apiKey);
    } else {
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
