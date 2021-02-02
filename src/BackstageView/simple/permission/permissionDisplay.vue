
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看权限点</span>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ permission.EId }}</span>
                        </el-form-item>
                        <el-form-item label="编码">
                            <span>{{ permission.code }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ permission.name }}</span>
                        </el-form-item>
                        <el-form-item label="全名">
                            <span>{{ permission.fullName }}</span>
                        </el-form-item>
                        <el-form-item label="模块编码">
                            <span>{{ permission.moduleCode }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ permission.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ permission.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ permission.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ permission.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ permission.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {PermissionService} from './PermissionService';

export default {
    components: {
    },
    data() {
        return {
            permission:{},
        }
    },
    methods: {
        findPermissionForView(permissionId)//查找权限点
        {
            PermissionService.findPermissionForView(permissionId).then((resp) => {
                this.permission = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询权限点出错'
        })
        })
        },
    },
    created() {
        const permissionId = this.$route.params.permissionId;
        this.findPermissionForView(permissionId);
    },
}

</script>
<style scoped lang="scss">

</style>
