<template>
  <div class="mark" v-if="isPop" @click="popClose">
    <div
      class="pop-box"
      :style="{ width: Number(width) / 50 + 'rem', height: Number(height) / 50 + 'rem' }"
      @click.stop="() => {}"
    >
      <div class="pop-box-title">
        <h2 class="h2">
          {{ title }}
        </h2>
      </div>
      <div class="close" @click="popClose"></div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popbox',
  props: {
    title: {
      type: String,
      default: '默认标题'
    },
    width: {
      default: 526
    },
    height: {
      default: 292
    },
    isPop: {
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    // 关闭当前弹框
    popClose() {
      this.$emit('update:isPop', false);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.mark {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1999;
  .pop-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2000;
    background: url('~@/assets/popbox/b@2x.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: px2rem(60rem);
    .pop-box-title {
      display: flow-root;
      position: absolute;
      top: px2rem(25rem);
      left: px2rem(30rem);
      .h2 {
        font-size: px2rem(16rem);
        font-weight: bold;
        color: #fff;
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        margin-left: px2rem(20rem);
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: px2rem(-20rem);
          transform: translateY(-50%);
          width: px2rem(14rem);
          height: px2rem(11rem);
          background: url('~@/assets/popbox/矩形 1 拷贝 2@2x.png');
          background-size: 100% 100%;
        }
      }
    }
    .close {
      width: px2rem(161rem);
      height: px2rem(115rem);
      background: url('~@/assets/popbox/矩形 1 拷贝@2x.png');
      background-size: 100% 100%;
      position: absolute;
      top: px2rem(-11rem);
      right: px2rem(-24rem);
      cursor: pointer;
      &:hover {
        filter: brightness(1.3);
      }
    }
    .content {
      box-sizing: border-box;
      position: relative;
      padding: 0 px2rem(23rem) 0 px2rem(13rem);
    }
  }
}
</style>
