<template>
  <div class="Repair">
    <module-box title="乡村旅游">
      <template slot="content">
        <div id="repair-time"></div>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box'
import { EleResize } from '@/utils/esresize'

export default {
  name: 'Repair',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    // 事件柱状图
    echarts_evnet() {
      let myChart = this.$echarts.init(document.getElementById('repair-time'))
      let resizeDiv = document.getElementById('repair-time')
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
      myChart.setOption(option)
    }
  },
  mounted() {
    this.echarts_evnet()
  },
  components: {
    ModuleBox
  }
}
</script>

<style scoped lang="scss">
.Repair {
  position: absolute;
  top: px2rem(440rem);
  right: px2rem(10rem);
  #repair-time {
    height: 100%;
  }
}
</style>
