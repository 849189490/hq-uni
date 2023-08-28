import type { Responce } from './types'
import { backToUc } from './to-uc'
import { decodeUCResponse, processResponse } from '@/utils/encrypt'
// 处理返回结果
export const responseHandle = (res: Responce, isMessage: boolean) => {
  if (`${res.code}` === '0000' || `${res.code}` === '0' || `${res.responseCode}` === '000000') {
    isMessage && uni.showToast({
      title: res.message
    })
    if (res.encode) {
      return decodeUCResponse(res.data)
    }
    if (res.responseData) {
      if (res.responseEncode) {
        return processResponse(res.responseData)
      }
      return res.responseData
    }
    return res.data
  } 
  if (`${res.respHeader}` && `${res.respHeader?.respCode}` === '200') {
    isMessage !== false && uni.showToast({
      title: res.respHeader!.respMsg
    })
    if (res.encode == true) {
      return decodeUCResponse(res.data)
    }
    return res.data
  }
  if (`${res.rtCode}` === 'E000000') {
    return res.resArr
  } else if (`${res.code}` === '9999') {
    const message =
      res.message || res.msg || res.retMessage || res.responseMessage || JSON.stringify(res)
    isMessage !== false && uni.showToast({
      title: message,
      icon: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(message)
  } else if (
    `${res.code}` === '9900' ||
    `${res.code}` === '-5' ||
    `${res.code}` === '000002' ||
    `${res.code}` === '000003' ||
    `${res.code}` === '000004'
  ) {
    backToUc()
    return
  } else {
    //处理接口异常
    const message =
      res.message || res.msg || res.retMessage || JSON.stringify(res)
    uni.showToast({
      title: message,
      icon: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(message)
  }
}

export const rejectHandle = (error: any) => {
  if (error.response) {
    if (
      (error.response.status && error.response.status === 504) ||
      error.message === 'Network Error' ||
      error.message === 'Request failed with status code 504' ||
      error.message === 'timeout of 15000ms exceeded'
    ) {
      error.message = 'NetworkError'
    } else if (
      typeof error === 'string' &&
      error.indexOf('Network Error') != -1
    ) {
      error = 'SystemError'
    } else if (error.response.status && error.response.status === 500) {
      error.message =
        (error.response.data && error.response.data.message) ||
        'public.UnknownError'
    }
    uni.showToast({
      title:
        error.message || error.response.message || error.response.data.message,
      icon: 'error',
      duration: 3 * 1000
    })
  } else if (error.request) {
    uni.showToast({
      title: 'NetworkError',
      icon: 'error',
      duration: 3 * 1000
    })
  } else {
    uni.showToast({
      title: error.message || 'public.SystemError',
      icon: 'error',
      duration: 3 * 1000
    })
  }
  return Promise.reject(error)
}
