<template>
  <div class="Travel">
    <party-box title="旅游监测" width="592" height="392">
      <template slot="content">
        <div class="div left">
          <div class="dvi-top">
            <div class="box">
              <p class="p-title">
                本日游客总数
              </p>
              <span class="span-value">
                <countTo :startVal="parseInt(0)" :endVal="nowSum" :duration="3000"></countTo>
              </span>
            </div>
            <div class="box">
              <p class="p-title">
                实时游客数
              </p>
              <span class="span-value">
                <countTo :startVal="parseInt(0)" :endVal="TourData" :duration="3000"></countTo>
              </span>
            </div>
          </div>
          <div class="bottom">
            <huaxiang></huaxiang>
            <p class="title">
              游客画像
            </p>
          </div>
        </div>
        <div class="div right">
          <div class="dvi-top">
            <div class="box">
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
            <div class="box">
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
          <div class="bottom">
            <div class="echarts">
              <car-bar></car-bar>
            </div>
            <div class="list">
              <p class="top-value">
                省内车辆来源分析
              </p>
              <ul class="ul">
                <li class="li" v-for="(item, index) of list" :key="index">
                  <p class="top">Top{{ index + 1 }}</p>
                  <div class="div-text">
                    <p class="p-city">
                      {{ item.province }}
                    </p>
                    <p class="span-value">{{ ((item.num / AllSum) * 100).toFixed(2) }}%</p>
                  </div>
                </li>
              </ul>
            </div>
            <p class="title">
              车辆来源分析
            </p>
          </div>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { getConsumption, getSex, getAge, getTouristOrign, getTourData } from '@/api/resourse';
import { EleResize } from '@/utils/esresize';
import countTo from 'vue-count-to';
import { getRepair, getBayonet } from '@/api/analysis';
import huaxiang from '../analysis/huaxiang';
import carBar from './echarts/car_bar';
export default {
  name: 'Travel',
  data() {
    return {
      nowSum: 0,
      list: [],
      provinceIn: {
        name: '省内',
        value: 0
      },
      provinceOut: {
        name: '省外',
        value: 0
      },
      TourData: 0,
      qiyeTimer: null,
      AllSum: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 切换type
    checkType(type) {
      if (this.type === type) {
        return;
      }
      this.type = type;
    },
    // 获取游客来源地分析
    Orign() {
      getTouristOrign()
        .then(data => {
          if (data.code === 200) {
            // 总数
            let AllSum = data.data.map(item => {
              return item.num;
            });
            this.AllSum = AllSum.reduce((a, b) => a + b);
            let arr = data.data.slice(5);
            let sum = 0;
            arr.forEach(item => {
              sum += item.num;
            });
            let obj = {
              province: '其他',
              num: sum
            };
            this.list = data.data.slice(0, 3);
            this.list.push(obj);
          }
        })
        .catch(() => {});
    },
    // 获取游客实时数据
    realTime() {
      getTourData().then(data => {
        if (data.code) {
          this.TourData = data.number;
        }
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.qiyeTimer);
  },
  mounted() {
    this.type = 'consumption';
    this.Orign();
    this.realTime();
    // 获取本日游客总数据
    getRepair().then(data => {
      if (data.code === 200) {
        if (data.number.length > 0) {
          let sum = data.number.reduce((a, b) => a + b);
          this.nowSum = sum;
        } else {
          this.nowSum = 0;
        }
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
  components: { PartyBox, countTo, huaxiang, carBar }
};
</script>

<style scoped>
.Travel >>> .content {
  padding: 0.44rem 0.52rem 0 0.54rem;
  box-sizing: border-box;
}
</style>

<style scoped lang="scss">
.Travel {
  position: absolute;
  top: px2rem(594rem);
  left: px2rem(1284rem);
  z-index: 100;
  .div {
    float: left;
    width: px2rem(262rem);
    .dvi-top {
      // width: px2rem(262rem);
      width: 100%;
      height: px2rem(72rem);
      background: rgba(2, 7, 26, 0.6);
      border-radius: 4px;
      box-sizing: border-box;
      padding: px2rem(10rem) 0 0 0;
      display: flex;
      justify-content: space-around;
      .box {
        float: left;
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
    }
    .bottom {
      margin-top: px2rem(10rem);
      height: px2rem(280rem);
      background: rgba(0, 0, 0, 0.3);
      position: relative;
      .title {
        position: absolute;
        top: px2rem(10rem);
        left: px2rem(10rem);
        color: rgba(128, 165, 206, 1);
      }
    }
  }
  .left {
    .bottom {
      box-sizing: border-box;
      padding-top: px2rem(30rem);
    }
  }
  .right {
    margin-left: px2rem(10rem);
    .bottom {
      .echarts {
        height: px2rem(150rem);
      }
    }
    .list {
      margin-top: px2rem(5rem);
      display: flow-root;
      position: relative;
      .top-value {
        position: absolute;
        top: px2rem(-15rem);
        left: 0;
        color: #80a5ce;
      }
      .ul {
        display: flow-root;
        .li {
          display: flow-root;
          width: px2rem(124rem);
          height: px2rem(60rem);
          background: rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          float: left;
          position: relative;
          cursor: pointer;
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
            left: px2rem(5rem);
          }
          .div-text {
            display: flow-root;
            margin-top: px2rem(14rem);
            margin-left: px2rem(50rem);
            .p-city {
              color: rgba(128, 165, 206, 1);
              margin-bottom: px2rem(10rem);
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
