// data/districts/周至县.js

module.exports = {
  // 元数据
  metadata: {
    district: "周至县",
    data_year: "2025",
    last_updated: "2025-01-20",
    total_schools: 26,
    description: "周至县公办初中学校数据，依据2025年学区划分方案整理",
    source: "《周至县2025年义务教育招生入学学区划分方案》"
  },

  // 所有学校（合并民办和公办）
  schools: [],

  // 民办初中（周至县初中均为公办）
  private_schools: [],

  // 公办初中（从主文件筛选）
  public_schools: [
    {
      "id": "zz_001",
      "name": "周至县第七中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["县城核心区域", "学区覆盖广"],
      "admission_policy": "县城三门十字以东，沙河桥以西辖区；二曲街道镇东村、渭中村、渭泉村；水岸东方、公园1号等指定小区"
    },
    {
      "id": "zz_002",
      "name": "周至县二曲初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["县城西部片区", "覆盖多个行政村"],
      "admission_policy": "县城三门十字以西，侯家村以东辖区；二曲街道镇丰村、八一村、李家村、北辛头村等11个行政村"
    },
    {
      "id": "zz_003",
      "name": "周至县新区初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["县城新区", "学区范围明确"],
      "admission_policy": "县城工业路以南，环城南路以北，和平路以西，太白南路以东辖区；大寨子村"
    },
    {
      "id": "zz_004",
      "name": "周至县临川寺初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["尚村镇核心", "多所小学对口"],
      "admission_policy": "对口小学：临川寺小学、西岩村小学、新范小学、中心小学。学区：临川寺村、尚村、西岩村、新范村等12个行政村。"
    },
    {
      "id": "zz_005",
      "name": "周至县西岩坊初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["尚村镇北部片区", "对口小学多"],
      "admission_policy": "对口小学：圪塔头小学、涧里小学、马村小学、神灵寺小学、王屯小学、梁家小学、张屯小学、龚家庄小学。学区：圪塔头村、龚家庄村、马村、西岩坊村等16个行政村。"
    },
    {
      "id": "zz_006",
      "name": "周至县长杨初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["终南镇部分区域", "覆盖多个自然村"],
      "admission_policy": "对口小学：新村小学、马庞寨小学、老堡子村小学、竹园头小学。学区：禅定村、甘沟村、老堡子村、竹园头村等11个行政村。"
    },
    {
      "id": "zz_007",
      "name": "周至县西周初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["终南镇中心区域", "学区范围大"],
      "admission_policy": "对口小学：终南村小学、双明小学、东大坚小学、豆村小学、三联小学、王才屯小学。学区：大庄寨子村、东大坚村、终南村、高庙村等15个行政村。"
    },
    {
      "id": "zz_008",
      "name": "周至县永流初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["富仁镇核心", "多所小学对口"],
      "admission_policy": "对口小学：富仁小学、渭丰小学、渭兴小学、新农小学、永流小学。学区：富仁村、永丰村、渭丰村、永流村等8个行政村。"
    },
    {
      "id": "zz_009",
      "name": "周至县司竹初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["司竹镇全镇范围", "覆盖所有小学"],
      "admission_policy": "对口小学：北淇小学、南淇小学、王唐小学、中心小学。学区：阿岔村、北淇水村、北司竹村、南司竹村等21个行政村。"
    },
    {
      "id": "zz_010",
      "name": "周至县辛家寨初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["富仁镇南部片区", "对口小学多"],
      "admission_policy": "对口小学：大寨子小学、高庙小学、恒州小学、三高小学、五合小学、辛家寨中心小学。学区：蔡家村、大寨子村、高庙村、五合村等15个行政村。"
    },
    {
      "id": "zz_011",
      "name": "周至县马召初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["马召镇东部片区", "含部分山区村"],
      "admission_policy": "对口小学：金盆小学、枣林村小学、知行小学。学区：崇耕村、东火村、金盆村、枣林村、安富园小区等15个行政村/小区。"
    },
    {
      "id": "zz_012",
      "name": "周至县四群初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["马召镇西部片区", "覆盖多个自然村"],
      "admission_policy": "对口小学：富饶小学、四府营小学、纪联小学、焦家楼小学、红崖头小学、群联小学。学区：东富饶村、红崖头村、纪家村、营西村等17个行政村/自然村。"
    },
    {
      "id": "zz_013",
      "name": "周至县广济初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["广济镇全镇范围", "对口小学多"],
      "admission_policy": "对口小学：南大坪小学、南留小学、桑园小学、协里小学、永红小学、中心小学。学区：北大坪村、广济村、南大坪村、永红村等30个行政村。"
    },
    {
      "id": "zz_014",
      "name": "周至县官村初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["翠峰镇东北片区"],
      "admission_policy": "对口小学：官村小学、农林小学、陈家村小学。学区：陈家村、丁家凹村、官村、上宝玉村等8个行政村。"
    },
    {
      "id": "zz_015",
      "name": "周至县新联初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["翠峰镇西南片区"],
      "admission_policy": "对口小学：清河小学、史务小学。学区：五联村、新联村、稻峪村、史务村等8个行政村。"
    },
    {
      "id": "zz_016",
      "name": "周至县西宝初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["四屯镇西北片区"],
      "admission_policy": "对口小学：东风小学、渭滨小学、下侯小学、侯家村中心小学。学区：东风村、二龙村、来家村、下侯村等11个行政村。"
    },
    {
      "id": "zz_017",
      "name": "周至县四屯初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["四屯镇东南片区"],
      "admission_policy": "对口小学：东阳化小学、联三小学、苏村小学、中心小学。学区：北辛庄村、东阳化村、联二村、下三屯村等12个行政村。"
    },
    {
      "id": "zz_018",
      "name": "周至县哑柏初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["哑柏镇核心片区", "对口小学多"],
      "admission_policy": "对口小学：昌西小学、槐花小学、景联小学、六屯小学、五联小学、仰天小学、中心小学。学区：昌东村、槐花村、哑兴村、庄头村等13个行政村。"
    },
    {
      "id": "zz_019",
      "name": "周至县青化初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["青化镇全镇范围"],
      "admission_policy": "对口小学：联集小学、聂村小学、新白寨小学、兴隆小学、杏元小学、中心小学。学区：半个城村、青化村、聂村、兴隆村等10个行政村。"
    },
    {
      "id": "zz_020",
      "name": "周至县竹峪初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["竹峪镇全镇范围", "覆盖山区村"],
      "admission_policy": "对口小学：丹阳小学、东寨小学、兰梅塬小学、岭梅小学、育芳爱心小学。学区：苍峪村、丹阳村、兰梅塬村、西岭村、东寨村等24个行政村/自然村。"
    },
    {
      "id": "zz_021",
      "name": "周至县集贤初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["集贤镇核心区域"],
      "admission_policy": "对口小学：中心小学、六曲小学、金凤小学、殿镇小学、赵代小学。学区：北街村、大曲村、殿镇村、赵代村等13个行政村/社区。"
    },
    {
      "id": "zz_022",
      "name": "周至县九峰初级中学",
      "type": "公办",
      "level": "初级中学",
      "features": ["九峰镇全镇范围"],
      "admission_policy": "对口小学：千户小学、永丰小学、中心小学、二联小学、沙云小学、起良小学。学区：安寨村、北千户村、耿西村、永丰村、起良村等20个行政村。"
    },
    {
      "id": "zz_023",
      "name": "周至县骆峪九年制学校（初中部）",
      "type": "公办",
      "level": "九年一贯制学校",
      "features": ["山区学校", "九年一贯制"],
      "admission_policy": "对口本校小学部。学区：串草坡村、骆峪村、红旗村、黄家湾社区等13个行政村/社区。"
    },
    {
      "id": "zz_024",
      "name": "周至县楼观台九年制学校（初中部）",
      "type": "公办",
      "level": "九年一贯制学校",
      "features": ["山区学校", "覆盖多个镇", "九年一贯制"],
      "admission_policy": "对口本校小学部及楼观镇送军小学、团标小学、永合小学、上三清小学、焦镇小学。学区：陈河镇、王家河镇、板房子镇、厚畛子镇全境，以及楼观镇部分村共17个行政村。"
    },
    {
      "id": "zz_025",
      "name": "周至县鹿马九年制学校（初中部）",
      "type": "公办",
      "level": "九年一贯制学校",
      "features": ["楼观镇片区", "九年一贯制"],
      "admission_policy": "对口本校小学部及楼观镇大玉小学、东楼小学、焦镇小学、送军小学、团标小学、永合小学、上三清小学、界尚小学。学区：大玉村、东楼村、鹿马村、西楼村等26个行政村。"
    },
    {
      "id": "zz_026",
      "name": "周至县哑柏新区九年制学校（初中部）",
      "type": "公办",
      "level": "九年一贯制学校",
      "features": ["新区学校", "九年一贯制"],
      "admission_policy": "对口本校小学部。学区：哑柏新区、裕盛村、联星村。"
    }
  ],

  // 辖区统计
  statistics: {
    total_private: 0,
    total_public: 26,
    avg_tuition_private: 0,
    avg_lottery_rate: 0,
    hot_schools: ["周至县第七中学", "周至县二曲初级中学", "周至县新区初级中学"]
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
        ...this.public_schools.filter(s => s.id === "zz_001"), // 第七中学
        ...this.public_schools.filter(s => s.id === "zz_002"), // 二曲中学
        ...this.public_schools.filter(s => s.id === "zz_003")  // 新区中学
      ].slice(0, limit);
    },

    // 根据镇/街道名称筛选学校 (周至县特有)
    filterByTown(townName) {
      const keyword = townName.includes('镇') ? townName : townName + '镇';
      return this.public_schools.filter(school => 
        school.admission_policy.includes(keyword) || 
        school.name.includes(keyword)
      );
    },

    // 获取所有九年一贯制学校
    getNineYearSchools() {
      return this.public_schools.filter(s => s.level.includes('九年一贯制'));
    }
  }
};
