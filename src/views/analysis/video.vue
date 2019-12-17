<template>
  <div class="video">
    <div class="div" v-for="(item, index) of code" :key="index">
      <video v-video-play="item" muted></video>
    </div>
  </div>
</template>

<script>
import { getVideoData } from '@/api/analysis';
import { TipsPop } from '@/utils/el_ui';
export default {
  name: 'Video',
  data() {
    return {
      code: [
        '5bc6b7dd26e34f83a5091bf5b6a8420a',
        '7e61ca0ed015445db18d5cb44902e6a3',
        'd2102790e235441cbefaf6b244c82dea',
        '61e626767df34eeab79f4f67509f26d2'
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.video >>> .el-dialog__body {
  padding: 0 20px 30px;
}
</style>

<style scoped lang="scss">
.video {
  position: absolute;
  top: px2rem(790rem);
  left: px2rem(554rem);
  z-index: 1050;
  width: px2rem(820rem);
  height: px2rem(105rem);
  .div {
    float: left;
    width: px2rem(200rem);
    height: px2rem(100rem);
    float: left;
    &:nth-child(n + 2) {
      margin-left: px2rem(6rem);
    }
    video {
      width: 100%;
      height: 100%;
    }
  }
  .ul {
    width: 100%;
    height: 100%;
    .li {
      width: px2rem(200rem);
      height: px2rem(100rem);
      float: left;
      &:nth-child(n + 2) {
        margin-left: px2rem(8rem);
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
