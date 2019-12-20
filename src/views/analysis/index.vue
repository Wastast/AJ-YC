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
    <div class="logo">
      <img src="@/assets/resouse/wenlan.png" alt="" />
    </div>
    <!-- <div class="div-btn" @click="jump">
      余村环境
    </div> -->
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
  methods: {
    jump() {
      window.location.href = 'http://180.76.236.56:8118/MyMix.html';
    }
  },
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
  .logo {
    position: absolute;
    top: 0;
    right: px2rem(10rem);
    z-index: 9999;
    width: px2rem(60rem);
    img {
      width: 100%;
    }
  }
  .div-btn {
    position: absolute;
    top: px2rem(90rem);
    right: px2rem(35rem);
    z-index: 1050;
    padding: px2rem(10rem);
    color: rgba(131, 178, 255, 1);
    text-align: center;
    background: rgba(97, 206, 243, 0);
    border: 1px solid rgba(57, 114, 154, 1);
    box-shadow: 0 0 5px rgba(31, 61, 139, 1);
    border-radius: 2px;
    font-size: px2rem(18rem);
    cursor: pointer;
    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>
