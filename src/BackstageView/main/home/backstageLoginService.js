import {servers} from "../../../tool/servers";

export class BackService {
  static MenuData() {
    return servers.connection('GET', '/user/getAllMenu');
  }
  static getRoleAllMenu(data) {
    return servers.connection('GET', '/user/getRoleAllMenu',data);
  }
  static getBackHome() {
    return servers.connection('GET', '/charityProject/getBackHome');
  }
  static getSixMonth() {
    return servers.connection('GET', '/charityProject/getSixMonth');
  }
  static getDonationNums() {
    return servers.connection('GET', '/charityProject/getDonationNums');
  }
  static getDonationnRatio() {
    return servers.connection('GET', '/charityProject/getDonationnRatio');
  }

}
