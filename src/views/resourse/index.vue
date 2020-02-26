<template>
  <div class="home" v-monitor-screen>
    <r-header title="生态美村 发展强村"></r-header>
    <r-trash></r-trash>
    <r-travel></r-travel>
    <r-atmosphere></r-atmosphere>
    <r-level></r-level>
    <r-park></r-park>
    <r-fire></r-fire>
    <r-hourse></r-hourse>
    <r-venture></r-venture>
  </div>
</template>

<script>
import RHeader from '@/components/Header';
import RTrash from './Trash';
import RTravel from './Travelgai';
import RAtmosphere from './atmosphere';
import RLevel from './level';
import RPark from './park';
import RFire from './fire';
import RHourse from './hourse';
import RVenture from './Venture';
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
    RTrash,
    RTravel,
    RAtmosphere,
    RLevel,
    RPark,
    RFire,
    RHourse,
    RVenture
  }
};
</script>

<style scoped lang="scss">
@import url('~@/icons/numberIcon/font.css');
.home {
  width: px2rem(1920rem);
  height: px2rem(1080rem);
  background: url('~@/assets/resouse/background.png');
  background-size: 100% 100%;
  display: flow-root;
}
</style>
