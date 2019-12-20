<template>
  <div>
    <div class="Travel">
      <module-box title="村情直通车">
        <template slot="content">
          <div class="wrapper">
            <vuescroll :ops="ops">
              <ul class="ul">
                <li
                  class="li"
                  v-for="(item, index) of list"
                  :key="item.id"
                  :data-id="index"
                  @click="getData(item)"
                >
                  <span class="span span-block"> </span>
                  <span class="span span-text ellipsis" :title="item.title">
                    {{ item.title }}
                  </span>
                  <span class="span span-event ellipsis" :title="item.content">
                    {{ item.content }}
                  </span>
                  <span class="span span-time">
                    {{ item.createDate | fiterYMD }}
                  </span>
                  <img
                    v-if="item.picUrl.length > 0"
                    class="img"
                    :src="
                      `${req}/dwdTourEventInfo/getImg?access_token=${token}&imgUrl=${item.picUrl[0]}`
                    "
                  />
                </li>
              </ul>
            </vuescroll>
          </div>
        </template>
      </module-box>
    </div>

    <pop-box :title="'村情直通车'" :width="600" :height="350" :isPop.sync="isPop">
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

    <div class="alerm-box" v-if="eventList.length > 0">
      <div class="pop-box-title">
        <h2 class="h2">
          事件弹窗
        </h2>
      </div>
      <div class="close" @click="popClose"></div>
      <div class="content">
        <ul class="ul">
          <li class="li" v-for="(item, index) in eventList" :key="index">
            <span class="span span-block"> </span>
            <span class="span span-text ellipsis" :title="item.title">
              {{ item.title }}
            </span>
            <span class="span span-event ellipsis" :title="item.content">
              {{ item.content }}
            </span>
            <span class="span span-time">
              {{ item.createDate | fiterYMD }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box';
import { getEvent } from '@/api/analysis';
import { mapGetters } from 'vuex';
import vuescroll from 'vuescroll';
import PopBox from '@/components/PopBox';
export default {
  name: 'Travel',
  data() {
    return {
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
      isPop: false,
      textValue: {
        1: '村民上报信息',
        0: '家园卫队成员上报信息'
      },
      timer: null,
      ops: {
        bar: {
          background: 'rgba(0,0,0,0)'
        }
      },
      eventList: [],
      websocket: null
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
    },
    // 请求事件
    requestEvent() {
      // 获取事件
      getEvent().then(data => {
        if (data.code === 200) {
          let list = data.data;
          this.list = list;
        }
      });
    },
    // 关闭事件弹窗
    popClose() {
      this.eventList = [];
      this.getEvent();
    },
    // 请求事件
    getEvent() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.requestEvent();
      this.timer = setInterval(() => {
        this.requestEvent();
      }, 1000 * 60);
    }
  },
  mounted() {
    this.getEvent();

    this.websocket = new WebSocket('ws://220.189.235.230:8083/websocket/eventInfo');
    this.websocket.onopen = event => {
      console.log('成功连接');
    };
    // 连接发生错误的回调方法
    this.websocket.onerror = () => {
      console.log('报错');
    };
    this.websocket.onmessage = event => {
      let arr = JSON.parse(event.data);
      arr.forEach(item => {
        console.log(item);
        this.eventList.unshift(item);
      });
    };
  },
  beforeDestroy() {
    this.websocket.close();
    clearInterval(this.timer);
  },
  components: {
    ModuleBox,
    vuescroll,
    PopBox
  }
};
</script>

<style scoped>
.Travel >>> .index {
  padding: 0.7rem 0.39rem 0.3rem 0.15rem;
}
</style>

<style scoped lang="scss">
.Travel {
  position: absolute;
  top: px2rem(737rem);
  right: px2rem(10rem);
  .wrapper {
    width: px2rem(498rem);
    height: px2rem(234rem);
    box-sizing: border-box;
    overflow: hidden;
    .ul {
      display: flow-root;
      .li {
        height: px2rem(47rem);
        line-height: px2rem(47rem);
        position: relative;
        cursor: pointer;
        font-size: px2rem(15rem);
        &:nth-child(even) {
          background: rgba(123, 110, 147, 0.2);
        }
        &:hover {
          background: rgba(123, 110, 147, 0.5);
        }
        .span {
          display: inline-block;
          color: #fff;
          font-family: PingFangSC;
          position: absolute;
        }
        .span-block {
          left: px2rem(22rem);
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          background: rgba(83, 212, 255, 1);
        }
        .span-text {
          left: px2rem(40rem);
          width: px2rem(75rem);
        }
        .span-event {
          left: px2rem(143rem);
          width: px2rem(145rem);
        }
        .span-time {
          left: px2rem(302rem);
        }
        .img {
          width: px2rem(56rem);
          height: px2rem(30rem);
          position: absolute;
          right: px2rem(22rem);
          top: 50%;
          transform: translateY(-50%);
        }
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
.alerm-box {
  position: absolute;
  bottom: 0;
  right: 0;
  background: url('~@/assets/popbox/b@2x.png');
  background-size: 100% 100%;
  width: px2rem(386rem);
  height: px2rem(252rem);
  z-index: 1051;
  box-sizing: border-box;
  padding-top: 1.2rem;
  .pop-box-title {
    display: flow-root;
    position: absolute;
    top: px2rem(25rem);
    left: px2rem(30rem);
    .h2 {
      font-size: px2rem(16rem);
      font-weight: bold;
      color: #fff;
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      margin-left: px2rem(20rem);
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: px2rem(-20rem);
        transform: translateY(-50%);
        width: px2rem(14rem);
        height: px2rem(11rem);
        background: url('~@/assets/popbox/矩形 1 拷贝 2@2x.png');
        background-size: 100% 100%;
      }
    }
  }
  .close {
    width: px2rem(161rem);
    height: px2rem(115rem);
    background: url('~@/assets/popbox/矩形 1 拷贝@2x.png');
    background-size: 100% 100%;
    position: absolute;
    top: px2rem(-11rem);
    right: px2rem(-24rem);
    cursor: pointer;
    &:hover {
      filter: brightness(1.3);
    }
  }
  .content {
    box-sizing: border-box;
    position: relative;
    padding: 0 px2rem(23rem) 0 px2rem(13rem);
    .ul {
      overflow: hidden;
      .li {
        width: px2rem(372rem);
        height: px2rem(45rem);
        line-height: px2rem(45rem);
        position: relative;
        &:nth-child(odd) {
          background: rgba(7, 13, 37, 1);
        }
        .span {
          display: inline-block;
          color: #fff;
          font-family: PingFangSC;
          position: absolute;
        }
        .span-block {
          left: px2rem(22rem);
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          background: rgba(83, 212, 255, 1);
        }
        .span-text {
          left: px2rem(40rem);
          width: px2rem(75rem);
        }
        .span-event {
          left: px2rem(130rem);
          width: px2rem(145rem);
        }
        .span-time {
          left: px2rem(290rem);
        }
      }
    }
  }
}
</style>
