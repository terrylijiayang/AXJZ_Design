
<template>
  <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>慈善信息管理</span>
      </div>

      <el-row>
        <!--数据表格-->
        <el-col>
          <!--<down-search :selectValues="selectValues" @returnedValue="searchByCondition" ></down-search>-->
          <!--新增任务按钮-->
          <div class="table-control">
            <el-table size="small" class="table-style" :data="projects" border highlight-current-row @current-change="handleCurrentChange">
              <el-table-column show-overflow-tooltip align="left" prop="projectName" label="权限点名称" min-width="100" fixed="left" resizable>
              </el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="startingTime" label="开始时间" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="endingTime" label="结束时间" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="state" label="状态" min-width="80"  resizable show-overflow-tooltip></el-table-column>

              <el-table-column label="操作" min-width="120" resizable>
                <template slot-scope="scope" style="text-align: center;">
                  <template>
                    <el-button @click="displayProject(projects[scope.$index].projectId)" type="text" size="small">查看</el-button>
                    <el-button @click="reviewPassed(projects[scope.$index].projectId,projects[scope.$index].projectName)"
                               type="text" size="small">审核通过</el-button>
                    <el-button @click="reviewNotPassed(projects[scope.$index].projectId,projects[scope.$index].userId,
                    projects[scope.$index].projectName)" type="text" size="small">审核未通过</el-button>
                  </template>
                </template>
              </el-table-column>
            </el-table>

            <!--分页功能-->
            <div class="block">
              <el-pagination
                class="page-style" @size-change="changeSize" @current-change="changePage"
                background
                :current-page="currentPage"
                :page-sizes="[10, 15, 20, 25]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>
<script>
  import {projectManagementService} from './projectManagementService';
  // import downSearch from '@/components/select/downSearch'
  import {adminLogService} from "../adminLog/adminLogService";

  export default {
    // components: {downSearch},
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        projects:[],
        reviewResult:{
          employeeId:'',
          projectId:'',
          operationResult:'',
          userId:'',
          reason:''
        },
        adminLog:{
          employeeId:'',
          operatorName:'',
          operationDetail:''
        }
      }
    },
    created: function () {
      this.adminLog.employeeId = this.$store.getters.userInfo.employeeId;
      this.adminLog.operatorName = this.$store.getters.userInfo.employeeName;
      this.findProjects();
    },
    methods: {
      refresh() {
        this.findProjects();
      },
      installParms() {
        var parms = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          columnName:this.condition.columnName,
          content:this.condition.content
        }
        return parms;
      },
      //通过employeeId获得审核中的项目--审核中是指还审核员还未审核
      findProjects() {
        let employeeId = this.$store.getters.userInfo.employeeId;
        projectManagementService.findUnderReviewProjects({employeeId:employeeId}).then((res) => {
          this.projects = res.data;
          this.totalCount = this.projects.length;
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      displayProject(projectId){

        this.$router.push({path: '/simple/projectManagement/display', query: {projectId:projectId}});
      },
      reviewPassed(projectId,projectName){
        this.reviewResult.employeeId = this.$store.getters.userInfo.employeeId;
        this.reviewResult.projectId = projectId;
        this.reviewResult.operationResult = '审核通过';
        projectManagementService.reviewPassed(this.reviewResult).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          });
          this.adminLog.operationDetail = "审核项目" + projectName +"通过";
          this.addAdminLog();
          this.refresh();
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '操作失败'
          });
        })
      },
      reviewNotPassed(projectId,userId,projectName){
        this.$prompt('请输入审核未通过原因','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.reviewResult.employeeId = this.$store.getters.userInfo.employeeId;
          this.reviewResult.projectId = projectId;
          this.reviewResult.userId =userId;
          this.reviewResult.reason = value;
          this.reviewResult.operationResult = '审核未通过';
          projectManagementService.reviewNotPassed(this.reviewResult).then(res => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.adminLog.operationDetail = "审核项目" + projectName +"未通过";
            this.addAdminLog();
            this.refresh();
          }).catch(err => {})
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '操作失败'
          });
        })

      },
      addAdminLog(){
        adminLogService.addAdminLog(this.adminLog).then((res) => {
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '保存日志出错'
          })
        });
      },
      changeSize(val) {
        this.pageSize = val;
        this.findPermissions();
      },
      changePage(val) {
        this.currentPage = val;
        this.findPermissions();
      },
      handleCurrentChange(currentRow,oldCurrentRow) {
        //this.currentRow = val;
      },
    }
  }
</script>
<style scoped>
  .form {
    float: left;
  }
  .search-select{
    float: left;
    margin-right: 2%;
  }
</style>
