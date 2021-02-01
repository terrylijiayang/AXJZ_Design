<template>
  <div class="mh-login">
    <div class="form">
      <el-form v-if="login" :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px"
               class="login-container">
        <div class="head">
          <el-form-item prop="phone" style="margin-bottom: 35px">
            <el-input
              type="text"
              v-model="loginForm.phone"
              ref="input"
              auto-complete="off"
              placeholder="电话">
            <i slot="prefix" class="icon icon-userName"></i>
          </el-input>
          </el-form-item>
          <el-form-item prop="password" style="margin-bottom: 35px">
            <el-input
              type="password"
              v-model="loginForm.password"
              auto-complete="off"
              placeholder="密码"
            >
              <i slot="prefix" class="icon icon-password"></i>
            </el-input>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button
            class="btn"
            type="primary"
            @click.native.prevent="submitLoginForm">
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <div class="wrapper">
            <span>忘记密码?</span>
            <span @click="goRegister()">去注册</span>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {loginService} from "./loginService";
  import crypto from 'crypto';
  export default {
      name: "loginPage",
      data(){
        return{
          login:true,
          loginForm:{
            phone:'',
            password:'',
          },
          rules: {
           /* phone:[{
              required: true,
              pattern: /^1[34578]\d{9}$/,//可以写正则表达式
              message: '目前只支持中国大陆的手机号码',
              trigger: 'blur'
            }],
            password: [
              {required: true, message: '请输入登录密码', trigger: 'change'}
            ]*/
          }
        }
      },
      created() {
        window.addEventListener('keydown', this.Enter);
        // this.getUser();
        // this.changeCaptcha();
      },
      /** 计算属性 */
      computed: {},
      /** 完成挂载 */
      mounted() {
        this.$refs['input'].focus();
      },
      destroyed() {
        window.removeEventListener('keydown', this.Enter)
      },
      methods:{
        Enter(e) {
          if (!!this.loginForm.phone && e.which === 13) {
            this.submitLoginForm()
          }
        },
        submitLoginForm(){
          this.$refs['loginForm'].validate((valid) => {
            if(valid){
              this.$store.dispatch('accountLoginSubmit',this.loginForm).then(() => {
                this.$router.push({path:'/homepage'});
              }).catch(err => {})
            }
          })
        },
        goRegister(){
          this.$router.push({path:'/register',query:{}});
        }
      }
    }
</script>

<style scoped>
  .title {
    text-align: center;
    font-size: 20px;
  }

  .organization {
    margin-top: 10px;
    width: 400px;
  }

  .organizationButton {
    margin-top: 30px;
    width: 400px;
  }

  .mh-login {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/背景.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-width: 1000px;
  }
  .form {
    position: absolute;
    top: 20%;
    left: 25%;
    transform: translate(-50%, -50%);
  }
  img {
    width: 960px;
  }

  .login-container {
    border-radius: 5px;
    -moz-border-radius: 5px;
    width: 45%;
    padding: 35px 35px 15px 35px;
    background: rgba(255, 255, 255, 0.9);
    min-width: 750px;
    position: absolute;
  }

  .icon {
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    display: block;
    position: absolute;
    left: 8px;
    z-index: 1;
    width: 25px;
    height: 100%;
  }
  input.el-input__inner {
    padding-left: 30px;
  }
  .icon-userName {

    background-image: url("../../assets/images/用户.png");
  }

  .icon-password {
    background-image: url("../../assets/images/密码.png");
  }

  .btn {
    width: 100%;
    height: 45px !important;
    background: #1569ae;
    border-radius: 0px;
    font-size: 21px;
    text-indent: 26px;
    letter-spacing: 26px;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    font-size: 17px;
    color: #d70000;
    letter-spacing: 2px;
  }

</style>
<style>
  .mh-login .el-input--prefix .el-input__inner {
    padding-left: 50px;
  }
</style>
