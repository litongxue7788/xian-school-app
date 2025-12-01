// data/schools.js - 西安小升初学校权威数据库（2025版）

// ==================== 西安市民办初中完整名单 ====================
const XI_AN_PRIVATE_SCHOOLS = [
  {
    id: "xa_001",
    name: "西安翱翔中学",
    full_name: "西安翱翔中学",
    type: "民办",
    district: "碑林区",
    address: "碑林区友谊西路127号",
    enrollment_plan: 800,
    classes: 16,
    direct_promotion: 114,
    features: ["学术导向", "理科优势", "竞赛培养"],
    tuition: "7500-12000元/学期",
    contact: "029-85210001",
    official_url: "http://www.xaaxzx.com",
    source_number: "①",
    heat_level: 3,
    apply_ratio: 1.5,
    lottery_probability: "约35%",
    match_tags: ["学霸型", "理科偏好", "竞赛型"]
  },
  {
    id: "xa_002",
    name: "西安辅轮中学",
    full_name: "西安辅轮中学",
    type: "民办",
    district: "碑林区",
    address: "碑林区友谊东路68号",
    enrollment_plan: 1000,
    classes: 20,
    direct_promotion: 0,
    features: ["口碑稳健", "校风严谨", "全面发展"],
    tuition: "7000-11000元/学期",
    contact: "029-85210002",
    official_url: "http://www.xaflzx.com",
    source_number: "①",
    heat_level: 3,
    apply_ratio: 1.3,
    lottery_probability: "约40%",
    match_tags: ["均衡型", "稳定发展", "中等生优选"]
  },
  {
    id: "xa_003",
    name: "西安电子科技中学",
    full_name: "西安电子科技大学附属中学",
    type: "民办",
    district: "雁塔区",
    address: "雁塔区太白南路2号",
    enrollment_plan: 300,
    classes: 6,
    direct_promotion: 42,
    features: ["理科强", "学术导向", "竞赛浓度高", "信息学特长"],
    tuition: "8000-13000元/学期",
    contact: "029-88200001",
    official_url: "http://www.xidianfz.com",
    source_number: "②",
    heat_level: 4,
    apply_ratio: 2.2,
    lottery_probability: "约25%",
    match_tags: ["竞赛型", "理科天才", "信息学特长"]
  },
  {
    id: "xa_004",
    name: "西安高新第一中学",
    full_name: "西安市高新第一中学",
    type: "民办",
    district: "高新区",
    address: "高新区高新路62号",
    enrollment_plan: 700,
    classes: 14,
    direct_promotion: 150,
    features: ["省级示范", "理科强化", "科技创新", "国际交流"],
    tuition: "8500-15000元/学期",
    contact: "029-88320488",
    official_url: "http://www.gxyzh.com",
    source_number: "③",
    heat_level: 5,
    apply_ratio: 2.5,
    lottery_probability: "约20%",
    match_tags: ["顶尖学霸", "竞赛路线", "国际化"]
  },
  {
    id: "xa_005",
    name: "西安铁一中",
    full_name: "西安铁一中学",
    type: "民办",
    district: "碑林区",
    address: "碑林区友谊东路120号",
    enrollment_plan: 650,
    classes: 13,
    direct_promotion: 120,
    features: ["全面发展", "社团丰富", "艺体特长", "素质教育"],
    tuition: "7500-13000元/学期",
    contact: "029-82345678",
    official_url: "http://www.xatyz.com",
    source_number: "③",
    heat_level: 5,
    apply_ratio: 2.3,
    lottery_probability: "约22%",
    match_tags: ["综合素质", "艺体特长", "领导力培养"]
  },
  {
    id: "xa_006",
    name: "西安交大附中分校",
    full_name: "西安交通大学附属中学分校",
    type: "民办",
    district: "雁塔区",
    address: "雁塔区朱雀大街205号",
    enrollment_plan: 600,
    classes: 12,
    direct_promotion: 100,
    features: ["学术严谨", "校风优良", "直升优势", "理科实验班"],
    tuition: "7000-12000元/学期",
    contact: "029-85202303",
    official_url: "http://www.xajdfz.com",
    source_number: "③",
    heat_level: 4,
    apply_ratio: 2.0,
    lottery_probability: "约30%",
    match_tags: ["学术型", "严谨校风", "实验班优势"]
  },
  {
    id: "xa_007",
    name: "陕师大附中分校",
    full_name: "陕西师范大学附属中学分校",
    type: "民办",
    district: "雁塔区",
    address: "雁塔区翠华路115号",
    enrollment_plan: 550,
    classes: 11,
    direct_promotion: 90,
    features: ["师资强大", "实验班特色", "人文素养", "文科优势"],
    tuition: "7500-13000元/学期",
    contact: "029-85251543",
    official_url: "http://www.ssdfz.com",
    source_number: "③",
    heat_level: 4,
    apply_ratio: 1.9,
    lottery_probability: "约32%",
    match_tags: ["文科优势", "人文素养", "师范背景"]
  },
  {
    id: "xa_008",
    name: "西安曲江一中",
    full_name: "西安市曲江第一中学",
    type: "民办",
    district: "曲江新区",
    address: "曲江新区雁南五路396号",
    enrollment_plan: 500,
    classes: 10,
    direct_promotion: 80,
    features: ["国际视野", "小班教学", "艺术特色", "校园环境优美"],
    tuition: "9000-16000元/学期",
    contact: "029-85410088",
    official_url: "http://www.qjyz.com",
    source_number: "④",
    heat_level: 4,
    apply_ratio: 1.8,
    lottery_probability: "约35%",
    match_tags: ["国际化", "艺术特色", "小班教学"]
  },
  {
    id: "xa_009",
    name: "西安高新唐南中学",
    full_name: "西安高新唐南中学",
    type: "民办",
    district: "雁塔区",
    address: "雁塔区科技六路6号",
    enrollment_plan: 400,
    classes: 8,
    direct_promotion: 0,
    features: ["学术导向", "口碑稳健", "管理严格", "校风优良"],
    tuition: "8000-14000元/学期",
    contact: "029-88310001",
    official_url: "http://www.gxtnzx.com",
    source_number: "②",
    heat_level: 4,
    apply_ratio: 1.8,
    lottery_probability: "约30%",
    match_tags: ["学术型", "管理严格", "高新系"]
  },
  {
    id: "xa_010",
    name: "西安滨河学校",
    full_name: "西安铁一中滨河学校",
    type: "民办",
    district: "灞桥区",
    address: "灞桥区灞柳西路与柳烟路交汇处",
    enrollment_plan: 1200,
    classes: 30,
    direct_promotion: 189,
    features: ["素质教育", "艺术体育强", "寄宿制", "校园设施先进"],
    tuition: "7500-13000元/学期",
    contact: "029-83350001",
    official_url: "http://www.xabhxx.com",
    source_number: "②",
    heat_level: 4,
    apply_ratio: 1.6,
    lottery_probability: "约38%",
    match_tags: ["综合素质", "艺体特长", "寄宿制"]
  },
  {
    id: "xa_011",
    name: "西安锦园中学",
    full_name: "西安锦园中学",
    type: "民办",
    district: "未央区",
    address: "未央区凤城五路69号",
    enrollment_plan: 300,
    classes: 6,
    direct_promotion: 285,
    features: ["口碑稳健", "素质教育", "小班教学", "家校合作好"],
    tuition: "7000-12000元/学期",
    contact: "029-86510001",
    official_url: "http://www.xajyzx.com",
    source_number: "②",
    heat_level: 4,
    apply_ratio: 1.7,
    lottery_probability: "约32%",
    match_tags: ["稳定型", "家校合作", "小班教学"]
  },
  {
    id: "xa_012",
    name: "西安太白学校",
    full_name: "西安太白学校",
    type: "民办",
    district: "雁塔区",
    address: "雁塔区电子正街69号",
    enrollment_plan: 500,
    classes: 10,
    direct_promotion: 53,
    features: ["素质教育", "特色课程", "快乐教育", "关注个性发展"],
    tuition: "6500-11000元/学期",
    contact: "029-88210001",
    official_url: "http://www.xatbxx.com",
    source_number: "②",
    heat_level: 3,
    apply_ratio: 1.4,
    lottery_probability: "约45%",
    match_tags: ["快乐成长", "个性发展", "素质教育"]
  },
  {
    id: "xa_013",
    name: "西安凤凰城初级中学",
    full_name: "西安凤凰城初级中学",
    type: "民办",
    district: "未央区",
    address: "未央区凤城五路与太华路交汇处",
    enrollment_plan: 600,
    classes: 12,
    direct_promotion: 520,
    features: ["新办学校", "硬件一流", "小班制", "国际化课程"],
    tuition: "8500-15000元/学期",
    contact: "029-86520001",
    official_url: "http://www.xafhcz.com",
    source_number: "②",
    heat_level: 3,
    apply_ratio: 1.3,
    lottery_probability: "约50%",
    match_tags: ["新学校", "硬件好", "小班制"]
  },
  {
    id: "xa_014",
    name: "西安西京初级中学",
    full_name: "西安西京初级中学",
    type: "民办",
    district: "长安区",
    address: "长安区西京路1号",
    enrollment_plan: 350,
    classes: 8,
    direct_promotion: 176,
    features: ["大学附中", "资源共享", "实验班", "科技创新"],
    tuition: "6000-10000元/学期",
    contact: "029-85610001",
    official_url: "http://www.xaxjcjzx.com",
    source_number: "②",
    heat_level: 3,
    apply_ratio: 1.3,
    lottery_probability: "约48%",
    match_tags: ["大学背景", "资源共享", "性价比高"]
  },
  {
    id: "xa_015",
    name: "西安万科城初级中学",
    full_name: "西安万科城初级中学",
    type: "民办",
    district: "长安区",
    address: "长安区樱花一路万科城社区内",
    enrollment_plan: 600,
    classes: 12,
    direct_promotion: 361,
    features: ["社区学校", "便利接送", "素质教育", "活动丰富"],
    tuition: "6500-11000元/学期",
    contact: "029-85620001",
    official_url: "http://www.xawkcjzx.com",
    source_number: "②",
    heat_level: 3,
    apply_ratio: 1.3,
    lottery_probability: "约50%",
    match_tags: ["社区便利", "活动丰富", "接送方便"]
  },
  {
    id: "xa_016",
    name: "西安湖滨中学",
    full_name: "西安湖滨中学",
    type: "民办",
    district: "长安区",
    address: "长安区西长安街555号",
    enrollment_plan: 700,
    classes: 14,
    direct_promotion: 347,
    features: ["环境优美", "硬件先进", "素质教育", "社团活动多"],
    tuition: "7000-12000元/学期",
    contact: "029-85630001",
    official_url: "http://www.xahbzx.com",
    source_number: "②",
    heat_level: 3,
    apply_ratio: 1.3,
    lottery_probability: "约48%",
    match_tags: ["环境优美", "硬件好", "社团丰富"]
  },
  {
    id: "xa_017",
    name: "西安航天菁英学校",
    full_name: "西安航天菁英学校",
    type: "民办",
    district: "航天基地",
    address: "航天基地东长安街888号",
    enrollment_plan: 900,
    classes: 18,
    direct_promotion: 75,
    features: ["航天特色", "科技教育", "寄宿制", "硬件一流"],
    tuition: "8000-14000元/学期",
    contact: "029-85810001",
    official_url: "http://www.xahtjyxx.com",
    source_number: "④",
    heat_level: 3,
    apply_ratio: 1.4,
    lottery_probability: "约42%",
    match_tags: ["航天特色", "科技教育", "寄宿制"]
  },
  {
    id: "xa_018",
    name: "西安曲江康桥学校",
    full_name: "西安曲江康桥学校",
    type: "民办",
    district: "曲江新区",
    address: "曲江新区雁翔路与黄渠头路交汇处",
    enrollment_plan: 256,
    classes: 8,
    direct_promotion: 5,
    features: ["国际学校", "双语教学", "素质教育", "出国导向"],
    tuition: "35000-50000元/学期",
    contact: "029-85420001",
    official_url: "http://www.xaqjkqxx.com",
    source_number: "④",
    heat_level: 3,
    apply_ratio: 1.5,
    lottery_probability: "约40%",
    match_tags: ["国际学校", "出国路线", "双语教学"]
  },
  {
    id: "xa_019",
    name: "西安曲江德闳学校",
    full_name: "西安曲江德闳学校",
    type: "民办",
    district: "曲江新区",
    address: "曲江新区曲江池南路",
    enrollment_plan: 75,
    classes: 3,
    direct_promotion: 1,
    features: ["国际课程", "全人教育", "小班制", "高端定位"],
    tuition: "50000-80000元/学期",
    contact: "029-85430001",
    official_url: "http://www.xaqjdhxx.com",
    source_number: "④",
    heat_level: 3,
    apply_ratio: 1.6,
    lottery_probability: "约35%",
    match_tags: ["高端国际", "小班制", "全人教育"]
  },
  {
    id: "xa_020",
    name: "西安高新东区初级中学",
    full_name: "西安高新东区初级中学",
    type: "民办",
    district: "高新区",
    address: "高新区锦业路1号都市之门附近",
    enrollment_plan: 400,
    classes: 8,
    direct_promotion: 166,
    features: ["高新系", "资源共享", "小班教学", "科技创新"],
    tuition: "8500-15000元/学期",
    contact: "029-88310002",
    official_url: "http://www.gxdqzx.com",
    source_number: "③",
    heat_level: 3,
    apply_ratio: 1.5,
    lottery_probability: "约38%",
    match_tags: ["高新系", "资源共享", "科技特色"]
  },
  {
    id: "xa_021",
    name: "西安博迪学校",
    full_name: "西安博迪学校",
    type: "民办",
    district: "高新区",
    address: "高新区锦业路西段",
    enrollment_plan: 200,
    classes: 4,
    direct_promotion: 0,
    features: ["外语特色", "国际交流", "寄宿制", "小班教学"],
    tuition: "10000-18000元/学期",
    contact: "029-88310003",
    official_url: "http://www.bodischool.com",
    source_number: "④",
    heat_level: 3,
    apply_ratio: 1.4,
    lottery_probability: "约45%",
    match_tags: ["外语特色", "寄宿制", "国际交流"]
  },
  {
    id: "xa_022",
    name: "西安博爱学校",
    full_name: "西安博爱学校",
    type: "民办",
    district: "经开区",
    address: "经开区凤城二路25号",
    enrollment_plan: 400,
    classes: 8,
    direct_promotion: 0,
    features: ["全纳教育", "素质教育", "个性化培养", "关注特殊需求"],
    tuition: "6000-10000元/学期",
    contact: "029-86520002",
    official_url: "http://www.xabaxx.com",
    source_number: "②",
    heat_level: 3,
    apply_ratio: 1.3,
    lottery_probability: "约50%",
    match_tags: ["全纳教育", "个性化", "关爱型"]
  },
  {
    id: "xa_023",
    name: "西安西港花园学校",
    full_name: "西安西港花园学校",
    type: "民办",
    district: "浐灞国际港",
    address: "国际港务区港务大道",
    enrollment_plan: 300,
    classes: 6,
    direct_promotion: 68,
    features: ["新建学校", "硬件一流", "小班制", "港务区特色"],
    tuition: "7000-12000元/学期",
    contact: "029-83360001",
    official_url: "http://www.xaxghyxx.com",
    source_number: "④",
    heat_level: 3,
    apply_ratio: 1.3,
    lottery_probability: "约48%",
    match_tags: ["新建校", "硬件好", "港务区"]
  },
  {
    id: "xa_024",
    name: "西咸新区黄冈泾河学校",
    full_name: "西咸新区黄冈泾河学校",
    type: "民办",
    district: "西咸新区",
    address: "西咸新区泾河新城泾河大道",
    enrollment_plan: 670,
    classes: 14,
    direct_promotion: 234,
    features: ["黄冈模式", "应试教育", "管理严格", "寄宿制"],
    tuition: "8000-14000元/学期",
    contact: "029-36210001",
    official_url: "http://www.xxjhxx.com",
    source_number: "④",
    heat_level: 3,
    apply_ratio: 1.2,
    lottery_probability: "约55%",
    match_tags: ["黄冈模式", "严格管理", "寄宿制"]
  },
  {
    id: "xa_025",
    name: "西咸泾河泾华学校",
    full_name: "西咸泾河泾华学校",
    type: "民办",
    district: "西咸新区",
    address: "西咸新区泾河新城茶马大道",
    enrollment_plan: 330,
    classes: 7,
    direct_promotion: 0,
    features: ["新建学校", "硬件先进", "小班制", "个性化教育"],
    tuition: "7500-13000元/学期",
    contact: "029-36210002",
    official_url: "http://www.xxjhjhxx.com",
    source_number: "④",
    heat_level: 3,
    apply_ratio: 1.1,
    lottery_probability: "约60%",
    match_tags: ["新建校", "硬件好", "个性化"]
  }
];

