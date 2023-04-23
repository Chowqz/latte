import { ReactNode, useEffect, useRef } from 'react'
import ReactDom from 'react-dom'

interface Props {
  children: ReactNode
}

const Portal = ({ children }: Props) => {
  const container = useRef<HTMLDivElement>(document.createElement('div'))
  useEffect(() => {
    document.body.appendChild(container.current)
    return () => {
      document.body.removeChild(container.current)
    }
  }, [])

  return ReactDom.createPortal(children, container.current)
}

export default Portal
