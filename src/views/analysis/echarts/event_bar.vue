<template>
  <div class="event_bar" ref="echarts"></div>
</template>

<script>
import { getGovernment } from '@/api/law';
import { EchatsMixin } from '@/mixin/echarts';
export default {
  mixins: [EchatsMixin],
  name: 'event_bar',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    // 事件柱状图
    echarts_evnet(typeArr, data) {
      let myChart = this.resizeEcharts();
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
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
            data: typeArr,
            axisTick: {
              show: true
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: 'rgba(131,178,255,1)',
              fontSize: 13
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
            name: '代办事项',
            type: 'bar',
            barWidth: 20,
            data: data,
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
      };

      this.autoMatic(myChart, option.series[0].data.length);

      myChart.clear();
      myChart.setOption(option, true);
    }
  },
  mounted() {
    // 政府办事事项
    getGovernment().then(value => {
      if (value.code === 200) {
        let { data, type } = value;
        this.echarts_evnet(type, data);
      }
    });
  }
};
</script>

<style scoped lang="scss">
.event_bar {
  height: 100%;
}
</style>
