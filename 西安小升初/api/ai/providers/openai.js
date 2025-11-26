module.exports = function OpenAIProvider() {
  return {
    chat: async ({ prompt }) => ({ text: `骨架-OpenAI：${prompt.slice(0, 80)}` }),
    interpret: async ({ prompt }) => ({ text: `骨架-OpenAI：${prompt.slice(0, 80)}` }),
    analyze: async ({ prompt }) => ({ text: `骨架-OpenAI：${prompt.slice(0, 80)}` }),
  };
};
