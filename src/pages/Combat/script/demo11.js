// ajax

const objToStr = (obj = {}) => {
  return Object.entries(obj)
    .map(([key, val]) => {
      return `${key}=${val}`
    })
    .join('&')
}

const ajax = props => {
  return new Promise((resolve, reject) => {
    try {
      const { url, method = 'GET', data, params, headers = {} } = props
      const xhr = new XMLHttpRequest()

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            console.log(xhr.statusText)
            reject(new Error(xhr.statusText))
          }
        }
      }

      xhr.onerror = err => {
        reject(new Error(err))
      }

      if (method === 'GET') {
        if (params) {
          const paramsStr = objToStr(params)
          xhr.open(method, url + '?' + paramsStr, true)
        } else {
          xhr.open(method, url, true)
        }
        Object.entries(headers).forEach(([key, val]) => {
          xhr.setRequestHeader(key, val)
        })
        xhr.send()
      }

      if (method === 'POST') {
        xhr.open(method, url, true)
        Object.entries(headers).forEach(([key, val]) => {
          xhr.setRequestHeader(key, val)
        })
        // 两种Content-type传参方式不一样
        // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        // xhr.send('a=1&b=2')
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    } catch (err) {
      reject(err)
    }
  })
}

ajax({
  url: 'https://food-admin.test.shopee.co.id/fe/config/menu_id.json',
  // params: {
  //   t: Date.now(),
  // },
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

ajax({
  url: 'https://foody.test.shopee.co.id/api/seller/food-ads/status/update',
  method: 'POST',
  data: {
    id: 123,
    name: 'test',
  },
  headers: {
    'X-SF-CSRF-Token': 'hello world',
  },
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
