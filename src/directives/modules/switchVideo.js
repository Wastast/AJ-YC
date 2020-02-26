// 实时通话左右点击事件
const switchVideo = {
  inserted(el, binding, vnode) {
    el.children[0].classList.add('video-ischecked');
    let handler = e => {
      // 当用户点击桌面时触发
      if (el.contains(e.target)) {
        let elList = Array.from(el.children);
        let nowEl = null;
        elList.forEach(item => {
          item.classList.remove('video-ischecked');
          if (item.contains(e.target)) {
            nowEl = item;
          }
        });
        nowEl.classList.add('video-ischecked');
      }
    };
    el.handler = handler;
    window.addEventListener('click', el.handler);
  },
  unbind(el, binding, vnode) {
    window.removeEventListener('click', el.handler);
  }
};

export default { switchVideo };
