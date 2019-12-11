import { initPlugin, initVideo, videoPlay, uninit, Resize } from '@/utils/playVideo';

// 注册全局视频播放指令
const VideoPlay = {
  // 指令绑定到 DOM 元素上时触发
  async inserted(el, binding, vnode) {
    let { code, layout } = binding.value;
    let height = getComputedStyle(el).height.split('px')[0];
    let width = getComputedStyle(el).width.split('px')[0];
    let html = `<div id="playWnd" style="width: 100%;height: 100%;"></div>`;
    el.innerHTML = html;
    // await initPlugin({
    //   width,
    //   height
    // });
    // await initVideo({
    //   layout
    // });
    // code.forEach((e, index) => {
    //   videoPlay(String(e), index + 1);
    // });
  },
  bind(el, binding, vnode) {
    // let handler = () => {
    //   let height = getComputedStyle(el).height.split('px')[0];
    //   let width = getComputedStyle(el).width.split('px')[0];
    //   Resize({
    //     height,
    //     width
    //   });
    // };
    // el.handler = handler;
    // document.addEventListener('resize', el.handler);
  },
  async unbind(el, binding, vnode) {
    await uninit();
    el.innerHTML = '';
    // document.removeEventListener('resize', el.handler);
  }
};

export default {
  VideoPlay
};
