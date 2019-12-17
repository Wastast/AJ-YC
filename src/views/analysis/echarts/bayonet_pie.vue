<template>
  <div class="bayonet_pie" ref="echarts"></div>
</template>

<script>
import { getBayonet } from '@/api/analysis';
import { EchatsMixin } from '@/mixin/echarts';
export default {
  mixins: [EchatsMixin],
  name: 'bayonet_pie',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    // 车辆卡口数据
    echarts_car(province, city) {
      let myChart = this.resizeEcharts();
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
            return name;
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
            data: city
          }
        ]
      };
      myChart.clear();
      myChart.setOption(option, true);
    }
  },
  mounted() {
    getBayonet().then(data => {
      if (data.code === 200) {
        this.Enter = data.Enter;
        this.out = data.Out;
        // 省数据
        this.echarts_car(data.dataProvince, data.dataCity);
      }
    });
  }
};
</script>

<style scoped lang="scss">
.bayonet_pie {
  height: 100%;
}
</style>
