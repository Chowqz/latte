// instanceof

const myInstanceof = (left, right) => {
  let leftProto = left.__proto__
  while (true) {
    if (leftProto === null) {
      return false
    }
    if (leftProto === right.prototype) {
      return true
    }
    leftProto = leftProto.__proto__
  }
}

function Person() {
  this.name = 'Person'
}

function Man() {
  this.age = 26
}

// Man.prototype = new Person()

const test = new Man()

console.log(test instanceof Object)
console.log(myInstanceof(test, Man))

console.log(test)
console.log(test.__proto__ === Object.prototype)
console.log(Person.prototype instanceof Object)
