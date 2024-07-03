import type { PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '..'
import { createAppSlice } from '../createAppSlice'

export interface CounterSliceState {
  value: number
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CounterSliceState = {
  value: 0,
  status: 'idle',
}

// A mock function to mimic making an async request for data
export const fetchCount = (amount = 1) => {
  return new Promise<{ data: number }>(resolve =>
    setTimeout(() => resolve({ data: amount }), 500),
  )
}

export const counterSlice = createAppSlice({
  name: 'counter',
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {
      state.value += 1
    }),
    decrement: create.reducer(state => {
      state.value -= 1
    }),
    incrementByAmount: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.value += action.payload
      },
    ),
    incrementAsync: create.asyncThunk(
      async (amount: number) => {
        const res = await fetchCount(amount)
        return res.data
      },
      {
        pending: state => {
          state.status = 'loading'
        },
        fulfilled: (state, action) => {
          state.value += action.payload
          state.status = 'idle'
        },
        rejected: state => {
          state.status = 'failed'
        },
      },
    ),
  }),
  selectors: {
    selectCount: state => state.value,
    selectStatus: state => state.status,
  },
})

export const { increment, decrement, incrementAsync, incrementByAmount } =
  counterSlice.actions

export const { selectCount, selectStatus } = counterSlice.selectors

export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState())

    if (currentValue % 2 === 1 || currentValue % 2 === -1) {
      dispatch(incrementByAmount(amount))
    }
  }
