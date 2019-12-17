<template>
  <div class="hourse">
    <party-box title="民宿监测" width="590" height="620">
      <template slot="content">
        <div class="top">
          <ul class="ul">
            <li class="li" v-for="(item, index) in hourseList" :key="index">
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
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
export default {
  name: 'hourse',
  data() {
    return {
      hourseList: [
        {
          name: '总房间数',
          value: '302',
          icon: require('@/assets/resouse/people.png')
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
.hourse {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(663rem);
  z-index: 100;
  .top {
    box-sizing: border-box;
    padding-top: px2rem(30rem);
    .ul {
      .li {
        width: px2rem(185rem);
        height: px2rem(75rem);
        background: #000b38;
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
            font-family: 'DS-DIGII';
            font-size: px2rem(36rem);
            margin-top: px2rem(5rem);
            color: #fff;
          }
        }
        .right {
          position: absolute;
          right: px2rem(20rem);
          bottom: px2rem(5rem);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
