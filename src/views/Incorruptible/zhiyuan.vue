<template>
  <div class="zhiyuan">
    <party-box title="志愿信息" width="532" height="605">
      <template slot="content">
        <div class="div-top">
          <ul class="ul">
            <li class="li" v-for="(item, index) of peopleList" :key="index" @click="getValue(item)">
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="div-center">
          <ul class="ul">
            <div class="li-title" @click="checkTyep()">
              {{ type === 'huodong' ? '今日志愿活动' : '今日志愿者' }}
            </div>
            <li class="li" v-for="(item, index) of valueList" :key="index">
              <span class="span span-huodong ellipsis" :style="{left: type === 'zhiyuan' ? '2rem' : '' }" :title="item.name">
                {{ item.name }}
              </span>
              <span class="span span-time ellipsis" :title="item.time">
                {{ item.time }}
              </span>
            </li>
          </ul>
          <!-- <ul class="ul">
            <div class="li-title">
              今日志愿者
            </div>
            <li class="li" v-for="(item, index) of nowList" :key="index">
              <span class="span span-huodong ellipsis">
                {{ item.name }}
              </span>
              <span class="span span-time ellipsis">
                {{ item.number }}
              </span>
            </li>
          </ul> -->
        </div>
      </template>
    </party-box>
    <el-dialog
      :title="value.name"
      :visible.sync="dialogVisible"
      width="32%"
      :modal="false"
      :destroy-on-close="true"
    >
      <div class="popbox">
        <p>队伍名称: {{value.name}}</p>
        <p>队伍介绍: {{value.desc}}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
