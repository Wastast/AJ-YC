<template>
  <div class="hourse_pre" ref="echarts"></div>
</template>

<script>
import { EchatsMixin } from '@/mixin/echarts';
import { getDataType } from '@/utils/currency';
export default {
  mixins: [EchatsMixin],
  props: ['obj'],
  name: 'hourse_pre',
  data() {
    return {};
  },
  computed: {},
  watch: {
    obj(n, o) {
      if (getDataType(n) === 'array') {
        let type = n.map(item => {
          return item.name;
        });
        this.ecahrt_manyi(type, n);
      }
    }
  },
  methods: {
    // 满意度饼图
    ecahrt_manyi(typeArr, data) {
      let myChart = this.resizeEcharts();
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

      this.autoMatic(myChart, option.series[0].data.length, 2000);

      myChart.clear();
      myChart.setOption(option, true);
    }
  }
};
</script>

<style scoped lang="scss">
.hourse_pre {
  width: 100%;
  height: 100%;
}
</style>
