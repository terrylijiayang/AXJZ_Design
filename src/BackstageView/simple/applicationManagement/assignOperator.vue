
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
                    <el-button @click="distributeOperator(projects[scope.$index].projectId)" type="text" size="small">分配审核员</el-button>
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

  export default {
    // components: {downSearch},
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        projects:[],
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
      //获得待审核项目--待审核是指还未分配审核员
      findProjects() {
        projectManagementService.findPendingReviewProjects().then((res) => {
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
      distributeOperator(projectId){
        this.$router.push({path: '/simple/projectManagement/selectOperator',
          query: {projectId:projectId,permissionId:this.$route.query.permissionId}});
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
