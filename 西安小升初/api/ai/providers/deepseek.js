module.exports = function DeepseekProvider() {
  return {
    chat: async ({ prompt }) => ({ text: `骨架-DeepSeek：${prompt.slice(0, 80)}` }),
    interpret: async ({ prompt }) => ({ text: `骨架-DeepSeek：${prompt.slice(0, 80)}` }),
    analyze: async ({ prompt }) => ({ text: `骨架-DeepSeek：${prompt.slice(0, 80)}` }),
  };
};

