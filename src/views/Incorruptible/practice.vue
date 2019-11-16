<template>
  <div class="practice">
    <party-box title="文明实践" width="592" height="392">
      <template slot="content">
        <div class="box">
          <div class="div-top">
            <div id="wenming"></div>
          </div>
          <div class="list-box">
            <div class="div" v-for="(item, index) of valueList" :key="index">
              <p class="p-title">{{ item.name }}</p>
              <p class="p-value">{{ item.value }} {{ item.unit }}</p>
            </div>
            <!-- <div class="div-top">
              <div class="div-in">
                <p class="p-title">
                  本日游客总数
                </p>
                <span class="span-value">
                  <countTo :startVal="parseInt(0)" :endVal="nowSum" :duration="3000"></countTo>
                </span>
              </div>
              <div class="div-out">
                <p class="p-title">
                  实时游客数
                </p>
                <span class="span-value">
                  <countTo :startVal="parseInt(0)" :endVal="TourData" :duration="3000"></countTo>
                </span>
              </div>
            </div>
            <p>年服务对象人次:</p>
            <p>年参与服务:</p>
            <p>年志愿活动次数:</p> -->
            <!-- <ul class="ul">
              <li class="li" v-for="(item, index) of list" :key="index">
                <div class="div-imgbox">
                  <img src="@/assets/img/露营基地.jpg" />
                </div>
                <p class="p-title">
                  {{ item.title }}
                </p>
                <p class="p-time">时间：{{ (item.createTime + '').slice(0, 10) }}</p>
                <p class="p-people">人员：{{ item.author }}</p>
              </li>
            </ul> -->
          </div>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { getPracticeInfo } from '@/api/incorruptible'
import { EleResize } from '@/utils/esresize'
export default {
  name: 'practice',
  data() {
    return {
      list: [],
      gaopinTimer: null,
      timer: null,
      valueList: [
        {
          name: '年服务对象人次',
          value: '82356',
          unit: '人'
        },
        {
          name: '年参与服务人次',
          value: '2861',
          unit: '人'
        },
        {
          name: '年志愿活动次数',
          value: '187',
          unit: '人'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 文明实践模块
    echart_frequency() {
      let myChart = this.$echarts.init(document.getElementById('wenming'))
      let resizeDiv = document.getElementById('wenming')
      let listener = () => {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
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
            color: '#fff'
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
      }
      let index = 0
      this.gaopinTimer = setInterval(() => {
        var dataLen = option.series[0].data.length
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index
        })
        index = (index + 1) % dataLen
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        })
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
      }, 1000)
      myChart.clear()
      myChart.setOption(option, true)
    }
  },
  mounted() {
    this.echart_frequency()
    getPracticeInfo().then(data => {
      if (data.code === 0) {
        this.list = data.data.slice(0, 2)
      }
    })
    this.timer = setInterval(() => {
      clearInterval(this.gaopinTimer)
      this.echart_frequency()
    }, 1000 * 60)
  },
  components: {
    PartyBox
  },
  beforeDestroy() {
    clearInterval(this.gaopinTimer)
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="scss">
.practice {
  position: absolute;
  top: px2rem(594rem);
  left: px2rem(41rem);
  z-index: 1050;
  display: flow-root;
  .box {
    display: flow-root;
    > div {
      float: left;
    }
    .div-top {
      height: 5.5rem;
      background: rgba(3, 12, 35, 0.3);
      display: flow-root;
      width: 100%;
      #wenming {
        width: 100%;
        height: 100%;
      }
    }
    .list-box {
      margin-top: px2rem(20rem);
      .div {
        width: 3.5rem;
        height: 1.44rem;
        background: rgba(2, 7, 26, 0.6);
        padding: 0.25rem 0 0 0.4rem;
        float: left;
        margin-left: px2rem(15rem);
        border-radius: px2rem(10rem);
        box-sizing: border-box;
        .p-title {
          color: #80a5ce;
          margin-bottom: px2rem(7rem);
        }
        .p-value {
          font-size: px2rem(24rem);
          color: #fff;
        }
      }
      .ul {
        box-sizing: border-box;
        padding-left: px2rem(12rem);
        padding-top: px2rem(21rem);
        height: px2rem(192rem);
        overflow: hidden;
        .li {
          width: px2rem(250rem);
          height: px2rem(264rem);
          background: rgba(3, 12, 35, 0.3);
          border-radius: 5px;
          float: left;
          box-sizing: border-box;
          padding: px2rem(8rem) px2rem(12rem) 0 px2rem(10rem);
          &:nth-child(n + 2) {
            margin-left: px2rem(10rem);
          }
          .div-imgbox {
            width: px2rem(228rem);
            height: px2rem(149rem);
            border-radius: px2rem(6rem);
            overflow: hidden;
            background: #000;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .p-title {
            color: #fff;
            font-size: px2rem(22rem);
            margin-top: px2rem(15rem);
          }
          .p-time {
            color: rgba(0, 252, 255, 1);
            margin-top: px2rem(16rem);
          }
          .p-people {
            color: rgba(0, 252, 255, 1);
            margin-top: px2rem(16rem);
          }
        }
      }
    }
  }
}
</style>
