<template>
  <div>
    <div class="Natural">
      <module-box title="乡村环境" @jump="jump">
        <template slot="content">
          <ul class="ul">
            <li class="li" v-for="(item, index) of list" :key="index" @click="checkType(item)">
              <img :src="item.imgUrl" alt="" />
              <dl>
                <dt>{{ item.name }}</dt>
                <dd>
                  {{ obj[item.type] }} <span>{{ item.danwei }}</span>
                </dd>
              </dl>
            </li>
          </ul>
        </template>
      </module-box>
    </div>

    <div class="mark" v-if="isPop" @click="popClose">
      <div class="pop-box" @click.stop="() => {}">
        <div class="pop-box-title">
          <h2 class="h2">乡村环境详情: {{ titleName }}</h2>
        </div>
        <div class="close" @click="popClose"></div>
        <div class="content">
          <div class="top">
            <Timepicker></Timepicker>
          </div>
          <div class="ecahrts">
            <huanjing-line :type="type"></huanjing-line>
          </div>
        </div>
      </div>
    </div>

    <div class="iframe" v-if="isIframe">
      <div class="close" @click="close(false)" title="'关闭当前页'">
        ×
      </div>
      <iframe src="http://180.76.236.56:8118/MyMix.html" scrolling="no" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box';
import { getEnvironmental } from '@/api/analysis';
import Timepicker from '@/components/Timepicker';
import huanjingLine from './echarts/huanjing_line';
export default {
  name: 'Natural',
  data() {
    return {
      obj: {
        pm25: '0',
        tmp: '0',
        hum: '0',
        pres: '0',
        anion: '0',
        windSpd: '0',
        pcpn: '0',
        co2: '0',
        guoke: '0'
      },
      list: [
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6@2x.png'),
          name: 'PM2.5',
          type: 'pm25',
          danwei: 'μg/m³'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝 3@2x.png'),
          name: '气压',
          type: 'pres',
          danwei: 'hPa'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝@2x.png'),
          name: '湿度',
          type: 'hum',
          danwei: '%'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝 2@2x(1).png'),
          name: '负氧离子',
          type: 'anion',
          danwei: '/cm³'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝 3@2x.png'),
          name: '风速',
          type: 'windSpd',
          danwei: 'm/s'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝 3@2x(1).png'),
          name: '整点降雨量',
          type: 'pcpn',
          danwei: ''
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝 3@2x(2).png'),
          name: '二氧化碳浓度',
          type: 'co2',
          danwei: 'ppm'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝 3@2x(3).png'),
          name: '果壳箱告警',
          type: 'guoke',
          danwei: ''
        }
      ],
      titleName: '',
      type: '',
      isPop: false,
      isIframe: false
    };
  },
  computed: {},
  watch: {
    isPop() {
      if (!this.isPop) {
        this.type = '';
      }
    }
  },
  methods: {
    // 更换type值
    checkType(item) {
      this.type = item.type;
      this.titleName = item.name;
      this.isPop = true;
    },
    popClose() {
      this.isPop = false;
    },
    jump() {
      this.isIframe = true;
      // window.location.href = 'http://180.76.236.56:8118/MyMix.html';
    },
    close(bolean) {
      this.isIframe = bolean;
    }
  },
  mounted() {
    // 获取环境数据资源
    getEnvironmental().then(data => {
      if (data.code === 0) {
        let obj = data.data[0];
        let { pm25, pres, hum, anion, windSpd, pcpn, co2 } = obj;
        this.obj = { pm25, pres, hum, anion, windSpd, pcpn, co2, guoke: 0 };
      }
    });
  },
  components: {
    ModuleBox,
    Timepicker,
    huanjingLine
  }
};
</script>

<style scoped lang="scss">
.Natural {
  position: absolute;
  top: px2rem(140rem);
  right: px2rem(10rem);
  .ul {
    display: flow-root;
    .li {
      width: px2rem(110rem);
      height: px2rem(100rem);
      float: left;
      margin-left: px2rem(5rem);
      position: relative;
      cursor: pointer;
      &:nth-child(n + 5) {
        margin-top: px2rem(7rem);
      }
      img {
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      dl {
        position: absolute;
        top: px2rem(20rem);
        left: px2rem(8rem);
        font-family: PingFangSC;
        dt {
          font-size: px2rem(16rem);
          color: rgba(131, 178, 255, 1);
          margin-bottom: px2rem(19rem);
        }
        dd {
          font-size: px2rem(24rem);
          font-style: italic;
          color: rgba(98, 208, 243, 1);
          span {
            font-size: px2rem(16rem);
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
  z-index: 1999;
  .pop-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: px2rem(736rem);
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
      .top {
      }
      .ecahrts {
        height: px2rem(250rem);
      }
    }
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
