// data/districts/曲江新区.js

module.exports = {
  // 元数据
  metadata: {
    district: "曲江新区",
    data_year: "2025",
    last_updated: "2025-01-20",
    total_schools: 24,
    description: "曲江新区义务教育学校数据（含小学和初中）",
    source: "曲江新区2025年学区划分一览表"
  },

  // 所有学校（合并民办和公办）
  schools: [],

  // 民办初中（根据实际数据调整，若无不填）
  private_schools: [],

  // 公办初中（从学区表中提取）
  public_schools: [
    {
      "id": "qj_001",
      "name": "西安市曲江第一中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["学区入学", "教学质量稳", "资源配套好"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_002",
      "name": "西安市曲江第二中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["新建校区", "设施现代", "学区覆盖广"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_003",
      "name": "西安市曲江第三中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["原村安置", "社区配套", "就近入学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_004",
      "name": "西安市曲江第一学校中学部",
      "type": "公办",
      "level": "初级中学",
      "features": ["九年一贯制", "区域配套", "设施齐全"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_005",
      "name": "西安市曲江第三初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["新建初中", "学区明确", "资源整合"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_006",
      "name": "西安市曲江第二学校中学部",
      "type": "公办",
      "level": "初级中学",
      "features": ["配套初中", "学区覆盖", "资源均衡"],
      "admission_policy": "学区对口入学"
    }
  ],

  // 小学（公办）
  primary_schools: [
    {
      "id": "qj_p001",
      "name": "西安市曲江第一小学",
      "type": "公办",
      "level": "小学",
      "features": ["老牌名校", "学区稳定", "师资强"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p002",
      "name": "西安市曲江南湖小学",
      "type": "公办",
      "level": "小学",
      "features": ["环境优美", "片区热门", "设施完善"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p003",
      "name": "西安市曲江第二小学",
      "type": "公办",
      "level": "小学",
      "features": ["新建校区", "设施先进", "学区明确"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p004",
      "name": "西安市曲江第三小学",
      "type": "公办",
      "level": "小学",
      "features": ["区域配套", "学区覆盖", "就近入学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p005",
      "name": "西安市曲江第四小学",
      "type": "公办",
      "level": "小学",
      "features": ["学区新建", "设施完善", "社区配套"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p006",
      "name": "西安市曲江第五小学",
      "type": "公办",
      "level": "小学",
      "features": ["环境优美", "学区稳定", "就近入学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p007",
      "name": "西安市曲江第六小学",
      "type": "公办",
      "level": "小学",
      "features": ["新建校区", "学区明确", "设施齐全"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p008",
      "name": "西安市曲江第七小学",
      "type": "公办",
      "level": "小学",
      "features": ["区域配套", "学区覆盖", "就近入学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p009",
      "name": "西安市曲江第八小学",
      "type": "公办",
      "level": "小学",
      "features": ["社区小学", "学区明确", "就近入学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p010",
      "name": "西安市曲江第九小学",
      "type": "公办",
      "level": "小学",
      "features": ["社区小学", "学区稳定", "配套完善"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p011",
      "name": "西安市曲江第十小学",
      "type": "公办",
      "level": "小学",
      "features": ["学区覆盖广", "社区配套", "设施齐全"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p012",
      "name": "西安市曲江第十二小学",
      "type": "公办",
      "level": "小学",
      "features": ["社区小学", "学区明确", "就近入学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p013",
      "name": "西安市曲江第十三小学",
      "type": "公办",
      "level": "小学",
      "features": ["学区稳定", "社区配套", "设施完善"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p014",
      "name": "西安市曲江第十四小学",
      "type": "公办",
      "level": "小学",
      "features": ["社区小学", "学区明确", "配套完善"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p015",
      "name": "西安市曲江第十五小学",
      "type": "公办",
      "level": "小学",
      "features": ["社区小学", "学区稳定", "就近入学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p016",
      "name": "西安市曲江第十六小学",
      "type": "公办",
      "level": "小学",
      "features": ["学区明确", "设施齐全", "师资良好"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p017",
      "name": "西安市曲江第一学校小学部",
      "type": "公办",
      "level": "小学",
      "features": ["九年一贯制", "学区配套", "资源整合"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "qj_p018",
      "name": "西安市曲江第二学校小学部",
      "type": "公办",
      "level": "小学",
      "features": ["配套小学", "学区稳定", "设施完善"],
      "admission_policy": "学区对口入学"
    }
  ],

  // 辖区统计
  statistics: {
    total_private: 0,
    total_public: 24,
    total_primary: 18,
    total_junior: 6,
    hot_schools: ["西安市曲江第一中学", "西安市曲江南湖小学", "西安市曲江第一小学"]
  },

  // 辖区特有功能
  utils: {
    // 按特征筛选
    filterByFeature(feature) {
      return {
        public: this.public_schools.filter(s => s.features.includes(feature)),
        primary: this.primary_schools.filter(s => s.features.includes(feature))
      };
    },

    // 获取热门学校
    getHotSchools(limit = 5) {
      const hotIds = ["qj_001", "qj_p002", "qj_p001"];
      const allSchools = [...this.public_schools, ...this.primary_schools];
      return allSchools.filter(s => hotIds.includes(s.id)).slice(0, limit);
    }
  }
};
