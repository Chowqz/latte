enum PromiseStatus {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

type Resolve<T = any> = (value: T) => void

type Reject = (reason?: any) => void

type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void

type OnFulfilled<T = unknown> = ((value: T) => unknown) | null | undefined

type OnRejected = ((reason: any) => unknown) | null | undefined

type onFinally = (() => void) | null | undefined

type Callback = () => void

class PromisePlus<T = unknown> {
  #status: PromiseStatus = PromiseStatus.PENDING
  #value: any = null
  #reason: any = undefined
  #onFulfilledCallbacks: Callback[] = []
  #onRejectedCallbacks: Callback[] = []

  constructor(executor: Executor<T>) {
    executor(this.#resolve.bind(this), this.#reject.bind(this))
  }

  #resolve(value: T) {
    if (this.#status === PromiseStatus.PENDING) {
      this.#status = PromiseStatus.FULFILLED
      this.#value = value
      this.#onFulfilledCallbacks.forEach(callback => {
        callback()
      })
    }
  }

  #reject(reason?: any) {
    if (this.#status === PromiseStatus.PENDING) {
      this.#status = PromiseStatus.REJECTED
      this.#reason = reason
      this.#onRejectedCallbacks.forEach(callback => {
        callback()
      })
    }
  }

  then(onFulfilled?: OnFulfilled<T>, onRejected?: OnRejected) {
    const promise = new PromisePlus((resolve, reject) => {
      if (this.#status === PromiseStatus.PENDING) {
        this.#onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            execFulfilledCallback(
              onFulfilled,
              this.#value,
              promise,
              resolve,
              reject,
            )
          })
        })
        this.#onRejectedCallbacks.push(() => {
          setTimeout(() => {
            execRejectedCallback(
              onRejected,
              this.#reason,
              promise,
              resolve,
              reject,
            )
          })
        })
      }
      if (this.#status === PromiseStatus.FULFILLED) {
        setTimeout(() => {
          execFulfilledCallback(
            onFulfilled,
            this.#value,
            promise,
            resolve,
            reject,
          )
        })
      }
      if (this.#status === PromiseStatus.REJECTED) {
        setTimeout(() => {
          execRejectedCallback(
            onRejected,
            this.#reason,
            promise,
            resolve,
            reject,
          )
        })
      }
    })
    return promise
  }

  catch(onRejected: OnRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally: onFinally) {
    return this.then(
      () => {
        onFinally?.()
      },
      () => {
        onFinally?.()
      },
    )
  }

  static resolve(value: any) {
    if (value instanceof PromisePlus) {
      return value
    } else if (
      value instanceof Object &&
      'then' in value &&
      typeof value.then === 'function'
    ) {
      return new PromisePlus(value.then)
    }
    return new PromisePlus(resolve => {
      resolve(value)
    })
  }

  static reject(reason?: any) {
    return new PromisePlus((resolve, reject) => {
      reject(reason)
    })
  }

  static all(promises: any[]) {
    return new PromisePlus((resolve, reject) => {
      if (Array.isArray(promises)) {
        const result: any[] = []
        let count = 0
        if (promises.length === 0) {
          return resolve(promises)
        }
        promises.forEach((item, index) => {
          PromisePlus.resolve(item).then((res: any) => {
            count++
            result[index] = res
            count === promises.length && resolve(result)
          }, reject)
        })
      } else {
        return reject(new TypeError('Argument is not iterable'))
      }
    })
  }

  static allSettled(promises: any[]) {
    return new PromisePlus((resolve, reject) => {
      if (Array.isArray(promises)) {
        const result: any[] = []
        let count = 0
        if (promises.length === 0) {
          return resolve(promises)
        }
        promises.forEach((item, index) => {
          PromisePlus.resolve(item).then(
            res => {
              count++
              result[index] = {
                status: PromiseStatus.FULFILLED,
                value: res,
              }
              count === promises.length && resolve(result)
            },
            err => {
              count++
              result[index] = {
                status: PromiseStatus.REJECTED,
                reason: err,
              }
              count === promises.length && resolve(result)
            },
          )
        })
      } else {
        return reject(new TypeError('Argument is not iterable'))
      }
    })
  }

  static any(promises: any[]) {
    return new PromisePlus((resolve, reject) => {
      if (Array.isArray(promises)) {
        if (promises.length === 0) {
          return reject(new AggregateError('All promises were rejected'))
        }
        const errors: any[] = []
        let count = 0
        promises.forEach((item, index) => {
          PromisePlus.resolve(item).then(resolve, (err: any) => {
            count++
            errors[index] = err
            count === promises.length && reject(new AggregateError(errors))
          })
        })
      } else {
        return reject(new TypeError('Argument is not iterable'))
      }
    })
  }

  static race(promises: any[]) {
    return new PromisePlus((resolve, reject) => {
      if (Array.isArray(promises)) {
        if (promises.length > 0) {
          promises.forEach(item => {
            PromisePlus.resolve(item).then(resolve, reject)
          })
        }
      } else {
        return reject(new TypeError('Argument is not iterable'))
      }
    })
  }
}

function execFulfilledCallback<T>(
  onFulfilled: OnFulfilled<T>,
  result: T,
  promise: PromisePlus,
  resolve: Resolve,
  reject: Reject,
) {
  try {
    if (typeof onFulfilled !== 'function') {
      resolve(result)
    } else {
      const x = onFulfilled(result)
      resolvePromise(promise, x, resolve, reject)
    }
  } catch (e) {
    reject(e)
  }
}

function execRejectedCallback(
  onRejected: OnRejected,
  reason: any,
  promise: PromisePlus,
  resolve: Resolve,
  reject: Reject,
) {
  try {
    if (typeof onRejected !== 'function') {
      reject(reason)
    } else {
      const x = onRejected(reason)
      resolvePromise(promise, x, resolve, reject)
    }
  } catch (e) {
    reject(e)
  }
}

function resolvePromise(
  promise: PromisePlus,
  x: any,
  resolve: Resolve,
  reject: Reject,
) {
  if (x === promise) {
    throw new TypeError('Chaining cycle detected for promise')
  }
  if (x instanceof PromisePlus) {
    x.then(res => {
      resolvePromise(promise, res, resolve, reject)
    }, reject)
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let then
    try {
      then = x.then
    } catch (e) {
      reject(e)
    }
    if (typeof then === 'function') {
      let called = false
      try {
        then.call(
          x,
          (res: any) => {
            if (called) return
            called = true
            resolvePromise(promise, res, resolve, reject)
          },
          (err: any) => {
            if (called) return
            called = true
            reject(err)
          },
        )
      } catch (e) {
        if (called) return
        called = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}

export default PromisePlus
