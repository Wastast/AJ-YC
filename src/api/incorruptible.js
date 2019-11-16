import { get, post } from './http'

// 查询文明实践信息
export const getPracticeInfo = data => get('/dwdTourCivilizedPracticeInfo', data)

// 查询志愿活动
export const getActivity = data => get('/dwdTourVolunteerActivityInfo', data)

// 请求三务公开id
export const getEconomics = data => post('/threeServices/getNode', data)

// 获取三务公开公开数据
export const getOpenValue = data => post('/threeServices/getNodeContents', data)

// 查询乡贤调解
export const getMediate = data => get('/dwdTourVillagersMediationInfo', data)

// 查询志愿信息
export const getVolunteer = data => get('/dwdTourVolunteerOrganizationInfo', data)

// 获取志愿者队伍信息
export const getTeam = data => get('/dwdTourVolunteerTeamInfo', data)

// 获取单个志愿者队伍信息
export const getFloatTeam = data => get('/dwdTourVolunteerOrganizationInfo/findListByTeamNo', data)
