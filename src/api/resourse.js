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
