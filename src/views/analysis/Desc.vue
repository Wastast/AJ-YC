<template>
  <div class="event">
    <module-box title="村情简介">
      <template slot="content">
        <ul class="ul">
          <li
            class="li"
            v-for="(item, index) of list"
            :key="index"
            @click="getType(item.type || '')"
          >
            <img :src="item.imgUrl" alt="" />
            <dl :style="{ color: item.color }">
              <dt>
                {{ item.name }}
              </dt>
              <dd>
                <countTo
                  :startVal="parseInt(0)"
                  :endVal="parseFloat(item.value)"
                  :duration="4000"
                ></countTo>
                {{ item.unit }}
              </dd>
            </dl>
          </li>
        </ul>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box'
import { getDesc } from '@/api/analysis'
import countTo from 'vue-count-to'
export default {
  name: 'event',
  data() {
    return {
      list: [
        {
          imgUrl: require('@/assets/analysis/hushu@2x.png'),
          name: '总户数',
          value: '0',
          unit: '户',
          color: 'rgba(131,178,255,1)'
        },
        {
          imgUrl: require('@/assets/analysis/hushu-2@2x.png'),
          name: '总人数',
          value: '0',
          unit: '人',
          color: 'rgba(250,174,27,1)'
        },
        {
          imgUrl: require('@/assets/analysis/renjunshouru@2x.png'),
          name: '人均收入',
          value: '0',
          unit: '元',
          color: 'rgba(24,186,197,1)'
        },
        {
          imgUrl: require('@/assets/analysis/zichan@2x.png'),
          name: '集体经济收入',
          value: '0',
          unit: '万元',
          color: 'rgba(168,83,233,1)'
        },
        {
          imgUrl: require('@/assets/analysis/dangyuan@2x.png'),
          name: '党员人数',
          value: '0',
          unit: '人',
          color: 'rgba(232,56,107,1)',
          type: 'dyzj'
        },
        {
          imgUrl: require('@/assets/analysis/wuxing@2x.png'),
          name: '5星之家',
          value: '0',
          unit: '家',
          color: 'rgba(61,144,246,1)',
          type: 'wxzj'
        }
      ],
      timer: null,
      typeValue: {
        dyzj: true,
        wxzj: true
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取村情数据
    getValue() {
      getDesc().then(data => {
        if (data.code === 200) {
          this.list.forEach((item, index) => {
            let name = item.name
            data.data.map(e => {
              if (e.name === name) {
                item.value = e.value
              }
            })
          })
        }
      })
    },
    // 显示隐藏点位
    showHidePoint() {
      TMapAPI.HideMarkersByTag('dyzj')
      TMapAPI.HideMarkersByTag('wzxj')
    },
    // 获取type
    getType(type) {
      if (type) {
        if (this.typeValue[type]) {
          TMapAPI.ShowMarkersByTag(type)
        } else {
          TMapAPI.HideMarkersByTag(type)
        }
        this.typeValue[type] = !this.typeValue[type]
      }
    }
  },
  mounted() {
    this.getValue()
    this.timer = setInterval(() => {
      this.getValue()
    }, 1000 * 60 * 5)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  components: {
    ModuleBox,
    countTo
  }
}
</script>

<style scoped lang="scss">
.event {
  position: absolute;
  top: px2rem(140rem);
  left: px2rem(20rem);
  .ul {
    display: flow-root;
    .li {
      width: px2rem(225rem);
      height: px2rem(70rem);
      float: left;
      margin-left: px2rem(5rem);
      position: relative;
      background: rgba(10, 17, 43, 1);
      cursor: pointer;
      &:nth-child(n + 3) {
        margin-top: px2rem(5rem);
      }
      img {
        position: absolute;
        bottom: 0;
        right: 0;
        width: px2rem(62rem);
        height: px2rem(54rem);
        z-index: 1;
      }
      dl {
        font-family: PingFangSC;
        dt {
          position: absolute;
          top: px2rem(20rem);
          left: px2rem(13rem);
          font-size: px2rem(18rem);
          margin-bottom: px2rem(19rem);
        }
        dd {
          position: absolute;
          top: px2rem(35rem);
          right: px2rem(13rem);
          font-family: RTWS ShangYa Demo;
          font-size: px2rem(26rem);
          margin-left: px2rem(160rem);
          width: 100%;
          text-align: right;
        }
      }
    }
  }
}
</style>
