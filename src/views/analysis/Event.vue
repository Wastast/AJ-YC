<template>
  <div class="Event">
    <module-box :title="'最多跑一次'">
      <template slot="content">
        <event-bar v-if="moduleType === 'event'"></event-bar>
        <manyi-pie v-if="moduleType === 'manyi'"></manyi-pie>

        <div class="div-btn" @click="checkModule()">
          {{ moduleType == 'event' ? '群众满意率' : '政务代办事项' }}
        </div>
        <p class="p-title">
          {{ typeValue[moduleType] }}
        </p>

      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box';
import eventBar from './echarts/event_bar';
import manyiPie from './echarts/manyi_pie';
export default {
  name: 'Event',
  data() {
    return {
      moduleType: '',
      typeValue: {
        event: '余村政务代办事项',
        manyi: '代办办件群众满意率'
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    checkModule() {
      if (this.moduleType === 'event') {
        this.moduleType = 'manyi';
      } else {
        this.moduleType = 'event';
      }
    }
  },
  mounted() {
    this.moduleType = 'event';
  },
  components: {
    ModuleBox,
    eventBar,
    manyiPie
  }
};
</script>

<style scoped lang="scss">
.Event {
  position: absolute;
  top: px2rem(443rem);
  left: px2rem(20rem);
  #events {
    height: 100%;
  }
  .p-title {
    position: absolute;
    top: px2rem(40rem);
    left: px2rem(15rem);
    z-index: 1050;
    height: 0.66rem;
    line-height: 0.66rem;
    background: rgba(2, 7, 26, 0.68);
    border-radius: 0.08rem;
    padding: 0 0.32rem;
    color: #80a5ce;
    font-size: px2rem(18rem);
  }
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
