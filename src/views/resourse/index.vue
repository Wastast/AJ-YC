<template>
  <div class="home">
    <r-header title="生态美村 发展强村"></r-header>
    <r-trash></r-trash>
    <r-travel></r-travel>
    <r-alarm></r-alarm>
    <r-atmosphere></r-atmosphere>
    <r-bayonet></r-bayonet>
    <r-level></r-level>
    <r-quality></r-quality>
  </div>
</template>

<script>
import RHeader from '@/components/Header';
import RTrash from './Trash';
import RTravel from './Travel';
import RAlarm from './alarm';
import RAtmosphere from './atmosphere';
import RBayonet from './bayonet';
import RLevel from './level';
import RQuality from './quality';
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
    RTrash,
    RTravel,
    RAlarm,
    RAtmosphere,
    RBayonet,
    RLevel,
    RQuality
  },
  mixins: [resize]
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
