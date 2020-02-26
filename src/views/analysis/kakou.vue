<template>
  <div class="kakou">
    <bayonet-pie></bayonet-pie>
    <div class="div-test">
      <p class="p">
        <span class="span">总进</span>
        {{ Enter }}
      </p>
      <p class="p">
        <span class="span">总出</span>
        {{ out }}
      </p>
    </div>
  </div>
</template>

<script>
import bayonetPie from './echarts/bayonet_pie';
import { getBayonet } from '@/api/analysis';
export default {
  name: 'kakou',
  data() {
    return {
      Enter: '0',
      out: '0'
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 获取车辆卡口数据
    getCar() {
      getBayonet().then(data => {
        if (data.code === 200) {
          this.Enter = data.Enter;
          this.out = data.Out;
        }
      });
    }
  },
  mounted() {
    this.getCar();
  },
  components: {
    bayonetPie
  }
};
</script>

<style scoped lang="scss">
.kakou {
  width: 100%;
  height: 100%;
  .div-test {
    position: absolute;
    top: px2rem(150rem);
    left: px2rem(45rem);
    z-index: 100;
    .p {
      color: rgba(131, 178, 255, 1);
      font-weight: bold;
      .span {
        font-size: px2rem(16rem);
        margin-right: 5px;
        font-weight: 400;
      }
      &:nth-child(n + 2) {
        margin-top: px2rem(12rem);
      }
    }
  }
}
</style>
