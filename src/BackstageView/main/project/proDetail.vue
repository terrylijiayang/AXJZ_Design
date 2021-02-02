<template>
  <div>
    <el-dialog
      title="审核情况"
      :visible.sync="dialogVisible"
      width="43%"
      :before-close="handleClose">
      <div>
        <el-table
          :data="processData"
          border
          style="width: 100%">
          <el-table-column
            prop="nickName"
            label="昵称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="realName"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色"
            width="100">
          </el-table-column>
          <el-table-column
            prop="state"
            label="审核"
            width="100"
          >
            <template slot-scope="check">
              <!--     <div v-if="check.row.userId==userId">
                     <el-button type="success" @click="PassTask(1)">通过</el-button>
                     <el-button type="danger" @click="PassTask(-1)">不通过</el-button>
                   </div>-->
              <div v-if="check.row.state==1" style="color: #67C23A">
                通过 <i class="el-icon-check"></i>
              </div>
              <div v-else-if="check.row.state==0" style="color: #E6A23C">
                待审核<i class="el-icon-loading"></i>
              </div>
              <div v-else style="color: #F56C6C">
                不通过 <i class="el-icon-close"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="审核时间">
          </el-table-column>

        </el-table>
        <div style="margin-top: 20px">
          <el-button style="width: 100%">当前审查结果:
            <span v-if="this.proState==1" style="color: #67C23A">
              审核通过
            </span>
            <span v-else-if="this.proState==2" style="color: #E6A23C">
              正在审核
            </span>
            <span v-else-if="this.proState==0" style="color: #409EFF">
              未审核
            </span>
            <span v-else style="color: #F56C6C">
              审核不通过
            </span>
          </el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--尾部-->
  </span>
    </el-dialog>
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>项目详情</span>
      </div>
      <el-row>
        <el-col>
          <div>
            <el-image :src="proImg" style="width: 20%;height: 200px;margin-left: 1%;border: 1px solid rgba(242, 242, 242, 0.498039215686275)">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <div class="content_pro">
              <div class="content_legend content_title" >项目信息</div>
              <div style="font-size: 14px">
                 <span class=""><span class="content_title">项目名称:</span>
                   <span >{{project.projectName}}</span></span>
              </div>
              <div style="width: 100%;height: 10px">
              </div>

              <div class="content_column">
                    <span class="content_title">项目类型:</span>
                    <span>{{project.categoryName}}</span>
              </div>
              <div class="content_column">
                    <span class="content_title">参与人数:</span>
                    <span >{{project.participantNumber}}人</span>
              </div>
              <div class="content_column">
                <span >
                  <span class="content_title">项目审核:</span>
                  <span v-if="project.state==1" style="color: #67C23A">审核通过</span>
                  <span v-else-if="project.state==2" style="color: #E6A23C">正在审核</span>
                  <span v-else-if="project.state==0" style="color: #409EFF">未审核</span>
                  <span v-else style="color: #F56C6C"> 审核不通过</span>
                  <span style="color: #409EFF;cursor: pointer" @click="showTask">查看</span>
                </span>
              </div>
              <div style="width: 100%;height: 10px">
              </div>
              <div class="content_column">
                <span ><span class="content_title">预计筹资:</span><span>{{project.budget}}元</span></span>
              </div>
              <div class="content_column">
                <span ><span class="content_title">开始时间:</span><span>{{project.startingTime}}</span></span>
              </div>
              <div class="content_column">
                <span ><span class="content_title">截止时间:</span><span>{{project.endingTime}}</span></span>
              </div>
              <div style="width: 100%;height: 10px">
              </div>
              <div class="content_column">
                <span ><span class="content_title">已筹金额:</span><span>{{project.raisedFunds}}元</span></span>
              </div>
              <div class="content_column">
                <span ><span class="content_title">申请人姓名:</span><span>{{project.realName}}</span></span>
              </div>
              <div class="content_column">
                <span ><span class="content_title">申请人网名:</span><span> {{project.nickName}}</span></span>
              </div>

              <div style="width: 100%;height: 10px">
              </div>
              <!--项目进度条-->
              <el-progress :percentage="perFinish" :format="proformat"></el-progress>
            </div>
          </div>

          <!--项目说明-->
          <div>
            <div class="tableTitle"><span class="midText">项目说明</span></div>
            <!--项目的介绍和计划-->
            <div style="width:96%;padding: 1% 1% 1% 1%;background: rgba(242, 242, 242, 0.498039215686275);margin-left: 1%;margin-top: 1%;">
              <div style="width: 100%;font-size: 14px;">
                <span ><span class="content_title">项目介绍:</span>&nbsp;&nbsp;&nbsp;<span>{{project.introduce}}</span></span>
              </div>
              <div style="width: 100%;height: 10px">
              </div>
              <div style="width: 100%;font-size: 14px;">
                <span ><span class="content_title">项目计划:</span>&nbsp;&nbsp;&nbsp;<span>{{project.projectPlan}}</span></span>
              </div>
            </div>
            <br>

            <el-row style="line-height: 60px;border-bottom: 1px solid #dcdfe6;margin-bottom: 20px;margin-left: 1%;margin-right: 1%">
              <el-col :span="3">
                <el-button type="success"  plain @click="mesShowBtn">项目交流</el-button>
              </el-col>
              <el-col :span="3">
                <el-button type="success" plain @click="fbShowBtn">善款去向</el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="success" plain @click="frShowBtn">用户反馈</el-button>
              </el-col>
            </el-row>

            <!--留言展示-->
            <div v-if="mesShow">
              <div style="border: 1px rgba(204, 204, 204, 1) solid;margin-left: 1%;margin-right: 1%; height: 304px;overflow: auto;">
                <div class="outer-container">
                  <div class="inner-container" v-loading="dynamicLoading">
                    <!--内容展示-->
                    <div  v-for="(message,index) in messages" v-bind:key="index">
                      <div style="background: white !important;line-height: 30px;margin-bottom: 2%;cursor: pointer;margin-left: 1.2%;margin-right: 1.2%;"  >
                        <div style="width: 100%;margin-bottom: 3px;">
                          <div style="margin-bottom: 1%;">
                    <span style="font-weight: 600;color: #313131;">
                      {{message.createdAt}}
                    </span>
                            <span style="float: right;">
                 <span>
                   {{message.num}}
                 </span>&nbsp;&nbsp;
                 <span style="color: rgb(0,153,255);cursor: pointer;" @click="reply(message.id,message.realName)">
                   查看回复
                 </span>
                              <!-- <span style="color: rgb(0,153,255);cursor: pointer;" @click="replyhide()" v-else>
                            收起
                          </span>-->
              </span>
                          </div>
                          <div style="margin-top: 1%;margin-bottom: 1%; width: 100%;"onMouseOver="this.style.backgroundColor='#ebeef5';"
                               onMouseOut="this.style.backgroundColor='white';;"  @mouseenter="onMouseOver(index)" @mouseleave="onMouseout">
                    <span>
                        <span>
                          {{message.realName}}（{{message.nickName}}）
                        </span>：
                        <span>
                       {{message.content}}
                        </span>
                      <!--v-if="currentOrganizationId==tcontent.organizationId&&delNum==index" @click="delContent(tcontent.processId)"-->
                        <span  style="color: red;cursor: pointer;float: right;" @click="delMessage(message.id)" v-if="message.userId==currentUserId">
                          <i class="el-icon-delete"></i></span>
                      </span>
                          </div>
                          <div style="background-color: rgba(242, 242, 242, 0.498039215686275);">
                            <div style="margin-top: 1%;margin-left: 1%;"  v-for="(reply) in  replys" v-if="currentShowMessage==message.id">
                              <div>
                                <div >{{reply.createdAt}}</div>
                                <div style="width: 97%;">
                                  <span>{{reply.realName}}（{{reply.nickName}}）</span>：
                                  <span>{{reply.content}}</span>
                                </div>
                              </div>
                            </div>
                            <!--设置虚线-->
                            <div style="width: 100%;
            height: 1px;
            background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
            background-size: 8px 1px;
            background-repeat: repeat-x;"></div>
                            <!--暂时没有留言-->
                            <div style="margin-top:1%;text-align: center;position:relative;line-height: 40px;" v-if="showReply&&message.num==0&&currentShowMessage==message.id">
                              <span style="font-size: 14px;color: #8a8282;">暂时没有留言</span>
                              <div style="margin-top: 10px;height: 1px;background-color: rgba(226, 226, 226, 1)">
                                &nbsp;
                              </div>
                            </div>
                            <!--分页-->
                            <div v-if="showReply&&currentShowMessage==message.id">
                              <span style="cursor: pointer;margin-left: 1%;" @click="replyhide()">
                      收回<i class="el-icon-arrow-up"></i>
                    </span>
                            </div>
                            <div style="margin-top: 1%;margin-left: 1%;"  v-if="showReply&&currentShowMessage==message.id">
                              <textarea  rows="2" :placeholder="holder" style="resize:none;width:90%;"  v-model="replyText"></textarea>
                              <el-button type="primary" v-on:click="replyBtn(message.id,message.realName)"
                                         style="position: relative;vertical-align: 15px;height: 35px;top: 2px;left: -6px;" :disabled="buttonReply">
                                确认回复</el-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--分页 可以不要-->
                    <!--   <div>
                       <span style="cursor: pointer" @click="getDynamicMore()" v-if="(this.totalCount-this.currentPage*this.pageSize)>0">
                         更多{{this.totalCount-this.currentPage*this.pageSize}}条消息<i class="el-icon-arrow-down"></i>
                       </span>
                         <span style="cursor: pointer;margin-left: 1%;" @click="delDynamicNum()" v-else-if="this.totalCount>10">
                         收回<i class="el-icon-arrow-up"></i>
                       </span>
                       </div>-->

                    <div v-if="totalCount==0" style="text-align: center;position:relative;line-height: 40px;margin-top: 8%;">
                      <img src="../../../assets/images/noCommunication.png"/>
                      <br>
                      <span style="font-size: 14px;color: #8a8282;">暂时没有留言</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style="margin-left:1%;margin-right: 1%;">
                <div style="font-weight: 600;font-size: 14px;margin-top: 1%">我要留言:</div>
                <div style="margin-top: 1%;">
                  <textarea  name="" id="" cols="110" rows="6" placeholder="请输入" maxlength="500" style="font-size: 14px;resize:none;overflow-y: scroll;" v-model="textareaAdd"></textarea>
                </div>
                <div style="margin-top: 0.5%">
                  <el-button type="primary" @click="submitText" :disabled="textareaBtn">提交</el-button>
                </div>
              </div>
            </div>
            <div v-if="fbShow">
              <div v-if="fundRecordDTOS.length==0">
                <div class="tableTitle"><span class="midText">暂无使用资金</span></div>
              </div>
              <el-timeline v-else>
                <el-timeline-item :timestamp='fundRecord.createdAt' placement="top" v-for="(fundRecord,index) in fundRecordDTOS" :key="fundRecord.fundId">
                  <el-card>
                    <h4>受益：{{fundRecord.fundRecordName}}</h4>
                    <p>费用：{{fundRecord.fund}}元</p>
                    <p>备注：{{fundRecord.content}}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
            <div v-if="frShow">
              <div v-if="feedbacks.length==0">
                <div class="tableTitle"><span class="midText">暂无用户反馈</span></div>
              </div>
              <el-timeline v-else>
                <el-timeline-item :timestamp='feedback.createdAt' placement="top" v-for="(feedback,index) in feedbacks" :key="feedback.feedbackId">
                  <el-card>
                    <h4>{{feedback.feedbackName}}</h4>
                    <p>{{feedback.content}}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>

