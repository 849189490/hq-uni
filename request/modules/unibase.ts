// import { RequestOptions } from '@dcloudio/uni-app'
import { responseHandle, rejectHandle } from '../utils'
import type { Responce } from '../types'
import { processRequest } from '@/utils/encrypt'
import qs from 'qs'
const baseURL = 'https://loan.szhqxd.com'
const baseOptions : UniApp.RequestOptions = {
  method: 'POST',
  header: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: '*/*',
  },
  timeout: 300000,
  withCredentials: true,
  data: {},
  url: ''
}
// params.isLoading 决定请求动画的展示，默认展示请求动画
// params.isError 决定是否使用默认的异常处理, 如果传入false则返回异常结果
// params.isToken 决定是否在参数中携带token
// T为请求出参数(response.data), D为请求入参(request.data的数据结构)
async function request(options : UniApp.RequestOptions, config : { isQs ?: boolean, isEncrypt ?: boolean, isLoading ?: boolean; isError ?: boolean; isToken ?: boolean; isMessage ?: boolean; back ?: string; jxbClientId ?: 'bBicsUser' | 'cBicsUser' } = {}) {
  const token = uni.getStorageSync('token')
  const payload = {
    ...baseOptions,
    ...options,
    url: `${baseURL}${options.url}`,
    header: {
      ...baseOptions.header,
      ...(options.header || {}),
      Authorization: token!,
      token: token!,
      jxbClientId: uni.getStorageSync('jxbClientId'),
      lang: 'zh-CN'
    }
  }
  const params = { isLoading: true, isError: true, isToken: true, ...config }
  try {
    if (params.isToken) {
      const token = uni.getStorageSync('token')
      payload.data = { ...payload.data as any as Record<string, any>, token }
    }
    if (params.isQs) {
      payload.header['Content-Type'] = 'application/x-www-form-urlencoded'
      payload.data = qs.stringify(payload.data)
    }
    if (params.isEncrypt) {
      payload.data = processRequest(payload.data, { req: true })
      console.log(payload.data)
    }
    if (params.isLoading) {
      uni.showLoading({
        title: '全力加载中...',
        mask: true
      })
    }
    console.log(payload)
    const data = await uni.request(payload)
    params.isLoading && uni.hideLoading()
    console.log('------', data)
    const res = await responseHandle(data.data, params.isMessage!)
    return res
  } catch (e) {
    params.isLoading && uni.hideLoading()
    const error = await rejectHandle(e)
    return error
  }
}

export { request, request as default }