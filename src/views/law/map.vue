<template>
  <div class="map">
    <div id="maps"></div>
  </div>
</template>

<script>
import { getVideoSmoke } from '@/api/mapapi'
export default {
  name: 'maps',
  data() {
    return {
      pointList: ['001001001', '001001005', '001001006'],
      imgRep: req.slice(0, -3)
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 添加点位
    addPoint(item) {
      console.log(item)
      let iconValue = item
      let sLonLat = new SLonLat(iconValue.lon, iconValue.lat)
      let iconPath = this.imgRep + '/upload/icon/' + iconValue.img
      // 在地图内添加图标
      let sIcon = new SIcon(
        iconPath,
        new SSize(iconValue.width, iconValue.height),
        new SPixel(-iconValue.width / 2, -iconValue.height)
      )
      let sMarker = new SMarker(sLonLat, sIcon, iconValue.typeId)
      TMapAPI.markerLayer.AddMarker(sMarker)

      sMarker.AddEventListener('click', iconValue, () => {
        console.log(iconValue)
      })
    }
  },
  mounted() {
    getVideoSmoke().then(data => {
      if (data.code === 0) {
        data.data.forEach(item => {
          this.addPoint(item)
        })
      }
    })
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
    TMapAPI.InitMap('maps')
    TMapAPI.map.SetCenter(new SLonLat(1500, 1010), 1)
  }
}
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
