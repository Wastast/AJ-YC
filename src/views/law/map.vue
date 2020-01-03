<template>
  <div class="map">
    <div id="maps" :class="mapType !== '2D' ? 'left' : ''"></div>
    <div id="mapDiv" :class="mapType !== '2.5D' ? 'left' : ''"></div>

    <Mapbtn :mapType.sync="mapType"></Mapbtn>

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
import { getVideoUrl } from '@/api/analysis';
import { getVideoSmoke, getYuRagne } from '@/api/mapapi';
// import { TipsPop } from '@/utils/el_ui';
import PopBox from '@/components/PopBox';
import TDmap from '@/utils/TDmap';
import Mapbtn from '@/components/Mapbtn';
export default {
  name: 'maps',
  data() {
    return {
      videoCode: null,
      isPop: false,
      mapType: null
    };
  },
  computed: {},
  watch: {
    mapType() {
      this.$nextTick(() => {
        if (this.mapType === '2D') {
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
      getVideoUrl({ id }).then(data => {
        if (data.code === 200) {
          if (!data.data) {
            // TipsPop({
            //   message: '该监控暂时无法查看...',
            //   type: 'error'
            // });
            return;
          }
          this.videoCode = id;
          this.isPop = true;
        }
      });
    },

    // 初始化2D
    init2D() {
      TMapAPI.InitCenter();
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

    getYuRagne().then(data => {
      var points = [];
      let list = data.data[0].fShape.split(',');
      list.forEach(item => {
        let LonLat = item.split(' ');
        points.push(new T.LngLat(LonLat[0], LonLat[1]));
      });
      // 创建面对象
      var polygon = new T.Polygon(points, {
        color: 'blue', // 线条颜色
        weight: 3, // 线条宽度
        opacity: 0.5, // 线条透明度
        fillColor: '#FFFFFF', // 覆盖物颜色
        fillOpacity: 0.5 // 覆盖物透明度
      });
      // 向地图上添加面
      mapWorld.addOverLay(polygon);
    });

    this.mapType = '2D';
  },
  components: {
    PopBox,
    Mapbtn
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
