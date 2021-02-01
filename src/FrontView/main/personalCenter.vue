<template>
    <div class="personalCenter">
      <pchead></pchead>
      <el-container>
        <el-main>
          <el-row>
            <el-col :offset="3" :span="12">
              <el-card>
                <el-row class="realName">
                  <el-col :span="3" :push="1"><span>姓名：</span></el-col>
                  <el-col :span="4"><span>吴浩铭</span></el-col>
                </el-row>
                <el-row class="nickName">
                  <el-col :span="3" :push="1"><span>昵称：</span></el-col>
                  <el-col :span="4"><span>Hawrk</span></el-col>
                </el-row>
                <el-row class="phone">
                  <el-col :span="4"><span>联系方式：</span></el-col>
                  <el-col :span="4"><span>18875213962</span></el-col>
                </el-row>
                <el-row class="identityNumber">
                  <el-col :span="3"><span>身份证号：</span></el-col>
                  <el-col :span="4"><span>411081199802279039</span></el-col>
                </el-row>

              </el-card>
            </el-col>
            <el-col :offset="1" :span="2">
              <el-button round @click="goMyDonation()">我的捐赠</el-button>
            </el-col>
            <el-col :span="2">
              <el-button round @click="goMyApplication()">我的求助项目</el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import head from '../header/header'
    export default {
      name: "personalCenter",
      data(){
        return {}
      },
      components:{
        pchead:head
      },
      methods:{
        goMyDonation(){
          this.$router.push({path:'/myDonation'})
        },
        goMyApplication(){
          this.$router.push({path:'/myApplication'})
        }
      }
    }
</script>

<style scoped>
  .el-button{
    border: 1px solid #A8CE8C;
  }
</style>
