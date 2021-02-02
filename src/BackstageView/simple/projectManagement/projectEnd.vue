
<template>
  <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>慈善信息管理</span>
      </div>

      <el-row>
        <!--数据表格-->
        <el-col>
          <el-input
            v-model="search"
            placeholder="输入项目名称搜索"/>

          <div class="table-control">
            <el-table size="small" class="table-style" :data="projects.filter(data => !search || data.projectName.includes(search))" border highlight-current-row @current-change="handleCurrentChange">
              <el-table-column show-overflow-tooltip align="left" prop="projectName" label="项目名称" min-width="100" fixed="left" resizable>
              </el-table-column>
              <el-table-column align="left" prop="startingTime" label="开始时间" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" prop="endingTime" label="结束时间" min-width="80"
                               resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" prop="auditorOne" label="审核员1" min-width="80"  resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" prop="auditorTwo" label="审核员2" min-width="80"  resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" prop="state" label="状态" min-width="80"  resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left"  label="操作"  min-width="80" resizable show-overflow-tooltip>
                <template slot-scope="scope" style="text-align: center;">
                  <template>
                    <el-button @click="displayProject(scope.row.projectId)" type="text" size="small">查看</el-button>
                    <el-button v-if="scope.row.recommend == false" @click="addAsRecommend(scope.row.projectId,scope.row.projectId.projectName)" type="text" size="small">添加为推荐</el-button>
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
  import {adminLogService} from "../adminLog/adminLogService";
  // import downSearch from '@/components/select/downSearch'

  export default {
    // components: {downSearch},
    data() {
      return {
        search:'',
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
      findProjects() {
        projectManagementService.findAllProjects().then((res) => {
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
        console.log(projectId)
        // this.$router.push({path: '/simple/projectManagement/display', query: {projectId:projectId}});
      },
      addAsRecommend(projectId,projectName){
        projectManagementService.addProjectAsRecommend({projectId:projectId}).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.adminLog.operationDetail = "将慈善项目" + projectName + "添加为推荐项目";
          this.addAdminLog();
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
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
  .el-input{
    width: 150px;
    margin-bottom: 10px;
  }
  .form {
    float: left;
  }
  .search-select{
    float: left;
    margin-right: 2%;
  }
</style>
