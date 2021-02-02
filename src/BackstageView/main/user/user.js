import {servers} from "../../../tool/servers";
export class UserService {
  static UsersData(data) {
    return servers.connection('POST', '/user/getAllUser',data);
  }
  static MenuData() {
    return servers.connection('GET', '/user/getAllMenu');
  }
  //修改menu
  static  UpdateMenu(data){
    return servers.connection('POST', '/user/updateMenu',data);
  }
  static RoleData() {
    return servers.connection('GET', '/user/getAllRole');
  }
  static listByRoleId(data){
    return servers.connection('GET', '/user/listByRoleId',data);
  }
  static updateMenuByRoleId(authority){
    return servers.connection('POST', '/user/updateMenuByRoleId',authority);
  }
  //更新用户
  static updateUser(data){
    return servers.connection('POST', '/user/updateUser',data);
  }
  //删除用户
  static delUserById(data){
    return servers.connection('GET', '/user/delUserById',data);
  }

}
