<template>
  <div class="mapbtn">
    <div class="div-btn">
      <div class="div" @click="checkMap('2D')">
        <dl>
          <dt>
            <!-- <img src="@/assets/popbox/2.5d.png" alt="" /> -->
            <img src="@/assets/popbox/543aac02d68fec1ee7fadf126366503.png" alt="" />
          </dt>
        </dl>
      </div>
      <div class="div" @click="checkMap('2.5D')">
        <dl>
          <dt>
            <img src="@/assets/popbox/4570bd26e89e33c2edfb7ed45beda09.png" alt="" />
          </dt>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapbtn',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    checkMap(type) {
      this.$emit('update:mapType', type);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.mapbtn {
  .div-btn {
    position: absolute;
    top: px2rem(10rem);
    right: px2rem(10rem);
    z-index: 1000;
    > div {
      float: left;
      cursor: pointer;
    }
    .div {
      margin-left: px2rem(10rem);
      img {
        width: px2rem(100rem);
      }
      dd {
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>
