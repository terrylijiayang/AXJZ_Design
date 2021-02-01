<template>
    <div class="main">
      <hphead></hphead>

      <el-container>
        <el-main class="hp-main">
          <el-row class="lantern">
            <el-col :offset="2" :span="15">
              <template>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item v-for="(item,index) in headers" :key="index">
                    <img :src='item.pic' alt="加载失败" style="width: 100%;height: 300px;">
                    <!--<img src="../../assets/images/1.jpg" alt="加载失败">-->
                    <!--<h3>{{ item }}sdfsd</h3>-->
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
                  <el-col :offset="17" :span="3"><a>查看全部</a></el-col>
                </el-row>
                <el-row class="project"><!--1.1.2-->
                  <el-col :span="7" v-for="(projectItem, index) in projects[categoryItem.categoryId - 1]" :key="projectItem.projectId" :offset="index > 0 ? 1 : 0">
                    <el-card :body-style="{ padding: '0px' }" @click.native="goProjectDetail(projectItem.projectId)">
                      <el-image :src='projectItem.projectImagePath' class="image"></el-image>
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
            <el-col :span="4"><!--1.2-->
              <el-row><!--1.2.1-->
                <i class="el-icon-date"></i>
                <span>项目反馈</span>
              </el-row>
              <el-row><!--1.2.2-->
                <el-card class="box-card">
                  <div v-for="o in 4" :key="o" class="text item">
                    {{'列表内容 ' + o }}
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
  import head from '../../FrontView/header/header'
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
        hphead:head,
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
        }).catch(err => {});
      },
      methods:{
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
