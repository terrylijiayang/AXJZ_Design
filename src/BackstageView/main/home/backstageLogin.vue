<template>
  <el-container>
    <div class="controlPanel-sidebar" width="220px">
      <el-menu class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               :collapse="isCollapse"
               background-color="rgb(32,34,42)"
               text-color="rgba(255, 255, 255, 0.8)"
               active-text-color="#fff">
        <div class="Title1" v-if="!isCollapse"><span>爱心捐助管理系统后台</span></div>
        <div class="Title2" v-if="isCollapse" style="width:60px;">
          <img src="../../../assets/images/logo.jpg" style="width: 40px;" alt="">
        </div>

        <div v-for="(item,i) in menus" :key="i">
          <div v-if="item.menuSts==1">
          <div v-if="item.children.length === 0">
            <router-link :to="item.menuAddr">
              <el-menu-item :index="item.menuAddr">
                <i :class="item.menuImg" />
                <span slot="title">{{ item.menuName }}</span>
              </el-menu-item>
            </router-link>
          </div>
           <div v-else>
             <el-submenu :index="item.menuAddr">
               <template slot="title">
                 <i :class="item.menuImg"></i>
                 <span slot="title">{{ item.menuName }}</span>
               </template>
               <div v-for="(iten,j) in item.children" :key="j">
                 <el-menu-item :index="iten.menuAddr" v-if="iten.menuSts==1">
                   <div class="barstyle"></div>
                   <router-link :to="iten.menuAddr">
                     <span style="color: white">{{iten.menuName}}</span>
                   </router-link>
                 </el-menu-item>
               </div>
             </el-submenu>
           </div>
          </div>
        </div>

        <!--<el-submenu index="1">
          <template slot="title">
            <i class="el-icon-data-board"></i>
            <span slot="title">人员管理</span>
          </template>
          <el-menu-item index="1-1"><div class="barstyle"></div>
            <router-link to ="/backAdmin">
              <span style="color: white">分配代理人</span>
            </router-link>
          </el-menu-item>

          <el-menu-item index="1-2"><div class="barstyle"></div>
            <router-link to ="/backUser">
              <span style="color: white">用户列表</span>
            </router-link>
          </el-menu-item>

          <el-menu-item index="1-3"><div class="barstyle"></div>
            <router-link to ="/backMenu">
              <span style="color: white">菜单管理</span>
            </router-link>
          </el-menu-item>

          <el-menu-item index="1-4"><div class="barstyle"></div>
            <router-link to ="/backRole">
              <span style="color: white">权限管理</span>
            </router-link>
          </el-menu-item>

        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">办结事务</span>
          </template>
          <el-menu-item index="2-1"><div class="barstyle"></div>
            <router-link to ="/backProject">
              <span style="color: white">项目管理</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="2-2"><div class="barstyle"></div>
            <router-link to="/backAdminLog">
              <span style="color: white">权限点管理</span>
            </router-link></el-menu-item>
        </el-submenu>-->
      <!--  <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span slot="title">系统监控</span>
          </template>
          <el-menu-item index="3-1"><div class="barstyle"></div>接口文档</el-menu-item>
          <el-submenu index="3-2">
            <span slot="title">日志管理</span>
            <el-menu-item index="3-2-1"><div class="barstyle" style="margin-left:-60px"></div>通用日志</el-menu-item>
            <el-menu-item index="3-2-2"><div class="barstyle" style="margin-left:-60px"></div>接口日志</el-menu-item>
            <el-menu-item index="3-2-3"><div class="barstyle" style="margin-left:-60px"></div>错误日志</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-connection"></i>
            <span slot="title">业务资源管理</span>
          </template>
          <el-menu-item index="4-1"><div class="barstyle"></div>应用管理</el-menu-item>
          <el-menu-item index="4-2"><div class="barstyle"></div>表单管理</el-menu-item>
          <el-submenu index="4-3">
            <span slot="title">流程管理</span>
            <el-menu-item index="4-3-1"><div class="barstyle" style="margin-left:-60px"></div>模型管理</el-menu-item>
            <el-menu-item index="4-3-2"><div class="barstyle" style="margin-left:-60px"></div>流程部署</el-menu-item>
            <el-menu-item index="4-3-3"><div class="barstyle" style="margin-left:-60px"></div>实例监控</el-menu-item>
            <el-menu-item index="4-3-4"><div class="barstyle" style="margin-left:-60px"></div>流程监控</el-menu-item>
          </el-submenu>
          <el-menu-item index="4-4"><div class="barstyle"></div>列表管理</el-menu-item>
          <el-menu-item index="4-5"><div class="barstyle"></div>业务角色管理</el-menu-item>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-data-analysis"></i>
            <span slot="title">平台管理</span>
          </template>
          <el-menu-item index="5-1"><div class="barstyle"></div>平台角色管理</el-menu-item>
          <el-menu-item index="5-2"><div class="barstyle"></div>平台用户管理</el-menu-item>
          <el-menu-item index="5-3"><div class="barstyle"></div>平台菜单管理</el-menu-item>
        </el-submenu>

        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item index="6-1"><div class="barstyle"></div>用户管理</el-menu-item>
          <el-menu-item index="6-2"><div class="barstyle"></div>组织机构</el-menu-item>
          <el-menu-item index="6-3"><div class="barstyle"></div>场景管理</el-menu-item>
          <el-menu-item index="6-4"><div class="barstyle"></div>字典管理</el-menu-item>
          <el-menu-item index="6-5"><div class="barstyle"></div>菜单管理</el-menu-item>
        </el-submenu>-->
      </el-menu>
    </div>
    <el-container class="controlPanel-mainbar" >
      <el-header height="55px">
        <i class="el-icon-s-fold" @click="CollapseTrue()" id="CollapseTrueIcon"></i>
        <i class="el-icon-s-unfold" @click="CollapseFalse()" id="CollapseFalseIcon"></i>
       <!-- <el-popover
          placement="bottom"
          width="80"
          trigger="click"
        >
          <div>
            <div class="user-box">
              首页
            </div>
            <div class="user-box">
              个人信息
            </div>
            <div class="user-box" @click="login">
              退出登录
            </div>
          </div>
          <div slot="reference" class="userImg">
            <img src="https://s2.ax1x.com/2020/02/26/3aZoa8.png">
          </div>
        </el-popover>-->
        <el-input
          placeholder="请输入搜索内容"
          v-model="input"
          size="small">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="userinfo">
          <el-dropdown :hide-on-click="false">
            <div class="el-dropdown-link">
              <img :src="getImgUrl(this.avatarPath)" width="35" height="35" loading="lazy" alt=""
                   style="  border: 1px solid #888;border-radius: 100px;vertical-align: middle;">
              {{this.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>首页</el-dropdown-item>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>
                <div @click="login()">退出系统</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="avater">
          </div>
        </div>

      </el-header>
      <el-main style="background-color: white">
        <router-view></router-view>
    <!--    <transition>
        <el-scrollbar style="height:100%">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-scrollbar>
        </transition>-->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {BackService} from './backstageLoginService'
  export default {
    data() {
      return {
        isCollapse: false,
        input: '',
        userName:this.$store.getters.userInfo.realName,
        avatarPath:this.$store.getters.userInfo.avatarPath,
        menus:[],
      };
    },
    components:{
      // Admin,
    },
    mounted(){
      let parms = {
        roleId: this.$store.getters.userInfo.roleId
      }
      BackService.getRoleAllMenu(parms).then(res => {
        this.menus=res.data;
      }).catch(err => {});
    },
    methods: {
      getImgUrl(icon) {
        return require('../../../assets/images/' + icon );
      },
      login(){
        this.$router.push({path: '/backLogin'});
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //收起
      CollapseTrue() {
        this.isCollapse = true;
        var show1 = document.getElementById("CollapseTrueIcon");
        var show2 = document.getElementById("CollapseFalseIcon");
        show2.style.display = "block";
        show1.style.display = "none";
      },
      //展开
      CollapseFalse() {
        this.isCollapse = false;
        var show1 = document.getElementById("CollapseTrueIcon");
        var show2 = document.getElementById("CollapseFalseIcon");
        show1.style.display = "block";
        show2.style.display = "none";
      },
    }
  }
</script>


<style scoped>
  a{
    text-decoration: none;
  }
  .controlPanel-sidebar {
    height: 100vh;
  }
  .Title1 {
    background:rgb(32,34,42);
    width:219px;
    height:55px;
    border-bottom: 2px rgb(6,7,8) solid;
  }
  .controlPanel-sidebar .Title1 span {
    display: block;
    text-align: center;
    font-weight: 300;
    font-size: 18px;
    color: white;
    font-family: 'YouYuan';
    padding-top: 15px;
  }

  .controlPanel-sidebar .Title2 {
    background:rgb(32,34,42);
    width:219px;
    height:55px;
    border-bottom: 2px rgb(6,7,8) solid;
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    padding-top:15px;
  }
  .controlPanel-sidebar .el-menu-vertical-demo {
    min-height: 100%;
    height: 100%;
  }
  .controlPanel-sidebar .barstyle {
    width: 4px;
    background: #409EFF;
    height: 50px;
    float: left;
    margin-left: -40px;
    display: none;
  }
/*  .controlPanel-sidebar.el-menu-item:hover {
    background: rgb(6,7,8) !important;
    color: #fff !important;
  }*/
  .controlPanel-sidebar i {
    color: #fff !important;
  }
  .controlPanel-sidebar.barstyle {
    display: block;
  }

  .controlPanel-sidebar .el-menu-item.is-active {
    background: rgb(6, 7, 8) !important;
  }
  .controlPanel-sidebar .barstyle {
    display: block;
  }

  .controlPanel-sidebar .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
  }

  .controlPanel-mainbar {
    padding: 0px;
    height: 100vh;
    background: rgb(242, 242, 242);
  }
  .controlPanel-mainbar .el-header {
    background: white !important;
  }
  .controlPanel-mainbar .el-icon-s-fold {
    font-size: 28px;
    color: rgb(144,147,153);
    padding-top: 13px;
    display: block;
    width: 20px;
    float: left;
  }
  .controlPanel-mainbar .el-icon-s-unfold {
    font-size: 28px;
    color: rgb(144,147,153);
    padding-top: 13px;
    display: none;
    width: 20px;
    float: left;
    }
  .controlPanel-mainbar .el-input {
    width: 250px;
    padding-left: 30px;
    padding-top: 12px;
  }
  .controlPanel-mainbar .el-button {
    padding-left: 13px;
    padding-right: 6px;
  }

  .userinfo {
    float: right;
  }
 /* .controlPanel-mainbar .avater
  {
    width: 35px;
    height: 35px;
    background: rgb(56,161,242);
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    margin-top: 10px;
    float: right;
    margin-right: 15px;
    }*/
  .controlPanel-mainbar .el-dropdown {
    float: right;
  }
  .controlPanel-mainbar .el-dropdown-link {
    color: black !important;
    margin-right: 5px;
    margin-top: 18px;
  }

</style>
<style scoped>
  .controlPanel-sidebar .el-submenu i,span{
    color: rgba(255, 255, 255, 0.8) !important;
  }
 /* .controlPanel-sidebar .el-submenu i:hover,span:hover{
    color: #fff !important;
    background: rgb(6,7,8) !important;
  }*/
 /* .controlPanel-sidebar .el-submenu .el-submenu__title:hover{
    color: #fff !important;
    background: rgb(6,7,8) !important;

  }*/
  .controlPanel-sidebar .el-submenu .el-submenu__title.is-active {
    background: rgb(6,7,8) !important;
  }
</style>
