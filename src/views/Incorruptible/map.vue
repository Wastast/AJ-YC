<template>
  <div class="map">
    <div id="maps" :class="mapType !== '2D' ? 'left' : ''"></div>
    <div id="mapDiv" :class="mapType !== '2.5D' ? 'left' : ''"></div>
    <Mapbtn :mapType.sync="mapType"></Mapbtn>
  </div>
</template>

<script>
import { getShouye, getYuRagne, getHouse } from '@/api/mapapi';
import TDmap from '@/utils/TDmap';
import Mapbtn from '@/components/Mapbtn';
export default {
  name: 'Map',
  data() {
    return {
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
    addPointWxzjDyzj(item, img, width, height, zIndex) {
      let sLonLat = new SLonLat(item.centerX, item.centerY);
      let iconPath = imgRep + '/upload/icon/' + img;
      // 在地图内添加图标
      let sIcon;
      if (zIndex) {
        sIcon = new SIcon(
          iconPath,
          new SSize(width, height),
          new SPixel(-width / 2 - 9, -height - 9)
        );
        sIcon.GetDiv().style.zIndex = zIndex;
      } else {
        sIcon = new SIcon(
          iconPath,
          new SSize(width, height),
          new SPixel(-width / 2 + 9, -height + 9)
        );
        sIcon.GetDiv().style.zIndex = zIndex;
      }
      let sMarker = new SMarker(sLonLat, sIcon);
      TMapAPI.markerLayer.AddMarker(sMarker);
      sMarker.AddEventListener('mousemove', item, () => {
        if (zIndex) {
          TMapAPI.map.ShowLabelsByTag('dyzj' + item.id);
        } else {
          TMapAPI.map.ShowLabelsByTag('wxzj' + item.id);
        }
      });
      sMarker.AddEventListener('mouseout', item, () => {
        if (zIndex) {
          TMapAPI.map.HideLabelsByTag('dyzj' + item.id);
        } else {
          TMapAPI.map.HideLabelsByTag('wxzj' + item.id);
        }
      });
    },
    addPoint(item) {
      let iconValue = item;
      let sLonLat = new SLonLat(iconValue.lon, iconValue.lat);
      let iconPath = imgRep + '/upload/icon/' + iconValue.img;
      // 在地图内添加图标
      let sIcon = new SIcon(
        iconPath,
        new SSize(iconValue.width, iconValue.height),
        new SPixel(-iconValue.width / 2, -iconValue.height - 15)
      );
      let sMarker = new SMarker(sLonLat, sIcon, iconValue.typeId);
      TMapAPI.markerLayer.AddMarker(sMarker);
      sMarker.AddEventListener('mousemove', iconValue, () => {
        TMapAPI.map.ShowLabelsByTag('default' + item.id);
      });
      sMarker.AddEventListener('mouseout', iconValue, () => {
        TMapAPI.map.HideLabelsByTag('default' + item.id);
      });
    },
    // 绘制房屋
    drawHouse() {
      getHouse().then(data => {
        if (data.code === 200) {
          this.list = data.data;
          this.list.forEach(e => {
            TMapAPI.drawRange(e, '#B56FE2');
          });
        }
      });
    },
    // 获取地图层级
    getZoom() {
      let zoom = TMapAPI.map.GetZoom();
      if (zoom >= 2) {
        if (this.isDraw !== true) {
          this.isDraw = true;
          this.drawHouse();
        }
      } else {
        this.isDraw = false;
        TMapAPI.ClearFeatures();
      }
    },
    // 初始化2D
    init2D() {
      TMapAPI.InitCenter();
      if (!TMapAPI.map) {
        return;
      }
      getShouye().then(data => {
        if (data.code === 200) {
          data.data.forEach(item => {
            if (item.typeId === '001111') {
              this.addPoint(item);
              if (item.typeId === '001003') {
                TMapAPI.drawRangeLableMs(item);
              } else {
                TMapAPI.drawRangeLableDefault(item);
              }
            }
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
      getShouye().then(data => {
        if (data.code === 200) {
          data.data.forEach(item => {
            if (item.typeId === '001111') {
              TDmap.addPoint(item);
            }
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
  beforeDestroy() {
    mapWorld = null;
    TMapAPI.GetMap().ReleaseEventListener('zoomend', this.getZoom());
  },
  components: {
    Mapbtn
  }
};
</script>

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
  .left {
    left: -10000px !important;
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
