<template>
  <div class="cartype_pre" ref="echarts"></div>
</template>

<script>
import { EchatsMixin } from '@/mixin/echarts';
import { getCarType } from '@/api/analysis';
export default {
  name: 'cartype_pre',
  mixins: [EchatsMixin],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    // 车辆类型
    echarts_renqun(names, values) {
      let myChart = this.resizeEcharts();

      let option = {
        color: ['#FF7F00', '#54b7f5', '#e58dc2', '#fbb8a1', '#0C90FE', '#644EF2', '#050E24'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '20%',
          y: 'center',
          data: names,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          icon: 'circle',
          formatter: function(name) {
            return name;
          }
        },
        backgroundColor: 'rgba(0,0,0,.1)',
        series: [
          {
            name: '车辆类型',
            type: 'pie',
            // radius: ['40%', '60%'],
            radius: ['40%', '60%'],
            center: ['30%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
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
            data: values
          }
        ]
      };

      this.autoMatic(myChart, option.series[0].data.length, 2000);

      myChart.clear();
      myChart.setOption(option, true);
    }
  },
  mounted() {
    getCarType().then(data => {
      if (data.code === 200) {
        let list = data.data;
        let names = list.map(item => {
          return item.typeName;
        });
        let values = list.map(item => {
          return {
            name: item.typeName,
            value: item.total
          };
        });
        this.echarts_renqun(names, values);
      }
    });
  }
};
</script>

<style scoped lang="scss">
.cartype_pre {
  width: 100%;
  height: 100%;
}
</style>
