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
    return servers.connection('GET','/user/myDonation',data);
  }
  static submitApplication(data){
    return servers.connection('POST','/charityProject/submitApplication',data);
  }
}
