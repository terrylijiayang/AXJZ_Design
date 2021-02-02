import {servers} from "../../../tool/servers";
export class TaskService {
  static getTaskByUserId(data){
    return servers.connection('POST', '/charityProject/getTaskByUserId',data);
  }
  static updateProTask(data){
    return servers.connection('POST', '/charityProject/updateProTask',data);
  }
  static getTaskProcess(projectId){
    return servers.connection('GET', '/charityProject/getTaskProcess',{projectId:projectId});
  }


}
