type RecursivePartial<T> = T extends object
  ? {
      [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object
        ? RecursivePartial<T[P]>
        : T[P]
    }
  : any

export type Store = Record<string, any>

export type NamePath = string

export type ValidateError = {
  name: string
  value: any
  errors: string[]
}

export type Callbacks<Values = any> = {
  onValuesChange?: (changedValues: Store, allValues: Values) => void
  onFinish?: (values: Values) => void
  onFinishFailed?: (errors: ValidateError[]) => void
}

export type FormInstance<Values = any> = {
  registerFieldEntity: (enitty: any) => () => void
  setInitialValues: (values: RecursivePartial<Values>, initial: boolean) => void
  getFieldsValue: () => Values
  getFieldValue: <T extends keyof Values>(name: T) => Values[T]
  setFieldsValue: (values: RecursivePartial<Values>) => void
  setFieldValue: <T extends keyof Values>(name: T, value: Values[T]) => void
  setCallbacks: (callbacks: Callbacks) => void
  resetFields: <T extends keyof Values>(nameList?: T[]) => void
  submit: () => Promise<void>
}

export type FormProps<Values = any> = {
  form?: FormInstance<Values>
  children?: React.ReactElement | React.ReactElement[]
  initialValues?: Store
} & Callbacks<Values>
