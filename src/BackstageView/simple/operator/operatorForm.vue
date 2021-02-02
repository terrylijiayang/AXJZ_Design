<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>角色管理</span>
      </div>
      <div class="text item">
        <el-form ref="role" :model="role" label-width="150px" :rules="rules">
          <el-col :span="12">
            <el-form-item label="编码" prop="roleCode">
              <el-input type="input" v-model="role.roleCode"
                        placeholder="编码" clearable autosize
                        resize="both" tabindex=3
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="roleName">
              <el-input type="input" v-model="role.roleName"
                        placeholder="名称" clearable autosize
                        resize="both" tabindex=4
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="roleRemark">
              <el-input type="textarea" v-model="role.roleRemark"
                        placeholder="备注" clearable autosize
                        resize="both" tabindex=10000
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click.native="submitRole()">
                提交
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>


  import {roleService} from './roleService'
  import {utils} from '../../../tool/utils'

  export default {

    data() {
      return {
        roleId: null,
        role:{},
        rules: {
          roleCode: [
            {required: true, message: '请输入编码', trigger: 'blur'},
            {validator: utils.validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          roleName: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {validator: utils.validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          roleRemark: [
            {required: false, message: '请输入备注', trigger: 'blur'},
            {validator: utils.validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
        }
      }
    },
    created() {
      this.roleId = this.$route.query.roleId;
      if (this.roleId)//编辑
      {
        this.findRoleForEdit(this.roleId);
      }
    },
    methods: {
      submitRole() {
        this.$refs['role'].validate(valid => {
          console.log(valid)
          if (valid) {
            if (this.roleId) {
              this.updateRole();
            } else {
              this.addRole();
            }
          }
        })
      },
      updateRole()//编辑角色
      {
        roleService.updateRole(this.role).then((res) => {
          var router = this.$router;
          router.push({path: '/simple/role/Role'})
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '保存出错'
          })
        })
      },
      addRole(){
        roleService.addRole(this.role).then((res) => {
          console.log(this.role)
          var router = this.$router;
          router.push({path: '/simple/role/Role'})
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '添加出错'
          })
        })
      },
      findRoleForEdit(roleId)//查找角色
      {
        roleService.findRole({roleId:roleId}).then((res) => {
          this.role = res.data;
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询角色出错'
          })
        })
      },
    }
  }
</script>
<style scoped>

</style>
