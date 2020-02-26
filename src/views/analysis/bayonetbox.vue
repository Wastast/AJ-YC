<template>
  <div class="bayonetbox">
    <module-box :title="'车辆卡口分析'">
      <template slot="content">
        <div class="top">
          <ul class="ul">
            <li
              class="li"
              v-for="(item, index) in typeList"
              :key="index"
              :class="type === item.type ? 'checked' : ''"
              @click="checkTyep(item.type)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="echarts">
          <kakou v-if="type === '1'"></kakou>
          <laiyuandi v-if="type === '2'"></laiyuandi>
          <cheleixing v-if="type === '3'"></cheleixing>
          <paishe v-if="type === '4'"></paishe>
        </div>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box';
import laiyuandi from './laiyuandi';
import kakou from './kakou';
import cheleixing from './cheleixing';
import paishe from './paishe';
export default {
  name: 'bayonetbox',
  data() {
    return {
      type: '',
      typeList: [
        {
          name: '卡口数据',
          type: '1'
        },
        {
          name: '来源地分析',
          type: '2'
        },
        {
          name: '车辆类型',
          type: '3'
        },
        {
          name: '卡口拍摄',
          type: '4'
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 切换显示模块
    checkTyep(type) {
      if (this.type === type) {
        return;
      }
      this.type = type;
    }
  },
  mounted() {
    this.type = '1';
  },
  components: {
    ModuleBox,
    laiyuandi,
    kakou,
    cheleixing,
    paishe
  }
};
</script>

<style scoped lang="scss">
.bayonetbox {
  position: absolute;
  top: px2rem(737rem);
  left: px2rem(20rem);
  .top {
    display: flex;
    background: #051340;
    border-radius: 50px;
    .ul {
      overflow: hidden;
      margin: auto;
      box-sizing: border-box;
      .li {
        height: px2rem(36rem);
        padding: 0 px2rem(20rem);
        border-radius: 50px;
        float: left;
        line-height: px2rem(36rem);
        text-align: center;
        color: #fff;
        cursor: pointer;
        transition: 0.3s;
        font-size: px2rem(16rem);
        &:hover {
          background: #03357e;
        }
      }
      .checked {
        background: #03357e;
      }
    }
  }
  .echarts {
    height: px2rem(180rem);
  }
}
</style>
