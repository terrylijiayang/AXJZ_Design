<template>
  <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>角色管理</span>
      </div>

      <el-row>
        <!--数据表格-->
        <el-col>
          <!--新增任务按钮-->
          <downSearch :selectValues="selectValues" @returnedValue="searchByCondition" ></downSearch>
          <div style="float: right; margin-bottom: 15px">
            <el-button type="primary" @click="addRole()" v-permission:simple_permission_Role_Add>新增角色</el-button>
          </div>
          <div class="table-control">
            <el-table v-loading="tableLoading" size="small" class="table-style" :data="roles" border
                      highlight-current-row @current-change="handleCurrentChange">
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

              <el-table-column show-overflow-tooltip align="left" prop="name" label="角色名称" min-width="100" fixed="left"
                               sortable resizable show-overflow-tooltip>
                <template slot-scope="scope">
                  <p v-on:click="displayRole(roles[scope.$index].eid)"
                     style="text-decoration: underline">
                    {{ roles[scope.$index].name }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="code" label="编码" min-width="80" sortable resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="remark" label="备注" min-width="80" sortable
                               resizable show-overflow-tooltip></el-table-column>

              <el-table-column label="操作" min-width="120" resizable>
                <template slot-scope="scope">
                  <template>
                    <el-button @click="distributePermission(roles[scope.$index].eid)" type="text" size="small">分配权限
                    </el-button>
                  </template>
                  <template>
                    <el-button @click="editOrganation(roles[scope.$index].eid)" type="text" size="small"
                               v-permission:simple_permission_Role_Edit>编辑
                    </el-button>
                  </template>
                  <template>
                    <el-button @click="deleteRole(roles[scope.$index].eid)" type="text" size="small"
                               v-permission:simple_permission_Role_Delete><p
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

    <el-dialog
      title="权限分配"
      :visible.sync="dialogVisible"
    >
      <el-transfer
        filterable
        filter-placeholder="请输入权限名称"
        :titles="['所有权限', '当前权限']"
        v-model="permissionData"
        :data="permissionDataTable">
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRoleAndPermission">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>
<script>
  import {mapState} from 'vuex';
  import {RoleService} from './RoleService';
  import {PermissionService} from './PermissionService';
  import {RoleAndPermissionService} from './RoleAndPermissionService';
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
        roles: [],
        tableLoading: false,
        permissionData: [],
        permissionDataTable: [],
        dialogVisible: false,
        currentEditId: '',
        selectValues:[
          {key:"name",value:"角色名称"},
          {key:"code",value:"编码"},
          {key:"remark",value:"备注"},

        ],
        condition:''
      }
    },
    created: function () {
      this.init()
    },
    methods: {
      searchByCondition(value){        this.currentPage=1;
        this.condition=value;
        this.init()
      },
      init() {
        this.findRoles();
      },
      distributePermission(roleId) {
        this.$router.push({path: '/simple/permission/role/permissionAssignment/' + roleId});
      },
      //查询所有权限
      findAllPermissions() {
        let _this = this
        PermissionService.findAllPermissions().then((res) => {
          _this.initPermissionsDataTable(res.data)
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      //根据角色Id查询对应的权限
      findRoleAndPermissionByRoleId() {
        let _this = this
        RoleAndPermissionService.findRoleAndPermissionByRoleId(this.currentEditId).then((res) => {
          _this.initPermissionData(res.data)
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      //初始化权限选择框数据
      initPermissionsDataTable(data) {
        this.permissionDataTable = []
        let _this = this
        data.forEach(function (item, index) {
          _this.permissionDataTable.push({
            key: item.code,
            label: item.name,
            disabled: false
          })
        })
      },
      //初始化已选择的权限选择框数据
      initPermissionData(data) {
        this.permissionData = []
        let _this = this
        data.forEach(function (item, index) {
          _this.permissionData.push(item.permissionCode)
        })
      },
      //更新操作员权限
      updateRoleAndPermission() {
        let parms = {
          roleId: this.currentEditId,
          permissionsCode: this.permissionData,
        }
        RoleAndPermissionService.updateRoleAndPermission(parms).then((res) => {
          this.$message({
            type: 'success',
            message: '分配成功！'
          })
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      findOperators() {
        var parms = this.installParms();
        OperatorService.findOperators(parms).then((res) => {
          this.operators = res.data.datas;
          this.totalCount = res.data.totalCount;
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      refresh() {
        this.findRoles();
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
      findRoles() {
        var parms = this.installParms();
        this.buttonRequestProgressStart("正在搜索,请稍后...");
        RoleService.findRoles(parms).then((res) => {
          this.buttonRequestProgressClose();
          this.roles = res.data.datas;
          this.totalCount = res.data.totalCount;
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      displayRole(roleId) {
        var router = this.$router;
        router.push({path: '/simple/permission/role/display/' + roleId, query: {}});
      },
      deleteRole(roleId) {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.buttonRequestProgressStart("正在删除,请稍后...");
          RoleService.deleteRole(roleId).then((res) => {
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
        this.findRoles();
      },
      changePage(val) {
        this.currentPage = val;
        this.findRoles();
      },
      addRole() {
        //新增角色
        var router = this.$router;
        router.push({path: '/simple/permission/role/add', query: {}});
      },
      editOrganation(roleId) {
        //编辑角色
        var router = this.$router;
        router.push({path: '/simple/permission/role/edit/' + roleId, query: {}});
      },
      handleCurrentChange(currentRow, oldCurrentRow) {
        //this.currentRow = val;
      },
    }
  }
</script>
<style scoped lang="scss">

</style>
