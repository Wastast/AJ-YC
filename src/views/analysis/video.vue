<template>
  <div class="video">
    <ul class="ul">
      <li class="li" v-for="item of list" :key="item.type" @click="popVideo(item.type)">
        <img src="@/assets/img/beijing.png" alt="" />
      </li>
    </ul>

    <el-dialog
      :modal="false"
      title="提示"
      @opened="getVideo"
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
    </el-dialog>

    <!-- 添加预览控件（需要先在windows下注册） -->
    <object
      classid="CLSID:7E393848-7238-4CE3-82EE-44AF444B240A"
      wmode="opaque"
      id="PlayViewOCX"
      style="width:0;heght:0;"
    ></object>
  </div>
</template>

<script>
import { getVideoData } from '@/api/analysis'
import { TipsPop } from '@/utils/el_ui'
export default {
  name: 'Video',
  data() {
    return {
      videoValue: 'ReqType:PlayReal;wndcount:1',
      PalyType: '',
      SvrIp: '',
      SvrPort: '',
      appkey: '',
      appSecret: '',
      time: '',
      timeSecret: '',
      httpsflag: '',
      CamList: '',
      list: [
        {
          type: '001001001'
        },
        {
          type: '001001002'
        },
        {
          type: '001001003'
        },
        {
          type: '001001004'
        }
      ],
      dialogVisible: false,
      videoCode: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 弹出视频
    popVideo(type) {
      this.videoCode = type
      // 这里弹出
      // this.getVideo(),
      this.dialogVisible = true
    },
    play_ocx_do(param) {
      let OCXobj = document.getElementById('PlayViewOCX')
      OCXobj.ContainOCX_Do(param)
    },
    // 初始化
    init() {
      return new Promise((resolve, reject) => {
        let OCXobj = document.getElementById('PlayViewOCX')
        let txtInit = this.videoValue
        OCXobj.ContainOCX_Init(txtInit)
        resolve()
      })
    },
    // 获取视频
    getVideo() {
      getVideoData({
        indexcode: this.videoCode
      }).then(data => {
        let { CamList, appSecret, appkey, time, timeSecret } = data
        this.init()
          .then(() => {
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
              ';'
            setTimeout(() => {
              this.play_ocx_do(param)
            }, 2000)
          })
          .catch(data => {
            TipsPop({
              message: '请使用IE浏览器,该浏览器不支持该控件',
              type: 'error'
            })
          })
      })
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.video {
  position: absolute;
  top: px2rem(790rem);
  left: px2rem(554rem);
  z-index: 1050;
  // width: px2rem(820rem);
  height: px2rem(105rem);
  .ul {
    .li {
      width: px2rem(200rem);
      height: px2rem(100rem);
      float: left;
      &:nth-child(n + 2) {
        margin-left: px2rem(8rem);
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  // #PlayViewOCX {
  //   height: 100%;
  // }
}
</style>
