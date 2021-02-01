<template>
    <div class="donation">
      <dhead></dhead>
      <el-container>
        <el-main class="d-main">
          <el-row class="title">
            <el-col :offset="3" :span="21">
              <span style="font-size: 16px;color: #4b8e01">H公益平台 感谢您的爱心捐赠！</span><br>
              <span style="font-size: 12px;color: #999;">项目启动后，发起人会在H公益平台发布项目进展，多来平台上看看哦！</span>
            </el-col>
          </el-row>
          <el-form ref="donationForm" :model="donationForm" :rules="rules">
            <el-row class="donateDetail">
              <el-col :offset="4" :span="5" class="project">
                <div class="image">
                  <el-image style="width: 160px;height: 100px"
                            :src="project.imagePath">
                  </el-image>
                </div>
                <div style="margin-bottom: 8px">
                  <span class="projectName">{{project.projectName}}</span>
                </div>
                <div style="margin-bottom: 8px">
                  <span class="font">已募善款:</span>
                  <span class="raisedFunds">{{project.raisedFunds}}</span>
                  <span class="font">元</span>
                </div>
                <div style="margin-bottom: 8px">
                  <span class="font">参捐人数:</span>
                  <span class="participantNumber">{{project.participantNumber}}</span>
                  <span class="font">人参与捐助</span>
                </div>
                <div style="margin-bottom: 10px">
                  <span class="font">项目时间:</span>
                  <span class="projectTime font">{{project.startingTime}}</span>
                  <span class="font">至</span>
                  <span class="projectTime font">{{project.endingTime}}</span>
                </div>
              </el-col>
              <el-col :offset="1" :span="9">
                <el-card class="box-card">
                  <el-form-item label="捐款金额" prop="donationAmount">
                    <el-input type="donationAmount" v-model="donationForm.donationAmount"
                              clearable
                              resize="both"
                    ></el-input>
                    <span>元</span>
                  </el-form-item>
                  <!--<el-checkbox class="isAnonymous" v-model="isAnonymous">是否匿名</el-checkbox>-->
                  <el-form-item>
                    <el-button type="warning" class="donateButton" @click="donate()">确定捐赠</el-button>
                  </el-form-item>
                </el-card>
              </el-col>
            </el-row>
          </el-form>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import {mainService} from "./mainService";
  import {utils} from "../../tool/utils";
  import head from '../header/header'
  import {Msg} from "../../tool/message";

  export default {
      name: "donate",
      data(){
        return{
          //isAnonymous:false,
          project:{},
          donationForm:{
            userId:'',
            donorName:'',
            projectId:'',
            donationAmount:'',
          },
          rules:{
            donationAmount: [
              {required: true, message: '请输入捐款金额', trigger: 'blur'},
              {validator:utils.validateString(0, 1000, /^[0-9]\d*(\.\d+)?$/, "输入的数据不正确，请检查"), trigger: 'blur'},
            ],
          }
        }
      },
      components:{
        dhead:head,
      },
      mounted() {
        if(this.$store.getters.isLogin){
          mainService.requestDonate({projectId: this.$route.query.projectId}).then(res => {
            if(res.data != null){
              this.project = res.data;
            }else{
              Msg.warn('加载失败');
              this.$router.push({path:'/homepage'})
            }
          }).catch(err => {})
        }else {
          Msg.warn('请先登录');
          this.$router.push({path:'/login'})
        }
      },
      methods:{
        donate(){
          this.$refs['donationForm'].validate((valid) => {
            if(valid){
              this.donationForm.projectId = this.project.projectId;
              this.donationForm.donorName = this.$store.getters.userInfo.realName;
              this.donationForm.userId = this.$store.getters.userInfo.userId;
              console.log(this.donationForm)
              mainService.submitDonate(this.donationForm).then(res => {
                if(res.data){
                  Msg.success('捐赠成功')
                }else {
                  Msg.success('捐赠失败')
                }
              }).catch(err => {})
            }
          })
        }
      }
    }
</script>

<style scoped>
  .title{
    margin-bottom: 30px;
  }
  .image{
    margin-bottom: 10px;
  }
  .projectName{
    font-size: 16px;
    font-weight: bold;
  }
  .raisedFunds{
    font-size: 16px;
    font-weight: bold;
    color: darkorange;
  }
  .participantNumber{
    font-size: 14px;
    color: green;
  }
  .font{
    font-size: 14px;
    color: #4D4D4D;
  }
  .el-input{
    width: 300px;
  }
  .isAnonymous{
    margin-left: 80px;
    margin-bottom: 22px;
  }
  .donateButton{
    margin-left: 80px;
  }
</style>
