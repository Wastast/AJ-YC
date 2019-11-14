<template>
  <div class="Travel">
    <party-box title="旅游数据" width="592" height="392">
      <template slot="content">
        <div class="div-top">
          <div class="div-in">
            <p class="p-title">
              游客总数
            </p>
            <span class="span-value">
              29102
            </span>
          </div>
          <div class="div-out">
            <p class="p-title">
              实时游客总数
            </p>
            <span class="span-value">
              29102
            </span>
          </div>
        </div>
        <div class="div-center">
          <div class="echarts">
            <p>
              游客来源地分析
            </p>
            <div class="type">
              <span>消费水平</span>
              <span class="checked">年龄</span>
              <span>性别</span>
            </div>
            <div id="renqun"></div>
          </div>
          <div class="list">
            <p>
              游客来源地分析
            </p>
            <ul class="ul">
              <li class="li" v-for="(item, index) of list" :key="index">
                <p class="top">Top{{ index + 1 }}</p>
                <div class="div-text">
                  <p class="p-city">
                    {{ item.city }}
                  </p>
                  <p class="span-value">
                    {{ item.number }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { getOrign } from '@/api/analysis'
import { EleResize } from '@/utils/esresize'
export default {
  name: 'Travel',
  data() {
    return {
      list: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    echarts_kakou() {
      let myChart = this.$echarts.init(document.getElementById('renqun'))
      let resizeDiv = document.getElementById('renqun')
      let listener = () => {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
      let option = {
        color: [
          '#00E5A2',
          '#044B9C',
          '#0039AD',
          '#00A1D6',
          '#C56721',
          '#E94700',
          '#AD0041',
          '#9E00BB'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '10%',
          y: 'center',
          data: ['0~18岁', '19~24岁', '25~35岁', '36~45岁'],
          textStyle: {
            color: '#fff'
          },
          icon: 'circle'
        },
        backgroundColor: 'rgba(0,0,0,.3)',
        series: [
          {
            name: '省内外车辆',
            type: 'pie',
            radius: ['30%', '50%'],
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
            data: [
              {
                name: '0~18岁',
                value: '14'
              },
              {
                name: '19~24岁',
                value: '14'
              },
              {
                name: '25~35岁',
                value: '14'
              },
              {
                name: '36~45岁',
                value: '14'
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  mounted() {
    this.echarts_kakou()
    getOrign().then(data => {
      if (data.code === 200) {
        this.list = data.day.slice(0, 6)
      }
    })
  },
  components: { PartyBox }
}
</script>

<style scoped>
.Travel >>> .content {
  padding: 0.44rem 0.52rem 0 0.54rem;
  box-sizing: border-box;
}
</style>

<style scoped lang="scss">
.Travel {
  position: absolute;
  top: px2rem(594rem);
  left: px2rem(1284rem);
  z-index: 100;
  .div-top {
    display: flow-root;
    margin-bottom: px2rem(9rem);
    > div {
      float: left;
      background: rgba(2, 7, 26, 0.6);
      border-radius: 4px;
      box-sizing: border-box;
      padding: px2rem(10rem) 0 0 px2rem(20rem);
      .p-title {
        color: rgba(128, 165, 206, 1);
        margin-bottom: px2rem(9rem);
      }
      .span-value {
        font-size: px2rem(36rem);
        font-family: 'DS-DIGII';
        color: #fff;
      }
    }
    .div-in {
      width: px2rem(262rem);
      height: px2rem(72rem);
    }
    .div-out {
      margin-left: px2rem(7rem);
      width: px2rem(262rem);
      height: px2rem(72rem);
    }
  }
  .div-center {
    margin-top: px2rem(9rem);
    > div {
      float: left;
    }
    .echarts {
      width: px2rem(258rem);
      height: px2rem(268rem);
      position: relative;
      .type {
        width: px2rem(235rem);
        height: px2rem(35rem);
        background: rgba(0, 36, 139, 0.2);
        border-radius: 18px;
        position: absolute;
        top: px2rem(36rem);
        left: px2rem(14rem);
        box-sizing: border-box;
        padding: px2rem(4rem) 0 0 px2rem(7rem);
        z-index: 1050;
        span {
          display: inline-block;
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
        .checked {
          background: rgba(0, 104, 220, 0.4);
        }
      }
      p {
        margin-bottom: px2rem(9rem);
        color: rgba(128, 165, 206, 1);
        display: flow-root;
        margin-left: px2rem(5rem);
        position: absolute;
        top: px2rem(5rem);
        left: px2rem(5rem);
      }
      > div {
        height: 100%;
      }
    }
    .list {
      width: px2rem(271rem);
      height: px2rem(161rem);
      background: rgba(2, 7, 26, 0.3);
      border-radius: 4px;
      margin-left: px2rem(7rem);
      box-sizing: border-box;
      padding: px2rem(6rem) 0 0 px2rem(12rem);
      display: flow-root;
      p {
        margin-bottom: px2rem(9rem);
        color: rgba(128, 165, 206, 1);
        display: flow-root;
        margin-left: px2rem(5rem);
      }
      .ul {
        display: flow-root;
        .li {
          display: flow-root;
          width: px2rem(124rem);
          height: px2rem(71rem);
          background: rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          float: left;
          position: relative;
          &:nth-child(even) {
            margin-left: px2rem(5rem);
          }
          &:nth-child(n + 3) {
            margin-top: px2rem(4rem);
          }
          .top {
            color: rgba(13, 123, 225, 1);
            font-weight: bold;
            position: absolute;
            top: px2rem(11rem);
            left: px2rem(5rem);
          }
          .div-text {
            display: flow-root;
            margin-top: px2rem(14rem);
            margin-left: px2rem(50rem);
            .p-city {
              color: rgba(128, 165, 206, 1);
              margin-bottom: px2rem(10rem);
            }
            .span-value {
              font-size: px2rem(16rem);
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }
  }
}
</style>
