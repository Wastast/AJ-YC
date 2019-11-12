<template>
  <div class="swiper">
    <ul class="ul">
      <li class="li" v-for="item of list" :key="item.name">
        <dl>
          <dt>
            <img :src="item.imgUrl">
          </dt>
          <dd>
            {{item.name}}
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
            name: '支部带村 民主管村'
          },
          {
            imgUrl: require('@/assets/analysis/图层 10@2x.png'),
            name: '生态美村 发展强村'
          },
          {
            imgUrl: require('@/assets/analysis/falv@2x.png'),
            name: '依法治村 平安护村'
          },
          {
            imgUrl: require('@/assets/analysis/xueshimao@2x.png'),
            name: '道德润村 清廉正村'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
.swiper {
  position: asbolute;
  top: 0;
  left: 0;
  z-index: 100;
  .ul {
    .li {
      
      float: left;
      dl {
        dt {
          width:113px;
          height:113px;
          background:url('~@/assets/analysis/圆角矩形 2 拷贝@2x.png');
          background-size: 100% 100%;
          position: relative;
          img {
            width: px2rem(70rem);
            height: px2rem(70rem);
          }
        }
      }
    }
    .li-checked {
      background:url('~@/assets/analysis/选中效果@2x.png');
      background-size: 100% 100%;
    }
  }
}
</style>