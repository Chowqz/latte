export class Observer {
  name: string
  constructor(name: string) {
    this.name = name
  }
  update() {
    console.log(`${this.name} updated`)
  }
}

export class Subject {
  observers: Observer[]
  constructor() {
    this.observers = []
  }

  add(observer: Observer) {
    if (!(observer instanceof Observer)) {
      throw new TypeError('observer is invalid')
    }
    this.observers.push(observer)
  }

  remove(observer: Observer) {
    const index = this.observers.findIndex(item => item === observer)
    if (index !== -1) {
      this.observers.splice(index, 1)
    }
  }

  notify() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}
