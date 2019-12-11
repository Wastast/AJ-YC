<template>
  <div class="map">
    <div id="maps"></div>
    <el-dialog
      :modal="false"
      title="实时预览"
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
import { getVideoData } from '@/api/analysis';
import { getVideoSmoke } from '@/api/mapapi';
import { TipsPop } from '@/utils/el_ui';
export default {
  name: 'maps',
  data() {
    return {
      pointList: ['001001001', '001001005', '001001006'],
      imgRep: req.slice(0, -3),
      videoValue: 'ReqType:PlayReal;wndcount:1',
      dialogVisible: false,
      videoCode: null
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 添加点位
    addPoint(item) {
      // console.log(item)
      let iconValue = item;
      let sLonLat = new SLonLat(iconValue.lon, iconValue.lat);
      let iconPath = this.imgRep + '/upload/icon/' + iconValue.img;
      // 在地图内添加图标
      let sIcon = new SIcon(
        iconPath,
        new SSize(iconValue.width, iconValue.height),
        new SPixel(-iconValue.width / 2, -iconValue.height)
      );
      let sMarker = new SMarker(sLonLat, sIcon, iconValue.typeId);
      TMapAPI.markerLayer.AddMarker(sMarker);
      if (item.typeId === '001001001') {
        sMarker.AddEventListener('click', iconValue, () => {
          this.popVideo(iconValue.id);
        });
      }
      sMarker.AddEventListener('mousemove', iconValue, () => {
        TMapAPI.map.ShowLabelsByTag('default' + item.id);
      });
      sMarker.AddEventListener('mouseout', iconValue, () => {
        TMapAPI.map.HideLabelsByTag('default' + item.id);
      });
    },
    // 弹出视频
    popVideo(type) {
      this.videoCode = type;
      // 这里弹出
      // this.getVideo(),
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
  mounted() {
    getVideoSmoke().then(data => {
      if (data.code === 0) {
        data.data.forEach(item => {
          this.addPoint(item);
          TMapAPI.drawRangeLableDefault(item);
        });
        TMapAPI.map.HideLabels();
      }
    });
    // for (let item of this.pointList) {
    //   getResourseType({
    //     typeid: item
    //   }).then(data => {
    //     if (data.code === 200) {
    //       data.data.forEach(item => {
    //         this.addPoint(item)
    //       })
    //     }
    //   })
    // }
    TMapAPI.InitMap('maps');
    TMapAPI.map.SetCenter(new SLonLat(1500, 1010), 1);
  }
};
</script>
<style scoped>
.video >>> .el-dialog__body {
  padding: 0 20px 30px;
}
</style>
<style scoped lang="scss">
.map {
  width: px2rem(650rem);
  height: px2rem(530rem);
  position: absolute;
  top: px2rem(180rem);
  left: px2rem(670rem);
  &::before {
    width: px2rem(636rem);
    height: px2rem(6rem);
    background: linear-gradient(
      -90deg,
      rgba(22, 42, 91, 1),
      rgba(32, 97, 255, 1),
      rgba(10, 32, 85, 1)
    );
    content: '';
    display: block;
    position: absolute;
    bottom: px2rem(-6rem);
    left: 50%;
    transform: translateX(-50%);
  }
  #maps {
    width: 100%;
    height: 100%;
  }
  .img-box {
    width: px2rem(864rem);
    height: px2rem(102rem);
    background: url('~@/assets/img/maptop.png');
    background-size: 100% 100%;
    position: absolute;
    z-index: 1050;
    top: 0;
    left: 0;
  }
}
</style>
