<template>
  <div class="Trash">
    <party-box title="果壳箱监测" width="592" height="392">
      <template slot="content">
        <ul class="ul">
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
                    <!-- <countTo
                      :startVal="parseInt(0)"
                      :endVal="parseFloat(item.rongliang)"
                      :duration="4000"
                    ></countTo> -->
                  </p>
                </div>
                <!-- <div class="righ">
                  <p class="p-type">
                    湿度监测
                  </p>
                  <p class="p-value">
                    36%
                  </p>
                </div> -->
              </dd>
            </dl>
          </li>
        </ul>
      </template>
    </party-box>
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
          type: '两山绿道1',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '两山绿道2',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '两山绿道3',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '两山绿道4',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '篮球场',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '门球场',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '停车场',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '村委',
          rongliang: '未满',
          shidu: '20'
        },
        {
          type: '大石碑',
          rongliang: '未满',
          shidu: '20'
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: { PartyBox }
};
</script>

<style scoped>
.Trash >>> .content {
  padding: 0.44rem 0.4rem 0 0.3rem;
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
  top: px2rem(594rem);
  left: px2rem(662rem);
  z-index: 100;
  .ul {
    display: flow-root;
    .li {
      display: flow-root;
      width: px2rem(177rem);
      float: left;
      margin-left: px2rem(7rem);
      dt {
        height: px2rem(40rem);
        background: rgba(49, 129, 191, 0.26);
        border: 1px solid rgba(45, 126, 182, 1);
        border-radius: 6px;
        box-sizing: border-box;
        line-height: px2rem(40rem);
        color: rgba(255, 255, 255, 0.4);
        padding-left: px2rem(17rem);
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
</style>
