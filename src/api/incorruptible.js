import { get, post } from './http'

// 查询文明实践信息
export const getPracticeInfo = data => get('/dwdTourCivilizedPracticeInfo', data)

// 查询志愿活动信息
export const getActivity = data => get('/dwdTourVolunteerActivityInfo', data)

// 财务公开
export const getEconomics = data => post('/threeServices/getNode', data)

// 请求财务报表
export const getBaobiao = data => post('/threeServices/getNodeContents', data)
