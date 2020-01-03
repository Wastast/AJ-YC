<template>
  <div>
    <div class="zhiyuan">
      <party-box title="志愿信息" width="532" height="605">
        <template slot="content">
          <div class="div-top">
            <ul class="ul">
              <li class="li" v-for="(item, index) of peopleList" :key="index">
                <span class="span span-icon"> </span>
                <span class="span span-name ellipsis">
                  {{ item.teamName }}
                </span>
                <span class="span span-btn" @click="getValue(item)">
                  详情
                </span>
              </li>
            </ul>
          </div>
          <div class="center">
            <ul class="ul">
              <li
                class="li"
                v-for="(item, index) in typeList"
                :key="index"
                :class="type === item.type ? 'checked' : ''"
                @click="checkTyep(item.type)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="bottom">
            <div class="zy" v-if="type === 'zhiyuan'">
              <vuescroll>
                <ul class="ul">
                  <li class="li" v-for="(item, index) of nowPeople" :key="index">
                    <span class="span span-name">{{ item.name }}</span>
                    <span class="span span-number">{{ item.phone }}</span>
                  </li>
                </ul>
              </vuescroll>
            </div>
            <div class="huodong" v-if="type === 'huodong'">
              <vuescroll>
                <ul class="ul">
                  <li
                    class="li"
                    v-for="(item, index) of nowPeople"
                    :key="index"
                    @click="getDesc(item)"
                  >
                    <span class="span span-title ellipsis">{{ item.title }}</span>
                    <span class="span span-message ellipsis">{{ item.message }}</span>
                  </li>
                </ul>
              </vuescroll>
            </div>
          </div>
        </template>
      </party-box>
    </div>

    <div class="mark" v-if="isPop" @click="popClose">
      <div class="pop-box" @click.stop="() => {}">
        <div class="pop-box-title">
          <h2 class="h2">
            志愿队伍详情
          </h2>
        </div>
        <div class="close" @click="popClose"></div>
        <div class="content">
          <div class="pop-content">
            <div class="top">
              <div class="img"></div>
              <div class="name ellipsis" :title="value.teamName">
                {{ value.teamName }}
              </div>
              <div class="huodong cishu">
                <p>本年度</p>
                <p>活动次数</p>
              </div>
              <div class="huodongblue">
                {{ value.times }}
              </div>
              <div class="fuwu cishu">
                <p>本年度</p>
                <p>服务人数</p>
              </div>
              <div class="fuwublue">
                {{ value.num }}
              </div>
            </div>
            <div class="div-center">
              <p class="chengyuan">队伍成员 :</p>
              <div class="name">
                <span v-for="(item, index) of value.organize" :key="index">
                  {{ item.name + '、' }}
                </span>
              </div>
            </div>
            <div class="div-bottom">
              <p class="chengyuan">活动列表 :</p>
              <ul class="ul">
                <li class="li" v-for="(item, index) in value.activity" :key="index">
                  <span class="span span-title ellipsis">
                    {{ item.title }}
                  </span>
                  <span class="span span-sheng">-------------------------</span>
                  <span class="span span-desc" @click="getDesc(item)">详情</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { getTeam, getFloatTeam, getDayPeople, getDayHuodong } from '@/api/incorruptible';
