import React, { ReactNode } from 'react'
import { Button } from 'antd'
import Portal from './Portal'
import styles from './Modal.module.less'

interface Props {
  visible: boolean
  title: ReactNode
  children: ReactNode
  onOk?: () => void
  onCancel?: () => void
}

const Modal = ({ visible, title, children, onOk, onCancel }: Props) => {
  const handleOk = () => {
    onOk?.()
  }

  const handleCancel = () => {
    onCancel?.()
  }

  return (
    <>
      {
        <Portal>
          <div
            className="modal-root"
            style={{ display: visible ? 'block' : 'none' }}
          >
            <div className={styles.modalMask}></div>
            <div className={styles.modalWrap}>
              <div className={styles.modal}>
                <div className={styles.header}>
                  <div className={styles.title}>{title}</div>
                </div>
                <div className={styles.body}>{children}</div>
                <div className={styles.footer}>
                  <Button onClick={handleOk}>Ok</Button>
                  <Button onClick={handleCancel}>Cancel</Button>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      }
    </>
  )
}

export default Modal
