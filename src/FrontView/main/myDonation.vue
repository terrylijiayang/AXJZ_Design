<template>
    <div class="md">
      <el-container>
        <el-main class="md-main">
          <el-row>
            <el-col :offset="3" :span="13">
              <el-row class="projectInfo" v-for="(project,index) in projects" :key="project.projectId">
                <el-row>
                  <el-col :span="6">
                    <img style="width: 160px;height: 100px" :src="getImgUrl(project.projectImagePath)"/>
                  </el-col>
                  <el-col :span="14">
                    <div class="projectName">
                      <span class="category title">[{{project.categoryName}}]</span>
                      <router-link onMouseOver="this.style.color='#409eff';"
                                   onMouseOut="this.style.color='black'"
                                   :to="{path: '/projectDetail', query: {projectId: project.projectId } }"
                                   style="color: black;font-weight: bold;font-size: 14px;text-decoration: none;">
                        {{project.projectName}}
                      </router-link>
                      <!--<el-link class="title" href="https://element.eleme.io" target="_blank">{{project.projectName}}</el-link>-->
                    </div>
                    <div style="margin-bottom: 8px">
                      <span class="font">参捐人数:</span>
                      <span class="participantNumber font">{{project.participantNumber}}</span>
                      <span class="font">人参与捐助</span>
                    </div>
                    <div style="margin-bottom: 10px">
                      <span class="font">项目时间:</span>
                      <span class="projectTime font">{{project.startingTime}}</span>
                      <span class="font">至</span>
                      <span class="projectTime font">{{project.endingTime}}</span>
                      <span class="font">我捐助了</span>
                      <span class="times font">{{project.donationNumber}}</span>
                      <span class="font">次</span>
                      <span class="font">共</span>
                      <span class="money font">{{project.donationAmount}}</span>
                      <span class="font">元</span>
                    </div>
                    <el-button type="warning" size="small" @click="goDonate(project.projectId)">再次捐赠</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-divider></el-divider>
                </el-row>

              </el-row>
            </el-col>
            <el-col :offset="3" :span="13">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
              </el-pagination>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import {mainService} from "./mainService";

  export default {
      name: "myDonation",
      data(){
        return{
          projects:[],
          currentPage:1,//当前页
          pageSize:10,//页数
          totalCount:0,//总数
        }
      },
      components:{
      },
      created(){

      },
      mounted() {
        this.getData();
      },
      methods:{
        getData(){
          let data={
            userId:this.$store.getters.userInfo.userId,
            page:this.currentPage-1,
            pageSize:this.pageSize
          };
          mainService.requestMyDonationData(data).then(res => {
            this.projects=res.data.myDonationDTOList;
            this.totalCount=res.data.total;

          });
        },
        goDonate(id){
          this.$router.push({path:'/donate',query:{projectId:id}})
        },
        getImgUrl(icon) {
          return require('../../assets/images/' + icon );
        },
        handleSizeChange(pageSize) {
          this.pageSize=pageSize;
          this.getData();
        },
        handleCurrentChange(currentPage){
          this.currentPage=currentPage;
          this.getData();
        },
      }
    }
</script>

<style scoped>
  .projectName{
    margin-bottom: 8px;
  }
  .participantNumber{
    color: green;
  }
  .category{
    color: green;
  }
  .title{
    font-size: 14px;
    font-weight: bold;
  }
  .times{
    color: darkorange;
  }
  .money{
    color: darkorange;
  }
  .font{
    font-size: 12px;
  }
</style>
