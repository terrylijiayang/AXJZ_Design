<template>
    <div class="personalCenter">
      <!--个人信息-->
      <div class="back">
        <i class="el-icon-user-solid"></i>用户信息
      </div>
      <el-container>
        <el-main>
          <el-row>
            <el-col :offset="3" :span="12">
              <el-card style="background: rgba(242, 242, 242, 0.498039215686275);">
                <el-row class="realName">
                  <el-col :span="3" :push="1"><span>姓名：</span></el-col>
                  <el-col :span="4"><span>{{this.realName}}</span></el-col>
                </el-row>
                <el-row class="nickName">
                  <el-col :span="3" :push="1"><span>昵称：</span></el-col>
                  <el-col :span="4"><span>{{this.nickName}}</span></el-col>
                </el-row>
                <el-row class="phone">
                  <el-col :span="3"><span>联系方式：</span></el-col>
                  <el-col :span="4"><span>{{this.phone}}</span></el-col>
                </el-row>
                <el-row class="identityNumber">
                  <el-col :span="3"><span>身份证号：</span></el-col>
                  <el-col :span="4"><span>{{this.identityNumber}}</span></el-col>
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
    export default {
      name: "personalCenter",
      data(){
        return {
          nickName:'',
          realName:'',
          phone:'',
          identityNumber:''
        }
      },
      components:{
      },
      created(){
        console.log(this.$store.getters.userInfo)
        this.realName=this.$store.getters.userInfo.realName;
        this.nickName=this.$store.getters.userInfo.nickName;
        this.phone = this.$store.getters.userInfo.phone;
        this.identityNumber= this.$store.getters.userInfo.identityNumber;
        console.log(this.$store.getters.userInfo)
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
  .back{
    width: 46.5%;
    padding: 1% 1% 1% 1%;
    background: rgba(242, 242, 242, 0.498039215686275);
    margin-left: 13.5%;
  }
  .backText{

  }
</style>
