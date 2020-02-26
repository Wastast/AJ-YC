<template>
  <div class="Venture">
    <party-box title="两山优品" width="592" height="323">
      <template slot="content">
        <div class="div div-left">
          <div class="div-top">
            <div class="li">
              <p class="img">
                <img src="@/assets/resouse/zhuisu.png" alt="" />
              </p>
              <div class="text">
                <p class="name">可追溯商品数量</p>
                <p class="value">
                  <countTo
                    :startVal="parseInt(0)"
                    :endVal="parseFloat(trace)"
                    :duration="4000"
                  ></countTo>
                </p>
              </div>
            </div>
            <div class="li">
              <p class="img">
                <img src="@/assets/resouse/erweimma.png" alt="" />
              </p>
              <div class="text">
                <p class="name">区块链上链数量</p>
                <p class="value">
                  <countTo
                    :startVal="parseInt(0)"
                    :endVal="parseFloat(chain)"
                    :duration="4000"
                  ></countTo>
                </p>
              </div>
            </div>
          </div>
          <div class="echarts">
            <div class="m-title">
              扫码量数据分析
            </div>
            <saoma-pre></saoma-pre>
          </div>
        </div>
        <div class="div div-right">
          <div class="m-title">
            本月销售数据分析
          </div>
          <ul class="ul">
            <li class="li" v-for="(item, index) of list" :key="index">
              <span class="index">{{ index + 1 }}</span>
              <div class="top">
                <span class="span left">
                  {{ item.name }}
                </span>
                <span class="span right">
                  <countTo
                    :startVal="parseInt(0)"
                    :endVal="parseFloat(item.value)"
                    :duration="4000"
                  ></countTo>
                </span>
              </div>
              <div class="bottom">
                <span class="line" :style="{ width: (item.value / allnum) * 100 + '%' }"></span>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import saomaPre from './echarts/saoma_pre';
import { getSaoma } from '@/api/resourse';
import countTo from 'vue-count-to';
export default {
  name: 'Venture',
  data() {
    return {
      value: '',
      list: [],
      chain: 0,
      trace: 0,
      allnum: 0
    };
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    getSaoma({
      type: 1
    }).then(data => {
      if (data.code === 200) {
        this.allnum = data.data.allnum;
        this.list = data.data.value;
      }
    });
    getSaoma({
      type: 2
    }).then(data => {
      if (data.code === 200) {
        let list = data.data;
        list.forEach(item => {
          if (item.name === '可追述商铺数量') {
            this.trace = item.num;
          }
          if (item.name === '累计扫描量') {
            this.chain = item.num;
          }
        });
      }
    });
  },
  components: { PartyBox, saomaPre, countTo }
};
</script>

<style scoped>
.Venture >>> .content {
  padding: 0.44rem 0.4rem 0 0.4rem;
  box-sizing: border-box;
}
</style>

<style scoped lang="scss">
.Venture {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(41rem);
  z-index: 100;
  .div {
    float: left;
  }
  .div-left {
    overflow: hidden;
    .div-top {
      overflow: hidden;
      .li {
        float: left;
        width: px2rem(152rem);
        height: px2rem(61rem);
        background: rgba(18, 44, 80, 1);
        border: 1px solid rgba(0, 160, 233, 1);
        border-radius: 7px;
        box-sizing: border-box;
        padding-left: px2rem(9rem);
        &:nth-child(n + 2) {
          margin-left: px2rem(13rem);
        }
        .img {
          float: left;
          margin-top: px2rem(20rem);
          width: px2rem(25rem);
          height: px2rem(25rem);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          float: left;
          margin-left: px2rem(10rem);
          .name {
            color: #80a5ce;
            margin-top: px2rem(13rem);
            font-size: px2rem(12rem);
          }
          .value {
            color: rgba(255, 255, 255, 1);
            font-size: px2rem(19rem);
            margin-top: px2rem(7rem);
          }
        }
      }
    }
    .echarts {
      height: px2rem(230rem);
      position: relative;
      .m-title {
        position: absolute;
        top: px2rem(20rem);
        left: px2rem(10rem);
        z-index: 1050;
        color: #fff;
        font-size: px2rem(16rem);
        &::before {
          content: '';
          width: px2rem(5rem);
          height: px2rem(15rem);
          background: rgba(246, 179, 127, 1);
          border-radius: 3px;
          position: absolute;
          top: 0;
          left: px2rem(-10rem);
        }
      }
    }
  }
  .div-right {
    overflow: hidden;
    box-sizing: border-box;
    padding-left: px2rem(40rem);
    .m-title {
      position: relative;
      color: #fff;
      font-size: px2rem(16rem);
      &::before {
        content: '';
        width: px2rem(5rem);
        height: px2rem(15rem);
        background: rgba(246, 179, 127, 1);
        border-radius: 3px;
        position: absolute;
        top: 0;
        left: px2rem(-10rem);
      }
    }
    .ul {
      .li {
        margin-top: px2rem(8rem);
        height: px2rem(30rem);
        position: relative;
        .index {
          position: absolute;
          bottom: px2rem(5rem);
          left: px2rem(-15rem);
          color: #fff;
          font-weight: bold;
        }
        .top {
          overflow: hidden;
          width: px2rem(168rem);
          .span {
            color: #fff;
            display: inline-block;
          }
          .left {
            text-align: left;
            margin-left: px2rem(5rem);
          }
          .right {
            float: right;
            margin-right: px2rem(10rem);
          }
        }
        .bottom {
          margin-top: px2rem(5rem);
          width: px2rem(168rem);
          height: px2rem(7rem);
          background: rgba(18, 43, 142, 1);
          border-radius: 4px;
          .line {
            display: block;
            height: 100%;
            width: 0%;
            border-radius: 50px;
            transition: width 0.5s;
            position: relative;
            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 0;
              z-index: 1;
              background: linear-gradient(
                90deg,
                rgba(2, 114, 210, .5) 0%,
                rgba(11, 222, 225, .5) 100%
              );
              filter: brightness(1.3);
              border-radius: 50px;
              animation: move 3s 4s linear infinite;
            }
            &:after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 0;
              height: 100%;
              background: linear-gradient(
                90deg,
                rgba(2, 114, 210, 1) 0%,
                rgba(11, 222, 225, 1) 100%
              );
              border-radius: 50px;
              animation: move 3s linear forwards;
            }
          }
        }
      }
    }
  }
}
@keyframes move {
  0% {
  }
  100% {
    width: 100%;
  }
}
</style>
