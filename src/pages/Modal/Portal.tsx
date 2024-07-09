import { ReactNode, useEffect, useRef } from 'react'
import ReactDom from 'react-dom'

interface Props {
  children: ReactNode
}

const Portal = ({ children }: Props) => {
  const container = useRef<HTMLElement | null>(null)

  useEffect(() => {
    return () => {
      document.body.removeChild(container.current!)
    }
  }, [])

  if (!container.current) {
    container.current = document.createElement('div')
    document.body.appendChild(container.current)
  }

  return ReactDom.createPortal(children, container.current)
}

export default Portal
