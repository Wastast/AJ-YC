<template>
  <div class="home">
    <a-header title="数字余村综合管理平台"></a-header>
    <a-natural></a-natural>
    <a-car></a-car>
    <a-desc></a-desc>
    <a-event></a-event>
    <a-repair></a-repair>
    <a-travel></a-travel>
    <a-map></a-map>
    <a-swiper></a-swiper>
    <a-video></a-video>
    <div class="box div-left"></div>
    <div class="box div-right"></div>
  </div>
</template>

<script>
import AHeader from '@/components/Header';
import ASwiper from '@/components/Swiper';
import ANatural from './Natural';
import ACar from './Car';
import ADesc from './Desc';
import AEvent from './Event';
import ARepair from './Repair';
import ATravel from './Travel';
import AMap from './Map';
import AVideo from './video';
import { resize } from '@/mixin';
export default {
  name: 'home',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    // let websocket = new WebSocket('ws://192.168.8.107:8083/websocket/eventInfo')
    // websocket.onopen = function(event) {
    //   console.log('成功调用')
    //   console.log(event)
    // }
    // // 连接发生错误的回调方法
    // websocket.onerror = function() {
    //   console.log('报错')
    // }
    // websocket.onmessage = function(event) {
    //   console.log('接收信息------------------')
    //   console.log(JSON.parse(event.data))
    // }
  },
  components: {
    AHeader,
    ANatural,
    ACar,
    ADesc,
    AEvent,
    ARepair,
    ATravel,
    AMap,
    ASwiper,
    AVideo
  },
  mixins: [resize]
};
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
    height: px2rem(24rem);
    top: px2rem(1030rem);
  }
  .div-left {
    left: 0;
    z-index: 1050;
    background: url('~@/assets/analysis/左下角点缀@2x.png');
    background-size: 100% 100%;
  }
  .div-right {
    right: 0;
    z-index: 1050;
    background: url('~@/assets/analysis/右下角点缀@2x.png');
    background-size: 100% 100%;
  }
}
</style>