<script>
  import {Msg} from "../../../tool/message";
  import path from '../../../../config/dev.env'
  import {ProjectService} from "./project";
    export default {
      data() {
        return {
          project:{},//该项目的信息
          messages:[],//留言信息
          replys:[],//留言的回复信息
          proImg:'',
          perFinish:0,//百分比
          textareaAdd: '',//文本框
          textareaBtn: false,
          dynamicLoading: false,//加载
          replySize: 10, // 回复默认展示10条
          totalCount: 0,//留言总数
          replyCount:0,//回复数量
          pageSize: 10,
          currentPage: 1, // 默认第一页
          isDynamicReplyContent: false,
          contentReplyIndex: -1, // 显示回复内容
          buttonReply:false,
          holder: '', // 动态更改placeholder
          progressReplyIndex: -1, // 显示第几条动态回复框
          replyText:'',//回复内容文本
          showReply:false,//默认收起回复框栏
          currentShowMessage:0,//当前展示的消息信息
          mesShow:true,
          fbShow:false,
          frShow:false,
          feedbacks:[],
          fundRecordDTOS:[],
          dialogVisible: false,
          processData:[],
          proState:0,
          currentUserId:this.$store.getters.userInfo.userId,
        }
      },
      computed: {},
      created() {
        this.getData();
        this.getMessage();
      },
      methods: {
        getData() {
          const projectId = this.$route.query.proId;
          ProjectService.requestProjectDetail(projectId).then(res => {
            this.project=res.data.charityProject;
            this.proState=this.project.state;
            this.perFinish=Math.round( this.project.raisedFunds / this.project.budget * 10000) / 100.00;
            this.proImg=require('../../../assets/images/' + this.project.projectImagePath);
            this.feedbacks = res.data.feedbacks;
            this.fundRecordDTOS=res.data.fundRecordDTOS;
          }).catch(err => {});
        },
        getMessage(){
          const projectId = this.$route.query.proId;
          ProjectService.getMessagesByProjectId(projectId).then(res => {
            this.messages=res.data;
            this.totalCount = res.data.length;
          }).catch(err => {});
        },
        showTask(){
          const projectId = this.$route.query.proId;
          ProjectService.getTaskProcess(projectId).then(res => {
            this.processData=res.data;
            this.dialogVisible=true;
          }).catch(err => {});
        },
        handleClose(done) {
         this.dialogVisible=false;
        },
        mesShowBtn(){
          this.mesShow=true;
          this.fbShow=false;
          this.frShow=false;
        },
        fbShowBtn(){
          this.mesShow=false;
          this.fbShow=true;
          this.frShow=false;
        },
        frShowBtn(){
          this.mesShow=false;
          this.fbShow=false;
          this.frShow=true;
        },
        //新增留言
        submitText(){
          const projectId = this.$route.query.proId;
          const userId= this.$store.getters.userInfo.userId;
          let getContentAdd = {
            projectId:projectId ,
            userId:userId,
            createdAt: new Date().getTime(),
            content: this.textareaAdd
          };
          ProjectService.addProMessage(getContentAdd).then(res =>{
            if(res.data){
              Msg.success("新增留言")
              this.textareaAdd='';
              this.getMessage();
            }else {
              Msg.success("留言出错..")
            }
          }).catch(err => {})
        },
        // 移入
        onMouseOver(index) {
          // this.delNum = index;
        },
        // 移除
        onMouseout() {
          // this.delNum = -1;
        },
        addReplyNum() {
          if (this.replySize >= 10) {
            this.replySize = this.replySize + 10;
          }
        },
        getDynamicMore(){

        },
        delDynamicNum(){

        },
        //项目完成进度
        proformat(percentage){
            return percentage >= 100 ? '筹资已完成100%' : `筹资已完成${percentage}%`;
        },
        //展示回复栏框
        reply(messageId,name){
          this.currentShowMessage=messageId;
          this.holder = '回复@' + name;
          ProjectService.showProMessageReply(messageId).then(res =>{
            this.replys=res.data;
            this.replyCount=res.data.length;
            this.showReply=true;
          }).catch(err => {})
        },
        //收起回复框栏
        replyhide(){
          this.replys=[];
          this.showReply=false;
        },
        //回复留言
        replyBtn(messageId,name){
          if (this.replyText === '') {
              Msg.error("未填写回复信息")
          } else {
            const projectId = this.$route.query.proId;
            const userId= this.$store.getters.userInfo.userId;
            let getMessageReply = {
              projectId:projectId ,
              messageId:messageId,
              replymanId:userId,
              createdAt: new Date().getTime(),
              content: this.replyText
            };
            ProjectService.addProMessageReply(getMessageReply).then(res =>{
              if(res.data){
                this.replyText='';
                Msg.success("回复成功")
                this.getMessage();
                this.reply(messageId,name);
              }else {
                Msg.success("回复出错..")
              }
            }).catch(err => {})
          }
        },
        //删除留言
        delMessage(messageId){
          this.$confirm('是否确认删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const loading = this.$loading({
              lock: true,
              text: "提交中请等待...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            ProjectService.delProject(messageId).then(res => {
              loading.close();
              if(res.data){
                this.getMessage();
                Msg.success('删除成功')
              }else{
                Msg.error('删除失败！')
              }
            })
          }).catch(() => {
            Msg.success('取消删除！')
          })
        },
        //核实项目
        checkProject(){
          this.$confirm('是否确认通过审核？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const projectId = this.$route.query.proId;
            ProjectService.checkProject(projectId).then(res => {
              if(res.data){
                this.getData();
                Msg.success("审核成功")
              }
            })
          })
        }
      }
    }
</script>

<style scoped>
  .content_title{
    font-weight: bold
  }
  .content_pro {
    display: inline-block;
    width: 74.5%;
    height: 150px;
    vertical-align: top;
    background: rgba(242, 242, 242, 0.498039215686275);
    position: relative;
    margin-left: 1%;
    margin-right: 0.5%;
    padding-top: 2%;
    padding-left: 1.5%;
    padding-bottom: 1%;
    border: 1px solid rgba(226, 226, 226, 1);
  }
  .content_legend {
    position: absolute;
    top: -6%;
    background: white;
    font-style: normal;
    font-size: 14px;
  }
  .content_column {
    width: 30%;
    display: inline-block;
    font-size: 14px;
  }
  .tableTitle {
    position: relative;
    margin: 0 auto;
    width: 600px;
    height: 1px;
    background-color: #d4d4d4;
    text-align: center;
    font-size: 16px;
    color: rgba(101, 101, 101, 1);
  }
  .midText {
    position: absolute;
    left: 50%;
    background-color: #ffffff;
    padding: 0 15px;
    transform: translateX(-50%) translateY(-50%);
  }
</style>
<style>
  .el-progress-bar{
    width: 90% !important;
  }
</style>
