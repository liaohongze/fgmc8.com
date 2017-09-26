import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Collapse, Alert } from 'react-bootstrap'
import './MyAlert.scss'

export default class MyAlert extends Component {
  static propTypes = {
    show: PropTypes.bool,
    style: PropTypes.string,
    msg: PropTypes.string
  }

  render() {
    const { show, style, msg } = this.props
    return (
      <Collapse
        in={show}
      >
        <div className='alert-wrapper'>
          <div className='my-alert'>
            <Alert bsStyle={style}>
              {msg}
            </Alert>
          </div>
        </div>
      </Collapse>
    )
  }
}
