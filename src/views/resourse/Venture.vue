<template>
  <div class="Venture">
    <party-box title="创业码监测" width="592" height="323">
      <template slot="content">
        <div class="div div-left">
          <div class="div-top">
            <div class="li">
              <p class="img">
                <img src="@/assets/resouse/zhuisu.png" alt="" />
              </p>
              <div class="text">
                <p class="name">可追溯商品数量</p>
                <p class="value">2,286,708</p>
              </div>
            </div>
            <div class="li">
              <p class="img">
                <img src="@/assets/resouse/erweimma.png" alt="" />
              </p>
              <div class="text">
                <p class="name">可追溯商品数量</p>
                <p class="value">2,286,708</p>
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
                  {{ item.value }}
                </span>
              </div>
              <div class="bottom">
                <span class="line" :style="{ width: '50%' }"></span>
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
// import countTo from 'vue-count-to';
export default {
  name: 'Venture',
  data() {
    return {
      value: '',
      list: []
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
        this.list = data.data.value;
      }
    });
  },
  components: { PartyBox, saomaPre }
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
            color: rgba(255, 255, 255, 0.3);
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
            background: rgba(143, 130, 188, 1);
            border-radius: 50px;
            transition: width 0.5s;
          }
        }
      }
    }
  }
}
</style>
