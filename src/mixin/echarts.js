import { EleResize } from '@/utils/esresize';
// echarts 混入
export const EchatsMixin = {
  data() {
    return {
      echartsTimer: null
    };
  },
  methods: {
    // 自适应echarts
    resizeEcharts() {
      let dom = this.$refs['echarts']; // 获取当前 Echarts DOm
      let myChart = this.$echarts.init(dom); // 初始化 DOM
      let resizeDiv = dom;
      let listener = () => {
        myChart.resize();
      };
      EleResize.on(resizeDiv, listener);
      return myChart; // 将初始化的 DOM 返回
    }
  },
  beforeDestroy() {
    if (this.echartsTimer) {
      clearInterval(this.echartsTimer);
    }
  }
};
