<template>
    <div>
      <el-dialog
        title="分配审查员"
        :visible.sync="dialogVisible"
        width="43%"
        :before-close="handleClose">
        <div>
          <el-transfer
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入人员名字"
            v-model="userValue"
            :titles="['待分配人员', '已分配人员']"
            :data="userData"
          >
          </el-transfer>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitTask">确 定</el-button>
  </span>
      </el-dialog>
      <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
        <div slot="header" class="clearfix" style="position: relative">
          <span>项目列表</span>
          <el-button style='position: absolute;right: -1%;top: -37%;' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">导出表格</el-button>
        </div>
        <el-row>
          <el-col>
            <div>
              <el-table
                :data="projects"
                style="width: 100%">
                <el-table-column
                  prop="projectName"
                  align="center"
                  label="项目名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="categoryName"
                  align="center"
                  label="项目类别">
                </el-table-column>
                <el-table-column  prop="state"  align="center" label="审核情况" width="120">
                  <template slot-scope="check">
                    <div v-if="check.row.state==1" style="color: #67C23A">
                      审核通过
                    </div>
                    <div v-else-if="check.row.state==2" style="color: #E6A23C">
                      正在审核
                    </div>
                    <div v-else-if="check.row.state==0" style="color: #409EFF">
                      未审核
                    </div>
                    <div v-else style="color: #F56C6C">
                      审核不通过
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="budget"
                  align="center"
                  label="目标金额(元)"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="raisedFunds"
                  align="center"
                  label="已筹资金额（元）"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="startingTime"
                  align="center"
                  label="发起时间"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="endingTime"
                  align="center"
                  label="截止时间"
                  width="180">
                </el-table-column>
                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
            <span
              class="el-tag el-tag--info el-tag--mini"
              style="cursor: pointer;"
              @click="changeDataConfig(scope.row, scope.$index, true)"
            >
              详情
            </span>
                    <span
                      class="el-tag el-tag--danger el-tag--mini"
                      style="cursor: pointer;"
                      @click="deleteDataConfig(scope.row)"
                    >
              删除
            </span>
                    <span v-if="scope.row.state==0"
                          class="el-tag el-tag--warning el-tag--mini"
                          style="cursor: pointer;"
                          @click="issuedTask(scope.row)"
                    >
              审核
            </span>
                  </template>
                </el-table-column>
              </el-table>
              <!--操作区域-->
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
              <!--分页-->
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
</template>

<script>
  import {Msg} from "../../../tool/message";
  import {ProjectService} from "./project";
  export default {
    data() {
      return {
        projects:[],
        currentPage:1,//当前页
        pageSize:10,//页数
        totalCount:0,//总数
        dialogVisible: false,
        userData: [],//this.generateData(),
        userValue: [],
        checkProId:0,
        downloadLoading: false,
      }
    },
    computed: {
      maxHeight() {
        return `${window.screen.availHeight - 220}px`
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        let page={
          page:this.currentPage-1,
          pageSize:this.pageSize
        };
        ProjectService.requestProjectsData(page).then(res => {
          if(res.data == null){
            Msg.warn("加载失败")
          }
          this.projects=res.data.projectsDTOList;
          this.totalCount=res.data.total;
        }).catch(err => {});
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      changeDataConfig(row, index, cg) {
        this.$router.push({path: '/backDetail', query: {proId: row.projectId}});
      },
      deleteDataConfig(row) {
        const projectId=row.projectId;
        console.log('ddd',projectId)
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
            ProjectService.delOneProject(projectId).then(res => {
              loading.close();
              console.log(res)
              Msg.success('删除成功')
              this.getData();
            })
        }).catch(() => {
          Msg.success('取消删除！')
        })

      },
      handleSizeChange(pageSize) {
        this.pageSize=pageSize;
        this.getData();
      },
      handleCurrentChange(currentPage){
        this.currentPage=currentPage;
        this.getData();
      },
      //弹框
      issuedTask(row){
        this.checkProId=row.projectId;
        ProjectService.getAdminUsers().then(res => {
          const data = [];
          const users =res.data;
          const pinyin = res.data;
          users.forEach((user, index) => {
            data.push({
              label: user.realName,//"["+user.roleName+"]"+
              key: user.userId,
              pinyin: pinyin[index].realName,
              // role:user.roleId
            });
          });
          this.userData=data;
          this.dialogVisible=true;
        }).catch(err => {});

      },
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      submitTask(){
        const data={
          projectId:this.checkProId,
          userValue:this.userValue,
          createdAt:new Date().getTime()
        };
        ProjectService.addProTask(data).then(res => {
          Msg.success("项目已经下发审核");
          this.getData()
          this.dialogVisible = false;
          this.userValue=[];
        })
      },
      handleDownload(){
        this.downloadLoading = true
        import('./Export2Excel').then(excel => {
          const tHeader = ['项目名称', '项目类别', '审核情况', '目标金额（元）', '已筹资金额（元）', '发起时间', '截止时间']
          const filterVal = ['projectName', 'categoryName', 'state', 'budget', 'raisedFunds', 'startingTime', 'endingTime']
          const list = this.projects
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '项目信息',
            autoWidth: true
          })
        this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'state') {
            if(v[j]==1){
              return '审核通过'
            }else if(v[j]==2){
              return '正在审核'
            }else if(v[j]==0){
              return '未审核'
            }else{
              return '审核不通过'
            }
          } else {
            return v[j]
          }
        }))
      },
    },

  }
</script>

<style scoped>

</style>
