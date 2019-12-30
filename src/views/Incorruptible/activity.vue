<template>
  <div>
    <div class="activity">
      <party-box title="志愿活动" width="652" height="242">
        <template slot="content">
          <ul class="ul">
            <vuescroll :ops="ops">
              <li class="li" v-for="(item, index) of list" :key="index" @click="getData(item)">
                <span class="span span-type ellipsis">{{ item.teamName }}</span>
                <span class="span span-title ellipsis" :title="item.title">{{ item.title }}</span>
                <span class="span span-message ellipsis" :title="item.message">{{
                  item.message
                }}</span>
                <span class="span span-time">{{ (item.createTime + '').slice(0, 10) }}</span>
              </li>
            </vuescroll>
          </ul>
        </template>
      </party-box>
    </div>
    <pop-box :title="event.teamName" :width="600" :height="350" :isPop.sync="isPop">
      <template slot="content">
        <div class="event-box">
          <div class="top">
            <span class="span span-title">
              {{ event.title }}
            </span>
            <span class="span span-time">
              {{ event.createDate | fiterYMD }}
            </span>
          </div>
          <div class="event-content">
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
import { getActivity } from '@/api/incorruptible';
import vuescroll from 'vuescroll';
import PopBox from '@/components/PopBox';
import { EventBus } from '@/utils/event-bus';
export default {
  name: 'activity',
  data() {
    return {
      type: 'wenyi',
      list: [],
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {}
      },
      textList: [
        {
          name: '两山文艺',
          type: 'wenyi'
        },
        {
          name: '家园卫队',
          type: 'weidui'
        },
        {
          name: '爱党敬业',
          type: 'jingye'
        }
      ],
      isPop: false,
      event: {
        content: '',
        title: '',
        createDate: '',
        teamName: ''
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 设置中心点
    getData(item) {
      let { title, message, teamName, createTime } = item;
      this.event = {
        title,
        content: message,
        teamName,
        createDate: createTime
      };
      this.isPop = true;
    }
  },
  mounted() {
    getActivity().then(data => {
      if (data.code === 0) {
        this.list = data.data;
      }
    });
  },
  components: {
    PartyBox,
    vuescroll,
    PopBox
  },
  created() {
    EventBus.$on('popActivity', ({ item }) => {
      this.getData(item);
    });
  }
};
</script>

<style scoped lang="scss">
.activity {
  position: absolute;
  top: px2rem(744rem);
  left: px2rem(663rem);
  z-index: 1050;
  display: flow-root;
  .div-top {
    margin: 0 auto;
    width: px2rem(355rem);
    height: px2rem(47rem);
    background: rgba(0, 36, 139, 0.2);
    border-radius: 24px;
    margin-top: px2rem(12rem);
    display: flex;
    span {
      margin: auto;
      display: inline-block;
      width: px2rem(102rem);
      height: px2rem(32rem);
      border-radius: 16px;
      text-align: center;
      line-height: px2rem(32rem);
      color: #fff;
      font-size: px2rem(16rem);
    }
    .checked {
      background: rgba(0, 104, 220, 0.4);
      font-weight: bold;
    }
  }
  .ul {
    display: flow-root;
    margin-top: px2rem(15rem);
    height: px2rem(212rem);
    .li {
      height: px2rem(53rem);
      position: relative;
      line-height: px2rem(53rem);
      cursor: pointer;
      &:nth-child(even) {
        background: rgba(5, 60, 140, 0.2);
      }
      &:hover {
        background: rgba(5, 60, 140, 0.5);
      }
      .span {
        position: absolute;
        color: #fff;
      }
      .span-type {
        left: px2rem(20rem);
        width: px2rem(100rem);
      }
      .span-title {
        left: px2rem(130rem);
        width: px2rem(110rem);
      }
      .span-message {
        left: px2rem(260rem);
        width: px2rem(262rem);
        font-weight: bold;
      }
      .span-time {
        right: px2rem(10rem);
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
    height: px2rem(230rem);
    width: 100%;
    color: #fff;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      background-color: rgba(0, 0, 0, 0);
    }
    .div-right {
      height: 100%;
      color: #fff;
      letter-spacing: 1px;
      line-height: px2rem(30rem);
      box-sizing: border-box;
      text-indent: 2em;
      padding: 0 px2rem(20rem);
      font-size: px2rem(20rem);
    }
  }
}
</style>
