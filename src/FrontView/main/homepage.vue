<template>
  <div class="main" style="height: 100%">
    <el-container style="min-height:90vh">
      <el-main class="hp-main">
        <el-row class="lantern">
          <el-col :offset="3" :span="18">
            <template>
              <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="(item,index) in headers" :key="index">
                  <img :src='item.pic' alt="加载失败" style="width: 100%;height: 300px;">
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-col>
        </el-row>

        <el-row><!--1-->
          <el-col :offset="3" :span="13"><!--1.1-->
            <el-row class="category" v-for="categoryItem in categorys" :key="categoryItem.categoryId">
              <el-row class="category-header"><!--1.1.1-->
                <el-col :span="4">
                  <span class="categoryName">{{categoryItem.categoryName}}</span>
                </el-col>
                <!--<el-col :offset="1" :span="18"><a></a></el-col>-->
                <el-col :span="20">
                  简介：{{categoryItem.categoryIntroduce}}
                </el-col>
              </el-row>
              <el-row class="project"><!--1.1.2-->
                <el-col :span="7" v-for="(projectItem, index) in projects[categoryItem.categoryId - 1]"
                        :key="projectItem.projectId" :offset="index > 0 ? 1 : 0"
                style="margin-top: 3%">
                  <el-card :body-style="{ padding: '0px'}" @click.native="goProjectDetail(projectItem.projectId)">
                    <el-image :src=getImgUrl(projectItem.projectImagePath) class="image"></el-image>
                    <div>
                      <div class="information">
                        <span class="projectName">{{projectItem.projectName}}</span><br>
                        <span class="participantNumber">{{projectItem.participantNumber}}</span>
                        <span class="font">人捐赠</span>
                        <span class="raisedFunds">{{projectItem.raisedFunds}}</span>
                        <span class="font">元已募</span>
                      </div>
                      <div class="bottom">
                        <time class="time">限时{{projectItem.endingTime}}</time>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-row>
          </el-col>
          <el-col :span="4.5" style="margin-left: 1%"><!--1.2-->
            <el-row><!--1.2.1-->
              <i class="el-icon-date"></i>
              <!--<span>项目反馈</span>-->
              <span>为什么选择我们?</span>
            </el-row>
            <el-row><!--1.2.2-->
              <el-card class="box-card">
               <!-- <div v-for="o in 4" :key="o" class="text item">
                  {{'列表内容 ' + o }}
                </div>-->
                <div style="font-size: 14px;color: black;font-weight: bold;">
                  1.累计超过2.5亿爱心人士参与帮助
                </div>
              </el-card>
              <el-card class="box-card">
                <div style="font-size: 14px;color: black;font-weight: bold;">
                  2.已为大病患者筹到200多亿救命钱
                </div>
              </el-card>
              <el-card class="box-card">
                <div style="font-size: 14px;color: black;font-weight: bold;">
                  3.大病筹款 0服务费
                </div>
              </el-card>
              <el-card class="box-card">
                <div style="font-size: 14px;color: black;font-weight: bold;">
                  4. 互联网公开募捐信息平台发布募捐信息
                </div>
              </el-card>
            </el-row>

          </el-col>
        </el-row>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {Msg} from "../../tool/message";
  import {mainService} from "./mainService";

  export default {
    name: "homepage",
    data(){
      return {
        search:'',
        headers:[
          {
            pic:require('../../assets/images/1.jpg')
          },
          {
            pic:require('../../assets/images/2.jpg')
          },
          {
            pic:require('../../assets/images/3.png')
          },
          {
            pic:require('../../assets/images/4.jpg')
          },
          {
            pic:require('../../assets/images/5.jpg')
          },
        ],
        categorys:[],
        projects:[],
      }
    },
    components:{

    },
    created(){
    },
    //请求数据
    mounted() {
      mainService.requestHomepageData().then(res => {
        if(res.data == null){
          Msg.warn("加载失败")
        }
        this.categorys = res.data.categorys;
        this.projects = res.data.projects;
        console.log(this.projects)
      }).catch(err => {});
    },
    methods:{
      getImgUrl(icon) {
        return require('../../assets/images/' + icon );
      },
        returnLogin(){
        this.$router.push({path:'/login'});
      },
      returnRegiste(){
        this.$router.push({path:'/register'});
      },
      goProjectDetail(id){
        this.$router.push({path:'/projectDetail',query:{projectId:id}})
      }
    }
  }
</script>

<style scoped>
  .box-card{
    margin-bottom: 3%;margin-top: 3%;
  }
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
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .category{
    margin-bottom: 15px;
  }
  .categoryName{
    font-size: 24px;
    color: #596379;
  }
  .projectName{
    font-size: 13px;
    color: #A7CE8A;
    margin-bottom: 5px;
  }
  .participantNumber{
    font-size: 10px;
    color: #A7CE8A;
  }
  .font{
    font-size: 10px;
  }
  .raisedFunds{
    font-size: 10px;
    color: #00BBA2;
  }
  .information{
    margin-bottom: 5px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .el-col-offset-0{
    margin-left:4.16667% !important;
  }
</style>
<style>
  .hp-main{
    padding: 0px;
  }
  .hp-main .main-header-wrapper{
    margin-bottom: 19px;
  }

  .hp-main .lantern{
    margin-bottom: 19px;
  }
  .hp-main .image{
    width: 100%;
    height: 166px;
  }
</style>
