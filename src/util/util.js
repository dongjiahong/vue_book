// 页面类型
export const FEATURED_PAGE = 'FEATURED'
export const SHELF_PAGE = 'SHELF'
export const RANK_PAGE = 'RANK'
export const CATEGORY_PAGE = 'CATEGORY'
export const BOOK_PAGE = 'BOOK'

// 图片路径
export const staticPath = 'http://statics.zhuishushenqi.com'

// 存储localStorage时设置前缀
const storePrefix = 'RM_'

// 存储localStorage
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  // localStorage是H5提供的一种在客户端存储数据的方法，还有一个是sessionStorage
  window.localStorage.setItem(storePrefix + name, content)
}

// 获取localStorage
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(storePrefix + name)
}

// 删除localStotage
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(storePrefix + name)
}

// 防止上下滑动时反跳
export const debounce = (fn, delay, timeout) => {
  let timer = null
  let last = new Date().getTime()
  delay = delay || 300
  timeout = timeout || 300
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
    if (new Date().getTime() > last + timeout) {
      fn.apply(this, [].slice.call(Array, arguments))
      last = new Date().getTime()
      clearTimeout(timer)
    }
  }
}
