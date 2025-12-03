/* =========================
   script.js —— 最终增强版（可直接替换）
   目标：补丁式增强（不破坏现有逻辑）
   主要增强：
     - 用户记忆（localStorage）与每次 AI 调用附带 userMemory
     - 严格公办学区匹配（按户籍区+街道）
     - 民办按预算过滤打分
     - 更稳健的 AI 调用（timeout、错误处理）
     - 家长友好中文 PDF（html2canvas -> jsPDF）
   注：文件中用 // [PATCH] 标注我新增/修改的关键点
   ========================= */

/////////////////// CONFIG ///////////////////
const FRONT_CONFIG = {
  apiProxy: '/api/ai',      // 你的后端代理路径（保持不变）
  provider: 'bailian',      // 默认 provider（可在 UI 切换）
  aiTimeoutMs: 20000,       // AI 请求超时(ms)
  topN: 10                  // 推荐展示 topN
};

/////////////////// USER MEMORY (小猫记忆) [PATCH] ////////////////
let USER_MEMORY = {};
try {
  USER_MEMORY = JSON.parse(localStorage.getItem('USER_MEMORY') || '{}');
} catch (e) {
  USER_MEMORY = {};
}
function saveUserMemory(key, val){
  if(!key) return;
  USER_MEMORY[key] = val;
  try{ localStorage.setItem('USER_MEMORY', JSON.stringify(USER_MEMORY)); }catch(e){}
}
function getUserMemory(){ return USER_MEMORY; }

/////////////////// STATUS UI ///////////////////
function ensureStatusArea(){
  if(document.getElementById('assistantStatus')) return;
  const d = document.createElement('div');
  d.id = 'assistantStatus';
  d.style = 'position:fixed;right:16px;bottom:16px;z-index:9999;background:rgba(0,0,0,0.72);color:#fff;padding:8px 12px;border-radius:8px;font-size:13px';
  d.innerText = '小猫助手：就绪';
  document.body.appendChild(d);
}
function setStatus(msg, temp=false){
  ensureStatusArea();
  const el = document.getElementById('assistantStatus');
  el.innerText = '小猫助手：' + msg;
  if(!temp) console.info('[小猫状态]', msg);
}

/////////////////// LOAD SCHOOLS ///////////////////
let SCHOOLS_CACHE = null;
async function loadSchoolsData(){
  if(SCHOOLS_CACHE) return SCHOOLS_CACHE;
  try{
    const r = await fetch('data/schools.json', {cache:'no-cache'});
    if(r.ok){
      const j = await r.json();
      if(Array.isArray(j) && j.length){ SCHOOLS_CACHE = j; return j; }
    }
  }catch(e){ console.warn('load schools.json fail', e); }
  // fallback: try global variable
  try{
    if(typeof SCHOOLS !== 'undefined' && Array.isArray(SCHOOLS)){ SCHOOLS_CACHE = SCHOOLS; return SCHOOLS_CACHE; }
  }catch(e){}
  // minimal fallback
  SCHOOLS_CACHE = [
    { id:'demo_pub_a', name:'示例公办一中', type:'公办', district:'沣东新城', streets:['王寺街道'], tuitionMin:0, tuitionMax:0, features:'学区优质', sources:['https://edu.xa.gov.cn'] },
    { id:'demo_priv_a', name:'示例民办A', type:'民办', district:'高新区', streets:[], tuitionMin:20000, tuitionMax:50000, features:'科技特色', sources:['https://example.com'] }
  ];
  return SCHOOLS_CACHE;
}

