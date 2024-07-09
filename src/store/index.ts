import {
  combineSlices,
  configureStore,
  Action,
  ThunkAction,
} from '@reduxjs/toolkit'
import { counterSlice } from './slices/counterSlice'
import { todosSlice } from './slices/todosSlice'

const rootReducer = combineSlices(counterSlice, todosSlice)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })
  return store
}

export const store = makeStore()

export type AppStore = typeof store

export type AppDispatch = AppStore['dispatch']

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
