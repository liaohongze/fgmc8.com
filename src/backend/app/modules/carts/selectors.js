import { createSelector } from 'reselect'
import { NAME } from './constants'

export const getAll = state => state[NAME]

export const getCounts = createSelector(
  getAll,
  (allTodos) => ({
    all: allTodos.length
  })
)