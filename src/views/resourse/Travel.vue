<template>
  <div class="Travel">
    <party-box title="旅游监测" width="592" height="392">
      <template slot="content">
        <div class="div-top">
          <div class="div-in">
            <p class="p-title">
              本日游客总数
            </p>
            <span class="span-value">
              <countTo :startVal="parseInt(0)" :endVal="nowSum" :duration="3000"></countTo>
            </span>
          </div>
          <div class="div-out">
            <p class="p-title">
              实时游客数
            </p>
            <span class="span-value">
              <countTo :startVal="parseInt(0)" :endVal="TourData" :duration="3000"></countTo>
            </span>
          </div>
        </div>
        <div class="div-center">
          <div class="echarts">
            <p>
              人群画像
            </p>
            <div class="type">
              <span
                v-for="item of typeList"
                :key="item.type"
                :class="item.type === type ? 'checked' : ''"
                @click="checkType(item.type)"
                >{{ item.name }}</span
              >
            </div>
            <div id="renqun"></div>
          </div>
          <div class="list">
            <p>
              游客来源地分析
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
import { getRepair } from '@/api/analysis';
export default {
  name: 'Travel',
  data() {
    return {
      nowSum: 0,
      type: '',
      list: [],
      typeList: [
        {
          type: 'consumption',
          name: '消费'
        },
        {
          type: 'age',
          name: '年龄'
        },
        {
          type: 'sex',
          name: '性别'
        }
      ],
      typeFn: {
        consumption: () => {
          return new Promise((resolve, reject) => {
            getConsumption().then(data => {
              resolve(data);
            });
          });
        },
        age: () => {
          return new Promise((resolve, reject) => {
            getAge().then(data => {
              resolve(data);
            });
          });
        },
        sex: () => {
          return new Promise((resolve, reject) => {
            getSex().then(data => {
              resolve(data);
            });
          });
        }
      },
      TourData: 0,
      qiyeTimer: null,
      AllSum: 0
    };
  },
  computed: {},
  watch: {
    type(newValue, oldValue) {
      this.getValue(newValue);
    }
  },
  methods: {
    // 切换type
    checkType(type) {
      if (this.type === type) {
        return;
      }
      this.type = type;
    },
    // 查询人群画像数据
    echarts_kakou(type, data) {
      let myChart = this.$echarts.init(document.getElementById('renqun'));
      let resizeDiv = document.getElementById('renqun');
      let listener = () => {
        myChart.resize();
      };
      EleResize.on(resizeDiv, listener);
      let option = {
        color: ['#00E5A2', '#00A1D6', '#C56721', '#E94700', '#AD0041', '#9E00BB'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '10%',
          y: 'center',
          // data: ['0~18岁', '19~24岁', '25~35岁', '36~45岁'],
          data: type,
          textStyle: {
            color: '#fff'
          },
          icon: 'circle'
        },
        backgroundColor: 'rgba(0,0,0,.3)',
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['30%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data
          }
        ]
      };
      let index = 0;
      this.qiyeTimer = setInterval(() => {
        var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index
        });
        index = (index + 1) % dataLen;
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        });
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        });
      }, 1000);
      myChart.clear();
      myChart.setOption(option, true);
    },
    // 获取人群画像数据
    async getValue(type) {
      let data = await this.typeFn[type]();
      let typeArr = data.data.map(item => {
        return item.name;
      });
      if (this.qiyeTimer) {
        clearInterval(this.qiyeTimer);
      }
      this.echarts_kakou(typeArr, data.data);
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
            this.list = data.data.slice(0, 5);
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
  },
  components: { PartyBox, countTo }
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
  .div-top {
    display: flow-root;
    margin-bottom: px2rem(9rem);
    > div {
      float: left;
      background: rgba(2, 7, 26, 0.6);
      border-radius: 4px;
      box-sizing: border-box;
      padding: px2rem(10rem) 0 0 px2rem(20rem);
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
      width: px2rem(262rem);
      height: px2rem(72rem);
    }
    .div-out {
      margin-left: px2rem(7rem);
      width: px2rem(262rem);
      height: px2rem(72rem);
    }
  }
  .div-center {
    margin-top: px2rem(9rem);
    > div {
      float: left;
    }
    .echarts {
      width: px2rem(258rem);
      height: px2rem(268rem);
      position: relative;
      .type {
        width: px2rem(235rem);
        height: px2rem(35rem);
        background: rgba(0, 36, 139, 0.2);
        border-radius: 18px;
        position: absolute;
        top: px2rem(36rem);
        left: px2rem(14rem);
        box-sizing: border-box;
        padding: px2rem(4rem) 0 0 px2rem(7rem);
        z-index: 1050;
        span {
          display: inline-block;
          width: px2rem(73rem);
          height: px2rem(27rem);
          line-height: px2rem(27rem);
          border-radius: 50px;
          text-align: center;
          color: #fff;
          font-size: px2rem(14rem);
          cursor: pointer;
          &:hover {
            background: rgba(0, 104, 220, 0.4);
          }
        }
        .checked {
          background: rgba(0, 104, 220, 0.4);
        }
      }
      p {
        margin-bottom: px2rem(9rem);
        color: rgba(128, 165, 206, 1);
        display: flow-root;
        margin-left: px2rem(5rem);
        position: absolute;
        top: px2rem(5rem);
        left: px2rem(5rem);
      }
      > div {
        height: 100%;
      }
    }
    .list {
      width: px2rem(271rem);
      height: px2rem(161rem);
      background: rgba(2, 7, 26, 0.3);
      border-radius: 4px;
      margin-left: px2rem(7rem);
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
          width: px2rem(124rem);
          height: px2rem(71rem);
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