/////////////////// COLLECT USER DATA (兼容原函数) [PATCH] ///////////////////
function collectUserDataSafe(){
  // If original function exists, reuse it and persist into memory
  if(typeof collectUserData === 'function'){
    try{
      const u = collectUserData();
      // persist common keys
      const keys = ['grade','户籍所在区','户籍所在街道','实际居住区','实际居住街道','房产情况','民办意向','预算范围','能力评估'];
      keys.forEach(k => { if(u[k] !== undefined) saveUserMemory(k, u[k]); });
      return u;
    }catch(e){
      console.warn('existing collectUserData failed', e);
    }
  }
  // fallback: attempt to read common ids from DOM (your index.html contains these IDs)
  const p = {};
  p.grade = document.getElementById('grade')?.value || USER_MEMORY.grade || USER_MEMORY['当前年级'] || '六年级';
  p.hukouDistrict = document.getElementById('householdDistrict')?.value || USER_MEMORY['户籍所在区'] || '';
  p.hukouStreet = document.getElementById('householdStreet')?.value || USER_MEMORY['户籍所在街道'] || '';
  p.liveDistrict = document.getElementById('residenceDistrict')?.value || USER_MEMORY['实际居住区'] || '';
  p.liveStreet = document.getElementById('residenceStreet')?.value || USER_MEMORY['实际居住街道'] || '';
  p.housingType = document.getElementById('housingType')?.value || USER_MEMORY['房产情况'] || '';
  p.householdMatched = document.getElementById('householdMatched')?.checked || USER_MEMORY['户籍与居住地匹配情况'] || false;
  p.budget = (document.getElementById('budget')?.value) ? document.getElementById('budget').value : (USER_MEMORY['预算范围'] || '');
  p.ability = USER_MEMORY['能力评估'] || {};
  // save
  saveUserMemory('grade', p.grade);
  saveUserMemory('户籍所在区', p.hukouDistrict);
  saveUserMemory('户籍所在街道', p.hukouStreet);
  saveUserMemory('实际居住区', p.liveDistrict);
  saveUserMemory('实际居住街道', p.liveStreet);
  saveUserMemory('房产情况', p.housingType);
  saveUserMemory('预算范围', p.budget);
  return p;
}

/////////////////// 公办学区严格匹配规则 [PATCH] ///////////////////
function isPublicSchoolAllowedByHukou(school, profile){
  if(!school) return false;
  if(school.type !== '公办') return true; // only enforce for public
  if(!profile || (!profile.hukouDistrict && !profile.liveDistrict)) return false;
  // prefer hukouDistrict, fallback to liveDistrict
  const district = profile.hukouDistrict || profile.liveDistrict;
  if(school.district && district && school.district !== district) return false;
  // if school has streets list, require match on hukouStreet/liveStreet
  if(Array.isArray(school.streets) && school.streets.length > 0){
    const street = profile.hukouStreet || profile.liveStreet || '';
    if(!street) return false;
    return school.streets.includes(street);
  }
  return true;
}

/////////////////// 匹配评分与标签 ///////////////////
function computeMatchScore(school, profile){
  let score = 50;
  if(!school || !profile) return score;
  // public strong boost if district/street matches
  if(school.type === '公办'){
    if(profile.hukouDistrict && school.district === profile.hukouDistrict) score += 30;
    if(profile.hukouStreet && Array.isArray(school.streets) && school.streets.includes(profile.hukouStreet)) score += 25;
  } else {
    //民办预算影响
    const budget = profile.budget || '';
    if(budget){
      // interpret low/medium/high or numeric
      if(!isNaN(Number(budget))){
        const b = Number(budget);
        if(school.tuitionMin && b >= school.tuitionMin) score += 15;
        if(school.tuitionMax && b >= school.tuitionMax) score += 5;
        if(school.tuitionMin && b < school.tuitionMin) score -= 20;
      } else {
        if(budget === 'low') score -= 15;
        if(budget === 'medium') score += 5;
        if(budget === 'high') score += 15;
      }
    }
    if(profile.liveDistrict && profile.liveDistrict === school.district) score += 6;
  }
  // ability factor (if provided)
  const ability = profile.ability || {};
  if(ability && typeof ability === 'object'){
    const avg = Object.values(ability).reduce((a,b)=>a+(Number(b)||0),0) / Math.max(1, Object.keys(ability).length);
    score += (avg - 3) * 4;
  }
  return Math.max(0, Math.min(100, Math.round(score)));
}
function recommendTagByScore(score){
  if(score >= 85) return '稳妥校';
  if(score >= 65) return '匹配校';
  if(score >= 50) return '冲刺校';
  return '保底校';
}

