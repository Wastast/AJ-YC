<template>
  <div class="paishe">
    <div class="list">
      <!-- :style="{ width: (imgList.length + 1) * 3.68 + 'rem' }" -->
      <ul class="ul">
        <li class="li" v-for="(item, index) in picList" :key="index">
          <img class="img" :src="item.imgUrl" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'paishe',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['picList'])
  },
  watch: {},
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.paishe {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .list {
    width: 100%;
    .ul {
      margin-top: px2rem(10rem);
      overflow: hidden;
      .li {
        float: left;
        margin-top: px2rem(10rem);
        &:nth-child(n + 2) {
          margin-left: px2rem(10rem);
        }
        .img {
          width: px2rem(230rem);
          height: px2rem(150rem);
        }
      }
    }
  }
}
</style>
