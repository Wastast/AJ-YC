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
  </div>
</template>

<script>
import { getShouye } from '@/api/mapapi';
import TDmap from '@/utils/TDmap';
export default {
  name: 'Map',
  data() {
    return {
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
      TMapAPI.map.SetCenter(new SLonLat(1500, 1010), 1);
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
    }
  },
  mounted() {
    TMapAPI.InitMap('maps');
    mapWorld = new T.Map('mapDiv');
    this.map = '2D';
  },
  beforeDestroy() {
    mapWorld = null;
    TMapAPI.GetMap().ReleaseEventListener('zoomend', this.getZoom());
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
</style>
