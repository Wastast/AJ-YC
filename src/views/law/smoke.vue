<template>
  <div class="smoke">
    <party-box title="烟感监控" width="592" height="164">
      <template slot="content">
        <div class="box">
          <div id="status"></div>
          <div class="list">
            <ul class="ul">
              <li class="li" v-for="(item, index) of [1, 2, 3]" :key="index">
                <span class="span-box">
                  烟感报警
                </span>
                <span class="span-text ellipsis">
                  报警
                </span>
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
import { EleResize } from '@/utils/esresize'
export default {
  name: 'smoke',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    // 状态echarts
    echarts_status() {
      let myChart = this.$echarts.init(document.getElementById('status'))
      let resizeDiv = document.getElementById('status')
      let listener = () => {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
      let option = {
        color: ['#044B9C', '#ECB32B', '#CB371F', '#00A1D6'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '10%',
          y: 'center',
          data: ['终端电量', '火灾情况', '温度情况', '设备离线'],
          textStyle: {
            color: '#fff'
          },
          icon: 'circle'
        },
        backgroundColor: 'rgba(0,0,0,.3)',
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
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
            data: [
              { value: 5, name: '终端电量' },
              { value: 1, name: '火灾情况' },
              { value: 2, name: '温度情况' },
              { value: 8, name: '设备离线' }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  mounted() {
    this.echarts_status()
  },
  components: { PartyBox }
}
</script>

<style scoped lang="scss">
.smoke {
  position: absolute;
  top: px2rem(574rem);
  left: px2rem(41rem);
  z-index: 100;
  .box {
    box-sizing: border-box;
    padding-top: px2rem(15rem);
    padding-left: px2rem(12rem);
    > div {
      float: left;
    }
    #status {
      width: px2rem(219rem);
      height: px2rem(137rem);
    }
    .list {
      margin-left: px2rem(5rem);
      background: rgba(2, 7, 26, 0.3);
      width: px2rem(339rem);
      height: px2rem(137rem);
      .ul {
        padding-left: px2rem(16rem);
        .li {
          height: px2rem(26rem);
          line-height: px2rem(26rem);
          margin-top: px2rem(13rem);
          cursor: pointer;
          .span-box {
            display: inline-block;
            width: px2rem(78rem);
            height: px2rem(26rem);
            border-radius: 50px;
            text-align: center;
            font-size: px2rem(12rem);
            color: rgba(203, 55, 31, 1);
            border: 1px solid rgba(129, 25, 50, 0.831);
            box-sizing: border-box;
          }
          .span-text {
            display: inline-block;
            line-height: px2rem(26rem);
            width: px2rem(205rem);
            margin-left: px2rem(12rem);
            color: #fff;
            vertical-align: top;
          }
        }
      }
    }
  }
}
</style>
