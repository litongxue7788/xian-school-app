// api/ai.js - 最终增强版 (Vercel serverless)
// 要求：部署时在环境变量设置 OPENAI_API_KEY （若使用 OpenAI）
// 此文件会读取 data/schools.json（若存在）并注入到 prompt 中。

export default async function handler(req, res){
  // CORS
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try{
    const body = req.body || {};
    const provider = body.provider || 'openai';
    const payload = body.payload || {};
    if(!payload.intent) return res.status(400).json({ error: 'missing payload.intent' });

    // user memory and small school snippet
    const userMemory = payload.userMemory || payload.userProfile || {};
    let schoolsSnippet = '';
    try{
      const fs = await import('fs');
      const path = await import('path');
      const dataDir = path.resolve('./data');
      const schoolsFile = path.join(dataDir, 'schools.json');
      if(fs.existsSync(schoolsFile)){
        const txt = fs.readFileSync(schoolsFile, 'utf8');
        const arr = JSON.parse(txt);
        // include a small slice (names/types/districts/streets/sources)
        const slice = (arr || []).slice(0, 12).map(s => ({ id: s.id, name: s.name, type: s.type, district: s.district, streets: s.streets || [], sources: s.sources || [] }));
        schoolsSnippet = `\nSCHOOLS_DATA: ${JSON.stringify(slice)}\n`;
      }
    }catch(e){
      // ignore file read errors
      console.warn('read schools.json fail', e);
    }

    // system prompt - strict rules
    const systemPrompt = `你是“西安小升初智能评估系统”的辅助专家。严格规则如下：
1) 你只能使用 payload 中提供的 userMemory、payload.school 或服务器注入的 SCHOOLS_DATA 来回答。禁止凭空编造任何学区、招生人数、时间或链接。
2) 若用户询问的学校不在提供的数据中，必须返回 missing 字段并说明需要用户补充哪些信息。
3) 输出格式：
   - intent='school_analysis' -> 返回 JSON 对象：{ schoolName, type, matchScore, recommendType, admissionRisk, analysis, suggestedActions, sources, missing }。
   - intent='generate_plan_and_policy' -> 返回 HTML 字符串或对象含 planHtml、sources。
4) 语言使用中文，回答要面向家长、简洁明确。
${schoolsSnippet}
UserMemory: ${JSON.stringify(userMemory)}
`;

    // build userMessage per intent
    const intent = payload.intent;
    let userMessage = '';
    if(intent === 'school_analysis'){
      userMessage = `请基于提供的学校信息和用户信息做结构化分析，并按规则返回JSON。学校：${JSON.stringify(payload.school || payload.schoolId || {})}。用户：${JSON.stringify(userMemory)}。`;
    } else if(intent === 'generate_plan_and_policy'){
      userMessage = `请基于用户信息生成${payload.requirements?.years || 3}年升学规划（HTML），包含关键节点、材料清单、风险提示，并在末尾列出sources数组。用户信息：${JSON.stringify(userMemory)}。`;
    } else if(intent === 'appendix_for_pdf'){
      userMessage = `请为用户生成用于PDF的附录文本摘要（分析+建议）。USER:${JSON.stringify(userMemory)}`;
    } else {
      userMessage = `请回答用户提问：${payload.question || ''}。用户信息：${JSON.stringify(userMemory)}`;
    }

    // Call provider (OpenAI default)
    if(provider === 'openai'){
      const OPENAI_KEY = process.env.OPENAI_API_KEY;
      if(!OPENAI_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY 未配置' });
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role:'system', content: systemPrompt },
            { role:'user', content: userMessage }
          ],
          max_tokens: 1400,
          temperature: 0.15
        })
      });
      if(!resp.ok){
        const txt = await resp.text();
        return res.status(500).json({ error: 'OpenAI 返回错误', detail: txt });
      }
      const j = await resp.json();
      const raw = j.choices?.[0]?.message?.content || j.choices?.[0]?.text || '';
      // parse output based on intent
      if(intent === 'school_analysis'){
        try{
          const parsed = JSON.parse(raw);
          return res.status(200).json({ success:true, result: parsed });
        }catch(e){
          // fallback: return raw as analysis field
          return res.status(200).json({ success:true, result: { analysis: raw } });
        }
      } else if(intent === 'generate_plan_and_policy'){
        return res.status(200).json({ success:true, result: raw });
      } else {
        return res.status(200).json({ success:true, result: raw });
      }
    } else {
      return res.status(400).json({ error: '当前部署只支持 openai provider（如需其他 provider 请联系开发）' });
    }

  }catch(err){
    console.error('ai handler error', err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
