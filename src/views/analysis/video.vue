<template>
  <div class="video">
    <ul class="ul">
      <li class="li" v-for="item of list" :key="item.type" @click="popVideo(item.type)">
        <img :src="item.img" alt="" />
      </li>
    </ul>

    <el-dialog
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
    </el-dialog>
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
          type: '7e61ca0ed015445db18d5cb44902e6a3',
          img: require('@/assets/img/08对大石碑球机_20191116070001_11948_14DF4AC8_15739003181.jpg')
        },
        {
          type: '001001006',
          img: require('@/assets/img/17村委会东墙鹰眼_20191116080005_11948_2E60B070_15739005721.jpg')
        },
        {
          type: '5bc6b7dd26e34f83a5091bf5b6a8420a',
          img: require('@/assets/img/10光交1号对面河边球机_20191116084110_11948_14DCFEA8_15739004201.jpg')
        },
        {
          type: '61e626767df34eeab79f4f67509f26d2',
          img: require('@/assets/img/22余村出村人脸_20191116080004_11948_14E05A60_15739005381.jpg')
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
              ';'
            console.log(time)
            console.log(param)
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

<style scoped>
.video >>> .el-dialog__body {
  padding: 0 20px 30px;
}
</style>

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
