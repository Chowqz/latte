import React, { useEffect, useImperativeHandle, useRef } from 'react'
import FormContext from './FormContext'
import { useForm } from './FormStore'
import { FormInstance, FormProps } from './Form.d'

const Form: React.ForwardRefRenderFunction<FormInstance, FormProps> = (
  props,
  forwardedRef,
) => {
  const {
    form,
    children,
    initialValues = {},
    onValuesChange,
    onFinish,
    onFinishFailed,
  } = props
  const [formInstancce] = useForm(form)
  const mountedRef = useRef(false)

  formInstancce?.setCallbacks({
    onValuesChange,
    onFinish,
    onFinishFailed,
  })

  useEffect(() => {
    formInstancce.setInitialValues(initialValues, !mountedRef.current)
  }, [initialValues])

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
    }
  }, [])

  useImperativeHandle(forwardedRef, () => formInstancce)

  return (
    <FormContext.Provider value={formInstancce}>
      <div>{children}</div>
    </FormContext.Provider>
  )
}

export default React.forwardRef(Form) as <T = any>(
  props: React.PropsWithChildren<FormProps<T>> & {
    ref?: React.ForwardedRef<FormInstance<T>>
  },
) => React.ReactElement
