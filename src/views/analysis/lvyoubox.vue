<template>
  <div class="lvyoubox">
    <module-box title="乡村旅游">
      <template slot="content">
        <Tourists v-if="moduleType === 'shuliang'"></Tourists>
        <huaxiang v-if="moduleType === 'huaxiang'"></huaxiang>
        <div class="div-btn" @click="checkModule()">
          {{ moduleType == 'shuliang' ? '游客画像' : '游客数量' }}
        </div>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box';
import Tourists from './Tourists';
import huaxiang from './huaxiang';
export default {
  name: 'lvyoubox',
  data() {
    return {
      moduleType: '',
      typeValue: {
        shuliang: '游客画像',
        huaxiang: '游客数量'
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    checkModule() {
      if (this.moduleType === 'shuliang') {
        this.moduleType = 'huaxiang';
      } else {
        this.moduleType = 'shuliang';
      }
    }
  },
  mounted() {
    this.moduleType = 'shuliang';
  },
  components: {
    ModuleBox,
    Tourists,
    huaxiang
  }
};
</script>

<style scoped lang="scss">
.lvyoubox {
  position: absolute;
  top: px2rem(440rem);
  right: px2rem(10rem);
  .div-btn {
    position: absolute;
    top: px2rem(45rem);
    right: px2rem(35rem);
    z-index: 1050;
    padding: px2rem(10rem);
    color: rgba(131, 178, 255, 1);
    text-align: center;
    background: rgba(97, 206, 243, 0);
    border: 1px solid rgba(57, 114, 154, 1);
    box-shadow: 0 0 5px rgba(31, 61, 139, 1);
    border-radius: 2px;
    font-size: px2rem(18rem);
    cursor: pointer;
    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>
