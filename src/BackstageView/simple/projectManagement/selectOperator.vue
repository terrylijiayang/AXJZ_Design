<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <el-row>
        <el-col :span="18" :offset="1">
          <div style="float: left">
            <el-transfer
              filterable
              filter-placeholder="请输入权限名称"
              :titles="['待分配管理员', '已分配管理员']"
              v-model="operatorData"
              :data="operatorDataTable"><!--@change="handleChange"-->
            </el-transfer>
          </div>
          <div style="float: left;margin-left: 10px">
            <el-button class="permission-button" type="primary" @click="updateCharityProject">确 定</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

  import {permissionService} from '../permission/permissionService';
  // import {roleService} from "./roleService";
  import {adminLogService} from "../adminLog/adminLogService";
  import {projectManagementService} from "./projectManagementService";

  export default {
    data() {
      return {
        operatorData: [],
        operatorDataTable: [],
        allOperators: [],
        currentOperators: [],
        projectId: '',
        project:{},
        adminLog:{
          employeeId:'',
          operatorName:'',
          operationDetail:''
        },
      };
    },
    mounted() {
      this.projectId = this.$route.query.projectId;
      this.adminLog.employeeId = this.$store.getters.userInfo.employeeId;
      this.adminLog.operatorName = this.$store.getters.userInfo.employeeName;
      this.init()
    },
    methods: {
      init() {
        this.operatorData = [],
        this.operatorDataTable = [],
        this.allOperators = [],
        this.currentOperators = [],
        this.findAllOperators();
        this.findProject()
      },
      findProject(){
        projectManagementService.findProject({projectId:this.projectId}).then(res => {
          this.project = res.data;
        }).catch(err => {

        })
      },
      //查询所有具有审核慈善信息权限的管理员
      findAllOperators() {
        let permissionId = 6;
        projectManagementService.findAllOperators({permissionId:permissionId}).then((res) => {
          this.initOperatorsDataTable(res.data)
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },

      //初始化权限选择框数据
      initOperatorsDataTable(data) {
        for(var index in data){
          this.allOperators.push({
            key: data[index].employeeId,
            label: data[index].employeeName,
            disabled: false
          })
        }
        this.operatorDataTable = this.allOperators;
      },
      //更新添加了审核员后的慈善项目
      updateCharityProject() {
        if(this.operatorData.length == 2){
          this.project.auditorOne = this.operatorData[0];
          this.project.auditorTwo = this.operatorData[1];
          this.project.state = '审核中';
          projectManagementService.updateProject(this.project).then((res) => {
              this.adminLog.operationDetail = "为慈善项目:" + this.project.projectName + "分配审核员";
              this.addAdminLog();
              this.init();
              this.$message({
                type: 'success',
                message: '分配成功！'
              })
            }).catch((error) => {
              console.log(error)
              this.$message({
                type: 'error',
                message: '网络繁忙，请稍候再试！'
              })
            })
        }else {
          this.$confirm('必须选择两个审核员', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {}).catch(() => {})
        }
      },
      addAdminLog(){
        adminLogService.addAdminLog(this.adminLog).then((res) => {
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '保存日志出错'
          })
        });
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
