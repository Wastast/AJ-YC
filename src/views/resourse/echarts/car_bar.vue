<template>
  <div class="car_bar" ref="echarts"></div>
</template>

<script>
import { getBayonet } from '@/api/analysis';
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
        color: ['#1398F7', '#EC8213'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        backgroundColor: 'rgba(0,0,0,.3)',
        series: [
          {
            name: '省内外车辆',
            type: 'pie',
            radius: ['50%', '60%'],
            center: ['50%', '50%'],
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
      this.autoMatic(myChart, option.series[0].data.length, 2000);
      myChart.setOption(option);
    }
  },
  mounted() {
    // 获取车辆卡口数据
    getBayonet().then(data => {
      if (data.code === 200) {
        this.echarts_kakou(data.dataProvince);
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
