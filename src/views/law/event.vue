<template>
  <div>
    <div class="event">
      <party-box title="村情直通车" width="652" height="242">
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
              <li class="li" v-for="item of list" :key="item.id" @click="getData(item)">
                <span class="span span-block"> </span>
                <span class="span span-text ellipsis">
                  {{ item.title }}
                </span>
                <span class="span span-event ellipsis">
                  {{ item.content }}
                </span>
                <span class="span span-time">
                  {{ item.eventDate | fiterYMD }}
                </span>
                <img
                  v-if="item.picUrl[0]"
                  class="img"
                  :src="
                    `${req}/dwdTourEventInfo/getImg?access_token=${token}&imgUrl=${item.picUrl[0]}`
                  "
                  alt=""
                />
              </li>
            </vuescroll>
          </ul>
        </template>
      </party-box>
    </div>
    <pop-box :title="'村情直通车'" :width="600" :height="350" :isPop.sync="isPop">
      <template slot="content">
        <div class="event-box">
          <div class="top">
            <span class="span span-title">
              {{ event.title }}
            </span>
            <span class="span span-time">
              {{ event.eventDate | fiterYMD }}
            </span>
          </div>
          <div class="event-content">
            <div class="div div-left">
              <img :src="event.imgurl" alt="暂无图片" />
            </div>
            <div class="div div-right">
              {{ event.content }}
            </div>
          </div>
        </div>
      </template>
    </pop-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { getEvent } from '@/api/analysis';
import vuescroll from 'vuescroll';
import { mapGetters } from 'vuex';
import PopBox from '@/components/PopBox';
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
      list: [],
      req,
      dialogVisible: false,
      event: {
        time: '',
        content: '',
        imgurl: '',
        title: '',
        user_type: ''
      },
      textValue: {
        1: '村民上报信息',
        0: '家园卫队成员上报信息'
      },
      isPop: false
    };
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {},
  methods: {
    // 获取事件信息
    getData(obj) {
      this.isPop = true;
      let { content, createDate, title } = obj;
      this.event = { content, createDate, title, imgurl: obj.picUrl[0] };
    }
  },
  mounted() {
    getEvent().then(data => {
      if (data.code === 200) {
        this.list = data.data;
      }
    });
  },
  components: { PartyBox, vuescroll, PopBox }
};
</script>

<style scoped lang="scss">
.event {
  position: absolute;
  top: px2rem(744rem);
  left: px2rem(663rem);
  z-index: 1050;
  .div-top {
    position: relative;
    display: flow-root;
    height: 0.96rem;
    line-height: 0.96rem;
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
      left: px2rem(420rem);
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
        width: px2rem(100rem);
      }
      .span-event {
        left: px2rem(177rem);
        width: px2rem(180rem);
      }
      .span-time {
        left: px2rem(400rem);
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
.event-box {
  .top {
    height: px2rem(45rem);
    background: rgba(7, 13, 37, 1);
    position: relative;
    line-height: px2rem(45rem);
    color: #fff;
    .span {
      position: absolute;
    }
    .span-title {
      left: px2rem(25rem);
      font-size: px2rem(18rem);
      &::before {
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        background: rgba(0, 246, 255, 1);
        vertical-align: middle;
        margin-right: px2rem(5rem);
      }
    }
    .span-time {
      right: px2rem(20rem);
    }
  }
  .event-content {
    box-sizing: border-box;
    padding-top: px2rem(20rem);
    height: px2rem(200rem);
    color: #fff;
    .div {
      float: left;
    }
    .div-left {
      width: px2rem(300rem);
      height: px2rem(200rem);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .div-right {
      margin-left: px2rem(10rem);
      height: 100%;
      color: #fff;
      width: px2rem(250rem);
      letter-spacing: 1px;
      line-height: px2rem(20rem);
    }
  }
}
</style>
