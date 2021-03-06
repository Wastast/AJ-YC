import { get, post } from './http';

// 获取地图全部点位
export const getAllPoint = data => get('/dimTourBasResource/findAll', data);

// 获取地图类型点位
export const getTypePoint = data => get('/dimTourBasResource/findByType', data);

// 请求绘制房屋
export const getHouse = data => post('/dimTourBasBuildInfo/findByListWithHostYh', data);

// 获取资源类型
export const getResourseType = data => get('/dimTourBasResourceType/findAll', data);

// 获取首页资源点位
export const getShouye = data => get('/dimTourBasResource/findImportant', data);

// 获取监控烟感点位
export const getVideoSmoke = data => get('/dimTourBasResource/findVideo', data);

// 获取五星之家，党员点位
export const getFire = data => get('/dimTourBasResource/findFamily', data);

// 获取天地图的余村范围
export const getYuRagne = data => get('/dimTourBasArea/findAll', data);

// 获取今日志愿活动点位
export const getDaypoint = data => get('/dwdTourVolunteerTdayResource/getTdayActivityInfo', data);
