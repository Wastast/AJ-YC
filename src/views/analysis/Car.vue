<template>
  <div class="Car">
    <module-box :title="'车辆卡口分析'">
      <template slot="content">
        <div id="kakou"></div>
        <div class="div-btn" @click="checkModule()">
          {{ moduleType == 'car' ? '来源地分析' : '车辆卡口数据' }}
        </div>
        <div class="div-test" v-if="moduleType === 'car'">
          <p class="p">
            <span class="span">总进</span>
            {{ Enter }}
          </p>
          <p class="p">
            <span class="span">总出</span>
            {{ out }}
          </p>
        </div>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box'
import { EleResize } from '@/utils/esresize'
import { getBayonet, getOrign } from '@/api/analysis'
export default {
  name: 'Car',
  data() {
    return {
      Enter: '0',
      out: '0',
      moduleType: '',
      typeValue: {
        origin: '来源地分析',
        car: '车辆卡口数据'
      },
      qiyeTimer: null
    }
  },
  computed: {},
  watch: {
    moduleType(newValue, oldValue) {
      if (this.qiyeTimer) {
        clearInterval(this.qiyeTimer)
      }
      if (this.moduleType === 'car') {
        // 车辆卡口
        this.getCar()
      } else {
        // 来源地分析
        this.getorigin()
      }
    }
  },
  methods: {
    // 车辆卡口数据
    echarts_car(province, city) {
      let myChart = this.$echarts.init(document.getElementById('kakou'))
      let resizeDiv = document.getElementById('kakou')
      let listener = () => {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          data: ['省内', '省外'],
          orient: 'vertical',
          // top: 'center',
          left: '10%',
          icon: 'roundRect',
          // right: '20%',
          textStyle: {
            color: '#83b2ff',
            lineHeight: 10,
            fontWeight: 'bold',
            fontSize: 14
          },
          formatter: name => {
            return name
          }
        },
        series: [
          {
            color: ['#644EF2', '#0C90FE'],
            name: '车辆卡口分析',
            type: 'pie',
            radius: ['70%', '85%'],
            // center: ['30%', '50%'],
            // data: [{ value: 310, name: '省外' }, { value: 335, name: '省内' }],
            data: province,
            itemStyle: {
              shadowColor: 'rgba(255, 255, 255, .2)',
              shadowBlur: 10
            },
            label: {
              normal: {
                show: false
              }
            }
          },
          {
            color: ['#050E24'],
            name: '车辆卡口分析',
            type: 'pie',
            radius: ['50%', '70%'],
            hoverAnimation: false,
            legendHoverLink: false,
            data: [{ value: 0, name: '不显示' }],
            itemStyle: {
              shadowColor: 'rgba(255, 255, 255, .2)',
              shadowBlur: 10
            },
            label: {
              normal: {
                show: false
              }
            },
            tooltip: {
              show: false
            }
          },
          {
            color: ['rgba(232,56,107,1)', 'rgba(241,152,76,1)'],
            name: '车辆卡口分析',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '50%'],
            label: {
              normal: {
                show: true,
                position: 'inner',
                fontSize: 18
              }
            },
            itemStyle: {
              shadowColor: 'rgba(255, 255, 255, .2)',
              shadowBlur: 10
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            // data: [{ value: 679, name: '市内' }, { value: 1548, name: '市外' }]
            data: city
          }
        ]
      }
      myChart.clear()
      myChart.setOption(option, true)
    },
    // 来源地分析
    echarts_laiyuan(data) {
      let myChart = this.$echarts.init(document.getElementById('kakou'))
      let resizeDiv = document.getElementById('kakou')
      let listener = () => {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
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
              padding: [0, 13, 0, 11],
              lineHeight: '31',
              borderRadius: 5
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
        index = (index + 1) % dataLen
      }, 1000)
      myChart.clear()
      myChart.setOption(option, true)
    },
    // 切换显示数据模块
    checkModule() {
      if (this.moduleType === 'car') {
        this.moduleType = 'origin'
      } else {
        this.moduleType = 'car'
      }
    },
    // 获取车辆卡口数据
    getCar() {
      getBayonet().then(data => {
        if (data.code === 200) {
          this.Enter = data.Enter
          this.out = data.Out
          // 省数据
          this.echarts_car(data.dataProvince, data.dataCity)
        }
      })
    },
    // 获取来源地分析数据
    getorigin() {
      getOrign().then(data => {
        if (data.code === 200) {
          this.echarts_laiyuan(data.data)
        }
      })
    }
  },
  mounted() {
    this.moduleType = 'car'
  },
  components: {
    ModuleBox
  }
}
</script>

<style scoped lang="scss">
.Car {
  position: absolute;
  top: px2rem(737rem);
  left: px2rem(20rem);
  #kakou {
    height: 100%;
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
  .div-test {
    position: absolute;
    top: px2rem(133rem);
    left: px2rem(45rem);
    z-index: 100;
    .p {
      color: rgba(131, 178, 255, 1);
      font-weight: bold;
      .span {
        font-size: px2rem(16rem);
        margin-right: 5px;
        font-weight: 400;
      }
      &:nth-child(n + 2) {
        margin-top: px2rem(12rem);
      }
    }
  }
}
</style>
