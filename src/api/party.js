import { get } from './http'

// 党建心连心接口  /party/heart.vue
export const getHeart = data => get('/dwdTourPartyBuildingInfo', data)

// 村集体经济收入  /party/zhanshi.vue
export const getCollective = data => get('/dwsTourCollectiveIncomeY', data)

// 村个人经济收入 /party/zhanshi.vue
export const getAverage = data => get('/dwsTourAvgPerCapitaIncomeY', data)
