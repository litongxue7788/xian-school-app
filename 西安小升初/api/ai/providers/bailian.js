const https = require('https');

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
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`Request failed with status code ${res.statusCode}: ${data}`));
          }
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
      return { text: response.data.text };
    },
    recommend: async ({ prompt }) => {
        const response = await _request(prompt);
        try {
            // The response text is expected to be a JSON string.
            return JSON.parse(response.data.text);
        } catch(e) {
            console.error("Failed to parse AI recommendation response:", e);
            console.error("Raw AI response:", response.data.text);
            // Fallback to a structured error to avoid crashing the client
            return {
                recommendations: [],
                timeline: [],
                advice: "AI返回了无法解析的数据格式，请检查AI模型的输出是否严格遵守JSON格式要求。"
            };
        }
    },
    analyze: async ({ prompt }) => {
        const response = await _request(prompt);
        return { text: response.data.text };
    },
    interpret: async ({ prompt }) => {
        const response = await _request(prompt);
        return { text: response.data.text };
    }
  };
}

module.exports = bailianProvider;