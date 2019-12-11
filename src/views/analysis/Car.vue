<template>
  <div class="Car">
    <module-box :title="'车辆卡口分析'">
      <template slot="content">
        <bayonet-pie v-if="moduleType === 'car'"></bayonet-pie>
        <orign-bar v-if="moduleType === 'origin'"></orign-bar>
        <div class="div-btn" @click="checkModule()">
          {{ moduleType == 'car' ? '来源地分析' : '车辆卡口数据' }}
        </div>
        <div class="div-test" v-if="moduleType === 'car'">
          <p class="p">
            <span class="span">总进</span>
            {{ Enter }}
          </p>
          <p class="p">
            <span class="span">总出</span>
            {{ out }}
          </p>
        </div>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box';
import bayonetPie from './echarts/bayonet_pie';
import orignBar from './echarts/orign_bar';
import { getBayonet } from '@/api/analysis';
export default {
  name: 'Car',
  data() {
    return {
      Enter: '0',
      out: '0',
      moduleType: '',
      typeValue: {
        origin: '来源地分析',
        car: '车辆卡口数据'
      },
      qiyeTimer: null
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 切换显示数据模块
    checkModule() {
      if (this.moduleType === 'car') {
        this.moduleType = 'origin';
      } else {
        this.moduleType = 'car';
      }
    },
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
    this.moduleType = 'car';
  },
  components: {
    ModuleBox,
    bayonetPie,
    orignBar
  }
};
</script>

<style scoped lang="scss">
.Car {
  position: absolute;
  top: px2rem(737rem);
  left: px2rem(20rem);
  #kakou {
    height: 100%;
  }
  .div-btn {
    position: absolute;
    top: px2rem(45rem);
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
  .div-test {
    position: absolute;
    top: px2rem(133rem);
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
