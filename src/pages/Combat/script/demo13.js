// 新增迭代器方法

// Object.prototype[Symbol.iterator] = function SymbolIterator() {
//   let index = 0
//   const values = Object.values(this)
//   return {
//     next() {
//       if(index < values.length) {
//         return {
//           done: false,
//           value: values[index++],
//         }
//       }
//       return {
//         done: true,
//         value: undefined,
//       }
//     },
//   }
// }

const obj = {
  a: 1,
  b: 2,
  [Symbol.iterator]() {
    let index = 0
    const values = Object.values(this)
    return {
      next() {
        if (index < values.length) {
          return {
            value: values[index++],
            done: false,
          }
        }
        return {
          value: undefined,
          done: true,
        }
      },
    }
  },
}

const [a, b] = obj
console.log(a, b)

for (let item in obj) {
  console.log(item)
}

const iterator = [2, 3, 4][Symbol.iterator]()
for (let i = 0; i < 5; i++) {
  console.log(iterator.next())
}
