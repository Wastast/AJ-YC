<template>
  <div class="park">
    <party-box title="停车场" width="308" height="197">
      <template slot="content">
        <div class="list">
          <div class="div" v-for="(item, index) of list" :key="index">
            <p class="title">
              {{ item.name }}
            </p>
            <p class="value">
              {{ typeValue[item.type] }}
            </p>
            <div class="icon">
              <img :src="item.icon" alt="" />
            </div>
          </div>
        </div>
      </template>
    </party-box>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { getPark } from '@/api/resourse';
export default {
  name: 'park',
  data() {
    return {
      list: [
        {
          name: '总车位',
          value: '200',
          icon: require('@/assets/resouse/park.png'),
          type: 'all'
        },
        {
          name: '剩余大车车位',
          value: '30',
          icon: require('@/assets/resouse/car.png'),
          type: 'small'
        },
        {
          name: '剩余小车车位',
          value: '20',
          icon: require('@/assets/resouse/var111.png'),
          type: 'big'
        }
      ],
      typeValue: {
        big: '',
        small: '',
        all: ''
      }
    };
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    getPark().then(data => {
      if (data.code === 0) {
        let { allnum, residualSmall, residualNumber } = data.data[0];
        this.typeValue = {
          big: residualNumber,
          small: residualSmall,
          all: allnum
        };
      }
    });
  },
  components: { PartyBox }
};
</script>

<style scoped lang="scss">
.park {
  position: absolute;
  top: px2rem(789rem);
  left: px2rem(325rem);
  z-index: 100;
  .list {
    .div {
      float: left;
      width: px2rem(95rem);
      height: px2rem(150rem);
      background: #0f2a59;
      margin-left: px2rem(5rem);
      margin-top: px2rem(20rem);
      border-radius: 5px;
      text-align: center;
      .title {
        color: #6e8cb2;
        margin-top: px2rem(10rem);
      }
      .value {
        color: #fff;
        font-family: 'DS-DIGII';
        font-size: px2rem(36rem);
        margin-top: px2rem(10rem);
      }
      .icon {
        display: inline-block;
        width: px2rem(53rem);
        height: px2rem(53rem);
        margin-top: px2rem(10rem);
        // img {
        //   width: 100%;
        //   height: 100%;
        // }
      }
    }
  }
}
</style>
