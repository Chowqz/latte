import React from 'react'
import { useAppDispatch } from '~/store/hooks'
import { deleteTodo, togggleTodoStatus } from '~/store/slices/todosSlice'

const TodoItem = (props: any) => {
  const dispatch = useAppDispatch()
  console.log('TodoItem render: ' + props.data.id)

  return (
    <li>
      <span
        style={
          props.data.completed
            ? { textDecorationLine: 'line-through' }
            : undefined
        }
        onClick={() => dispatch(togggleTodoStatus(props.data.id))}
      >
        {props.data.text}
      </span>
      <button onClick={() => dispatch(deleteTodo(props.data.id))}>
        delete
      </button>
    </li>
  )
}

export default TodoItem
