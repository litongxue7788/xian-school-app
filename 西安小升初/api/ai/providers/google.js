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

module.exports.callAPI = callGoogleAPI;
