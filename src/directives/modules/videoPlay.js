import { initPlugin, initVideo, videoPlay, uninit, Resize } from '@/utils/playVideo';
import { getVideoUrl } from '@/api/analysis';
import { TipsPop } from '@/utils/el_ui';

// const VideoPlay = {
//   // 指令绑定到 DOM 元素上时触发
//   async inserted(el, binding, vnode) {
//     // let { code, layout } = binding.value;
//     // let height = getComputedStyle(el).height.split('px')[0];
//     // let width = getComputedStyle(el).width.split('px')[0];
//     // let html = `<div id="playWnd" style="width: 100%;height: 100%;"></div>`;
//     // el.innerHTML = html;
//     // await initPlugin({
//     //   width,
//     //   height
//     // });
//     // await initVideo({
//     //   layout
//     // });
//     // code.forEach((e, index) => {
//     //   videoPlay(String(e), index + 1);
//     // });
//   },
//   bind(el, binding, vnode) {
//     // let handler = () => {
//     //   let height = getComputedStyle(el).height.split('px')[0];
//     //   let width = getComputedStyle(el).width.split('px')[0];
//     //   Resize({
//     //     height,
//     //     width
//     //   });
//     // };
//     // el.handler = handler;
//     // document.addEventListener('resize', el.handler);
//   },
//   async unbind(el, binding, vnode) {
//     // await uninit();
//     // el.innerHTML = '';
//     // document.removeEventListener('resize', el.handler);
//   }
// };

// 注册全局视频播放指令
const VideoPlay = {
  async inserted(el, binding, vnode) {
    if (!binding.value) {
      return;
    }
    el.click();
    let id = binding.value;
    let data = await getVideoUrl({ id });
    let url = data.code === 200 ? data.data : '';
    let video = el;
    let hls = new Hls();
    let hlssource = url;
    if (hlssource) {
      hls.loadSource(hlssource);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
        el.ondblclick = () => {
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
          } else if (video.webkitRequestFullScreen) {
            video.webkitRequestFullScreen();
          }
        };
      });
    } else {
      TipsPop({
        message: '该监控暂时无法查看...',
        type: 'error'
      });
    }
  },
  unbind(el, binding, vnode) {
    el.ondblclick = null;
  }
};
export default {
  VideoPlay
};
