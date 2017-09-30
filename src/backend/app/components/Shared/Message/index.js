import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './Message.scss'
let Timer, Timer2, Timer3

export default class Message extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    duration: PropTypes.number
  }

  state = {
    top: '-30px'
  }

  componentDidMount () {
    Timer = window.setTimeout(() => {
      this.setState({top: '10px'})
    }, 100)

    Timer2 = window.setTimeout(() => {
      this.setState({top: '-30px'})
      Timer3 = window.setTimeout(() => { this.props.close() }, 300)
    }, this.props.duration || 2000)
  }

  componentWillUnmount() {
    window.clearTimeout(Timer)
    window.clearTimeout(Timer2)
    window.clearTimeout(Timer3)
  }

  render() {
    const {content, type} = this.props
    return (
      <div className='diy-message-container'>
        <div className={`diy-message ${type}`} style={{top: this.state.top}}>{content}</div>
      </div>
    )
  }
}