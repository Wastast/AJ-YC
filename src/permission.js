import router from './router';
import { getToken } from '@/utils/auth'; // 获取用户是否登录
import store from '@/store';

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // 判断用户是否登录
  const hasToken = getToken();
  let isWebscoket = store.state.bayonetPic.webscoket;
  if (!isWebscoket) {
    store.dispatch('WebSocket');
  }
  if (hasToken) {
    /* 已登录 */
    if (to.path === '/login') {
      // 如果用户已经登录 重定向到主页
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    // 判断用户访问的页面是否在白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // 不在则跳转到登录界面
      next(`/login`);
    }
  }
});
