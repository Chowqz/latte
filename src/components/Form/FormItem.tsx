import React from 'react'
import FormContext from './FormContext'
import { FormInstance } from './Form.d'
import { Rule } from 'async-validator'

interface FormItemProps {
  name: string
  children: React.ReactElement
  label?: string
  rules?: Rule
}

interface State {
  errors: string[]
}

export default class FormItem extends React.Component<FormItemProps, State> {
  static contextType = FormContext
  private unRegister: any

  constructor(props: FormItemProps) {
    super(props)
    this.state = {
      errors: [],
    }
  }

  componentDidMount() {
    const { registerFieldEntity } = this.context as FormInstance
    this.unRegister = registerFieldEntity(this)
    console.log('mount')
  }

  componentWillUnmount() {
    if (this.unRegister) {
      this.unRegister()
    }
  }

  setErrors(errors: string[]) {
    this.setState(prev => ({
      ...prev,
      errors,
    }))
  }

  onStoreChange() {
    this.forceUpdate()
  }

  getControlled() {
    const { name } = this.props
    const { getFieldValue, setFieldValue } = this.context as FormInstance

    return {
      value: getFieldValue(name),
      onChange: (value: any) => {
        setFieldValue(name, value)
      },
    }
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, this.getControlled())}
        {!!this.state.errors.length && <div>{this.state.errors[0]}</div>}
      </div>
    )
  }
}
