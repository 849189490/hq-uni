import Mockjs from 'mockjs'
import orderQueryData from './modules/order-query.data'
import orderRePaymentFlowscheduleData from './modules/order-re-payment-flow-schedule.data'

const Mock = (url: string | RegExp, response: Record<string, any>) => {
	const log = Mockjs.mock({
	  "string|1-10": "★"
	})
	console.log(log);
  return Mockjs.mock({
    message: 'success',
    code: '0',
    data: response
  })
}

export const useGammaApply = () => 
	Mock(/\/gamma-uc\/btp\/orderQuery/, orderQueryData)
	
export const useGammaORPaymentFlowschedule = () => 
	Mock(/\/gamma-uc\/btp\/orderRePaymentFlowSchedule/, orderRePaymentFlowscheduleData)