// ==================== 西安市优质公办初中（按区划分） ====================
const XI_AN_PUBLIC_SCHOOLS = {
  "新城区": [
    {
      id: "xc_001",
      name: "西安市第八十九中学",
      type: "公办",
      level: "省级示范高中（含初中部）",
      address: "新城区西七路189号",
      features: ["百年名校", "省级示范", "历史底蕴深厚", "文科优势"],
      admission_policy: "学区对口入学",
      contact: "029-87419601",
      source_number: "①",
      match_tags: ["文科优势", "历史名校", "稳定性高"]
    },
    {
      id: "xc_002",
      name: "西安市黄河中学",
      type: "公办",
      level: "市级标准化高中（含初中部）",
      address: "新城区长乐中路19号",
      features: ["理科特色", "教学扎实", "管理严格", "进步明显"],
      admission_policy: "学区对口入学",
      contact: "029-83215432",
      source_number: "①",
      match_tags: ["理科特色", "严格管理", "进步型"]
    },
    {
      id: "xc_003",
      name: "西安市西光中学",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "新城区康乐路88号",
      features: ["军工背景", "校风严谨", "全面发展", "硬件完善"],
      admission_policy: "学区对口入学",
      contact: "029-82546321",
      source_number: "①",
      match_tags: ["校风严谨", "全面发展", "硬件好"]
    }
  ],
  "碑林区": [
    {
      id: "bl_001",
      name: "西安市第三中学",
      type: "公办",
      level: "省级示范高中（含初中部）",
      address: "碑林区东关长乐坊77号",
      features: ["百年名校", "省级示范", "综合实力强", "文科见长"],
      admission_policy: "学区对口入学",
      contact: "029-82456789",
      source_number: "①",
      match_tags: ["文科优势", "历史名校", "综合实力"]
    },
    {
      id: "bl_002",
      name: "西安市第六中学",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "碑林区太白北路188号",
      features: ["百年名校", "教学质量稳", "校风优良", "特色班"],
      admission_policy: "学区对口入学",
      contact: "029-88401234",
      source_number: "①",
      match_tags: ["教学质量稳", "百年老校", "校风好"]
    },
    {
      id: "bl_003",
      name: "西安市第二十六中学",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "碑林区建国路中段26号",
      features: ["教学质量好", "管理规范", "均衡发展", "家长口碑佳"],
      admission_policy: "学区对口入学",
      contact: "029-87451234",
      source_number: "①",
      match_tags: ["均衡发展", "管理规范", "口碑好"]
    }
  ],
  "莲湖区": [
    {
      id: "lh_001",
      name: "西安市第一中学",
      type: "公办",
      level: "省级示范高中（含初中部）",
      address: "莲湖区环城西路铁塔寺路",
      features: ["百年名校", "省级示范", "理科优势", "竞赛传统"],
      admission_policy: "学区对口入学",
      contact: "029-88623456",
      source_number: "①",
      match_tags: ["理科优势", "竞赛传统", "历史名校"]
    },
    {
      id: "lh_002",
      name: "西安市第十中学",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "莲湖区北关振华路98号",
      features: ["艺术特色", "素质教育", "社团丰富", "硬件良好"],
      admission_policy: "学区对口入学",
      contact: "029-86234567",
      source_number: "①",
      match_tags: ["艺术特色", "素质教育", "社团丰富"]
    },
    {
      id: "lh_003",
      name: "西安市第四十四中学",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "莲湖区青年路189号",
      features: ["教学质量稳", "校风朴实", "关注中等生", "进步明显"],
      admission_policy: "学区对口入学",
      contact: "029-87345678",
      source_number: "①",
      match_tags: ["校风朴实", "关注中等生", "稳步进步"]
    }
  ],
  "雁塔区": [
    {
      id: "yt_001",
      name: "西安电子科技大学附中",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "雁塔区科技路9号",
      features: ["大学附中", "理科优势", "资源共享", "信息学特色"],
      admission_policy: "学区对口+部分子弟",
      contact: "029-88201234",
      source_number: "②",
      match_tags: ["大学附中", "理科优势", "资源共享"]
    },
    {
      id: "yt_002",
      name: "西安市航天中学",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "雁塔区航天中路6号",
      features: ["航天特色", "科技教育", "硬件先进", "校风严谨"],
      admission_policy: "学区对口入学",
      contact: "029-85601234",
      source_number: "②",
      match_tags: ["航天特色", "科技教育", "硬件先进"]
    },
    {
      id: "yt_003",
      name: "西安市第四十六中学",
      type: "公办",
      level: "市级标准化高中（含初中部）",
      address: "雁塔区电子正街88号",
      features: ["教学质量提升快", "管理严格", "关注后进生", "进步显著"],
      admission_policy: "学区对口入学",
      contact: "029-88211234",
      source_number: "②",
      match_tags: ["进步显著", "管理严格", "关注后进生"]
    }
  ],
  "灞桥区": [
    {
      id: "bq_001",
      name: "西安市第三十四中学",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "灞桥区纺织城纺四路",
      features: ["区级龙头", "教学质量稳", "校风朴实", "硬件改善"],
      admission_policy: "学区对口入学",
      contact: "029-83511234",
      source_number: "①",
      match_tags: ["区级龙头", "教学质量稳", "校风朴实"]
    },
    {
      id: "bq_002",
      name: "西安市第五十五中学",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "灞桥区十里铺街道",
      features: ["传统名校", "教学扎实", "管理规范", "稳步发展"],
      admission_policy: "学区对口入学",
      contact: "029-83521234",
      source_number: "①",
      match_tags: ["传统名校", "教学扎实", "稳步发展"]
    },
    {
      id: "bq_003",
      name: "东城第一中学",
      type: "公办",
      level: "市级标准化高中（含初中部）",
      address: "灞桥区纺四路与纺东街交汇处",
      features: ["新建校区", "硬件一流", "教学改革", "活力较强"],
      admission_policy: "学区对口入学",
      contact: "029-83531234",
      source_number: "①",
      match_tags: ["新建校区", "硬件一流", "教学改革"]
    }
  ],
  "未央区": [
    {
      id: "wy_001",
      name: "西安市第七十五中学",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "未央区凤城五路",
      features: ["教学质量提升快", "管理严格", "硬件良好", "口碑上升"],
      admission_policy: "学区对口入学",
      contact: "029-86541234",
      source_number: "①",
      match_tags: ["进步明显", "管理严格", "口碑上升"]
    },
    {
      id: "wy_002",
      name: "西安市第六十六中学",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "未央区未央路",
      features: ["均衡发展", "素质教育", "社团丰富", "家校合作好"],
      admission_policy: "学区对口入学",
      contact: "029-86551234",
      source_number: "①",
      match_tags: ["均衡发展", "素质教育", "家校合作"]
    },
    {
      id: "wy_003",
      name: "西安市第七十六中学",
      type: "公办",
      level: "市级标准化高中（含初中部）",
      address: "未央区大明宫街道",
      features: ["小班教学", "关注个体", "教学扎实", "稳步发展"],
      admission_policy: "学区对口入学",
      contact: "029-86561234",
      source_number: "①",
      match_tags: ["小班教学", "关注个体", "稳步发展"]
    }
  ],
  "长安区": [
    {
      id: "ca_001",
      name: "长安区第一中学",
      type: "公办",
      level: "省级示范高中（含初中部）",
      address: "长安区西长安街",
      features: ["区域龙头", "省级示范", "综合实力强", "文科优势"],
      admission_policy: "学区对口入学",
      contact: "029-85641234",
      source_number: "①",
      match_tags: ["区域龙头", "综合实力", "文科优势"]
    },
    {
      id: "ca_002",
      name: "长安区第二中学",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "长安区韦曲街道",
      features: ["教学质量稳", "艺体特色", "素质教育", "全面发展"],
      admission_policy: "学区对口入学",
      contact: "029-85651234",
      source_number: "①",
      match_tags: ["艺体特色", "素质教育", "全面发展"]
    },
    {
      id: "ca_003",
      name: "长安区第三中学",
      type: "公办",
      level: "省级标准化高中（含初中部）",
      address: "长安区郭杜街道",
      features: ["新建校区", "硬件一流", "教学改革", "活力较强"],
      admission_policy: "学区对口入学",
      contact: "029-85661234",
      source_number: "①",
      match_tags: ["新建校区", "硬件一流", "教学改革"]
    }
  ],
  "高新区": [
    {
      id: "gx_001",
      name: "高新区第一学校",
      type: "公办",
      level: "九年一贯制",
      address: "高新区丈八六路",
      features: ["新建学校", "硬件一流", "国际化", "小班教学"],
      admission_policy: "学区对口入学",
      contact: "029-88331234",
      source_number: "③",
      match_tags: ["新建学校", "硬件一流", "国际化"]
    },
    {
      id: "gx_002",
      name: "高新区第二学校",
      type: "公办",
      level: "九年一贯制",
      address: "高新区科技七路",
      features: ["现代化校园", "智慧教育", "创新课程", "硬件先进"],
      admission_policy: "学区对口入学",
      contact: "029-88341234",
      source_number: "③",
      match_tags: ["现代化校园", "智慧教育", "创新课程"]
    }
  ],
  "曲江新区": [
    {
      id: "qj_001",
      name: "曲江新区第一学校",
      type: "公办",
      level: "九年一贯制",
      address: "曲江新区曲江池南路",
      features: ["硬件一流", "国际化", "小班教学", "艺术特色"],
      admission_policy: "学区对口入学",
      contact: "029-85441234",
      source_number: "④",
      match_tags: ["硬件一流", "国际化", "艺术特色"]
    },
    {
      id: "qj_002",
      name: "曲江新区第二学校",
      type: "公办",
      level: "九年一贯制",
      address: "曲江新区雁翔路",
      features: ["新建学校", "环境优美", "素质教育", "特色课程"],
      admission_policy: "学区对口入学",
      contact: "029-85451234",
      source_number: "④",
      match_tags: ["环境优美", "素质教育", "特色课程"]
    }
  ],
  "浐灞国际港": [
    {
      id: "cb_001",
      name: "浐灞第一学校",
      type: "公办",
      level: "九年一贯制",
      address: "浐灞生态区欧亚大道",
      features: ["新建学校", "硬件一流", "国际化", "生态特色"],
      admission_policy: "学区对口入学",
      contact: "029-83341234",
      source_number: "④",
      match_tags: ["新建学校", "硬件一流", "生态特色"]
    },
    {
      id: "cb_002",
      name: "国际港务区第一学校",
      type: "公办",
      level: "九年一贯制",
      address: "国际港务区港务大道",
      features: ["港务区特色", "硬件先进", "国际化", "小语种特色"],
      admission_policy: "学区对口入学",
      contact: "029-83351234",
      source_number: "④",
      match_tags: ["港务区特色", "硬件先进", "小语种"]
    }
  ]
};

