import React from 'react'
import { Button } from 'antd'
import { Form, FormItem, FormInstance } from '~/components/Form'
import Input from '~/components/Form/Input'

class FormDemo extends React.Component {
  private form: React.RefObject<FormInstance>
  constructor(props: any) {
    super(props)
    this.form = React.createRef()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.setFieldsValue = this.setFieldsValue.bind(this)
  }

  handleValuesChange(changedValues: any, allValues: any) {
    console.log('changedValues: ', changedValues)
    console.log('allValues: ', allValues)
  }

  handleSubmit() {
    this.form.current?.submit()
  }

  handleReset() {
    this.form.current?.resetFields(['password', 'userName'])
  }

  handleFinish(values: any) {
    console.log(values)
  }

  handleFinishFailed(errors: any) {
    console.log(errors)
  }

  setFieldsValue = () => {
    this.form.current?.setFieldValue('userName', 'hello world')
    this.form.current?.setFieldsValue({
      password: 'admin',
    })
  }

  render() {
    return (
      <>
        <Form<{
          userName: string
          password: string
        }>
          ref={this.form}
          initialValues={{ password: 'guest' }}
          onValuesChange={this.handleValuesChange}
          onFinish={this.handleFinish}
          onFinishFailed={this.handleFinishFailed}
        >
          <FormItem
            name="userName"
            rules={[
              {
                type: 'string',
                required: true,
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            name="password"
            rules={[
              {
                type: 'string',
                required: true,
              },
              { type: 'enum', enum: ['admin', 'user', 'guest'] },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            name="age"
            // rules={{
            //   type: 'string',
            //   required: true,
            // }}
          >
            <Input />
          </FormItem>
          <Button onClick={this.handleSubmit}>Submit</Button>
          <Button onClick={this.handleReset}>Reset</Button>
          <Button onClick={this.setFieldsValue}>setFieldsValue</Button>
        </Form>
      </>
    )
  }
}

export default FormDemo
