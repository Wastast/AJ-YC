<template>
  <div class="average_bar" ref="echarts"></div>
</template>

<script>
import { getAverage } from '@/api/party';
import { EchatsMixin } from '@/mixin/echarts';
export default {
  name: 'average_bar',
  mixins: [EchatsMixin],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    // 人均收入柱状图
    echarts_tongji(value) {
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
      };
      let index = 0;
      this.echartsTimer = setInterval(() => {
        var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index
        });
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        });
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        });
        index = (index + 1) % dataLen;
      }, 1000);
      myChart.setOption(option);
    }
  },
  mounted() {
    // 村个人平均收入
    getAverage().then(data => {
      if (data.code === 200) {
        this.echarts_tongji(data);
      }
    });
  }
};
</script>

<style scoped lang="scss">
.average_bar {
  height: 100%;
}
</style>
