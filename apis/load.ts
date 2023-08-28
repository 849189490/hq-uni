import { loadRequest } from '@/request'
import Cookie from 'js-cookie'
// 拼接图片和pdf下载路径
export function fileDownload(params) {
  // const url = sessionStorage.getItem('fileBaseUrl') || ''
  return `/gamma-ias/file/download/${params.id}?token=${Cookie.get(
    'token'
  )}&type=${params.type}`
}
// 新上传-ias系统专用
export function newUpload(data) {
  // const baseURL = sessionStorage.getItem('fileBaseUrl') || ''
  return loadRequest({
    // baseURL,
    url: '/gamma-ias/file/upload',
    method: 'post',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data;boundary=---------QWERASDF--------'
    },
    withCredentials: true,
    data
  })
}
