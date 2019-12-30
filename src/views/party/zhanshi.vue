<template>
  <div class="zhanshi">
    <party-box title="村情展示" width="517" height="851">
      <template slot="content">
        <div class="div">
          <p class="p-title">
            {{ typeValue[moduleType] }}
          </p>
          <div class="div-btn" @click="checkModule()">
            {{ moduleType == 'collective' ? '人均收入' : '集体收入' }}
          </div>
          <collective-bar v-if="moduleType === 'collective'"></collective-bar>
          <average-bar v-if="moduleType === 'average'"></average-bar>
        </div>

        <ul class="ul">
          <li class="li" v-for="(item, index) of list" :key="index">
            <p class="p-title">
              {{ item.title }}
            </p>
            <div class="div-imgbox">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="div-text">
              <p class="p-value">
                <countTo
                  :startVal="parseInt(0)"
                  :endVal="parseFloat(item.value)"
                  :duration="4000"
                ></countTo>
              </p>
              <p class="p-unit">单位: {{ item.unit }}</p>
            </div>
          </li>
        </ul>

        <div class="bottom">
          <div class="title">
            村民画像分析
          </div>
          <div class="top">
            <ul class="ul">
              <li
                class="renqun"
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
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { getDesc } from '@/api/analysis';
import countTo from 'vue-count-to';
import collectiveBar from './echarts/collective_bar';
import averageBar from './echarts/average_bar';
import renqunPie from '../analysis/echarts/renqun_pie';
import { TipsPop } from '@/utils/el_ui';
export default {
  name: 'zhanshi',
  data() {
    return {
      list: [
        {
          imgUrl: require('@/assets/party/renkoujiankangxinxipingtaix@2x.png'),
          title: '总人数',
          unit: '人',
          value: '1060'
        },
        {
          imgUrl: require('@/assets/party/fangwugeju@2x.png'),
          title: '总户数',
          unit: '户',
          value: '280'
        },
        {
          imgUrl: require('@/assets/party/dangjianguanli@2x.png'),
          title: '党员人数',
          unit: '人',
          value: '56'
        },
        {
          imgUrl: require('@/assets/party/wuxingkehu@2x.png'),
          title: '5星之家',
          unit: '户',
          value: 37
        }
      ],
      moduleType: null,
      typeValue: {
        collective: '村集体经济总收入: 万元',
        average: '村人均收入: 万元'
      },
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
      type: ''
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 切换type
    checkModule() {
      let type;
      if (this.moduleType === 'collective') {
        type = 'average';
      } else {
        type = 'collective';
      }
      this.moduleType = type;
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
    this.moduleType = 'collective';
    getDesc().then(data => {
      if (data.code === 200) {
        this.list.forEach((item, index) => {
          let name = item.title;
          data.data.map(e => {
            if (e.name === name) {
              item.value = e.value;
            }
          });
        });
      }
    });
    this.type = 'sex';
  },
  components: {
    PartyBox,
    countTo,
    collectiveBar,
    averageBar,
    renqunPie
  }
};
</script>

<style scoped lang="scss">
.zhanshi {
  position: absolute;
  top: px2rem(130rem);
  left: px2rem(50rem);
  z-index: 100;
  .div {
    display: flow-root;
    width: px2rem(484rem);
    height: px2rem(286rem);
    margin-top: px2rem(9rem);
    margin-left: px2rem(14rem);
    overflow: hidden;
    position: relative;
    .p-title {
      position: absolute;
      top: px2rem(10rem);
      left: px2rem(10rem);
      z-index: 1050;
      height: 0.66rem;
      line-height: 0.66rem;
      background: rgba(2, 7, 26, 0.68);
      border-radius: 0.08rem;
      padding: 0 0.32rem;
      color: #80a5ce;
    }
    .div-btn {
      position: absolute;
      top: px2rem(5rem);
      right: px2rem(35rem);
      z-index: 1050;
      padding: px2rem(10rem);
      color: rgba(131, 178, 255, 1);
      text-align: center;
      background: rgba(97, 206, 243, 0);
      border: 1px solid rgba(57, 114, 154, 1);
      box-shadow: 0 0 5px rgba(31, 61, 139, 1);
      border-radius: 2px;
      font-size: px2rem(18rem);
      cursor: pointer;
      &:hover {
        filter: brightness(1.2);
      }
    }
  }
  .ul {
    display: flow-root;
    margin: px2rem(20rem) 0 0 px2rem(14rem);
    .li {
      float: left;
      width: px2rem(237rem);
      height: px2rem(105rem);
      background: rgba(2, 8, 28, 0.3);
      border-radius: 5px;
      position: relative;
      .p-title {
        font-size: px2rem(14rem);
        font-family: FZLTCHK;
        color: rgba(161, 207, 255, 0.7);
        line-height: px2rem(31rem);
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 px2rem(19rem) 0 px2rem(11rem);
        background: rgba(2, 7, 26, 0.9);
        border-radius: px2rem(5rem);
      }
      > div {
        float: left;
      }
      .div-imgbox {
        width: px2rem(44rem);
        height: px2rem(44rem);
        margin: px2rem(42rem) 0 0 px2rem(20rem);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .div-text {
        margin-left: px2rem(25rem);
        .p-value {
          color: #fff;
          font-family: carScroll;
          font-size: px2rem(38rem);
          margin-top: px2rem(30rem);
        }
        .p-unit {
          font-size: px2rem(12rem);
          color: rgba(128, 165, 206, 1);
          margin-top: px2rem(14rem);
        }
      }
      &:nth-child(even) {
        margin-left: px2rem(10rem);
      }
      &:nth-child(n + 3) {
        margin-top: px2rem(8rem);
      }
    }
  }
  .bottom {
    margin: 0 auto;
    width: 100%;
    background: rgba(2, 7, 26, 0.3);
    width: px2rem(484rem);
    height: px2rem(300rem);
    margin-top: px2rem(10rem);
    margin-left: px2rem(15rem);
    overflow: hidden;
    position: relative;
    .title {
      display: inline-block;
      box-sizing: border-box;
      margin: px2rem(10rem) 0 0 px2rem(10rem);
      color: rgba(128, 165, 206, 1);
    }
    .top {
      display: flex;
      height: px2rem(60rem);
      width: px2rem(520rem);
      height: px2rem(35rem);
      background: rgba(0, 36, 139, 0.2);
      border-radius: 18px;
      margin: px2rem(10rem) 0 0;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1999;
      .ul {
        display: flex;
        margin: auto;
        .renqun {
          float: left;
          width: px2rem(86rem);
          height: px2rem(30rem);
          border-radius: 5px;
          line-height: px2rem(30rem);
          transition: 0.5s;
          text-align: center;
          color: #fff;
          margin: auto;
          &:hover {
            cursor: pointer;
            background: rgba(0, 104, 220, 0.4);
            border-radius: 50px;
            color: #fff;
            font-weight: bold;
          }
        }
        .checked {
          background: rgba(0, 104, 220, 0.4);
          border-radius: 50px;
          color: #fff;
          font-weight: bold;
        }
      }
    }
    .echarts {
      width: 100%;
      height: px2rem(250rem);
    }
  }
}
</style>
