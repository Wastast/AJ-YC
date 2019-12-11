<template>
  <div class="home">
    <r-header title="依法治村 平安护村"></r-header>
    <l-home></l-home>
    <l-apprun></l-apprun>
    <l-event></l-event>
    <l-sightseeing></l-sightseeing>
    <!-- <l-smoke></l-smoke> -->
    <p-map></p-map>
  </div>
</template>

<script>
import RHeader from '@/components/Header';
import LHome from './Home';
import LApprun from './apprun';
import LEvent from './event';
import LSightseeing from './sightseeing';
// import LSmoke from './smoke';
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
    RHeader,
    LHome,
    LApprun,
    LEvent,
    LSightseeing,
    // LSmoke,
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
