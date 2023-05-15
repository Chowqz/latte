export type Callback = {
  (...args: any[]): void
  initialCallback?: (...args: any[]) => void
}

class EventEmitter {
  events: Record<string, Callback[]>

  constructor() {
    this.events = {}
  }

  on(type: string, callback: Callback) {
    if (this.events[type]) {
      this.events[type].push(callback)
    } else {
      this.events[type] = [callback]
    }
  }

  emit(type: string, ...args: any[]) {
    (this.events[type] || []).forEach(callback => {
      callback(...args)
    })
  }

  off(type: string, callback: Callback) {
    if (this.events[type]) {
      const index = this.events[type].findIndex(
        cb => cb === callback || cb.initialCallback === callback,
      )
      if (index !== -1) {
        this.events[type].splice(index, 1)
      }

      if (this.events[type].length === 0) {
        delete this.events[type]
      }
    }
  }

  once(type: string, callback: Callback) {
    const newCallback = (...args: any[]) => {
      callback(...args)
      this.off(type, newCallback)
    }

    newCallback.initialCallback = callback

    this.on(type, newCallback)
  }
}

export default EventEmitter
