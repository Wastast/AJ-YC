<template>
  <div class="minsu_pre" ref="echarts"></div>
</template>

<script>
import { EchatsMixin } from '@/mixin/echarts';
import { getHourse } from '@/api/resourse';
export default {
  mixins: [EchatsMixin],
  name: 'minsu_pre',
  data() {
    return {
      timer: null
    };
  },
  computed: {},
  watch: {},
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
            name: '接待人数比例',
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
      this.autoMatic(myChart, option.series[0].data.length);

      myChart.clear();
      myChart.setOption(option, true);
    }
  },
  mounted() {
    getHourse().then(data => {
      if (data.code === 200) {
        let type = data.data.obj.map(item => {
          return item.name;
        });
        this.ecahrt_manyi(type, data.data.obj);
      }
    });
    this.timer = setInterval(() => {
      getHourse().then(data => {
        if (data.code === 200) {
          let type = data.data.obj.map(item => {
            return item.name;
          });
          this.ecahrt_manyi(type, data.data.obj);
        }
      });
    }, 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="scss">
.minsu_pre {
  width: 100%;
  height: 100%;
}
</style>
