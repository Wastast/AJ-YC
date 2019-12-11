<template>
  <div class="public">
    <party-box title="治安视频" width="532" height="392"> </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
export default {
  name: 'public',
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
.public {
  position: absolute;
  top: px2rem(594rem);
  left: px2rem(1344rem);
  z-index: 100;
}
</style>
