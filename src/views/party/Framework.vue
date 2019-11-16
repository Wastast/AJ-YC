<template>
  <div class="Framework">
    <party-box title="组织架构" width="517" height="546">
      <template slot="content">
        <div class="box">
          <div class="div-top">
            <span
              v-for="item of typeList"
              :key="item.type"
              :class="item.type == type ? 'checked' : ''"
              @click="check(item.type)"
            >
              {{ item.name }}
            </span>
          </div>
        </div>
        <ul class="ul" v-for="(item, index) of list" :key="index">
          <li class="li" v-for="(items, index) of item" :key="index">
            <dl>
              <dt>
                <img :src="items.imgUrl" alt="" />
              </dt>
              <dd>
                {{ items.name }}
              </dd>
            </dl>
          </li>
        </ul>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box'
export default {
  name: 'Framework',
  data() {
    return {
      type: 'branch',
      typeList: [
        {
          name: '党支部',
          type: 'branch'
        },
        {
          name: '村民委员会',
          type: 'committee'
        },
        {
          name: '村务监督委员会',
          type: 'supervise'
        },
        {
          name: '村股份经济合作社',
          type: 'economics'
        }
      ],
      dataValue: {
        branch: [
          [
            {
              imgUrl: require('@/assets/party/abc.jpg'),
              name: '汪玉成'
            }
          ],
          [
            {
              imgUrl: require('@/assets/party/李辉.jpg'),
              name: '李辉'
            }
          ],
          [
            {
              imgUrl: require('@/assets/party/俞小平.jpg'),
              name: '俞小平'
            },
            {
              imgUrl: require('@/assets/party/张苗芳.jpg'),
              name: '张苗芳'
            }
          ]
        ],
        committee: [
          [
            {
              imgUrl: require('@/assets/party/俞小平.jpg'),
              name: '俞小平'
            }
          ],
          [
            {
              imgUrl: require('@/assets/party/李辉.jpg'),
              name: '胡青宇'
            },
            {
              imgUrl: require('@/assets/party/张苗芳.jpg'),
              name: '张苗芳'
            }
          ]
        ],
        supervise: [
          [
            {
              imgUrl: require('@/assets/party/李辉.jpg'),
              name: '李辉'
            }
          ],
          [
            {
              imgUrl: require('@/assets/party/叶百能.jpg'),
              name: '叶百能'
            },
            {
              imgUrl: require('@/assets/party/cde.jpg'),
              name: '俞月仙'
            }
          ]
        ],
        economics: [
          [
            {
              imgUrl: require('@/assets/party/abc.jpg'),
              name: '汪玉成'
            }
          ],
          [
            {
              imgUrl: require('@/assets/party/李辉.jpg'),
              name: '胡青宇'
            },
            {
              imgUrl: require('@/assets/party/张苗芳.jpg'),
              name: '张苗芳'
            }
          ]
        ]
      },
      list: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 切换type值
    check(type) {
      if (this.type === type) {
        return
      }
      this.type = type
      this.list = this.dataValue[this.type]
    }
  },
  mounted() {
    this.list = this.dataValue[this.type]
  },
  components: {
    PartyBox
  }
}
</script>

<style scoped lang="scss">
.Framework {
  position: absolute;
  top: px2rem(130rem);
  left: px2rem(1380rem);
  z-index: 100;
  .box {
    display: flex;
    .div-top {
      line-height: px2rem(48rem);
      margin: 0 auto;
      background: rgba(2, 7, 26, 0.6);
      color: rgba(59, 157, 225, 1);
      display: inline-block;
      box-sizing: border-box;
      padding-right: px2rem(20rem);
      span {
        font-size: px2rem(16rem);
        margin-left: px2rem(20rem);
        cursor: pointer;
        font-weight: bold;
        &:hover {
          color: #fff;
        }
      }
      .checked {
        color: #fff;
      }
    }
  }

  .ul {
    display: flex;
    height: px2rem(107rem);
    margin-top: px2rem(40rem);
    .li {
      margin: auto;
      dt {
        width: px2rem(84rem);
        height: px2rem(107rem);
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd {
        margin-top: px2rem(10rem);
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>
