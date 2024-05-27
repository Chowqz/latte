// deepClone
// 借鉴 https://juejin.cn/post/6844903929705136141?searchId=202405131834407BB41E05016F53158815

// 可遍历数据类型
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'

// 不可遍历数据类型
const boolTag = '[object Booloean]'
const dateTag = '[object Date]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'
const regexpTag = '[object Regexp]'
const funcTag = '[object Function]'

const iterableTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

// 自定义遍历函数 - while执行效率比for和for in高
function forEach(array, iterator) {
  const len = array.length
  let index = 0
  while (index < len) {
    iterator(array[index], index)
    index++
  }
}

// 判断是否是引用数据类型
function isObject(data) {
  const type = typeof data
  return data !== null && (type === 'object' || type === 'function')
}

// 获取数据类型
function getDataType(data) {
  return Object.prototype.toString.call(data)
}

// 通过构造函数的方式初始化被克隆的对象
function getInit(data) {
  const Constructor = data.constructor
  return new Constructor()
}

// 克隆Symbol数据类型
function cloneSymbol(data) {
  return Object(Symbol.prototype.valueOf.call(data))
}

// 克隆正则对象
function cloneRegexp(data) {
  const reFlags = /w*$/
  const result = new data.constructor(data.source, reFlags.exec(data))
  result.lastIndex = data.lastIndex
  return result
}

// 判断是否是箭头函数
function isArrowFunction(fn) {
  return /^\s*\(?.*=>/.test(fn.toString())
}

// 克隆函数
function cloneFunction(fn) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const fnString = fn.toString()
  console.log(fnString)
  console.log(isArrowFunction(fn))
  if (isArrowFunction(fn)) {
    return eval(fnString)
  } else {
    const param = paramReg.exec(fnString)
    const body = bodyReg.exec(fnString)
    if (body) {
      if (param) {
        const paramArr = param[0].split(',')
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  }
}

function cloneOtherType(data, dataType) {
  const Ctor = data.constructor
  switch (dataType) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(data)
    case regexpTag:
      return cloneRegexp(data)
    case symbolTag:
      return cloneSymbol(data)
    case funcTag:
      return cloneFunction(data)
    default:
      return null
  }
}

function deepClone(data, map = new WeakMap()) {
  if (!isObject(data)) {
    return data
  }

  const dataType = getDataType(data)
  let cloneTarget
  if (iterableTag.includes(dataType)) {
    cloneTarget = getInit(data)
  } else {
    return cloneOtherType(data, dataType)
  }
  if (map.has(data)) {
    return data
  }

  map.set(data, cloneTarget)
  if (dataType === setTag) {
    data.forEach(val => {
      cloneTarget.add(deepClone(val, map))
    })
    return cloneTarget
  }

  if (dataType === mapTag) {
    data.forEach((val, key) => {
      cloneTarget.set(key, deepClone(val, map))
    })
    return cloneTarget
  }

  if (dataType === arrayTag) {
    forEach(data, (item, index) => {
      cloneTarget[index] = deepClone(item, map)
    })
  }

  if (dataType === objectTag) {
    const keys = Object.keys(data)
    forEach(keys, key => {
      console.log(key)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cloneTarget[key] = deepClone(data[key], map)
    })
  }
  return data
}

const map = new Map()
map.set('key', 'value')
map.set('ConardLi', 'code秘密花园')

const set = new Set()
set.add('ConardLi')
set.add('code秘密花园')

const target = {
  boolean: false,
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log('code秘密花园')
  },
  // eslint-disable-next-line func-names
  func2: function (a, b) {
    return a + b
  },
  func3(str) {
    return str
  },
}

target.myTarget = target
console.log(target)

console.log(deepClone(target))
