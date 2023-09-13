import Mockjs from 'mockjs'

//调用sdk关闭所有页面方法
export function closeAllPage() {
  // H5Bridge.call(
  //   'closeAllPage',
  //   null,
  //   (data) => {
  //     alert(JSON.stringify(data))
  //   },
  //   (err) => {
  //     alert(JSON.stringify(err))
  //   },
  //   null,
  //   'SmartLoanNavigationbarPlugin'
  // )
}

export const route = {
  query: () => {
    const search = location.hash?.split('?')[1] ?? ''
    const mapper: Record<string, string> = search
      .split('&')
      .reduce((pre, cur) => {
        const [key, value] = cur.split('=')
        return { ...pre, [key]: value }
      }, {})
    return mapper
  }
}

export const Mock = (url: string | RegExp, response: Record<string, any>) => {
  Mockjs.mock(url, 'get', () => ({
    message: 'success',
    code: '0',
    data: response
  }))
}

export const toThousands = (num,length) => {
	if(!num&&num!=0) return '--';//转化不了的返回-
	num = num+"";
	if(num.indexOf(".")>-1){
			var s = num.split(".")[0];
			var n = num.split(".")[1];
			if(length!=undefined){
				n = n.substr(0,length)
				for(let i = n.length;i<length;i++){
					n = ''+ n + '0';
				}
			}
			if(length===0){
				return (s || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
			}
			return (s || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')+"."+n; 
	}else{
		if(length){
			return Number(num||0).toFixed(length);
		}else{
			return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); 
		}
	}
}