// const reg = /[1-9][a-z]+/g

// const str = '123456runoob123runoob456'

// const n =str.match(reg)
// console.log(n)

let str = 'google\nrunoob\ntaobao'
let n1 = str.match(/google./) // 没有使用 s，无法匹配\n
let n2 = str.match(/runoob./gs) // 使用 s，匹配\n

console.log(n1)
console.log(n2)

class A {}

class B extends A {}

const b = new B()

console.log(b.__proto__ === B.prototype)
