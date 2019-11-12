<template>
  <div class="Repair">
    <module-box title="乡村旅游">
      <template slot="content">
        这是内容
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box'
export default {
  name: 'Repair',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: {
    ModuleBox
  }
}
</script>

<style scoped lang="scss">
.Repair {
  position: absolute;
  top: px2rem(440rem);
  right: px2rem(10rem);
}
</style>
