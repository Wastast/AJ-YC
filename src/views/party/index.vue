<template>
  <div class="home">
    <p-header title="支部带村 民主管村"></p-header>
    <p-zhanshi></p-zhanshi>
    <p-open></p-open>
    <p-framework></p-framework>
    <p-heart></p-heart>
    <p-map></p-map>
  </div>
</template>

<script>
import PHeader from '@/components/Header';
import PZhanshi from './zhanshi';
import POpen from './open';
import PFramework from './Framework';
import PHeart from './heart';
import PMap from './map';
import { resize } from '@/mixin';
export default {
  name: 'home',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: {
    PHeader,
    PZhanshi,
    POpen,
    PFramework,
    PHeart,
    PMap
  },
  mixins: [resize]
};
</script>

<style scoped lang="scss">
.home {
  width: px2rem(1920rem);
  height: px2rem(1080rem);
  background: url('~@/assets/resouse/background.png');
  background-size: 100% 100%;
  display: flow-root;
}
</style>
