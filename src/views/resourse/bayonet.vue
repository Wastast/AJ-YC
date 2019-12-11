<template>
  <div class="bayonet">
    <party-box title="车辆监测" width="592" height="323">
      <template slot="content">
        <div class="div-center">
          <div class="div-in">
            <p class="p-title">
              省内车辆
            </p>
            <span class="span-value">
              <countTo
                :startVal="parseInt(0)"
                :endVal="parseFloat(provinceIn.value)"
                :duration="4000"
              ></countTo>
            </span>
          </div>
          <div class="div-out">
            <p class="p-title">
              省外车辆
            </p>
            <span class="span-value">
              <countTo
                :startVal="parseInt(0)"
                :endVal="parseFloat(provinceOut.value)"
                :duration="4000"
              ></countTo>
            </span>
          </div>
        </div>
        <div class="div-bottom">
          <div class="echarts">
            <car-bar></car-bar>
          </div>
          <div class="list">
            <p>
              省内车辆来源地分析
            </p>
            <ul class="ul">
              <li class="li" v-for="(item, index) of list" :key="index">
                <p class="top">Top{{ index + 1 }}</p>
                <div class="div-text">
                  <p class="p-city">
                    {{ item.city }}
                  </p>
                  <p class="span-value">
                    {{ item.number }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { getBayonet, getOrign } from '@/api/analysis';
import countTo from 'vue-count-to';
import carBar from './echarts/car_bar';
export default {
  name: 'bayonet',
  data() {
    return {
      value: '',
      list: [],
      provinceIn: {
        name: '省内',
        value: 0
      },
      provinceOut: {
        name: '省外',
        value: 0
      }
    };
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    // 获取来源地数据
    getOrign().then(data => {
      if (data.code === 200) {
        this.list = data.day.slice(0, 4);
      }
    });
    // 获取车辆卡口数据
    getBayonet().then(data => {
      if (data.code === 200) {
        data.dataProvince.map(item => {
          if (item.name === '省内') {
            this.provinceIn = item;
          }
          if (item.name === '省外') {
            this.provinceOut = item;
          }
        });
      }
    });
  },
  components: { PartyBox, countTo, carBar }
};
</script>

<style scoped>
.bayonet >>> .content {
  padding: 0.44rem 0.52rem 0 0.54rem;
  box-sizing: border-box;
}
.div-top >>> .el-select {
  width: 100%;
}
.div-top >>> .el-input__inner {
  border: 1px solid rgba(220, 223, 230, 0);
  background-color: rgba(0, 0, 0, 0);
}
</style>

<style scoped lang="scss">
.bayonet {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(41rem);
  z-index: 100;
  .div-top {
    height: px2rem(15rem);
    // background: rgba(49, 129, 191, 0.26);
    // border: 1px solid rgba(45, 126, 182, 1);
    // opacity: 0.8;
    // border-radius: 6px;
    // box-sizing: border-box;
  }
  .div-center {
    margin-top: px2rem(9rem);
    margin-bottom: px2rem(7rem);
    display: flow-root;
    overflow: hidden;
    > div {
      float: left;
      background: rgba(2, 7, 26, 0.6);
      border-radius: 4px;
      box-sizing: border-box;
      padding: px2rem(10rem) 0 0 px2rem(14rem);
      .p-title {
        color: rgba(128, 165, 206, 1);
        margin-bottom: px2rem(9rem);
      }
      .span-value {
        font-size: px2rem(36rem);
        font-family: 'DS-DIGII';
        color: #fff;
      }
    }
    .div-in {
      width: px2rem(215rem);
      height: px2rem(72rem);
    }
    .div-out {
      margin-left: px2rem(7rem);
      width: px2rem(315rem);
      height: px2rem(72rem);
    }
  }
  .div-bottom {
    > div {
      float: left;
    }
    .echarts {
      width: px2rem(215rem);
      height: px2rem(161rem);
      > div {
        height: 100%;
      }
    }
    .list {
      width: px2rem(317rem);
      height: px2rem(161rem);
      background: rgba(2, 7, 26, 0.3);
      border-radius: 4px;
      margin-left: px2rem(5rem);
      box-sizing: border-box;
      padding: px2rem(6rem) 0 0 px2rem(12rem);
      display: flow-root;
      p {
        margin-bottom: px2rem(9rem);
        color: rgba(128, 165, 206, 1);
        display: flow-root;
        margin-left: px2rem(5rem);
      }
      .ul {
        display: flow-root;
        .li {
          display: flow-root;
          width: px2rem(144rem);
          height: px2rem(60rem);
          background: rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          float: left;
          position: relative;
          &:nth-child(even) {
            margin-left: px2rem(5rem);
          }
          &:nth-child(n + 3) {
            margin-top: px2rem(4rem);
          }
          .top {
            color: rgba(13, 123, 225, 1);
            font-weight: bold;
            position: absolute;
            top: px2rem(11rem);
            left: px2rem(13rem);
          }
          .div-text {
            display: flow-root;
            margin-top: px2rem(14rem);
            margin-left: px2rem(58rem);
            .p-city {
              color: rgba(128, 165, 206, 1);
              margin-bottom: px2rem(7rem);
            }
            .span-value {
              font-size: px2rem(16rem);
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }
  }
}
</style>
