import request from '@/utils/request'
import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://172.10.0.96:8019', // url = base url + request url
  // baseURL: 'http://172.10.0.130:8019', //杜远天本地
  // baseURL: 'http://172.10.0.26:8019', //周武本地

  timeout: 60000, // request timeout
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export function getUserList(params) {
  return request({
    url: '/user/getUserList',
    method: 'post',
    params
  })
}

export default {
  get(url, params) {
    return request({
      url,
      method: 'get',
      params
    })
  },
  post(url, params) {
    return request({
      url,
      method: 'post',
      params
    })
  },
  /*文件导入*/
  filePost(url, params, header) {
    return request.post(url, params, header)
  },
  /*文件导出*/
  fileGet(url, params, header) {
    return request({
      method: 'get',
      url: url,
      params: params,
      responseType: 'blob'
    })
  },

  /*模板下载*/
  exportExcel(data, tableName) {
    if (!data) {
      return
    }
    let blob = new Blob([data], { type: 'application/vnd.ms-excel' })
    let xlsxName = tableName + '.xls'
    if (window.navigator.msSaveOrOpenBlob) {
      //兼容ie
      window.navigator.msSaveOrOpenBlob(blob, xlsxName)
    }
    let url = window.URL.createObjectURL(blob)
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', xlsxName)
    document.body.appendChild(link)
    link.click()
  }
}
