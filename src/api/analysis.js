import { get, post } from './http';

//  报事报修 接口
export const getEvent = data => get('/dwdTourEventInfo', data);

// 乡村旅游数据接口
export const getRepair = data => get('/dwdTourTouristNumberH/find', data);

// 村情简介接口
export const getDesc = data => post('/dimTourBasResidentInfo/api/analysis', data);

// 车辆卡口数据
export const getBayonet = data => get('/tBayonetReal/find', data);

// 来源地数据
export const getOrign = data => get('/dwsTourSelfDriveTouristsFromCityD/getCityData', data);

// 获取图片资源
export const getPicUrl = data => get('/dwdTourEventInfo/getImg', data);

// 环境数据接口
export const getEnvironmental = data => get('/dwsTourWeatherMonitorRt', data);

// 获取环境下属数据接口
export const getEsunValue = data => get('/dwsTourWeatherMonitorH/weatherHistory', data);

// 获取年龄
export const getAge = data => post('/dimTourBasResidentInfo/api/analysisAge', data);

// 获取性别人群画像
export const getSex = data => post('/dimTourBasResidentInfo/api/analysisSex', data);

// 获取视频url
export const getVideoUrl = data => get('/dimTourDevcVideoSurveillance/findByResourceId', data);
