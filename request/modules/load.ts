import axios, { AxiosRequestConfig } from 'axios'
import { rejectHandle } from '../utils'
import type { Responce } from '../types'
import Cookie from 'js-cookie'
const baseOptions: AxiosRequestConfig = {
  method: 'POST',
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: '*/*'
  },
  timeout: 300000,
  withCredentials: true,
  data: {}
}
// params.isLoading 决定请求动画的展示，默认展示请求动画
// params.isError 决定是否使用默认的异常处理, 如果传入false则返回异常结果
// params.isToken 决定是否在参数中携带token
// T为请求出参数(response.data), D为请求入参(request.data的数据结构)
function loadRequest<T, D = any>(
  options: AxiosRequestConfig<D>,
  config: { isLoading?: boolean; isError?: boolean; isToken?: boolean } = {}
) {
  const instance = axios.create({
    ...baseOptions,
    ...options
  })
  const params = { isLoading: true, isError: true, isToken: false, ...config }
  instance.interceptors.request.use((req) => {
    console.log('req', req)
    
    if (params.isToken) {
      if (req.method?.toLocaleLowerCase() === 'get') {
        req.params = { ...req.params, token: Cookie.get('token') }
      }
      if (req.method?.toLocaleLowerCase() === 'post') {
        req.data = { ...req.data, token: Cookie.get('token') }
      }
    }
    if (params.isLoading) {
      uni.showLoading({
        title: '全力加载中...',
        mask: true
      })
    }
    return req
  })
  instance.interceptors.response.use(
    ({ data }) => {
      params.isLoading && uni.hideLoading()
      return data
    },
    (err) => {
      params.isLoading && uni.hideLoading()
      return rejectHandle(err)
    }
  )
  return instance(options) as unknown as Promise<T & Responce>
}
export { loadRequest, loadRequest as default }