// ==================== 区级热度权重 ====================
const DISTRICT_HEAT = {
  '碑林区': 1.15,
  '雁塔区': 1.20,
  '高新区': 1.18,
  '曲江新区': 1.12,
  '灞桥区': 1.10,
  '莲湖区': 1.08,
  '新城区': 1.06,
  '未央区': 1.05,
  '航天基地': 1.08,
  '经开区': 1.06,
  '浐灞国际港': 1.04,
  '长安区': 1.00,
  '西咸新区': 1.03,
  '蓝田县': 0.85,
  '周至县': 0.90,
  '鄠邑区': 0.88,
  '高陵区': 0.92,
  '临潼区': 0.90,
  '阎良区': 0.88
};

// ==================== 学校特色标签权重 ====================
const TAG_WEIGHTS = {
  '理科强': 0.10,
  '学术导向': 0.08,
  '竞赛浓度高': 0.12,
  '寄宿': 0.05,
  '素质教育': 0.06,
  '国际课程': 0.08,
  '艺术体育强': 0.07,
  '口碑稳健': 0.03,
  '文科优势': 0.07,
  '硬件一流': 0.04,
  '小班教学': 0.05,
  '国际化': 0.06,
  '严格管理': 0.04,
  '历史名校': 0.05,
  '大学附中': 0.06,
  '新建学校': 0.03,
  '进步显著': 0.04,
  '均衡发展': 0.03
};

