<template>
  <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
    <div slot="header" class="clearfix">
      <span>用户列表</span>
    </div>
    <el-row>
      <el-col>
        <div style="margin-left: 1%;">
            <el-table
              :data="users"
              style="width: 100%">

              <el-table-column
                prop="avatarPath"
                align="center"
                label="用户头像"
                width="150">
                <template slot-scope="check">
                  <div>
                    <el-image :src=getImgUrl(check.row.avatarPath) width="40" height="40"></el-image>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="realName"
                align="center"
                label="用户姓名"
                width="180">
              </el-table-column>

              <el-table-column
                prop="nickName"
                align="center"
                label="用户网名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="identityNumber"
                align="center"
                label="身份ID"
                width="180"
                height="180">
              </el-table-column>
              <el-table-column
                prop="phone"
                align="center"
                label="用户电话"
              >
              </el-table-column>
              <el-table-column
                prop="roleName"
                align="center"
                label="角色名"
              >
              </el-table-column>
              <el-table-column label="操作" >
                <template slot-scope="scope">
            <span
              class="el-tag el-tag--info el-tag--mini"
              style="cursor: pointer;"
              @click="openEdit(scope.row)"
            >
              编辑
            </span>
                  <span
                    class="el-tag el-tag--danger el-tag--mini"
                    style="cursor: pointer;"
                    @click="deleteDataConfig(scope.row)"
                  >
              删除
            </span>
                </template>
              </el-table-column>
            </el-table>
            <el-col>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
              </el-pagination>
            </el-col>
          <el-drawer
            :title="drawerTitke"
            :visible.sync="drawer"
            direction="rtl"
            :wrapper-closable="false"
            :before-close="handleClose"
            size="25%"
          >
            <div class="box">
              <div class="left">
                <span style="color:red;">*&nbsp;</span>
                <span>用户昵称：</span>
              </div>
              <div class="right">
                <el-input v-model="userData.nickName" size="small" placeholder="" />
              </div>
            </div>
            <div class="box">
              <div class="left">
                <span style="color:red;">*&nbsp;</span>
                <span>用户姓名：</span>
              </div>
              <div class="right">
                <el-input v-model="userData.realName" size="small" placeholder="" />
              </div>
            </div>
            <div class="box">
              <div class="left">
                <span style="color:red;">*&nbsp;</span>
                <span>用户手机：</span>
              </div>
              <div class="right">
                <el-input v-model="userData.phone" size="small" placeholder="" />
              </div>
            </div>
            <div class="box">
              <div class="left">
                <span style="color:red;">*&nbsp;</span>
                <span>用户ID：</span>
              </div>
              <div class="right">
                <el-input v-model="userData.identityNumber" size="small" placeholder="" />
              </div>
            </div>
            <div class="box">
              <div class="left">
                <span style="color:red;">*&nbsp;</span>
                <span>用户角色：</span>
              </div>
              <div class="right">
                <el-select v-model="userData.roleId" size="small" placeholder="角色选择..." style="width:100%">
                  <el-option
                    v-for="item in roles"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                  />
                </el-select>
              </div>
            </div>
            <!--      <div class="box">
                    <div class="left">
                      <span style="color:red;">*&nbsp;</span>
                      <span>用户头像：</span>
                    </div>
                    <div class="right">
                      <el-input v-model="userData.headImgPath" size="small" placeholder="" />
                    </div>
                  </div>-->
            <!--   <div class="box">
              <div class="left">
                <span style="color:red;">*&nbsp;</span>
                <span>用户状态：</span>
              </div>
              <div class="right box_radio">
                <el-radio v-model="userData.userStatus" :label="1">启用</el-radio>
                <el-radio v-model="userData.userStatus" :label="2">停用</el-radio>
              </div>
            </div>-->
            <div class="submit">
              <!--<el-button v-if="drawerTitke == '添加用户'" @click="userSave">添加</el-button>-->
              <el-button @click="userUpdate()">保存</el-button>
            </div>
          </el-drawer>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import {UserService} from "./user";
  import {Msg} from "../../../tool/message";

  export default {
    data() {
      return{
        users:[],
        currentPage:1,//当前页
        pageSize:10,//页数
        totalCount:0,//总数
        drawerTitke: '添加用户',
        drawer: false,
        userData: {
          nickName: '', // 用户昵称
          realName:'',  //用户姓名
          phone: '',// 手机号
          roleId: '', // 角色Id
          identityNumber:'',//身份ID
          userId: ''			// 用户ID编辑的时候用
          // userStatus: '', 	// 用户状态
          // headImgPath: '', 	// 用户头像
        },
        roles:[]
      }
    },
    created() {
      this.getData();
      this.getRole();
    },
    methods: {
      getData() {
        let page={
          page:this.currentPage-1,
          pageSize:this.pageSize
        };
        UserService.UsersData(page).then(res => {
          this.users = res.data.users;
          this.totalCount=res.data.total;
        }).catch(err => {
        });
      },
      getRole(){
        UserService.RoleData().then(res => {
          this.roles=res.data;
        }).catch(err => {});
      },
      getImgUrl(icon) {
        return require('../../../assets/images/' + icon);
        // return require('../../../assets/images/1.jpg');
      },
      handleClose(done) {
        this.drawer = false
        this.userData = {
          userName: '',
          userPhone: '',
          roleId: '',
          headImgPath: '',
          userStatus: '',
          userId: ''
        }
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.getData();
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getData();
      },

      deleteDataConfig(row) {
        console.log(row)
        this.$confirm('是否确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({
            lock: true,
            text: "提交中请等待...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          UserService.delUserById({userId:row.userId}).then(res => {
            loading.close();
            Msg.success('删除成功')
            this.getData();
          }).catch(() => {
            Msg.success('取消删除！')
          })
        })
      },
      // 编辑
      openEdit(row) {
        this.userData = {
          nickName: row.nickName,
          realName:row.realName,
          phone: row.phone,
          roleId: row.roleId,
          userId: row.userId,
          identityNumber:row.identityNumber
        }
        this.drawer = true
        this.drawerTitke = '编辑用户'
      },
      userUpdate(){
        UserService.updateUser(this.userData).then(res => {
            Msg.success("修改成功");
            this.drawer = false
            this.getData();
            this.handleClose()
        }).catch(err => {});
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
  .box {
    height: 30px;
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
  }
  .box .left{
    width: 97px;
    height: 25px;
    margin-top: 5px;
    padding-left: 30px;
  }
  .box .right{
    height: 30px;
    width: 65%;
  }
  .box_radio{
    height: 30px;
    width: 80%;
    margin-top: 5px;
  }
  .submit{
    margin-top: 30px;
    margin-left: 130px;
  }
  button{
    background: linear-gradient(to right, #536976, #292e49);
    color: white;
  }
</style>