import { EventBus } from '@/utils/event-bus';
import vuescroll from 'vuescroll';
export default {
  name: 'zhiyuan',
  data() {
    return {
      peopleList: [],
      dialogVisible: false,
      valueList: [],
      type: '',
      value: {
        teamName: '',
        times: 0,
        num: 0,
        activity: [],
        organize: []
      },
      timer: null,
      isPop: false,
      nowPeople: [],
      typeList: [
        {
          name: '今日志愿者',
          type: 'zhiyuan'
        },
        {
          name: '今日志愿活动',
          type: 'huodong'
        }
      ]
    };
  },
  computed: {},
  watch: {
    type(n, o) {
      if (n === 'huodong') {
        // 活动
        getDayHuodong().then(data => {
          if (data.code === 200) {
            this.nowPeople = data.data;
          }
        });
      } else {
        // 志愿者
        getDayPeople().then(data => {
          if (data.code === 200) {
            this.nowPeople = data.data;
          }
        });
      }
    }
  },
  methods: {
    // 获取活动详情
    getDesc(item) {
      EventBus.$emit('popActivity', { item: item });
    },
    checkTyep(type) {
      if (type) {
        if (this.type === type) {
          return;
        }
        this.type = type;
      } else {
        this.type = this.type === 'huodong' ? 'zhiyuan' : 'huodong';
      }
      this.clearTime();
    },
    // 获取队伍
    getValue(obj) {
      let { id } = obj;
      getFloatTeam({ id }).then(data => {
        if (data.code === 200) {
          this.value = data.data;
          this.isPop = true;
        }
      });
    },
    // 关闭弹窗
    popClose() {
      this.isPop = false;
    },
    // 清除计时器
    clearTime() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.checkTyep();
      }, 1000 * 5);
    }
  },
  mounted() {
    this.type = 'zhiyuan';
    this.clearTime();
    getTeam().then(data => {
      if (data.code === 0) {
        this.peopleList = data.data;
      }
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {
    PartyBox,
    vuescroll
  }
};
</script>

<style scoped>
.zhiyuan >>> .content {
  padding: 0.26rem 0.34rem 0 0.24rem;
}
</style>

<style scoped lang="scss">
.zhiyuan {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(1344rem);
  z-index: 1055;
  display: flow-root;
  .div-top {
    .ul {
      display: flow-root;
      box-sizing: border-box;
      padding-left: px2rem(8rem);
      .li {
        width: px2rem(240rem);
        height: px2rem(56rem);
        background: rgba(19, 44, 89, 0.4);
        border-radius: 17px;
        box-sizing: border-box;
        border: 1px solid rgba(52, 195, 255, 0.8);
        padding-left: px2rem(23rem);
        float: left;
        line-height: px2rem(56rem);
        color: #fff;
        margin-top: px2rem(12rem);
        font-size: px2rem(18rem);
        position: relative;
        cursor: pointer;
        &:nth-child(even) {
          margin-left: px2rem(6rem);
        }
        .span {
          display: inline-block;
          position: absolute;
        }
        .span-icon {
          width: px2rem(21rem);
          height: px2rem(23rem);
          background: url('~@/assets/popbox/duiwu@2x.png');
          background-size: 100% 100%;
          vertical-align: middle;
          top: 50%;
          transform: translateY(-50%);
        }
        .span-name {
          left: px2rem(60rem);
          width: px2rem(100rem);
        }
        .span-btn {
          width: px2rem(60rem);
          height: px2rem(43rem);
          background: rgba(72, 155, 247, 0.2);
          border-radius: 5px;
          line-height: px2rem(43rem);
          right: px2rem(10rem);
          text-align: center;
          top: 50%;
          transform: translateY(-50%);
          &:hover {
            filter: brightness(1.5);
          }
        }
      }
    }
  }
  .div-center {
    box-sizing: border-box;
    padding-left: 0.16rem;
    overflow: hidden;
    .ul {
      float: left;
      width: 100%;
      height: px2rem(425rem);
      background: rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      margin-top: px2rem(15rem);
      &:nth-child(n + 2) {
        margin-left: px2rem(10rem);
      }
      .li-title {
        text-align: center;
        line-height: px2rem(48rem);
        font-size: px2rem(24rem);
        color: #00fcff;
      }
      .li {
        position: relative;
        overflow: hidden;
        height: px2rem(50rem);
        cursor: pointer;
        &:hover {
          background: rgba(19, 44, 89, 0.4);
        }
        .span {
          overflow: hidden;
          font-size: px2rem(18rem);
          line-height: px2rem(50rem);
          color: #fff;
          position: absolute;
        }
        .span-huodong {
          left: px2rem(50rem);
          width: px2rem(200rem);
        }
        .span-time {
          width: px2rem(240rem);
          left: px2rem(300rem);
        }
      }
    }
  }
  .popbox {
    p {
      font-size: px2rem(18rem);
      line-height: px2rem(40rem);
    }
  }
  .center {
    text-align: center;
    color: rgba(0, 246, 255, 1);
    font-size: px2rem(18rem);
    margin-top: px2rem(15rem);
    background: #051340;
    border-radius: 50px;
    display: flex;
    box-sizing: border-box;
    padding: px2rem(5rem) 0;
    .ul {
      overflow: hidden;
      margin: auto;
      .li {
        height: px2rem(36rem);
        padding: 0 px2rem(30rem);
        border-radius: 50px;
        float: left;
        line-height: px2rem(36rem);
        text-align: center;
        color: #fff;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          background: #03357e;
        }
      }
      .checked {
        background: #03357e;
      }
    }
  }
  .bottom {
    overflow: hidden;
    box-sizing: border-box;
    padding-top: px2rem(10rem);
    .zy {
      height: px2rem(250rem);
      overflow: hidden;
      .ul {
        overflow: hidden;
        .li {
          width: px2rem(240rem);
          height: px2rem(61rem);
          background: rgba(3, 14, 48, 1);
          border-radius: 7px;
          margin-top: px2rem(10rem);
          float: left;
          box-sizing: border-box;
          padding-left: px2rem(15rem);
          position: relative;
          &:nth-child(even) {
            margin-left: px2rem(6rem);
          }
          .span {
            line-height: px2rem(61rem);
            position: absolute;
          }
          .span-name {
            font-size: px2rem(20rem);
            color: rgba(0, 246, 255, 1);
            &::after {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: px2rem(80rem);
              width: 1px;
              height: px2rem(34rem);
              background: rgba(0, 246, 255, 0.3);
            }
          }
          .span-number {
            left: px2rem(110rem);
            color: #fff;
            font-size: px2rem(18rem);
          }
        }
      }
    }
    .huodong {
      height: px2rem(250rem);
      .ul {
        overflow: hidden;
        margin-top: px2erm(10rem);
        .li {
          position: relative;
          height: px2rem(60rem);
          line-height: px2rem(60rem);
          background: rgba(3, 14, 48, 1);
          border-radius: 5px;
          cursor: pointer;
          .span {
            position: absolute;
            font-size: px2rem(20rem);
          }
          .span-title {
            left: px2rem(20rem);
            color: rgba(0, 246, 255, 1);
            width: px2rem(150rem);
          }
          .span-message {
            color: #fff;
            left: px2rem(190rem);
            width: px2rem(250rem);
          }
        }
      }
    }
  }
}
.mark {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1060;
  .pop-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: px2rem(560rem);
    height: px2rem(392rem);
    transform: translate(-50%, -50%);
    z-index: 2000;
    background: url('~@/assets/popbox/b.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: px2rem(60rem);
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
      .pop-content {
        .top {
          // display: flex;
          margin-top: px2rem(10rem);
          overflow: hidden;
          position: relative;
          height: px2rem(40rem);
          > div {
            position: absolute;
          }
          .img {
            width: px2rem(22rem);
            height: px2rem(25rem);
            background: url('~@/assets/popbox/duiwu.png');
            background-size: 100% 100%;
            left: px2rem(10rem);
          }
          .name {
            font-size: px2rem(24rem);
            font-weight: bold;
            color: #fff;
            margin-left: px2rem(13rem);
            left: px2rem(30rem);
            width: px2rem(150rem);
          }
          .cishu {
            color: #fff;
            width: px2rem(100rem);
          }
          .huodong {
            left: px2rem(200rem);
          }
          .fuwu {
            left: px2rem(330rem);
          }
          .huodongblue {
            color: rgba(0, 246, 255, 1);
            font-size: px2rem(30rem);
            font-weight: bold;
            left: px2rem(270rem);
          }
          .fuwublue {
            color: rgba(0, 246, 255, 1);
            font-size: px2rem(30rem);
            font-weight: bold;
            left: px2rem(400rem);
            width: px2rem(80rem);
          }
        }
        .div-center {
          // width: px2rem(465rem);
          height: px2rem(106rem);
          background: rgba(7, 14, 38, 1);
          border-radius: 8px;
          box-sizing: border-box;
          padding: px2rem(16rem) 0 0 px2rem(20rem);
          margin-top: px2rem(10rem);
          .chengyuan {
            color: rgba(27, 93, 182, 1);
            font-size: px2rem(16rem);
            font-weight: bold;
          }
          .name {
            margin-top: px2rem(5rem);
            line-height: px2rem(20rem);
            color: #fff;
          }
        }
        .div-bottom {
          margin-top: px2rem(10rem);
          // width: px2rem(465rem);
          height: px2rem(142rem);
          background: rgba(7, 14, 38, 1);
          border-radius: 8px;
          box-sizing: border-box;
          padding: px2rem(16rem) 0 0 px2rem(20rem);
          .chengyuan {
            color: rgba(27, 93, 182, 1);
            font-size: px2rem(16rem);
            font-weight: bold;
          }
          .ul {
            box-sizing: border-box;
            padding-top: px2rem(10rem);
            .li {
              color: #fff;
              position: relative;
              overflow: hidden;
              height: px2rem(30rem);
              .span {
                position: absolute;
                color: #fff;
                line-height: px2rem(30rem);
              }
              .span-title {
                width: px2rem(200rem);
              }
              .span-sheng {
                color: #333;
                left: px2rem(220rem);
              }
              .span-desc {
                cursor: pointer;
                left: px2rem(390rem);
                color: rgba(0, 246, 255, 1);
              }
            }
          }
        }
      }
    }
  }
}
</style>