/////////////////// 渲染推荐（保留原位置与UI） ///////////////////
async function renderSchoolRecommendations(){
  setStatus('开始匹配学校...', true);
  const profile = collectUserDataSafe();
  const schools = await loadSchoolsData();
  const candidates = [];
  for(const s of schools){
    if(profile.schoolType && profile.schoolType !== '不限' && s.type !== profile.schoolType) continue;
    // public strict check
    if(s.type === '公办' && !isPublicSchoolAllowedByHukou(s, profile)) continue;
    const score = computeMatchScore(s, profile);
    const tag = recommendTagByScore(score);
    candidates.push({ school: s, score, tag });
  }
  candidates.sort((a,b)=> b.score - a.score);
  const container = document.getElementById('schoolResult') || document.querySelector('.container') || document.body;
  let html = `<h2>学校推荐（按户籍/居住严格匹配）</h2>`;
  if(candidates.length === 0){
    html += `<div>未找到匹配学校。请确认户籍/街道/小区等信息是否已填写完整。</div>`;
  } else {
    html += `<div>`;
    candidates.slice(0, FRONT_CONFIG.topN).forEach(c => {
      const s = c.school;
      const sources = (s.sources && s.sources.length) ? s.sources.map(u=>`<a href="${u}" target="_blank">${u}</a>`).join(' | ') : '无';
      html += `<div class="school-card" style="border:1px solid #eee;padding:12px;border-radius:8px;margin-bottom:10px;background:#fff">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div><strong>${escapeHtml(s.name)}</strong> <small>(${escapeHtml(s.type)})</small></div>
          <div style="text-align:right"><div style="font-size:18px;color:#1a73e8">${c.score}</div><div style="font-size:12px">${c.tag}</div></div>
        </div>
        <div style="margin-top:6px;color:#444">区县：${escapeHtml(s.district||'')}</div>
        <div style="margin-top:6px;color:#555">特色：${escapeHtml(s.features||'')}</div>
        <div style="margin-top:6px;color:#333">来源：${sources}</div>
        <div style="margin-top:8px"><button onclick="triggerAiForSchool('${s.id}')" style="margin-right:8px;">🔎 AI 深度分析</button></div>
      </div>`;
    });
    html += `</div>`;
  }
  container.innerHTML = html;
  setStatus('学校匹配完成');
}

/////////////////// AI 调用封装（附带 memory） [PATCH] ///////////////////
async function callAiProxy(payload){
  // payload: { intent: 'school_analysis'|'generate_plan_and_policy'|..., ... }
  payload.userMemory = getUserMemory();
  setStatus('调用 AI 中...');
  try{
    const controller = new AbortController();
    const timeoutId = setTimeout(()=> controller.abort(), FRONT_CONFIG.aiTimeoutMs);
    const resp = await fetch(FRONT_CONFIG.apiProxy, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ provider: FRONT_CONFIG.provider, payload }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if(!resp.ok){
      const txt = await resp.text();
      setStatus('AI 服务返回错误');
      throw new Error(txt || `HTTP ${resp.status}`);
    }
    const ct = resp.headers.get('content-type') || '';
    let data;
    if(ct.includes('application/json')) data = await resp.json();
    else {
      const txt = await resp.text();
      try{ data = JSON.parse(txt); }catch(e){ data = { result: txt }; }
    }
    setStatus('AI 返回结果');
    return data;
  }catch(err){
    console.error('AI 调用失败', err);
    setStatus('AI 调用失败：' + (err.message||err));
    throw err;
  }
}

/////////////////// 单校 AI 深度分析（调用后端 intent=school_analysis） ///////////////////
async function triggerAiForSchool(schoolId){
  const all = await loadSchoolsData();
  const s = all.find(x=>String(x.id) === String(schoolId));
  if(!s) { alert('未找到学校数据'); return; }
  const profile = collectUserDataSafe();
  const payload = { intent: 'school_analysis', school: s, userProfile: profile };
  try{
    const resp = await callAiProxy(payload);
    const result = resp.result || resp;
    renderAiAnalysisInline(s.id || schoolId, result);
  }catch(e){
    alert('AI 分析失败：' + (e.message||e));
  }
}
function renderAiAnalysisInline(schoolId, aiData){
  const container = document.getElementById('schoolResult');
  if(!container) return;
  const panel = document.createElement('div');
  panel.className = 'ai-panel';
  panel.style = 'border:1px dashed #ccc;padding:10px;margin:10px 0;background:#fff';
  let html = `<h4>AI 深度分析：${escapeHtml(aiData.schoolName || aiData.name || '')}</h4>`;
  if(aiData.matchScore) html += `<div>匹配度：<b>${aiData.matchScore}</b></div>`;
  if(aiData.recommendType) html += `<div>推荐类型：${escapeHtml(aiData.recommendType)}</div>`;
  if(aiData.admissionRisk) html += `<div>入学风险：${escapeHtml(aiData.admissionRisk)}</div>`;
  if(aiData.analysis) html += `<div style="margin-top:6px;">${escapeHtml(aiData.analysis)}</div>`;
  if(aiData.suggestedActions) html += `<div style="margin-top:6px;"><b>建议：</b>${escapeHtml(Array.isArray(aiData.suggestedActions)? aiData.suggestedActions.join('；') : aiData.suggestedActions || '')}</div>`;
  if(aiData.sources && aiData.sources.length) html += `<div style="margin-top:6px;"><b>来源：</b>${aiData.sources.map((u,i)=>`<a href="${u}" target="_blank">来源${i+1}</a>`).join(' | ')}</div>`;
  panel.innerHTML = html;
  container.insertBefore(panel, container.firstChild);
}

