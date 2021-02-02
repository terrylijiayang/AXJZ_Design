<template>
  <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>操作员管理</span>
      </div>

      <el-row>
        <!--数据表格-->
        <el-col>
          <!--新增任务按钮-->
          <downSearch :selectValues="selectValues" @returnedValue="searchByCondition"></downSearch>
          <div style="float: right; margin-bottom: 15px">

            <el-button type="primary" @click="addOperator()" v-permission:simple_permission_Operator_Add>新增操作员
            </el-button>
          </div>
          <div class="table-control">
            <el-table v-loading="tableLoading" size="small" class="table-style" :data="operators" border
                      highlight-current-row @current-change="handleCurrentChange">
              <el-table-column type="expand" fixed="left">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="list-table-expand">
                    <el-form-item label="标识">
                      <span>{{ props.row.EId }}</span>
                    </el-form-item>
                    <el-form-item label="名称">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="编码">
                      <span>{{ props.row.code }}</span>
                    </el-form-item>
                    <el-form-item label="密码">
                      <span>{{ props.row.passWord }}</span>
                    </el-form-item>
                    <el-form-item label="状态">
                      <span>{{ props.row.status }}</span>
                    </el-form-item>
                    <el-form-item label="类型">
                      <span>{{ props.row.type }}</span>
                    </el-form-item>
                    <el-form-item label="人员ID">
                      <span>{{ props.row.personId }}</span>
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

              <el-table-column align="left" prop="name" label="操作员名称" min-width="100" fixed="left" sortable resizable
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <p v-on:click="displayOperator(operators[scope.$index].eid)"
                     style="text-decoration: underline">
                    {{ operators[scope.$index].name }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="code" label="编码" min-width="80" sortable resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="status" label="状态" min-width="80" sortable
                               resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="type" label="类型" min-width="80" sortable resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="remark" label="备注" min-width="80" sortable
                               resizable show-overflow-tooltip></el-table-column>

              <el-table-column label="操作" min-width="120" resizable>
                <template slot-scope="scope">
                  <template>
                    <el-button @click="distributeRole(operators[scope.$index].eid)" type="text" size="small">分配角色
                    </el-button>
                  </template>
                  <template>
                    <el-button @click="editOrganation(operators[scope.$index].eid)" type="text" size="small"
                               v-permission:simple_permission_Operator_Edit>编辑
                    </el-button>
                  </template>
                  <template>
                    <el-button @click="deleteOperator(operators[scope.$index].eid)" type="text" size="small"
                               v-permission:simple_permission_Operator_Delete><p
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
      title="角色分配"
      :visible.sync="dialogVisible"
    >
      <el-transfer
        :titles="['所有角色', '当前角色']"
        v-model="roleData"
        :data="roleDataTable">
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
  import {OperatorService} from './OperatorService';
  import {RoleService} from './RoleService';
  import {OperatorAndRoleService} from './OperatorAndRoleService';
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
        operators: [],
        tableLoading: false,
        roleData: [],
        roleDataTable: [],
        dialogVisible: false,
        currentEditId: '',
        selectValues: [
          {key: "name", value: "操作员名称"},
          {key: "code", value: "编码"},
          {key: "passWord", value: "密码"},
          {key: "status", value: "状态"},
          {key: "type", value: "类型"},
          {key: "remark", value: "备注"},

        ],
        condition: ''
      }
    },
    created: function () {
      this.init()
    },
    methods: {
      searchByCondition(value) {
        this.currentPage = 1;
        this.condition = value;
        this.init()
      },
      init() {
        this.findOperators();
      },
      distributeRole(operatorId) {
        this.$router.push({path: '/simple/permission/Operator/operatorAssignment/' + operatorId});
      },
      refresh() {
        this.findOperators();
      },
      installParms() {
        var parms = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          columnName: this.condition.columnName,
          content: this.condition.content
        }
        return parms;
      },
      //查询所有角色
      findAllRoles() {
        let _this = this
        RoleService.findAllRoles().then((res) => {
          _this.initRolesDataTable(res.data)
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      //根据操作员Id查询对应的角色
      findOperatorAndRoleByOperatorId() {
        let _this = this
        OperatorAndRoleService.findOperatorAndRoleByOperatorId(this.currentEditId).then((res) => {
          _this.initRoleData(res.data)
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      //初始化角色选择框数据
      initRolesDataTable(data) {
        this.roleDataTable = []
        let _this = this
        data.forEach(function (item, index) {
          _this.roleDataTable.push({
            key: item.eid,
            label: item.name,
            disabled: false
          })
        })
      },
      //初始化已选择的角色选择框数据
      initRoleData(data) {
        this.roleData = []
        let _this = this
        data.forEach(function (item, index) {
          _this.roleData.push(item.roleId)
        })
      },
      //更新操作员权限
      updateRoleAndPermission() {
        let parms = {
          operatorId: this.currentEditId,
          roleId: this.roleData,
        }
        OperatorAndRoleService.updateOperatorAndRole(parms).then((res) => {
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
        this.buttonRequestProgressStart("正在搜索,请稍后...");
        OperatorService.findOperators(parms).then((res) => {
          this.buttonRequestProgressClose();
          this.operators = res.data.datas;
          this.totalCount = res.data.totalCount;
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      displayOperator(operatorId) {
        var router = this.$router;
        router.push({path: '/simple/permission/operator/display/' + operatorId, query: {}});
      },
      deleteOperator(operatorId) {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.buttonRequestProgressStart("正在删除,请稍后...");
          OperatorService.deleteOperator(operatorId).then((res) => {
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
        this.findOperators();
      },
      changePage(val) {
        this.currentPage = val;
        this.findOperators();
      },
      addOperator() {
        //新增操作员
        var router = this.$router;
        router.push({path: '/simple/permission/operator/add', query: {}});
      },
      editOrganation(operatorId) {
        //编辑操作员
        var router = this.$router;
        router.push({path: '/simple/permission/operator/edit/' + operatorId, query: {}});
      },
      handleCurrentChange(currentRow, oldCurrentRow) {
        //this.currentRow = val;
      },
    }
  }
</script>
<style scoped lang="scss">
</style>
