<template>
  <div class="finance">
    <party-box title="财务公开" width="592" height="392">
      <!-- <template slot="content">
        <ul class="ul">
          <li class="li" v-for="(item, index) of [1, 2, 3]" :key="index">
            <div class="div-imgbox"></div>
            <div class="div-text">
              <p class="p-title">
                2019收入状况
              </p>
              <div class="div-status">
                <span class="span span-in">收入</span>
                <span class="span span-out">支出</span>
              </div>
              <div class="div-money">
                <p class="p p-in">281202 <span>.92</span></p>
                <p class="p p-out">281202<span>.92</span></p>
              </div>
            </div>
          </li>
        </ul>
      </template> -->
      <template slot="content">
        <ul class="ul">
          <vuescroll :ops="ops" ref="vs">
            <li class="li" v-for="(item, index) of list" :key="index" @click="getData(item)">
              <span class="span span-type" :title="item.title">{{ item.title }}</span>
              <span class="span span-title ellipsis">{{ item.release_time.slice(0, 10) }}</span>
            </li>
          </vuescroll>
        </ul>
      </template>
    </party-box>
    <el-dialog
      title="财务报表"
      :visible.sync="dialogVisible"
      width="40%"
      :destroy-on-close="true"
      :modal="false"
    >
      <ul class="ul-imgs">
        <vuescroll :ops="ops">
          <li class="li" v-for="(item, index) of imgList" :key="index">
            <img
              class="img"
              :src="`${req}/dwdTourEventInfo/getImg?access_token=${token}&imgUrl=${item}`"
              alt=""
            />
          </li>
        </vuescroll>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { getEconomics, getOpenValue } from '@/api/incorruptible'
import vuescroll from 'vuescroll'
import { mapGetters } from 'vuex'
export default {
  name: 'finance',
  data() {
    return {
      list: [],
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {}
      },
      imgList: [],
      dialogVisible: false,
      req
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {},
  methods: {
    getData(item) {
      this.imgList = item.imglists
      this.dialogVisible = true
    }
  },
  mounted() {
    // 获取报表数据
    getEconomics().then(data => {
      let id = data.data[4].node[1].node_code
      getOpenValue({
        region_code: '330523108204',
        node_id: id
      }).then(data => {
        if (data.code === 200) {
          this.list = data.data
        }
      })
    })
  },
  components: {
    PartyBox,
    vuescroll
  }
}
</script>

<style scoped lang="scss">
.finance {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(41rem);
  z-index: 1052;
  display: flow-root;
  .ul {
    height: px2rem(392rem);
    .li {
      height: px2rem(40rem);
      line-height: px2rem(40rem);
      cursor: pointer;
      &:nth-child(odd) {
        background: rgba(5, 60, 140, 0.2);
      }
      &:hover {
        background: rgba(5, 60, 140, 0.5);
      }
      .span {
        font-size: px2rem(16rem);
        position: absolute;
      }
      .span-type {
        left: px2rem(50rem);
        color: #fff;
      }
      .span-title {
        left: px2rem(400rem);
        color: #83b2ff;
      }
    }
  }
  .ul-imgs {
    height: px2rem(480rem);
    .li {
      width: px2rem(680rem);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  // .ul {
  //   padding: px2rem(15rem) px2rem(15rem) px2rem(0) px2rem(9rem);
  //   .li {
  //     height: px2rem(136rem);
  //     background: rgba(3, 12, 35, 0.5);
  //     border-radius: 11px;
  //     box-sizing: border-box;
  //     padding-top: px2rem(17rem);
  //     &:nth-child(n + 2) {
  //       margin-top: px2rem(13rem);
  //     }
  //     > div {
  //       float: left;
  //     }
  //     .div-imgbox {
  //       width: px2rem(170rem);
  //       height: px2rem(100rem);
  //       background: rgba(131, 176, 226, 0.2);
  //       border-radius: 6px;
  //       overflow: hidden;
  //       margin: px2rem(0) 0 0 px2rem(11rem);
  //     }
  //     .div-text {
  //       margin-left: px2rem(19rem);
  //       .p-title {
  //         font-size: px2rem(18rem);
  //         color: rgba(0, 144, 255, 1);
  //       }
  //       .div-status {
  //         display: flex;
  //         .span {
  //           display: inline-block;
  //           width: px2rem(107rem);
  //           height: px2rem(28rem);
  //           border-radius: px2rem(14rem);
  //           text-align: center;
  //           line-height: px2rem(28rem);
  //           background: rgba(19, 44, 89, 0.4);
  //           font-size: px2rem(16rem);
  //           margin-top: px2rem(14rem);
  //           color: #fff;
  //         }
  //         .span-in {
  //           color: #ffb400;
  //         }
  //         .span-out {
  //           color: #00fcff;
  //           margin-left: px2rem(90rem);
  //         }
  //       }
  //       .div-money {
  //         position: relative;
  //         margin-top: px2rem(12rem);
  //         .p {
  //           position: absolute;
  //           float: left;
  //           font-family: DIN;
  //           font-weight: bold;
  //           color: #fff;
  //           font-size: px2rem(30rem);
  //           span {
  //             font-size: px2rem(14rem);
  //           }
  //         }
  //         .p-in {
  //           left: 0;
  //         }
  //         .p-out {
  //           left: px2rem(200rem);
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
