import request from '@/utils/request'

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
  filePost(url, params,header) {
    return request.get(url, params, header)
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
    console.log(url)
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', xlsxName)
    document.body.appendChild(link)
    link.click()
  }
}
