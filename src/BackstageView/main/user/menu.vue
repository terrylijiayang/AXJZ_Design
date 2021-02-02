<template>
  <div>
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>菜单列表</span>
      </div>
      <el-row>
        <el-col>
          <div>
            <div class="bottom">
              <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
              >
                <!-- 内敛子表格 -->
                <el-table-column
                  type="expand"
                  align="center"
                >
                  <template slot-scope="props">
                    <el-table :data="props.row.children" :show-header="false">
                      <el-table-column
                        prop="menuName"
                        width="220"
                        label="菜单名"
                      />
                      <el-table-column
                        prop="menuAddr"
                        width="220"
                        label="访问地址"
                      />
                      <el-table-column
                        prop="menuSts"
                        label="状态"
                        width="220"
                      >
                        <template slot-scope="scope">
                          <el-switch
                            v-model="scope.row.menuSts"
                            active-color="#13ce66"
                            inactive-color="#536976"
                            :active-value="1"
                            :inactive-value="0"
                            @change="updateMenu(scope.row, 4)"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="menuSort"
                        label="排序"
                        width="250"
                      >
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.menuSort" size="mini" style="width:50px;" placeholder="请输入内容" @change="updateMenu(scope.row, 3)" />
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                          <span @click="openEdit(scope.row, 2)">编辑</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>

                </el-table-column>

                <el-table-column
                  prop="menuName"
                  label="菜单名"
                  width="220"
                >
                  <template slot-scope="scope">
                    <i :class="scope.row.menuImg" />
                    <span style="margin-left: 10px">{{ scope.row.menuName }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="menuAddr"
                  label="访问地址"
                  width="220"
                />
                <el-table-column
                  prop="menuSts"
                  label="状态"
                  width="220"
                >
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.menuSts"
                      active-color="#13ce66"
                      inactive-color="#536976"
                      :active-value="1"
                      :inactive-value="0"
                      @change="updateMenu(scope.row, 4)"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="menuSort"
                  label="排序"
                  width="220"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.menuSort" size="mini" style="width:50px;" placeholder="请输入内容" @change="updateMenu(scope.row, 3)" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <span @click="openEdit(scope.row, 1)">编辑</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span @click="openAdd(scope.row,2)">添加子菜单</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <el-drawer
              style=" border: none;"
              :title="drawerTitle"
              :visible.sync="drawer"
              direction="rtl"
              :wrapper-closable="false"
              :before-close="handleClose"
            >
              <div class="box">
                <div class="left">
                  <span style="color:white;">*&nbsp;</span>
                  <span>上级菜单：</span>
                </div>
                <div class="right">
                  <el-input v-model="menuData.supMenuName" :disabled="true" size="small" placeholder="" />
                </div>
              </div>
              <div class="box">
                <div class="left">
                  <span style="color:red;">*&nbsp;</span>
                  <span>菜单名称：</span>
                </div>
                <div class="right">
                  <el-input v-model="menuData.menuName" size="small" placeholder="请输入内容" />
                </div>
              </div>
              <div class="box">
                <div class="left">
                  <span style="color:red;">*&nbsp;</span>
                  <span>菜单地址：</span>
                </div>
                <div class="right">
                  <el-input v-model="menuData.menuAddr" size="small" placeholder="请输入内容" />
                </div>
              </div>
              <div v-if="drawerTitle == '添加菜单' || drawerTitle == '编辑菜单'" class="box">
                <div class="left">
                  <span style="color:red;">*&nbsp;</span>
                  <span>菜单图标：</span>
                </div>
                <div class="right">
                  <el-input v-model="menuData.menuImg" size="small" placeholder="请输入内容" />
                </div>
              </div>
              <div class="submit">
                <el-button v-if="drawerTitle == '添加菜单' || drawerTitle == '添加子菜单'" @click="addMenu">添加</el-button>
                <el-button v-else @click="saveMenu">保存</el-button>
              </div>

            </el-drawer>

          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>

<script>
  import {UserService} from "./user";
  import {Msg} from "../../../tool/message";
  export default {
      data() {
        return {
          tableData:[],
          drawerTitle: '添加菜单',
          drawer: false,
          menuData: {
            menuName: '', // 菜单名称
            menuAddr: '', // 菜单地址
            menuImg: '', // 菜单图标
            menuId: '', // 菜单Id
            supMenuId: '', // 父菜单Id
            supMenuName: '' // 父菜单名称
          },
          saveData:{
            menuId: '',
            menuName: '',
            menuAddr: '',
            menuImg: '',
            menuSts:'',
            menuSort:'',
            children:[],
          },
        };
      },
      components:{

      },
      mounted(){
        this.getData();
      },
      methods: {
        getData() {
          UserService.MenuData().then(res => {
            this.tableData=res.data
          }).catch(err => {
          });
        },
        handleClose(done) {
          this.drawer = false
          this.menuData = {
            menuName: '', // 菜单名称
            menuAddr: '', // 菜单地址
            menuImg: '', // 菜单图标
            menuId: '', // 菜单Id
            supMenuId: '', // 父菜单Id
            supMenuName: '' // 父菜单名称
          }
        },
        saveMenu(){
          // console.log(this.saveData)
          this.saveData.menuName=this.menuData.menuName;
          this.saveData.menuAddr=this.menuData.menuAddr;
          this.saveData.menuImg=this.menuData.menuImg;
          UserService.UpdateMenu(this.saveData).then(res => {
            if(res.data){
              Msg.success("菜单已更新")
              this.drawer = false
              this.handleClose()
            }else{
              Msg.error("系统出了点错")
            }
          }).catch(err => {});
        },
        updateMenu(row, flag) {
          // console.log(row,flag)
          if (flag === 3) {
            if (row.menuSort >= 100) {
              return Msg.error('排序最高不能超过100!')
            }
          }
          UserService.UpdateMenu(row).then(res => {
            if(res.data){
              Msg.success("菜单已更新")
            }else{
              Msg.error("系统出了点错")
            }
          }).catch(err => {});
        },

        addMenu(){

        },
        openEdit(row, flag) {
          this.saveData=row;
          if (flag !== 1) {
            this.drawerTitle = '编辑子菜单'
            this.menuData.supMenuId = row.supMenuId
            this.menuData.supMenuName = row.supMenuId
          } else {
            this.drawerTitle = '编辑菜单'
          }
          this.menuData.menuImg = row.menuImg
          this.menuData.menuAddr = row.menuAddr
          this.menuData.menuName = row.menuName
          this.menuData.menuId = row.menuId
          this.drawer = true
        },
        // 打开添加
        openAdd(row, flag) {
          if (flag !== 1) {
            this.menuData.supMenuId = row.menuId
            this.menuData.supMenuName = row.menuName
            this.menuData.menuAddr = row.menuAddr
            this.drawerTitle = '添加子菜单'
          } else {
            this.drawerTitle = '添加菜单'
          }
          this.drawer = true
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

  .top {
    height: 20px;
    margin-top: 20px;
    padding-left: 20px;
  }
  .top  span{
    color: #536976;
  }
  .top  span:hover{
    color: #292e49;
    cursor: pointer;
  }

  .bottom{
    margin-top: 10px;
  }
  .box{
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
  // border: 1px blue solid;
  }
  .submit {
    margin-top: 30px;
    margin-left: 100px;
  }
  .submit button{
    background: linear-gradient(to right, #536976, #292e49);
    color: white;
  }
</style>
