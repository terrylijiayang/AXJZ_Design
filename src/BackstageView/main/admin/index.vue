<template>
  <div style="margin-left: 1%;">
    <div class="back">
      <i class="el-icon-user-solid"></i>分配审查人员
    </div>
    <div class="back">
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入人员名字"
        v-model="userValue"
        :titles="['待分配人员', '已分配人员']"
        :data="userData"
        >
      </el-transfer>
      <el-button type="primary"  @click="submitAdmin" style="margin-top: 1%">确定分配</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
          return {
            userData: this.generateData(),
            userValue: [],
          };
      },
      computed: {
        maxHeight() {
          return `${window.screen.availHeight - 220}px`
        },

      },
      created() {
        this.getData()
      },
      methods: {
        getData() {

        },
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        },
        generateData (){
          const data = [];
          const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
          const pinyin = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
          cities.forEach((city, index) => {
            data.push({
              label: city,
              key: index,
              pinyin: pinyin[index]
            });
          });
          return data;
        },
        submitAdmin(){
          console.log(this.userValue)
        },
      }
    }
</script>

<style scoped>
.back{
  width:96%;padding: 1% 1% 1% 1%;
  background: rgba(242, 242, 242, 0.498039215686275);
  margin-bottom: 1%;
}
</style>
