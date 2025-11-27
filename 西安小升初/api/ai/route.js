module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { provider = 'bailian', action = 'chat', prompt = '', history = [], context = {} } = req.body || {};

    let adapter;
    switch (provider) {
      case 'bailian':
        adapter = require('./providers/bailian.js');
        break;
      case 'openai':
        adapter = require('./providers/openai.js');
        break;
      case 'deepseek':
        adapter = require('./providers/deepseek.js');
        break;
      default:
        adapter = require('./providers/bailian.js');
        break;
    }

    const factory = adapter && (adapter.default || adapter);
    const api = typeof factory === 'function' ? factory() : null;

    if (!api || typeof api[action] !== 'function') {
      return res.status(400).json({ error: 'Unsupported action or provider' });
    }

    const result = await api[action]({ prompt, history, context });

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(result);

  } catch (err) {
    console.error('AI route error:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: String((err && err.message) || err) });
  }
};