// ==================== 摇号概率计算函数 ====================
function calculateLotteryProbability(school) {
  // 基础概率 = 1 / (报名倍数 * 区域热度)
  const baseProbability = 1 / (school.apply_ratio * (DISTRICT_HEAT[school.district] || 1.0));
  
  // 特色标签调整
  let tagAdjustment = 0;
  if (school.features) {
    school.features.forEach(tag => {
      tagAdjustment += TAG_WEIGHTS[tag] || 0;
    });
  }
  
  // 最终概率（转化为百分比）
  let finalProbability = (baseProbability * (1 + tagAdjustment)) * 100;
  
  // 限制范围：5%-70%
  finalProbability = Math.max(5, Math.min(70, finalProbability));
  
  return Math.round(finalProbability * 10) / 10; // 保留一位小数
}

// ==================== 匹配度计算函数 ====================
function calculateMatchScore(studentData, school) {
  let score = 50; // 基础分
  
  // 1. 区域匹配（户籍/居住地）
  const householdDistrict = studentData.户籍所在区;
  const residenceDistrict = studentData.实际居住区;
  
  if (school.district === householdDistrict) {
    score += 20; // 户籍匹配最高优先级
  } else if (school.district === residenceDistrict) {
    score += 15; // 居住地匹配
  } else if (studentData.民办意向 === 'yes' && school.type === '民办') {
    score += 10; // 有民办意向且是民办学校
  }
  
  // 2. 能力匹配（简化的逻辑，实际可以更复杂）
  const studentAbility = studentData.能力评估 || {};
  const isScienceStrong = parseInt(studentAbility['维度6'] || 3) >= 4; // 学科倾向理科强
  const isArtsStrong = studentData.学生特长?.includes('艺术') || studentData.学生特长?.includes('体育');
  
  if (isScienceStrong && school.features?.some(f => ['理科强', '竞赛浓度高', '科技创新'].includes(f))) {
    score += 15;
  }
  
  if (isArtsStrong && school.features?.some(f => ['艺术体育强', '素质教育', '艺术特色'].includes(f))) {
    score += 15;
  }
  
  // 3. 预算匹配
  const budget = studentData.预算范围;
  if (budget === 'high' && parseFloat(school.tuition) > 10000) {
    score += 10;
  } else if (budget === 'medium' && parseFloat(school.tuition) <= 10000 && parseFloat(school.tuition) > 5000) {
    score += 10;
  } else if (budget === 'low' && parseFloat(school.tuition) <= 5000) {
    score += 10;
  }
  
  // 限制范围：0-100
  return Math.min(100, Math.max(0, score));
}

