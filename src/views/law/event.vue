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
            <li class="li" v-for="item of list" :key="item.id" @click="getData(item)">
              <span class="span span-block"> </span>
              <span class="span span-text ellipsis">
                {{ item.title }}
              </span>
              <span class="span span-event ellipsis">
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
          </vuescroll>
        </ul>
      </template>
    </party-box>
    <el-dialog
      :title="event.title"
      :visible.sync="dialogVisible"
      width="30%"
      :destroy-on-close="true"
      :modal="false"
    >
      <div class="poptext">
        <p class="p">事件发生时间: {{ event.time }}</p>
        <p class="p">事件内容: {{ event.content }}</p>
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
import PartyBox from '@/components/party-box'
import { getEvent } from '@/api/analysis'
import vuescroll from 'vuescroll'
import { mapGetters } from 'vuex'
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
        title: ''
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {},
  methods: {
    // 获取事件信息
    getData(obj) {
      this.event.time = obj.create_date
      this.event.content = obj.content
      this.event.imgurl = obj.pic_url[0]
      this.event.title = obj.title
      this.dialogVisible = true
    }
  },
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
  z-index: 1050;
  .div-top {
    // margin-bottom: px2rem(28rem);
    // margin-top: px2rem(20rem);
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
        width: px2rem(100rem);
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
