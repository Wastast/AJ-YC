<template>
  <div class="Repair">
    <module-box title="乡村旅游">
      <template slot="content">
        <div class="box">
          <repair-line></repair-line>
          <p class="p-title">
            实时游客数量
          </p>
        </div>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box';
import repairLine from './echarts/repair_line';
export default {
  name: 'Repair',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: {
    ModuleBox,
    repairLine
  }
};
</script>

<style scoped lang="scss">
.Repair {
  position: absolute;
  top: px2rem(440rem);
  right: px2rem(10rem);
  .box {
    width: 100%;
    height: 100%;
    .p-title {
      position: absolute;
      top: px2rem(40rem);
      left: px2rem(15rem);
      z-index: 1050;
      height: 0.66rem;
      line-height: 0.66rem;
      background: rgba(2, 7, 26, 0.68);
      border-radius: 0.08rem;
      padding: 0 0.32rem;
      color: #80a5ce;
      font-size: px2rem(18rem);
    }
  }
}
</style>