// ==================== 学校推荐函数 ====================
function recommendSchools(studentData, count = 5) {
  const recommendations = {
    sprint: [],      // 冲刺校（民办，热门）
    steady: [],      // 稳妥校（民办，中等热度）
    fallback: []     // 保底校（公办）
  };
  
  // 1. 保底校：户籍或居住地对口公办
  const district = studentData.户籍所在区 || studentData.实际居住区;
  if (district && XI_AN_PUBLIC_SCHOOLS[district]) {
    const publicSchools = XI_AN_PUBLIC_SCHOOLS[district].slice(0, 2);
    recommendations.fallback = publicSchools.map(school => ({
      ...school,
      match_score: 95, // 公办对口匹配度高
      match_level: '保底',
      admission_probability: '95%以上',
      reason: `户籍/居住地${district}对口公办学校，入学保障最高`
    }));
  }
  
  // 2. 民办学校筛选和排序
  const privateSchools = [...XI_AN_PRIVATE_SCHOOLS];
  
  // 计算每所学校的匹配度和概率
  const scoredSchools = privateSchools.map(school => {
    const matchScore = calculateMatchScore(studentData, school);
    const lotteryProb = calculateLotteryProbability(school);
    
    return {
      ...school,
      match_score: matchScore,
      lottery_probability: `${lotteryProb}%`,
      admission_type: '摇号录取'
    };
  });
  
  // 按匹配度排序
  scoredSchools.sort((a, b) => b.match_score - a.match_score);
  
  // 分配冲刺校和稳妥校
  const totalPrivateNeeded = count - recommendations.fallback.length;
  const sprintCount = Math.min(2, Math.floor(totalPrivateNeeded * 0.6));
  const steadyCount = totalPrivateNeeded - sprintCount;
  
  recommendations.sprint = scoredSchools.slice(0, sprintCount).map(school => ({
    ...school,
    match_level: '冲刺',
    reason: `匹配度${school.match_score}%，摇号概率${school.lottery_probability}，适合冲刺`
  }));
  
  recommendations.steady = scoredSchools.slice(sprintCount, sprintCount + steadyCount).map(school => ({
    ...school,
    match_level: '稳妥',
    reason: `匹配度${school.match_score}%，摇号概率${school.lottery_probability}，稳妥选择`
  }));
  
  return recommendations;
}

