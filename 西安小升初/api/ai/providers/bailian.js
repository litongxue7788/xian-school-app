我有const https = require('https');

function bailianProvider() {
  const API_KEY = process.env.BAILIAN_API_KEY;
  const APP_ID = process.env.BAILIAN_APP_ID;

  async function _request(prompt, history = []) {
    if (!API_KEY || !APP_ID) {
      throw new Error('BAILIAN_API_KEY and BAILIAN_APP_ID must be set in environment variables.');
    }

    const postData = JSON.stringify({
      app_id: APP_ID,
      prompt: prompt,
      history: history,
      stream: false
    });

    const options = {
      hostname: 'bailian.aliyuncs.com',
      path: '/v2/app/completions',
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
          // Do not check status code here, just resolve with the full response
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

  return {
    chat: async ({ prompt, history }) => {
      const response = await _request(prompt, history);
      try {
        const data = JSON.parse(response.body);
        if (response.statusCode >= 200 && response.statusCode < 300 && data.Success && data.Data && data.Data.Text) {
          return { text: data.Data.Text };
        } else {
          console.error('Bailian API error for chat:', data);
          return { text: `AI服务返回错误，状态码: ${response.statusCode}, 错误信息: ${data.Message || response.body}` };
        }
      } catch (e) {
        console.error('Failed to parse Bailian response for chat:', e, response.body);
        return { text: `AI服务响应解析失败: ${response.body}` };
      }
    },

    recommend: async ({ prompt }) => {
        const response = await _request(prompt);
        try {
            const data = JSON.parse(response.body);
            if (response.statusCode >= 200 && response.statusCode < 300 && data.Success && data.Data && data.Data.Text) {
                try {
                    return JSON.parse(data.Data.Text);
                } catch(e) {
                    console.error("Failed to parse AI recommendation JSON from text:", e, data.Data.Text);
                    return {
                        recommendations: [],
                        timeline: [],
                        advice: "AI返回了无法解析的JSON格式，请检查模型输出。"
                    };
                }
            } else {
                console.error('Bailian API error for recommend:', data);
                return {
                    recommendations: [],
                    timeline: [],
                    advice: `AI服务返回错误: ${data.Message || response.body}`
                };
            }
        } catch (e) {
            console.error('Failed to parse Bailian response for recommend:', e, response.body);
            return {
                recommendations: [],
                timeline: [],
                advice: `AI服务响应解析失败: ${response.body}`
            };
        }
    },

    analyze: async ({ prompt }) => {
        const response = await _request(prompt);
        try {
            const data = JSON.parse(response.body);
            if (response.statusCode >= 200 && response.statusCode < 300 && data.Success && data.Data && data.Data.Text) {
                return { text: data.Data.Text };
            } else {
                console.error('Bailian API error for analyze:', data);
                return { text: `AI服务返回错误: ${data.Message || response.body}` };
            }
        } catch (e) {
            console.error('Failed to parse Bailian response for analyze:', e, response.body);
            return { text: `AI服务响应解析失败: ${response.body}` };
        }
    },

    interpret: async ({ prompt }) => {
        const response = await _request(prompt);
        try {
            const data = JSON.parse(response.body);
            if (response.statusCode >= 200 && response.statusCode < 300 && data.Success && data.Data && data.Data.Text) {
                return { text: data.Data.Text };
            } else {
                console.error('Bailian API error for interpret:', data);
                return { text: `AI服务返回错误: ${data.Message || response.body}` };
            }
        } catch (e) {
            console.error('Failed to parse Bailian response for interpret:', e, response.body);
            return { text: `AI服务响应解析失败: ${response.body}` };
        }
    }
  };
}

module.exports = bailianProvider;
