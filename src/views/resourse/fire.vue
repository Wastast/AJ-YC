<template>
  <div class="fire">
    <party-box title="智慧消防" width="255" height="197">
      <template slot="content">
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
export default {
  name: 'fire',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: { PartyBox }
};
</script>

<style scoped lang="scss">
.fire {
  position: absolute;
  top: px2rem(789rem);
  left: px2rem(41rem);
  z-index: 100;
}
</style>
