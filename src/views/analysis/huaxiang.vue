<template>
  <div class="huaxiang">
    <div class="type">
      <ul class="ul">
        <li
          class="li"
          v-for="item of typeList"
          :key="item.type"
          :class="item.type === type ? 'checked' : ''"
          @click="checkType(item.type)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="echarts" ref="echarts"></div>
  </div>
</template>

<script>
import { getSex, getAge } from '@/api/resourse';
import { EchatsMixin } from '@/mixin/echarts';
export default {
  name: 'huaxiang',
  mixins: [EchatsMixin],
  data() {
    return {
      type: '',
      typeList: [
        {
          type: 'age',
          name: '年龄'
        },
        {
          type: 'sex',
          name: '男女'
        }
      ],
      typeFn: {
        age: () => {
          return new Promise((resolve, reject) => {
            getAge().then(data => {
              resolve(data);
            });
          });
        },
        sex: () => {
          return new Promise((resolve, reject) => {
            getSex().then(data => {
              resolve(data);
            });
          });
        }
      }
    };
  },
  computed: {},
  watch: {
    type(newValue, oldValue) {
      this.getValue(newValue);
    }
  },
  methods: {
    // 切换type
    checkType(type) {
      if (this.type === type) {
        return;
      }
      this.type = type;
    },
    // 查询人群画像数据
    echarts_kakou(type, data) {
      let myChart = this.resizeEcharts();
      let option = {
        color: ['#00E5A2', '#00A1D6', '#C56721', '#E94700', '#AD0041', '#9E00BB'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '10%',
          y: 'center',
          // data: ['0~18岁', '19~24岁', '25~35岁', '36~45岁'],
          data: type,
          textStyle: {
            color: '#fff'
          },
          icon: 'circle'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['30%', '50%'],
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
    },
    // 获取人群画像数据
    async getValue(type) {
      let data = await this.typeFn[type]();
      let typeArr = data.data.map(item => {
        return item.name;
      });
      this.echarts_kakou(typeArr, data.data);
    }
  },
  mounted() {
    this.type = 'age';
  }
};
</script>

<style scoped lang="scss">
.huaxiang {
  overflow: hidden;
  .type {
    margin: 0 auto;
    height: px2rem(35rem);
    border-radius: 18px;
    box-sizing: border-box;
    padding: px2rem(4rem) 0 0 px2rem(7rem);
    z-index: 1050;
    display: flex;
    .ul {
      margin: 0 auto;
      overflow: hidden;
      background: rgba(0, 36, 139, 0.2);
      border-radius: 50px;
      .li {
        float: left;
        width: px2rem(73rem);
        height: px2rem(27rem);
        line-height: px2rem(27rem);
        border-radius: 50px;
        text-align: center;
        color: #fff;
        font-size: px2rem(14rem);
        cursor: pointer;
        &:hover {
          background: rgba(0, 104, 220, 0.4);
        }
      }
    }
    .checked {
      background: rgba(0, 104, 220, 0.4);
    }
  }
  .echarts {
    height: px2rem(200rem);
  }
  .p-title {
    position: absolute;
    top: px2rem(40rem);
    left: px2rem(15rem);
    z-index: 1050;
    height: 0.66rem;
    line-height: 0.66rem;
    background: rgba(2, 7, 26, 0.68);
    border-radius: 0.08rem;
    padding: 0 0.32rem;
    color: #80a5ce;
    font-size: px2rem(18rem);
  }
}
</style>
