<template>
  <div class="quality">
    <party-box title="物联监测" width="592" height="198">
      <template slot="content">
        <div class="box">
          <div class="list">
            <ul class="ul">
              <li class="li" v-for="item of list" :key="item.color">
                <span class="span span-block" :style="{ background: item.color }"></span>
                <span class="span span-type">{{ item.type }}</span>
                <span class="span span-value">{{ item.value }}</span>
              </li>
            </ul>
          </div>
          <div id="echarts"></div>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { EleResize } from '@/utils/esresize'
export default {
  name: 'quality',
  data() {
    return {
      list: [
        {
          color: '#00E5A2',
          type: '烟感',
          value: '14'
        },
        {
          color: '#044B9C',
          type: '停车位',
          value: '14'
        },
        {
          color: '#0039AD',
          type: '消防水压',
          value: '14'
        },
        {
          color: '#00A1D6',
          type: '环境监测',
          value: '14'
        },
        {
          color: '#C56721',
          type: '井盖',
          value: '14'
        },
        {
          color: '#E94700',
          type: '用电安全',
          value: '14'
        },
        {
          color: '#AD0041',
          type: '垃圾桶',
          value: '14'
        },
        {
          color: '#9E00BB',
          type: '公共场所',
          value: '14'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    echarts_kakou() {
      let myChart = this.$echarts.init(document.getElementById('echarts'))
      let resizeDiv = document.getElementById('echarts')
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
        backgroundColor: 'rgba(0,0,0,.3)',
        series: [
          {
            name: '省内外车辆',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['20%', '50%'],
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
                name: '烟感',
                value: '14'
              },
              {
                type: '停车位',
                value: '14'
              },
              {
                type: '消防水压',
                value: '14'
              },
              {
                type: '环境监测',
                value: '14'
              },
              {
                type: '井盖',
                value: '14'
              },
              {
                type: '用电安全',
                value: '14'
              },
              {
                type: '垃圾桶',
                value: '14'
              },
              {
                type: '公共场所',
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
  },
  components: { PartyBox }
}
</script>

<style scoped lang="scss">
.quality {
  position: absolute;
  top: px2rem(525rem);
  left: px2rem(41rem);
  z-index: 100;
  .box {
    height: 100%;
    #echarts {
      height: 100%;
    }
    .ul {
      width: px2rem(343rem);
      position: absolute;
      top: px2rem(26rem);
      left: px2rem(232rem);
      z-index: 1050;
      .li {
        width: px2rem(169rem);
        height: px2rem(34rem);
        background: rgba(4, 13, 38, 0.7);
        border-radius: 7px;
        float: left;
        position: relative;
        &:nth-child(even) {
          margin-left: px2rem(5rem);
        }
        &:nth-child(n + 3) {
          margin-top: px2rem(5rem);
        }
        .span {
          position: absolute;
          line-height: px2rem(34rem);
        }
        .span-block {
          width: px2rem(8rem);
          height: px2rem(8rem);
          border-radius: 50%;
          background: #000;
          top: 50%;
          transform: translateY(-50%);
          left: px2rem(18rem);
        }
        .span-type {
          left: px2rem(34rem);
          color: #fff;
          font-size: px2rem(16rem);
        }
        .span-value {
          font-size: px2rem(16rem);
          left: px2rem(117rem);
          font-weight: bold;
          color: rgba(0, 240, 255, 1);
        }
      }
    }
  }
}
</style>
