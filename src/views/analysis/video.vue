<template>
  <div class="video">
    <ul class="ul" v-video-play="video">
      <!-- <li class="li" v-for="item of list" :key="item.type" @click="popVideo(item.type)">
        <img :src="item.img" alt="" />
      </li> -->
    </ul>

    <!-- <el-dialog
      :modal="false"
      title="提示"
      @opened="getVideo"
      :destroy-on-close="true"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div style="height: 500px;">
        <object
          classid="CLSID:7E393848-7238-4CE3-82EE-44AF444B240A"
          wmode="opaque"
          id="PlayViewOCX"
          style="width:100%;height:100%;"
        ></object>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { getVideoData } from '@/api/analysis';
import { TipsPop } from '@/utils/el_ui';
export default {
  name: 'Video',
  data() {
    return {
      video: {
        layout: '1x4',
        code: [
          '33052358001320515288',
          '33052358001320515288',
          '33052358001320515288',
          '33052358001320515288'
        ]
      }
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
  // #PlayViewOCX {
  //   height: 100%;
  // }
}
</style>
