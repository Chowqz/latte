import React from 'react'
import { Button, Result } from 'antd'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  const goHomePage = () => {
    navigate('/', {
      replace: true,
    })
  }
  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={goHomePage}>
            Back Home
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
