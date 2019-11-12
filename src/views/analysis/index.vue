<template>
  <div class="home">
    <a-header></a-header>
    <a-natural></a-natural>
    <a-car></a-car>
    <a-desc></a-desc>
    <a-event></a-event>
    <a-repair></a-repair>
    <a-travel></a-travel>
    <div class="box div-left"></div>
    <div class="box div-right"></div>
  </div>
</template>

<script>
import AHeader from './Header'
import ANatural from './Natural'
import ACar from './Car'
import ADesc from './Desc'
import AEvent from './Event'
import ARepair from './Repair'
import ATravel from './Travel'
export default {
  name: 'home',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: {
    AHeader,
    ANatural,
    ACar,
    ADesc,
    AEvent,
    ARepair,
    ATravel
  }
}
</script>

<style scoped lang="scss">
.home {
  width: px2rem(1920rem);
  height: px2rem(1080rem);
  background-color: #100b30;
  background: url('~@/assets/analysis/background.png');
  background-size: 100% 100%;
  .div {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 150;
  }
  .box {
    position: absolute;
    width: px2rem(624rem);
    height:px2rem(24rem);
  }
  .div-left {
    bottom: px2rem(28rem);
    left:0;
    z-index: 1050;
    background: url('~@/assets/analysis/左下角点缀@2x.png');
    background-size: 100% 100%;
  }
  .div-right {
    bottom: px2rem(28rem);
    right: 0;
    z-index: 1050;
    background: url('~@/assets/analysis/右下角点缀@2x.png');
    background-size: 100% 100%;
  }
}
</style>
