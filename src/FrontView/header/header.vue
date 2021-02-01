<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :offset="3" :span="2">
            <router-link :to="{ path: '/homepage' }">
              <img class="logo" src="../../assets/images/logo.jpg" >
            </router-link>
          </el-col>
          <el-col :offset="12" :span="1" style="text-align: center">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="returnLogin" v-if="!isLogin">登录</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="returnRegiste" v-if="!isLogin">注册</el-dropdown-item>
                <el-dropdown-item v-if="isLogin">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="1">
            <el-image class="avatar" :src='this.avatarPath' v-if="isLogin" @click.native="goPersonalCenter()"></el-image>
          </el-col>
          <el-col :span="2">
            <span>{{userName}}</span>
          </el-col>
        </el-row>
      </el-header>
      <el-row class="head-donate">
        <el-col :offset="3" :span="7">
          <el-input
            placeholder="搜索慈善项目"
            prefix-icon="el-icon-search"
            v-model="search">
          </el-input>
        </el-col>
        <el-col :offset="8" :span="2">
          <el-button round @click="goApplication()">申请救助</el-button>
        </el-col>

      </el-row>
    </el-container>
  </div>
</template>

<script>
  import path from '../../../config/dev.env'
  export default {
    //name: "header",
    data(){
      return {
        isLogin:false,
        avatarPath:'',
        userName:'您好，请登录',
        search:'',

      }
    },
    created(){
    },
    mounted() {
      if(this.$store.getters.isLogin){
        this.isLogin = true;
        this.userName = this.$store.getters.userInfo.realName;
        this.avatarPath = path.IMAGE_PATH + this.$store.getters.userInfo.avatarPath;
        // this.avatarPath = require('../../../../' + this.$store.getters.userInfo.avatarPath);

      }
    },
    methods:{
      returnLogin(){
        this.$router.push({path:'/login'});
      },
      returnRegiste(){
        this.$router.push({path:'/register'});
      },
      goMyDonation(){
        this.$router.push({path:'/myDonation'})
      },
      goApplication(){
        this.$router.push({path:'/application'})
      },
      goPersonalCenter(){
        this.$router.push({path:'/personalCenter'})
      }
    }
  }
</script>

<style scoped>

  .el-header {
    background-color: white;
    color: #333;
    line-height: 60px;
    border-bottom: 1px solid #dcdfe6
  }
  .logo{
    width: 50px;
    height: 50px;
    margin-right: 1100px;
  }
  .avatar{
    width: 40px;
    height: 40px;
    margin-top: 10px;
  }

</style>
<style>
  .header .el-dropdown{
    font-size: 20px;
  }
  .head-donate {
    margin-top: 19px;
    margin-bottom: 17px;
  }
  .head-donate .el-input{
    width: 370px;
    min-width: 370px;
    display:inline-block;
  }
  .head-donate .el-input--prefix .el-input__inner {
    border: 1px solid #A8CE8C;
    height: 34px;
    border-radius: 25px;
  }
  .head-donate .el-button{
    border: 1px solid #A8CE8C;
  }
  .head-donate .el-image__inner{
    border-radius: 50%;
  }
</style>
