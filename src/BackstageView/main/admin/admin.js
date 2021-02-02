import {servers} from "../../../tool/servers";
export class AdminService {
  static getAdmins(data) {
    return servers.connection('POST', '/charityProject/projects',data);
  }
}
