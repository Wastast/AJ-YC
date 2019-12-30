<template>
  <div class="hourse">
    <party-box title="民宿监测" width="590" height="620">
      <template slot="content">
        <div class="top">
          <ul class="ul">
            <li class="li">
              <div class="left">
                <p class="title">
                  总房间数
                </p>
                <p class="value">
                  <countTo
                    :startVal="parseInt(0)"
                    :endVal="jiance.allnum"
                    :duration="3000"
                  ></countTo>
                </p>
              </div>
              <div class="right">
                <img src="@/assets/resouse/fangjian-copy@2x.png" alt="" />
              </div>
            </li>
            <li class="li">
              <div class="left">
                <p class="title">
                  实时空余数量
                </p>
                <p class="value">
                  <countTo
                    :startVal="parseInt(0)"
                    :endVal="jiance.used"
                    :duration="3000"
                  ></countTo>
                </p>
              </div>
              <div class="right">
                <img src="@/assets/resouse/fangjian@2x.png" alt="" />
              </div>
            </li>
            <li class="li">
              <div class="left">
                <p class="title">
                  实时入住人数
                </p>
                <p class="value">
                  <countTo :startVal="parseInt(0)" :endVal="jiance.memberNum" :duration="3000"></countTo>
                </p>
              </div>
              <div class="right">
                <img src="@/assets/resouse/people.png" alt="" />
              </div>
            </li>
          </ul>
        </div>
        <div class="jiedai">
          <div class="title">
            <ul class="ul">
              <li
                class="li"
                :class="type === item.type ? 'checked' : ''"
                v-for="(item, index) in typeList"
                :key="index"
                @click="checkType(item.type)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="renshu">
            <minsu-pre :obj="pre" v-if="type === 'bili'"></minsu-pre>
            <jinqi-line v-if="type === 'jinqi'"></jinqi-line>
          </div>
        </div>
        <div class="minsu">
          <div class="title">
            <el-select v-model="value" placeholder="请选择需要查询的民宿">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="valuebox">
            <div class="div div-left">
              <hourse-pre :obj="minsuData"></hourse-pre>
            </div>
            <div class="div div-right">
              <dl class="dl">
                <dt class="dt">
                  <img src="@/assets/resouse/shengyu.png" alt="" />
                </dt>
                <dd class="dd">
                  <p class="value">
                    <countTo
                      :startVal="parseInt(0)"
                      :endVal="minsu.last"
                      :duration="3000"
                    ></countTo>
                  </p>
                  <p class="name">剩余房间数</p>
                </dd>
              </dl>
              <dl class="dl">
                <dt class="dt">
                  <img src="@/assets/resouse/men.png" alt="" />
                </dt>
                <dd class="dd">
                  <p class="value">
                    <countTo
                      :startVal="parseInt(0)"
                      :endVal="minsu.used"
                      :duration="3000"
                    ></countTo>
                  </p>
                  <p class="name">入住房间数</p>
                </dd>
              </dl>
              <dl class="dl">
                <dt class="dt">
                  <img src="@/assets/resouse/menber.png" alt="" />
                </dt>
                <dd class="dd">
                  <p class="value">
                    <countTo
                      :startVal="parseInt(0)"
                      :endVal="minsu.memberNum"
                      :duration="3000"
                    ></countTo>
                  </p>
                  <p class="name">入住总人数</p>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import minsuPre from './echarts/minsu_pre';
