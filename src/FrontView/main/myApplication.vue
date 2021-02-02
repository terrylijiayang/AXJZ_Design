<template>
    <div class="myApplication">
      <!--弹出框 使用资金-->
      <el-dialog title="使用资金" :visible.sync="moneyFormVisible">
          <div style="font-size: 14px;font-weight: bold;margin-bottom: 1%;margin-left: 7%;">
            <span>筹资目标金额:</span>
           {{this.budgetMoney}}元
          </div>
        <div style="font-size: 14px;font-weight: bold;margin-bottom: 1%;margin-left: 7%;">
          <span>捐款筹资金额:</span>
          {{this.raisedFunds}}元
        </div>
        <div style="font-size: 14px;font-weight: bold;margin-bottom: 1%;margin-left: 7%;">
          <span>可用提取金额:</span>
          {{this.usedFunds}}元
        </div>
        <el-form :model="form">
          <el-form-item label="输入金额" :label-width="formLabelWidth">
            <el-input v-model="form.fund" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注用途" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.content"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="moneyFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="useMoney">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加反馈" :visible.sync="backFormVisible">
        <el-form>
          <el-form-item label="请留言" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="feedBackData.content"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="backFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBack()">确 定</el-button>
        </div>
      </el-dialog>

      <el-container>
        <el-main class="ma-main">
          <el-row>
            <el-col :offset="3" :span="13">
              <el-row class="projectInfo" v-for="(project,index) in projects" :key="index">
                <el-row>
                  <el-col :span="6">
                    <img style="width: 160px;height: 100px" :src=getImgUrl(project.projectImagePath) />
                  </el-col>
                  <el-col :span="13">
                    <div class="projectName">
                      <span class="category title">[{{project.categoryName}}]</span>
                      {{project.projectDetail}}
                      <router-link onMouseOver="this.style.color='#409eff';"
                                   onMouseOut="this.style.color='black'"
                        :to="{path: '/projectDetail', query: {projectId: project.projectId } }"
                                    style="color: black;font-weight: bold;font-size: 14px;text-decoration: none;">
                        {{project.projectName}}
                      </router-link>
                      <span class="category title" v-if="project.state==1">审核通过</span>
                      <span v-else style="color: orange;font-size: 14px;">未审核</span>
                    </div>
                    <div style="margin-bottom: 8px">
                      <span class="font">参捐人数:</span>
                      <span class="participantNumber font">{{project.participantNumber}}</span>
                      <span class="font">人参与捐助</span>
                      <span class="font">已募捐:</span>
                      <span class="money font">{{project.raisedFunds}}</span>
                      <span class="font">元</span>
                    </div>
                    <div style="margin-bottom: 10px">
                      <span class="font">项目时间:</span>
                      <span class="projectTime font">{{project.startingTime}}</span>
                      <span class="font">至</span>
                      <span class="projectTime font">{{project.endingTime}}</span>
                    </div>
                    <!--<el-button type="warning" size="small" @click="goDonate()">修改申请</el-button>-->
                    <el-button type="warning" size="small" @click="useDonate(project)">资金提现</el-button>
                    <el-button type="warning" size="small" @click="openBack(project)">添加反馈</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-divider>
                  </el-divider>
                </el-row>
              </el-row>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
              </el-pagination>
            </el-col>
            <el-col class="">

            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import {mainService} from "./mainService";
  import {Msg} from "../../tool/message";
    export default {
      name: "myApplication",
      data(){
          return {
            currentPage:1,//当前页
            pageSize:10,//页数
            totalCount:0,//总数
            projects:[],
            moneyFormVisible: false,//使用资金窗口
            backFormVisible:false,//添加反馈窗口
            form: {
              userId:0,//初始化
              projectId:0,
              fund: '',
              content: '',
              createdAt:new Date().getTime(),
            },
            budgetMoney:0,//目标金额
            raisedFunds:0,//已筹金额
            usedFunds:0,//剩余金额
            formLabelWidth: '120px',
            feedBackData:{
              projectId:0,
              userId:0,
              createdAt:new Date().getTime(),
              content:'',
            },
          }
      },
      components:{
      },
      mounted() {
        this.getData();
      },
      methods:{
        getImgUrl(icon) {
          return require('../../assets/images/' + icon );
        },
        //获取该用户申请的项目
        getData(){
          let data={
            userId:this.$store.getters.userInfo.userId,
            page:this.currentPage-1,
            pageSize:this.pageSize
          };
          mainService.userHelpProjects(data).then(res => {
            if(res.data == null){
              Msg.warn("加载失败")
            }
            this.projects=res.data.projectsDTOList;
            this.totalCount=res.data.total;
          }).catch(err => {});
        },
        useDonate(project){
          if (project.state==1){
            this.budgetMoney=project.budget;
            this.raisedFunds=project.raisedFunds;
            this.usedFunds=project.usedFunds;
            this.form.projectId=project.projectId;
            this.form.userId=project.userId;
            this.moneyFormVisible = true;
          }else{
            this.$alert('项目待审核后才能发放', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                Msg.success("等待审核")
              }
            });
          }
        },
        useMoney(){
          this.moneyFormVisible = false
          this.form.createdAt = new Date().getTime();
          mainService.useFund(this.form).then(res => {
              if(res.data){
                Msg.success("已下发资金")
                this.getData();
              }
          })
        },
        openBack(project){
          this.feedBackData.projectId = project.projectId;
          this.feedBackData.userId = project.userId;
          this.backFormVisible=true;

        },
        addBack(){
          this.feedBackData.createdAt = new Date().getTime();
          this.backFormVisible = false;
          mainService.addFeedBack(this.feedBackData).then(res => {
            console.log(res)
            if(res.data){
              Msg.success('反馈成功');
              this.feedBackData.content='';
            }else{
              Msg.error('发生错误')
            }
          }).catch(err => {});
        },
        handleSizeChange(pageSize) {
          this.pageSize=pageSize;
          this.getData();
        },
        handleCurrentChange(currentPage){
          this.currentPage=currentPage;
          this.getData();
        },
      },
    }
</script>

<style scoped>
  .projectName{
    margin-bottom: 8px;
  }
  .participantNumber{
    color: green;
  }
  .category{
    color: green;
  }
  .title{
    font-size: 14px;
    font-weight: bold;
  }
  .times{
    color: darkorange;
  }
  .money{
    color: darkorange;
  }
  .font{
    font-size: 12px;
  }
</style>
