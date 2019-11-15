<template>
  <div class="level">
    <party-box title="水位监测" width="592" height="392">
      <template slot="content">
        <div class="div-top">
          <div class="left">
            <p class="top">实时水位监测</p>
            <p class="value">{{ value[new Date().getHours()] }}</p>
          </div>
          <div class="right">
            <p class="top">本月水位峰值</p>
            <p class="value">13.06</p>
          </div>
        </div>
        <div class="echarts">
          <p class="p-title">
            24h水位监测
          </p>
          <div id="water"></div>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { EleResize } from '@/utils/esresize'
// import { getRepair } from '@/api/analysis'
export default {
  name: 'level',
  data() {
    return {
      timer: null,
      hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      value: [
        10.03,
        11.04,
        12.04,
        11.3,
        12.06,
        11.1,
        10.8,
        10.04,
        11.8,
        12.4,
        11.7,
        12.05,
        11.6,
        10.08,
        10.7,
        11.1,
        12.6,
        11.08,
        12.9,
        11.04,
        10.5,
        11.4,
        11.08,
        10.09
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 事件柱状图
    echarts_evnet(data) {
      let myChart = this.$echarts.init(document.getElementById('water'))
      let resizeDiv = document.getElementById('water')
      let listener = () => {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // data: ['人社局', '医保局', '税务', '民政', '残联', '村自有事'],
            // data: data.hours,
            data: this.hours.slice(0, new Date().getHours() + 1),
            axisTick: {
              show: true
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: 'rgba(131,178,255,1)'
            },
            show: true
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: true,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: 'rgba(131,178,255,1)'
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(8,65,107,1)'
              }
            }
          }
        ],
        series: [
          {
            name: '水位监测',
            type: 'line',
            smooth: true,
            //  symbol: "none", //去掉折线点
            stack: 100,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(59,108,246,1)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(113,243,252,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(80,175,248,1)'
                  }
                ]),
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 0.5,
                  type: 'solid',
                  color: '#CC56CB'
                }
              },
              emphasis: {
                color: '#02675f',
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 0.5,
                  type: 'dotted',
                  color: '#02675f'
                }
              }
            },
            symbolSize: 5,
            areaStyle: {
              normal: {}
            },
            // data: data.number
            data: this.value.slice(0, new Date().getHours() + 1)
          }
        ]
      }
      let index = 0
      this.qiyeTimer = setInterval(() => {
        var dataLen = option.series[0].data.length
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index
        })
        index = (index + 1) % dataLen
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        })
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
      }, 1000)
      myChart.clear()
      myChart.setOption(option, true)
    },
    // 定时请求数据
    STI_getValue() {
      // 请求小时旅游数据
      // getRepair().then(data => {
      //   if (data.code === 200) {
      //     this.echarts_evnet(data)
      //   }
      // })
      // this.timer = setInterval(() => {
      //   clearInterval(this.qiyeTimer)
      //   getRepair().then(data => {
      //     if (data.code === 200) {
      //       this.echarts_evnet(data)
      //     }
      //   })
      // }, 1000 * 30)
    }
  },
  mounted() {
    this.echarts_evnet()
    this.STI_getValue()
  },
  beforeDestroy() {
    clearInterval(this.qiyeTimer)
  },
  components: { PartyBox }
}
</script>

<style scoped>
.level >>> .content {
  padding: 0.38rem 0.36rem 0 0.52rem;
  box-sizing: border-box;
}
</style>

<style scoped lang="scss">
.level {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(662rem);
  z-index: 100;
  .div-top {
    height: px2rem(88rem);
    background: rgba(3, 12, 44, 0.7);
    border-radius: 4px;
    color: rgba(255, 255, 255, 1);
    > div {
      float: left;
      position: absolute;
      display: flow-root;
      top: px2rem(30rem);
      .top {
        color: rgba(255, 255, 255, 1);
      }
      .value {
        margin-top: px2rem(10rem);
        font-size: px2rem(44rem);
        font-family: 'DS-DIGII';
      }
    }
    .left {
      left: px2rem(50rem);
      .value {
        color: #00f0ff;
      }
    }
    .right {
      left: px2rem(329rem);
      .value {
        color: #bb500f;
      }
    }
  }
  .echarts {
    position: relative;
    width: px2rem(548rem);
    height: px2rem(249rem);
    margin-top: px2rem(13rem);
    .p-title {
      position: absolute;
      text-align: center;
      line-height: px2rem(49rem);
      width: px2rem(130rem);
      color: #187ed5;
      background: rgba(3, 12, 44, 0.7);
      border-radius: 4px;
    }
    #water {
      height: 100%;
    }
  }
}
</style>