/////////////////// 多年规划（本地+AI增强） ///////////////////
function estimateTargetYearFromGrade(grade){
  const now = new Date();
  const cy = now.getFullYear();
  if(!grade) grade = '六年级';
  if(grade.includes('六')) return cy + 1;
  if(grade.includes('五')) return cy + 2;
  return cy + 3;
}
function generateMultiYearPlanLocal(profile, years=3){
  const start = new Date().getFullYear();
  const target = estimateTargetYearFromGrade(profile.grade || profile.currentGrade);
  const arr = [];
  for(let i=0;i<years;i++){
    const y = start + i;
    const left = target - y;
    const milestones = [];
    const materials = [];
    if(left > 2){
      milestones.push('夯实基础、日常成绩稳定提升');
      materials.push('阶段成绩单、兴趣证书');
    } else if(left === 2){
      milestones.push('目标学校筛选、关注招生政策');
      materials.push('户口本、房产证/租赁合同、学籍证明');
    } else if(left === 1){
      milestones.push('模拟/面试准备、报名材料校对');
      materials.push('照片、体检表、档案材料');
    } else {
      milestones.push('确认录取并办理入学手续');
    }
    arr.push({ year: y, yearsLeft: left, milestones, materials });
  }
  return { targetYear: target, plan: arr };
}
async function generateAndRenderMultiYearPlan(years=3){
  const profile = collectUserDataSafe();
  const local = generateMultiYearPlanLocal(profile, years);
  const container = document.getElementById('timePlan') || document.querySelector('.container') || document.body;
  let html = `<div class="box"><h3>自动生成升学路径（本地方案） - 目标入学年 ${local.targetYear}</h3>`;
  local.plan.forEach(p=>{
    html += `<div style="padding:8px;border-radius:6px;background:#fff;margin-bottom:8px"><h4>${p.year}（距目标年 ${p.yearsLeft} 年）</h4>`;
    html += `<div><strong>关键节点：</strong><ul>${p.milestones.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ul></div>`;
    html += `<div><strong>材料清单：</strong><ul>${p.materials.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ul></div>`;
    html += `</div>`;
  });
  html += `</div>`;
  container.innerHTML = html;
  // AI enhancement (best-effort)
  try{
    const resp = await callAiProxy({ intent:'generate_plan_and_policy', requirements:{ years }, userProfile: profile });
    const data = resp.result || resp;
    if(typeof data === 'string') container.innerHTML = `<div class="box"><h3>AI 强化升学路径</h3>${data}</div>`;
    else if(data.planHtml) container.innerHTML = `<div class="box"><h3>AI 强化升学路径</h3>${data.planHtml}</div>`;
  }catch(e){ console.warn('AI增强失败，保留本地方案', e); }
}

