<template>
  <div class="zhanshi">
    <party-box title="村情展示" width="517" height="851">
      <template slot="content">
        <div class="div">
          <p class="p-title">
            村集体经济总收入: 万元
          </p>
          <div id="shouru"></div>
        </div>
        <div class="div">
          <p class="p-title">
            村集体经济总收入: 万元
          </p>
          <div id="tongji"></div>
        </div>
        <ul class="ul">
          <li class="li" v-for="(item, index) of list" :key="index">
            <p class="p-title">
              {{ item.title }}
            </p>
            <div class="div-imgbox">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="div-text">
              <p class="p-value">
                <countTo :startVal="parseInt(0)" :endVal="parseFloat(item.value)" :duration="4000"></countTo>
              </p>
              <p class="p-unit">单位: {{ item.unit }}</p>
            </div>
          </li>
        </ul>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { EleResize } from '@/utils/esresize'
import { getCollective, getAverage } from '@/api/party'
import { getDesc } from '@/api/analysis'
import countTo from 'vue-count-to'
export default {
  name: 'zhanshi',
  data() {
    return {
      list: [
        {
          imgUrl: require('@/assets/party/renkoujiankangxinxipingtaix@2x.png'),
          title: '总人数',
          unit: '人',
          value: '1060'
        },
        {
          imgUrl: require('@/assets/party/fangwugeju@2x.png'),
          title: '总户数',
          unit: '户',
          value: '280'
        },
        {
          imgUrl: require('@/assets/party/dangjianguanli@2x.png'),
          title: '党员人数',
          unit: '人',
          value: '56'
        },
        {
          imgUrl: require('@/assets/party/wuxingkehu@2x.png'),
          title: '5星之家',
          unit: '户',
          value: 37
        }
      ],
      jitiTimer: null,
      gerenTimer: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 收入柱状图
    echarts_shouru(value) {
      let myChart = this.$echarts.init(document.getElementById('shouru'))
      let resizeDiv = document.getElementById('shouru')
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
        backgroundColor: 'rgba(0,0,0,.1)',
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: value.year,
            axisTick: {
              show: false
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
            name: '集体收入',
            type: 'bar',
            barWidth: 20,
            data: value.data,
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#fff'
                }
              }
            },
            // background:linear-gradient(0 deg,rgba(100,211,243,1) 0%,rgba(54,132,247,1) 100%);
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(100,211,243,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(54,132,247,1)'
                  }
                ])
              }
            }
          }
        ]
      }
      let index = 0
      this.jitiTimer = setInterval(() => {
        var dataLen = option.series[0].data.length
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index
        })
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
        index = (index + 1) % dataLen
      }, 1000)
      myChart.setOption(option)
    },
    // 人均收入柱状图
    echarts_tongji(value) {
      let myChart = this.$echarts.init(document.getElementById('tongji'))
      let resizeDiv = document.getElementById('tongji')
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
        backgroundColor: 'rgba(0,0,0,.1)',
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: value.year,
            axisTick: {
              show: false
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
            name: '人均收入',
            type: 'bar',
            barWidth: 20,
            data: value.data,
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(245,156,0,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(225,95,0,1)'
                  }
                ])
              }
            }
          }
        ]
      }
      let index = 0
      this.gerenTimer = setInterval(() => {
        var dataLen = option.series[0].data.length
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index
        })
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
        index = (index + 1) % dataLen
      }, 1000)
      myChart.setOption(option)
    }
  },
  mounted() {
    // 集体总收入
    getCollective().then(data => {
      if (data.code === 200) {
        this.echarts_shouru(data)
      }
    })
    // 村个人平均收入
    getAverage().then(data => {
      if (data.code === 200) {
        this.echarts_tongji(data)
      }
    })
    getDesc().then(data => {
      if (data.code === 200) {
        this.list.forEach((item, index) => {
          let name = item.title
          data.data.map(e => {
            if (e.name === name) {
              item.value = e.value
            }
          })
        })
      }
    })
  },
  beforeDestroy() {
    clearInterval(this.jitiTimer)
    clearInterval(this.gerenTimer)
  },
  components: {
    PartyBox,
    countTo
  }
}
</script>

<style scoped lang="scss">
.zhanshi {
  position: absolute;
  top: px2rem(130rem);
  left: px2rem(50rem);
  z-index: 100;
  .div {
    display: flow-root;
    width: px2rem(484rem);
    height: px2rem(286rem);
    margin-top: px2rem(9rem);
    margin-left: px2rem(14rem);
    overflow: hidden;
    position: relative;
    .p-title {
      position: absolute;
      top: px2rem(10rem);
      left: px2rem(10rem);
      z-index: 1050;
      height: 0.66rem;
      line-height: 0.66rem;
      background: rgba(2, 7, 26, 0.68);
      border-radius: 0.08rem;
      padding: 0 0.32rem;
      color: #80a5ce;
    }
    div {
      width: 100%;
      height: 100%;
    }
  }
  .ul {
    display: flow-root;
    margin: px2rem(20rem) 0 0 px2rem(14rem);
    .li {
      float: left;
      width: px2rem(237rem);
      height: px2rem(105rem);
      background: rgba(2, 8, 28, 0.3);
      border-radius: 5px;
      position: relative;
      .p-title {
        font-size: px2rem(14rem);
        font-family: FZLTCHK;
        color: rgba(161, 207, 255, 0.7);
        line-height: px2rem(31rem);
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 px2rem(19rem) 0 px2rem(11rem);
        background: rgba(2, 7, 26, 0.9);
        border-radius: px2rem(5rem);
      }
      > div {
        float: left;
      }
      .div-imgbox {
        width: px2rem(44rem);
        height: px2rem(44rem);
        margin: px2rem(42rem) 0 0 px2rem(20rem);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .div-text {
        margin-left: px2rem(25rem);
        .p-value {
          color: #fff;
          font-family: carScroll;
          font-size: px2rem(38rem);
          margin-top: px2rem(30rem);
        }
        .p-unit {
          font-size: px2rem(12rem);
          color: rgba(128, 165, 206, 1);
          margin-top: px2rem(14rem);
        }
      }
      &:nth-child(even) {
        margin-left: px2rem(10rem);
      }
      &:nth-child(n + 3) {
        margin-top: px2rem(8rem);
      }
    }
  }
}
</style>
