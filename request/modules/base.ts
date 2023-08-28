import axios, { AxiosRequestConfig } from 'axios'
import { responseHandle, rejectHandle } from '../utils'
import type { Responce } from '../types'
import { processRequest } from '@/utils/encrypt'
import Cookie from 'js-cookie'
import adapter from 'axios-miniprogram-adapter'
import qs from 'qs'

const baseOptions: AxiosRequestConfig = {
  method: 'POST',
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: '*/*',
  },
  timeout: 300000,
  withCredentials: true,
  data: {},
  adapter
}
// params.isLoading 决定请求动画的展示，默认展示请求动画
// params.isError 决定是否使用默认的异常处理, 如果传入false则返回异常结果
// params.isToken 决定是否在参数中携带token
// T为请求出参数(response.data), D为请求入参(request.data的数据结构)
function request<T, D = any>(
  options: AxiosRequestConfig<D>,
  config: { isQs?: boolean, isEncrypt?: boolean, isLoading?: boolean; isError?: boolean; isToken?: boolean; isMessage?: boolean; back?: string; jxbClientId?: 'bBicsUser' | 'cBicsUser' } = {}
) {
  const token = uni.getStorageSync('token')
  const instance = axios.create({
    ...baseOptions,
    ...options,
    headers: {
      ...baseOptions.headers,
      ...(options.headers || {}),
      Authorization: token!,
      token: token!,
      jxbClientId: uni.getStorageSync('jxbClientId'),
      lang: 'zh-CN'
    }
  })
  const params = { isLoading: true, isError: true, isToken: true, ...config }
  instance.interceptors.request.use((req) => {
    if (params.isToken) {
      const token = uni.getStorageSync('token')
      if (req.method?.toLocaleLowerCase() === 'get') {
        req.params = { ...req.params, token }
      }
      if (req.method?.toLocaleLowerCase() === 'post') {
        req.params = { ...(req.params || {}), token }
        req.data = { ...req.data, token }
      }
    }
    if (params.isQs) {
      req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      req.data = qs.stringify(req.data)
    }
    if (params.isEncrypt) {
      req.data = processRequest(req.data, { req: true })
      console.log(req.data)
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
    async ({ data }) => {
      params.isLoading && uni.hideLoading()
      const res = await responseHandle(data, params.isMessage!)
      return res
    },
    async (err) => {
      params.isLoading && uni.hideLoading()
      const error = await rejectHandle(err)
      return error
    }
  )
  return instance(options) as unknown as Promise<T & Responce>
}

export { request, request as default }
