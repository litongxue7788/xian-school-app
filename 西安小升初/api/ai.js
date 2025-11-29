// =======================================
// ai.js  — 2025 全模型统一版本
// 支持：
//   ✓ DashScope（百炼通义千问）
//   ✓ Google Gemini 2.0 Flash
//   ✓ DeepSeek API
//   ✓ OpenAI API（gpt-4o 系列）
//   ✓ 统一的小升初顾问提示词
// =======================================

// ----------------------------------------
// 小升初专家提示词（统一所有大模型）
// ----------------------------------------
const buildPrompt = (userMessage) => `
你是一名专业的“西安小升初升学规划顾问”，精通 2025 年西安市义务教育入学政策、公办对口规则、民办摇号流程、学校办学质量及各区家长择校需求。

所有回答必须基于真实公开政策，不得编造学校、政策、收费或数据，如不确定需说明“不确定/暂无公开信息”。

你的能力模块包括：

①【学校推荐服务】
- 输出固定 5 所学校：2 冲刺（sprint）、2 稳妥（steady）、1 保底（fallback）
- 必须返回 JSON 数组格式，每个对象包含：
  school_name, type, fit_score, reason, admission_rate, features, tuition, requirements, recommend_type
- 推荐需综合：学生水平、家庭条件、地理位置、政策顺位、竞争激烈程度

②【政策咨询服务】
- 2025 西安小升初政策总览
- 房户一致/租房/集体户/随迁子女入学顺位
- 公办对口、民办摇号、流程与节点
- 年度关键日程提醒

③【学校信息查询】
- 办学质量、课程特色、教师配置、校园环境
- 历史升学方向（不造数据，只描述趋势）
- 家长评价常见点

④【升学规划服务】
- 备考时间规划
- 学习能力提升建议
- 面试材料与策略
- 心理建设建议

⑤【限制（必须遵守）】
- 不得虚构内容
- 不得提供其他城市政策
- 不得提供未公开的收费金额
- 信息不确定必须标注

⑥【回答风格】
- 中文回答
- 清晰专业
- JSON 必须独立输出

用户问题：${userMessage}
`;



// =======================================
// 1. 百炼 DashScope API（你已成功）
// =======================================
export async function callDashScope(message, apiKey) {
  try {
    const resp = await fetch(`https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        input: {
          messages: [{ role: "user", content: buildPrompt(message) }]
        }
      })
    });

    const data = await resp.json();
    return data.output?.text || "百炼返回为空";
  } catch (err) {
    throw new Error("百炼调用失败：" + err.message);
  }
}



// =======================================
// 2. Google Gemini 2.0 Flash API
// =======================================
export async function callGoogleAPI(message, apiKey) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const body = {
      contents: [{ parts: [{ text: buildPrompt(message) }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4000 }
    };

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await resp.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini 返回为空";
  } catch (err) {
    throw new Error("Google Gemini 调用失败：" + err.message);
  }
}



// =======================================
// 3. DeepSeek API（官方云）
//     模型可选：deepseek-chat / deepseek-reasoner
// =======================================
export async function callDeepSeek(message, apiKey) {
  try {
    const resp = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat", // 你也可以改为 deepseek-reasoner
        messages: [
          { role: "user", content: buildPrompt(message) }
        ],
        temperature: 0.7
      })
    });

    const data = await resp.json();
    return data.choices?.[0]?.message?.content || "DeepSeek 返回为空";
  } catch (err) {
    throw new Error("DeepSeek 调用失败：" + err.message);
  }
}



// =======================================
// 4. OpenAI API（最新 gpt-4o / gpt-4.1-mini / o3-mini）
// =======================================
export async function callOpenAI(message, apiKey) {
  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 推荐性价比模型（可换 gpt-4o）
        messages: [
          { role: "user", content: buildPrompt(message) }
        ],
        temperature: 0.7
      })
    });

    const data = await resp.json();
    return data.choices?.[0]?.message?.content || "OpenAI 返回为空";
  } catch (err) {
    throw new Error("OpenAI 调用失败：" + err.message);
  }
}



// =======================================
// 5. 通用调度函数（前端只调用这个）
// =======================================
export async function runModel(message, apiKey, type = "google") {
  switch (type) {
    case "dashscope":
      return await callDashScope(message, apiKey);

    case "google":
      return await callGoogleAPI(message, apiKey);

    case "deepseek":
      return await callDeepSeek(message, apiKey);

    case "openai":
      return await callOpenAI(message, apiKey);

    default:
      throw new Error("未知模型类型：" + type);
  }
}
