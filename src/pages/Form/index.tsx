import React from 'react'
import { Button } from 'antd'
import Form from '~/components/Form/Form'
import FormItem from '~/components/Form/FormItem'
import Input from '~/components/Form/Input'
import { useForm } from '~/components/Form/FormStore'

const FormDemo = () => {
  const [form] = useForm<{
    userName: string
    password: string
    age: string
  }>()

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
    form.setFieldValue('userName', 'hello world')
    form.setFieldsValue({
      password: undefined,
    })
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
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={setFieldsValue}>setFieldsValue</Button>
      </Form>
    </>
  )
}

export default FormDemo
