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
  post(url,params){
    console.log('post');
    
    console.log(params);
    
    return request({
      url,
      method: 'post',
      params
    })
  }
}
