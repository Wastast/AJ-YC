import { get, post } from './http';

// 用户登录 /login/index.vue
export const userLogin = data => post('/user/login', data);

// 获取用户信息
export const userInfo = data => get('/user/info', data);

// 获取天气
export const weather = data => get('/weather', data);
