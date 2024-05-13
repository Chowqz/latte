/* eslint-disable */

Function.prototype.myCall = function (context, ...args) {
  const fn = this
  const fnName = Symbol()
  context[fnName] = fn
  const result = context[fnName](...args)
  delete context[fnName]
  return result
}

Function.prototype.myApply = function (context, args) {
  const fn = this
  const fnName = Symbol()
  context[fnName] = fn
  const result = context[fnName](...args)
  delete context[fnName]
  return result
}

Function.prototype.myBind = function (context, ...args) {
  const fn = this

  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.myApply(context, [...args, ...newFnArgs])
  }
}

const a = {
  name: 'a',
  getName: function (x, y) {
    console.log(this)
    console.log(this.name)
    return x + y
  },
}

const b = {
  name: 'b',
}

// const callRes = a.getName.myCall(b, 1 , 2)
// console.log(callRes)

// const applyRes = a.getName.myApply(b, [2, 3])
// console.log(applyRes)

// const fun = a.getName.myBind(b, 4)
// const bindRes = fun(5)
// console.log(bindRes)

// const newFn = new fun(6)
// console.log(newFn)

// const c = 1
// // c.toString.call(null)
// var name = 'name'
// a.getName.myCall(undefined, 5, 6)

const getName = a.getName
getName(1, 2)
