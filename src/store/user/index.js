import {Auth} from "./auth";
import {loginService} from "../../FrontView/login/loginService";
import {Msg} from "../../tool/message";

export default {
  state:{
    /** token */
    //token: Auth.getToken() || null,
    /** 用户登陆角色信息 */
    userInfo: Auth.getUserInfo() || {},
    /** 用户登陆账户密码 */
   // accountPwd: Auth.getAccountPwd() || defaultUser,
    /** 是否登陆 */
    isLogin: Auth.getLogin() || false,
    /** 角色权限点 */
    permission: Auth.getUserInfo().userPermissionsCode || {},
  },
  /** 计算属性 */
  getters: {},
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations:{
    ACCOUNT_AUTH_STATUS_CHANGED(state,data){
      state.userInfo = data;
      state.isLogin = true;
      Auth.setUserInfo(data);
      Auth.setLogin();
    },
    ACCOUNT_LOGOUT_FAILURE(state) {
      state.userInfo = {};
      state.permission = [];
      state.isLogin = false;
      Auth.removeUserInfo();
      Auth.removeLogin();
    },
  },
  actions:{
    /** 登录 */
    accountLoginSubmit({commit}, params) {
      return new Promise((resolve, reject) => {
        loginService.login(params).then(res => {
          if(res.data != null){
            commit('ACCOUNT_AUTH_STATUS_CHANGED',res.data);
            Msg.success('登录成功');
            resolve('登录成功');
          }else{
            Msg.warn('账号或密码错误,请重新输入');
            reject('账号或密码错误,请重新输入')
          }
        }).catch(err => {
          reject(err);
          commit('ACCOUNT_LOGOUT_FAILURE');
        });
      })
    }
  }
}
