<template>
  <div class="fire">
    <party-box title="智慧消防" width="255" height="197">
      <template slot="content">
        <ul class="ul">
          <li class="li" v-for="(item, index) in list" :key="index">
            <div class="left">
              <p class="title">
                {{ item.name }}
              </p>
              <p class="value">
                {{ item.value }}
              </p>
            </div>
            <div class="right">
              <img :src="item.icon" alt="" />
            </div>
          </li>
        </ul>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
export default {
  name: 'fire',
  data() {
    return {
      list: [
        {
          icon: require('@/assets/resouse/fire.png'),
          name: '电子火花',
          value: '正常'
        },
        {
          icon: require('@/assets/resouse/smoke.png'),
          name: '烟感',
          value: '正常'
        }
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

<style scoped lang="scss">
.fire {
  position: absolute;
  top: px2rem(789rem);
  left: px2rem(41rem);
  z-index: 100;
  .ul {
    width: 100%;
    overflow: hidden;
    .li {
      margin: px2rem(10rem) auto 0;
      width: px2rem(180rem);
      height: px2rem(75rem);
      box-sizing: border-box;
      padding-left: px2rem(15rem);
      padding-top: px2rem(15rem);
      border-radius: 5px;
      position: relative;
      > div {
        float: left;
      }
      .left {
        .title {
          color: #506d8f;
        }
        .value {
          font-size: px2rem(24rem);
          margin-top: px2rem(10rem);
          color: #fff;
        }
      }
      .right {
        position: absolute;
        right: px2rem(15rem);
        bottom: px2rem(5rem);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