/////////////////// 家长友好中文 PDF（html2canvas -> jsPDF） [PATCH] ///////////////////
async function generateChinesePDF_Friendly(){
  setStatus('正在生成中文 PDF，请稍候...');
  const profile = collectUserDataSafe();
  // build report DOM
  const report = document.createElement('div');
  report.id = '__report_tmp';
  report.style.width = '900px';
  report.style.padding = '24px';
  report.style.background = '#fff';
  report.style.color = '#222';
  report.innerHTML = `
    <div style="text-align:center;margin-bottom:12px;">
      <h1 style="font-size:22px;margin:6px 0">西安小升初个性化评估报告（家长版）</h1>
      <div style="color:#666">${new Date().toLocaleString()}</div>
    </div>
    <hr/>
    <section style="margin-top:10px;">
      <h2 style="font-size:16px">1. 学生摘要</h2>
      <p>年级：${escapeHtml(profile.grade || '-')}</p>
      <p>户籍：${escapeHtml(profile.hukouDistrict || profile['户籍所在区'] || '-') } ${escapeHtml(profile.hukouStreet || profile['户籍所在街道'] || '')}</p>
      <p>居住：${escapeHtml(profile.liveDistrict || profile['实际居住区'] || '-') } ${escapeHtml(profile.liveStreet || profile['实际居住街道'] || '')}</p>
      <p>住房性质：${escapeHtml(profile.housingType || '')}（房户一致：${!!profile.householdMatched ? '是' : '否' }）</p>
      <p>预算（年）：${escapeHtml(profile.budget || profile['预算范围'] || '-')}</p>
    </section>
    <hr/>
    <section id="__rec_section">
      <h2 style="font-size:16px">2. 学校推荐（按户籍严格匹配）</h2>
      <div id="__rec_list">正在生成...</div>
    </section>
    <hr/>
    <section>
      <h2 style="font-size:16px">3. 升学时间规划</h2>
      <div id="__time_section">正在生成...</div>
    </section>
    <hr/>
    <section>
      <h2 style="font-size:16px">4. 学习与升学建议</h2>
      <div id="__advice_section">建议：结合语文与艺术特长，保持稳定提升；必要时参加专项辅导。</div>
    </section>
  `;
  document.body.appendChild(report);

  // Fill recommendation list
  try{
    const recContainer = report.querySelector('#__rec_list');
    const profile2 = profile;
    const schools = await loadSchoolsData();
    const cands = [];
    for(const s of schools){
      if(profile2.schoolType && profile2.schoolType !== '不限' && s.type !== profile2.schoolType) continue;
      if(s.type === '公办' && !isPublicSchoolAllowedByHukou(s, profile2)) continue;
      const score = computeMatchScore(s, profile2);
      cands.push({ s, score });
    }
    cands.sort((a,b)=>b.score-a.score);
    const top = cands.slice(0,10);
    if(top.length === 0) recContainer.innerHTML = '<div>未检索到匹配学校，请确认户籍/街道信息。</div>';
    else {
      let html = '<ol>';
      top.forEach(t=>{
        html += `<li style="margin-bottom:6px"><strong>${escapeHtml(t.s.name)}</strong> (${escapeHtml(t.s.type)}) — 匹配度 ${t.score} <div style="color:#666;margin-top:4px">特色：${escapeHtml(t.s.features || '')} &nbsp; 来源：${(t.s.sources||[]).join(' | ')}</div></li>`;
      });
      html += '</ol>';
      recContainer.innerHTML = html;
    }
  }catch(e){ console.warn('build rec list fail', e); }

  // Fill time plan
  try{
    const tp = generateMultiYearPlanLocal(profile, 3);
    const tpEl = report.querySelector('#__time_section');
    let thtml = `<div><strong>目标入学年：${tp.targetYear}</strong></div>`;
    thtml += '<ul>';
    tp.plan.forEach(p=>{
      thtml += `<li><b>${p.year}</b>：${p.milestones.join('；')}（材料：${p.materials.join('，')}）</li>`;
    });
    thtml += '</ul>';
    tpEl.innerHTML = thtml;
  }catch(e){ console.warn('time plan fill fail', e); }

  // render to canvas -> pdf
  try{
    const canvas = await html2canvas(report, { scale: 1.2, useCORS:true });
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jspdf.jsPDF('p','mm','a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - 20;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
    const fname = `西安小升初评估报告_${(new Date()).toISOString().slice(0,10)}.pdf`;
    pdf.save(fname);
    setStatus('PDF 生成完成');
  }catch(err){
    console.error('PDF 生成失败', err);
    setStatus('PDF 生成失败：' + (err.message || err));
    alert('PDF 生成失败，请查看控制台错误信息。');
  }finally{
    setTimeout(()=>{ try{ document.body.removeChild(report); }catch(e){} }, 1500);
  }
}

/////////////////// HELPERS ///////////////////
function escapeHtml(s){ if(s===undefined || s===null) return ''; return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

/////////////////// BIND UI (non-destructive) ///////////////////
document.addEventListener('DOMContentLoaded', ()=>{
  ensureStatusArea();
  // bind existing buttons if present
  const recBtn = document.getElementById('genSchoolsBtn') || document.getElementById('generateSchoolBtn') || document.getElementById('matchBtn');
  if(recBtn) recBtn.addEventListener('click', renderSchoolRecommendations);
  const pdfBtn = document.getElementById('exportPdfBtn') || document.getElementById('exportFullPdfBtn') || document.getElementById('exportProfessionalPdfBtn');
  if(pdfBtn) pdfBtn.addEventListener('click', generateChinesePDF_Friendly);
  const planBtn = document.getElementById('genTimePlanBtn') || document.getElementById('generatePlanBtn');
  if(planBtn) planBtn.addEventListener('click', ()=> generateAndRenderMultiYearPlan(3));
});
/* End of script.js (增强版) */
