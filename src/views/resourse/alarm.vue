<template>
  <div class="alarm">
    <party-box title="告警统计" width="592" height="198">
      <template slot="content">
        <div id="statistics"></div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { EleResize } from '@/utils/esresize'
export default {
  name: 'alarm',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    // 统计告警数据
    echarts_statistics() {
      let myChart = this.$echarts.init(document.getElementById('statistics'))
      let resizeDiv = document.getElementById('statistics')
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
              show: false
              // lineStyle: {
              //   color: 'rgba(8,65,107,1)'
              // }
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
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  mounted() {
    this.echarts_statistics()
  },
  components: { PartyBox }
}
</script>

<style scoped lang="scss">
.alarm {
  position: absolute;
  top: px2rem(788rem);
  left: px2rem(41rem);
  z-index: 100;
  #statistics {
    height: 100%;
  }
}
</style>
