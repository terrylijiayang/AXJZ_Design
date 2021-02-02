<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <el-row>
        <el-col :span="5">
          <el-tree
            :data="menus"
            :props="defaultProps"
            :accordion="true"
            @node-click="handleNodeClick">
          </el-tree>
        </el-col>
        <el-col :span="18" :offset="1">
          <div style="float: left">
            <el-transfer
              filterable
              filter-placeholder="请输入权限名称"
              :titles="['待分配权限', '已分配权限']"
              v-model="permissionData"
              @change="handleChange"
              :data="permissionDataTable">
            </el-transfer>
          </div>
          <div style="float: left;margin-left: 10px">
            <el-button class="permission-button" type="primary" @click="updateRoleAndPermission">确 定</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {PermissionService} from './PermissionService';
  import {RoleAndPermissionService} from './RoleAndPermissionService';

  export default {
    data() {
      return {
        permissionData: [],
        permissionDataTable: [],
        allPermissions: [],
        currentPermissions: [],
        removePermissions: [],
        addPermissions: [],
        currentEditId: '',
        defaultProps: {
          children: 'nodes',
          label: 'text'
        },
      };
    },
    computed: mapState({
      menus: state => state.permission.menus,
      user: state => state.user,
    }),
    mounted() {
      this.currentEditId = this.$route.params.roleId;
      this.init()
    },
    methods: {
      init() {
        this.findAllPermissions();
        this.findRoleAndPermissionByRoleId();
      },
      //查询所有权限
      findAllPermissions() {
        PermissionService.findAllPermissions().then((res) => {
          this.initPermissionsDataTable(res.data)
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      //根据角色Id查询对应的权限
      findRoleAndPermissionByRoleId() {
        RoleAndPermissionService.findRoleAndPermissionByRoleId(this.currentEditId).then((res) => {
          this.initPermissionData(res.data)
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      //初始化权限选择框数据
      initPermissionsDataTable(data) {
        this.allPermissions = []
        let _this = this
        data.forEach(function (item, index) {
          _this.allPermissions.push({
            key: item.code,
            label: item.name,
            disabled: false
          })
        })
        this.permissionDataTable = this.allPermissions
      },
      //初始化已选择的权限选择框数据
      initPermissionData(data) {
        this.currentPermissions = []
        let _this = this
        data.forEach(function (item) {
          _this.currentPermissions.push(item.permissionCode)
        })
        this.permissionData = this.currentPermissions
      },
      //更新本地权限缓存
      updateLocalPermissions() {
        this.addPermissions.forEach(item => {
          let index = this.currentPermissions.indexOf(item)
          this.currentPermissions.push(item)
        })
        this.removePermissions.forEach(item => {
          let index = this.currentPermissions.indexOf(item)
          if (index > -1) {
            this.currentPermissions.splice(index, 1)
          }
        })
        this.addPermissions = []
        this.removePermissions = []
      },
      //点击模块树触发
      handleNodeClick(data) {
        this.removePermissions = []
        this.addPermissions = []
        this.permissionDataTable = []
        this.permissionData = []
        let _this = this
        data.id = data.id == "基础管理" ? "simple" : data.id
        if (data.id)
          this.allPermissions.forEach(function (item) {
            if (item.key.replace(/_/g, "/").startsWith(data.id)) {
              _this.permissionDataTable.push({
                key: item.key,
                label: item.label,
                disabled: false
              })
            }
          })
        this.currentPermissions.forEach(function (item) {
          if (item.replace(/_/g, "/").startsWith(data.id)) {
            _this.permissionData.push(item)
          }
        })
      },
      //更新操作员权限
      updateRoleAndPermission() {
        let parms = {
          roleId: this.currentEditId,
          addPermissions: this.addPermissions,
          removePermissions: this.removePermissions,
        }
        this.buttonRequestProgressStart("正在搜索,请稍后...");
        RoleAndPermissionService.updateRoleAndPermission(parms).then((res) => {
          this.updateLocalPermissions()
          this.buttonRequestProgressClose();
          this.$message({
            type: 'success',
            message: '分配成功！'
          })
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.addPermissions = []
          this.removePermissions = []
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      //选择权限
      handleChange(value, direction, movedKeys) {
        let _this = this
        //分配权限
        if (direction == "right") {
          movedKeys.forEach(function (item) {
            let removeIndex = _this.removePermissions.indexOf(item)
            let addIndex = _this.addPermissions.indexOf(item)
            if (removeIndex > -1) {
              _this.removePermissions.splice(removeIndex, 1);
            }
            if (addIndex == -1 && removeIndex == -1) {
              _this.addPermissions.push(item)
            }
          })
        }
        //删除权限
        if (direction == "left") {
          movedKeys.forEach(function (item) {
            let removeIndex = _this.removePermissions.indexOf(item)
            let addIndex = _this.addPermissions.indexOf(item)
            if (addIndex > -1) {
              _this.addPermissions.splice(addIndex, 1)
            }
            if (addIndex == -1 && removeIndex == -1) {
              _this.removePermissions.push(item)
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .permission-button {
    margin-bottom: 10px;
    width: 100px;
  }
</style>
