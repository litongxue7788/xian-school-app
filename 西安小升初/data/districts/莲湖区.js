// data/districts/碑林区.js

module.exports = {
  // 元数据
  metadata: {
    district: "碑林区",
    data_year: "2025",
    last_updated: "2025-01-20",
    total_schools: 6,
    description: "碑林区初中学校数据",
    source: "西安市教育局2025年招生计划"
  },

  // 所有学校（合并民办和公办）
  schools: [],

  // 民办初中（从主文件筛选）
  private_schools: [
    {
      "id": "xa_001",
      "name": "西安翱翔中学",
      "type": "民办",
      "features": ["学术导向", "理科优势", "竞赛培养"],
      "tuition": "7500-12000元/学期",
      "lottery_probability": "约35%"
    },
    {
      "id": "xa_002",
      "name": "西安辅轮中学",
      "type": "民办",
      "features": ["口碑稳健", "校风严谨", "全面发展"],
      "tuition": "7000-11000元/学期",
      "lottery_probability": "约40%"
    },
    {
      "id": "xa_005",
      "name": "西安铁一中",
      "type": "民办",
      "features": ["全面发展", "社团丰富", "艺体特长"],
      "tuition": "7500-13000元/学期",
      "lottery_probability": "约22%"
    }
  ],

  // 公办初中（从主文件筛选）
  public_schools: [
    {
      "id": "bl_001",
      "name": "西安市第三中学",
      "type": "公办",
      "level": "省级示范高中（含初中部）",
      "features": ["百年名校", "省级示范", "文科见长"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "bl_002",
      "name": "西安市第六中学",
      "type": "公办",
      "level": "省级标准化高中（含初中部）",
      "features": ["百年名校", "教学质量稳", "校风优良"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "bl_003",
      "name": "西安市第二十六中学",
      "type": "公办",
      "level": "省级标准化高中（含初中部）",
      "features": ["教学质量好", "管理规范", "均衡发展"],
      "admission_policy": "学区对口入学"
    }
  ],

  // 辖区统计
  statistics: {
    total_private: 3,
    total_public: 3,
    avg_tuition_private: 8333,
    avg_lottery_rate: 32.3,
    hot_schools: ["西安铁一中", "西安翱翔中学"]
  },

  // 辖区特有功能
  utils: {
    // 按特征筛选
    filterByFeature(feature) {
      return {
        private: this.private_schools.filter(s => s.features.includes(feature)),
        public: this.public_schools.filter(s => s.features.includes(feature))
      };
    },

    // 获取热门学校
    getHotSchools(limit = 3) {
      return [
        ...this.private_schools.filter(s => s.id === "xa_005"), // 铁一中
        ...this.private_schools.filter(s => s.id === "xa_001")  // 翱翔中学
      ].slice(0, limit);
    }
  }
};
