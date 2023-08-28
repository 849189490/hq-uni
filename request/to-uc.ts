// import Cookie from 'js-cookie'
import { route } from '@/utils/location'
// import { isAndroid } from '@/utils/is-android'
// H5跳转登陆
export const toUcLogin = () => {
  const { wxSceneCode } = route.query()
  uni.reLaunch({
  	url: `/gamma-uc/h5/index.html#/${
  	localStorage.getItem('GAMMA-UC-LOGIN-TYPE') || 'loginToB'
    }?system=${
  	localStorage.getItem('GAMMA-UC-SYSTEM') || 'S20220104151854218R2222305613'
    }&orgCode=${localStorage.getItem('GAMMA-UC-ORGID') || '601'}&wxSceneCode=${
  	wxSceneCode || 'HQXCX'
    }&notWX=true`
  })
}

export const backToUc = () => {
  uni.reLaunch({
    url: `${location.origin}/gamma-uc/h5/index.html#/home`
  })
}