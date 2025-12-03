// data/districts/新城区.js

module.exports = {
  // 元数据
  metadata: {
    district: "新城区",
    data_year: "2025",
    last_updated: "2025-06-12",
    total_schools: 15,
    description: "新城区初中学校数据（基于2025年学区划分方案）",
    source: "西安市新城区教育局2025年义务教育学校学区划分方案"
  },

  // 所有学校（合并民办和公办）
  schools: [],

  // 民办初中（新城区目前无民办初中，保持为空数组）
  private_schools: [],

  // 公办初中（根据学区划分方案提取）
  public_schools: [
    {
      "id": "xc_001",
      "name": "西安市第三十中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "地理位置中心", "历史较久"],
      "admission_policy": "学区对口入学",
      "district_range": "北大街以东，西五路以南，新城大院-南新街以西，东大街以北"
    },
    {
      "id": "xc_002",
      "name": "西安市第八十九中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "区域覆盖广", "历史悠久"],
      "admission_policy": "学区对口入学",
      "district_range": "南新街以东，东新街以南，解放路以西，东大街以北（含集贤巷—吉庆巷）"
    },
    {
      "id": "xc_003",
      "name": "西安爱知中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "区域覆盖大", "历史积淀"],
      "admission_policy": "学区对口入学",
      "district_range": "北大街以东，顺城北巷以南，顺城东巷以西，东七路-西七路以北"
    },
    {
      "id": "xc_004",
      "name": "西安市第四十三中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "区域覆盖广", "地理位置中心"],
      "admission_policy": "学区对口入学",
      "district_range": "尚德路以东，西七路-东七路以南，顺城东巷以西，东五路-西五路以北"
    },
    {
      "id": "xc_005",
      "name": "西安市第三十八中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "交通便利", "历史悠久"],
      "admission_policy": "学区对口入学",
      "district_range": "解放路以东，东五路以南，顺城东巷以西，东大街以北"
    },
    {
      "id": "xc_006",
      "name": "西安市第八十九中教育集团弘德中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "集团化办学", "优质资源"],
      "admission_policy": "学区对口入学",
      "district_range": "环城东路以东，陇海线以南，康复路—兴业路以西，碑林界以北"
    },
    {
      "id": "xc_007",
      "name": "西安市文明宫中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "社区配套", "办学稳定"],
      "admission_policy": "学区对口入学",
      "district_range": "北关正街以东，二马路以南，拾翠路以西，自强东路以北"
    },
    {
      "id": "xc_008",
      "name": "陕汽二校（初中）",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "企业配套", "区域独立"],
      "admission_policy": "学区对口入学",
      "district_range": "东二环以东，陇海线以南，清澜界以西，兴工路沿线及以北"
    },
    {
      "id": "xc_009",
      "name": "昆仑中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "社区配套", "办学稳定"],
      "admission_policy": "学区对口入学",
      "district_range": "公园北路106号35街坊昆仑社区等（详见附件）"
    },
    {
      "id": "xc_010",
      "name": "电机厂子校（初中）",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "企业配套", "铁路职工"],
      "admission_policy": "学区对口入学",
      "district_range": "电机厂社区及周边铁路职工小区"
    },
    {
      "id": "xc_011",
      "name": "西安市第七十二中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "区域覆盖广", "办学稳定"],
      "admission_policy": "学区对口入学",
      "district_range": "北四合窑—南四合窑路以东，陇海线以南，东二环以西，碑林界以北"
    },
    {
      "id": "xc_012",
      "name": "西安市汇文中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "历史积淀", "地理位置适中"],
      "admission_policy": "学区对口入学",
      "district_range": "康复路-兴业路以东，陇海线以南，北四合窑—南四合窑路以西，碑林界以北"
    },
    {
      "id": "xc_013",
      "name": "西安市黄河中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "企业配套", "社区覆盖"],
      "admission_policy": "学区对口入学",
      "district_range": "黄河9、10、38街坊等（详见附件）"
    },
    {
      "id": "xc_014",
      "name": "西安市西光中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "企业配套", "历史积淀"],
      "admission_policy": "学区对口入学",
      "district_range": "西光14、15、16、35、36、37街坊等（详见附件）"
    },
    {
      "id": "xc_015",
      "name": "西安市秦川中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "企业配套", "社区覆盖"],
      "admission_policy": "学区对口入学",
      "district_range": "秦川社区"
    },
    {
      "id": "xc_016",
      "name": "西安市东方中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "区域覆盖", "办学稳定"],
      "admission_policy": "学区对口入学",
      "district_range": "东二环以东，咸宁中路以南，幸福林带以西，建工路以北"
    },
    {
      "id": "xc_017",
      "name": "西安市华山中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "区域覆盖广", "办学稳定"],
      "admission_policy": "学区对口入学",
      "district_range": "华山社区及周边区域（详见附件）"
    },
    {
      "id": "xc_018",
      "name": "西安市第八十三中学",
      "type": "公办",
      "level": "公办初中",
      "features": ["学区入学", "区域覆盖", "办学稳定"],
      "admission_policy": "学区对口入学",
      "district_range": "东二环以东，爱学路以南，复聪路—火炬路以西，延兴路以北"
    }
  ],

  // 辖区统计
  statistics: {
    total_private: 0,
    total_public: 18,
    avg_tuition_private: 0,
    avg_lottery_rate: 0,
    hot_schools: ["西安市第八十九中学", "西安爱知中学", "西安市黄河中学"]
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
      const hotIds = ["xc_002", "xc_003", "xc_013"]; // 89中、爱知、黄河中学
      return this.public_schools
        .filter(s => hotIds.includes(s.id))
        .slice(0, limit);
    }
  }
};
