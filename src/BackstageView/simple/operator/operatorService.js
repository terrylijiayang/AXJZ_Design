import {servers} from "../../../tool/servers";

export class roleService{
  static findAllRoles(){
    return servers.connection('GET','/employee/findAllRoles');
  }

  static findRole(data){
    return servers.connection('GET','/employee/findRole',data);
  }
  static submitRole(data){
    return servers.connection('POST','/employee/editeRole',data);
  }
  static deleteRole(data){
    return servers.connection('GET','/employee/deleteRole',data);
  }
  static findRolePermissionByRoleId(data){
    return servers.connection('GET','/employee/findRolePermission',data);
  }
  static updateRoleAndPermission(data){
    return servers.connection('POST','/employee/updateRoleAndPermission',data);
  }
}
