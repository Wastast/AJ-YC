<template>
  <div class="Event">
    <module-box :title="'最多跑一次'">
      <template slot="content">
        <div id="events"></div>
        <div class="div-btn" @click="checkModule()">
          {{ moduleType == 'run' ? '群众满意率' : '政务代办事项' }}
        </div>
        <p class="p-title">
          {{ typeValue[moduleType] }}
        </p>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box';
import { EleResize } from '@/utils/esresize';
import { getSatisfied, getGovernment } from '@/api/law';
export default {
  name: 'Event',
  data() {
    return {
      moduleType: '',
      typeValue: {
        run: '余村政务代办事项',
        manyi: '代办办件群众满意率'
      },
      qiyeTimer: null
    };
  },
  computed: {},
  watch: {
    moduleType(newValue, oldValue) {
      if (this.qiyeTimer) {
        clearInterval(this.qiyeTimer);
      }
      if (this.moduleType === 'run') {
        // 政府办事事项
        getGovernment().then(data => {
          if (data.code === 200) {
            let typeArr = data.type;
            this.echarts_evnet(typeArr, data.data);
          }
        });
      } else {
        // 请求满意度调查数据
        getSatisfied().then(data => {
          if (data.code === 200) {
            let typeArr = data.data.map(item => {
              return item.name;
            });
            this.ecahrt_manyi(typeArr, data.data);
          }
        });
      }
    }
  },
  methods: {
    // 事件柱状图
    echarts_evnet(typeArr, data) {
      let myChart = this.$echarts.init(document.getElementById('events'));
      let resizeDiv = document.getElementById('events');
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
      let index = 0;
      this.qiyeTimer = setInterval(() => {
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
      myChart.clear();
      myChart.setOption(option, true);
    },
    // 满意度饼图
    ecahrt_manyi(typeArr, data) {
      let myChart = this.$echarts.init(document.getElementById('events'));
      let resizeDiv = document.getElementById('events');
      let listener = () => {
        myChart.resize();
      };
      EleResize.on(resizeDiv, listener);
      let option = {
        color: ['#044B9C', '#ECB32B', '#CB371F'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '10%',
          y: 'center',
          data: typeArr,
          textStyle: {
            color: '#fff'
          },
          icon: 'circle'
        },
        series: [
          {
            name: '满意度调查',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['30%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data
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
    checkModule() {
      if (this.moduleType === 'run') {
        this.moduleType = 'manyi';
      } else {
        this.moduleType = 'run';
      }
    }
  },
  mounted() {
    this.moduleType = 'run';
  },
  components: {
    ModuleBox
  }
};
</script>

<style scoped lang="scss">
.Event {
  position: absolute;
  top: px2rem(443rem);
  left: px2rem(20rem);
  #events {
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
  .div-btn {
    position: absolute;
    top: px2rem(45rem);
    right: px2rem(35rem);
    z-index: 1050;
    padding: px2rem(10rem);
    color: rgba(131, 178, 255, 1);
    text-align: center;
    background: rgba(97, 206, 243, 0);
    border: 1px solid rgba(57, 114, 154, 1);
    box-shadow: 0 0 5px rgba(31, 61, 139, 1);
    border-radius: 2px;
    font-size: px2rem(18rem);
    cursor: pointer;
    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>
