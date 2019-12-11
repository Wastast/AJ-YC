<template>
  <div class="open">
    <party-box title="村务公开" width="767" height="234">
      <template slot="content">
        <div class="div-top">
          <span
            :class="item.text === type ? 'checked' : ''"
            v-for="item of typeList"
            :key="item.node_code"
            @click="checkType(item)"
          >
            {{ item.text }}
          </span>
        </div>
        <ul class="ul" v-if="eventList">
          <vuescroll>
            <li class="li" v-for="(item, index) of eventList" :key="index" @click="showDesc(item)">
              <span class="span span-title ellipsis">
                {{ item.type }}
              </span>
              <span class="span span-event ellipsis">
                {{ item.title }}
              </span>
              <span class="span span-time">
                {{ (item.release_time + '').slice(0, 10) }}
              </span>
            </li>
          </vuescroll>
        </ul>
        <div class="novalue" v-else>
          暂无数据
        </div>
      </template>
    </party-box>
    <el-dialog
      :title="gongkai.title"
      :visible.sync="dialogVisible"
      width="50%"
      :modal="false"
      :destroy-on-close="true"
    >
      <div class="popbox">
        <vuescroll>
          <div class="block" v-html="gongkai.content"></div>
        </vuescroll>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { getEconomics, getOpenValue } from '@/api/incorruptible';
import vuescroll from 'vuescroll';
import { TipsPop } from '@/utils/el_ui';
export default {
  name: 'open',
  data() {
    return {
      textList: ['村务公开', '党务公开'],
      typeList: [],
      eventList: null,
      type: '',
      loading: false,
      gongkai: {
        title: '',
        content: ''
      },
      dialogVisible: false
    };
  },
  computed: {},
  watch: {
    type() {
      let arr = this.typeList.filter(item => {
        if (item.text === this.type) {
          return item;
        }
      });
      this.getData(arr[0]);
    }
  },
  methods: {
    // 更换显示类型
    checkType(obj) {
      if (this.loading) {
        TipsPop({
          message: '正在请求数据,请勿再次点击',
          type: 'error'
        });
        return;
      }
      this.type = obj.text;
    },
    // 展示详情数据
    showDesc(obj) {
      console.log(obj);
      this.gongkai.title = obj.title;
      this.gongkai.content = obj.contents;
      this.dialogVisible = true;
    },
    // 请求并渲染数据
    async getData(obj) {
      // let arr = []
      this.loading = true;
      this.eventList = [];
      for (let item of obj.node) {
        let b = await this.getValue(item.text, item.node_code);
        this.eventList.push(...b);
        // arr.push(...b)
      }
      // this.eventList = arr
      this.loading = false;
    },
    // 获取公开数据
    getValue(type, id) {
      return new Promise((resolve, reject) => {
        getOpenValue({
          region_code: '330523108204',
          node_id: id
        }).then(data => {
          if (data.code === 200) {
            let arr = data.data.map(item => {
              item.type = type;
              return item;
            });
            resolve(arr);
          }
        });
      });
    }
  },
  mounted() {
    getEconomics().then(data => {
      let arr = data.data.filter(item => {
        if (this.textList.includes(item.text)) {
          return item;
        }
      });
      this.typeList = arr;
      this.type = '党务公开';
    });
  },
  components: {
    PartyBox,
    vuescroll
  }
};
</script>

<style scoped lang="scss">
.open {
  position: absolute;
  top: px2rem(746rem);
  left: px2rem(587rem);
  z-index: 1050;
  .div-top {
    width: px2rem(224rem);
    height: px2rem(44rem);
    background: rgba(2, 7, 26, 0.6);
    border-radius: px2rem(4rem);
    line-height: px2rem(44rem);
    color: #fff;
    font-weight: bold;
    font-size: px2rem(18rem);
    // display: inline-block;
    // padding: 0 px2rem(23rem);
    margin: 0 auto;
    span {
      margin-left: px2rem(23rem);
      cursor: pointer;
      &:hover {
        color: rgba(59, 157, 225, 1);
      }
    }
    .checked {
      color: rgba(59, 157, 225, 1);
    }
  }
  .ul {
    display: flow-root;
    box-sizing: border-box;
    margin-top: px2rem(5rem);
    height: px2rem(175rem);
    .li {
      width: 100%;
      height: px2rem(45rem);
      line-height: px2rem(45rem);
      cursor: pointer;
      .span {
        font-size: px2rem(16rem);
        position: absolute;
        display: inline-block;
      }
      .span-title {
        left: px2rem(24rem);
        color: rgba(78, 236, 255, 1);
        width: px2rem(100rem);
      }
      .span-event {
        left: px2rem(160rem);
        color: #fff;
        width: px2rem(400rem);
      }
      .span-time {
        left: px2rem(647rem);
        color: rgba(59, 157, 225, 1);
      }
      &:hover {
        background: rgba(4, 14, 44, 1);
      }
      &:nth-child(odd) {
        background: rgba(4, 14, 44, 1);
      }
    }
  }
  .novalue {
    text-align: center;
    font-size: px2rem(48rem);
    color: #fff;
    margin-top: px2rem(30rem);
  }
  .popbox {
    height: px2rem(500rem);
    overflow: hidden;
    line-height: px2rem(24rem);
    content {
      width: px2rem(500rem);
      img {
        width: 100%;
      }
    }
  }
}
</style>
