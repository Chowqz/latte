import React from 'react'
import { Form, Input } from 'antd'

const Login = () => {
  const [form] = Form.useForm<{
    userName: string
    age: number
  }>()
  console.log('Login')
  form.setFieldsValue({
    userName: 'dd',
  })

  const setFieldValue = () => {
    form.setFieldValue('test', 111)
  }

  const getFieldValue = () => {
    console.log(form.getFieldValue('test'))
  }

  return (
    <>
      <Form<{
        userName: string
        age: number
      }>
        form={form}
        initialValues={{
          color: 'a',
        }}
      >
        <Form.Item name="userName">
          <Input />
        </Form.Item>
      </Form>
      <div onClick={setFieldValue}>Login</div>
      <div onClick={getFieldValue}>getFieldValue</div>
    </>
  )
}

export default Login
