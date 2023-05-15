import BigNumber from 'bignumber.js'

export enum Status {
  Fulfilled = 'fulfilled', // 执行成功
  Rejected = 'rejected', // 执行失败
  Terminated = 'terminated', // 执行被中断（当其中一个任务出现错误，autoInterrupt为true时，不执行剩余的未执行任务）
}

export type ExecResult = {
  status: Status
  value?: any
  reason?: any
}

export type SchedulerResult = Map<number, ExecResult>

export type TaskQueueItem = [number, () => Promise<unknown>]

export type TaskQueue = TaskQueueItem[]

export type TaskPool = Map<number, Promise<unknown>>

type TaskFunc = (...args: any[]) => any

export type TaskItem = [taskFunc: TaskFunc, ...args: any[]]

export type TaskList = TaskItem[]

export type OnProgressChangeParams = {
  total: number // 总任务数量
  progress: number // 进度百分比
  fulfilledCount: number // 成功响应的任务数量
  rejectCount: number // 失败响应的任务数量
  terminatedCount: number // 提前中止时没执行的任务数量
  pendingCount: number // 等待执行的任务数量
  ongoingCount: number // 正在执行中的任务数量
}

export type OnProgressChange =
  | ((params?: OnProgressChangeParams) => void)
  | undefined

export interface SchedulerProps {
  autoInterrupt?: boolean // 当其中一个任务出现错误，是否自动中断，不执行剩余的未执行任务
  maxExecCount?: number // 最大可同时执行的任务数，默认是Infinity，即所有任务同时执行，设置为1时，相当于任务顺序串行去每次执行一个
  onProgressChange?: OnProgressChange // 进度发生变化时处理函数
}

class Scheduler {
  taskQueue: TaskQueue = []

  taskPool: TaskPool = new Map()

  incrementId: number = 0

  execResult: SchedulerResult = new Map()

  autoInterrupt: boolean = false

  maxExecCount: number = Infinity

  hasError: boolean = false

  isRunning: boolean = false

  onProgressChange: OnProgressChange = undefined

  constructor(props?: SchedulerProps) {
    const {
      autoInterrupt = false,
      maxExecCount = Infinity,
      onProgressChange,
    } = props || {}
    this.autoInterrupt = autoInterrupt
    this.maxExecCount = maxExecCount
    this.setOnProgressChange(onProgressChange)
  }

  addTask(taskList: TaskList) {
    if (this.isRunning) {
      // eslint-disable-next-line no-console
      console.error(
        new Error(
          'There are some tasks on current task queue, can not add task now.',
        ),
      )
      return
    }
    taskList.forEach(item => {
      const [func, ...args] = item
      this.incrementId++
      const taskId = this.incrementId
      const taskWithPromise = () => {
        return Promise.resolve(func(...args))
          .then(res => {
            this.execResult.set(taskId, {
              status: Status.Fulfilled,
              value: res,
            })
          })
          .catch(err => {
            this.hasError = true
            this.execResult.set(taskId, {
              status: Status.Rejected,
              reason: err,
            })
          })
      }
      this.taskQueue.push([taskId, taskWithPromise])
    })
  }

  async exec() {
    if (this.isRunning) {
      // eslint-disable-next-line no-console
      console.error(
        new Error('Task queue is running now, please don\'t execute repeatly.'),
      )
      return Promise.reject(
        new Error('Task queue is running now, please don\'t execute repeatly.'),
      )
    }
    this.isRunning = true
    while (this.taskQueue.length) {
      if (this.hasError && this.autoInterrupt) {
        this.taskQueue.forEach(item => {
          this.execResult.set(item[0], {
            status: Status.Terminated,
          })
        })
        this.taskQueue = []
        this.updateProgress()
        break
      }

      if (this.taskPool.size < this.maxExecCount) {
        const item = this.taskQueue.shift()
        const [taskId, task] = item!
        const promise = task()
        this.taskPool.set(taskId, promise)
        promise.then(() => {
          this.taskPool.delete(taskId)
          this.updateProgress()
        })
      } else {
        await Promise.race([...this.taskPool.values()])
      }
    }
    await Promise.all([...this.taskPool.values()])

    const result = this.getResult()
    this.reset()
    return result
  }

  getResult() {
    // 按队列顺序返回所有task执行的结果
    return [...this.execResult].sort((a, b) => a[0] - b[0]).map(item => item[1])
  }

  setOnProgressChange(val: OnProgressChange) {
    if (val !== undefined && typeof val !== 'function') {
      throw new TypeError('onProgressChange should be a function or undfined')
    } else {
      this.onProgressChange = val
    }
  }

  updateProgress() {
    if (typeof this.onProgressChange === 'function') {
      const execResultList = [...this.execResult.values()]
      const total =
        this.execResult.size + this.taskPool.size + this.taskQueue.length
      const progress = new BigNumber(this.execResult.size)
        .div(total)
        .times(100)
        .dp(2)
        .toNumber()
      const fulfilledCount = execResultList.filter(
        item => item.status === Status.Fulfilled,
      ).length
      const rejectCount = execResultList.filter(
        item => item.status === Status.Rejected,
      ).length
      const terminatedCount = execResultList.filter(
        item => item.status === Status.Terminated,
      ).length
      const pendingCount = this.taskQueue.length
      const ongoingCount = this.taskPool.size
      this.onProgressChange({
        total,
        progress,
        fulfilledCount,
        rejectCount,
        terminatedCount,
        pendingCount,
        ongoingCount,
      })
    }
  }

  reset() {
    this.taskQueue = []
    this.taskPool.clear()
    this.execResult.clear()
    this.isRunning = false
    this.hasError = false
  }
}

export class Sleeper {
  sleepingPromise: Promise<unknown>
  sleepResolve: () => void
  isSleeping: boolean

  constructor() {
    this.sleepingPromise = Promise.resolve()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.sleepResolve = () => {}
    this.isSleeping = false
  }

  fallAsleep() {
    if (!this.isSleeping) {
      this.isSleeping = true
      this.sleepingPromise = new Promise(resolve => {
        this.sleepResolve = () => {
          resolve(undefined)
        }
      })
    }
  }

  wakeUp() {
    if (this.isSleeping) {
      this.isSleeping = false
      this.sleepResolve()
    }
  }

  sleeping() {
    return this.sleepingPromise
  }
}

export default Scheduler
