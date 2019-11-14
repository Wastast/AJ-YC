<template>
  <div class="Event">
    <module-box :title="typeValue[moduleType]">
      <template slot="content">
        <div id="events"></div>
        <div class="div-btn" @click="checkModule()">
          {{ moduleType == 'run' ? '满意度调查' : '最多跑一次' }}
        </div>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box'
import { EleResize } from '@/utils/esresize'
export default {
  name: 'Event',
  data() {
    return {
      moduleType: '',
      typeValue: {
        run: '最多跑一次',
        manyi: '满意度调查'
      }
    }
  },
  computed: {},
  watch: {
    moduleType(newValue, oldValue) {
      if (this.moduleType === 'run') {
        // 车辆卡口
        this.echarts_evnet()
      } else {
        // 来源地分析
        this.ecahrt_manyi()
      }
    }
  },
  methods: {
    // 事件柱状图
    echarts_evnet() {
      let myChart = this.$echarts.init(document.getElementById('events'))
      let resizeDiv = document.getElementById('events')
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
            data: ['人社局', '医保局', '税务', '民政', '残联', '村自有事'],
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
            nameTextStyle: {
              color: '#fff'
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
            data: [10, 52, 200, 334, 390, 300],
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
      myChart.clear()
      myChart.setOption(option, true)
    },
    // 满意度饼图
    ecahrt_manyi() {
      let myChart = this.$echarts.init(document.getElementById('events'))
      let resizeDiv = document.getElementById('events')
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
      myChart.clear()
      myChart.setOption(option, true)
    },
    checkModule() {
      if (this.moduleType === 'run') {
        this.moduleType = 'manyi'
      } else {
        this.moduleType = 'run'
      }
    }
  },
  mounted() {
    this.moduleType = 'run'
  },
  components: {
    ModuleBox
  }
}
</script>

<style scoped lang="scss">
.Event {
  position: absolute;
  top: px2rem(443rem);
  left: px2rem(20rem);
  #events {
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
    cursor: pointer;
    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>
