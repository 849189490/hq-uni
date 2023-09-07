import request from '@/request'
import { loadRequest } from '@/request'

// 客户经理列表
export function getJlList() {
  return request({
    url: "/gamma-uc/uc/queryManagerList",
    method: "GET"
  }, {
    isEncrypt: true
  });
}
// 借款记录
export function orderQuery(data?: any) {
  return request({
    url: "/gamma-uc/btp/orderQuery",
    method: "POST",
		data
  }, {
    isEncrypt: true
  });
}
// 先加签
export async function querySign(data) {
  return request({
		url: "/gamma-uc/mgr/nologin/media/sign", 
    method: "GET",
    data,
  }, {
    isEncrypt: true
  });
}
// 使用上传下载接口之前先调用 

export function getTicket(data) {
  console.log('===============');
  // console.log(getDataFromLocalStorage('fpsUrl'));
	const url = localStorage.getItem('fpsUrl') || "" + "/ticket";
	
  return loadRequest({
		url: url + "/ticket", 
    method: "GET",
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true,
    data
  });
}
// 上传
export function largeFileUpload(data) {
	const url = localStorage.getItem('fpsUrl') || "";
  return loadRequest({
		url: url + "/large-file/upload",
    method: "POST",
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data;boundary=---------QWERASDF--------'
    },
    withCredentials: true,
    data
  });
}

// 头像图片上传转存
export function uploadImg(data) {
  return request({
    url: "/gamma-uc/uc/uploadImg",
    method: "POST",
    data
  });
}
 // 获取合同列表
export function getMyContract(data?: any) {
	return request({
		url: "/gamma-uc/uc/myContract",
		method: 'POST',
		data
	})
}
// 获取结清证明
export function mySettleProof(data?: any) {
	return request({
		url: "/gamma-uc/uc/querySettleProof",
		method: 'GET',
		data
	})
}

export const getTicket1 = async (data) => {
  return request({
    url: "/gamma-postloan/noLogin/fps/getTicket.do",
    method: 'POST',
    data,
  })
}