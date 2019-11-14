<template>
  <div class="volunteer">
    <party-box title="志愿信息" width="532" height="392">
      <template slot="content">
        <ul class="ul">
          <li class="li" v-for="(item, index) of [1, 2]" :key="index">
            <div class="div-imgbox"></div>
            <div class="div-text">
              <p class="p-titles">
                青年志愿者队伍名称
              </p>
              <div class="text-box">
                由余村年轻人自愿组成的队伍，在不 为任何物质报酬的情况下，参与志愿
                工作，既是帮助他人、服务社会，同 时也是传递爱心和传播文明。
              </div>
            </div>
          </li>
        </ul>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
export default {
  name: 'volunteer',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: {
    PartyBox
  }
}
</script>

<style scoped>
.volunteer >>> .content {
  padding: 0.26rem 0.34rem 0 0.24rem;
}
</style>

<style scoped lang="scss">
.volunteer {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(1344rem);
  z-index: 1050;
  display: flow-root;
  .ul {
    .li {
      padding: px2rem(6rem) 0 0 px2rem(10rem);
      height: px2rem(160rem);
      background: rgba(3, 12, 35, 0.3);
      border-radius: 5px;
      box-sizing: border-box;
      display: flow-root;
      > div {
        float: left;
      }
      &:nth-child(n+2) {
        margin-top: px2rem(10rem);
      }
      .div-imgbox {
        width: px2rem(228rem);
        height: px2rem(149rem);
        background: #000;
        border-radius: 6px;
        overflow: hidden;
      }
      .div-text {
        display: flow-root;
        width: px2rem(224rem);
        margin-left: px2rem(19rem);
        .p-titles {
          font-size: px2rem(22rem);
          color: rgba(255, 255, 255, 1);
          margin-bottom: px2rem(20rem);
          display: inline-block;
        }
        .text-box {
          font-size: px2rem(14rem);
          line-height: 24px;
          color: rgba(159, 187, 201, 1);
        }
      }
    }
  }
}
</style>
