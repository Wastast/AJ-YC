<template>
  <div class="home" v-monitor-screen>
    <r-header title="依法治村 平安护村"></r-header>
    <l-home></l-home>
    <l-apprun></l-apprun>
    <l-event></l-event>
    <l-sightseeing></l-sightseeing>
    <p-map></p-map>
  </div>
</template>

<script>
import RHeader from '@/components/Header';
import LHome from './Home';
import LApprun from './apprun';
import LEvent from './event';
import LSightseeing from './sightseeing';
import PMap from './map';
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
    PMap
  }
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
