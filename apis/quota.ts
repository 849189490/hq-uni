import request from '@/request'

// 还款计划
export function repayQuery(data?: any) {
  return request({
    url: "/gamma-uc/btp/repayQuery",
    method: "POST",
		data
  }, {
    isEncrypt: true
  });
}
