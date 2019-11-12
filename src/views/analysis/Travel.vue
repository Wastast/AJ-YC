<template>
  <div class="Travel">
    <module-box title="报事报修">
      <template slot="content">
        <ul class="ul">
          <li class="li" v-for="(item,index) of [1,2,3,4,5]" :key="index">
            <span class="span span-block">

            </span>
            <span class="span span-text">
              垃圾桶
            </span>
            <span class="span span-event">
              村委垃圾桶丢失
            </span>
            <span class="span span-time">
              2019-11-05
            </span>
            <img class="img" src="@/assets/analysis/background.png" alt="">
          </li>
        </ul>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box'
export default {
  name: 'Travel',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: {
    ModuleBox
  }
}
</script>

<style scoped>
.Travel >>> .index{
  padding: 0.7rem 0.39rem 0.3rem 0.15rem;
}
</style>

<style scoped lang="scss">
.Travel {
  position: absolute;
  top: px2rem(737rem);
  right: px2rem(10rem);
  .ul {
    .li {
      height: px2rem(47rem);
      line-height: px2rem(47rem);
      position: relative;
      &:nth-child(even) {
        background: #7B6E93FF;
      }
      .span {
        display: inline-block;
        color: #fff;
        font-family:PingFangSC;
        position: absolute;
      }
      .span-block {
        left: px2rem(22rem);
        top: 50%;
        transform: translateY(-50%);
        width:5px;
        height:5px;
        background:rgba(83,212,255,1);
      }
      .span-text {
        left: px2rem(40rem);
      }
      .span-event {
        left: px2rem(143rem);
      }
      .span-time {
        left: px2rem(302rem);
      }
      .img {
        width: px2rem(56rem);
        height: px2rem(30rem);
        position: absolute;
        right: px2rem(22rem);
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
