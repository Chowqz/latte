import React from 'react'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

const Input = (props: Props) => {
  const { value = '', onChange } = props

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return <input type="text" value={value} onChange={handleValueChange} />
}

export default Input
