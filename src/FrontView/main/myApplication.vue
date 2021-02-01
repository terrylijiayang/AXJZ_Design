<template>
    <div class="myApplication">
      <mahead></mahead>
      <el-container>
        <el-main class="ma-main">
          <el-row>
            <el-col :offset="3" :span="13">
              <el-row class="projectInfo" v-for="(o,index) in 3" :key="index">
                <el-row>
                  <el-col :span="6">
                    <img style="width: 160px;height: 100px"
                         src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"/>
                  </el-col>
                  <el-col :span="13">
                    <div class="projectName">
                      <span class="category title">[教育助学]</span>
                      <el-link class="title" href="https://element.eleme.io" target="_blank">给贫困儿童送书包</el-link>
                      <span class="category title">审核通过</span>
                    </div>
                    <div style="margin-bottom: 8px">
                      <span class="font">参捐人数:</span>
                      <span class="participantNumber font">123456</span>
                      <span class="font">人参与捐助</span>
                      <span class="font">已募捐:</span>
                      <span class="money font">2.00</span>
                      <span class="font">元</span>
                    </div>
                    <div style="margin-bottom: 10px">
                      <span class="font">项目时间:</span>
                      <span class="projectTime font">2016-05-24</span>
                      <span class="font">至</span>
                      <span class="projectTime font">2016-05-24</span>
                    </div>
                    <el-button type="warning" size="small" @click="goDonate()">修改申请</el-button>
                    <el-button type="warning" size="small" @click="goDonate()">使用资金</el-button>
                    <el-button type="warning" size="small" @click="goDonate()">添加反馈</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-divider></el-divider>
                </el-row>

              </el-row>

            </el-col>
            <el-col class=""></el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import head from '../header/header'
    export default {
        name: "myApplication",
      data(){
          return {}
      },
      components:{
          mahead:head
      }
    }
</script>

<style scoped>
  .projectName{
    margin-bottom: 8px;
  }
  .participantNumber{
    color: green;
  }
  .category{
    color: green;
  }
  .title{
    font-size: 14px;
    font-weight: bold;
  }
  .times{
    color: darkorange;
  }
  .money{
    color: darkorange;
  }
  .font{
    font-size: 12px;
  }
</style>
