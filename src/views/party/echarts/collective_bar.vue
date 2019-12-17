<template>
  <div class="collective_bar" ref="echarts"></div>
</template>

<script>
import { getCollective } from '@/api/party';
import { EchatsMixin } from '@/mixin/echarts';
export default {
  name: 'collective_bar',
  mixins: [EchatsMixin],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    // 收入柱状图
    echarts_shouru(value) {
      let myChart = this.resizeEcharts();
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
      };
      this.autoMatic(myChart, option.series[0].data.length);
      myChart.setOption(option);
    }
  },
  mounted() {
    // 集体总收入
    getCollective().then(data => {
      if (data.code === 200) {
        this.echarts_shouru(data);
      }
    });
  }
};
</script>

<style scoped lang="scss">
.collective_bar {
  height: 100%;
}
</style>
