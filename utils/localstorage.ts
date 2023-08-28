export const LS = {
  setItem: (key: string, value: any) => {
    uni.setStorageSync(key, JSON.stringify(value))
  },
  getItem: (key: string) => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key)
  },
  clear: () => {
    localStorage.clear()
  },
  merge (key: string, newValue: Record<string, any>) {
    const oldValue = this.getItem(key) ?? {}
    if (!(oldValue instanceof Object) || !(newValue instanceof Object)) {
      console.warn('LS.merge 需要传入对象！')
      return
    }
    this.setItem(key, { ...oldValue, ...newValue })
  }
}