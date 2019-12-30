<template>
  <div>
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

    <pop-box :isPop.sync="isPop" :title="'村民画像分析'">
      <template slot="content">
        <div class="pop-content">
          <div class="top">
            <ul class="ul">
              <li
                class="li"
                v-for="(item, index) in typeList"
                :key="index"
                :class="item.type === type ? 'checked' : ''"
                @click="checkType(item.type)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="echarts">
            <renqun-pie :type="type"></renqun-pie>
          </div>
        </div>
      </template>
    </pop-box>

    <pop-box :isPop.sync="renjun" :title="'人均收入分析'" :width="526" :height="430">
      <template slot="content">
        <div class="pop-content">
          <img class="img" src="@/assets/analysis/renjun.png" alt="" />
        </div>
      </template>
    </pop-box>

    <pop-box :isPop.sync="jiti" :title="'集体经济分析'" :width="526" :height="430">
      <template slot="content">
        <div class="pop-content">
          <img class="img" src="@/assets/analysis/jiti.png" alt="" />
        </div>
      </template>
    </pop-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box';
import { getDesc } from '@/api/analysis';
import countTo from 'vue-count-to';
import PopBox from '@/components/PopBox';
import { TipsPop } from '@/utils/el_ui';
import RenqunPie from './echarts/renqun_pie';
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
          color: 'rgba(131,178,255,1)',
          type: 'renqun'
        },
        {
          imgUrl: require('@/assets/analysis/hushu-2@2x.png'),
          name: '总人数',
          value: '0',
          unit: '人',
          color: 'rgba(250,174,27,1)',
          type: 'renqun'
        },
        {
          imgUrl: require('@/assets/analysis/renjunshouru@2x.png'),
          name: '人均收入',
          value: '0',
          unit: '元',
          color: 'rgba(24,186,197,1)',
          type: 'renjun'
        },
        {
          imgUrl: require('@/assets/analysis/zichan@2x.png'),
          name: '集体经济收入',
          value: '0',
          unit: '万元',
          color: 'rgba(168,83,233,1)',
          type: 'jiti'
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
      },
      isPop: false,
      typeList: [
        {
          name: '性别',
          type: 'sex'
        },
        {
          name: '年龄',
          type: 'age'
        },
        {
          name: '文化程度',
          type: 'wen'
        }
      ],
      type: '',
      renjun: false,
      jiti: false
    };
  },
  computed: {},
  watch: {
    isPop() {
      if (!this.isPop) {
        this.type = '';
      }
    }
  },
  methods: {
    // 获取村情数据
    getValue() {
      getDesc().then(data => {
        if (data.code === 200) {
          this.list.forEach((item, index) => {
            let name = item.name;
            data.data.map(e => {
              if (e.name === name) {
                item.value = e.value;
              }
            });
          });
        }
      });
    },
    // 显示隐藏点位
    showHidePoint() {
      TMapAPI.HideMarkersByTag('dyzj');
      TMapAPI.HideMarkersByTag('wzxj');
    },
    // 获取type
    getType(type) {
      if (typeof this.typeValue[type] !== 'undefined') {
        if (this.typeValue[type]) {
          TMapAPI.ShowMarkersByTag(type);
        } else {
          TMapAPI.HideMarkersByTag(type);
        }
        this.typeValue[type] = !this.typeValue[type];
      } else if (type === 'renqun') {
        this.isPop = true;
        this.type = 'age';
      } else if (type === 'renjun') {
        this.renjun = true;
      } else if (type === 'jiti') {
        this.jiti = true;
      }
    },
    // 更改type值
    checkType(type) {
      if (type === 'wenhua') {
        TipsPop({
          message: '暂无数据',
          type: 'info'
        });
      }
      this.type = type;
    }
  },
  mounted() {
    this.getValue();
    this.timer = setInterval(() => {
      this.getValue();
    }, 1000 * 60 * 5);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {
    ModuleBox,
    countTo,
    PopBox,
    RenqunPie
  }
};
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
.pop-content {
  .img {
    display: block;
    width: 95%;
    margin: 0 auto;
  }
  .top {
    display: flex;
    height: px2rem(60rem);
    background: rgba(7, 14, 38, 1);
    .ul {
      display: flex;
      margin: auto;
      .li {
        float: left;
        width: px2rem(86rem);
        height: px2rem(30rem);
        border-radius: 5px;
        line-height: px2rem(30rem);
        transition: 0.5s;
        text-align: center;
        color: #fff;
        &:hover {
          background: rgba(12, 18, 43, 1);
          cursor: pointer;
          color: rgba(0, 241, 251, 1);
        }
      }
      .checked {
        background: rgba(12, 18, 43, 1);
        color: rgba(0, 241, 251, 1);
      }
    }
  }
  .echarts {
    height: px2rem(155rem);
  }
}
</style>
