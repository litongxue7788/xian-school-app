async function callDeepSeekAPI(message, apiKey) {
    try {
        console.log('调用DeepSeek API...');
        
        if (!apiKey) {
            throw new Error('API Key不能为空');
        }

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
        console.error('DeepSeek调用失败:', error);
        throw new Error('DeepSeek服务异常: ' + error.message);
    }
}

module.exports.callAPI = callDeepSeekAPI;
