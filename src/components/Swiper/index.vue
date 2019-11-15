<template>
  <div class="swiper">
    <ul class="ul">
      <li class="li" v-for="item of list" :key="item.name" @click="jump(item.router)">
        <dl>
          <dt>
            <img :src="item.imgUrl" />
          </dt>
          <dd>
            {{ item.name }}
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'swiper',
  data() {
    return {
      list: [
        {
          imgUrl: require('@/assets/analysis/图层 9@2x.png'),
          name: '支部带村 民主管村',
          router: '/party'
        },
        {
          imgUrl: require('@/assets/analysis/图层 10@2x.png'),
          name: '生态美村 发展强村',
          router: '/resourse'
        },
        {
          imgUrl: require('@/assets/analysis/falv@2x.png'),
          name: '依法治村 平安护村',
          router: '/law'
        },
        {
          imgUrl: require('@/assets/analysis/xueshimao@2x.png'),
          name: '道德润村 清廉正村',
          router: '/Incorruptible'
        }
      ]
    }
  },
  methods: {
    // 跳转
    jump(path) {
      this.$router.push({ path })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  position: absolute;
  top: px2rem(899rem);
  left: px2rem(606rem);
  z-index: 100;
  .ul {
    display: flow-root;
    .li {
      float: left;
      cursor: pointer;
      margin-left: .6rem;
      dl {
        dt {
          width: px2rem(113rem);
          height: px2rem(113rem);
          background: url('~@/assets/analysis/圆角矩形 2 拷贝@2x.png');
          background-size: 100% 100%;
          position: relative;
          display: flex;
          margin: 0 auto;
          img {
            width: px2rem(70rem);
            height: px2rem(70rem);
            margin: auto;
          }
        }
        dd {
          margin-top: px2rem(10rem);
          color: rgba(131, 178, 255, 1);
          font-size: px2rem(16rem);
        }
      }
      &:hover {
        dt {
          background: url('~@/assets/analysis/选中效果@2x.png');
          background-size: 100% 100%;
          img {
            filter: brightness(1.3);
          }
        }
        dd {
          font-weight: bold;
          color: rgba(131, 178, 255, 1);
        }
      }
    }
    .li-checked {
      dt {
        background: url('~@/assets/analysis/选中效果@2x.png');
        background-size: 100% 100%;
        img {
          filter: brightness(1.3);
        }
      }
      dd {
        font-weight: bold;
        color: rgba(131, 178, 255, 1);
      }
    }
  }
}
</style>
