<template>
  <div class="Repair">
    <module-box title="乡村旅游">
      <template slot="content">
        <div class="box">
          <div id="repair-time"></div>
          <p class="p-title">
            实时游客数量
          </p>
        </div>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box';
import { EleResize } from '@/utils/esresize';
import { getRepair } from '@/api/analysis';
export default {
  name: 'Repair',
  data() {
    return {
      timer: null,
      qiyeTimer: null
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 事件柱状图
    echarts_evnet(data) {
      let myChart = this.$echarts.init(document.getElementById('repair-time'));
      let resizeDiv = document.getElementById('repair-time');
      let listener = () => {
        myChart.resize();
      };
      EleResize.on(resizeDiv, listener);
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
      this.qiyeTimer = setInterval(() => {
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
        clearInterval(this.qiyeTimer);
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
  components: {
    ModuleBox
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.qiyeTimer);
  }
};
</script>

<style scoped lang="scss">
.Repair {
  position: absolute;
  top: px2rem(440rem);
  right: px2rem(10rem);
  .box {
    width: 100%;
    height: 100%;
    #repair-time {
      height: 100%;
    }
    .p-title {
      position: absolute;
      top: px2rem(40rem);
      left: px2rem(15rem);
      z-index: 1050;
      height: 0.66rem;
      line-height: 0.66rem;
      background: rgba(2, 7, 26, 0.68);
      border-radius: 0.08rem;
      padding: 0 0.32rem;
      color: #80a5ce;
      font-size: px2rem(18rem);
    }
  }
}
</style>
