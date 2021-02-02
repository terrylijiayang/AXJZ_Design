<template>
  <div class="spanControl-list register" style="width: 100%;margin-left: 0!important;">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>个人注册</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div class="text item">
        <el-form ref="registerForm" :model="registerForm" label-width="150px" :rules="rules">
          <el-upload
            class="upload-demo"
            action=""
            :on-change="handleChange"
            :on-remove="handleRemove"
            :file-list="avatar"
            :limit="1"
            :auto-upload="false"
            list-type="picture"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">请选择上传头像，只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-col :span="12">
            <el-form-item label="昵称" prop="nickName">
              <el-input type="input" v-model="registerForm.nickName"
                        placeholder="请输入昵称" clearable autosize
                        resize="both" tabindex=1
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input type="input" v-model="registerForm.phone"
                        placeholder="联系电话" clearable autosize
                        resize="both" tabindex=2
                        maxlength=100
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实姓名" prop="realName">
              <el-input type="input" v-model="registerForm.realName"
                        placeholder="请输入真实姓名" clearable autosize
                        resize="both" tabindex=3
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="identityNumber">
              <el-input type="input" v-model="registerForm.identityNumber"
                        placeholder="请输入身份证号码" clearable autosize
                        resize="both" tabindex=4
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input id="password" type="password" v-model="registerForm.password"
                        placeholder="密码" clearable autosize
                        resize="both" tabindex=5
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="isPassword">
              <el-input type="password" v-model="registerForm.isPassword"
                        placeholder="确认密码" clearable autosize
                        resize="both" tabindex=6
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="submitRegisterForm()">注册</el-button>
              <el-button style="margin-left: 20px;" type="primary" @click="returnLogin()">返回</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <!--<div class="text item clearfix">-->
      <!--<el-alert v-for="remark in alerts.remarks" :key="remark.title"-->
      <!--v-bind:title="remark.title"-->
      <!--type="info"-->
      <!--v-bind:description="remark.content">-->
      <!--</el-alert>-->
      <!--</div>-->
    </el-card>
  </div>

</template>

<script>
  import {utils} from "../../tool/utils";
  import crypto from 'crypto';
  import {registerService} from "./registerService";
  import {Msg} from "../../tool/message";

  export default {
    name: "register",
    data(){
      return{
        isPassword:'',
        avatar: [],
        registerForm:{
          avatarPath:'',
          phone:'',
          nickName:'',
          realName:'',
          identityNumber:'',
          password:'',
        },
        rules:{
          nickName: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            // {validator: utils.validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
            // {validator: utils.validateString(0, 1000, /^1[3|4|5|7|8]\d{9}$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          realName: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'},
            // {validator: utils.validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          identityNumber: [
            {required: true, message: '请输入身份证号', trigger: 'blur'},
            // {validator: utils.validateString(0, 1000, /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: utils.validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          isPassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: this.checkPassword(0, 1000, /^.*$/, "两次输入的密码不一致，请重新输入"), trigger: 'blur'},
          ],
        }
      }
    },
    watch:{
    },
    methods: {
      returnLogin(){
        this.$router.push({path:'/'});
      },
      handleRemove(file, fileList) {
        this.avatar = []
        // console.log(this.registerForm.imageFile)
      },
      handleChange(file,fileList) {
        this.avatar = fileList;
      },
      checkPassword(min, max, pattern, patternMessage) {//验证密码是否一致
        var min = min;
        var max = max;
        return (rule, value, callback) => {

          var newValue = value;
          setTimeout(() => {
            if (!newValue) {
              if (min == 0) {
                callback();
                return
              }
              else {
                return callback(new Error('不能为空'));
              }
            }

            var v1 = newValue.trim();
            var adminPassword = document.getElementById("password").value;
            if (adminPassword != v1) {
              callback(new Error(patternMessage));
              return;
            }
            else {
              callback();
            }
          })
        }
      },
      submitRegisterForm(){
        this.$refs['registerForm'].validate((valid) => {
          if(valid){
            let data = this.registerForm;
            delete data.isPassword;
            registerService.register(this.registerForm,this.avatar).then((res) => {
              Msg.info(res.data)
            }).catch((err) => {

            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 16px;
    line-height: 5;
    margin-left: 20px;
  }
</style>
<style>
  .register .upload-demo{
    padding-bottom: 20px;
  }
</style>
