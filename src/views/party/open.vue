<template>
  <div class="open">
    <party-box title="村务公开" width="767" height="234">
      <template slot="content">
        <div class="div-top">
          <span>村务公开</span>
          <span>党务公开</span>
        </div>
        <ul class="ul">
          <li class="li" v-for="(item, index) of [1, 2, 3, 4]" :key="index">
            <span class="span span-title ellipsis">
              公开事件标题
            </span>
            <span class="span span-event ellipsis">
              事件描述
            </span>
            <span class="span span-time">
              2019/01/01
            </span>
          </li>
        </ul>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
export default {
  name: 'open',
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

<style scoped lang="scss">
.open {
  position: absolute;
  top: px2rem(746rem);
  left: px2rem(587rem);
  z-index: 100;
  .div-top {
    width: px2rem(224rem);
    height: px2rem(44rem);
    background: rgba(2, 7, 26, 0.6);
    border-radius: px2rem(4rem);
    line-height: px2rem(44rem);
    color: #fff;
    font-weight: bold;
    font-size: px2rem(18rem);
    // display: inline-block;
    // padding: 0 px2rem(23rem);
    margin: 0 auto;
    span {
      margin-left: px2rem(23rem);
      cursor: pointer;
      &:hover {
        color: rgba(59, 157, 225, 1);
      }
    }
  }
  .ul {
    display: flow-root;
    box-sizing: border-box;
    margin-top: px2rem(5rem);
    .li {
      width: 100%;
      height: px2rem(45rem);
      line-height: px2rem(45rem);
      cursor: pointer;
      .span {
        font-size: px2rem(16rem);
        position: absolute;
        display: inline-block;
      }
      .span-title {
        left: px2rem(24rem);
        color: rgba(78, 236, 255, 1);
      }
      .span-event {
        left: px2rem(160rem);
        color: #fff;
        width: px2rem(460rem);
      }
      .span-time {
        left: px2rem(647rem);
        color: rgba(59, 157, 225, 1);
      }
      &:hover {
        background: rgba(4, 14, 44, 1);
      }
      &:nth-child(even) {
        background: rgba(4, 14, 44, 1);
      }
    }
  }
}
</style>
