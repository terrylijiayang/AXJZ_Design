
const sessionStorage = window.sessionStorage;
export class Auth {
  static setUserInfo(value = {}) {
    return sessionStorage.setItem('user.userInfo', JSON.stringify(value));
  }

  static getUserInfo() {
    const userInfo = sessionStorage.getItem('user.userInfo');
    return userInfo ? JSON.parse(sessionStorage.getItem('user.userInfo')) : {}
  }

  static removeUserInfo() {
    return sessionStorage.removeItem('user.userInfo')
  }

  static setAccountPwd(value = {}) {
    return sessionStorage.setItem('user.accountPwd', JSON.stringify(value))
  }

  static getAccountPwd() {
    const accountPwd = sessionStorage.getItem('user.accountPwd');
    return accountPwd ? JSON.parse(sessionStorage.getItem('user.accountPwd')) : null
  }

  static removeAccountPwd() {

    return sessionStorage.removeItem('user.accountPwd')
  }

  static setLogin() {
    return sessionStorage.setItem('user.isLogin', true)
  }

  static getLogin() {
    return !!sessionStorage.getItem('user.isLogin')
  }

  static removeLogin() {
    return sessionStorage.removeItem('user.isLogin')
  }

  static setToken(value) {
    return sessionStorage.setItem('user.token', value)
  }

  static getToken() {
    return sessionStorage.getItem('user.token')
  }

  static removeToken() {
    return sessionStorage.removeItem('user.token')
  }
}

