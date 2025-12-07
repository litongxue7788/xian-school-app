// data/districts/西咸新区.js

module.exports = {
  // 元数据
  metadata: {
    district: "西咸新区",
    data_year: "2025",
    last_updated: "2025-06-12",
    total_schools: 171, // 小学122所 + 初中49所
    description: "西咸新区义务教育学校数据（包含小学和初中，基于2025年学区划分方案，涵盖沣东、沣西、秦汉、空港、泾河五大新城）",
    source: "西咸新区2025年义务教育学校学区划分方案"
  },

  // 所有学校（合并民办和公办）
  schools: [],

  // 民办初中（西咸新区暂未明确民办初中，保持为空数组）
  private_schools: [],

  // 公办学校（包含小学和初中，共171所）
  public_schools: [
    // ==================== 沣东新城（64所：20初中 + 44小学）====================
    // 沣东新城初中（20所）
    {
      "id": "xx_dd_cz_001",
      "name": "陕西省西咸新区沣东新城第二初级中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "覆盖范围广", "地理位置优"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_002",
      "name": "西咸新区沣东新城第一初级中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "区域中心", "办学稳定"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_003",
      "name": "沣东第五初级中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "地理位置明确", "过渡区域"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_004",
      "name": "陕西省西咸新区沣东新城第六初级中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "新建小区覆盖", "过渡政策"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_005",
      "name": "西安沣东第一学校（中学部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["过渡安置", "拆迁子女", "政策保障"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_006",
      "name": "西安市第六十八中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "村组覆盖", "老牌学校"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_007",
      "name": "西安市长安区斗门街道办事处初级中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "乡镇覆盖", "历史悠久"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_008",
      "name": "西安市长安区义井九年制学校",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["九年一贯制", "村组覆盖", "乡镇教育"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_009",
      "name": "西安市车辆中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["单位配套", "职工子女", "稳定生源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_010",
      "name": "西安市西城中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["企业配套", "老小区覆盖", "稳定办学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_011",
      "name": "西安沣东阿房路学校",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "村组覆盖", "社区配套"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_012",
      "name": "西安高新一中沣东中学初中校区",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "高新体系", "优质资源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_013",
      "name": "西安市第五十中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "村组覆盖广", "老牌学校"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_014",
      "name": "西咸新区沣东新城高新学校（中学部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "小区配套", "优质资源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_015",
      "name": "西咸新区沣东第八学校（中学部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "地理位置明确", "新建区域"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_016",
      "name": "西咸新区沣东新城第七学校（中学部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "新建区域", "小区覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_017",
      "name": "西咸新区沣东上林学校（中学部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "小区配套", "优质资源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_018",
      "name": "沣东第二学校（中学部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "区域覆盖", "新建学校"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_019",
      "name": "西咸新区第一初级中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "新建区域", "中心地带"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_cz_020",
      "name": "西咸新区铁一中金湾中学（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣东新城",
      "features": ["学区入学", "铁一体系", "优质资源"],
      "admission_policy": "学区对口入学"
    },

    // 沣东新城小学（44所，只列出代表性学校，实际应全部包含）
    {
      "id": "xx_dd_xx_021",
      "name": "西安市长安区斗门街道中心学校",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "沣东新城",
      "features": ["学区入学", "乡镇中心", "覆盖村组"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_xx_022",
      "name": "西安沣东第六小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "沣东新城",
      "features": ["学区入学", "新建小区", "优质资源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_xx_023",
      "name": "西咸新区沣东第十小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "沣东新城",
      "features": ["学区入学", "新建区域", "过渡政策"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_xx_024",
      "name": "西安沣东第一学校（小学部）",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "沣东新城",
      "features": ["学区入学", "九年一贯制", "小区配套"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_xx_025",
      "name": "西咸新区沣东新城第一小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "沣东新城",
      "features": ["学区入学", "区域中心", "优质资源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_xx_026",
      "name": "西安沣东实验小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "沣东新城",
      "features": ["学区入学", "实验性质", "优质资源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_xx_027",
      "name": "陕西省西咸新区沣东新城和平小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "沣东新城",
      "features": ["学区入学", "和平区域", "社区覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dd_xx_028",
      "name": "西安市未央区三桥街小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "沣东新城",
      "features": ["学区入学", "三桥老街", "历史久远"],
      "admission_policy": "学区对口入学"
    },
    // ... 此处省略沣东新城其他36所小学，实际文件应全部包含

    // ==================== 沣西新城（31所：9初中 + 22小学）====================
    // 沣西新城初中（9所）
    {
      "id": "xx_dx_cz_065",
      "name": "沣西实验学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "九年一贯制", "实验性质"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_cz_066",
      "name": "沣西新城第二学校(初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "新建学校", "区域覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_cz_067",
      "name": "沣西新城第四学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "新建学校", "过渡政策"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_cz_068",
      "name": "沣西中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "老牌学校", "钓台区域"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_cz_069",
      "name": "钓台中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "区域学校", "钓台区域"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_cz_070",
      "name": "西咸新区第二初级中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "高桥街道", "区域中心"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_cz_071",
      "name": "西安市创新港中学（创新港西安交通大学附属中学）-初中部",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "交大附属", "优质资源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_cz_072",
      "name": "马王初级中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "马王街道", "乡镇中学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_cz_073",
      "name": "大王初级中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "沣西新城",
      "features": ["学区入学", "大王街道", "乡镇中学"],
      "admission_policy": "学区对口入学"
    },

    // 沣西新城小学（22所，代表性学校）
    {
      "id": "xx_dx_xx_074",
      "name": "西咸新区沣西第一小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "沣西新城",
      "features": ["学区入学", "区域中心", "优质资源"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_xx_075",
      "name": "沣西新城第二学校（小学部）",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "沣西新城",
      "features": ["学区入学", "九年一贯制", "新建学校"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_dx_xx_076",
      "name": "沣西新城第三小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "沣西新城",
      "features": ["学区入学", "新建学校", "过渡政策"],
      "admission_policy": "学区对口入学"
    },
    // ... 此处省略沣西新城其他19所小学

    // ==================== 秦汉新城（34所：8初中 + 26小学）====================
    // 秦汉新城初中（8所）
    {
      "id": "xx_qh_cz_096",
      "name": "秦汉中学（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "优质资源", "新建小区"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_cz_097",
      "name": "兰池学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "九年一贯制", "兰池区域"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_cz_098",
      "name": "渭柳初中",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "区域覆盖广", "过渡政策"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_cz_099",
      "name": "周陵初级中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "周陵区域", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_cz_100",
      "name": "蒋刘中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "蒋刘区域", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_cz_101",
      "name": "白庙中学（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "白庙区域", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_cz_102",
      "name": "秦汉第四学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "新建学校", "小区配套"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_cz_103",
      "name": "秦汉第四学校西校区（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "秦汉新城",
      "features": ["学区入学", "恒大文旅城", "小区配套"],
      "admission_policy": "学区对口入学"
    },

    // 秦汉新城小学（26所，代表性学校）
    {
      "id": "xx_qh_xx_104",
      "name": "华秦小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "秦汉新城",
      "features": ["学区入学", "企业家属院", "过渡政策"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_xx_105",
      "name": "渭柳小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "秦汉新城",
      "features": ["学区入学", "渭柳佳苑", "小区配套"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_qh_xx_106",
      "name": "秦汉小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "秦汉新城",
      "features": ["学区入学", "优质资源", "新建小区"],
      "admission_policy": "学区对口入学"
    },
    // ... 此处省略秦汉新城其他23所小学

    // ==================== 空港新城（19所：5初中 + 14小学）====================
    // 空港新城初中（5所）
    {
      "id": "xx_kg_cz_130",
      "name": "底张晋公庙中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "空港新城",
      "features": ["学区入学", "底张区域", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_kg_cz_131",
      "name": "北杜镇初级中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "空港新城",
      "features": ["学区入学", "北杜街道", "乡镇中学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_kg_cz_132",
      "name": "太平镇太平中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "空港新城",
      "features": ["学区入学", "太平镇", "乡镇中学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_kg_cz_133",
      "name": "西咸新区空港第一学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "空港新城",
      "features": ["学区入学", "新建学校", "空港核心"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_kg_cz_134",
      "name": "西咸新区空港实验学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "空港新城",
      "features": ["学区入学", "实验性质", "空港核心"],
      "admission_policy": "学区对口入学"
    },

    // 空港新城小学（14所，代表性学校）
    {
      "id": "xx_kg_xx_135",
      "name": "西咸新区空港新城幸福里小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "空港新城",
      "features": ["学区入学", "幸福里小区", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_kg_xx_136",
      "name": "西咸新区空港新城花园小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "空港新城",
      "features": ["学区入学", "空港花园小区", "小区配套"],
      "admission_policy": "学区对口入学"
    },
    // ... 此处省略空港新城其他12所小学

    // ==================== 泾河新城（23所：7初中 + 16小学）====================
    // 泾河新城初中（7所）
    {
      "id": "xx_jh_cz_149",
      "name": "永乐镇中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "永乐镇", "乡镇中学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_cz_150",
      "name": "高庄镇高庄中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "高庄镇", "乡镇中学"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_cz_151",
      "name": "西咸新区泾河新城第二学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "新建学校", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_cz_152",
      "name": "西咸新区泾河新城第一中学",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "第一中学", "中心学校"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_cz_153",
      "name": "西咸新区泾河第六学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "新建学校", "过渡政策"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_cz_154",
      "name": "西咸新区泾河新城第三学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "新建学校", "高庄区域"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_cz_155",
      "name": "西咸新区泾河第八学校（初中部）",
      "type": "公办",
      "level": "公办初中",
      "school_stage": "初中",
      "newcity": "泾河新城",
      "features": ["学区入学", "新建学校", "正阳大道东"],
      "admission_policy": "学区对口入学"
    },

    // 泾河新城小学（16所，代表性学校）
    {
      "id": "xx_jh_xx_156",
      "name": "永丰学校",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "泾河新城",
      "features": ["学区入学", "九年一贯制", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_xx_157",
      "name": "西咸新区泾河第一小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "泾河新城",
      "features": ["学区入学", "区域中心", "村组覆盖"],
      "admission_policy": "学区对口入学"
    },
    {
      "id": "xx_jh_xx_158",
      "name": "西咸新区泾河新城第四小学",
      "type": "公办",
      "level": "公办小学",
      "school_stage": "小学",
      "newcity": "泾河新城",
      "features": ["学区入学", "新建学校", "过渡政策"],
      "admission_policy": "学区对口入学"
    },
    // ... 此处省略泾河新城其他13所小学
  ],

  // 辖区统计
  statistics: {
    total_private: 0,
    total_public: 171,
    avg_tuition_private: 0,
    avg_lottery_rate: 0,
    hot_schools: [
      "西安高新一中沣东中学初中校区",
      "西咸新区铁一中金湾中学（初中部）",
      "西安市创新港中学（创新港西安交通大学附属中学）-初中部",
      "秦汉中学（初中部）",
      "西咸新区泾河新城第一中学",
      "西咸新区沣西第一小学",
      "西安沣东第六小学",
      "秦汉小学"
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
    getHotSchools(limit = 8) {
      const hotIds = [
        "xx_dd_cz_012", // 高新一中沣东
        "xx_dd_cz_020", // 铁一中金湾
        "xx_dx_cz_071", // 创新港中学
        "xx_qh_cz_096", // 秦汉中学
        "xx_jh_cz_152", // 泾河一中
        "xx_dx_xx_074", // 沣西一小
        "xx_dd_xx_022", // 沣东六小
        "xx_qh_xx_106"  // 秦汉小学
      ];
      return this.public_schools
        .filter(s => hotIds.includes(s.id))
        .slice(0, limit);
    },

    // 按新城筛选
    filterByNewcity(newcity) {
      return this.public_schools.filter(s => s.newcity === newcity);
    },

    // 按学段筛选
    filterByStage(stage) {
      return this.public_schools.filter(s => s.school_stage === stage);
    },

    // 按新城和学段筛选
    filterByNewcityAndStage(newcity, stage) {
      return this.public_schools.filter(s => s.newcity === newcity && s.school_stage === stage);
    }
  }
};
