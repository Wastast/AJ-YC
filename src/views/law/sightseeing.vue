<template>
  <div class="sightseeing">
    <party-box title="治安视频" width="592" height="184">
      <template slot="content">
        <ul class="ul">
          <li class="li">
            <dl>
            <!-- <dt>
                <el-select v-model="value" placeholder="请选择视频检测位置">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </dt> -->
              <dd><img src='@/assets/img/16村委会对面绿化带球机_20191116080003_11948_14D9FA50_15739004381.jpg' width="100%" height="100%" @click="popVideo('d2102790e235441cbefaf6b244c82dea')" alt=""/></dd>
            </dl>
            <!-- <img
              src='@/assets/img/16村委会对面绿化带球机_20191116080003_11948_14D9FA50_15739004381.jpg' width="100%" height="100%"
              alt=""
            /> -->
          </li>
          <li class="li">
            <dl>
            <!-- <dt>
                <el-select v-model="value" placeholder="请选择视频检测位置">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </!-->
              <dd><img src='@/assets/img/21余村进村卡口_20191116080008_11948_14D9FA50_15739004841.jpg' width="100%" height="100%" @click="popVideo('e2a6e080fe00496386aff52b0b0b6017')" alt=""/></dd>
            </dl>
            <!-- <img
              src='@/assets/img/21余村进村卡口_20191116080008_11948_14D9FA50_15739004841.jpg' width="100%" height="100%"
              alt=""
            /> -->
          </li>
        </ul>
      </template>
    </party-box>
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
import PartyBox from '@/components/party-box'
import { TipsPop } from '@/utils/el_ui'
import { getVideoData } from '@/api/analysis'
export default {
  name: 'sightseeing',
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      imgRep: req.slice(0, -3),
      videoValue: 'ReqType:PlayReal;wndcount:1',
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
  mounted() {},
  components: { PartyBox }
}
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
  top: px2rem(804rem);
  left: px2rem(41rem);
  z-index: 100;
  .ul {
    display: flow-root;
    .li {
      box-sizing: border-box;
      padding-top: px2rem(5rem);
      margin-left: px2rem(35rem);
      float: left;
      dt {
        width: px2rem(240rem);
        height: px2rem(40rem);
        background: rgba(49, 129, 191, 0.26);
        border: 1px solid rgba(45, 126, 182, 1);
        opacity: 0.8;
        border-radius: 6px;
        box-sizing: border-box;
      }
      dd {
        width: px2rem(240rem);
        height: px2rem(170rem);
        background: rgba(2, 7, 26, 1);
        border-radius: 4px;
      }
    }
  }
}
</style>
