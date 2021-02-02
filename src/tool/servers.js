import axios from 'axios'
import qs from 'qs'
import {Msg} from './message'
import {version} from '../../package'
export class BaseApi {
  servers;
  hot;
  constructor(hot) {
    this.hot = hot;
    this.servers = axios.create({
      baseURL: hot,
      timeout: 600000
    });
    this.servers.interceptors.request.use(function (config) {
      return config
    }, function (error) {

      return Promise.reject(error || '网络繁忙，请稍候再试！');
    });
    this.servers.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      let msg = '';
      if (error.response) {
        switch (error.response.status) {
          case 400:
            msg = error.response.data.message;
            break;
          case 500:
            msg = error.response.data.message;
            break;
          default:
            msg = '网络繁忙，请稍候再试！'
        }
      } else {
        msg = '网络繁忙，请稍候再试！'
      }
      return Promise.reject(error.response || '网络繁忙，请稍候再试！');
    })
  }
  /**
   * fetch
   * @param method
   * @param url
   * @param body
   * @returns {Promise<any>}
   */
  connection(method = 'GET', url, body, fileList, fileKey = 'files') {
    if (typeof body !== 'object') body = {};
    method = method.toLocaleLowerCase();
    if (fileList && (fileList instanceof Array)) {
      let headers = {'Content-Type': 'multipart/form-data'};
      const param = new window.FormData();
      for (const key in body) {
        if ({}.hasOwnProperty.call(body, key))
          param.append(key, body[key]);
      }

      fileList.forEach(file => param.append(fileKey, file));
      console.log(param.get(fileKey))
      return Promise.resolve(this.servers[method](url, param,{headers}))
    }
    if (method === 'get') {
      url = url + (url.indexOf('?') > 0 ? '&' : '?' + qs.stringify(body));
      body = {}
    }
    return Promise.resolve(this.servers[method](url, body))
  }
  // connection(method = 'GET', url, body) {
  //   if (typeof body !== 'object') body = {};
  //   method = method.toLocaleLowerCase();
  //   if (method === 'get') {
  //     url = url + (url.indexOf('?') > 0 ? '&' : '?' + qs.stringify(body));
  //     body = {}
  //   }
  //   return Promise.resolve(this.servers[method](url, body))
  // }
}

export const servers = new BaseApi('http://127.0.0.1:8080')

