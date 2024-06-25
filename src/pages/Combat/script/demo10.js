// 驼峰转下划线
const decamelize = str => {
  return str.replace(/[A-Z]/g, i => {
    return '_' + i.toLowerCase()
  })
}

// 下划线转驼峰
const camelize = str => {
  return str.replace(/_[a-z]/g, i => {
    return i.slice(1).toUpperCase()
  })
}

const str1 = decamelize('getElementById')
console.log(str1)

const str2 = camelize('user_name')
console.log(str2)

console.log(decamelize('Age'))
console.log(camelize('Age'))

const decamelizeKeys = data => {
  if (data instanceof Array) {
    return data.map(decamelizeKeys)
  }
  if (Object.prototype.toString.call(data) === '[object Object]') {
    return Object.entries(data).reduce((total, [key, val]) => {
      const newKey = decamelize(key)
      total[newKey] = decamelizeKeys(val)
      return total
    }, {})
  }
  return data
}

const camelizeKeys = data => {
  if (data instanceof Array) {
    return data.map(camelizeKeys)
  }
  if (Object.prototype.toString.call(data) === '[object Object]') {
    return Object.entries(data).reduce((total, [key, val]) => {
      const newKey = camelize(key)
      total[newKey] = camelizeKeys(val)
      return total
    }, {})
  }
  return data
}

const obj = {
  userName: 'test',
  age: 26,
  children: [
    {
      userName: 'child_01',
      age: 1,
    },
    {
      userName: 'child_01',
      age: 1,
    },
  ],
  wife: {
    userName: 'wife',
    tech: {
      fe: {
        javaScript: 1,
        nodeJs: 2,
      },
    },
    food: ['cake', 'coffee', 'cookie'],
  },
}

console.log(decamelizeKeys('hello world'))

const obj1 = decamelizeKeys(obj)
console.log(obj1)

console.log(camelizeKeys(obj1))
