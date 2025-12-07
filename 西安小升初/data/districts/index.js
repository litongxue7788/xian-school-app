// data/districts/index.js

const DISTRICT_FILES = {
  '碑林区': require('./碑林区.js'),
  '雁塔区': require('./雁塔区.js'),
  '高新区': require('./高新区.js'),
  '新城区': require('./新城区.js'),
  '莲湖区': require('./莲湖区.js'),
  '灞桥区': require('./灞桥区.js'),
  '未央区': require('./未央区.js'),
  '长安区': require('./长安区.js'),
  '曲江新区': require('./曲江新区.js'),
  '浐灞国际港': require('./浐灞国际港.js'),
  '航天基地': require('./航天基地.js'),
  '西咸新区': require('./西咸新区.js'),
  '鄠邑区': require('./鄠邑区.js'),
  '经开区': require('./经开区.js'),
  '阎良区': require('./阎良区.js'),
  '临潼区': require('./临潼区.js'),
  '高陵区': require('./高陵区.js'),
  '蓝田县': require('./蓝田县.js'),
  '周至县': require('./周至县.js')
};

class DistrictManager {
  constructor() {
    this.cache = new Map();
    this.availableDistricts = Object.keys(DISTRICT_FILES);
  }

  // 获取辖区数据
  getDistrict(districtName) {
    // 缓存检查
    if (this.cache.has(districtName)) {
      return this.cache.get(districtName);
    }

    // 文件存在性检查
    if (!DISTRICT_FILES[districtName]) {
      console.warn(`辖区 ${districtName} 数据文件不存在`);
      return this.getEmptyDistrictData(districtName);
    }

    try {
      const data = DISTRICT_FILES[districtName];
      this.cache.set(districtName, data);
      return data;
    } catch (error) {
      console.error(`加载辖区 ${districtName} 数据失败:`, error);
      return this.getEmptyDistrictData(districtName);
    }
  }

  // 获取多个辖区
  getDistricts(districtNames) {
    return districtNames.map(name => this.getDistrict(name));
  }

  // 获取所有辖区信息
  getAllDistricts() {
    return this.availableDistricts.map(name => ({
      name,
      hasData: !!DISTRICT_FILES[name],
      ...(DISTRICT_FILES[name]?.metadata || {})
    }));
  }

  // 检查辖区是否存在
  hasDistrict(districtName) {
    return this.availableDistricts.includes(districtName);
  }

  // 空数据模板
  getEmptyDistrictData(districtName) {
    return {
      metadata: {
        district: districtName,
        data_year: "2025",
        last_updated: new Date().toISOString().split('T')[0],
        total_schools: 0,
        source: "主文件筛选"
      },
      schools: [],
      private_schools: [],
      public_schools: []
    };
  }

  // 搜索所有辖区
  searchAllDistricts(keyword) {
    const results = [];
    
    for (const districtName of this.availableDistricts) {
      const data = this.getDistrict(districtName);
      
      // 搜索学校
      const schoolResults = [
        ...(data.private_schools || []),
        ...(data.public_schools || []),
        ...(data.schools || [])
      ].filter(school => {
        return school.name.includes(keyword) || 
               school.full_name?.includes(keyword) ||
               school.features?.some(f => f.includes(keyword));
      });
      
      if (schoolResults.length > 0) {
        results.push({
          district: districtName,
          schools: schoolResults
        });
      }
    }
    
    return results;
  }
}

// 导出单例
module.exports = new DistrictManager();
