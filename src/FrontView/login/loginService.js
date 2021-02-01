import {servers} from "../../tool/servers";

export class loginService {
  static login(data){
    return servers.connection('GET','/user/login',data);
  }
}
