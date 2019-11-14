<template>
  <div class="apprun">
    <party-box title="最多跑一次" :slice="5" width="532" height="850">
      <template slot="content">
        <div class="div-top">
          <div class="left">
            <div id="satisfied"></div>
            <p class="p">
              满意度调查
            </p>
          </div>
          <div class="right">
            <ul class="ul">
              <li class="li" v-for="item of satisfiedList" :key="item.color">
                <div class="li-left">
                  <dl>
                    <dt :style="{ color: item.color }">
                      {{ item.type }}
                    </dt>
                  </dl>
                </div>
                <div class="li-center">{{ item.baifen }}%</div>
                <div class="li-right">
                  <img :src="item.imgUrl" alt="" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="box statistics-box">
          <div id="statistics"></div>
          <p class="p">
            政务办事事项
          </p>
        </div>
        <div class="box onweek-box">
          <div id="onweek"></div>
          <p class="p">
            每周办件量情况
          </p>
        </div>
        <div class="box frequency-box">
          <div id="frequency"></div>
          <p class="p">
            高频事项代办数量
          </p>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { EleResize } from '@/utils/esresize'
export default {
  name: 'apprun',
  data() {
    return {
      satisfiedList: [
        {
          type: '非常满意',
          value: '2102人',
          baifen: '99.08',
          imgUrl: require('@/assets/law/up.png'),
          color: '#ECB32B'
        },
        {
          type: '满意',
          value: '2102人',
          baifen: '0.9',
          imgUrl: require('@/assets/law/deng.png'),
          color: '#00CAE8'
        },
        {
          type: '不满意',
          value: '2102人',
          baifen: '0.02',
          imgUrl: require('@/assets/law/down.png'),
          color: '#C33700'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 满意度echarts
    echarts_satisfied() {
      let myChart = this.$echarts.init(document.getElementById('satisfied'))
      let resizeDiv = document.getElementById('satisfied')
      let listener = () => {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
      let option = {
        color: ['#044B9C', '#ECB32B', '#CB371F'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '10%',
          y: 'center',
          data: ['非常满意', '满意', '不满意'],
          textStyle: {
            color: '#fff'
          },
          icon: 'circle'
        },
        backgroundColor: 'rgba(0,0,0,.3)',
        series: [
          {
            name: '满意度调查',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['30%', '55%'],
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
            data: [
              { value: 99.08, name: '非常满意' },
              { value: 0.9, name: '满意' },
              { value: 0.02, name: '不满意' }
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    // 收入柱状图
    echarts_statistics() {
      let myChart = this.$echarts.init(document.getElementById('statistics'))
      let resizeDiv = document.getElementById('statistics')
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
            data: ['人社局', '医保局', '税务', '民政', '残联', '村自有事'],
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
            name: '客流量',
            type: 'bar',
            barWidth: 20,
            data: [7, 1, 1, 4, 10, 21],
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
    // 每周办件量情况
    echart_onweek() {
      let myChart = this.$echarts.init(document.getElementById('onweek'))
      let resizeDiv = document.getElementById('onweek')
      let listener = () => {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        backgroundColor: 'rgba(0,0,0,.1)',
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五'],
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
        },
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
            name: '本周',
            type: 'line',
            stack: '总量',
            data: [6, 12, 25, 3, 6],
            lineStyle: {
              color: '#4FA6F2'
            }
          },
          {
            name: '上周',
            type: 'line',
            stack: '总量',
            lineStyle: {
              color: '#ECB32B'
            },
            data: [2, 20, 16, 1, 18]
          }
        ]
      }
      myChart.setOption(option)
    },
    // 高频事项echarts
    echart_frequency() {
      let myChart = this.$echarts.init(document.getElementById('frequency'))
      let resizeDiv = document.getElementById('frequency')
      let listener = () => {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
      let option = {
        color: ['#044B9C', '#ECB32B', '#CB371F'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '20%',
          y: 'center',
          data: [
            '养老保险登记',
            '医疗保险登记',
            '生育登记',
            '再生育审批',
            '法律援助申报',
            '其他事项'
          ],
          textStyle: {
            color: '#fff'
          },
          icon: 'circle'
        },
        backgroundColor: 'rgba(0,0,0,.1)',
        series: [
          {
            name: '高频事项代办数量',
            type: 'pie',
            // radius: ['40%', '60%'],
            radius: '65%',
            center: ['30%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
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
            data: [
              { value: 300, name: '养老保险登记' },
              { value: 400, name: '医疗保险登记' },
              { value: 100, name: '生育登记' },
              { value: 100, name: '再生育审批' },
              { value: 50, name: '法律援助申报' },
              { value: 50, name: '其他事项' }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  mounted() {
    this.echarts_satisfied()
    this.echarts_statistics()
    this.echart_onweek()
    this.echart_frequency()
  },
  components: { PartyBox }
}
</script>

<style scoped>
.apprun >>> .content {
  box-sizing: border-box;
  padding: 0.3rem 0.25rem 0 0.3rem;
}
</style>

<style scoped lang="scss">
@import url('~@/icons/numberIcon/font.css');
.apprun {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(1344rem);
  z-index: 100;
  .div-top {
    display: flow-root;
    > div {
      float: left;
    }
    .left {
      width: px2rem(248rem);
      height: px2rem(200rem);
      position: relative;
      .p {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1050;
        height: px2rem(33rem);
        line-height: px2rem(33rem);
        background: rgba(2, 7, 26, 0.68);
        border-radius: px2rem(4rem);
        padding: 0 px2rem(16rem);
        color: rgba(128, 165, 206, 1);
      }
      #satisfied {
        height: 100%;
      }
    }
    .right {
      margin-left: px2rem(6rem);
      .ul {
        .li {
          width: px2rem(245rem);
          height: px2rem(56rem);
          background: rgba(2, 7, 26, 0.3);
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: px2rem(17rem);
          color: #fff;
          position: relative;
          font-family: 'DS-DIGII';
          > div {
            float: left;
          }
          &:nth-child(n + 2) {
            margin-top: px2rem(5rem);
          }
          .li-left {
            dt {
              font-size: px2rem(16rem);
              margin-top: px2rem(19rem);
            }
            dd {
              margin-top: px2rem(8rem);
            }
          }
          .li-center {
            position: absolute;
            left: px2rem(120rem);
            line-height: px2rem(56rem);
            font-size: px2rem(30rem);
          }
          .li-right {
            position: absolute;
            bottom: px2rem(20rem);
            right: px2rem(10rem);
            width: px2rem(12rem);
            height: px2rem(16rem);
          }
        }
      }
    }
  }
  .box {
    .p {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1050;
      height: px2rem(33rem);
      line-height: px2rem(33rem);
      background: rgba(2, 7, 26, 0.68);
      border-radius: px2rem(4rem);
      padding: 0 px2rem(16rem);
      color: rgba(128, 165, 206, 1);
    }
  }
  .statistics-box {
    position: relative;
    height: px2rem(200rem);
    margin-top: px2rem(9rem);
    #statistics {
      height: 100%;
    }
  }
  .onweek-box {
    position: relative;
    height: px2rem(200rem);
    margin-top: px2rem(9rem);
    #onweek {
      height: 100%;
    }
  }
  .frequency-box {
    position: relative;
    height: px2rem(200rem);
    margin-top: px2rem(9rem);
    #frequency {
      height: 100%;
    }
  }
}
</style>
