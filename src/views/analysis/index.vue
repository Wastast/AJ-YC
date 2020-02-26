<template>
  <div class="home" v-monitor-screen>
    <a-header title="数字余村综合管理平台"></a-header>
    <a-natural></a-natural>
    <a-desc></a-desc>
    <a-event></a-event>
    <a-travel></a-travel>
    <a-map></a-map>
    <a-swiper></a-swiper>
    <a-video></a-video>
    <a-lvyoubox></a-lvyoubox>
    <a-bayonetbox></a-bayonetbox>
    <div class="box div-left"></div>
    <div class="box div-right"></div>
    <div class="logo">
      <img src="@/assets/resouse/wenlan.png" alt="" />
    </div>
  </div>
</template>

<script>
import AHeader from '@/components/Header';
import ASwiper from '@/components/Swiper';
import ANatural from './Natural';
import ALvyoubox from './lvyoubox';
import ADesc from './Desc';
import AEvent from './Event';
import ATravel from './Travel';
import AMap from './Map';
import AVideo from './video';
import ABayonetbox from './bayonetbox';
export default {
  name: 'home',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: {
    AHeader,
    ANatural,
    ADesc,
    AEvent,
    ATravel,
    AMap,
    ASwiper,
    AVideo,
    ALvyoubox,
    ABayonetbox
  }
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
