import {servers} from "../../../tool/servers";

export class permissionService{
  static findAllPermissions(){
    return servers.connection('GET','/employee/findAllPermissions');
  }
}
