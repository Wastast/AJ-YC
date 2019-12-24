<template>
  <div class="orign_bar" ref="echarts"></div>
</template>

<script>
import { getOrign } from '@/api/analysis';
import { EchatsMixin } from '@/mixin/echarts';
export default {
  mixins: [EchatsMixin],
  name: 'orign_bar',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    // 来源地分析
    echarts_laiyuan(data) {
      let myChart = this.resizeEcharts();
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
            data: data.cityname,
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
            name: '省内车辆来源数量',
            nameTextStyle: {
              color: 'rgba(161,207,255,.7)',
              backgroundColor: 'rgba(2,8,28,.5)',
              padding: [0, 13, 0, 100],
              lineHeight: '31',
              borderRadius: 5,
              fontSize: 20
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
            name: '来源数量',
            type: 'bar',
            barWidth: 20,
            // data: [10, 52, 200, 334, 390, 300],
            data: data.number,
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

      this.autoMatic(myChart, option.series[0].data.length, 2000);

      myChart.clear();
      myChart.setOption(option, true);
    }
  },
  mounted() {
    getOrign().then(data => {
      if (data.code === 200) {
        this.echarts_laiyuan(data.data);
      }
    });
  }
};
</script>

<style scoped lang="scss">
.orign_bar {
  height: 100%;
}
</style>
