import { get, post } from './http'

//  报事报修 接口
export const getEvent = data => get('/dwdTourEventInfo', data)

// 乡村旅游数据接口
export const getRepair = data => get('/dwdTourTouristNumberH/find', data)

// 村情简介接口
export const getDesc = data => post('/dimTourBasResidentInfo/api/analysis', data)

// 车辆卡口数据
export const getBayonet = data => get('/tBayonetReal/find', data)

// 视频接口
export const getVideoData = data => post('/hikocx', data)

// 来源地数据
export const getOrign = data => get('/dwsTourSelfDriveTouristsFromCityD/getCityData', data)
