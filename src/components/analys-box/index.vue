<template>
  <div class="index">
    <div class="div-header">
      {{ title }}
    </div>
    <div class="div-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '默认标题'
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
  width: px2rem(522rem);
  height: px2rem(281rem);
  background: url('~@/assets/analysis/形状 1512@2x.png');
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: px2rem(45rem) px2rem(30rem) px2rem(15rem) px2rem(20rem);
  > div {
    display: flow-root;
  }
  .div-header {
    width: px2rem(189rem);
    height: px2rem(36rem);
    background: url('~@/assets/analysis/形状 1513@2x.png');
    background-size: 100% 100%;
    text-align: center;
    line-height: px2rem(36rem);
    color: #fff;
    font-size: px2rem(20rem);
    position: absolute;
    left: 50%;
    top: px2rem(-5rem);
    transform: translateX(-50%);
  }
  .div-content {
    height: 100%;
    overflow: hidden;
  }
}
</style>
