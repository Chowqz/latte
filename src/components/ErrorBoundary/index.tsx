import React from 'react'

interface Props {
  children: React.ReactElement
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error: any) {
    console.log(error)
    // 更新状态，以便下一次渲染将显示后备 UI。
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <div>errror message</div>
    }
    return this.props.children
  }
}

export default ErrorBoundary
