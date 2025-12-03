// data/districts/临潼区.js

module.exports = {
  // 元数据
  metadata: {
    district: "临潼区",
    data_year: "2025",
    last_updated: "2025-01-20",
    total_schools: 24,
    description: "临潼区初中学校数据",
    source: "西安市教育局2025年招生计划"
  },

  // 所有学校（合并民办和公办）
  schools: [],

  // 民办初中（从主文件筛选）
  private_schools: [
    // 注：根据提供的学区资料，暂未明确列出民办初中，如有可后续补充
  ],

  // 公办初中（从主文件筛选）
  public_schools: [
    {
      "id": "lt_001",
      "name": "骊山初中",
      "type": "公办",
      "level": "初中",
      "features": ["文化路以南区域"],
      "admission_policy": "学区对口入学",
      "学区": "文化路、秦陵南路以南,会昌路以西，连霍高速公路以东"
    },
    {
      "id": "lt_002",
      "name": "化工院中学",
      "type": "公办",
      "level": "初中",
      "features": ["文化路以北区域"],
      "admission_policy": "学区对口入学",
      "学区": "文化路以北，陇海铁路线以东，城区108国道以西"
    },
    {
      "id": "lt_003",
      "name": "秦陵初中",
      "type": "公办",
      "level": "初中",
      "features": ["秦陵街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "秦陵街办各小学，标缝子弟，城区108国道以东、会昌路以东，秦陵南路以北"
    },
    {
      "id": "lt_004",
      "name": "斜口初中",
      "type": "公办",
      "level": "初中",
      "features": ["斜口街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "斜口街办"
    },
    {
      "id": "lt_005",
      "name": "行者初中",
      "type": "公办",
      "level": "初中",
      "features": ["行者街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "行者街办"
    },
    {
      "id": "lt_006",
      "name": "西泉初中",
      "type": "公办",
      "level": "初中",
      "features": ["西泉街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "西泉街办"
    },
    {
      "id": "lt_007",
      "name": "代王初中",
      "type": "公办",
      "level": "初中",
      "features": ["代王街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "代王街办"
    },
    {
      "id": "lt_008",
      "name": "相桥初中",
      "type": "公办",
      "level": "初中",
      "features": ["相桥街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "相桥街办"
    },
    {
      "id": "lt_009",
      "name": "新丰初中",
      "type": "公办",
      "level": "初中",
      "features": ["新丰街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "新丰街办"
    },
    {
      "id": "lt_010",
      "name": "零口初中",
      "type": "公办",
      "level": "初中",
      "features": ["零口街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "零口街办"
    },
    {
      "id": "lt_011",
      "name": "何寨初中",
      "type": "公办",
      "level": "初中",
      "features": ["何寨街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "何寨街办"
    },
    {
      "id": "lt_012",
      "name": "田家炳中学",
      "type": "公办",
      "level": "初中",
      "features": ["仁宗街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "仁宗街办"
    },
    {
      "id": "lt_013",
      "name": "铁炉初中",
      "type": "公办",
      "level": "初中",
      "features": ["铁炉、小金街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "铁炉街办、小金街办"
    },
    {
      "id": "lt_014",
      "name": "雨金九年制学校（初中部）",
      "type": "公办",
      "level": "初中",
      "features": ["雨金街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "雨金街办"
    },
    {
      "id": "lt_015",
      "name": "任留初中",
      "type": "公办",
      "level": "初中",
      "features": ["任留街办部分片区"],
      "admission_policy": "学区对口入学",
      "学区": "任留街办（除垣头村、赵刘村、任留村之外其余村）"
    },
    {
      "id": "lt_016",
      "name": "栎阳初中",
      "type": "公办",
      "level": "初中",
      "features": ["栎阳街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "栎阳街办"
    },
    {
      "id": "lt_017",
      "name": "新市初中",
      "type": "公办",
      "level": "初中",
      "features": ["新市街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "新市街办"
    },
    {
      "id": "lt_018",
      "name": "徐杨初中",
      "type": "公办",
      "level": "初中",
      "features": ["徐杨街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "徐杨街办"
    },
    {
      "id": "lt_019",
      "name": "交口初中",
      "type": "公办",
      "level": "初中",
      "features": ["交口街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "交口街办"
    },
    {
      "id": "lt_020",
      "name": "油槐初中",
      "type": "公办",
      "level": "初中",
      "features": ["油槐街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "油槐街办"
    },
    {
      "id": "lt_021",
      "name": "马颖初中",
      "type": "公办",
      "level": "初中",
      "features": ["马颖、穆寨街办片区"],
      "admission_policy": "学区对口入学",
      "学区": "马颖街办、穆寨街办"
    },
    {
      "id": "lt_022",
      "name": "纸李九年制学校（初中部）",
      "type": "公办",
      "level": "初中",
      "features": ["代王街办纸李片"],
      "admission_policy": "学区对口入学",
      "学区": "代王街办纸李片"
    },
    {
      "id": "lt_023",
      "name": "秦汉学校（初中部）",
      "type": "公办",
      "level": "初中",
      "features": ["新区住宅小区"],
      "admission_policy": "学区对口入学",
      "学区": "石油城、大城小院、紫台福邸、骊景家城、针织厂及临潼新区范围内已建成入住的住宅小区"
    },
    {
      "id": "lt_024",
      "name": "骊山新家园学校（初中部）",
      "type": "公办",
      "level": "初中",
      "features": ["新区及拆迁区域"],
      "admission_policy": "学区对口入学",
      "学区": "东至连霍高速公路，西至西临高速临潼收费站出入口，北至陇海线，南至曲江度假区范围内及芷阳、张铁、高沟、杨寨村拆迁区域"
    }
  ],

  // 辖区统计
  statistics: {
    total_private: 0,
    total_public: 24,
    avg_tuition_private: 0,
    avg_lottery_rate: 0,
    hot_schools: ["骊山初中", "秦汉学校（初中部）", "骊山新家园学校（初中部）"]
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
      return this.public_schools
        .filter(s => 
          s.name === "骊山初中" || 
          s.name === "秦汉学校（初中部）" || 
          s.name === "骊山新家园学校（初中部）"
        )
        .slice(0, limit);
    },

    // 根据街道办名称查找学校
    findByStreet(streetName) {
      return this.public_schools.filter(s => 
        s.学区.includes(streetName) || 
        s.features.some(f => f.includes(streetName))
      );
    }
  }
};
