<template>
  <div>
    <div class="Home">
      <party-box title="家园卫队" width="592" height="392">
        <template slot="content">
          <div class="div-box" v-for="(item, index) of list" :key="index" @click="drawCircle(item)">
            <div class="title">第{{ index + 1 }}组</div>
            <ul class="ul">
              <li
                class="li"
                v-for="(items, index) of item.node"
                :key="index"
                :class="memberId === items.id ? 'checked' : ''"
                @click="getmember(items)"
              >
                <dl>
                  <dt :style="{ color: items.state ? '#fff' : '#999' }">
                    {{ items.name }}
                    <span class="span-zuzhang">
                      {{ items.remark == '村民组长' ? '组长' : '' }}
                    </span>
                  </dt>
                  <dd :style="{ color: items.state ? '#fff' : '#999' }">{{ items.phone }}</dd>
                </dl>
              </li>
            </ul>
          </div>
        </template>
      </party-box>
    </div>
    <div class="event-box" v-if="memberId">
      <div class="icon" @click="checkEvent"></div>
      <div class="event-list" v-if="isEvent">
        <vuescroll :ops="ops">
          <ul class="ul">
            <li class="li" v-for="(item, index) in eventList" :key="index">
              <span class="span span-title ellipsis">
                {{ item.title }}
              </span>
              <span class="span span-desc ellipsis">
                {{ item.content }}
              </span>
              <span class="span span-time">
                {{ item.createDate | fiterYMD }}
              </span>
            </li>
          </ul>
        </vuescroll>
      </div>
    </div>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { getHome, getHomeEvent } from '@/api/law';
import { TipsPop } from '@/utils/el_ui';
import vuescroll from 'vuescroll';
export default {
  name: 'Home',
  data() {
    return {
      list: [],
      memberId: null,
      isEvent: false,
      eventList: [],
      ops: {
        bar: {
          background: 'rgba(0,0,0,0)'
        }
      }
    };
  },
  computed: {},
  watch: {
    isEvent(n, o) {
      if (n) {
        getHomeEvent().then(data => {
          if (data.code === 200) {
            this.eventList = data.data;
          }
        });
      }
    }
  },
  methods: {
    // 绘制圆圈
    async drawCircle(item) {
      let range = item.range;
      if (!range) {
        return;
      }
      await TMapAPI.ClearFeatures();
      var ppsMainBuild = SPoint.GetPointSFromString(range);
      var xlMansion = new SLineString(ppsMainBuild);
      var fsMansion = new SFeatureStyle();
      fsMansion.SetFillColor('transparent');
      fsMansion.SetFillColor('#B56FE2');
      // 模型边框外壳
      fsMansion.SetStrokeWidth(0);
      // fsMansion.SetStrokeColor("#B56FE2");
      fsMansion.SetHoverFillColor('#B56FE2');
      fsMansion.SetHoverStrokeColor('#B56FE2');
      // 外壳2
      fsMansion.SetHoverStrokeWidth(2);
      fsMansion.SetHoverEnabled(true);
      // 范围 属性 TAG 扩展说明
      var pfMansion = new SFeature(xlMansion, fsMansion, '1');
      TMapAPI.GetVectorLayer().AddFeatures([pfMansion]);
      TMapAPI.map.SetCenter(new SLonLat(item.lon, item.lat), 2);
      TMapAPI.map.SetCenter(new SLonLat(item.lon, item.lat), 1);
    },
    // 获取组员数据
    getmember(item) {
      let { state, id } = item;
      if (this.memberId === id) {
        this.memberId = null;
        this.isEvent = false;
        TMapAPI.ClearFeatures();
        return;
      }
      if (!state) {
        TipsPop({
          message: '当前组员没有值班，无法查看',
          type: 'info'
        });
        return;
      }
      this.memberId = id;
    },
    // 切换历史事件列表
    checkEvent() {
      this.isEvent = !this.isEvent;
    }
  },
  mounted() {
    getHome().then(data => {
      if (data.code === 200) {
        this.list = data.data;
      }
    });
  },
  components: { PartyBox, vuescroll }
};
</script>

