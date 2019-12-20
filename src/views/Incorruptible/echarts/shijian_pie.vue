<template>
  <div class="shijian_pie" ref="echarts"></div>
</template>

<script>
import { EchatsMixin } from '@/mixin/echarts';
export default {
  mixins: [EchatsMixin],
  name: 'shijian_pie',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    // 文明实践模块
    echart_frequency() {
      let myChart = this.resizeEcharts();
      let option = {
        color: [
          '#FF0000 ',
          '#FF7F00',
          '#FFFF00',
          '#00FF00',
          '#00FFFF',
          '#0000FF',
          '#8B00FF',
          '#F0F8FF',
          '#EED2EE'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '20%',
          y: 'center',
          data: [
            '理论宣讲、政策宣传',
            '文明生活、健康人生',
            '文化服务、体育综合',
            '科学普及、法律服务',
            '健康养生、心灵关爱',
            '职业培训、农技指导',
            '家政服务、房屋维修',
            '水电检修、家具养护',
            '配送服务'
          ],
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          icon: 'circle'
        },
        backgroundColor: 'rgba(0,0,0,.1)',
        series: [
          {
            name: '服务类型',
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
            data: [
              {
                name: '理论宣讲、政策宣传',
                value: 8
              },
              {
                name: '文明生活、健康人生',
                value: 17
              },
              {
                name: '文化服务、体育综合',
                value: 11
              },
              {
                name: '科学普及、法律服务',
                value: 26
              },
              {
                name: '健康养生、心灵关爱',
                value: 12
              },
              {
                name: '职业培训、农技指导',
                value: 2
              },
              {
                name: '家政服务、房屋维修',
                value: 7
              },
              {
                name: '水电检修、家具养护',
                value: 8
              },
              {
                name: '配送服务',
                value: 9
              }
            ]
          }
        ]
      };

      this.autoMatic(myChart, option.series[0].data.length);

      myChart.clear();
      myChart.setOption(option, true);
    }
  },
  mounted() {
    this.echart_frequency();
  }
};
</script>

<style scoped lang="scss">
.shijian_pie {
  height: 100%;
}
</style>
