<template>
  <div class="map">
    <div id="map" :class="map !== '2D' ? 'left' : ''"></div>
    <div id="mapDiv" :class="map !== '2.5D' ? 'left' : ''"></div>
    <div class="div-btn">
      <div class="div" @click="checkMap('2.5D')">
        <dl>
          <dt>
            <img src="@/assets/popbox/2.5d.png" alt="" />
          </dt>
          <dd>天地图</dd>
        </dl>
      </div>
      <div class="div" @click="checkMap('2D')">
        <dl>
          <dt>
            <img src="@/assets/popbox/2d.png" alt="" />
          </dt>
          <dd>平面图</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { getHouse, getShouye } from '@/api/mapapi';
import { TipsPop } from '@/utils/el_ui';
export default {
  name: 'Map',
  data() {
    return {
      list: [],
      timer: null,
      imgRep: req.slice(0, -3),
      isDraw: false,
      map: null
    };
  },
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
    addPoint(item) {
      let iconValue = item;
      let sLonLat = new SLonLat(iconValue.lon, iconValue.lat);
      let iconPath = this.imgRep + '/upload/icon/' + iconValue.img;
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
    addPointWxzjDyzj(item, img, width, height, zIndex) {
      let sLonLat = new SLonLat(item.centerX, item.centerY);
      let iconPath = this.imgRep + '/upload/icon/' + img;
      // 在地图内添加图标
      let sIcon;
      let sMarker;
      if (zIndex) {
        sIcon = new SIcon(
          iconPath,
          new SSize(width, height),
          new SPixel(-width / 2 - 9, -height - 9)
        );
        sIcon.GetDiv().style.zIndex = zIndex;
        sMarker = new SMarker(sLonLat, sIcon, 'dyzj');
      } else {
        sIcon = new SIcon(
          iconPath,
          new SSize(width, height),
          new SPixel(-width / 2 + 9, -height + 9)
        );
        sIcon.GetDiv().style.zIndex = zIndex;
        sMarker = new SMarker(sLonLat, sIcon, 'wxzj');
      }
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
      getShouye().then(data => {
        if (data.code === 200) {
          data.data.forEach(item => {
            if (item.typeId !== '001111') {
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
          TMapAPI.HideMarkersByTag('dyzj');
          TMapAPI.HideMarkersByTag('wxzj');
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
      // 创建图片对象
      var icon = new T.Icon({
        iconUrl: 'http://api.tianditu.gov.cn/img/map/markerA.png',
        iconSize: new T.Point(19, 27),
        iconAnchor: new T.Point(10, 25)
      });
      // 向地图上添加自定义标注
      var marker = new T.Marker(new T.LngLat(119.61, 30.526), { icon: icon });
      mapWorld.addOverLay(marker);
    }
  },
  mounted() {
    TMapAPI.InitMap('map');
    mapWorld = new T.Map('mapDiv');
    this.map = '2D';
  },
  beforeDestroy() {
    TMapAPI.GetMap().ReleaseEventListener('zoomend', this.getZoom());
  }
};
</script>

<style lang="scss" scoped>
.map {
  width: px2rem(820rem);
  height: px2rem(652rem);
  position: absolute;
  top: px2rem(125rem);
  left: px2rem(555rem);
  border: 1px solid #2fd2ef;
  position: relative;
  .left {
    left: -10000px !important;
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
