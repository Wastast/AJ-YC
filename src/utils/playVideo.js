import { TipsPop } from '@/utils/el_ui';
let oWebControl;
let pubKey;
let initCount;
// 初始化插件
export const initPlugin = dom => {
  return new Promise((resolve, reject) => {
    oWebControl = new WebControl({
      szPluginContainer: 'playWnd',
      iServicePortStart: 15900,
      iServicePortEnd: 15909,
      szClassId: '23BF3B0A-2C56-4D97-9C03-0CB103AA8F11', // 用于IE10使用ActiveX的clsid
      cbConnectSuccess: function() {
        oWebControl
          .JS_StartService('window', {
            dllPath: './VideoPluginConnect.dll'
          })
          .then(
            () => {
              oWebControl
                .JS_CreateWnd('playWnd', dom.width, dom.height)
                .then(() => {
                  initCount = 0;
                  resolve();
                })
                .catch(() => {
                  reject(new Error());
                });
            },
            function() {}
          );
      },
      cbConnectError() {
        oWebControl = null;
        TipsPop({
          message: '插件未启动，正在尝试启动，请稍候...',
          type: 'info'
        });

        WebControl.JS_WakeUp('VideoWebPlugin://');
        initCount++;
        if (initCount < 3) {
          setTimeout(() => {
            initPlugin();
          }, 3000);
        } else {
          TipsPop({
            message: '插件启动失败，请检查插件是否安装！',
            type: 'error'
          });
        }
      },
      cbConnectClose(bNormalClose) {
        // 异常断开：bNormalClose = false
        // JS_Disconnect正常断开：bNormalClose = true
        console.log('cbConnectClose');
        oWebControl = null;
      }
    });
  });
};

// 获取公钥
function getPubKey(callback) {
  oWebControl
    .JS_RequestInterface({
      funcName: 'getRSAPubKey',
      argument: JSON.stringify({
        keyLength: 1024
      })
    })
    .then(oData => {
      if (oData.responseMsg.data) {
        pubKey = oData.responseMsg.data;
        callback();
      }
    });
}

// RSA加密
function setEncrypt(value) {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(pubKey);
  return encrypt.encrypt(value);
}

// 初始化视频
export const initVideo = video => {
  return new Promise((resolve, reject) => {
    getPubKey(function() {
      let secret = setEncrypt('X6MsjtYLrFhq61TqCPep');
      let { layout } = video;
      let obj = {
        appkey: '22754861',
        secret: secret,
        ip: '33.155.236.92',
        playMode: 0, // 预览
        port: 443, // 端口
        snapDir: 'D:SnapDir', // 抓图存储路径
        videoDir: 'D:VideoDir', // 录像存储路径
        layout: layout, // 布局
        enableHTTPS: 1,
        showToolbar: 1,
        showSmart: 1,
        buttonIDs: '0,16,256,257,258,259,260,512,513,514,515,516,517,768,769',
        encryptedFields: 'secret'
      };
      oWebControl
        .JS_RequestInterface({
          funcName: 'init',
          argument: JSON.stringify(obj)
        })
        .then(oData => {
          resolve();
        })
        .catch(() => {
          reject(new Error());
        });
    });
  });
};

// 播放视频
export const videoPlay = (code, wnd) => {
  return new Promise((resolve, reject) => {
    if (!code && typeof code === 'string') {
      code = '33052358001320515288';
    }
    let cameraIndexCode = code;
    let obj = {
      cameraIndexCode,
      streamMode: 0,
      transMode: 1,
      gpuMode: 0,
      wndId: wnd
    };
    oWebControl
      .JS_RequestInterface({
        funcName: 'startPreview',
        argument: JSON.stringify(obj)
      })
      .then(data => {
        if (data.responseMsg.code === 0) {
          console.log('成功');
          TipsPop({
            message: '视频初始化成功'
          });
        } else {
          TipsPop({
            message: data.responseMsg.msg,
            type: 'error'
          });
        }
        resolve();
      });
  });
};

// 改变控件窗口大小
export const Resize = dom => {
  oWebControl.JS_Resize(dom.width, dom.height);
};
export const uninit = () => {
  return new Promise((resolve, reject) => {
    oWebControl
      .JS_RequestInterface({
        funcName: 'uninit'
      })
      .then(data => {
        oWebControl.JS_CuttingPartWindow(0, 0, 0, 0);
        resolve(data);
      });
  });
};
