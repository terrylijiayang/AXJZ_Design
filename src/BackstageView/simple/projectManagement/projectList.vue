
<template>
  <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>权限点管理</span>
      </div>

      <el-row>
        <!--数据表格-->
        <el-col>
          <!--<down-search :selectValues="selectValues" @returnedValue="searchByCondition" ></down-search>-->
          <!--新增任务按钮-->
          <div class="table-control">
            <el-table v-loading="tableLoading" size="small" class="table-style" :data="permissions" border highlight-current-row @current-change="handleCurrentChange">
              <el-table-column show-overflow-tooltip align="left" prop="permissionName" label="权限点名称" min-width="100" fixed="left" sortable resizable show-overflow-tooltip>
                <template slot-scope="scope">
                  <p v-on:click="displayPermission(permissions[scope.$index].permissionId)"
                     style="text-decoration: underline">
                    {{ permissions[scope.$index].permissionName }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="permissionId" label="编码" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="moduleCode" label="模块编码" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="permissionRemark" label="备注" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" min-width="120" resizable>
                <template slot-scope="scope" style="text-align: center;">
                  <template>
                    <el-button @click="editPermission(permissions[scope.$index].permissionId)" type="text" size="small">编辑</el-button>
                  </template>
                  <template>
                    <el-button @click="deletePermission(permissions[scope.$index].permissionId,permissions[scope.$index].permissionName)" type="text" size="small" >
                      <p style="color: red !important;">删除</p></el-button>
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
  import {mapState} from 'vuex';
  import {permissionService} from './permissionService';
  // import downSearch from '@/components/select/downSearch'

  export default {
    // components: {downSearch},
    data() {
      return {
        rules: {},
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        permissions:[],
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
      this.findPermissions();
    },
    methods: {
      refresh() {
        this.findPermissions();
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
      findPermissions() {
        permissionService.findAllPermissions().then((res) => {
          this.permissions = res.data;
          this.totalCount = this.permissions.length;
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      displayPermission(permissionId){
        this.$router.push({path: '/simple/permission/permission/display', query: {permissionId:permissionId}});
      },
      deletePermission(permissionId,permissionName) {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          permissionService.deletePermission(permissionId).then((res) =>{
            this.$message({
              type: 'success',
              message: '删除成功！'
            });
            this.adminLog.operationDetail = "删除权限点" + permissionName;
            this.addAdminLog();
            this.refresh();
          }).catch((error) => {

            this.$message({
              type: 'error',
              message: '删除失败，请稍后再试！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
      editPermission(permissionId){
        //编辑权限点
        var router = this.$router;
        router.push({path: '/simple/permission/Permission/edit', query: {permissionId:permissionId}});
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
