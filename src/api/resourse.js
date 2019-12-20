import { get } from './http';

// 获取消费数据 /resourse/Travel.vue
export const getConsumption = data => get('/dwdTourTouristConsumeW/find', data);

// 获取性别数据 /resourse/Travel.vue
export const getSex = data => get('/dwdTourTouristGenderW/find', data);

// 获取年龄数据 /resourse/Travel.vue
export const getAge = data => get('/dwdTourTouristAgeW/find', data);

// 获取游客来源地
export const getTouristOrign = data => get('/dwdTourTouristFromCityW/find', data);

// 获取游客实时数据
export const getTourData = data => get('/dwdTourTouristNumberRt/find', data);

// 获取民宿数据
export const getHourse = data => get('/dwdTourHotelDataInfo', data);

// 获取民宿点位
export const getMinsu = data => get('/dimTourBasResource/findByType', data);

// 获取单个具体数据
export const getMinData = data => get('/dwdTourHotelDataInfo/getDataByResourceId', data);

// 获取近期接待人数统计
export const getNear = data => get('/dwdTourHotelDataInfo/getWeekDate', data);

// 获取总的住房人数
export const getMember = data => get('/dwdTourHotelDataInfo/allData', data);
