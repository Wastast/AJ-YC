<template>
  <div class="huanjing_line" ref="echarts"></div>
</template>

<script>
import { getEsunValue } from '@/api/analysis';
import { EchatsMixin } from '@/mixin/echarts';
export default {
  mixins: [EchatsMixin],
  props: ['type'],
  name: 'huanjing_line',
  data() {
    return {
      typeList: {
        pm25: '1',
        pres: '2',
        hum: '3',
        anion: '4',
        windSpd: '5',
        pcpn: '6',
        co2: '7',
        guoke: '8'
      }
    };
  },
  computed: {},
  watch: {
    type() {
      if (this.type) {
        this.gethuanjing(this.typeList[this.type]);
      }
    }
  },
  methods: {
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
                  width: 3,
                  type: 'solid',
                  color: '#ff8a00'
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
            data: data.datas
            // data: [6, 1, 2, 3, 4, 5]
          }
        ]
      };

      this.autoMatic(myChart, option.series[0].data.length);

      myChart.clear();
      myChart.setOption(option, true);
    },
    // 获取环境数据
    gethuanjing(code) {
      getEsunValue({
        type: code
      }).then(data => {
        if (data.code === 200) {
          this.echarts_evnet(data.result);
        }
      });
    }
  },
  mounted() {
    this.gethuanjing(this.typeList[this.type]);
  }
};
</script>

<style scoped lang="scss">
.huanjing_line {
  height: 100%;
}
</style>
