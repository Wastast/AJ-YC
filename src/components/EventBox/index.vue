<template>
  <div class="eventbox" @click="hide">
    <div class="Imgbox center-module" @click.stop="() => {}">
      <div class="face">
        <div class="c-title">
          <h3>村情直通车</h3>
          <a style="cursor: pointer;" @click="hide"></a>
        </div>
        <div class="content">
          <div class="img-box">
            <img src="@/assets/img/CY0A61.jpg" alt="" />
          </div>
          <div class="text-box">
            <p>村情标题: xxxxx</p>
            <p>村情时间: 2019-01-01</p>
            <p>村情内容: xxxxx</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'eventbox',
  data() {
    return {
      face: {
        humanName: '',
        glassName: '',
        genderName: '',
        faceTime: '',
        address: '',
        ageRange: '',
        image: ''
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    hide() {}
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.eventbox {
  overflow: hidden;
  z-index: 1055;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  .center-module {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(7, 11, 40, 0.8);
    .c-title {
      height: 1rem;
      line-height: 1rem;
      position: relative;
      width: 100%;
      background: url('~@/assets/popbox/imgboxTop.png');
      background-size: cover;
      h3 {
        margin-left: 0.4rem;
        font-size: 0.5rem;
        color: #ffffff;
      }
      a {
        display: block;
        position: absolute;
        top: 0.22rem;
        right: 0.38rem;
        width: 0.48rem;
        height: 0.48rem;
        background: url('~@/assets/popbox/close.png');
        background-size: cover;
      }
    }
  }
  .Imgbox {
    .face {
      width: 11.7rem;
      height: 5.72rem;
      .content {
        box-sizing: border-box;
        width: 100%;
        height: 4.72rem;
        padding: 0.4rem 0 0 0.4rem;
        div {
          float: left;
        }
        .img-box {
          width: 3.92rem;
          height: 3.92rem;
          margin-right: 0.5rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text-box {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.3rem;
          span {
            color: #ffffff;
          }
          p {
            &:nth-child() {
              margin-top: 0.43rem;
            }
          }
        }
      }
    }
  }
}
</style>
