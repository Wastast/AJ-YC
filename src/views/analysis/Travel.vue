<template>
  <div class="Travel">
    <module-box title="村情直通车">
      <template slot="content">
        <ul class="ul">
          <li class="li" v-for="item of list" :key="item.id">
            <span class="span span-block"> </span>
            <span class="span span-text">
              {{ item.title }}
            </span>
            <span class="span span-event ellipsis" :title="item.content">
              {{ item.content }}
            </span>
            <span class="span span-time">
              {{ item.create_date.slice(0, 10) }}
            </span>
            <img class="img" :src="item.pic_url[0]" alt="" />
          </li>
        </ul>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box'
import { getEvent, getPicUrl } from '@/api/analysis'
export default {
  name: 'Travel',
  data() {
    return {
      list: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取图片流
    getImgUrl(url) {
      getPicUrl({
        imgUrl: url
      }).then(data => {
        console.log(data)
      })
    }
  },
  mounted() {
    // 获取事件
    getEvent().then(data => {
      if (data.code === 200) {
        let list = data.data.repairList
        this.list = list.slice(0, 5)
      }
    })
  },
  components: {
    ModuleBox
  }
}
</script>

<style scoped>
.Travel >>> .index {
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
      cursor: pointer;
      font-size: px2rem(15rem);
      &:nth-child(even) {
        background: rgba(123, 110, 147, 0.2);
      }
      &:hover {
        background: rgba(123, 110, 147, 0.5);
      }
      .span {
        display: inline-block;
        color: #fff;
        font-family: PingFangSC;
        position: absolute;
      }
      .span-block {
        left: px2rem(22rem);
        top: 50%;
        transform: translateY(-50%);
        width: 5px;
        height: 5px;
        background: rgba(83, 212, 255, 1);
      }
      .span-text {
        left: px2rem(40rem);
      }
      .span-event {
        left: px2rem(143rem);
        width: px2rem(145rem);
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
