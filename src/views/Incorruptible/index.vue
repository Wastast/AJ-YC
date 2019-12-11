<template>
  <div class="home">
    <r-header title="道德润村 清廉正村"></r-header>
    <i-activity></i-activity>
    <i-finance></i-finance>
    <i-mediate></i-mediate>
    <i-practice></i-practice>
    <!-- <i-volunteer></i-volunteer> -->
    <i-zhiyuan></i-zhiyuan>
    <i-map></i-map>
  </div>
</template>

<script>
import RHeader from '@/components/Header';
import IActivity from './activity';
import IFinance from './finance';
import IMediate from './mediate';
import IPractice from './practice';
// import IVolunteer from './volunteer'
import IZhiyuan from './zhiyuan';
import IMap from './map';
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
    IActivity,
    IFinance,
    IMediate,
    IPractice,
    // IVolunteer,
    IMap,
    IZhiyuan
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
