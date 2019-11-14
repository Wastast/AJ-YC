<template>
  <div class="heart">
    <party-box title="党建心连心" width="517" height="235">
      <template slot="content">
        <ul class="ul">
          <li class="li" v-for="(item, index) of list" :key="index">
            <span class="span span-title ellipsis">
              {{ item.title }}
            </span>
            <span class="span span-event ellipsis">
              {{ item.message }}
            </span>
            <span class="span span-time">
              <!-- 2019/01/ -->
              {{ item.createTime ? (item.createTime + '').slice(0, 10) : '未知' }}
            </span>
          </li>
        </ul>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { getHeart } from '@/api/party'
export default {
  name: 'heart',
  data() {
    return {
      list: []
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    getHeart().then(data => {
      if (data.code === 0) {
        this.list = data.data
      }
    })
  },
  components: {
    PartyBox
  }
}
</script>

<style scoped lang="scss">
.heart {
  position: absolute;
  top: px2rem(746rem);
  left: px2rem(1380rem);
  z-index: 100;
  .ul {
    display: flow-root;
    box-sizing: border-box;
    padding-top: px2rem(8rem);
    .li {
      width: 100%;
      float: left;
      height: px2rem(45rem);
      line-height: px2rem(45rem);
      cursor: pointer;
      .span {
        font-size: px2rem(16rem);
        position: absolute;
        display: inline-block;
      }
      .span-title {
        left: px2rem(23rem);
        color: rgba(78, 236, 255, 1);
      }
      .span-event {
        left: px2rem(159rem);
        color: #fff;
        width: px2rem(200rem);
      }
      .span-time {
        left: px2rem(398rem);
        color: rgba(59, 157, 225, 1);
      }
      &:hover {
        background: rgba(4, 14, 44, 1);
      }
      &:nth-child(even) {
        background: rgba(4, 14, 44, 1);
      }
    }
  }
}
</style>
