import React from 'react'
import ErrorBoundary from '~/components/ErrorBoundary'
// import ErrorBoundary from '~'

const ErrorComponent = (props: any) => {
  throw new Error('test error')
  return <div>list: {props.list.length}</div>
}

const ErrorBoundaryDemo = () => {
  return (
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  )
}

export default ErrorBoundaryDemo
