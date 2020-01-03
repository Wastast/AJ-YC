<template>
  <div class="map">
    <div id="map" :class="mapType !== '2D' ? 'left' : ''"></div>
    <div id="mapDiv" :class="mapType !== '2.5D' ? 'left' : ''"></div>
    <Mapbtn :mapType.sync="mapType"></Mapbtn>
  </div>
</template>

<script>
import { getHouse, getYuRagne } from '@/api/mapapi';
import Mapbtn from '@/components/Mapbtn';
export default {
  name: 'maps',
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
      sMarker.AddEventListener('click', iconValue, () => {});
    },
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
      getHouse().then(data => {
        if (data.code === 200) {
          this.list = data.data;
          this.list.forEach(e => {
            TMapAPI.drawRangeLable_house(e);
            if (e.partyMemberNum > 0) {
              // 党员之家
              this.addPointWxzjDyzj(e, e.img2, e.width2, e.height2, 999);
              TMapAPI.drawRangeLable_dyzj(e);
            }
            if (e.houseTip === 5) {
              // 五星之家
              this.addPointWxzjDyzj(e, e.img, e.width, e.height);
              TMapAPI.drawRangeLable_wxzj(e);
            }
          });
          TMapAPI.map.HideLabels();
        }
      });
      TMapAPI.GetMap().AddEventListener('zoomend', () => {
        TMapAPI.map.HideLabels();
        this.getZoom();
      });
    },
    // 初始化2.5D
    init25D() {
      mapWorld.centerAndZoom(new T.LngLat(119.61, 30.526), 18);
      if (!mapWorld) {
        return;
      }
      getHouse().then(data => {
        if (data.code === 200) {
          this.list = data.data;
          this.list.forEach(e => {
            let IconValue;
            let icon;
            if (e.partyMemberNum > 0) {
              // 党员之家
              IconValue = e;
              let iconPath = imgRep + '/upload/icon/' + IconValue.img2;
              icon = new T.Icon({
                // 创建图片对象
                iconUrl: iconPath,
                iconSize: new T.Point(IconValue.width2, IconValue.height2),
                iconAnchor: new T.Point(-IconValue.width2 / 2, -IconValue.height2 - 15)
              });
            }
            if (e.houseTip === 5) {
              // 五星之家
              // 党员之家
              IconValue = e;
              let iconPath = imgRep + '/upload/icon/' + IconValue.img;
              icon = new T.Icon({
                // 创建图片对象
                iconUrl: iconPath,
                iconSize: new T.Point(IconValue.width, IconValue.height),
                iconAnchor: new T.Point(-IconValue.width / 2, -IconValue.height - 15)
              });
            }
            if (!IconValue && !icon) {
              return;
            }
            let ptt = JZbConvert.GetGpsLonLatFromSw(
              new SPoint(IconValue.centerX, IconValue.centerY)
            );
            let x = ptt.GetLon();
            let y = ptt.GetLat();
            // 向地图上添加自定义标注;
            let marker = new T.Marker(new T.LngLat(x, y), { icon: icon });
            mapWorld.addOverLay(marker);
          });
        }
      });
    }
  },
  mounted() {
    TMapAPI.InitMap('map');
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
  },
  components: {
    Mapbtn
  }
};
</script>

<style scoped lang="scss">
.map {
  width: px2rem(750rem);
  height: px2rem(564rem);
  position: absolute;
  top: px2rem(180rem);
  left: px2rem(600rem);
  border: 1px solid #2fd2ef;
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
  #map {
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
}
</style>
