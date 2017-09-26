import t from './actionTypes'

const initialState = [{
  id: 0,
  text: 'test',
  completed: false
}]

export default (state = initialState, action) => {
  switch (action.type) {
    case t.ADD:
      return [
        ...state
      ]
  }
}