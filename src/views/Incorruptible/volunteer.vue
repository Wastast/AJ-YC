<template>
  <div class="volunteer">
    <party-box title="志愿信息" width="532" height="392">
      <template slot="content">
        <ul class="ul">
          <vuescroll ref="vs">
            <li class="li" v-for="(item, index) of list" :key="index" @click="getTeamValue(item)">
              <div class="div-imgbox">
                <img :src="req + '/upload/volunteerTeam/' + item.teamImages" alt="" />
              </div>
              <div class="div-text">
                <p class="p-titles ellipsis">
                  {{ item.teamName }}
                </p>
                <div class="text-box" :title="item.describe">
                  {{ item.describe }}
                </div>
              </div>
            </li>
          </vuescroll>
        </ul>
      </template>
    </party-box>
    <el-dialog
      :title="Team.teamName"
      :visible.sync="dialogVisible"
      width="32%"
      :modal="false"
      :destroy-on-close="true"
    >
      <div class="popbox">
        <vuescroll>
          <el-table :data="Team.peopleList">
            <el-table-column property="name" label="名字" width="150"></el-table-column>
            <el-table-column property="duty" label="职位" width="150"></el-table-column>
            <el-table-column property="phone" label="电话" width="150"></el-table-column>
          </el-table>
          <p>队伍介绍: {{ Team.describe }}</p>
        </vuescroll>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PartyBox from '@/components/party-box';
import { getTeam, getFloatTeam } from '@/api/incorruptible';
import vuescroll from 'vuescroll';
import { mapGetters } from 'vuex';
export default {
  name: 'volunteer',
  data() {
    return {
      list: [],
      dialogVisible: false,
      req,
      Team: {
        teamName: '',
        describe: '',
        peopleList: []
      }
    };
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {},
  methods: {
    // 获取队伍
    getTeamValue(obj) {
      getFloatTeam({
        teamNo: obj.id
      }).then(data => {
        if (data.code === 0) {
          console.log(data);
          let { teamName, describe } = obj;
          this.Team = {
            teamName,
            describe,
            peopleList: data.data
          };
          this.dialogVisible = true;
        }
      });
    }
  },
  mounted() {
    getTeam().then(data => {
      console.log(data);
      if (data.code === 0) {
        this.list = data.data;
      }
    });
  },
  components: {
    PartyBox,
    vuescroll
  }
};
</script>

<style scoped>
.volunteer >>> .content {
  padding: 0.26rem 0.34rem 0 0.24rem;
}
</style>

<style scoped lang="scss">
.volunteer {
  position: absolute;
  top: px2rem(134rem);
  left: px2rem(1344rem);
  z-index: 1055;
  display: flow-root;
  .popbox {
    height: px2rem(500rem);
    p {
      line-height: px2rem(24rem);
    }
  }
  .ul {
    height: px2rem(340rem);
    .li {
      padding: px2rem(6rem) 0 0 px2rem(10rem);
      height: px2rem(160rem);
      background: rgba(3, 12, 35, 0.3);
      border-radius: 5px;
      box-sizing: border-box;
      display: flow-root;
      > div {
        float: left;
      }
      &:nth-child(n + 2) {
        margin-top: px2rem(10rem);
      }
      .div-imgbox {
        width: px2rem(228rem);
        height: px2rem(149rem);
        background: #000;
        border-radius: 6px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .div-text {
        display: flow-root;
        width: px2rem(224rem);
        margin-left: px2rem(19rem);
        .p-titles {
          font-size: px2rem(22rem);
          color: rgba(255, 255, 255, 1);
          margin-bottom: px2rem(10rem);
          display: inline-block;
          width: px2rem(225rem);
        }
        .text-box {
          font-size: px2rem(14rem);
          line-height: 24px;
          color: rgba(159, 187, 201, 1);
          overflow: hidden;
          height: px2rem(115rem);
        }
      }
    }
  }
}
</style>
