// 工具函数
async function requestWithRetry(url, options) {
    const { retries = 1, timeoutMs = 10000, ...fetchOptions } = options;
    for (let i = 0; i < retries; i++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
            const response = await fetch(url, { ...fetchOptions, signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
        }
    }
}

function pickRecommendations(schoolList = [], familyInfo = {}) {
    const sprint = schoolList.find(s => s.heat >= 4) || schoolList[0] || { name: '高新一中', district: '高新' };
    const steady = schoolList.find(s => s.heat === 3) || schoolList[1] || { name: '铁一中分校', district: '碑林' };
    const fallback = { name: `您所在区的公办学校`, district: familyInfo.residenceDistrict || '居住区' };
    return [sprint, steady, fallback];
}

module.exports = { requestWithRetry, pickRecommendations };
