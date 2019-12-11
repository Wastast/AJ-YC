<template>
  <div class="index">
    <div class="div-title">
      <div class="div-text">
        {{ title }}
      </div>
    </div>
    <div class="div-content" :style="{ width: width / 50 + 'rem', height: height / 50 + 'rem' }">
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="border t-l"></div>
      <div class="border t-r"></div>
      <div class="border b-l"></div>
      <div class="border b-r"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '默认标题'
    },
    width: {
      default: '0'
    },
    height: {
      default: '0'
    },
    slice: {
      type: Number,
      default: 2
    }
  },
  name: 'index',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.index {
  .div-title {
    padding: px2rem(7rem);
    background: url('~@/assets/party/矩形 4 拷贝 3@2x.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    display: inline-block;
    font-size: px2rem(20rem);
    .div-text {
      padding: px2rem(8rem) px2rem(20rem) px2rem(7rem) px2rem(22rem);
      background: rgba(26, 82, 144, 0.2);
      box-sizing: border-box;
      color: #fff;
      .span {
        font-size: px2rem(20px);
      }
      .span-qian {
        color: #85caff;
        font-weight: bold;
      }
      .span-hou {
        color: #3b9de1;
      }
    }
  }
  .div-content {
    display: flow-root;
    margin-top: px2rem(9rem);
    border: 1px solid #1a2f63;
    box-sizing: border-box;
    position: relative;
    .content {
      height: 100%;
    }
    .border {
      position: absolute;
      width: px2rem(13rem);
      height: px2rem(13rem);
    }
    .t-l {
      top: -1px;
      left: -1px;
      background: url('~@/assets/party/t-l.png');
    }
    .t-r {
      top: -1px;
      right: -1px;
      background: url('~@/assets/party/t-r.png');
      &::before {
        position: absolute;
        top: px2rem(-18rem);
        left: px2rem(-7rem);
        content: '';
        width: px2rem(38rem);
        height: px2rem(38rem);
        background: rgba(21, 49, 103, 0.35);
        border: 1px solid rgba(30, 54, 114, 1);
      }
    }
    .b-l {
      bottom: -1px;
      left: -1px;
      background: url('~@/assets/party/b-l.png');
    }
    .b-r {
      bottom: -1px;
      right: -1px;
      background: url('~@/assets/party/b-r.png');
    }
  }
}
</style>
