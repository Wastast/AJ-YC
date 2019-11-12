<template>
  <div class="Travel">
    <module-box title="报事报修">
      <template slot="content">
        <ul class="ul">
          <li class="li"></li>
        </ul>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box'
export default {
  name: 'Travel',
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
.Travel {
  position: absolute;
  top: px2rem(730rem);
  right: px2rem(10rem);
}
</style>
