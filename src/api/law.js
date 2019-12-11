import { get } from './http';

// 请求每周办件量情况
export const getonWeek = data => get('/dwdTourEventCountDInfo/find', data);

// 请求满意度调查数据
export const getSatisfied = data => get('/dwdTourSatisfactionDegreeInfo/find', data);

// 政府办事事项
export const getGovernment = data => get('/dwdTourEventTypeCountInfo/find', data);

// 高频事项代办数量
export const getFrequency = data => get('/dwdTourEventAgencyInfo/find', data);

// 高频事项代办数量
export const getHome = data => get('/dwdTourHomeGuardAreaInfo/findArea', data);
