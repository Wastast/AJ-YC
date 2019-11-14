<template>
  <div class="mediate">
    <party-box title="乡贤调解" width="532" height="392">
      <template slot="content">
        <div class="box div-show">
          <p class="p-title">
            乡贤展示
          </p>
          <ul class="ul">
            <li class="li" v-for="(item, index) of [1, 2, 3, 4, 5, 6]" :key="index">
              张三
              <span>17681909801</span>
            </li>
          </ul>
        </div>
        <div class="box div-shi">
          <p class="p-title">
            乡贤事迹
          </p>
          <ul class="ul">
            <li class="li">

            </li>
            <li class="li">

            </li>
            <li class="li">

            </li>
          </ul>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
export default {
  name: 'mediate',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: {
    PartyBox
  }
}
</script>

<style scoped>
.mediate >>> .content {
  padding: 0.24rem 0.22rem 0 0.18rem;
}
</style>

<style scoped lang="scss">
.mediate {
  position: absolute;
  top: px2rem(594rem);
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
    height: px2rem(168rem);
    margin-top: px2rem(8rem);
    .ul {
      box-sizing: border-box;
      padding: px2rem(8rem) 0 0 px2rem(15rem);
      .li {
        width: px2rem(147rem);
        height: px2rem(110rem);
        float: left;
        background: #000;
        &:nth-child(n+2) {
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
</style>
