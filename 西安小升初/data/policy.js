// data/policy.js - 小升初政策数据（增强版）
const XI_AN_POLICY = {
  // 2025年招生时间安排（按月细化）
  timeline_2025: [
    { 
      month: "3月", 
      year: 2025,
      events: ["关注市教育局招生政策发布会", "开始准备户口本、房产证等报名材料"],
      importance: "重要",
      action: "材料准备"
    },
    { 
      month: "4月", 
      year: 2025,
      events: ["各区教育局公布学区划分方案", "民办学校公布招生计划和收费标准"],
      importance: "关键", 
      action: "信息收集"
    },
    { 
      month: "5月", 
      year: 2025,
      events: ["参加目标学校开放日活动", "结合孩子特点确定报考策略"],
      importance: "重要",
      action: "学校考察"
    },
    { 
      month: "6月", 
      year: 2025,
      events: ["完成所有报名材料准备", "关注招生平台系统测试通知"],
      importance: "重要",
      action: "最终确认"
    },
    { 
      month: "7月", 
      year: 2025,
      events: ["7月11-24日：公民办学校同步报名", "7月30日：民办学校电脑随机录取（摇号）"],
      importance: "关键",
      action: "报名确认"
    },
    { 
      month: "8月", 
      year: 2025,
      events: ["8月1-5日：民办学校补录报名", "8月10日前：公办学校发放入学通知书", "8月25-31日：各校统一发放录取通知书"],
      importance: "关键",
      action: "结果确认"
    },
    { 
      month: "9月", 
      year: 2025,
      events: ["新生报到注册", "完成学籍建档", "入学教育"],
      importance: "重要",
      action: "入学准备"
    }
  ],

  // 基于年级的推算时间表
  getTimelineByGrade: function(currentGrade) {
    const currentYear = new Date().getFullYear();
    let targetYear;
    
    switch(currentGrade) {
      case '六年级': targetYear = currentYear + 1; break;
      case '五年级': targetYear = currentYear + 2; break;
      case '四年级': targetYear = currentYear + 3; break;
      default: targetYear = currentYear + 1;
    }
    
    return this.timeline_2025.map(item => ({
      month: item.month,
      year: targetYear,
      events: item.events,
      importance: item.importance,
      action: item.action,
      relative_time: `${targetYear}年${item.month}`
    }));
  },

  // 报名材料清单
  required_documents: {
    "公办学校": [
      "户口本原件及复印件",
      "房产证或购房合同原件及复印件", 
      "儿童预防接种证明",
      "小学毕业相关证明",
      "实际居住证明（如水电费单据）"
    ],
    "民办学校": [
      "户口本原件及复印件",
      "学生近期一寸照片",
      "网上报名确认单",
      "特殊才能证明材料（如有）",
      "家长身份证复印件"
    ],
    "随迁子女": [
      "居住证原件及复印件",
      "务工证明或营业执照",
      "租房合同及备案证明",
      "户口本原件及复印件",
      "流出地教育部门出具的外出就读证明"
    ]
  },

  // 各区教育局咨询方式
  district_contacts: {
    "新城区": { phone: "029-87419600", address: "新城区东一路21号" },
    "碑林区": { phone: "029-87510000", address: "碑林区卫华巷15号" },
    "莲湖区": { phone: "029-87348900", address: "莲湖区红埠街59号" },
    "雁塔区": { phone: "029-85381600", address: "雁塔区翠华南路146号" },
    "灞桥区": { phone: "029-83519600", address: "灞桥区纺一路809号" },
    "未央区": { phone: "029-86239700", address: "未央区凤城南路东段" },
    "长安区": { phone: "029-85291000", address: "长安区韦曲街道长兴南路" },
    "高新区": { phone: "029-88333608", address: "高新区锦业路1号都市之门" },
    "经开区": { phone: "029-86517960", address: "经开区明光路166号凯瑞大厦" }
  },

  // 常见问题解答
  faq: [
    {
      question: "民办学校摇号没中怎么办？",
      answer: "如果民办摇号未中，将自动进入公办学校入学流程，按照户籍或居住地对应学区安排入学。"
    },
    {
      question: "可以同时报名多所民办学校吗？",
      answer: "不可以。2025年政策规定，每位学生只能选择1所民办学校报名。"
    },
    {
      question: "租房可以上公办学校吗？",
      answer: "可以，但属于第四顺位，需提供居住证、租房合同、务工证明等材料，由教育局统筹安排。"
    },
    {
      question: "外地户口如何在西安上学？",
      answer: "需办理居住证，提供务工证明、租房合同等材料，按照随迁子女政策入学。"
    }
  ],

  // 重要政策文件
  policy_documents: [
    {
      title: "西安市2025年义务教育招生入学工作实施方案",
      source: "西安市教育局",
      url: "http://www.xaedu.gov.cn/zcwj/2025/001.html",
      publish_date: "2025-01-10"
    },
    {
      title: "关于进一步规范民办义务教育学校招生的通知", 
      source: "陕西省教育厅",
      url: "http://www.snedu.gov.cn/zcwj/2024/123.html",
      publish_date: "2024-12-15"
    },
    {
      title: "西安市学区划分管理办法",
      source: "西安市人民政府",
      url: "http://www.xa.gov.cn/zfxxgk/2024/088.html",
      publish_date: "2024-11-20"
    }
  ]
};

// 生成个性化时间规划
function generatePersonalizedTimeline(studentGrade, householdDistrict, considerPrivate = true) {
  const timeline = XI_AN_POLICY.getTimelineByGrade(studentGrade);
  const personalTips = [];
  
  // 根据情况添加个性化提示
  if (considerPrivate) {
    personalTips.push({
      month: "4月",
      tip: "重点考察民办学校开放日，建议参观2-3所目标学校"
    });
    personalTips.push({
      month: "7月",
      tip: "报名时慎重选择民办学校，每位学生只能报1所"
    });
  }
  
  if (householdDistrict) {
    personalTips.push({
      month: "4月", 
      tip: `关注${householdDistrict}教育局官网发布的学区划分方案`
    });
  }
  
  return {
    timeline: timeline,
    personal_tips: personalTips,
    documents_needed: considerPrivate ? 
      XI_AN_POLICY.required_documents["民办学校"] : 
      XI_AN_POLICY.required_documents["公办学校"],
    contact_info: householdDistrict ? XI_AN_POLICY.district_contacts[householdDistrict] : null
  };
}

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    XI_AN_POLICY, 
    generatePersonalizedTimeline
  };
}
