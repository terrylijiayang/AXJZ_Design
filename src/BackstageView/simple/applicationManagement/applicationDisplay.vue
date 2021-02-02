<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看权限点</span>
            </div>
            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                  <el-col :span="12">
                    <el-form-item label="标识">
                      <span>{{ permission.permissionId }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="编码">
                      <span>{{ permission.permissionId }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="名称">
                      <span>{{ permission.permissionName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="创建时间">
                      <span>{{ permission.createTime }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="模块编码">
                      <span>{{ permission.moduleCode }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注">
                      <span>{{ permission.permissionRemark }}</span>
                    </el-form-item>
                  </el-col>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {permissionService} from './permissionService';

export default {
    components: {
    },
    data() {
        return {
            permission:{},
        }
    },
  created() {
    const permissionId = this.$route.query.permissionId;
    this.findPermission(permissionId);
  },
  methods: {
    findPermission(permissionId){
      permissionService.findPermission({permissionId:permissionId}).then((res) => {
        console.log(res.data)
        this.permission = res.data;
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: '查询权限点出错'
        })
      })
    },
  }

}

</script>
<style scoped>

</style>
