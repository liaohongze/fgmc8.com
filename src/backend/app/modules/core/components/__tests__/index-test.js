import React from 'react'
import { shallow } from 'enzyme'
import test from 'tape'
import { Todo } from '../index'

test('it renders correctly', (t) => {
  const todo = { id: 1, text: 'Finish writing post' }
  const wrapper = shallow(
    <Todo todo={todo} />
  )
  t.ok(/Finish writing post/.test(wrapper.html()), 'renders text')
  t.end()
})