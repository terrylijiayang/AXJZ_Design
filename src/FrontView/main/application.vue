<template>
    <div class="application">
      <ahead ref="ahead"></ahead>
      <el-container>
        <el-main class="a-main">
          <el-form ref="applicationForm" :model="applicationForm" :rules="rule">
            <!--<el-row class="coverImage">-->
              <!--<el-col :offset="3" :span="21">-->
                <!--<el-form-item label="项目封面">-->

                  <!--<div class="el-upload__tip">请选择上传项目封面，只能上传jpg/png文件，且不超过500kb,务必上传真实信息</div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->
            <el-row class="name">
              <el-col :offset="3" :span="12">
                <el-form-item label="项目名称" prop="projectName">
                  <el-input type="input" v-model="applicationForm.projectName"
                             class="projectName"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="category">
              <el-col :offset="3" :span="12">
                <el-form-item label="项目类型" prop="categoryId">
                  <el-select v-model="applicationForm.categoryId" placeholder="请选择项目类型">
                    <el-option label="教育助学" value="1"></el-option>
                    <el-option label="扶贫救灾" value="2"></el-option>
                    <el-option label="医疗救助" value="3"></el-option>
                    <el-option label="其他" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="introduce">
              <el-col :offset="3" :span="12">
                <el-form-item label="项目介绍" prop="projectIntroduce">
                  <el-input type="textarea" v-model="applicationForm.introduce"
                            class="projectIntroduce"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="plan">
              <el-col :offset="3" :span="12">
                <el-form-item label="项目计划" prop="projectPlan">
                  <el-input type="textarea" v-model="applicationForm.projectPlan"
                            class="projectPlan"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="budget">
              <el-col :offset="3" :span="12">
                <el-form-item label="项目预算">
                  <el-input type="input" v-model="applicationForm.projectBudget"
                            placeholder="选填" class="projectBudget"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="budgetBd">
              <el-col :offset="3" :span="12">
                <el-form-item label="预算明细" prop="budgetBreakdown">
                  <el-input type="textarea" v-model="applicationForm.budgetBreakdown"
                            placeholder="请填写资金使用场景"  class="budgetBreakdown"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="startingT">
              <el-col :offset="3" :span="12">
                <el-form-item label="开始时间" prop="startingTime">
                  <el-date-picker type="date" placeholder="选择日期"
                      class="startingTime" v-model="applicationForm.startingTime">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="endingT">
              <el-col :offset="3" :span="12">
                <el-form-item label="结束时间" prop="endingTime">
                  <el-date-picker type="date" placeholder="选择日期"
                                  class="endingTime" v-model="applicationForm.endingTime">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row class="images">-->
              <!--<el-col :offset="3" :span="21">-->
                <!--<el-form-item label="项目图片">-->

                  <!--<div class="el-upload__tip">请选择上传图像，只能上传jpg/png文件，且不超过500kb,最多上传三张,务必上传真实信息</div>-->

                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->
            <el-row class="submit">
              <el-col :offset="3" :span="12">
                <el-form-item>
                 <el-button type="primary" @click="submitApplicationForm()">提交信息</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

        </el-main>
      </el-container>
    </div>
</template>

<script>
  import head from '../../FrontView/header/header'
  import {utils} from "../../tool/utils";
  import {Msg} from "../../tool/message";
  import {mainService} from "./mainService";

  export default {
      name: "application",
      data(){
        return{
          dialogImageUrl: '',
          dialogVisible: false,
          applicationForm:{
            categoryId:'',
            userId:'',
            projectImagePath:'',
            projectName:'',
            introduce:'',
            projectPlan:'',
            projectBudget:'',
            budgetBreakdown:'',
            startingTime:'',
            endingTime:'',
            images:[],
          },
          rule:{
            projectName: [
              {required: true, message: '请输入项目名称', trigger: 'blur'},
              {validator: utils.validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'}
            ],
            categoryId:[
              { required: true, message: '请选择项目类型', trigger: 'change' }
            ],
            projectIntroduce:[
              {required: true, message: '请输入项目介绍', trigger: 'blur'},
            ],
            projectPlan:[
              {required: true, message: '请输入项目计划', trigger: 'blur'},
            ],
            budgetBreakdown:[
              {required: true, message: '请输入预算明细', trigger: 'blur'},
            ],
            startingTime:[
              {required: true, message: '请选择开始时间', trigger: 'change'},
            ],
            endingTime:[
              {required: true, message: '请选择结束时间', trigger: 'change'},
              {validator: this.checkDate(), trigger: 'change'},
            ]
          }
        }
      },
      components:{
        ahead:head
      },
      mounted() {
        if(this.$store.getters.isLogin == false){
          Msg.warn('请先登录');
          this.$router.push({path:'/login'})
        }
      },
      methods:{
        checkDate(){
          return (rule, value, callback) => {
            if(this.applicationForm.startingTime >= value){
              callback(new Error('日期错误'))
            }else {
              callback()
            }
          }
        },
        submitApplicationForm(){

          this.$refs['applicationForm'].validate((valid) => {
            if(valid){
              this.applicationForm.userId = this.$store.getters.userInfo.userId;
              mainService.submitApplication(this.applicationForm).then(res => {
                console.log(res)
              })
            }
          })
        }
      }
    }
</script>

<style scoped>
  .projectName{
    width: 380px;
    height: 40px;
  }
  .categoryId{
    width: 380px;
    height: 40px;
  }
  .projectIntroduce{
    width: 380px;
  }
  .projectPlan{
    width: 380px;
  }
  .projectBudget{
    width: 380px;
  }
  .budgetBreakdown{
    width: 380px;
  }
  .startingTime{
    width: 380px;
  }
  .endingTime{
    width: 380px;
  }
</style>