import hoursePre from './echarts/hourse_pre';
import jinqiLine from './echarts/jinqi_line';
import { getMinsu, getMinData, getMember } from '@/api/resourse';
import countTo from 'vue-count-to';
export default {
  name: 'hourse',
  data() {
    return {
      typeList: [
        {
          name: '近期接待人数统计',
          type: 'jinqi'
        },
        {
          name: '接待人数比例',
          type: 'bili'
        }
      ],
      options: [],
      value: '',
      jiance: {
        used: 0,
        memberNum: 0,
        allnum: 0
      },
      minsu: {
        last: 0,
        used: 0,
        memberNum: 0
      },
      pre: null,
      minsuData: null,
      type: '',
      houseTimer: null,
      floatTimer: null
    };
  },
  computed: {},
  watch: {
    value(n, o) {
      if (this.floatTimer) {
        clearInterval(this.floatTimer);
      }
      getMinData({
        resourceId: n
      }).then(data => {
        if (data.code === 200) {
          let { last, used, memberNum, obj } = data.data;
          this.minsu = { last, used, memberNum };
          this.minsuData = obj;
        }
      });
      this.floatTimer = setInterval(() => {
        getMinData({
          resourceId: n
        }).then(data => {
          if (data.code === 200) {
            let { last, used, memberNum, obj } = data.data;
            this.minsu = { last, used, memberNum };
            this.minsuData = obj;
          }
        });
      }, 60 * 1000);
    }
  },
  methods: {
    // 切换type
    checkType(type) {
      if (this.type === type) {
        return;
      }
      this.type = type;
    }
  },
  mounted() {
    getMinsu({
      typeid: '001003'
    }).then(data => {
      if (data.code === 200) {
        let arr = data.data.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
        this.options = arr;
        this.value = arr[0].value;
      }
    });

    getMember().then(data => {
      if (data.code === 200) {
        let { used, memberNum, allnum } = data.data;
        this.jiance = { used, memberNum, allnum };
      }
    });
    this.houseTimer = setInterval(() => {
      getMember().then(data => {
        if (data.code === 200) {
          let { used, memberNum, allnum } = data.data;
          this.jiance = { used, memberNum, allnum };
        }
      });
    }, 60 * 1000);

    this.type = 'bili';
  },
  components: { PartyBox, minsuPre, hoursePre, countTo, jinqiLine },
  beforeDestroy() {
    clearInterval(this.houseTimer);
    clearInterval(this.floatTimer);
  }
};
</script>

<style scoped>
.hourse .minsu >>> .el-select {
  width: 100%;
}
.hourse .minsu >>> .el-input__inner {
  border-radius: 50px;
  background-color: #051340;
  border: 0;
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0 0.3rem;
  color: #fff;
}
</style>

<style scoped lang="scss">
.hourse {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(663rem);
  z-index: 100;
  .top {
    box-sizing: border-box;
    padding-top: px2rem(30rem);
    overflow: hidden;
    .ul {
      .li {
        width: px2rem(180rem);
        height: px2rem(75rem);
        background: #000b38;
        box-sizing: border-box;
        padding-left: px2rem(15rem);
        padding-top: px2rem(15rem);
        border-radius: 5px;
        position: relative;
        float: left;
        margin-left: px2rem(12rem);
        > div {
          float: left;
        }
        .left {
          .title {
            color: #506d8f;
          }
          .value {
            font-family: 'DS-DIGII';
            font-size: px2rem(36rem);
            margin-top: px2rem(5rem);
            color: #fff;
          }
        }
        .right {
          position: absolute;
          right: px2rem(15rem);
          bottom: px2rem(5rem);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .jiedai {
    margin-top: px2rem(10rem);
    box-sizing: border-box;
    padding: px2rem(20rem) px2rem(15rem) 0;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.1);
    .title {
      height: px2rem(46rem);
      background: #051340;
      border-radius: 50px;
      display: flex;
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
    .renshu {
      height: px2rem(225rem);
    }
  }
  .minsu {
    margin-top: px2rem(10rem);
    box-sizing: border-box;
    padding: 0 px2rem(30rem);
    .valuebox {
      overflow: hidden;
      .div {
        float: left;
      }
      .div-left {
        width: px2rem(255rem);
        height: px2rem(160rem);
      }
      .div-right {
        margin-top: px2rem(40rem);
        .dl {
          width: px2rem(85rem);
          float: left;
          .dt {
            width: px2rem(40rem);
            height: px2rem(40rem);
            margin: auto;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .dd {
            width: 100%;
            margin-top: px2rem(5rem);
            text-align: center;
            color: #fff;
            .value {
              font-size: px2rem(32rem);
              font-family: 'DS-DIGII';
              font-weight: bold;
            }
            .name {
              margin-top: px2rem(5rem);
            }
          }
        }
      }
    }
  }
}
</style>
