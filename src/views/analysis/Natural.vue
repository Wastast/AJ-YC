<template>
  <div class="Natural">
    <module-box title="乡村环境">
      <template slot="content">
        <ul class="ul">
          <li class="li" v-for="(item, index) of list" :key="index">
            <img :src="item.imgUrl" alt="" />
            <dl>
              <dt>
                {{item.name}}
              </dt>
              <dd>
                {{item.value}}
              </dd>
            </dl>
          </li>
        </ul>
      </template>
    </module-box>
  </div>
</template>

<script>
import ModuleBox from '@/components/analys-box'
export default {
  name: 'Natural',
  data() {
    return {
      list: [
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6@2x.png'),
          name: 'PM值',
          value: '32'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝 3@2x.png'),
          name: '温度',
          value: '26C'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝@2x.png'),
          name: '湿度',
          value: '56%'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝 2@2x(1).png'),
          name: '垃圾容量',
          value: '48L'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝 3@2x.png'),
          name: '水质',
          value: '2ppm'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝 3@2x(1).png'),
          name: 'PH值检测',
          value: '5.6'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝 3@2x(2).png'),
          name: '溶解氧',
          value: '9.3'
        },
        {
          imgUrl: require('@/assets/analysis/圆角矩形 6 拷贝 3@2x(3).png'),
          name: '垃圾桶告警',
          value: '3'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: {
    ModuleBox
  }
}
</script>

<style scoped lang="scss">
.Natural {
  position: absolute;
  top: px2rem(140rem);
  right: px2rem(10rem);
  .ul {
    display: flow-root;
    .li {
      width: px2rem(110rem);
      height: px2rem(100rem);
      float: left;
      margin-left: px2rem(5rem);
      position: relative;
      &:nth-child(n + 5) {
        margin-top: px2rem(5rem);
      }
      img {
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      dl {
        position: absolute;
        top: px2rem(20rem);
        left: px2rem(13rem);
        font-family: PingFangSC;
        dt {
          font-size: 12px;
          color: rgba(131, 178, 255, 1);
          margin-bottom: px2rem(19rem);
        }
        dd {
          font-size: 22px;
          font-style: italic;
          color: rgba(98, 208, 243, 1);
        }
      }
    }
  }
}
</style>
