<template>
  <div class="atmosphere">
    <party-box title="空气质量数据" width="592" height="392">
      <template slot="content">
        <div class="div-top">
          <el-select v-model="value" placeholder="请选择空气检测位置">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="list">
          <ul class="ul">
            <p class="p-title">
              空气检测
            </p>
            <li class="li">
              <div class="div-text">
                <p class="p-type">PM2.5</p>
                <p class="p-value">32</p>
              </div>
              <div class="div-imgbox">
                <img src="@/assets/resouse/pm@2x.png" alt="">
              </div>
            </li>
            <li class="li">
              <div class="div-text">
                <p class="p-type">气压</p>
                <p class="p-value">68%</p>
              </div>
              <div class="div-imgbox">
                <img src="@/assets/resouse/pm@2x.png" alt="">
              </div>
            </li>
            <li class="li">
              <div class="div-text">
                <p class="p-type">风速</p>
                <p class="p-value">67%</p>
              </div>
              <div class="div-imgbox">
                <img src="@/assets/resouse/pm@2x.png" alt="">
              </div>
            </li>
          </ul>
          <ul class="ul">
            <p class="p-title">
              空气检测
            </p>
            <li class="li">
              <div class="div-text">
                <p class="p-type">PM2.5</p>
                <p class="p-value">32</p>
              </div>
              <div class="div-imgbox">
                <img src="@/assets/resouse/pm@2x.png" alt="">
              </div>
            </li>
            <li class="li">
              <div class="div-text">
                <p class="p-type">气压</p>
                <p class="p-value">68%</p>
              </div>
              <div class="div-imgbox">
                <img src="@/assets/resouse/pm@2x.png" alt="">
              </div>
            </li>
            <li class="li">
              <div class="div-text">
                <p class="p-type">风速</p>
                <p class="p-value">67%</p>
              </div>
              <div class="div-imgbox">
                <img src="@/assets/resouse/pm@2x.png" alt="">
              </div>
            </li>
          </ul>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
export default {
  name: 'atmosphere',
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: { PartyBox }
}
</script>

<style scoped>
.atmosphere >>> .content {
  padding: 0.44rem 0.52rem 0 0.54rem;
  box-sizing: border-box;
}
.div-top >>> .el-select {
  width: 100%;
}
.div-top >>> .el-input__inner {
  border: 1px solid rgba(220, 223, 230, 0);
  background-color: #fff0;
  color: #fff;
}
</style>

<style scoped lang="scss">
.atmosphere {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(1284rem);
  z-index: 100;
  .div-top {
    height: px2rem(40rem);
    background: rgba(49, 129, 191, 0.26);
    border: 1px solid rgba(45, 126, 182, 1);
    opacity: 0.8;
    border-radius: 6px;
    box-sizing: border-box;
  }
  .list {
    .ul {
      display: flow-root;
      width: px2rem(266rem);
      position: relative;
      background: rgba(2,8,28,.3);
      margin-top: px2rem(13rem);
      float: left;
      &:nth-child(n+2) {
        margin-left: px2rem(5rem);
      }
      .p-title {
        position: absolute;
        top: 0;
        left: 0;
        background:rgba(2,7,26,.8);
        border-radius:5px;
        width: px2rem(87rem);
        height: px2rem(31rem);
        text-align: center;
        line-height: px2rem(31rem);
        color: rgba(161,207,255,1);
      }
      .li{
        height: px2rem(103rem);
        position: relative;
        display: flow-root;
        > div {
          float: left;
        }
        .div-text {
          display: flow-root;
          position: absolute;
          top: px2rem(40rem);
          left: px2rem(17rem);
          color: #fff;
          .p-type {
            font-size: px2rem(12rem);
          }
          .p-value {
            font-size: px2rem(40rem);
            font-family: "DS-DIGII";
          }
        }
        .div-imgbox {
          width: px2rem(51rem);
          height: px2rem(51rem);
          position: absolute;
          top: px2rem(38rem);
          left: px2rem(184rem);
          img {
            width: 100%;
            height: 100%;
          }
        }
        &:nth-child(odd) {
          background:rgba(0,14,41,.66);
        }
      }
    }
  }
}
</style>
