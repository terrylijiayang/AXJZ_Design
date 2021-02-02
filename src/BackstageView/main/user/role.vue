<template>
  <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
    <div slot="header" class="clearfix">
      <span>权限列表</span>
    </div>
    <el-row>
      <el-col>
          <div class="main">
            <div class="left">
              <div class="top">
                <el-input v-model="roleData.roleName" placeholder="请输入角色名..." size="small" />
                <div style="width:15px;" />
                <el-button v-if="roleAddEdit" type="primary" size="small" @click="addRole">添加</el-button>
                <el-button v-else type="primary" size="small" @click="editUpdate">保存</el-button>
              </div>
              <div v-for="(item,i) in roleLists" :key="i" :class="roleActive == i ? 'box box_active' : 'box'" @click="roleActiveFun(item.roleId,i)">
                <span>{{ item.roleName }}</span>
                <span v-if="roleActive == i" class="editRole" @click="editRole(item)">编辑</span>
              </div>
              <div class="save">
                <el-button type="primary" size="small" @click="saveAuthority">保存</el-button>
              </div>
            </div>
            <div class="right">
              <div v-for="(item,i) in checkList" :key="i" :class="i == 0 ? 'box_right' : 'box_right_2'">
                <el-divider content-position="left">{{ item.menuName }}</el-divider>
                <el-checkbox-group v-model="authority.selectList">
                  <el-checkbox :key="i" :label="item.menuId" >{{ item.menuName }}</el-checkbox>
                  <el-checkbox v-for="(iten,j) in item.children" :key="j" :label="iten.menuId" >
                    {{iten.menuName}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
      </el-col>
    </el-row>
  </el-card>

</template>

<script>
  import {UserService} from "./user";
  import {Msg} from "../../../tool/message";
  export default {
      name: "role",
      data() {
        return {
          roleData: {
            roleName: '' // 角色名
          },
          roleLists: [],
          roleActive: '', // 当前选中的权限
          roleAddEdit: true, // 当前是编辑还是保存
          checkList: [],
          authority: {
            roleId: '',
            selectList: []
          }
        };
      },
      components:{

      },
      mounted(){
        this.getAllRole();
        this.getAllMenu();
      },
      methods: {
          getAllRole(){
            UserService.RoleData().then(res => {
              this.roleLists=res.data;
              this.authority.roleId=this.roleLists[0].roleId;
              this.getListByRoleId(this.roleLists[0].roleId);
            }).catch(err => {});
          },
        getAllMenu(){
          UserService.MenuData().then(res => {
            this.checkList=res.data
          }).catch(err => {
          });

        },
        addRole() {
          if (this.roleData.roleName === '') {
            return Msg.error("请填写角色名");
          }
          /*addRole(this.roleData).then(resp => {
            this.$message.success(resp.msg)
            this.getRoleList()
            this.roleData.roleName = ''
          })*/
        },
        // 角色 编辑保存
        editUpdate() {
          if (this.roleData.roleName === '') {
            return Msg.error('请填写角色名')
          }
        /*  roleUpdate(this.roleData).then(resp => {
            this.$message.success(resp.msg)
            this.getRoleList()
            this.roleAddEdit = true
            this.roleData = {
              roleName: '' // 角色名
            }
          })*/
        },
        // 编辑权限
        editRole(row) {
          console.log(row)
          this.roleAddEdit = false
          this.roleData.roleName = row.roleName
          this.roleData.roleId = row.roleId
        },
        roleActiveFun(roleId, i) {
          this.authority.roleId = roleId
          this.roleActive = i
          this.getListByRoleId(roleId)
        },

        // 根据roleId获取权限
        getListByRoleId(roleId) {
          const query = {
            roleId: roleId
          }
          UserService.listByRoleId(query).then(res => {
            this.authority.selectList = res.data
          }).catch(err => {});
        },
        // 权限保存
        saveAuthority() {
          UserService.updateMenuByRoleId(this.authority).then(res => {
            Msg.success("权限更新！")
          })
        },
      }
    }
</script>

<style scoped>
  .back{
    width:96%;padding: 1% 1% 1% 1%;
    background: rgba(242, 242, 242, 0.498039215686275);
    margin-bottom: 1%;
  }
  .main {
    height: 79vh;
    width: 98%;
    /*margin-left: 1%;*/
    margin-top: 20px;
    border: 1px gainsboro solid;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    position: relative;
  }
  .main .left {
    width: 17%;
    padding-right: 10px;
    padding-left: 10px;
    border-right: 1px gainsboro solid;
  }
  .main .top {
    padding-top: 10px;
    height: 40px;
    border-bottom: 1px gainsboro solid;
    display: flex;
    justify-content: flex-start;
  }
  .main button{
    height: 32px;
    background-color: #536976;
    border: none;
  }

  .box {
    height: 28px;
    padding-top: 6px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    position:relative;
  }
  .box .editRole{
    color:green;
  }
  .editRole{
    cursor: pointer;
  }

  .box:hover{
    background: rgb(248, 248, 248);
    padding-left: 20px;
    transition: 0.3ms;
  }
  .box_active{
    background: rgb(248, 248, 248);
    padding-left: 20px;
  }
  .save {
    height: 50px;
    margin-top: 10px;
    position: absolute;
    width: 83%;
    bottom: 0;
  }
  .box button{
    height: 32px;
    background: linear-gradient(to right, #536976, #292e49);
    border: none;
    width: 100%;
  }

  .right {
    width: 87%;
    margin-left: 20px;
    margin-right: 20px;
  }
  .right .box_right{
    margin-top: 10px;
  }
  .right .box_right_2{
    margin-top: 50px;
  }
</style>
