<template>
  <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
    <el-dialog
      title="审核情况"
      :visible.sync="dialogVisible"
      width="43%"
      :before-close="handleClose">
      <div>
        <el-table
          :data="process"
          :row-class-name="tableRowClassName"
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
            <span v-if="this.state==1" style="color: #67C23A">
              审核通过
            </span>
            <span v-else-if="this.state==2" style="color: #E6A23C">
              正在审核
            </span>
            <span v-else-if="this.state==0" style="color: #409EFF">
              未审核
            </span>
            <span v-else style="color: #F56C6C">
              审核不通过
            </span>
          </el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <span v-if="this.userState==1">重新审核:</span>
        <span v-else>确定审核:</span>
    <el-button type="success" @click="PassTask(1)">通过</el-button>
    <el-button type="danger" @click="PassTask(-1)">不通过</el-button>
  </span>
    </el-dialog>
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>我的任务</span>
      </div>
      <el-row>
        <el-col>
            <el-table
              :data="projects"
              style="width: 100%">
              <el-table-column
                prop="projectName"
                align="center"
                label="项目名称"
                width="200">
              </el-table-column>
              <el-table-column  prop="state"  align="center" label="审核情况" width="120">
                <template slot-scope="check">
                  <div v-if="check.row.state==1" style="color: #67C23A">
                    审核通过
                  </div>
                  <div v-else-if="check.row.state==2" style="color: #E6A23C">
                    正在审核
                  </div>
                  <div v-else-if="check.row.state==0" style="color: #409EFF">
                    未审核
                  </div>
                  <div v-else style="color: #F56C6C">
                    审核不通过
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="budget"
                align="center"
                label="目标金额(元)"
                width="150">
              </el-table-column>
              <el-table-column
                prop="raisedFunds"
                align="center"
                label="已筹资金额（元）"
                width="150">
              </el-table-column>
              <el-table-column
                prop="startingTime"
                align="center"
                label="发起时间"
                width="190">
              </el-table-column>
              <el-table-column
                prop="endingTime"
                align="center"
                label="截止时间"
                width="190">
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                   <span
                     class="el-tag el-tag--warning el-tag--mini"
                     style="cursor: pointer;"
                     @click="issuedTask(scope.row)"
                   >确定审核</span>
                  <span
                    class="el-tag el-tag--info el-tag--mini"
                    style="cursor: pointer;"
                    @click="changeDataConfig(scope.row)"
                  >查看详情</span>
                </template>
              </el-table-column>
            </el-table>
        </el-col>
        <el-col>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import {TaskService} from './task'
  import {Msg} from "../../../tool/message";
    export default {
      name: "index",
      data() {
        return {
          projects:[],
          dialogVisible: false,
          checkProId:0,
          process:[],
          userId:this.$store.getters.userInfo.userId,
          state:0,
          userState:0,
          currentPage:1,//当前页
          pageSize:10,//页数
          totalCount:0,//总数
        }
      },
      mounted(){
        this.getData();
      },
      methods: {
        getData(){
          let page={
            page:this.currentPage-1,
            pageSize:this.pageSize,
            userId:this.$store.getters.userInfo.userId
          };
          TaskService.getTaskByUserId(page).then(res => {
            this.projects=res.data.charityProjects;
            this.totalCount=res.data.total;
          }).catch(err => {});
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        handleSizeChange(pageSize) {
          this.pageSize=pageSize;
          this.getData();
        },
        handleCurrentChange(currentPage){
          this.currentPage=currentPage;
          this.getData();
        },
        tableRowClassName({row, rowIndex}) {
          if(row.userId === this.userId){
            if(row.state !=0){
              this.userState=1;
            }else{
              this.userState=0;
            }
          }
          if (row.userId === this.userId) {
            return 'warning-row';
          }
          return '';
        },
        changeDataConfig(row) {
          this.$router.push({path: '/backDetail', query: {proId: row.projectId}});
        },
        issuedTask(row){
          this.checkProId=row.projectId;
          this.state=row.state;
          TaskService.getTaskProcess(this.checkProId).then(res => {
            this.process=res.data;
            this.dialogVisible=true;
          }).catch(err => {});
        },
        PassTask(state){
          const userId= this.$store.getters.userInfo.userId;
          const data={
            projectId:this.checkProId,
            userId:userId,
            state:state,
            createdAt:new Date().getTime()
          };
          TaskService.updateProTask(data).then(res => {
            this.dialogVisible = false
            Msg.success("项目审核完成")
            this.getData();
          }).catch(err => {});
        },
      },

    }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }
</style>
