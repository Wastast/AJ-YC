<template>
  <div class="mediate">
    <party-box title="乡贤事迹" width="532" height="180">
      <template slot="content">
        <div class="box div-shi">
          <div class="box wrapper" ref="wrapper">
            <vuescroll ref="vs" :ops="ops" @handle-scroll="handleScroll">
              <ul class="ul content" ref="length" :style="{ width: length }">
                <li class="li" v-for="item of imgList" :key="item.imgUrl">
                  <img :src="item.imgUrl" alt="" />
                </li>
              </ul>
            </vuescroll>
          </div>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import vuescroll from 'vuescroll';
export default {
  name: 'mediate',
  data() {
    return {
      list: [],
      peopleList: [
        {
          name: '俞春华',
          number: '13567278553',
          frequency: '1'
        },
        {
          name: '刘备军',
          number: '13868283334',
          frequency: '2'
        },
        {
          name: '宋瑶',
          number: '15157255909',
          frequency: '3'
        },
        {
          name: '赵水根',
          number: '13657221980',
          frequency: '4'
        },
        {
          name: '俞金宝',
          number: '13567970055',
          frequency: '5'
        },
        {
          name: '赵必成',
          number: '15157241398',
          frequency: '6'
        }
      ],
      imgList: [
        {
          imgUrl: require('@/assets/img/83b22164837afe09b28d4fff760cced.jpg')
        },
        {
          imgUrl: require('@/assets/img/CY0A609.jpg')
        },
        {
          imgUrl: require('@/assets/img/CY0A6.jpg')
        },
        {
          imgUrl: require('@/assets/img/CY0A61.jpg')
        },
        {
          imgUrl: require('@/assets/img/CY6118.jpg')
        },
        {
          imgUrl: require('@/assets/img/CY6185.jpg')
        }
      ],
      ops: {
        bar: {
          opacity: 0
        },
        scrollPanel: {
          initialScrollX: '100%',
          speed: 1000 * 10
        }
      }
    };
  },
  computed: {
    length() {
      return (this.imgList.length + 1) * 2.94 - 1 + 'rem';
    }
  },
  watch: {},
  methods: {
    // 正常滚动的触发函数
    handleScroll(vertical, horizontal, nativeEvent) {
      let process = vertical.process;
      if (process === 0) {
        // 到顶部时触发函数
        // this.$emit('handleTop');
      }
      if (process === 1) {
        // 到底部时触发函数
        // this.$emit('handleBottom');
      }
    }
  },
  mounted() {},
  components: {
    PartyBox,
    vuescroll
  }
};
</script>

<style scoped>
.mediate >>> .content {
  padding: 0.24rem 0.22rem 0 0.18rem;
}
</style>

<style scoped lang="scss">
.mediate {
  position: absolute;
  top: px2rem(805rem);
  left: px2rem(1344rem);
  z-index: 1050;
  display: flow-root;
  .box {
    background: rgba(3, 12, 35, 0.3);
    display: flow-root;
    .p-title {
      width: px2rem(104rem);
      height: px2rem(40rem);
      background: rgba(3, 12, 35, 0.3);
      border-radius: 11px;
      text-align: center;
      line-height: px2rem(40rem);
      font-size: px2rem(18rem);
      color: rgba(0, 144, 255, 1);
    }
  }
  .div-show {
    height: px2rem(192rem);
    .ul {
      display: flow-root;
      box-sizing: border-box;
      padding-left: px2rem(8rem);
      margin-top: 0.5rem;
      .li {
        width: px2rem(240rem);
        height: px2rem(34rem);
        background: rgba(19, 44, 89, 0.4);
        border-radius: 17px;
        box-sizing: border-box;
        padding-left: px2rem(23rem);
        float: left;
        line-height: px2rem(34rem);
        color: #00fcff;
        margin-top: px2rem(12rem);
        cursor: pointer;
        &:nth-child(even) {
          margin-left: px2rem(11rem);
        }
        span {
          display: inline-block;
          width: px2rem(151rem);
          height: px2rem(34rem);
          background: #132c59;
          border-radius: 17px;
          float: right;
          color: #fff;
          text-align: center;
        }
      }
    }
  }
  .div-shi {
    height: px2rem(140rem);
    margin-top: px2rem(8rem);
    .box {
      width: px2rem(473rem);
      height: px2rem(120rem);
      padding: px2rem(8rem) 0 0 px2rem(15rem);
      overflow: hidden;
      .ul {
        overflow: hidden;
        .li {
          width: px2rem(147rem);
          height: px2rem(110rem);
          float: left;
          background: #000;
          &:nth-child(n + 2) {
            margin-left: px2rem(16rem);
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .popText {
    p {
      line-height: px2rem(36rem);
      font-size: px2rem(18rem);
    }
  }
}
</style>
