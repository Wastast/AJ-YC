<template>
  <div class="Natural">
    <module-box title="乡村环境">
      <template slot="content">
        <ul class="ul">
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6@2x.png" alt="" />
            <dl>
              <dt>PM2.5</dt>
              <dd>{{ pm25 }} <span>μg/m³</span></dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝 3@2x.png" alt="" />
            <dl>
              <dt>气压</dt>
              <dd>{{ pres }} <span>hPa</span></dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝@2x.png" alt="" />
            <dl>
              <dt>湿度</dt>
              <dd>{{ hum }} <span>%</span></dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝 2@2x(1).png" alt="" />
            <dl>
              <dt>负氧离子</dt>
              <dd>{{ anion }}<span>/cm³</span></dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝 3@2x.png" alt="" />
            <dl>
              <dt>风速</dt>
              <dd>{{ windSpd }}<span>m/s</span></dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝 3@2x(1).png" alt="" />
            <dl>
              <dt>整点降雨量</dt>
              <dd>{{ pcpn }}</dd>
            </dl>
          </li>
          <li class="li">
            <img src="@/assets/analysis/圆角矩形 6 拷贝 3@2x(2).png" alt="" />
            <dl>
              <dt>二氧化碳浓度</dt>
              <dd>{{ co2 }} <span>ppm</span></dd>
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
import ModuleBox from '@/components/analys-box';
import { getEnvironmental } from '@/api/analysis';
export default {
  name: 'Natural',
  data() {
    return {
      pm25: '0',
      tmp: '0',
      hum: '0',
      pres: '0',
      anion: '0',
      windSpd: '0',
      pcpn: '0',
      co2: '0'
    };
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    getEnvironmental().then(data => {
      if (data.code === 0) {
        let obj = data.data[0];
        this.pm25 = obj.pm25;
        this.pres = obj.pres;
        this.hum = obj.hum;
        this.anion = obj.anion;
        this.windSpd = obj.windSpd;
        this.pcpn = obj.pcpn;
        this.co2 = obj.co2;
      }
    });
  },
  components: {
    ModuleBox
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
