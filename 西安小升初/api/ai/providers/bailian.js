const { requestWithRetry, pickRecommendations } = require('./utils.js');
const { BAILIAN_API_KEY = '', BAILIAN_APP_ID = '' } = process.env;
function echoText(prefix, prompt) {
  const head = prompt?.slice(0, 80) || '';
  return `${prefix}：${head || '（空提示）'}`;
}
module.exports = function BailianProvider() {
  return {
    async chat({ prompt }) {
      if (!BAILIAN_API_KEY || !BAILIAN_APP_ID) return { text: echoText('骨架-百炼-聊天', prompt) };
      try {
        const url = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';
        const data = await requestWithRetry(url, {
          headers: {
            'Authorization': `Bearer ${BAILIAN_API_KEY}`,
            'X-DashScope-AppId': BAILIAN_APP_ID,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ model: 'qwen-turbo', prompt: prompt }),
          timeoutMs: 12000,
          retries: 2
        });
        const text = data?.output?.text ?? data?.choices?.[0]?.message?.content ?? echoText('百炼-聊天(空响应)', prompt);
        return { text };
      } catch (e) {
        return { text: `百炼API错误：${String(e.message || e)}\n` + echoText('回退', prompt) };
      }
    },
    async interpret({ prompt }) { return this.chat({ prompt }); },
    async analyze({ prompt }) { return this.chat({ prompt }); },
    async profile({ prompt }) { return this.chat({ prompt }); },
    async recommend({ prompt, context }) {
      const schools = context?.schoolList || [];
      const [sprint, steady, fallback] = pickRecommendations(schools, context?.familyInfo);
      return {
        recommendations: [
          sprint ? { type: '冲刺', name: sprint.name, reason: '基于热度与名额，建议冲刺该校。', rate: '约20%' } : null,
          steady ? { type: '稳妥', name: steady.name, reason: '匹配度较高，建议作为稳妥选项。', rate: '约50%' } : null,
          { type: '保底', name: fallback.name, reason: `结合${fallback.district}统筹，建议作为底线保障。`, rate: '100%' }
        ].filter(Boolean),
        timeline: [
          { date: '即日 ~ 2025-05-31', title: '研究目标校', content: '关注官网与开放日，完善资料。' },
          { date: '2025-07-11 ~ 2025-07-24', title: '民办报名', content: '按政策时间节点完成报名与志愿。' }
        ],
        advice: `主攻优质民办，守住公办底线；结合区统筹与孩子画像稳步推进。`
      };
    }
  };
}
