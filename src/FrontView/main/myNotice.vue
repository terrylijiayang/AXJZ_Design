<template>
  <div class="notice">
    <nhead></nhead>
    <el-container>
      <el-main class="notice-main">
        <el-row>
          <el-col :offset="3">
            <el-timeline>

              <el-timeline-item :timestamp='item.createTime' placement="top" v-for="(item,index) in notices" :key="item.noticeId">
                <el-card>
                  <p>{{item.feedbackIntroduce}}</p>
                </el-card>
              </el-timeline-item>

            </el-timeline>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>


</template>

<script>
  import head from '../../FrontView/header/header'
  import {mainService} from "./mainService";

  export default {
      name: "notice",
      data(){
        return{
          notices:[]
        }
      },
      components:{
        nhead:head
      },
      mounted() {
        if(this.$store.getters.isLogin){
          mainService.requestNotice().then(res => {
            this.notices = res.data;
          }).catch(err => {})
        }
      }
    }
</script>

<style scoped>

</style>
