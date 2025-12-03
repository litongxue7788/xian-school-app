// data/districts/未央区.js

module.exports = {
  // 元数据
  metadata: {
    district: "未央区",
    data_year: "2025",
    last_updated: "2025-06-12",
    total_schools: 63, // 小学44所 + 初中22所（含重复如汉都第一学校等，已合并计算）
    description: "未央区2025年小学与初中学区划分数据",
    source: "未央区教育局2025年学区划分方案"
  },

  // 小学列表（公办，44所）
  primary_schools: [
    { "id": "wy_p_001", "name": "东元路学校", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_002", "name": "东前进小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_003", "name": "太元路学校", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_004", "name": "先锋小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_005", "name": "南康小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_006", "name": "方新小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_007", "name": "方新小学北校区（未央路小学）", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_008", "name": "枣园小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_009", "name": "范家小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_010", "name": "玄武路小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_011", "name": "大白杨小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_012", "name": "大明宫小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_013", "name": "百花小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_014", "name": "三星小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_015", "name": "西航二校", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_016", "name": "崇文路小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_017", "name": "西航四校", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_018", "name": "西航三校", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_019", "name": "开元小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_020", "name": "新兴小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_021", "name": "新光小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_022", "name": "长庆未央湖学校", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_023", "name": "未央区第一学校", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_024", "name": "永泰路小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_025", "name": "未央区实验学校", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_026", "name": "永隆路小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_027", "name": "团结学校", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_028", "name": "永顺路学校", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_029", "name": "长乐第二小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_030", "name": "汉都新苑第一小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_031", "name": "汉都新苑第二小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_032", "name": "三官庙小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_033", "name": "楼阁台小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_034", "name": "杨善寨小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_035", "name": "雷寨小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_036", "name": "兴丰路小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_037", "name": "讲武殿小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_038", "name": "汉都第一学校", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_039", "name": "徐寨小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_040", "name": "六村堡小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_041", "name": "长庆八中", "type": "公办小学", "admission_policy": "长庆油田子女" },
    { "id": "wy_p_042", "name": "长庆泾渭小学", "type": "公办小学", "admission_policy": "长庆油田子女" },
    { "id": "wy_p_043", "name": "泾河中心学校", "type": "公办小学", "admission_policy": "长庆油田子女" },
    { "id": "wy_p_044", "name": "太康路小学", "type": "公办小学", "admission_policy": "学区对口入学" },
    { "id": "wy_p_045", "name": "经开第十一小学（原未央区实验一小）", "type": "公办小学", "admission_policy": "学区交叉区域" }
  ],

  // 初中列表（公办，22所）
  middle_schools: [
    { "id": "wy_m_001", "name": "市十一中", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_002", "name": "市十七中", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_003", "name": "市四十八中", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_004", "name": "市五十八中", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_005", "name": "汉都第一学校", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_006", "name": "市七十五中", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_007", "name": "市七十六中", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_008", "name": "西航二中", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_009", "name": "西航一中", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_010", "name": "太元路学校", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_011", "name": "东元路学校", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_012", "name": "西安高级中学", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_013", "name": "汉都新苑中学", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_014", "name": "未央区第一学校", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_015", "name": "永庆路初级中学", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_016", "name": "未央区实验学校", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_017", "name": "长庆未央湖学校", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_018", "name": "团结学校", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_019", "name": "永顺路学校", "type": "公办初中", "admission_policy": "学区对口入学" },
    { "id": "wy_m_020", "name": "长庆八中", "type": "公办初中", "admission_policy": "长庆油田子女" },
    { "id": "wy_m_021", "name": "长庆二中", "type": "公办初中", "admission_policy": "长庆油田子女" },
    { "id": "wy_m_022", "name": "泾河中心学校", "type": "公办初中", "admission_policy": "长庆油田子女" }
  ],

  // 辖区统计
  statistics: {
    total_primary: 45,
    total_middle: 22,
    total_schools: 67,
    hot_primary_schools: ["东元路学校", "方新小学", "西航三校"],
    hot_middle_schools: ["西航二中", "西安高级中学", "未央区第一学校"]
  },

  // 辖区特有功能
  utils: {
    // 按学校名称模糊搜索
    searchByName(keyword) {
      keyword = keyword.toLowerCase();
      const primary = this.primary_schools.filter(s => s.name.toLowerCase().includes(keyword));
      const middle = this.middle_schools.filter(s => s.name.toLowerCase().includes(keyword));
      return { primary, middle };
    },

    // 获取热门学校
    getHotSchools(limit = 3) {
      const hot = [
        ...this.primary_schools.filter(s => ["东元路学校", "方新小学", "西航三校"].includes(s.name)),
        ...this.middle_schools.filter(s => ["西航二中", "西安高级中学", "未央区第一学校"].includes(s.name))
      ];
      return hot.slice(0, limit);
    },

    // 获取某学校的入学政策说明
    getAdmissionPolicy(schoolName) {
      let school = this.primary_schools.find(s => s.name === schoolName);
      if (!school) school = this.middle_schools.find(s => s.name === schoolName);
      return school ? school.admission_policy : "未找到该校信息";
    }
  }
};