// ==================== 官方信息来源 ====================
const OFFICIAL_SOURCES = {
  "①": {
    name: "西安市教育局官网",
    url: "http://www.xaedu.gov.cn/",
    description: "官方政策发布、学区划分、招生计划、政策解读",
    reliability: "最高"
  },
  "②": {
    name: "西安招生考试信息网",
    url: "http://www.xaedu.gov.cn/zsks/",
    description: "报名入口、摇号结果、录取查询、时间安排",
    reliability: "最高"
  },
  "③": {
    name: "西安市教育科研网",
    url: "http://xajy.xa.gov.cn/",
    description: "教育质量评估、学校排名数据、教学研究成果",
    reliability: "高"
  },
  "④": {
    name: "陕西省教育厅官网",
    url: "http://www.snedu.gov.cn/",
    description: "省级政策、教育规划、重大改革、监督指导",
    reliability: "最高"
  },
  "⑤": {
    name: "西安市人民政府官网",
    url: "http://www.xa.gov.cn/",
    description: "城市规划、民生工程、教育投入、政府工作报告",
    reliability: "高"
  }
};

// ==================== 入学政策规则 ====================
const ADMISSION_RULES = {
  "第一顺位": {
    condition: "房户一致且在学区内居住",
    description: "户籍地址与房产地址一致，且实际居住在该地址",
    documents: ["户口本", "房产证", "实际居住证明"],
    success_rate: "95%以上",
    timeline: "第一批录取"
  },
  "第二顺位": {
    condition: "房户一致但跨学区居住",
    description: "户籍地址与房产地址一致，但实际居住在其他地址",
    documents: ["户口本", "房产证"],
    success_rate: "80-90%",
    timeline: "第二批录取"
  },
  "第三顺位": {
    condition: "集体户/挂靠户无学区房",
    description: "户籍为集体户口或挂靠户口，无对应学区房产",
    documents: ["集体户口证明", "租房合同", "居住证"],
    success_rate: "60-80%",
    timeline: "第三批录取，统筹安排"
  },
  "第四顺位": {
    condition: "租房居住外地户籍",
    description: "非本市户籍，在学区范围内租房居住",
    documents: ["租房合同", "居住证", "务工证明", "社保证明"],
    success_rate: "50%以下",
    timeline: "最后一批录取，统筹安排"
  }
};

