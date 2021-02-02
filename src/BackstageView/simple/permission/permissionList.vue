
<template>
  <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>权限点管理</span>
      </div>

      <el-row>
        <!--数据表格-->
        <el-col>
          <down-search :selectValues="selectValues" @returnedValue="searchByCondition" ></down-search>
          <!--新增任务按钮-->
          <div style="float: right; margin-bottom: 15px">
            <el-button  type="primary" @click="addPermission()"  v-permission:simple_permission_Permission_Add >新增权限点</el-button>
          </div>
          <div class="table-control">
            <el-table v-loading="tableLoading" size="small" class="table-style" :data="permissions" border highlight-current-row @current-change="handleCurrentChange">
              <el-table-column type="expand" fixed="left">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="list-table-expand">
                    <el-form-item label="标识">
                      <span>{{ props.row.EId }}</span>
                    </el-form-item>
                    <el-form-item label="编码">
                      <span>{{ props.row.code }}</span>
                    </el-form-item>
                    <el-form-item label="名称">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="全名">
                      <span>{{ props.row.fullName }}</span>
                    </el-form-item>
                    <el-form-item label="模块编码">
                      <span>{{ props.row.moduleCode }}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                      <span>{{ props.row.remark }}</span>
                    </el-form-item>
                    <el-form-item label="创建人">
                      <span>{{ props.row.createId }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                      <span>{{ props.row.createDatetime }}</span>
                    </el-form-item>
                    <el-form-item label="修改人">
                      <span>{{ props.row.updateId }}</span>
                    </el-form-item>
                    <el-form-item label="修改时间">
                      <span>{{ props.row.updateDatetime }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>

              <el-table-column show-overflow-tooltip align="left" prop="name" label="权限点名称" min-width="100" fixed="left" sortable resizable show-overflow-tooltip>
                <template slot-scope="scope">
                  <p v-on:click="displayPermission(permissions[scope.$index].eid)"
                     style="text-decoration: underline">
                    {{ permissions[scope.$index].name }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="code" label="编码" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="fullName" label="全名" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="moduleCode" label="模块编码" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="remark" label="备注" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>

              <el-table-column label="操作" min-width="120" resizable>
                <template slot-scope="scope" style="text-align: center;">
                  <template>
                    <el-button @click="editOrganation(permissions[scope.$index].code)" type="text" size="small" v-permission:simple_permission_Permission_Edit >编辑</el-button>
                  </template>
                  <template>
                    <el-button @click="deletePermission(permissions[scope.$index].code)" type="text" size="small" v-permission:simple_permission_Permission_Delete ><p
                      style="color: red !important;">删除</p></el-button>
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
  import {PermissionService} from './PermissionService';
  import downSearch from '@/components/select/downSearch'

  export default {
    components: {downSearch},
    data() {
      return {
        rules: {},
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        hightlight: true,
        permissions: [],
        tableLoading: false,
        options: [{
          value: '权限点名称',
          label: '权限点名称'
        }],
        value: '',
        search: '',
        selectValues:[
          {key:"name",value:"权限点名称"},
          {key:"code",value:"编码"},
          {key:"fullName",value:"全名"},
          {key:"moduleCode",value:"模块编码"},
          {key:"remark",value:"备注"},

        ],
        condition:''
      }
    },
    created: function () {
      this.findPermissions();
    },
    methods: {
      searchByCondition(value){
        this.currentPage=1;
        this.condition=value;
        this.findPermissions();
      },
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
        var parms = this.installParms();
        this.buttonRequestProgressStart("正在搜索,请稍后...");
        PermissionService.findPermissions(parms).then((res) => {
          this.buttonRequestProgressClose();
          this.permissions = res.data.datas;
          console.log(this.permissions)
          this.totalCount = res.data.totalCount;
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      displayPermission(code){
        var router = this.$router;
        router.push({path: '/simple/permission/permission/display/'+code, query: {}});
      },
      deletePermission(code) {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.buttonRequestProgressStart("正在删除,请稍后...");
          PermissionService.deletePermission(code).then((res) =>{
            this.buttonRequestProgressClose();
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.refresh();
          }).catch((error) => {
            this.buttonRequestProgressClose();
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
      changeSize(val) {
        this.pageSize = val;
        this.findPermissions();
      },
      changePage(val) {
        this.currentPage = val;
        this.findPermissions();
      },
      addPermission(){
        //新增权限点
        var router = this.$router;
        router.push({path: '/simple/permission/permission/add', query: {}});
      },
      editOrganation(permissionCode){
        //编辑权限点
        var router = this.$router;
        router.push({path: '/simple/permission/permission/edit/'+permissionCode, query: {}});
      },
      handleCurrentChange(currentRow,oldCurrentRow) {
        //this.currentRow = val;
      },
    }
  }
</script>
<style scoped lang="scss">
  .form {
    float: left;
  }
  .search-select{
    float: left;
    margin-right: 2%;
  }
</style>
