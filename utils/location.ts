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
