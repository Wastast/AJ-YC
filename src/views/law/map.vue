<template>
  <div class="map">
    <div id="maps"></div>
    <pop-box title="视频播放" :width="600" :height="350" :isPop.sync="isPop">
      <template slot="content">
        <div class="vide-box">
          <video v-video-play="videoCode"></video>
        </div>
      </template>
    </pop-box>
  </div>
</template>

<script>
import { getVideoData } from '@/api/analysis';
import { getVideoSmoke } from '@/api/mapapi';
import { TipsPop } from '@/utils/el_ui';
import PopBox from '@/components/PopBox';
export default {
  name: 'maps',
  data() {
    return {
      imgRep: req.slice(0, -3),
      dialogVisible: false,
      videoCode: null,
      isPop: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 添加点位
    addPoint(item) {
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
    // 播放视频
    popVideo(id) {
      this.videoCode = id;
      this.isPop = true;
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
    TMapAPI.InitMap('maps');
    TMapAPI.map.SetCenter(new SLonLat(1500, 1010), 1);
  },
  components: {
    PopBox
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
.vide-box {
  box-sizing: border-box;
  padding-left: px2rem(10rem);
  height: px2rem(270rem);
  padding-right: px2rem(10rem);
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
