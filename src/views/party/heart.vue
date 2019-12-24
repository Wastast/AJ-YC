<template>
  <div>
    <div class="heart">
      <party-box title="党建心连心" width="517" height="235">
        <template slot="content">
          <vuescroll :ops="ops">
            <ul class="ul">
              <li class="li" v-for="(item, index) of list" :key="index" @click="getData(item)">
                <span class="span span-title ellipsis">
                  {{ item.title }}
                </span>
                <span class="span span-event ellipsis">
                  {{ item.message }}
                </span>
                <span class="span span-time">
                  {{ item.createTime | fiterYMD }}
                </span>
              </li>
            </ul>
          </vuescroll>
        </template>
      </party-box>
    </div>
    <pop-box :title="'党建心连心'" :width="600" :height="350" :isPop.sync="isPop">
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
import { getHeart } from '@/api/party';
import vuescroll from 'vuescroll';
import PopBox from '@/components/PopBox';
export default {
  name: 'heart',
  data() {
    return {
      list: [],
      ops: {
        bar: {
          background: 'rgab(0,0,0,0)'
        }
      },
      event: {
        content: '',
        title: '',
        createDate: ''
      },
      isPop: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 获取党建心连心数据
    getData(item) {
      let { title, message, createTime } = item;
      this.event = {
        createDate: createTime,
        content: message,
        title
      };
      this.isPop = true;
    }
  },
  mounted() {
    getHeart().then(data => {
      if (data.code === 0) {
        this.list = data.data;
      }
    });
  },
  components: {
    PartyBox,
    vuescroll,
    PopBox
  }
};
</script>

<style scoped lang="scss">
.heart {
  position: absolute;
  top: px2rem(746rem);
  left: px2rem(1380rem);
  z-index: 100;
  .ul {
    display: flow-root;
    box-sizing: border-box;
    padding-top: px2rem(8rem);
    .li {
      width: 100%;
      float: left;
      height: px2rem(45rem);
      line-height: px2rem(45rem);
      cursor: pointer;
      .span {
        font-size: px2rem(16rem);
        position: absolute;
        display: inline-block;
      }
      .span-title {
        left: px2rem(23rem);
        color: rgba(78, 236, 255, 1);
        width: px2rem(80rem);
      }
      .span-event {
        left: px2rem(159rem);
        color: #fff;
        width: px2rem(200rem);
      }
      .span-time {
        left: px2rem(398rem);
        color: rgba(59, 157, 225, 1);
      }
      &:hover {
        background: rgba(4, 14, 44, 1);
      }
      &:nth-child(even) {
        background: rgba(4, 14, 44, 1);
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
