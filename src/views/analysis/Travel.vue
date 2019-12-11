<template>
  <div class="Travel">
    <module-box title="村情直通车">
      <template slot="content">
        <div class="wrapper">
          <scroll v-if="list.length > 0">
            <template slot="scroll-content">
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
                    {{ item.create_date.slice(0, 10) }}
                  </span>
                  <img
                    v-if="item.pic_url[0]"
                    class="img"
                    :src="
                      `${req}/dwdTourEventInfo/getImg?access_token=${token}&imgUrl=${item.pic_url[0]}`
                    "
                    alt=""
                  />
                </li>
              </ul>
            </template>
          </scroll>
        </div>
      </template>
    </module-box>
    <el-dialog
      :title="event.title"
      :visible.sync="dialogVisible"
      width="30%"
      :destroy-on-close="true"
    >
      <div class="poptext">
        <p class="p">事件发生时间: {{ event.time }}</p>
        <p class="p">事件内容: {{ event.content }}</p>
        <p class="p">事件来源: {{ textValue[event.user_type] }}</p>
        <div class="div-imgbox" v-if="event.imgurl">
          <img
            :src="`${req}/dwdTourEventInfo/getImg?access_token=${token}&imgUrl=${event.imgurl}`"
            alt=""
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box';
import { getEvent } from '@/api/analysis';
import { mapGetters } from 'vuex';
import Scroll from '@/components/Scroll';
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
      isScroll: false,
      textValue: {
        1: '村民上报信息',
        0: '家园卫队成员上报信息'
      },
      timer: null
    };
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {},
  methods: {
    // 获取事件信息
    getData(obj) {
      this.event.time = obj.create_date;
      this.event.content = obj.content;
      this.event.imgurl = obj.pic_url[0];
      this.event.title = obj.title;
      this.event.user_type = obj.user_type;
      this.dialogVisible = true;
    },
    // 请求事件
    requestEvent() {
      // 获取事件
      getEvent().then(data => {
        if (data.code === 200) {
          let list = data.data.repairList;
          this.list = list;
        }
      });
    }
  },
  mounted() {
    this.requestEvent();
    this.timer = setInterval(() => {
      this.requestEvent();
    }, 1000 * 60);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {
    ModuleBox,
    Scroll
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
    width: px2rem(494rem);
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
  .poptext {
    .p {
      line-height: px2rem(35rem);
    }
    .div-imgbox {
      width: px2rem(500rem);
      height: px2rem(500rem);
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
