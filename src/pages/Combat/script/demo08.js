/* eslint-disable */
// forEach/map/filter/some/every/reduce

Array.prototype.myForEach = function (fn, thisValue) {
  const arr = this
  const len = arr.length
  for (let i = 0; i < len; i++) {
    fn.call(thisValue, arr[i], i, arr)
  }
}

Array.prototype.myMap = function (fn, thisValue) {
  const arr = this
  const len = arr.length
  const res = []
  for (let i = 0; i < len; i++) {
    if (i in arr) {
      res[i] = fn.call(thisValue, arr[i], i, arr)
    }
  }
  return res
}

Array.prototype.myFilter = function (fn, thisValue) {
  const arr = this
  const len = arr.length
  const res = []
  for (let i = 0; i < len; i++) {
    const result = fn.call(thisValue, arr[i], i, arr)
    if (result) {
      res.push(arr[i])
    }
  }
  return res
}

Array.prototype.mySome = function (fn, thisValue) {
  const arr = this
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const result = fn.call(thisValue, arr[i], i, arr)
    if (result) {
      return true
    }
  }
  return false
}

Array.prototype.myEvery = function (fn, thisValue) {
  const arr = this
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const result = fn.call(thisValue, arr[i], i, arr)
    if (!result) {
      return false
    }
  }
  return true
}

Array.prototype.myReduce = function (fn, initialValue) {
  const arr = this
  const len = arr.length
  let total,
    i = 0
  if (arguments.length > 1) {
    total = initialValue
  } else {
    while (i < len && !(i in arr)) {
      i++
    }
    if (i == len) {
      throw new TypeError('Reduce of empty array with no initial value')
    }
    total = arr[i++]
  }
  while (i < len) {
    if (i in arr) {
      total = fn(total, arr[i], i, arr)
    }
    i++
  }
  return total
}

const arr = [1, 2, 3, 4, 5]

// arr.myForEach(function(item, index, array) {
//   console.log(item, index, array)
//   console.log(this)
// }, 'test')

// const res1 = [, 1].myMap(function(item, index, array) {
//   console.log(item, index, array)
//   console.log(this)
//   return {
//     item, index
//   }
// }, 'ctx')

// console.log(res1)

// const res2 = arr.myFilter(function(item, index, array) {
//   console.log(item)
//   return index === 2
// }, 'ctx')

// console.log(res2)

// const res3 = arr.mySome(function(item, index, array) {
//   return index > 3
// }, 'ctx')

// console.log(res3)

// const res4 = arr.myEvery(function(item, index, array) {
//   return index < 5
// }, 'ctx')

// console.log(res4)

const res5 = [, 2, ,].myReduce((total, cur) => {
  console.log(cur)
  return total + cur
})
console.log(res5)
