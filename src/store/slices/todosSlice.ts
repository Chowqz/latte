import type { PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '../createAppSlice'

export enum FilterTypes {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export interface TodosSliceState {
  todoList: {
    id: number
    text: string
    completed: boolean
  }[]
  filter: FilterTypes
}

let nextTodoId = 0

const initialState: TodosSliceState = {
  todoList: [],
  filter: FilterTypes.All,
}

export const todosSlice = createAppSlice({
  name: 'todos',
  initialState,
  reducers: create => ({
    addTodo: create.reducer((state, action: PayloadAction<string>) => {
      state.todoList.push({
        id: nextTodoId++,
        text: action.payload,
        completed: false,
      })
    }),
    deleteTodo: create.reducer((state, action: PayloadAction<number>) => {
      const index = state.todoList.findIndex(item => item.id === action.payload)
      if (index !== -1) {
        state.todoList.splice(index, 1)
      }
    }),
    togggleTodoStatus: create.reducer(
      (state, action: PayloadAction<number>) => {
        const index = state.todoList.findIndex(
          item => item.id === action.payload,
        )
        state.todoList[index].completed = !state.todoList[index].completed
      },
    ),
    clearTodo: create.reducer(state => {
      state.todoList = []
    }),
    setFilter: create.reducer((state, action: PayloadAction<FilterTypes>) => {
      state.filter = action.payload
    }),
  }),
  selectors: {
    selectTodoList: state => state.todoList,
    selectFilter: state => state.filter,
  },
})

export const { addTodo, deleteTodo, togggleTodoStatus, clearTodo, setFilter } =
  todosSlice.actions

export const { selectTodoList, selectFilter } = todosSlice.selectors
