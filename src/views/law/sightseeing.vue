<template>
  <div>
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
    <!-- <div class="shipin" v-if="isPop">
      <div class="pop-box-title">
        <h2 class="h2">
          视频通话
        </h2>
      </div>
      <div class="close" @click="popClose"></div>
      <div class="content">
        <div class="video-grid" id="video_grid" v-switch-video>
          <div id="local_stream" class="video-placeholder">
            <div id="local_video_info" class="video-info"></div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="shipin" v-if="isPop">
      <div class="pop-box-title">
        <h2 class="h2">
          视频通话
        </h2>
      </div>
      <div class="close" @click="popClose"></div>
      <div class="content">
        <!-- src="http://localhost:8099/web/index.html" -->
        <!-- src="http://localhost:8020/Web/index.html" -->
        <iframe
          src="http://localhost:8020/Web/index.html"
          scrolling="no"
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { EventBus } from '@/utils/event-bus';
export default {
  name: 'sightseeing',
  data() {
    return {
      value: '',
      imgRep: req.slice(0, -3),
      code: [
        '001001006',
        'e2a6e080fe00496386aff52b0b0b6017',
        'd2102790e235441cbefaf6b244c82dea',
        '61e626767df34eeab79f4f67509f26d2'
      ],
      isPop: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    popClose() {
      this.isPop = false;
    }
  },
  mounted() {},
  created() {
    // 监听拨打电话事件
    EventBus.$on('callphone', () => {
      // this.isPop = true;
      window.open('http://localhost:8020/Web/index.html');
    });
  },
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
.shipin {
  position: absolute;
  bottom: px2rem(50rem);
  left: px2rem(40rem);
  width: px2rem(600rem);
  height: px2rem(400rem);
  background: url('~@/assets/popbox/b@2x.png');
  background-size: 100% 100%;
  z-index: 9999;
  .pop-box-title {
    display: flow-root;
    position: absolute;
    top: px2rem(25rem);
    left: px2rem(30rem);
    .h2 {
      font-size: px2rem(16rem);
      font-weight: bold;
      color: #fff;
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      margin-left: px2rem(20rem);
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: px2rem(-20rem);
        transform: translateY(-50%);
        width: px2rem(14rem);
        height: px2rem(11rem);
        background: url('~@/assets/popbox/矩形 1 拷贝 2@2x.png');
        background-size: 100% 100%;
      }
    }
  }
  .close {
    width: px2rem(161rem);
    height: px2rem(115rem);
    background: url('~@/assets/popbox/矩形 1 拷贝@2x.png');
    background-size: 100% 100%;
    position: absolute;
    top: px2rem(-11rem);
    right: px2rem(-24rem);
    cursor: pointer;
    &:hover {
      filter: brightness(1.3);
    }
  }
  .content {
    box-sizing: border-box;
    position: relative;
    padding: 0 px2rem(23rem) 0 px2rem(13rem);
    height: px2rem(310rem);
    margin-top: px2rem(60rem);
    #video_grid {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 0 px2rem(40rem);
      .video-placeholder {
        position: absolute;
        top: 0;
        left: px2rem(15rem);
        width: px2rem(555rem);
        height: px2rem(310rem);
      }
      // .video-placeholder {
      //   position: absolute;
      //   top: 0;
      //   z-index: 9;
      //   right: 29px;
      //   width: 115px;
      //   height: 90px;
      // }
    }
  }
}
</style>
