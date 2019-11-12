<template>
  <div class="Car">
    <module-box title="车辆卡口数据">
      <template slot="content">
        <div id="kakou"></div>
        <div class="div-btn">
          来源地分析
        </div>
        <div class="div-test">
          <p class="p" v-for="item of carValue" :key="item.value">
            <span class="span">{{ item.type }}</span>
            {{ item.value }}
          </p>
        </div>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box'
import { EleResize } from '@/utils/esresize'
export default {
  name: 'Car',
  data() {
    return {
      carValue: [
        {
          type: '进',
          value: '10683'
        },
        {
          type: '出',
          value: '7938'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 车辆卡口数据
    echarts_car() {
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
            color: '#fff',
            lineHeight: 10,
            fontWeight: 'bold',
            fontSize: 12
          },
          formatter: name => {
            return name
          }
        },
        series: [
          {
            color: ['#644EF2', '#0C90FE'],
            name: '高速卡口',
            type: 'pie',
            radius: ['70%', '85%'],
            // center: ['30%', '50%'],
            data: [{ value: 310, name: '省外' }, { value: 335, name: '省内' }],
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
            name: '高速卡口',
            type: 'pie',
            radius: ['50%', '70%'],
            data: [{ value: 310, name: '不显示' }],
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
            color: ['rgba(232,56,107,1)', 'rgba(241,152,76,1)'],
            name: '高速卡口',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '50%'],
            label: {
              normal: {
                show: true,
                position: 'inner'
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
            data: [{ value: 679, name: '市内' }, { value: 1548, name: '市外' }]
          }
        ]
      }
      myChart.setOption(option, true)
    }
  },
  mounted() {
    this.echarts_car()
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
    cursor: pointer;
    &:hover {
      filter: brightness(1.2);
    }
  }
  .div-test {
    position: absolute;
    top: px2rem(133rem);
    left: px2rem(55rem);
    z-index: 100;
    .p {
      color: rgba(131, 178, 255, 1);
      font-weight: bold;
      .span {
        font-size: 12px;
        margin-right: 5px;
        font-weight: 400;
      }
      &:nth-child(n+2) {
        margin-top: px2rem(12rem);
      }
    }
  }
}
</style>
