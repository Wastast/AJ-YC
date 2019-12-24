import { initPlugin, initVideo, videoPlay, uninit, Resize } from '@/utils/playVideo';
import { getVideoUrl } from '@/api/analysis';
import { TipsPop } from '@/utils/el_ui';

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
    }
  },
  unbind(el, binding, vnode) {
    el.ondblclick = null;
  }
};
export default {
  VideoPlay
};
