<template>
  <div class="map">
    <div id="maps" :class="map !== '2D' ? 'left' : ''"></div>
    <div id="mapDiv" :class="map !== '2.5D' ? 'left' : ''"></div>
    <div class="div-btn">
      <div class="div" @click="checkMap('2D')">
        <dl>
          <dt>
            <img src="@/assets/popbox/2.5d.png" alt="" />
          </dt>
          <dd>倾斜图</dd>
        </dl>
      </div>
      <div class="div" @click="checkMap('2.5D')">
        <dl>
          <dt>
            <img src="@/assets/popbox/2d.png" alt="" />
          </dt>
          <dd>天地图</dd>
        </dl>
      </div>
    </div>
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
import TDmap from '@/utils/TDmap';
export default {
  name: 'maps',
  data() {
    return {
      videoCode: null,
      isPop: false,
      map: null
    };
  },
  computed: {},
  watch: {
    map() {
      this.$nextTick(() => {
        if (this.map === '2D') {
          // 初始化平面图
          this.init2D();
        } else {
          // 初始化天地图
          this.init25D();
        }
      });
    }
  },
  methods: {
    // 添加点位
    addPoint(item) {
      let iconValue = item;
      let sLonLat = new SLonLat(iconValue.lon, iconValue.lat);
      let iconPath = imgRep + '/upload/icon/' + iconValue.img;
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
    },
    // 切换地图
    checkMap(code) {
      if (this.map === 'code') {
        TipsPop({
          message: '当前地图已经存在...',
          type: 'info'
        });
        return;
      }
      this.map = code;
    },
    // 初始化2D
    init2D() {
      TMapAPI.map.SetCenter(new SLonLat(1500, 1010), 1);
      if (!TMapAPI.map) {
        return;
      }
      getVideoSmoke().then(data => {
        if (data.code === 0) {
          data.data.forEach(item => {
            this.addPoint(item);
            TMapAPI.drawRangeLableDefault(item);
          });
          TMapAPI.map.HideLabels();
        }
      });
      TMapAPI.map.SetCenter(new SLonLat(1500, 1010), 1);
    },
    // 初始化2.5D
    init25D() {
      mapWorld.centerAndZoom(new T.LngLat(119.61, 30.526), 18);
      if (!mapWorld) {
        return;
      }
      getVideoSmoke().then(data => {
        if (data.code === 0) {
          data.data.forEach(item => {
            TDmap.addPoint(item);
          });
        }
      });
    }
  },
  mounted() {
    TMapAPI.InitMap('maps');
    mapWorld = new T.Map('mapDiv');
    this.map = '2D';
  },
  components: {
    PopBox
  },
  beforeDestroy() {
    mapWorld = null;
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
    position: absolute !important;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  #mapDiv {
    width: 100%;
    height: 100%;
    position: absolute !important;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  .left {
    left: -10000px !important;
  }
  .div-btn {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1050;
    > div {
      float: left;
      cursor: pointer;
    }
    .div {
      margin-left: px2rem(10rem);
      dd {
        text-align: center;
        color: #fff;
      }
    }
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
