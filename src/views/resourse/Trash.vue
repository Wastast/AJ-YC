<template>
  <div>
    <div class="Trash">
      <div class="div-btn" @click="jump(true)">
        垃圾分类 >>>
      </div>
      <party-box title="果壳箱监测" width="592" height="200">
        <template slot="content">
          <div class="box">
            <ul
              class="ul"
              :style="{
                width: (list.length + 1) * 3.2 + 'rem',
                marginLeft: nowIndex * -3.34 + 'rem'
              }"
            >
              <li class="li" v-for="(item, index) of list" :key="index">
                <dl>
                  <dt>
                    监测位置: <span>{{ item.type }}</span>
                  </dt>
                  <dd>
                    <div class="left">
                      <p class="p-type">
                        容量监测
                      </p>
                      <p class="p-value">
                        {{ item.rongliang }}
                      </p>
                    </div>
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
          <div class="arrow left" @click="move(-1)">
            <i class="btn el-icon-arrow-left"></i>
          </div>
          <div class="arrow right" @click="move(1)">
            <i class="btn el-icon-arrow-right"></i>
          </div>
        </template>
      </party-box>
    </div>
    <div class="iframe" v-if="isPop">
      <div class="close" @click="jump(false)" title="'关闭当前页'">
        ×
      </div>
      <iframe src="http://app.hanziyi.cn/login.html?id=51" scrolling="no" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
export default {
  name: 'Trash',
  data() {
    return {
      list: [
        {
          type: '大石碑',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '凉亭',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '两山绿道',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '大石碑',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '凉亭',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '两山绿道',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '大石碑',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '凉亭',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '两山绿道',
          rongliang: '未满',
          shidu: '20'
        }
      ],
      isPop: false,
      nowIndex: 0,
      timer: null,
      timerIndex: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    jump(bolen) {
      this.isPop = bolen;
    },
    move(number) {
      if (this.nowIndex === 0 && number === -1) {
        return;
      }
      if (this.nowIndex === this.list.length - 3 && number === 1) {
        return;
      }
      this.nowIndex += number;
      this.resetTimer();
    },
    moveThere() {
      let value = [0, 3, 6];
      this.timerIndex += 1;
      if (this.timerIndex > 2) {
        this.timerIndex = 0;
      }
      this.nowIndex = value[this.timerIndex];
    },
    resetTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.moveThere();
      }, 5 * 1000);
    }
  },
  mounted() {
    this.resetTimer();
  },
  components: { PartyBox }
};
</script>

<style scoped>
.Trash >>> .content {
  padding: 0.8rem 0.9rem 0 0.95rem;
  box-sizing: border-box;
}
.ul .li dt >>> .el-select {
  width: 100%;
}
.ul .li dt >>> .el-input__inner {
  border: 1px solid rgba(220, 223, 230, 0);
  background-color: #fff0;
}
</style>

<style scoped lang="scss">
.Trash {
  position: absolute;
  top: px2rem(523rem);
  left: px2rem(41rem);
  z-index: 100;
  .div-btn {
    position: absolute;
    top: px2rem(3rem);
    left: px2rem(200rem);
    line-height: px2rem(40rem);
    color: #0d7be1;
    font-size: px2rem(24rem);
    padding: px2rem(10rem);
    cursor: pointer;
  }
  .box {
    width: 100%;
    height: px2rem(120rem);
    overflow: hidden;
    .ul {
      display: flow-root;
      transition: 0.5s;
      .li {
        display: flow-root;
        width: px2rem(160rem);
        float: left;
        &:nth-child(n + 2) {
          margin-left: px2rem(7rem);
        }
        dt {
          height: px2rem(40rem);
          background: rgba(49, 129, 191, 0.26);
          border: 1px solid rgba(45, 126, 182, 1);
          border-radius: 6px;
          box-sizing: border-box;
          line-height: px2rem(40rem);
          color: rgba(255, 255, 255, 0.4);
          padding-left: px2rem(10rem);
          span {
            font-weight: bold;
            font-size: px2rem(16rem);
            margin-left: px2rem(10rem);
            color: #fff;
          }
        }
        dd {
          height: px2rem(69rem);
          background: rgba(2, 8, 28, 0.5);
          border-radius: 5px;
          margin-top: px2rem(9rem);
          overflow: hidden;
          color: rgba(255, 255, 255, 1);
          display: flex;
          > div {
            float: left;
            height: 100%;
            box-sizing: border-box;
            padding-left: px2rem(13rem);
            padding-top: px2rem(15rem);
            margin: auto;
            .p-type {
              font-size: px2rem(20rem);
            }
            .p-value {
              font-family: 'DS-DIGII';
              font-size: px2rem(18rem);
              margin-top: px2rem(5rem);
              color: #00e5a2ba;
            }
          }
          .left {
            // width: px2rem(150rem);
            text-align: center;
            // background: rgba(2, 8, 28, 0.8);
          }
        }
      }
    }
  }
  .arrow {
    position: absolute;
    top: px2rem(40rem);
    width: px2rem(40rem);
    height: px2rem(117rem);
    background: red;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.11);
    display: flex;
    cursor: pointer;
    transition: 0.5s;
    .btn {
      margin: auto;
      font-size: px2rem(24rem);
      color: rgba(255, 255, 255, 0.3);
    }
    &:hover {
      background: rgba(0, 0, 0, 0.51);
      .btn {
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .left {
    left: px2rem(5rem);
  }
  .right {
    right: px2rem(5rem);
  }
}
.iframe {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 19999;
  .close {
    position: absolute;
    top: px2rem(10rem);
    right: px2rem(10rem);
    font-size: px2rem(50rem);
    font-weight: bold;
    cursor: pointer;
    color: #fff;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
