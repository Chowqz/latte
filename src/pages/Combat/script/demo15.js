// jsonp原理

let jsonpId = 0

const Jsonp = options => {
  const { url, params = {}, callback } = options
  const scriptNode = document.createElement('script')

  const fnName = `jsonpCallback${jsonpId++}`
  const data = {
    ...params,
    jsonpCallback: fnName,
  }

  const paramsStr = Object.entries(data)
    .map(([key, val]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    })
    .join('&')

  scriptNode.src = `${url}${paramsStr && '?'}${paramsStr}`

  window[fnName] = res => {
    callback && callback(res)
    document.body.removeChild(scriptNode)
    delete window[fnName]
  }

  scriptNode.onerror = err => {
    callback && callback(undefined, err)
    // document.body.removeChild(scriptNode)
    delete window[fnName]
  }

  document.body.appendChild(scriptNode)
}

Jsonp({
  url: 'http://chowqz/jsonp_api',
  callback: (res, err) => {
    if (res) {
      console.log(res)
    } else {
      console.log(err)
    }
  },
})

Jsonp({
  url: 'http://chowqz/jsonp_api',
  params: {
    id: 26,
    name: 'chowqz',
  },
  callback: (res, err) => {
    if (res) {
      console.log(res)
    } else {
      console.log(err)
    }
  },
})
