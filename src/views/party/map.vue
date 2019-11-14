<template>
  <div class="map">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'map',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    TMapAPI.InitMap('map')
    TMapAPI.map.SetCenter(new SLonLat(1450, 1010), 1)
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
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
