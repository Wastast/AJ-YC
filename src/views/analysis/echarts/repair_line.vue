<template>
  <div class="repair_line" ref="echarts"></div>
</template>

<script>
import { getRepair } from '@/api/analysis';
import { EchatsMixin } from '@/mixin/echarts';
export default {
  mixins: [EchatsMixin],
  name: 'repair_line',
  data() {
    return {
      timer: null
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 事件柱状图
    echarts_evnet(data) {
      // 混入方法
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
            data: data.hours,
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
            name: '游客小时数据',
            type: 'line',
            smooth: true,
            //  symbol: "none", //去掉折线点
            stack: 100,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(59,108,246,1)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(113,243,252,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(80,175,248,1)'
                  }
                ]),
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 0.5,
                  type: 'solid',
                  color: '#CC56CB'
                }
              },
              emphasis: {
                color: '#02675f',
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 0.5,
                  type: 'dotted',
                  color: '#02675f'
                }
              }
            },
            symbolSize: 5,
            areaStyle: {
              normal: {}
            },
            data: data.number
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
        index = (index + 1) % dataLen;
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
      }, 1000);

      myChart.clear();
      myChart.setOption(option, true);
    },
    // 定时请求数据
    STI_getValue() {
      // 请求小时旅游数据
      getRepair().then(data => {
        if (data.code === 200) {
          this.echarts_evnet(data);
        }
      });
      this.timer = setInterval(() => {
        clearInterval(this.echartsTimer);
        getRepair().then(data => {
          if (data.code === 200) {
            this.echarts_evnet(data);
          }
        });
      }, 1000 * 30);
    }
  },
  mounted() {
    this.STI_getValue();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="scss">
.repair_line {
  height: 100%;
}
</style>
