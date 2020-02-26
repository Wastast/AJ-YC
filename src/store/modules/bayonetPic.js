const state = {
  webscoket: null,
  picList: []
};

const mutations = {
  // 设置token
  SET_PIC(context, data) {
    let length = context.picList.length;
    let obj = {
      imgUrl: data
    };
    if (length === 2) {
      context.picList.pop();
    }
    context.picList.unshift(obj);
  }
};

const actions = {
  // 连接webscoket并断开
  async WebSocket(context) {
    if (context.state.webscoket !== null) {
      return;
    }
    context.state.webscoket = new WebSocket(
      'ws://123.153.6.42:8088/v2/subscription/analyseResults?chns=0,1,3&fullPicture=true'
    );
    // 打开连接
    context.state.webscoket.onopen = () => {
      console.log('卡口拍摄连接');
    };
    // 连接发生错误的回调方法
    context.state.webscoket.onerror = () => {
      console.log('卡口拍摄断开');
    };
    // 推送服务后返回
    context.state.webscoket.onmessage = e => {
      let data = e.data; // 收到的数据
      let readeron = new FileReader();
      // 解析内容
      readeron.readAsArrayBuffer(data);
      // 解析开始
      readeron.onload = event => {
        let resultarr = event.target.result;
        var x1 = new Uint8Array(resultarr);
        var curlen = x1[0] * 16777216 + x1[1] * 65536 + x1[2] * 256 + x1[3];
        let header = x1.slice(4, curlen + 4);
        var content = '';
        header.forEach(v => (content += String.fromCharCode(v)));
        let contentjson = JSON.parse(content);

        let ResultLen = contentjson.ResultLen - 0;
        let ObjPictureLen = contentjson.ObjPictureLen - 0;
        let startPos = curlen + 4;

        // 检测小图片部分数据
        startPos += ResultLen;
        let Picture = data.slice(startPos, startPos + ObjPictureLen);
        let blob = new Blob([Picture], { type: 'image/jpeg' });

        let readerPic = new FileReader();
        readerPic.readAsDataURL(blob); // 解析图片数据，转换成base64数据格式
        readerPic.onload = pic => {
          context.commit('SET_PIC', pic.target.result);
        };
      };
    };
  }
};

export default {
  state,
  mutations,
  actions
};
