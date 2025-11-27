const https = require('https');

function googleProvider() {
  const API_KEY = process.env.GOOGLE_API_KEY;

  async function _request(prompt) {
    if (!API_KEY) {
      throw new Error('GOOGLE_API_KEY must be set in environment variables.');
    }

    const postData = JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

  function_extract_text(data) {
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    return null;
  }

  return {
    chat: async ({ prompt }) => {
      const response = await _request(prompt);
      try {
        const data = JSON.parse(response.body);
        const text = function_extract_text(data);
        if (response.statusCode >= 200 && response.statusCode < 300 && text) {
          return { text: text };
        } else {
          console.error('Google API error for chat:', data);
          return { text: `AI服务返回错误，状态码: ${response.statusCode}, 错误信息: ${data.error ? data.error.message : response.body}` };
        }
      } catch (e) {
        console.error('Failed to parse Google response for chat:', e, response.body);
        return { text: `AI服务响应解析失败: ${response.body}` };
      }
    },

    recommend: async ({ prompt }) => {
      const response = await _request(prompt);
      try {
        const data = JSON.parse(response.body);
        const text = function_extract_text(data);
        if (response.statusCode >= 200 && response.statusCode < 300 && text) {
          try {
            return JSON.parse(text);
          } catch(e) {
            console.error("Failed to parse AI recommendation JSON from text:", e, text);
            return {
              recommendations: [],
              timeline: [],
              advice: "AI返回了无法解析的JSON格式，请检查模型输出。"
            };
          }
        } else {
          console.error('Google API error for recommend:', data);
          return {
            recommendations: [],
            timeline: [],
            advice: `AI服务返回错误: ${data.error ? data.error.message : response.body}`
          };
        }
      } catch (e) {
        console.error('Failed to parse Google response for recommend:', e, response.body);
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
            const text = function_extract_text(data);
            if (response.statusCode >= 200 && response.statusCode < 300 && text) {
                return { text: text };
            } else {
                console.error('Google API error for analyze:', data);
                return { text: `AI服务返回错误: ${data.error ? data.error.message : response.body}` };
            }
        } catch (e) {
            console.error('Failed to parse Google response for analyze:', e, response.body);
            return { text: `AI服务响应解析失败: ${response.body}` };
        }
    },

    interpret: async ({ prompt }) => {
        const response = await _request(prompt);
        try {
            const data = JSON.parse(response.body);
            const text = function_extract_text(data);
            if (response.statusCode >= 200 && response.statusCode < 300 && text) {
                return { text: text };
            } else {
                console.error('Google API error for interpret:', data);
                return { text: `AI服务返回错误: ${data.error ? data.error.message : response.body}` };
            }
        } catch (e) {
            console.error('Failed to parse Google response for interpret:', e, response.body);
            return { text: `AI服务响应解析失败: ${response.body}` };
        }
    }
  };
}

module.exports = googleProvider;
