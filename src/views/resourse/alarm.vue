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
    return {
      qiyeTimer: null
    }
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
            data: [2, 6, 10, 5, 7],
            lineStyle: {
              color: '#4FA6F2'
            }
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
      myChart.setOption(option)
    }
  },
  mounted() {
    this.echarts_statistics()
  },
  components: { PartyBox },
  beforeDestroy() {
    clearInterval(this.qiyeTimer)
  }
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