<style scoped lang="scss">
.Home {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(41rem);
  z-index: 100;
  // .div-box {
  //   box-sizing: border-box;
  //   padding-left: px2rem(10rem);
  //   padding-top: px2rem(8rem);
  //   float: left;
  //   height: px2rem(180rem);
  //   .title {
  //     color: rgba(128, 165, 206, 1);
  //     margin-bottom: px2rem(5rem);
  //   }
  //   .ul {
  //     background: rgba(0, 0, 0, 0.3);
  //     border-radius: 5px;
  //     width: px2rem(136rem);
  //     box-sizing: border-box;
  //     padding: px2rem(5rem) px2rem(12rem) px2rem(10rem) px2rem(12rem);
  //     .li {
  //       dt {
  //         font-size: px2rem(18rem);
  //         color: rgba(13, 123, 225, 1);
  //       }
  //       dd {
  //         margin-top: px2rem(5rem);
  //         color: #fff;
  //         font-size: px2rem(16rem);
  //       }
  //       &:nth-child(n + 2) {
  //         margin-top: px2rem(14rem);
  //       }
  //     }
  //   }
  // }
  .div-box {
    width: px2rem(138rem);
    height: px2rem(184rem);
    background: rgba(4, 9, 27, 1);
    border: 1px solid rgba(26, 47, 99, 1);
    border-radius: 6px;
    float: left;
    margin-left: px2rem(8rem);
    box-sizing: border-box;
    margin-top: px2rem(7rem);
    .title {
      line-height: px2rem(24rem);
      color: rgba(0, 246, 255, 1);
      font-size: px2rem(16rem);
      font-weight: bold;
      box-sizing: border-box;
      padding-left: px2rem(16rem);
    }
    .ul {
      overflow: hidden;
      .li {
        width: px2rem(128rem);
        height: px2rem(47rem);
        margin: 0 auto;
        background: rgba(26, 47, 99, 0.3);
        border-radius: 4px;
        margin-top: px2rem(5rem);
        position: relative;
        box-sizing: border-box;
        padding-left: px2rem(10rem);
        padding-top: px2rem(6rem);
        cursor: pointer;
        box-sizing: border-box;
        &:hover {
          &::before {
            content: '';
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 1px solid darkgrey;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        dl {
          dt {
            font-weight: bold;
            .span-zuzhang {
              position: absolute;
              right: px2rem(5rem);
              top: px2rem(5rem);
              font-size: 12px;
              color: rgba(1, 136, 242, 1);
            }
          }
          dd {
            margin-top: px2rem(7rem);
          }
        }
      }
      .checked {
        &::before {
          content: '';
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border: 1px solid darkgrey;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }
}
.event-box {
  position: absolute;
  top: px2rem(221rem);
  left: px2rem(1230rem);
  z-index: 1099;
  .icon {
    width: px2rem(53rem);
    height: px2rem(66rem);
    background: url('~@/assets/law/shijianpeizhi@2x.png');
    background-size: 100% 100%;
    cursor: pointer;
  }
  .event-list {
    width: px2rem(424rem);
    height: px2rem(146rem);
    background: url('~@/assets/law/eventlist.png');
    background-size: 100% 100%;
    position: absolute;
    top: px2rem(20rem);
    left: px2rem(-440rem);
    overflow: hidden;
    .ul {
      box-sizing: border-box;
      padding-right: px2rem(14rem);
      display: flow-root;
      .li {
        position: relative;
        height: px2rem(45rem);
        line-height: px2rem(45rem);
        color: #fff;
        cursor: pointer;
        .span {
          position: absolute;
        }
        .span-title {
          left: px2rem(25rem);
          width: px2rem(80rem);
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
        .span-desc {
          left: px2rem(115rem);
          width: px2rem(165rem);
          font-weight: bold;
          color: rgba(0, 246, 255, 1);
        }
        .span-time {
          left: px2rem(302rem);
        }
      }
    }
  }
}
</style>
