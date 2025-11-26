const SCHOOLS_DATA = [
    { name: '西安翱翔中学', district: '碑林区', classes: 16, quota: 800, directPromotion: 114, tags: ['学术导向'], heat: 3, apply_ratio: 1.5 },
    { name: '西安辅轮中学', district: '碑林区', classes: 20, quota: 1000, directPromotion: 0, tags: ['口碑稳健'], heat: 3, apply_ratio: 1.3 },
    { name: '西安电子科技中学', district: '雁塔区', classes: 6, quota: 300, directPromotion: 42, tags: ['理科强','学术导向','竞赛浓度高'], heat: 4, apply_ratio: 2.2 },
    { name: '西安太白学校', district: '雁塔区', classes: 10, quota: 500, directPromotion: 53, tags: ['素质教育'], heat: 3, apply_ratio: 1.4 },
    { name: '西安雁南中学', district: '雁塔区', classes: 6, quota: 300, directPromotion: 208, tags: [], heat: 3, apply_ratio: 1.4 },
    { name: '西安藤信学校', district: '雁塔区', classes: 6, quota: 300, directPromotion: 0, tags: [], heat: 3, apply_ratio: 1.4 },
    { name: '西安崇是中学', district: '雁塔区', classes: 8, quota: 400, directPromotion: 6, tags: [], heat: 3, apply_ratio: 1.4 },
    { name: '西安高新唐南中学', district: '雁塔区', classes: 8, quota: 400, directPromotion: 0, tags: ['学术导向','口碑稳健'], heat: 4, apply_ratio: 1.8 },
    { name: '西安滨河学校', district: '灞桥区', classes: 30, quota: 1200, directPromotion: 189, tags: ['素质教育','艺术体育强'], heat: 4, apply_ratio: 1.6 },
    { name: '西安凤凰城初级中学', district: '未央区', classes: 12, quota: 600, directPromotion: 520, tags: [], heat: 3, apply_ratio: 1.3 },
    { name: '西安锦园中学', district: '未央区', classes: 6, quota: 300, directPromotion: 285, tags: ['口碑稳健','素质教育'], heat: 4, apply_ratio: 1.7 },
    { name: '西安西京初级中学', district: '长安区', classes: 8, quota: 350, directPromotion: 176, tags: [], heat: 3, apply_ratio: 1.3 },
    { name: '西安万科城初级中学', district: '长安区', classes: 12, quota: 600, directPromotion: 361, tags: [], heat: 3, apply_ratio: 1.3 },
    { name: '西安湖滨中学', district: '长安区', classes: 14, quota: 700, directPromotion: 347, tags: [], heat: 3, apply_ratio: 1.3 },
    { name: '蓝田县向阳学校', district: '蓝田县', classes: 4, quota: 190, directPromotion: 0, tags: [], heat: 3, apply_ratio: 1.2 },
    { name: '蓝田县北关实验学校', district: '蓝田县', classes: 14, quota: 650, directPromotion: 0, tags: [], heat: 3, apply_ratio: 1.2 },
    { name: '周至县育英学校', district: '周至县', classes: 2, quota: 60, directPromotion: 0, tags: [], heat: 3, apply_ratio: 1.2 },
    { name: '周至县实验中学', district: '周至县', classes: 2, quota: 80, directPromotion: 0, tags: [], heat: 3, apply_ratio: 1.2 },
    { name: '周至铸才初级中学', district: '周至县', classes: 2, quota: 100, directPromotion: 0, tags: [], heat: 3, apply_ratio: 1.2 },
    { name: '西安西港花园学校', district: '浐灞国际港', classes: 6, quota: 300, directPromotion: 68, tags: [], heat: 3, apply_ratio: 1.3 },
    { name: '西安博迪学校', district: '高新区', classes: 4, quota: 200, directPromotion: 0, tags: [], heat: 3, apply_ratio: 1.4 },
    { name: '西安高新东区初级中学', district: '高新区', classes: 8, quota: 400, directPromotion: 166, tags: [], heat: 3, apply_ratio: 1.5 },
    { name: '西安博爱学校', district: '经开区', classes: 8, quota: 400, directPromotion: 0, tags: [], heat: 3, apply_ratio: 1.3 },
    { name: '西安曲江康桥学校', district: '曲江新区', classes: 8, quota: 256, directPromotion: 5, tags: ['素质教育'], heat: 3, apply_ratio: 1.5 },
    { name: '西安曲江德闳学校', district: '曲江新区', classes: 3, quota: 75, directPromotion: 1, tags: ['国际课程'], heat: 3, apply_ratio: 1.6 },
    { name: '西安航天菁英学校', district: '航天基地', classes: 18, quota: 900, directPromotion: 75, tags: [], heat: 3, apply_ratio: 1.4 },
    { name: '西咸泾河泾华学校', district: '西咸新区', classes: 7, quota: 330, directPromotion: 0, tags: [] },
    { name: '西咸新区黄冈泾河学校', district: '西咸新区', classes: 14, quota: 670, directPromotion: 234, tags: [] }
]; 

// 区级热度加权（报名强度系数），1为基准；>1表示更热，<1表示相对冷
const DISTRICT_HEAT = {
  '碑林区': 1.15,
  '雁塔区': 1.20,
  '灞桥区': 1.10,
  '未央区': 1.05,
  '长安区': 1.00,
  '曲江新区': 1.12,
  '航天基地': 1.08,
  '经开区': 1.06,
  '高新区': 1.18,
  '浐灞国际港': 1.04,
  '蓝田县': 0.85,
  '周至县': 0.90,
  '西咸新区': 1.03
};

// 学校特色标签字典与对报名需求的影响权重（正为增加需求，负为减少），用于细化概率
const TAG_WEIGHTS = {
  '理科强': 0.10,
  '学术导向': 0.08,
  '竞赛浓度高': 0.12,
  '寄宿': 0.05,
  '素质教育': 0.06,
  '国际课程': 0.08,
  '艺术体育强': 0.07,
  '口碑稳健': 0.03
};

// 学校与特色标签映射（示例，后续可继续补充）
const SCHOOL_FEATURES = {
  '西安电子科技中学': ['理科强','学术导向','竞赛浓度高'],
  '西安高新唐南中学': ['学术导向','口碑稳健'],
  '西安滨河学校': ['素质教育','艺术体育强'],
  '西安锦园中学': ['口碑稳健','素质教育'],
  '西安太白学校': ['素质教育'],
  '西安翱翔中学': ['学术导向'],
  '西安辅轮中学': ['口碑稳健']
};

// 历年报名倍率（示例：报名人数/可摇号名额），用于校准需求强度
const APPLY_RATIO = {
  '西安电子科技中学': 2.2,
  '西安高新唐南中学': 1.8,
  '西安滨河学校': 1.6,
  '西安锦园中学': 1.7,
  '西安太白学校': 1.4,
  '西安翱翔中学': 1.5,
  '西安辅轮中学': 1.3
};
