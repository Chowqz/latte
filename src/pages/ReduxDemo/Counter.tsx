import React, { useState } from 'react'
import { Button, InputNumber } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
  selectCount,
  selectStatus,
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
} from '~/store/slices/counterSlice'

const Counter = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const status = useAppSelector(selectStatus)

  const [amount, setAmount] = useState(0)

  const handleAmountChange = (val: number | null) => {
    setAmount(Number(val))
  }

  return (
    <div>
      <div>
        <h3>Counter</h3>
        <Button
          type="primary"
          icon={<MinusOutlined />}
          onClick={() => dispatch(decrement())}
        />
        <span>{count}</span>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => dispatch(increment())}
        />
      </div>
      <div>
        <InputNumber
          style={{ width: '200px' }}
          value={amount}
          onChange={handleAmountChange}
        />
        <Button
          type="primary"
          onClick={() => dispatch(incrementByAmount(amount))}
        >
          Add Amount
        </Button>
        <Button
          type="primary"
          loading={status === 'loading'}
          onClick={() => dispatch(incrementAsync(amount))}
        >
          Add Async
        </Button>
        <Button type="primary" onClick={() => dispatch(incrementIfOdd(amount))}>
          Add If Odd
        </Button>
      </div>
    </div>
  )
}

export default Counter
