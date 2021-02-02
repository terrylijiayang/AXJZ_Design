import {servers} from "../../../tool/servers";

export class projectManagementService{
  static findAllProjects(){
    return servers.connection('GET','/employee/findAllProjects');
  }
  static findPendingReviewProjects(){
    return servers.connection('GET','/employee/findPendingReviewProjects');
  }
  //查询所有具有审核慈善信息权限的管理员
  static findAllOperators(data){
    return servers.connection('GET','/employee/findAllCharityProjectOperators',data);
  }
  static findProject(data){
    return servers.connection('GET','/employee/findProject',data);
  }
  static updateProject(data){
    return servers.connection('POST','/employee/updateProject',data);
  }
  static findUnderReviewProjects(data){
    return servers.connection('GET','/employee/findUnderReviewProjects',data);
  }

  static reviewPassed(data){
    return servers.connection('POST','/employee/projectReviewPassed',data);
  }
  static reviewNotPassed(data){
    return servers.connection('POST','/employee/projectReviewNotPassed',data);
  }
  static addProjectAsRecommend(data){
    return servers.connection('GET','/employee/addProjectAsRecommend',data);
  }
}
