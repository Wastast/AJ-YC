import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 将页面中的路由都进行集成
export const constantRoutes = [
  // 采用路由懒加载方式
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('../views/login'),
    meta: { title: '登录' }
  },
  // 404页面需要放到最末尾,先行注册404界面,否则无法指向404界面会报错
  {
    path: '/404',
    name: 'page404',
    hidden: true,
    component: () => import('../views/404'),
    meta: { title: '404' }
  },
  {
    path: '/',
    name: 'analysis',
    component: () => import('../views/analysis'),
    meta: { title: 'analysis' }
  },
  {
    path: '/party',
    name: 'party',
    component: () => import('../views/party'),
    meta: { title: 'party' }
  },
  {
    path: '/resourse',
    name: 'resourse',
    component: () => import('../views/resourse'),
    meta: { title: 'resourse' }
  },
  {
    path: '/law',
    name: 'law',
    component: () => import('../views/law'),
    meta: { title: 'law' }
  },
  {
    path: '/Incorruptible',
    name: 'Incorruptible',
    component: () => import('../views/Incorruptible'),
    meta: { title: 'Incorruptible' }
  },
  // 指向页面错误跳转到404
  { path: '*', redirect: '/404', hidden: true }
];

// 创建一个vue-router 并且每次切换页面都调整滚动条的高度,并且存入固定路由界面
const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

// 重置路由
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

const router = createRouter();
export default router;
