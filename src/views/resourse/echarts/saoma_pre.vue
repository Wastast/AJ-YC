<template>
  <div class="car_bar" ref="echarts"></div>
</template>

<script>
import { getSaoma } from '@/api/resourse';
import { EchatsMixin } from '@/mixin/echarts';
export default {
  mixins: [EchatsMixin],
  name: 'car_bar',
  data() {
    return {
      provinceIn: {
        name: '省内',
        value: 0
      },
      provinceOut: {
        name: '省外',
        value: 0
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 卡口数据
    echarts_kakou(data) {
      let myChart = this.resizeEcharts();
      let option = {
        color: ['RGBA(65, 168, 209, 1)', '#2B41A9', '#D04461', '#398B7A', '#B3986E', '#C3529D'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // backgroundColor: 'rgba(0,0,0,.3)',
        legend: {
          orient: 'vertical',
          right: '15%',
          top: 'center',
          data: data.name,
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '扫码量数据分析',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['30%', '60%'],
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
            data: data.value
          }
        ]
      };
      this.autoMatic(myChart, option.series[0].data.length, 2000);
      myChart.setOption(option);
    }
  },
  mounted() {
    // 获取车辆卡口数据
    getSaoma({
      type: 1
    }).then(data => {
      if (data.code === 200) {
        this.echarts_kakou(data.data);
      }
    });
  }
};
</script>

<style scoped lang="scss">
.car_bar {
  height: 100%;
}
</style>
