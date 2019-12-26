<template>
  <div class="time">
    <ul class="ul">
      <li
        class="li"
        :class="item.type === type ? 'checked' : ''"
        v-for="(item, index) in timetype"
        :key="index"
        @click="checkType(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <el-date-picker
      v-if="type"
      class="right"
      v-model="time"
      :type="type"
      align="right"
      :picker-options="pickerOptions"
      placeholder="请选择时间"
      @change="timechange"
    >
    </el-date-picker>
  </div>
</template>

<script>
import '@/styles/timeEl-ul.css';
import { EventBus } from '@/utils/event-bus';
import { getDataType } from '@/utils/currency';
export default {
  name: 'times',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          let History = new Date('2019-11-30').getTime();
          let isHistory = new Date(time).getTime() > History;
          let isNow = new Date(time).getTime() < Date.now();
          return !(isHistory && isNow);
        }
      },
      time: '',
      type: '',
      timetype: [
        {
          name: '实时',
          type: '',
          timeType: '1'
        },
        {
          name: '按日',
          type: 'dates',
          timeType: '2'
        },
        {
          name: '按月',
          type: 'year',
          timeType: '3'
        }
      ],
      timesType: ''
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 获取时间
    getTime() {
      if (!this.time) {
        return;
      }
      let start = this.time[0];
      let end = this.time[1];
      this.$emit('selectTime', {
        start,
        end
      });
    },
    // 过滤时间
    fiterTime(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      month = month < 10 ? '0' + month : month;
      return `${year}${month}${day}`;
    },
    checkType(item) {
      if (this.type === item.type) {
        return;
      }
      this.time = ''; // 清空时间
      this.type = item.type; // 更换时间选择器
      this.timesType = item.timeType;
      EventBus.$emit('changeType', {
        type: item.timeType
      });
    },
    timechange(newTime) {
      if (!newTime) {
        return;
      }
      let startTime = '';
      let endTime = '';
      let type = getDataType(newTime);
      if (type === 'array') {
        // 这是范围
        startTime = this.fiterTime(newTime[0]);
        endTime = this.fiterTime(newTime[newTime.length - 1]);
      } else {
        // 这是年份
        startTime = new Date(newTime).getFullYear();
      }
      EventBus.$emit('changeTime', {
        type: this.timesType,
        startTime: startTime,
        endTime: endTime
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.time {
  display: flex;
  justify-content: space-between;
  .ul {
    height: px2rem(40rem);
    float: left;
    background: rgba(7, 13, 37, 1);
    border-radius: 50px;
    display: flex;
    box-sizing: border-box;
    padding: 0 px2rem(10rem);
    margin-left: px2rem(20rem);
    .li {
      margin: auto;
      float: left;
      width: px2rem(73rem);
      height: px2rem(27rem);
      transition: 0.3s;
      border-radius: 14px;
      line-height: px2rem(27rem);
      text-align: center;
      cursor: pointer;
      color: #fff;
      font-size: px2rem(14rem);
      &:hover {
        background: rgba(0, 104, 220, 0.4);
      }
    }
    .checked {
      background: rgba(0, 104, 220, 0.4);
    }
  }
  .right {
    margin-right: px2rem(40rem);
  }
  .btn {
    margin-left: px2rem(10rem);
  }
}
</style>
