<template>
  <div>
    <div class="Header">
      <div class="div-time">
        <span class="span-area">余村</span>
        <span class="span-date">{{ nowDate }}</span>
        <span class="span-week">{{ nowWeek }}</span>
      </div>
      <div class="div-title">
        {{ title }}
      </div>
      <div class="div-wether" @click="getFuture" title="点击查看近日天气">
        <img :src="`http://172.26.16.29:8088/HeWeather/${cond_code}.png`" alt="" />
        <span class="span-date">{{ cond_txt }}</span>
        <span class="span-week">{{ tmp }}℃</span>
        <span v-if="alarmText" class="span-alerm" style="color: red">{{ alarmText }}</span>
      </div>
      <div v-if="router !== '/'" class="div-home" @click="jumpHome()" :title="'返回首页'"></div>
    </div>
    <pop-box :isPop.sync="isPop" :title="'近期天气预测'">
      <template slot="content">
        <div class="pop-content">
          <ul class="ul">
            <div class="title">
              <span class="span span-time">时间</span>
              <span class="span span-day">白天天气</span>
              <span class="span span-night">夜晚天气</span>
              <span class="span span-max">最高气温</span>
              <span class="span span-min">最低气温</span>
            </div>
            <li class="li" v-for="(item, index) in FutureList" :key="index">
              <span class="span span-time">
                {{ item.date | fiterYMD }}
              </span>
              <span class="span span-day">
                {{ item.cond_txt_d }}
              </span>
              <span class="span span-night">
                {{ item.cond_txt_n }}
              </span>
              <span class="span span-max">
                {{ item.tmp_max }}℃
              </span>
              <span class="span span-min">
                {{ item.tmp_min }}℃
              </span>
            </li>
          </ul>
        </div>
      </template>
    </pop-box>
  </div>
</template>

<script>
import { weather } from '@/api/login';
import { getEnvironmental } from '@/api/analysis';
import PopBox from '@/components/PopBox';
export default {
  props: {
    title: {
      type: String,
      default: '这是标题'
    }
  },
  name: 'Header',
  data() {
    return {
      nowWeek: '',
      nowDate: '',
      cond_txt: '',
      tmp: '',
      cond_code: '100',
      alarmText: '',
      isPop: false,
      FutureList: []
    };
  },
  computed: {
    router() {
      return this.$route.path;
    }
  },
  watch: {},
  methods: {
    // 未来几天天气
    getFuture() {
      this.isPop = true;
    },
    // 跳转到首页
    jumpHome() {
      this.$router.push({ path: '/' });
    },
    timeInterval() {
      let now = new Date();
      this.timeHHMMSS(now);
      this.timeWeek(now);
      this.timeYYYYMMDD(now);
    },
    timeWeek(now) {
      let weekDay = now.getDay();
      let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      this.nowWeek = week[weekDay];
    },
    timeYYYYMMDD(now) {
      let y = now.getFullYear();
      let m = now.getMonth() + 1;
      let d = now.getDate();
      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0' + d : d;
      this.nowDate = y + '年' + m + '月' + d + '日';
    },
    timeHHMMSS(now) {
      this.nowTime = now.toTimeString().slice(0, 8);
    },
    getWether() {
      weather().then(data => {
        let obj = data.HeWeather6[0].now;
        this.cond_txt = obj.cond_txt;
        this.tmp = obj.tmp;
        this.cond_code = obj.cond_code;
        this.FutureList = data.HeWeather6[0].daily_forecast;
      });
    }
  },
  mounted() {
    this.timeInterval();
    this.getWether();
    setInterval(() => {
      this.timeInterval();
    }, 1000);
    getEnvironmental().then(data => {
      if (data.code === 0) {
        let obj = data.data[0];
        this.alarmText = obj.alarm;
      }
    });
  },
  components: {
    PopBox
  }
};
</script>

<style scoped lang="scss">
@import url('~@/icons/title/font.css');
.Header {
  position: absolute;
  top: px2rem(7rem);
  left: 0;
  z-index: 1;
  width: 100%;
  height: px2rem(104rem);
  background: url('~@/assets/analysis/图层 0.png');
  background-size: 100% 100%;
  .div-title {
    position: absolute;
    left: px2rem(690rem);
    width: px2rem(540rem);
    font-family: 'Top_title';
    text-align: center;
    letter-spacing: px2rem(10rem);
    font-size: px2rem(38rem);
    top: px2rem(10rem);
    color: #0ac8ff;
  }
  .div-time {
    color: #83b2ff;
    margin-top: px2rem(16rem);
    margin-left: px2rem(19rem);
    font-size: px2rem(18rem);
    .span-date {
      margin-left: px2rem(15rem);
    }
    .span-week {
      margin-left: px2rem(15rem);
    }
  }
  .div-home {
    width: px2rem(40rem);
    height: px2rem(40rem);
    background: url('~@/assets/img/icon_share_home.png');
    background-size: 100% 100%;
    position: absolute;
    // top: px2rem(-6rem);
    top: 0;
    right: 0;
    cursor: pointer;
  }
  .div-wether {
    position: absolute;
    top: px2rem(15rem);
    right: px2rem(140rem);
    color: #83b2ff;
    font-size: px2rem(18rem);
    cursor: pointer;
    .span-week {
      margin-left: px2rem(15rem);
    }
    img {
      width: px2rem(30rem);
      height: px2rem(30rem);
      margin-right: px2rem(10rem);
      position: absolute;
      top: px2rem(-7rem);
      left: px2rem(-41rem);
    }
  }
}
.pop-content {
  .ul {
    overflow: hidden;
    .title {
      position: relative;
      overflow: hidden;
      height: px2rem(36rem);
      line-height: px2rem(36rem);
      font-size: px2rem(16rem);
      background: #070d25;
      .span {
        position: absolute;
        color: #fff;
      }
      .span-time {
        left: px2rem(40rem);
      }
      .span-day {
        left: px2rem(110rem);
      }
      .span-night {
        left: px2rem(210rem);
      }
      .span-max {
        left: px2rem(310rem);
      }
      .span-min {
        left: px2rem(400rem);
      }
    }
    .li {
      color: #83b2ff;
      overflow: hidden;
      height: px2rem(36rem);
      line-height: px2rem(36rem);
      position: relative;
      .span {
        position: absolute;
        text-align: center;
        color: #fff;
      }
      .span-time {
        left: px2rem(20rem);
      }
      .span-day {
        left: px2rem(110rem);
        width: px2rem(65rem);
      }
      .span-night {
        left: px2rem(210rem);
        width: px2rem(65rem);
      }
      .span-max {
        left: px2rem(310rem);
        width: px2rem(65rem);
      }
      .span-min {
        left: px2rem(400rem);
        width: px2rem(65rem);
      }
    }
  }
}
</style>
