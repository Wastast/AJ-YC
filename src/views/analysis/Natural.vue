<template>
  <div class="Natural">
    <module-box title="乡村环境">
      <template slot="content">
        <ul class="ul">
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6@2x.png" alt="" />
            <dl>
              <dt>PM2.5</dt>
              <dd>33 <span>ug/m³</span></dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝 3@2x.png" alt="" />
            <dl>
              <dt>气压</dt>
              <dd>996 <span>hPa</span></dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝@2x.png" alt="" />
            <dl>
              <dt>湿度</dt>
              <dd>55.6 <span>%</span></dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝 2@2x(1).png" alt="" />
            <dl>
              <dt>负氧离子</dt>
              <dd>3700<span>/cm³</span></dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝 3@2x.png" alt="" />
            <dl>
              <dt>风速</dt>
              <dd>1.4m/s</dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝 3@2x(1).png" alt="" />
            <dl>
              <dt>降雨量</dt>
              <dd>无降水</dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝 3@2x(2).png" alt="" />
            <dl>
              <dt>二氧化碳浓度</dt>
              <dd>546 <span>ppm</span></dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝 3@2x(3).png" alt="" />
            <dl>
              <dt>果壳箱告警</dt>
              <dd>0</dd>
            </dl>
          </li>
        </ul>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box'
import { weather } from '@/api/login'

export default {
  name: 'Natural',
  data() {
    return {
      pm: '32',
      tmp: '0',
      hum: '0'
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    weather()
      .then(data => {
        let obj = data.HeWeather6[0].now
        this.hum = obj.hum
        this.tmp = obj.tmp
      })
      .catch(() => {})
  },
  components: {
    ModuleBox
  }
}
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
        left: px2rem(13rem);
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
</style>
