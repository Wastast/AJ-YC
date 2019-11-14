<template>
  <div class="map">
    <div id="map"></div>
    <!-- <div class="img-box">

    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Map',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    TMapAPI.InitMap('map')
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
  #map {
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
