<template>
  <div class="zhanshi">
    <party-box title="村情展示" width="517" height="851">
      <template slot="content">
        <div class="div" id="shouru"></div>
        <div class="div" id="tongji"></div>
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
                {{ item.value }}
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
export default {
  name: 'zhanshi',
  data() {
    return {
      list: [
        {
          imgUrl: require('@/assets/party/renkoujiankangxinxipingtaix@2x.png'),
          title: '总人口数',
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
          title: '五星之家',
          unit: '户',
          value: 37
        }
      ]
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
            name: '村集体经济总收入: 万元',
            nameTextStyle: {
              color: 'rgba(161,207,255,.7)',
              backgroundColor: 'rgba(2,8,28,.5)',
              padding: [0, 13, 0, 11],
              lineHeight: '31',
              borderRadius: 5
            },
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
            name: '客流量',
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
      myChart.setOption(option)
    },
    // 统计柱状图
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
            name: '村人均收入统计: 万元',
            nameTextStyle: {
              color: 'rgba(161,207,255,.7)',
              backgroundColor: 'rgba(2,8,28,.8)',
              padding: [0, 13, 0, 11],
              lineHeight: '31',
              borderRadius: 5
            },
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
            name: '客流量',
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
  },
  components: {
    PartyBox
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
