import React from 'react'
import { Form } from 'antd'

const Login = () => {
  const [form] = Form.useForm<{
    userName: string
    age: number
  }>()
  console.log('Login')
  form.setFieldsValue({
    userName: 'dd',
  })

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
      ></Form>
      <div>Login</div>
    </>
  )
}

export default Login
