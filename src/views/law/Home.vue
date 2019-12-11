<template>
  <div class="Home">
    <party-box title="家园卫队" width="592" height="372">
      <template slot="content">
        <div class="div-box" v-for="(item, index) of list" :key="index" @click="drawCircle(item)">
          <div class="title">第{{ index + 1 }}组</div>
          <ul class="ul">
            <li class="li" v-for="(items, index) of item.node" :key="index">
              <dl>
                <dt :style="{ color: items.state ? '' : '#999' }">
                  {{ items.name }}
                  <span style="font-size: 12px;">
                    {{ items.remark == '村民组长' ? '(组长)' : '' }}
                  </span>
                </dt>
                <dd :style="{ color: items.state ? '' : '#999' }">{{ items.phone }}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { getHome } from '@/api/law';
export default {
  name: 'Home',
  data() {
    return {
      list: [
        [
          {
            name: '俞春华',
            number: '13567278553',
            isZu: true
          },
          {
            name: '刘备军',
            number: '13868283334',
            isZu: false
          },
          {
            name: '宋瑶',
            number: '15157255909',
            isZu: false
          }
        ],
        [
          {
            name: '赵水根',
            number: '13657221980',
            isZu: true
          },
          {
            name: '俞金宝',
            number: '13567970055',
            isZu: false
          },
          {
            name: '赵必成',
            number: '15157241398',
            isZu: false
          }
        ],
        [
          {
            name: '汪苗青',
            number: '13515727609',
            isZu: true
          },
          {
            name: '胡斌',
            number: '15967202382',
            isZu: false
          },
          {
            name: '胡青峰',
            number: '13868283535',
            isZu: false
          }
        ],
        [
          {
            name: '李熙忠',
            number: '13505820121',
            isZu: true
          },
          {
            name: '周高峰',
            number: '13757257605',
            isZu: false
          },
          {
            name: '邹志洪',
            number: '15967202224',
            isZu: false
          }
        ],
        [
          {
            name: '鲍新红',
            number: '13867240632',
            isZu: true
          },
          {
            name: '阮杰',
            number: '13626727484',
            isZu: false
          },
          {
            name: '陈煜桥',
            number: '13957254545',
            isZu: false
          }
        ],
        [
          {
            name: '黄文虎',
            number: '13957277747',
            isZu: true
          },
          {
            name: '琚超',
            number: '13757277237',
            isZu: false
          },
          {
            name: '胡润凯',
            number: '15857236001',
            isZu: false
          }
        ],
        [
          {
            name: '姜志华',
            number: '13957277747',
            isZu: true
          },
          {
            name: '钟姣珍',
            number: '13757277237',
            isZu: false
          }
        ],
        [
          {
            name: '叶海军',
            number: '13735122831',
            isZu: true
          },
          {
            name: '杨成明',
            number: '13567975307',
            isZu: false
          }
        ]
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 绘制圆圈
    drawCircle(item) {
      let range = item.range;
      if (!range) {
        return;
      }
      TMapAPI.ClearFeatures();
      var ppsMainBuild = SPoint.GetPointSFromString(range);
      var xlMansion = new SLineString(ppsMainBuild);
      var fsMansion = new SFeatureStyle();
      fsMansion.SetFillColor('transparent');
      fsMansion.SetFillColor('#B56FE2');
      // 模型边框外壳
      fsMansion.SetStrokeWidth(0);
      // fsMansion.SetStrokeColor("#B56FE2");
      fsMansion.SetHoverFillColor('#B56FE2');
      fsMansion.SetHoverStrokeColor('#B56FE2');
      // 外壳2
      fsMansion.SetHoverStrokeWidth(2);
      fsMansion.SetHoverEnabled(true);
      // 范围 属性 TAG 扩展说明
      var pfMansion = new SFeature(xlMansion, fsMansion, '1');
      TMapAPI.GetVectorLayer().AddFeatures([pfMansion]);
      TMapAPI.map.SetCenter(new SLonLat(item.lon, item.lat), 1);
    }
  },
  mounted() {
    getHome().then(data => {
      if (data.code === 200) {
        this.list = data.data;
      }
    });
  },
  components: { PartyBox }
};
</script>

<style scoped lang="scss">
.Home {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(41rem);
  z-index: 100;
  .div-box {
    box-sizing: border-box;
    padding-left: px2rem(10rem);
    padding-top: px2rem(8rem);
    float: left;
    height: px2rem(180rem);
    .title {
      color: rgba(128, 165, 206, 1);
      margin-bottom: px2rem(5rem);
    }
    .ul {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      width: px2rem(136rem);
      box-sizing: border-box;
      padding: px2rem(5rem) px2rem(12rem) px2rem(10rem) px2rem(12rem);
      .li {
        dt {
          font-size: px2rem(18rem);
          color: rgba(13, 123, 225, 1);
        }
        dd {
          margin-top: px2rem(5rem);
          color: #fff;
          font-size: px2rem(16rem);
        }
        &:nth-child(n + 2) {
          margin-top: px2rem(14rem);
        }
      }
    }
  }
}
</style>
