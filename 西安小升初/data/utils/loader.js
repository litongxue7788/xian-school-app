// data/utils/loader.js

const mainData = require('../schools.js');
const districtManager = require('../districts/index.js');

class DataLoader {
  constructor() {
    this.mainData = mainData;
  }

  // 1. 获取主数据（向后兼容）
  getMainData() {
    return {
      private: this.mainData.XI_AN_PRIVATE_SCHOOLS,
      public: this.mainData.XI_AN_PUBLIC_SCHOOLS,
      heat: this.mainData.DISTRICT_HEAT,
      all: this.mainData.XI_AN_SCHOOLS
    };
  }

  // 2. 获取辖区数据
  getDistrictData(districtName, options = {}) {
    const { includePrivate = true, includePublic = true } = options;
    
    const districtData = districtManager.getDistrict(districtName);
    const result = { ...districtData };
    
    // 过滤选项
    if (!includePrivate) delete result.private_schools;
    if (!includePublic) delete result.public_schools;
    
    return result;
  }

  // 3. 智能获取：优先辖区文件，后退到主文件
  getSmartData(districtName) {
    // 先尝试辖区文件
    if (districtManager.hasDistrict(districtName)) {
      return districtManager.getDistrict(districtName);
    }
    
    // 后退到主文件筛选
    return {
      metadata: {
        district: districtName,
        source: "主文件筛选",
        warning: "该辖区暂无独立数据文件"
      },
      private_schools: this.mainData.XI_AN_PRIVATE_SCHOOLS
        .filter(s => s.district === districtName),
      public_schools: this.mainData.XI_AN_PUBLIC_SCHOOLS[districtName] || []
    };
  }

  // 4. 批量获取
  getBatchData(districtNames) {
    return districtNames.map(name => this.getSmartData(name));
  }

  // 5. 搜索功能
  search(keyword, options = {}) {
    const { district, type } = options;
    
    if (district) {
      // 指定辖区搜索
      const data = this.getSmartData(district);
      return this._searchInData(data, keyword, type);
    } else {
      // 全区搜索
      return this._searchInMainFile(keyword, type);
    }
  }

  _searchInData(data, keyword, type) {
    let schools = [];
    
    if (!type || type === '民办') {
      schools = schools.concat(data.private_schools || []);
    }
    if (!type || type === '公办') {
      schools = schools.concat(data.public_schools || []);
    }
    
    return schools.filter(school => 
      school.name.includes(keyword) ||
      school.features?.some(f => f.includes(keyword))
    );
  }

  _searchInMainFile(keyword, type) {
    let results = [];
    
    if (!type || type === '民办') {
      results = results.concat(
        this.mainData.XI_AN_PRIVATE_SCHOOLS.filter(s => 
          s.name.includes(keyword) ||
          s.features?.some(f => f.includes(keyword))
        )
      );
    }
    
    if (!type || type === '公办') {
      for (const district in this.mainData.XI_AN_PUBLIC_SCHOOLS) {
        const districtSchools = this.mainData.XI_AN_PUBLIC_SCHOOLS[district];
        results = results.concat(
          districtSchools.filter(s => 
            s.name.includes(keyword) ||
            s.features?.some(f => f.includes(keyword))
          )
        );
      }
    }
    
    return results;
  }
}

// 导出单例
module.exports = new DataLoader();
