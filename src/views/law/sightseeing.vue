<template>
  <div class="sightseeing">
    <party-box title="治安视频" width="592" height="184">
      <template slot="content">
        <ul class="ul">
          <li class="li">
            <dl>
              <!-- <dt>
                <el-select v-model="value" placeholder="请选择视频检测位置">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </dt> -->
              <dd></dd>
            </dl>
          </li>
          <li class="li">
            <dl>
              <!-- <dt>
                <el-select v-model="value" placeholder="请选择视频检测位置">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </!-->
              <dd></dd>
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
  name: 'sightseeing',
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  components: { PartyBox }
}
</script>

<style scoped>
.ul .li dt >>> .el-select{
  width: 100%;
}
.ul .li dt >>> .el-input__inner{
  border: 1px solid rgba(220, 223, 230, 0);
  background-color: #fff0;
}
</style>

<style scoped lang="scss">
.sightseeing {
  position: absolute;
  top: px2rem(804rem);
  left: px2rem(41rem);
  z-index: 100;
  .ul {
    display: flow-root;
    .li {
      box-sizing: border-box;
      padding-top: px2rem(5rem);
      margin-left: px2rem(35rem);
      float: left;
      dt {
        width: px2rem(240rem);
        height: px2rem(40rem);
        background: rgba(49, 129, 191, 0.26);
        border: 1px solid rgba(45, 126, 182, 1);
        opacity: 0.8;
        border-radius: 6px;
        box-sizing: border-box;
      }
      dd {
        width: px2rem(240rem);
        height: px2rem(170rem);
        background: rgba(2, 7, 26, 1);
        border-radius: 4px;
      }
    }
  }
}
</style>
