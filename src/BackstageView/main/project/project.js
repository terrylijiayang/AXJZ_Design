import {servers} from "../../../tool/servers";
export class ProjectService {
  static requestProjectsData(data) {
    return servers.connection('POST', '/charityProject/projects',data);
  }
  static requestProjectDetail(projectId) {
    return servers.connection('GET', '/charityProject/projectDetail',{projectId:projectId});
  }
  static delOneProject(projectId){
    return servers.connection('GET', '/charityProject/projectDelete',{projectId:projectId});
  }
  //新增留言
  static addProMessage(data){
    return servers.connection('POST', '/charityProject/addProMessage',data);
  }
  //查看该项目的留言
  static getMessagesByProjectId(projectId) {
    return servers.connection('GET', '/charityProject/getMessagesByProjectId',{projectId:projectId});
  }
  //删除该项目的留言
  static delProject(messageId){
    return servers.connection('GET', '/charityProject/delProMessage',{messageId:messageId});
  }
  //新增留言回复
  static addProMessageReply(data){
    return servers.connection('POST', '/charityProject/addProMessageReply',data);
  }
  //查看该留言的回复
  static showProMessageReply(messageId) {
    return servers.connection('GET', '/charityProject/showProMessageReply', {messageId: messageId});
  }
  //确定审核
  static checkProject(projectId){
    return servers.connection('GET', '/charityProject/checkProject',{projectId:projectId});
  }
  //管理员用户信息
  static getAdminUsers(){
    return servers.connection('GET', '/user/getAdminUsers');
  }
  //下发审核
  static addProTask(data){
    return servers.connection('POST', '/charityProject/addProTask',data);
  }
  static getTaskProcess(projectId){
    return servers.connection('GET', '/charityProject/getTaskProcess',{projectId:projectId});
  }
}
