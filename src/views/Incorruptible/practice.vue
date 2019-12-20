<template>
  <div class="practice">
    <party-box title="文明实践" width="592" height="528">
      <template slot="content">
        <div class="box">
          <div class="div-top">
            <shijian-pie></shijian-pie>
          </div>
          <div class="list-box">
            <div class="div" v-for="(item, index) of valueList" :key="index">
              <p class="p-title">{{ item.name }}</p>
              <p class="p-value">{{ item.value }} {{ item.unit }}</p>
            </div>
          </div>
          <div class="bottom">
            <div class="title">
              服务人群画像
            </div>
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
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { getPracticeInfo } from '@/api/incorruptible';
import shijianPie from './echarts/shijian_pie';
import renqunPie from '../analysis/echarts/renqun_pie';
import { TipsPop } from '@/utils/el_ui';
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
          unit: '次'
        }
      ],
      typeList: [
        {
          name: '性别',
          type: 'sex'
        },
        {
          name: '年龄',
          type: 'age'
        }
      ],
      type: ''
    };
  },
  computed: {},
  watch: {},
  methods: {
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
    getPracticeInfo().then(data => {
      if (data.code === 0) {
        this.list = data.data.slice(0, 2);
      }
    });
    this.timer = setInterval(() => {
      clearInterval(this.gaopinTimer);
      this.echart_frequency();
    }, 1000 * 60);
    this.type = 'sex';
  },
  components: {
    PartyBox,
    shijianPie,
    renqunPie
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="scss">
.practice {
  position: absolute;
  top: px2rem(459rem);
  left: px2rem(41rem);
  z-index: 1050;
  display: flow-root;
  .box {
    display: flow-root;
    > div {
      float: left;
    }
    .div-top {
      height: px2rem(230rem);
      background: rgba(3, 12, 35, 0.3);
      display: flow-root;
      width: 100%;
      #wenming {
        width: 100%;
        height: 100%;
      }
    }
    .list-box {
      margin-top: px2rem(10rem);
      .div {
        width: 3.5rem;
        height: 1.25rem;
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
    .bottom {
      margin: 0 auto;
      width: 100%;
      background: rgba(2, 7, 26, 0.3);
      width: px2rem(556rem);
      height: px2rem(200rem);
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
        position: absolute;
        top: px2rem(20rem);
        left: 0;
        width: 100%;
        height: px2rem(200rem);
      }
    }
  }
}
</style>
