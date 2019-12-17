<template>
  <div class="sightseeing">
    <party-box title="公共区域" width="592" height="380">
      <template slot="content">
        <div class="video-box">
          <div class="div" v-for="(item, index) of code" :key="index">
            <video v-video-play="item" muted></video>
          </div>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { TipsPop } from '@/utils/el_ui';
import { getVideoData } from '@/api/analysis';
export default {
  name: 'sightseeing',
  data() {
    return {
      value: '',
      imgRep: req.slice(0, -3),
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
  mounted() {},
  components: { PartyBox }
};
</script>
<style scoped>
.video >>> .el-dialog__body {
  padding: 0 20px 30px;
}
</style>
<style scoped>
.ul .li dt >>> .el-select {
  width: 100%;
}
.ul .li dt >>> .el-input__inner {
  border: 1px solid rgba(220, 223, 230, 0);
  background-color: #fff0;
}
</style>

<style scoped lang="scss">
.sightseeing {
  position: absolute;
  top: px2rem(602rem);
  left: px2rem(41rem);
  z-index: 1050;
  .video-box {
    margin-top: px2rem(10rem);
    .div {
      width: px2rem(280rem);
      height: px2rem(175rem);
      float: left;
      margin-left: px2rem(10rem);
      &:nth-child(n + 3) {
        margin-top: px2rem(10rem);
      }
      video {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
