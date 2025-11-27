
const https = require('https');

function bailianProvider() {
  const API_KEY = process.env.DASHSCOPE_API_KEY || process.env.BAILIAN_API_KEY; // 兼容旧版环境变量
  const MODEL = process.env.BAILIAN_MODEL || 'qwen-plus'; // 默认使用 qwen-plus 模型

  async function _request(prompt, history = [], stream = false) {
    if (!API_KEY) {
      throw new Error('DASHSCOPE_API_KEY must be set in environment variables.');
    }

    const messages = [{ role: 'system', content: 'You are a helpful assistant.' }];
    if (history) {
        history.forEach(h => messages.push({ role: h.role, content: h.content }));
    }
    messages.push({ role: 'user', content: prompt });

    const postData = JSON.stringify({
      model: MODEL,
      messages: messages,
      stream: stream
    });

    const options = {
      hostname: 'dashscope.aliyuncs.com',
      path: '/compatible-mode/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, body: data });
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      req.write(postData);
      req.end();
    });
  }

  async function handleChat(prompt, history) {
    const response = await _request(prompt, history);
    try {
      const data = JSON.parse(response.body);
      if (response.statusCode >= 200 && response.statusCode < 300 && data.choices && data.choices[0].message) {
        return { text: data.choices[0].message.content };
      } else {
        console.error('DashScope API error:', data);
        return { text: `AI服务返回错误，状态码: ${response.statusCode}, 错误信息: ${data.error ? data.error.message : response.body}` };
      }
    } catch (e) {
      console.error('Failed to parse DashScope response:', e, response.body);
      return { text: `AI服务响应解析失败: ${response.body}` };
    }
  }

  return {
    chat: async ({ prompt, history }) => handleChat(prompt, history),
    recommend: async ({ prompt }) => handleChat(prompt),
    analyze: async ({ prompt }) => handleChat(prompt),
    interpret: async ({ prompt }) => handleChat(prompt)
  };
}

module.exports = bailianProvider;
