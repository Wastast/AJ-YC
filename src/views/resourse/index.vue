<template>
  <div class="home">
    <r-header title="生态美村 发展强村"></r-header>
    <r-trash></r-trash>
    <r-travel></r-travel>
    <r-atmosphere></r-atmosphere>
    <r-bayonet></r-bayonet>
    <r-level></r-level>
    <r-park></r-park>
    <r-fire></r-fire>
    <r-hourse></r-hourse>
  </div>
</template>

<script>
import RHeader from '@/components/Header';
import RTrash from './Trash';
import RTravel from './Travel';
import RAtmosphere from './atmosphere';
import RBayonet from './bayonet';
import RLevel from './level';
import RPark from './park';
import RFire from './fire';
import RHourse from './hourse';
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
    RAtmosphere,
    RBayonet,
    RLevel,
    RPark,
    RFire,
    RHourse
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
