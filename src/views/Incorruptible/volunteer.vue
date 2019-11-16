<template>
  <div class="volunteer">
    <party-box title="志愿信息" width="532" height="392">
      <template slot="content">
        <ul class="ul">
          <vuescroll ref="vs">
            <li class="li" v-for="(item, index) of list" :key="index">
              <div class="div-imgbox">
                <img src="@/assets/img/fengchebuluo.jpg" alt="" />
              </div>
              <div class="div-text">
                <p class="p-titles ellipsis">
                  {{ item.title }}
                </p>
                <div class="text-box" :title="item.message">
                  {{ (item.message + '').slice(0, 80) }}
                </div>
              </div>
            </li>
          </vuescroll>
        </ul>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { getVolunteer, getMediate } from '@/api/incorruptible'
import vuescroll from 'vuescroll'
export default {
  name: 'volunteer',
  data() {
    return {
      list: []
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    getVolunteer().then(data => {})
    getMediate().then(data => {
      if (data.code === 0) {
        this.list = data.data
      }
      this.$refs['vs'].scrollTo(
        {
          y: '500'
        },
        1000 * 5
      )
    })
  },
  components: {
    PartyBox,
    vuescroll
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
    height: px2rem(330rem);
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
      &:nth-child(n + 2) {
        margin-top: px2rem(10rem);
      }
      .div-imgbox {
        width: px2rem(228rem);
        height: px2rem(149rem);
        background: #000;
        border-radius: 6px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
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
          width: px2rem(225rem);
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
