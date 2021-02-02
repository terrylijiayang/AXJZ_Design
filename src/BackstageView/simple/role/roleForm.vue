<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>角色管理</span>
      </div>
      <div class="alert-container clearfix">
        <el-alert v-for="alert in alerts.successes" :key="alert.title"
                  v-bind:title="alert.title"
                  type="success"
                  show-icon>
        </el-alert>
        <el-alert v-for="alert in alerts.infos" :key="alert.title"
                  v-bind:title="alert.title"
                  type="info"
                  show-icon>
        </el-alert>
        <el-alert v-for="alert in alerts.warnings" :key="alert.title"
                  v-bind:title="alert.title"
                  type="warning"
                  show-icon>
        </el-alert>
        <el-alert v-for="alert in alerts.errors" :key="alert.title"
                  v-bind:title="alert.title"
                  type="error"
                  show-icon>
        </el-alert>
      </div>
      <div class="text item">
        <el-form ref="roleForm" :model="role" label-width="150px" :rules="rules">
          <el-col :span="12">
            <el-form-item label="编码" prop="code">
              <el-input type="input" v-model="role.code"
                        placeholder="编码" clearable autosize
                        resize="both" tabindex=3
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input type="input" v-model="role.name"
                        placeholder="名称" clearable autosize
                        resize="both" tabindex=4
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">

              <el-input type="textarea" v-model="role.remark"
                        placeholder="备注" clearable autosize
                        resize="both" tabindex=10000
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="submitRole()" :loading="isSubmiting"
                         v-permission:simple_permission_Role_Edit>提交
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="text item clearfix">
        <el-alert v-for="remark in alerts.remarks" :key="remark.title"
                  v-bind:title="remark.title"
                  type="info"
                  v-bind:description="remark.description">
        </el-alert>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {RoleService} from './RoleService'
  import {d4utils} from '../../../tools/d4utils'

  export default {
    components: {},
    data() {
      var validateIntRange = d4utils.validateFloatRange;
      var validateFloatRange = d4utils.validateFloatRange;
      var validateString = d4utils.validateString;

      return {
        rules: {
          code: [
            {required: true, message: '请输入编码', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          remark: [
            {required: false, message: '请输入备注', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
        },
        isSubmiting: false,
        role: {},
        roleId: null,
        pickerOptionsCreateDatetime: {
          disabledDate(time) {
            //TODO: 请在此判断可以输入的日期范围,
            //return time.getTime() > Date.now();
            return false;
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pickerOptionsUpdateDatetime: {
          disabledDate(time) {
            //TODO: 请在此判断可以输入的日期范围,
            //return time.getTime() > Date.now();
            return false;
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        alerts: {
          remarks: [{title: "功能说明", description: "TODO: 请在这里加上功能说明"},],
          successes: [], //TODO:[{title:'消息内容'},]
          infos: [],
          warnings: [],
          errors: []
        },
      }
    },

    methods: {
      submitRole() {
        var refs = this.$refs;
        refs['roleForm'].validate(valid => {
          if (valid) {
            if (this.role.eid)//编辑角色
            {
              this.updateRole();
            }
            else//保存角色
            {
              this.saveRole();
            }
          } else {
            return false
          }
        })
      },
      saveRole()//保存角色
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在保存,请稍后...");
        RoleService.saveRole(this.role).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/permission/Role'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: '保存出错'
          })
        })
      },
      updateRole()//编辑角色
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在更新,请稍后...");
        RoleService.updateRole(this.role).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/permission/Role'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: '保存出错'
          })
        })
      },
      findRoleForEdit(roleId)//查找角色
      {
        RoleService.findRoleForEdit(roleId).then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询角色出错'
          })
        })
      },
      createRole()//创建新的角色
      {
        RoleService.createRole().then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '创建新的角色出错'
          })
        })
      },
      prepareForEdit(roleEditDto) {
        this.role = roleEditDto.role;

      },

    },
    created() {
      this.roleId = this.$route.params.roleId;
      if (this.roleId)//编辑
      {
        this.findRoleForEdit(this.roleId);
      }
      else//新增
      {
        this.createRole();
      }
    },
  }
</script>
<style scoped lang="scss">

</style>
