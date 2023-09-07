import request from '@/request'

export function logout(data) {
  return request({
    url: "/gamma-qqd/wx/nologin/logout.do",
    method: "POST",
		data
  }, {
    isEncrypt: true
  });
}
export function cancellation(data?: any) {
  return request({
    url: "/gamma-uc/uc/cancel",
    method: "POST",
		data
  }, {
    isEncrypt: true
  });
}
