/* eslint-disable  */

export const debounce = (fn, delay, immediate) => {
  let timer = null
  return function (...args) {
    const context = this
    clearTimeout(timer)
    if (immediate) {
      if (!timer) {
        fn.apply(context, args)
        timer = setTimeout(() => {
          timer = null
        }, delay)
      } else {
        timer = setTimeout(() => {
          fn.apply(context, args)
          timer = null
        }, delay)
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }
}

export const throttle = (fn, delay) => {
  let timer = null
  return function (...args) {
    const context = this
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, delay)
    }
  }
}
