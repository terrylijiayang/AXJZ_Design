<template>
    <div class="projectDetail">
      <el-container>
        <el-main class="pd-main">
          <el-row>
            <el-col class="pd-left-side" :offset="3" :span="13">
              <el-row class="projectInfo">
                <el-col :span="10">
                  <el-image :src=getImgUrl(projectDetail.projectImagePath) style="width: 300px;height: 190px;"></el-image>
                </el-col>
                <el-col :span="13" style="margin-left: 10px">
                  <div class="projectName"><span>{{projectDetail.projectName}}</span></div>
                  <div class="budget">
                    <span class="font">筹款目标:</span>
                    <span class="raisedFunds">{{projectDetail.budget}}</span>
                    <span class="font">元</span>
                  </div>
                  <div style="margin-bottom: 8px">
                    <span class="font">已募善款:</span>
                    <span class="raisedFunds">{{projectDetail.raisedFunds}}</span>
                    <span class="font">元</span>
                  </div>
                  <div style="margin-bottom: 8px">
                    <span class="font">参捐人数:</span>
                    <span class="participantNumber">{{projectDetail.participantNumber}}</span>
                    <span class="font">人参与捐助</span>
                  </div>
                  <div style="margin-bottom: 10px">
                    <span class="font">项目时间:</span>
                    <span class="projectTime">{{projectDetail.startingTime}}</span>
                    <span class="font">至</span>
                    <span class="projectTime">{{projectDetail.endingTime}}</span>
                  </div>
                  <div v-if="new Date().getTime()>=new Date(projectDetail.startingTime).getTime()&&new Date().getTime()<=new Date(projectDetail.endingTime).getTime()">
                    <el-button type="warning" @click="goDonate(projectDetail.projectId)">我要捐赠</el-button>
                  </div>
                  <div v-else>
                    <el-button type="warning" disabled>捐款时间过期</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row class="project">
                <el-row class="button">
                  <el-col :span="4">
                    <el-button type="success" plain @click="showIntroduce()">项目介绍</el-button>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="success" plain @click="showFundRecord()">善款去向</el-button>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="success" plain @click="showFeedback()">项目反馈</el-button>
                  </el-col>
                </el-row>
                <el-row class="information" v-show="infoShow">
                  <el-row class="projectImage">
                    <!--展示图片-->
                    <!--<el-col :span="8" v-for="(o,index) in 3" :key="index">-->
                      <!--<el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>-->
                    <!--</el-col>-->
                  </el-row>
                  <el-row style="margin-bottom: 20px">
                    <el-col>
                      <span style="font-weight: bold">项目介绍</span>
                    </el-col>
                  </el-row>
                  <el-row class="projectIntroduce">
                    <el-col>
                      <span class="font">
                       {{projectDetail.introduce}}
                      </span>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom: 20px">
                    <el-col>
                      <span style="font-weight: bold">项目执行计划</span>
                    </el-col>
                  </el-row>
                  <el-row class="projectPlan">
                    <el-col>
                      <span class="font"> {{projectDetail.projectPlan}}</span>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom: 10px">
                    <el-col>
                      <span style="font-weight: bold">项目预算</span>
                    </el-col>
                  </el-row>
                  <el-row class="projectBudget">
                    <el-col>
                      <span class="font"> {{projectDetail.budgetBreakdown}}</span>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row class="fback" v-show="fbShow">
                <el-timeline>
                  <el-timeline-item :timestamp='feedback.createdAt' placement="top" v-for="(feedback,index) in feedbacks" :key="feedback.feedbackId">
                    <el-card>
                      <h4>{{feedback.feedbackName}}</h4>
                      <p>{{feedback.content}}</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </el-row>
                <el-row class="fback" v-show="frShow">
                  <el-timeline>
                    <el-timeline-item :timestamp='fundRecord.createdAt' placement="top" v-for="(fundRecord,index) in fundRecordDTOS" :key="fundRecord.fundId">
                      <el-card>
                        <h4>受益：{{fundRecord.fundRecordName}}</h4>
                        <p>费用：{{fundRecord.fund}}元</p>
                        <p>备注：{{fundRecord.content}}</p>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </el-row>
              </el-row>
            </el-col>

            <el-col class="pd-right-side" :span="5">
              <el-row>
                <i class="el-icon-date"></i>
                <span>项目推荐</span>
              </el-row>
              <el-row>
                <el-card class="box-card">
                  <div v-for="(recommend,index) in recommends" :key="index" class="text item"  @click="goProjectDetail(recommend.projectId)">
                   <div style="cursor: pointer;text-decoration: underline" onMouseOver="this.style.color='#409eff';"
                        onMouseOut="this.style.color='black'">
                   [{{index+1}}]:{{recommend.projectName }}
                   </div>
                    <!--<router-link :to="/projectDetail">11</router-link>-->
                  </div>
                </el-card>
              </el-row>
            </el-col>
          </el-row>

          <el-row class="bottom">
            <el-row>
              <el-col>
                <el-divider></el-divider>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
              <el-col :offset="11" :span="2">
                <span>诚征英才</span>
              </el-col>
              <el-col :span="2">
                <span>联系我们</span>
              </el-col>
            </el-row>
            <el-row></el-row>
          </el-row>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import head from '../../FrontView/header/header'
  import {mainService} from "./mainService";

  export default {
      name: "projectDetail",
      data(){
        return{
          infoShow:true,
          frShow:false,
          fbShow:false,
          projectDetail:{},
          projectImage:[],
          feedbacks:[],
          images:[],
          fundRecordDTOS:[],
          recommends:[],
        }
      },
      components:{
        pdhead:head,
      },
      mounted() {
       this.getData();
      },
      methods:{
        getData(){
          mainService.requestProjectDetail({projectId:this.$route.query.projectId}).then(res => {
            if(res.data != null){
              this.projectDetail = res.data.charityProject;
              this.feedbacks = res.data.feedbacks;
              this.fundRecordDTOS=res.data.fundRecordDTOS;
              mainService.recommendProjectsByCategoryId({categoryId:res.data.charityProject.categoryId}).then(re => {
                this.recommends=re.data;
              })
            }else{
              //是否需要验证
            }
          }).catch(err => {})
        },
        getImgUrl(icon) {
          if(icon==undefined){
            return
          }else{
            return require(`../../assets/images/${icon}` );
          }
        },
        showIntroduce(){
          this.infoShow = true;
          this.fbShow = false;
          this.frShow=false;
        },
        showFeedback(){
          this.infoShow = false;
          this.frShow=false;
          this.fbShow = true
        },
        showFundRecord(){
          this.infoShow = false;
          this.fbShow = false;
          this.frShow=true
        },
        goDonate(id){
          this.$router.push({path:'/donate',query:{projectId:id}})
        },
        goProjectDetail(id){
          this.$router.push({path:'/projectDetail',query:{projectId:id}})
          this.getData();
        }
      }
    }
</script>

<style scoped>
  .pd-main{
    padding: 0px;
  }
  .projectDetail{

  }
  .font{
    color: #666;
  }
  .projectName{
    font: 12px/1.5 tahoma,arial,\5b8b\4f53;
    font-size: 20px;
    color: #333;
    margin-bottom:8px;
  }
  .raisedFunds{
    font-family: Verdana;
    font-weight:bold;
    color: #f46000;
  }
  .participantNumber{
    color: #498e00;
    font-style: normal;
    font-weight: 500;
  }
  .budget{
    margin-bottom: 8px;
  }
  .projectInfo{
    margin-bottom: 50px;
  }
  .button{
    line-height: 60px;
    border-bottom: 1px solid #dcdfe6
  }
  .information{
    margin-top: 10px;
  }
  .projectImage{
    margin-bottom: 10px;
  }
  .el-image{
    width: 220px;
    height: 150px;
  }
  .projectIntroduce{
    margin-bottom: 20px;
  }
  .projectPlan{
    margin-bottom: 20px;
  }

  .fback{
    margin-top: 10px;
  }
</style>
