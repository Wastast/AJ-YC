<template>
  <div class="practice">
    <party-box title="文明实践" width="592" height="297">
      <template slot="content">
        <div class="box">
          <div class="list-box">
            <ul class="ul">
              <li class="li" v-for="(item, index) of list" :key="index">
                <div class="div-imgbox">
                  <img src="@/assets/img/露营基地.jpg" />
                </div>
                <p class="p-title">
                  {{ item.title }}
                </p>
                <p class="p-time">时间：{{ (item.createTime + '').slice(0, 10) }}</p>
                <p class="p-people">
                  人员：{{item.author}}
                </p>
              </li>
            </ul>
          </div>
          <div class="div-arrow"></div>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { getPracticeInfo } from '@/api/incorruptible'
export default {
  name: 'practice',
  data() {
    return {
      list: []
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    getPracticeInfo().then(data => {
      if (data.code === 0) {
        this.list = data.data.slice(0, 2)
      }
    })
  },
  components: {
    PartyBox
  }
}
</script>

<style scoped lang="scss">
.practice {
  position: absolute;
  top: px2rem(682rem);
  left: px2rem(41rem);
  z-index: 1050;
  display: flow-root;
  .box {
    display: flow-root;
    > div {
      float: left;
    }
    .list-box {
      .ul {
        box-sizing: border-box;
        padding-left: px2rem(12rem);
        padding-top: px2rem(21rem);
        .li {
          width: px2rem(250rem);
          height: px2rem(264rem);
          background: rgba(3, 12, 35, 0.3);
          border-radius: 5px;
          float: left;
          box-sizing: border-box;
          padding: px2rem(8rem) px2rem(12rem) 0 px2rem(10rem);
          &:nth-child(n + 2) {
            margin-left: px2rem(10rem);
          }
          .div-imgbox {
            width: px2rem(228rem);
            height: px2rem(149rem);
            border-radius: px2rem(6rem);
            overflow: hidden;
            background: #000;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .p-title {
            color: #fff;
            font-size: px2rem(22rem);
            margin-top: px2rem(15rem);
          }
          .p-time {
            color: rgba(0, 252, 255, 1);
            margin-top: px2rem(16rem);
          }
          .p-people {
            color: rgba(0, 252, 255, 1);
            margin-top: px2rem(16rem);
          }
        }
      }
    }
    .div-arrow {
      width: px2rem(42rem);
      height: px2rem(264rem);
      background: rgba(3, 12, 35, 0.3);
      border-radius: 5px;
      margin-top: px2rem(21rem);
      margin-left: px2rem(11rem);
      cursor: pointer;
    }
  }
}
</style>
