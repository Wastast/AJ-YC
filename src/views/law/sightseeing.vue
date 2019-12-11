<template>
  <div class="sightseeing">
    <party-box title="公共区域" width="592" height="400">
      <template slot="content">
        <div class="video-box" v-video-play="video"></div>
      </template>
    </party-box>
    <!-- <el-dialog
      :modal="false"
      title="提示"
      @opened="getVideo"
      :destroy-on-close="true"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div style="height: 500px;">
        <object
          classid="CLSID:7E393848-7238-4CE3-82EE-44AF444B240A"
          wmode="opaque"
          id="PlayViewOCX"
          style="width:100%;height:100%;"
        ></object>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { TipsPop } from '@/utils/el_ui';
import { getVideoData } from '@/api/analysis';
export default {
  name: 'sightseeing',
  data() {
    return {
      value: '',
      imgRep: req.slice(0, -3),
      videoValue: 'ReqType:PlayReal;wndcount:1',
      dialogVisible: false,
      videoCode: null,
      video: {
        layout: '2x2',
        code: [
          '33052358001320515288',
          '33052358001320515288',
          '33052358001320515288',
          '33052358001320515288'
        ]
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 弹出视频
    popVideo(type) {
      this.videoCode = type;
      // 这里弹出
      this.dialogVisible = true;
    },
    play_ocx_do(param) {
      let OCXobj = document.getElementById('PlayViewOCX');
      OCXobj.ContainOCX_Do(param);
    },
    // 初始化
    init() {
      return new Promise((resolve, reject) => {
        let OCXobj = document.getElementById('PlayViewOCX');
        let txtInit = this.videoValue;
        OCXobj.ContainOCX_Init(txtInit);
        resolve();
      });
    },
    // 获取视频
    getVideo() {
      getVideoData({
        indexcode: this.videoCode
      }).then(data => {
        let { CamList, appSecret, appkey, time, timeSecret } = data;
        // hikvideoclient://ReqType:PlayReal;VersionTag:artemis;
        // ReqType:PlayReal;WndCount: 1;
        this.init()
          .then(() => {
            // let param = `hikvideoclient://ReqType:PlayReal;VersionTag:artemis;SvrIp:33.155.144.50;SvrPort:443;Appkey:${appkey};AppSecret:${appSecret};time:${time};timesecret:${timeSecret};httpsflag:1;CamList:${CamList};`
            // let param = `ReqType:PlayReal;WndCount: 1;SvrIp:33.155.144.50;SvrPort:443;Appkey:${appkey};AppSecret:${appSecret};time:${time};timesecret:${timeSecret};httpsflag: 1;CamList:${CamList};`
            let param =
              'ReqType:PlayReal;WndCount: 1;SvrIp:33.155.144.50;SvrPort:443;' +
              'Appkey:' +
              appkey +
              ';' +
              'AppSecret:' +
              appSecret +
              ';' +
              'time:' +
              time +
              ';' +
              'timesecret:' +
              timeSecret +
              ';' +
              'httpsflag: 1;' +
              'CamList:' +
              CamList +
              ';';
            setTimeout(() => {
              this.play_ocx_do(param);
            }, 2000);
          })
          .catch(() => {
            TipsPop({
              message: '请使用IE浏览器,该浏览器不支持该控件',
              type: 'error'
            });
          });
      });
    }
  },
  mounted() {},
  components: { PartyBox }
};
</script>
<style scoped>
.video >>> .el-dialog__body {
  padding: 0 20px 30px;
}
</style>
<style scoped>
.ul .li dt >>> .el-select {
  width: 100%;
}
.ul .li dt >>> .el-input__inner {
  border: 1px solid rgba(220, 223, 230, 0);
  background-color: #fff0;
}
</style>

<style scoped lang="scss">
.sightseeing {
  position: absolute;
  top: px2rem(586rem);
  left: px2rem(41rem);
  z-index: 1050;
  .video-box {
    display: flow-root;
    height: 100%;
  }
}
</style>
