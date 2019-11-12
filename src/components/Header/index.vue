<template>
  <div class="Header">
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '这是标题'
    }
  },
  name: 'Header',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {}
}
</script>

<style scoped lang="scss">
.Header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: px2rem(104rem);
  background: url('~@/assets/analysis/背景@2x.png');
  background-size: 100% 100%;
  // width: px2rem(1912rem);
  // height: px2rem(1080rem);
  // background: url('~@/assets/analysis/tab@2x.png');
  // background-size: 100% 100%;
}
</style>
