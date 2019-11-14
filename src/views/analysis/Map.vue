<template>
  <div class="map">
    <div class="" id="map"></div>
  </div>
</template>

<script>
import { getHouse } from '@/api/analysis'
export default {
  name: 'Map',
  data() {
    return {
      list: [],
      timer: null
    }
  },
  methods: {
    // 节流
  },
  mounted() {
    getHouse().then(data => {
      if (data.code === 200) {
        this.list = data.data
        this.list.forEach(e => {
          let obj = {}
          let { id, range } = e
          obj = { mapid: id, range }
          TMapAPI.drawRange(obj, '#B56FE2')
        })
        this.timer = setInterval(() => {}, 1000)
      }
    })
    TMapAPI.InitMap('map')
    TMapAPI.map.SetCenter(new SLonLat(1500, 1010), 1)
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: px2rem(820rem);
  height: px2rem(652rem);
  position: absolute;
  top: px2rem(125rem);
  left: px2rem(555rem);
  border: 1px solid #2fd2ef;
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
