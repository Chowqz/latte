import React, { useState } from 'react'
import { Button } from 'antd'
import Input from '~/components/Form/Input'
import { useForm, Form, FormItem } from '~/components/Form'

const FormDemo = () => {
  const [form] = useForm<{
    userName: string
    password: string
    age: string
    sex: string
  }>()

  const [hidden, setHidden] = useState(false)

  const handleValuesChange = (changedValues: any, allValues: any) => {
    console.log('changedValues: ', changedValues)
    console.log('allValues: ', allValues)
  }

  const handleSubmit = () => {
    form.submit()
    form.getFieldValue('userName')
  }

  const handleReset = () => {
    form.resetFields(['password', 'userName'])
  }

  const handleFinish = (values: any) => {
    console.log(values)
  }

  const handleFinishFailed = (errors: any) => {
    console.log(errors)
  }

  const setFieldsValue = () => {
    form.setFieldValue('password', 'hello world')
    form.setFieldsValue({
      userName: undefined,
    })
  }

  const getFieldError = () => {
    const errors = form.getFieldError('password')
    console.log(errors)
    const errorList = form.getFieldsError(['sex', 'userName'])
    console.log('errorList', errorList)
  }

  const validateFields = async () => {
    const fieldError = await form.validateFields(['password'])
    console.log(fieldError)
  }

  const setFieldData = () => {
    form.setFields([
      {
        name: 'password',
        value: 'chowqz',
        errors: [],
      },
    ])
  }

  return (
    <>
      <Form
        form={form}
        initialValues={{ userName: 'test', password: 'guest' }}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
      >
        <FormItem
          label="User Name"
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
        <div>
          <FormItem
            label={<span>Password</span>}
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
        </div>
        <FormItem
          name="age"
          // rules={{
          //   type: 'string',
          //   required: true,
          // }}
        >
          <Input />
        </FormItem>
        <FormItem
          name="sex"
          rules={{
            type: 'string',
            required: true,
          }}
          hidden={hidden}
        >
          <Input />
        </FormItem>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={setFieldsValue}>setFieldsValue</Button>
        <Button onClick={() => setHidden(prev => !prev)}>setHidden</Button>
        <Button onClick={getFieldError}>getFieldError</Button>
        <Button onClick={validateFields}>validateFields</Button>
        <Button onClick={setFieldData}>setFieldData</Button>
        jjj
      </Form>
    </>
  )
}

export default FormDemo
