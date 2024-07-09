import React, { useEffect, useMemo, useState } from 'react'
import { Button, Input, Radio } from 'antd'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
  FilterTypes,
  selectTodoList,
  selectFilter,
  addTodo,
  clearTodo,
  setFilter,
} from '~/store/slices/todosSlice'
import TodoItem from './TodoItem'

const Todos = () => {
  const dispatch = useAppDispatch()

  const todoList = useAppSelector(selectTodoList)

  const todoIds = useAppSelector(
    state => state.todos.todoList.map(item => item.id),
    shallowEqual,
  )
  const filter = useAppSelector(selectFilter)

  const [todoContent, setTodoContent] = useState('')

  const filterTodoList = useMemo(() => {
    console.log('calc')
    switch (filter) {
      case FilterTypes.All: {
        return todoList
      }
      case FilterTypes.Active: {
        return todoList.filter(item => !item.completed)
      }
      case FilterTypes.Completed: {
        return todoList.filter(item => item.completed)
      }
    }
  }, [todoList, filter])

  useEffect(() => {
    console.log(todoIds)
  }, [todoIds])

  return (
    <div>
      <div>
        <h3>Todos</h3>
        <ul>
          {filterTodoList.map(item => (
            <TodoItem key={item.id} data={item} />
          ))}
        </ul>
        <div>
          <Input
            style={{ width: '200px' }}
            value={todoContent}
            onChange={e => setTodoContent(e.target.value)}
          />
          <Button type="primary" onClick={() => dispatch(addTodo(todoContent))}>
            Add Todo
          </Button>
          <Button type="primary" onClick={() => dispatch(clearTodo())}>
            Clear Todo
          </Button>
        </div>
        <Radio.Group
          onChange={e => dispatch(setFilter(e.target.value))}
          value={filter}
        >
          <Radio value={FilterTypes.All}>All</Radio>
          <Radio value={FilterTypes.Active}>Active</Radio>
          <Radio value={FilterTypes.Completed}>Completed</Radio>
        </Radio.Group>
      </div>
    </div>
  )
}

export default Todos
