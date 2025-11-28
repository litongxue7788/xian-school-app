async function callBailianAPI(message, apiKey, appId = '') {
    try {
        console.log('调用阿里百炼API...');
        
        if (!apiKey) {
            throw new Error('API Key不能为空');
        }

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
        console.error('阿里百炼调用失败:', error);
        throw new Error('阿里百炼服务异常: ' + error.message);
    }
}

// 为了兼容性，也提供旧版接口
function bailianProvider() {
    return {
        chat: async ({ prompt, history, context = {} }) => {
            const apiKey = context.apiKey;
            const result = await callBailianAPI(prompt, apiKey);
            return { text: result };
        }
    };
}

module.exports = bailianProvider;
module.exports.callAPI = callBailianAPI;
