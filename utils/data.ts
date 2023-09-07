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
