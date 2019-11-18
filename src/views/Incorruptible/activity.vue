<template>
  <div class="activity">
    <party-box title="志愿活动" width="652" height="242">
      <template slot="content">
        <ul class="ul">
          <vuescroll :ops="ops">
            <li class="li" v-for="(item, index) of list" :key="index" @click="getCenter(item)">
              <span class="span span-type ellipsis">{{ item.teamName }}</span>
              <span class="span span-title ellipsis" :title="item.title">{{ item.title }}</span>
              <span class="span span-message ellipsis" :title="item.message">{{
                item.message
              }}</span>
              <span class="span span-time">{{ (item.createTime + '').slice(0, 10) }}</span>
            </li>
          </vuescroll>
        </ul>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
import { getActivity } from '@/api/incorruptible'
import vuescroll from 'vuescroll'
export default {
  name: 'activity',
  data() {
    return {
      type: 'wenyi',
      list: [],
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {}
      },
      textList: [
        {
          name: '两山文艺',
          type: 'wenyi'
        },
        {
          name: '家园卫队',
          type: 'weidui'
        },
        {
          name: '爱党敬业',
          type: 'jingye'
        }
      ],
      imgRep: req.slice(0, -3)
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 设置中心点
    getCenter(item) {
      // var infoText = `<div style="width: 200px;height: 200px;">
      //               <img src="${this.imgRep +
      //                 '/upload/volunteerActivity/' +
      //                 item.images}" width="200" heght="200"> </img>
      //                 <p>志愿队名称: ${item.teamName}</p>
      //                 <p>活动主题: ${item.title}</p>
      //                 <p>活动时间: ${item.createTime.slice(0, 10)}</p>
      //               </div>`
      // var lonlat = new SLonLat(item.lon, item.lat)
      // // TMapAPI.GetMap().SInfoWindow.SetLonLat(lonlat, null, false)
      // TMapAPI.GetMap().SInfoWindow.SetLonLat(lonlat, null, false)
      // // 信息面板显示内容
      // TMapAPI.GetMap().SInfoWindow.SetInnerHTML(infoText)
      // // 面板底部对应图标位置
      // TMapAPI.GetMap().SInfoWindow.SetOffset(new SSize(0, 0))
      // // 信息面板长宽
      // TMapAPI.GetMap().SInfoWindow.SetSize(new SSize(300, 300))
      // TMapAPI.GetMap().SInfoWindow.Show()
      // TMapAPI.map.SetCenter(new SLonLat(item.lon, item.lat), 2)
    }
  },
  mounted() {
    getActivity().then(data => {
      if (data.code === 0) {
        console.log(data)
        this.list = data.data
      }
    })
  },
  components: {
    PartyBox,
    vuescroll
  }
}
</script>

<style scoped lang="scss">
.activity {
  position: absolute;
  top: px2rem(744rem);
  left: px2rem(663rem);
  z-index: 1050;
  display: flow-root;
  .div-top {
    margin: 0 auto;
    width: px2rem(355rem);
    height: px2rem(47rem);
    background: rgba(0, 36, 139, 0.2);
    border-radius: 24px;
    margin-top: px2rem(12rem);
    display: flex;
    span {
      margin: auto;
      display: inline-block;
      width: px2rem(102rem);
      height: px2rem(32rem);
      border-radius: 16px;
      text-align: center;
      line-height: px2rem(32rem);
      color: #fff;
      font-size: px2rem(16rem);
    }
    .checked {
      background: rgba(0, 104, 220, 0.4);
      font-weight: bold;
    }
  }
  .ul {
    display: flow-root;
    margin-top: px2rem(15rem);
    height: px2rem(212rem);
    .li {
      height: px2rem(53rem);
      position: relative;
      line-height: px2rem(53rem);
      cursor: pointer;
      &:nth-child(even) {
        background: rgba(5, 60, 140, 0.2);
      }
      &:hover {
        background: rgba(5, 60, 140, 0.5);
      }
      .span {
        position: absolute;
        color: #fff;
      }
      .span-type {
        left: px2rem(20rem);
        width: px2rem(100rem);
      }
      .span-title {
        left: px2rem(130rem);
        width: px2rem(110rem);
      }
      .span-message {
        left: px2rem(260rem);
        width: px2rem(262rem);
        font-weight: bold;
      }
      .span-time {
        right: px2rem(10rem);
      }
    }
  }
}
</style>
