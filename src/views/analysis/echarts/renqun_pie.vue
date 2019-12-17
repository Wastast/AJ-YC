<template>
  <div class="renqun_pie" ref="echarts"></div>
</template>

<script>
import { EchatsMixin } from '@/mixin/echarts';
import { getAge, getSex } from '@/api/analysis';
export default {
  mixins: [EchatsMixin],
  props: ['type'],
  name: 'renqun_pie',
  data() {
    return {};
  },
  computed: {},
  watch: {
    type() {
      if (this.type === 'sex') {
        this.getsex();
      } else if (this.type === 'age') {
        this.getage();
      }
    }
  },
  methods: {
    echarts_renqun(data) {
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
          data: data.legend,
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
            name: '人群画像',
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
            data: data.series
          }
        ]
      };

      this.autoMatic(myChart, option.series[0].data.length);

      myChart.clear();
      myChart.setOption(option, true);
    },
    getrenqun() {
      this.echarts_renqun();
    },
    // 获取性别数据
    getsex() {
      getSex().then(data => {
        if (data.code === 200) {
          this.echarts_renqun(data.data);
        }
      });
    },
    // 获取年龄数据
    getage() {
      getAge().then(data => {
        if (data.code === 200) {
          this.echarts_renqun(data.data);
        }
      });
    }
  },
  mounted() {
    if (this.type === 'sex') {
      this.getsex();
    } else if (this.type === 'age') {
      this.getage();
    }
  }
};
</script>

<style scoped lang="scss">
.renqun_pie {
  height: 100%;
}
</style>
