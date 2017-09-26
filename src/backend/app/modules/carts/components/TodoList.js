import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getAll } from '../selectors'
import TodoItem from './TodoItem'

const TodoList = ({ todos }) => (
  <div>
    {todos.map(t =>
      <TodoItem todo={t} />
    )}
  </div>
)

TodoList.propTypes = {
  todos: PropTypes.object
}

export default connect(
  createStructuredSelector({
    todos: getAll
  })
)(TodoList)