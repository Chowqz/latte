// react this 指向问题原因

class Person {
  constructor(props) {
    this.name = props.name
    this.age = props.age
  }

  getName() {
    console.log(this)
    console.log(this.name)
  }

  getAge = () => {
    console.log(this)
    console.log(this.age)
  }
}

const person = new Person({
  name: 'React',
  age: 26,
})

const getAge = person.getAge
const getName = person.getName

getAge()
getName()

const man = {
  name: 'man',
  getName() {
    console.log(this)
    console.log(`name: '${this.name}'`)
  },
}

setTimeout(man.getName, 500)
