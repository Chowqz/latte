/* eslint-disable no-useless-constructor */
import Schema, { Rules } from 'async-validator'
import { useRef } from 'react'
import {
  Store,
  FormInstance,
  Callbacks,
  NamePath,
  ValidateError,
} from './Form.d'
import FormItem from './FormItem'

class FormStore {
  private store: Store

  private initialValues: Store

  private fieldsEntity: FormItem[]

  private callbacks: Callbacks

  constructor() {
    this.store = {}
    this.initialValues = {}
    this.fieldsEntity = []
    this.callbacks = {}
  }

  registerFieldEntity(fieldEntity: FormItem) {
    this.fieldsEntity.push(fieldEntity)
    const { name } = fieldEntity.props
    this.store[name] = undefined
    return () => {
      this.fieldsEntity = this.fieldsEntity.filter(
        entity => entity !== fieldEntity,
      )
      delete this.store[name]
    }
  }

  resetFields(nameList?: NamePath[]) {
    const initialValues = nameList
      ? Object.entries(this.initialValues).reduce<Store>(
          (total, [key, val]) => {
            if (nameList.includes(key)) {
              total[key] = val
            }
            return total
          },
          {},
        )
      : {
          ...this.initialValues,
        }
    this.setFieldsValue(initialValues, true)
  }

  setInitialValues(values: Store, initial: boolean) {
    this.initialValues = {
      ...this.store,
      ...values,
    }
    if (initial) {
      this.store = {
        ...this.initialValues,
      }
      const keys = Object.keys(values)
      this.fieldsEntity
        .filter(entity => keys.includes(entity.props.name))
        .forEach(entity => {
          entity.onStoreChange()
        })
    }
  }

  getFieldsValue() {
    return this.store
  }

  getFieldValue(name: string) {
    return this.store[name]
  }

  setFieldsValue(values: Store, reset?: boolean) {
    this.store = {
      ...this.store,
      ...values,
    }
    const nameList = Object.keys(values)
    this.fieldsEntity
      .filter(entity => nameList.includes(entity.props.name))
      .forEach(entity => {
        entity.onStoreChange()
        reset && entity.setErrors([])
      })
    if (!reset) {
      this.validateFields(nameList)
      this.callbacks.onValuesChange?.(values, this.store)
    }
  }

  setFieldValue(name: string, value: any) {
    this.setFieldsValue({
      [name]: value,
    })
  }

  setCallbacks(callbacks: Callbacks) {
    this.callbacks = {
      ...this.callbacks,
      ...callbacks,
    }
  }

  validateFields(nameList?: NamePath[]) {
    const fieldsEntity = nameList
      ? this.fieldsEntity.filter(entity => nameList.includes(entity.props.name))
      : this.fieldsEntity
    const data: Store = {}
    const descriptor: Rules = {}
    fieldsEntity.forEach(entity => {
      const { name, rules } = entity.props
      if (rules) {
        data[name] = this.store[name]
        descriptor[name] = rules
      }
    })

    if (Object.keys(data).length) {
      const validator = new Schema(descriptor)
      return new Promise<ValidateError[]>(resolve => {
        validator.validate(data, errors => {
          const errorsRes: ValidateError[] = []
          const errorsData = (errors || []).reduce<Record<string, string[]>>(
            (total, item) => {
              const { field, message } = item
              const messageList = total[field as string]
              if (messageList) {
                messageList.push(message as string)
              } else {
                total[field as string] = [message as string]
              }
              return total
            },
            {},
          )

          fieldsEntity.forEach(entity => {
            const { name } = entity.props
            if (errorsData[name]) {
              entity.setErrors(errorsData[name])
              errorsRes.push({
                name,
                value: data[name],
                errors: errorsData[name],
              })
            } else {
              entity.setErrors([])
            }
          })
          resolve(errorsRes)
        })
      })
    }
    return Promise.resolve([])
  }

  async submit() {
    const errors = await this.validateFields()
    if (errors.length) {
      this.callbacks.onFinishFailed?.(errors)
    } else {
      this.callbacks.onFinish?.(this.store)
    }
  }

  getForm() {
    return {
      registerFieldEntity: this.registerFieldEntity.bind(this),
      setInitialValues: this.setInitialValues.bind(this),
      getFieldsValue: this.getFieldsValue.bind(this),
      getFieldValue: this.getFieldValue.bind(this),
      setFieldsValue: this.setFieldsValue.bind(this),
      setFieldValue: this.setFieldValue.bind(this),
      validateFields: this.validateFields.bind(this),
      setCallbacks: this.setCallbacks.bind(this),
      resetFields: this.resetFields.bind(this),
      submit: this.submit.bind(this),
    }
  }
}

export const useForm = <Values = any>(formInstance?: FormInstance<Values>) => {
  const formRef = useRef<FormInstance<Values>>()

  if (!formRef.current) {
    if (formInstance) {
      formRef.current = formInstance
    } else {
      const formStore = new FormStore()
      formRef.current = formStore.getForm() as FormInstance<Values>
    }
  }

  return [formRef.current]
}