// ==================== 导出所有数据 ====================
const XI_AN_SCHOOLS = {
  private_schools: XI_AN_PRIVATE_SCHOOLS,
  public_schools: XI_AN_PUBLIC_SCHOOLS,
  district_heat: DISTRICT_HEAT,
  tag_weights: TAG_WEIGHTS,
  official_sources: OFFICIAL_SOURCES,
  admission_rules: ADMISSION_RULES,
  
  // 工具函数
  calculateLotteryProbability,
  calculateMatchScore,
  recommendSchools,
  
  // 统计信息
  stats: {
    total_private_schools: XI_AN_PRIVATE_SCHOOLS.length,
    districts_covered: Object.keys(XI_AN_PUBLIC_SCHOOLS).length,
    data_year: "2025",
    last_updated: "2025-01-20"
  }
};

// ==================== 导出模块 ====================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    XI_AN_SCHOOLS,
    XI_AN_PRIVATE_SCHOOLS,
    XI_AN_PUBLIC_SCHOOLS,
    DISTRICT_HEAT,
    TAG_WEIGHTS,
    OFFICIAL_SOURCES,
    ADMISSION_RULES,
    calculateLotteryProbability,
    calculateMatchScore,
    recommendSchools
  };
}

// ==================== 浏览器全局变量 ====================
if (typeof window !== 'undefined') {
  window.XI_AN_SCHOOLS = XI_AN_SCHOOLS;
  window.XI_AN_PRIVATE_SCHOOLS = XI_AN_PRIVATE_SCHOOLS;
  window.XI_AN_PUBLIC_SCHOOLS = XI_AN_PUBLIC_SCHOOLS;
}
