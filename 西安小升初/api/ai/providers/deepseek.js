const https = require('https');

const RETRIES = parseInt(process.env.DEEPSEEK_RETRIES || '2', 10);
const TIMEOUT_MS = parseInt(process.env.DEEPSEEK_TIMEOUT_MS || '15000', 10);

function requestDeepSeek({ apiKey, path, body, timeoutMs = TIMEOUT_MS }) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({
      hostname: 'api.deepseek.com',
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let chunks = '';
      res.on('data', (d) => (chunks += d));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(chunks)); } catch (e) { reject(e); }
        } else {
          const brief = chunks && chunks.slice ? chunks.slice(0, 500) : String(chunks);
          reject(new Error(`DeepSeek error ${res.statusCode}: ${brief}`));
        }
      });
    });

    const timer = setTimeout(() => {
      try { req.destroy(new Error('DeepSeek request timeout')); } catch(_) {}
    }, timeoutMs);

    req.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
    req.on('close', () => clearTimeout(timer));

    req.write(data);
    req.end();
  });
}

async function requestWithRetry(fn, retries = RETRIES) {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try { return await fn(); } catch (e) { lastErr = e; }
  }
  throw lastErr;
}

function mapHistoryToMessages(history = []) {
  const messages = [{ role: 'system', content: 'You are a helpful Chinese educational assistant.' }];
  for (const h of (history || [])) {
    const role = h.role === 'user' ? 'user' : 'assistant';
    messages.push({ role, content: String(h.content || '') });
  }
  return messages;
}

module.exports = function DeepseekProvider() {
  const API_KEY = process.env.DEEPSEEK_API_KEY;
  const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
  if (!API_KEY) {
    console.warn('[DeepSeek] DEEPSEEK_API_KEY not set. Calls will fail.');
  }

  async function chatLike({ prompt, history }) {
    if (!API_KEY) throw new Error('DEEPSEEK_API_KEY is required');
    const messages = mapHistoryToMessages(history);
    if (prompt) messages.push({ role: 'user', content: String(prompt) });
    const resp = await requestWithRetry(() => requestDeepSeek({
      apiKey: API_KEY,
      path: '/v1/chat/completions',
      body: { model: MODEL, messages, temperature: 0.2 }
    }));
    const text = resp?.choices?.[0]?.message?.content || '';
    return { text };
  }

  async function recommend({ prompt }) {
    if (!API_KEY) throw new Error('DEEPSEEK_API_KEY is required');
    const messages = [
      { role: 'system', content: 'Return ONLY valid JSON. No commentary.' },
      { role: 'user', content: String(prompt || '') }
    ];
    const resp = await requestWithRetry(() => requestDeepSeek({
      apiKey: API_KEY,
      path: '/v1/chat/completions',
      body: { model: MODEL, messages, temperature: 0 }
    }));
    const text = resp?.choices?.[0]?.message?.content || '';
    try { return JSON.parse(text); } catch (e) {
      const brief = (text || '').slice(0, 500);
      console.error('DeepSeek recommend JSON parse failed:', e?.message || e, brief);
      return { recommendations: [], timeline: [], advice: 'AI返回非JSON格式，请调整提示词或稍后重试。' };
    }
  }

  return {
    chat: chatLike,
    analyze: chatLike,
    interpret: chatLike,
    recommend
  };
};
