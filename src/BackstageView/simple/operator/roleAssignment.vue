<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <el-row>
        <el-col :span="18" :offset="1">
          <div style="float: left">
            <el-transfer
              filterable
              filter-placeholder="请输入权限名称"
              :titles="['待分配权限', '已分配权限']"
              v-model="permissionData"
              :data="permissionDataTable"><!--@change="handleChange"-->
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
  import {permissionService} from '../permission/permissionService';
  import {roleService} from "./roleService";

  export default {
    data() {
      return {
        permissionData: [],
        permissionDataTable: [],
        allPermissions: [],
        currentPermissions: [],
        removePermissions: [],
        addPermissions: [],
        roleId: '',
      };
    },
    // computed: mapState({
    //   menus: state => state.permission.menus,
    //   user: state => state.user,
    // }),
    mounted() {
      this.roleId = this.$route.query.roleId;
      this.init()
    },
    methods: {
      init() {
        this.findAllPermissions();
        this.findPermissionByRoleId();
      },
      //查询所有权限
      findAllPermissions() {
        permissionService.findAllPermissions().then((res) => {
          this.initPermissionsDataTable(res.data)
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      //根据角色Id查询对应的权限
      findPermissionByRoleId() {
        roleService.findRolePermissionByRoleId({roleId:this.roleId}).then((res) => {
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
        for(var index in data){
          this.allPermissions.push({
            key: data[index].permissionId,
            label: data[index].permissionName,
            disabled: false
          })
        }
        this.permissionDataTable = this.allPermissions;
      },
      //初始化已选择的权限选择框数据
      initPermissionData(data) {
        for(var index in data){
          this.currentPermissions.push(data[index].permissionId)
        }
        this.permissionData = this.currentPermissions
      },
      //更新角色权限
      updateRoleAndPermission() {
        let parms = {
          roleId: this.roleId,
          permissions: this.permissionData,
        }
        roleService.updateRoleAndPermission(parms).then((res) => {
          this.init();
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
    }
  }
</script>

<style scoped>
  .permission-button {
    margin-bottom: 10px;
    width: 100px;
  }
</style>
