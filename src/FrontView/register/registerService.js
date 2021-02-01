import {servers} from "../../tool/servers";
export class registerService{
  static register(registerForm,fileList){
    let files = [];
    for(var index in fileList){
      files.push(fileList[index].raw)
    }
    return servers.connection('POST','/user/register',registerForm,files);
  }
}
