<template>
  <div class="map">
    <div id="maps"></div>
  </div>
</template>

<script>
import { getFire } from '@/api/mapapi'
export default {
  name: 'maps',
  data() {
    return {
      imgRep: req.slice(0, -3)
    }
  },
  computed: {},
  watch: {},
  methods: {
    addPoint(item) {
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
      })
    }
  },
  mounted() {
    TMapAPI.InitMap('maps')
    TMapAPI.map.SetCenter(new SLonLat(1450, 1010), 1)
    getFire().then(data => {
      if (data.code === 200) {
        data.data.forEach(item => {
          this.addPoint(item)
        })
      }
    })
  }
}
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
  #maps {
    width: 100%;
    height: 100%;
  }
}
</style>
