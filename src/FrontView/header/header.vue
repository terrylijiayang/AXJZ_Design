<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :offset="3" :span="7">
            <router-link :to="{ path: '/index' }">
              <img class="logo" src="../../assets/images/logo.jpg" >
            </router-link>
            <div style="display: inline-block;vertical-align: top;">
              您好，欢迎进入愛心捐助管理平台！
            </div>
          </el-col>
          <el-col :offset="8":span="6">
            <el-image class="avatar" :src='this.avatarPath' v-if="isLogin" @click.native="goPersonalCenter()" style="  border: 1px solid #888;border-radius: 100px;vertical-align: middle;"></el-image>
            <span>{{userName}}</span>
            <el-dropdown>
              <!-- <i class="el-icon-setting" style="margin-right: 15px"></i>
          -    <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item @click.native.prevent="returnLogin" v-if="!isLogin">登录</el-dropdown-item>
                 <el-dropdown-item @click.native.prevent="returnRegiste" v-if="!isLogin">注册</el-dropdown-item>
                 <el-dropdown-item v-if="isLogin" >
                   <span @click="exit()">退出</span>
                 </el-dropdown-item>
               </el-dropdown-menu>-->
              <i class="el-icon-arrow-down el-icon--right"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link :to="{ path: '/index' }" style="text-decoration: none;color: #000;">首页
                  </router-link></el-dropdown-item>
                <el-dropdown-item>
                  <div @click="goPersonalCenter()">个人信息</div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="exit()">退出系统</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
        <el-col :offset="9" :span="2">
          <el-button round @click="goApplication()">申请救助</el-button>
          <!--<el-button round @click="goApplication()">每日签到</el-button>-->
        </el-col>


      </el-row>
    </el-container>
    <el-scrollbar >
        <router-view></router-view>
    </el-scrollbar>

  </div>
</template>

<script>
  import path from '../../../config/dev.env'
  import {Msg} from "../../tool/message";
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
        // this.avatarPath = path.IMAGE_PATH + this.$store.getters.userInfo.avatarPath;
        this.avatarPath = require('../../assets/images/' + this.$store.getters.userInfo.avatarPath);

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
      },
      exit(){
        this.$router.push({path: '/'});
        Msg.success("退出登录")
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
    display: inline-block;
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
