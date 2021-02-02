import {servers} from "../../tool/servers";
export class mainService{
  static requestHomepageData(){
    return servers.connection('GET','/charityProject/homepage');
  }
  static requestProjectDetail(data){
    return servers.connection('GET','/charityProject/projectDetail',data);
  }
  static requestDonate(data){
    return servers.connection('GET','/charityProject/requestDonate',data);
  }
  static submitDonate(data){
    return servers.connection('GET','/charityProject/submitDonate',data);
  }
  static requestMyDonationData(data){
    return servers.connection('POST','/user/myDonation',data);
  }
  static submitApplication(data,fileList){
    let files = [];
    for(var index in fileList){
      files.push(fileList[index].raw)
    }
    return servers.connection('POST','/charityProject/submitApplication',data,files);
  }

  static userHelpProjects(data) {
    return servers.connection('POST', '/charityProject/userHelpProjects',data);
  }
  //新增反馈
  static addFeedBack(data) {
    return servers.connection('POST', '/charityProject/addFeedBack',data);
  }
  //使用资金
  static useFund(data) {
    return servers.connection('POST', '/charityProject/useFund',data);
  }
  //推荐项目
  static recommendProjectsByCategoryId(data){
    return servers.connection('GET','/charityProject/recommendProjectsByCategoryId',data);
  }
}
