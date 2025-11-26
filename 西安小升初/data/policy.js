// 政策全文（已存在的POLICY_DATA保留）
if (typeof POLICY_DATA === 'undefined') {
  var POLICY_DATA = '';
}

// 条款级引用索引（示例关键条款，便于匹配与展示条款ID）
var POLICY_INDEX = [
  { id: 'C-ENROLL-01', title: '报名时间', keywords: ['报名','7月11','7月24','网上报名'] },
  { id: 'C-LOTTERY-01', title: '摇号安排', keywords: ['摇号','随机录取','7月30','电脑随机'] },
  { id: 'C-NOEXAM-01', title: '免试就近入学', keywords: ['免试','就近','公办','学区划片'] },
  { id: 'C-TONGZHAO-01', title: '公民同招', keywords: ['公民同招','民办','同步报名','同步招生'] },
  { id: 'C-PLATFORM-01', title: '统一招生平台', keywords: ['招生平台','入学一件事','平台','统一使用'] },
  { id: 'C-PRIVATE-SCALE-01', title: '民办招生规模', keywords: ['民办','28所','12361','招生计划'] },
  { id: 'C-XIANYANG-01', title: '西咸纳入城六区政策', keywords: ['西咸','城六区','统一招生','纳入'] }
];
