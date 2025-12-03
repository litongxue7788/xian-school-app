// data/districts/西咸新区.js

module.exports = {
  // 元数据
  metadata: {
    district: "西咸新区",
    data_year: "2025",
    last_updated: "2025-06-12",
    total_schools: 49,
    description: "西咸新区初中学校数据（基于2025年学区划分方案，包含沣东、沣西、秦汉、空港、泾河五大新城）",
    source: "西咸新区2025年义务教育学校学区划分方案"
  },

  // 所有学校（合并民办和公办）
  schools: [],

  // 民办初中（西咸新区暂未明确民办初中，保持为空数组）
  private_schools: [],

  // 公办初中（根据学区划分方案提取，包含五大新城）
  public_schools: [
    // ==================== 沣东新城（20所） ====================
    {
      "id": "xx_dd_001",
      "name": "陕西省西咸新区沣东新城第二初级中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "覆盖范围广", "地理位置优"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_002",
      "name": "西咸新区沣东新城第一初级中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "区域中心", "办学稳定"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_003",
      "name": "沣东第五初级中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "地理位置明确", "过渡区域"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_004",
      "name": "陕西省西咸新区沣东新城第六初级中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "新建小区覆盖", "过渡政策"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_005",
      "name": "西安沣东第一学校（中学部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["过渡安置", "拆迁子女", "政策保障"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_006",
      "name": "西安市第六十八中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "村组覆盖", "老牌学校"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_007",
      "name": "西安市长安区斗门街道办事处初级中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "乡镇覆盖", "历史悠久"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_008",
      "name": "西安市长安区义井九年制学校",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["九年一贯制", "村组覆盖", "乡镇教育"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_009",
      "name": "西安市车辆中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["单位配套", "职工子女", "稳定生源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_010",
      "name": "西安市西城中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["企业配套", "老小区覆盖", "稳定办学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_011",
      "name": "西安沣东阿房路学校",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "村组覆盖", "社区配套"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_012",
      "name": "西安高新一中沣东中学初中校区",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "高新体系", "优质资源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_013",
      "name": "西安市第五十中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "村组覆盖广", "老牌学校"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_014",
      "name": "西咸新区沣东新城高新学校（中学部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "小区配套", "优质资源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_015",
      "name": "西咸新区沣东第八学校（中学部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "地理位置明确", "新建区域"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_016",
      "name": "西咸新区沣东新城第七学校（中学部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "新建区域", "小区覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_017",
      "name": "西咸新区沣东上林学校（中学部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "小区配套", "优质资源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_018",
      "name": "沣东第二学校（中学部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "区域覆盖", "新建学校"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_019",
      "name": "西咸新区第一初级中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "新建区域", "中心地带"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_020",
      "name": "西咸新区铁一中金湾中学（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "铁一体系", "优质资源"],
      "admission_policy": "学区对口入学"
    },

    // ==================== 沣西新城（9所） ====================
    {
      "id": "xx_dx_021",
      "name": "沣西实验学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "九年一贯制", "实验性质"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_022",
      "name": "沣西新城第二学校(初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "新建学校", "区域覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_023",
      "name": "沣西新城第四学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "新建学校", "过渡政策"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_024",
      "name": "沣西中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "老牌学校", "钓台区域"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_025",
      "name": "钓台中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "区域学校", "钓台区域"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_026",
      "name": "西咸新区第二初级中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "高桥街道", "区域中心"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_027",
      "name": "西安市创新港中学（创新港西安交通大学附属中学）-初中部",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "交大附属", "优质资源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_028",
      "name": "马王初级中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "马王街道", "乡镇中学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_029",
      "name": "大王初级中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "大王街道", "乡镇中学"],
      "admission_policy": "学区对口入学"
    },

    // ==================== 秦汉新城（8所） ====================
    {
      "id": "xx_qh_030",
      "name": "秦汉中学（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "优质资源", "新建小区"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_031",
      "name": "兰池学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "九年一贯制", "兰池区域"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_032",
      "name": "渭柳初中",
      "type": "公办",
      "level": "公办初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "区域覆盖广", "过渡政策"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_033",
      "name": "周陵初级中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "周陵区域", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_034",
      "name": "蒋刘中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "蒋刘区域", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_035",
      "name": "白庙中学（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "白庙区域", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_036",
      "name": "秦汉第四学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "新建学校", "小区配套"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_037",
      "name": "秦汉第四学校西校区（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "恒大文旅城", "小区配套"],
      "admission_policy": "学区对口入学"
    },

    // ==================== 空港新城（5所） ====================
    {
      "id": "xx_kg_038",
      "name": "底张晋公庙中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "空港新城",
      "features": ["学区入学", "底张区域", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_kg_039",
      "name": "北杜镇初级中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "空港新城",
      "features": ["学区入学", "北杜街道", "乡镇中学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_kg_040",
      "name": "太平镇太平中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "空港新城",
      "features": ["学区入学", "太平镇", "乡镇中学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_kg_041",
      "name": "西咸新区空港第一学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "空港新城",
      "features": ["学区入学", "新建学校", "空港核心"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_kg_042",
      "name": "西咸新区空港实验学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "空港新城",
      "features": ["学区入学", "实验性质", "空港核心"],
      "admission_policy": "学区对口入学"
    },

    // ==================== 泾河新城（7所） ====================
    {
      "id": "xx_jh_043",
      "name": "永乐镇中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "永乐镇", "乡镇中学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_044",
      "name": "高庄镇高庄中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "高庄镇", "乡镇中学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_045",
      "name": "西咸新区泾河新城第二学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "新建学校", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_046",
      "name": "西咸新区泾河新城第一中学",
      "type": "公办",
      "level": "公办初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "第一中学", "中心学校"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_047",
      "name": "西咸新区泾河第六学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "新建学校", "过渡政策"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_048",
      "name": "西咸新区泾河新城第三学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "新建学校", "高庄区域"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_049",
      "name": "西咸新区泾河第八学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "新建学校", "正阳大道东"],
      "admission_policy": "学区对口入学"
    }
  ],

  // 辖区统计
  statistics: {
    total_private: 0,
    total_public: 49,
    avg_tuition_private: 0,
    avg_lottery_rate: 0,
    hot_schools: [
      "西安高新一中沣东中学初中校区",
      "西咸新区铁一中金湾中学（初中部）",
      "西安市创新港中学（创新港西安交通大学附属中学）-初中部",
      "秦汉中学（初中部）",
      "西咸新区泾河新城第一中学"
    ]
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
    getHotSchools(limit = 5) {
      const hotIds = ["xx_dd_012", "xx_dd_020", "xx_dx_027", "xx_qh_030", "xx_jh_046"];
      return this.public_schools
        .filter(s => hotIds.includes(s.id))
        .slice(0, limit);
    },

    // 按新城筛选（新增功能）
    filterByNewcity(newcity) {
      return this.public_schools.filter(s => s.newcity === newcity);
    }
  }
};
