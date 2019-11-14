<template>
  <div class="event">
    <party-box title="事件统计" width="652" height="242">
      <template slot="content">
        <div class="div-top">
          <span class="span span-text">
            标题
          </span>
          <span class="span span-event">
            详情
          </span>
          <span class="span span-time">
            时间
          </span>
          <span class="span img">
            配图
          </span>
        </div>
        <ul class="ul">
          <vuescroll :ops="ops">
            <li class="li" v-for="item of list" :key="item.id">
              <span class="span span-block"> </span>
              <span class="span span-text">
                {{ item.title }}
              </span>
              <span class="span span-event ellipsis">
                {{ item.content }}
              </span>
              <span class="span span-time">
                {{ item.create_date.slice(0, 10) }}
              </span>
              <img class="img" :src="item.pic_url[0]" alt="" />
            </li>
          </vuescroll>
        </ul>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { getEvent } from '@/api/analysis'
import vuescroll from 'vuescroll'
export default {
  name: 'event',
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {}
      },
      list: []
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    getEvent().then(data => {
      if (data.code === 200) {
        this.list = data.data.repairList
      }
    })
  },
  components: { PartyBox, vuescroll }
}
</script>

<style scoped lang="scss">
.event {
  position: absolute;
  top: px2rem(744rem);
  left: px2rem(663rem);
  z-index: 100;
  .div-top {
    margin-bottom: px2rem(28rem);
    margin-top: px2rem(20rem);
    position: relative;
    display: flow-root;
    .span {
      color: rgba(44, 137, 232, 1);
    }
    .span {
      display: inline-block;
      font-family: PingFangSC;
      position: absolute;
    }
    .span-block {
      left: px2rem(37rem);
      top: 50%;
      transform: translateY(-50%);
      width: px2rem(8rem);
      height: px2rem(8rem);
      border-radius: 50%;
    }
    .span-text {
      left: px2rem(55rem);
    }
    .span-event {
      left: px2rem(177rem);
      width: px2rem(180rem);
    }
    .span-time {
      left: px2rem(388rem);
    }
    .img {
      width: px2rem(50rem);
      height: px2rem(28rem);
      position: absolute;
      right: px2rem(22rem);
    }
  }
  .ul {
    height: px2rem(191rem);
    .li {
      height: px2rem(32rem);
      line-height: px2rem(32rem);
      position: relative;
      cursor: pointer;
      &:nth-child(even) {
        background: rgba(4, 14, 42, 0.7);
      }
      &:hover {
        background: rgba(4, 14, 42, 0.7);
      }
      .span {
        display: inline-block;
        color: #fff;
        font-family: PingFangSC;
        position: absolute;
      }
      .span-block {
        left: px2rem(37rem);
        top: 50%;
        transform: translateY(-50%);
        width: px2rem(8rem);
        height: px2rem(8rem);
        border-radius: 50%;
        background: rgba(44, 74, 186, 1);
      }
      .span-text {
        left: px2rem(55rem);
      }
      .span-event {
        left: px2rem(177rem);
        width: px2rem(180rem);
      }
      .span-time {
        left: px2rem(388rem);
        color: rgba(255, 255, 255, 0.6);
      }
      .img {
        width: px2rem(50rem);
        height: px2rem(28rem);
        position: absolute;
        right: px2rem(22rem);
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