export default {
  name: 'zhiyuan',
  data() {
    return {
      peopleList: [
        {
          name: '道德评议队',
          number: '13567278553',
          frequency: '1',
          desc:
            '居民道德评议会按照“为人正直、办事公道、威信较高、说理能力强”的要求由村民推荐、村两委审查确定评议会成员。针对村民思想道德方面存在的问题，列出评议要点，公正、客观、事实就是地进行评议。'
        },
        {
          name: '巾帼志愿者队',
          number: '13868283334',
          frequency: '2',
          desc:
            '余村村积极组织巾帼志愿者发挥自生独特优势践行主流价值，在全国文明城市创建宣传、庭院美化、结对提升等工作上发挥力量，争做新时代的新女性。'
        },
        {
          name: '两山文艺宣传队',
          number: '15157255909',
          frequency: '3',
          desc:
            '由余村村民自发组成的队伍，自行编排节目，定期开展形式多样、健康向上的文化活动。丰富农村文化生活，展现村庄精神面貌，宣传余村两山文化。在丰富村民业余生活的同时进一步深化村民的精神文明建设和人文素养。'
        },
        {
          name: '青年志愿者队',
          number: '13657221980',
          desc:
            '由余村年轻人自愿组成的队伍，在不为任何物质报酬的情况下，参与志愿工作，既是帮助他人、服务社会，同时也是传递爱心和传播文明。为余村做好强有力的后盾。',
          frequency: '4'
        },
        {
          name: '双禁劝导指挥队',
          number: '13567970055',
          desc:
            '在村党支部、村委会的指导下开展工作，实行自我管理、自我约束、自我教育、自我服务。主动热情地为村民的喜事、丧事操办做好服务。坚持从简原则，大力宣传利用锣鼓表演的方式代替燃放烟花爆竹式。为余村建设贡献自己的一份微薄之力。',
          frequency: '5'
        },
        {
          name: '乡贤调解队伍',
          number: '15157241398',
          frequency: '6',
          desc:
            '由余村退休老干部自发组成的一个团队，化解村庄矛盾纠纷。进一步提高村民素质，有力促进村庄和谐稳定，打造三治融合示范村。'
        }
      ],
      dialogVisible: false,
      valueList: [],
      type: '',
      typeValue: {
        huodong: [
          {
            time: '智慧养老服务中心',
            name: '健康义诊'
          },
          {
            time: '智慧养老服务中心',
            name: '免费理发'
          },
          {
            time: '智慧养老服务中心',
            name: '法律质询'
          },
          {
            time: '清风廊',
            name: '防电讯诈骗宣传'
          },
          {
            time: '清风廊',
            name: '小家电维修'
          },
          {
            time: '清风廊',
            name: '糖画,竹编'
          }
        ],
        zhiyuan: [
          {
            name: '周洪法',
            time: '13757272094'
          },
          {
            name: '陈婷',
            time: '13738226255'
          },
          {
            name: '朱迪',
            time: '15868253545'
          },
          {
            name: '韦斌',
            time: '13735126545'
          },
          {
            name: '刘立扬',
            time: '18768115015'
          },
          {
            name: '诸一洲',
            time: '13735176728'
          },
          {
            name: '方擎',
            time: '15372235018'
          }
        ]
      },
      value: {
        name: '',
        number: '',
        frequency: '',
        desc: ''
      },
      timer: null
    }
  },
  computed: {},
  watch: {
    type() {
      this.valueList = this.typeValue[this.type]
    }
  },
  methods: {
    checkTyep() {
      this.type = this.type === 'huodong' ? 'zhiyuan' : 'huodong'
    },
    getValue(obj) {
      this.value = obj
      this.dialogVisible = true
    }
  },
  mounted() {
    this.type = 'huodong'
    this.timer = setInterval(() => {
      this.checkTyep()
    }, 1000 * 5)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  components: {
    PartyBox
  }
}
</script>

<style scoped>
.zhiyuan >>> .content {
  padding: 0.26rem 0.34rem 0 0.24rem;
}
</style>

<style scoped lang="scss">
.zhiyuan {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(1344rem);
  z-index: 1055;
  display: flow-root;
  .div-top {
    .ul {
      display: flow-root;
      box-sizing: border-box;
      padding-left: px2rem(8rem);
      .li {
        width: px2rem(240rem);
        height: px2rem(34rem);
        background: rgba(19, 44, 89, 0.4);
        border-radius: 17px;
        box-sizing: border-box;
        padding-left: px2rem(23rem);
        float: left;
        line-height: px2rem(34rem);
        color: #00fcff;
        margin-top: px2rem(12rem);
        text-align: center;
        font-size: px2rem(18rem);
        cursor: pointer;
        &:nth-child(even) {
          margin-left: px2rem(11rem);
        }
        &:hover {
          filter: brightness(1.5);
        }
        span {
          display: inline-block;
          width: px2rem(151rem);
          height: px2rem(34rem);
          background: #132c59;
          border-radius: 17px;
          float: right;
          color: #fff;
          text-align: center;
        }
      }
    }
  }
  .div-center {
    box-sizing: border-box;
    padding-left: 0.16rem;
    overflow: hidden;
    .ul {
      float: left;
      width: 100%;
      height: px2rem(425rem);
      background: rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      margin-top: px2rem(15rem);
      &:nth-child(n + 2) {
        margin-left: px2rem(10rem);
      }
      .li-title {
        text-align: center;
        line-height: px2rem(48rem);
        font-size: px2rem(24rem);
        color: #00fcff;
      }
      .li {
        position: relative;
        overflow: hidden;
        height: px2rem(50rem);
        cursor: pointer;
        &:hover {
          background: rgba(19, 44, 89, 0.4);
        }
        .span {
          overflow: hidden;
          font-size: px2rem(18rem);
          line-height: px2rem(50rem);
          color: #fff;
          position: absolute;
        }
        .span-huodong {
          left: px2rem(50rem);
          width: px2rem(200rem);
        }
        .span-time {
          width: px2rem(240rem);
          left: px2rem(300rem);
        }
      }
    }
  }
  .popbox {
    p {
      font-size: px2rem(18rem);
      line-height: px2rem(40rem);
    }
  }
}
</style>
