<template>
  <div class="map">
    <div id="maps"></div>
  </div>
</template>

<script>
import { getShouye } from '@/api/mapapi';
export default {
  name: 'Map',
  data() {
    return {
      imgRep: req.slice(0, -3)
    };
  },
  computed: {},
  watch: {},
  methods: {
    addPointWxzjDyzj(item, img, width, height, zIndex) {
      let sLonLat = new SLonLat(item.centerX, item.centerY);
      let iconPath = this.imgRep + '/upload/icon/' + img;
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
    }
  },
  mounted() {
    TMapAPI.InitMap('maps');
    TMapAPI.map.SetCenter(new SLonLat(1500, 1010), 1);
    // getHouse().then(data => {
    //   if (data.code === 200) {
    //     this.list = data.data
    //     this.list.forEach(e => {
    //       TMapAPI.drawRangeLable_house(e)
    //       if (e.partyMemberNum > 0) {
    //         // 党员之家
    //         this.addPointWxzjDyzj(e, e.img2, e.width2, e.height2, 999)
    //         TMapAPI.drawRangeLable_dyzj(e)
    //       }
    //       if (e.houseTip === 5) {
    //         // 五星之家
    //         this.addPointWxzjDyzj(e, e.img, e.width, e.height)
    //         TMapAPI.drawRangeLable_wxzj(e)
    //       }
    //     })
    //     TMapAPI.map.HideLabels()
    //   }
    // })
    // TMapAPI.GetMap().AddEventListener('zoomend', () => {
    //   TMapAPI.map.HideLabels()
    //   this.getZoom()
    // })
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
