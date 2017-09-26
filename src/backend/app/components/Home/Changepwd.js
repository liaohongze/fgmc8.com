import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Row, Col, FormControl, ControlLabel, HelpBlock, Button, Panel } from 'react-bootstrap'
import Client from '../../common/Client'
import { auth } from '../../common/Auth'
import {Message} from 'uxcore'

let USERNAME, ID

export default class Changepwd extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    isConfirmed: true
  }

  handleSubmit = () => {
    if (this.newpwd.value !== this.confirmpwd.value) {
      this.setState({ isConfirmed: false })
    } else {
      const values = {
        userName: USERNAME,
        password: this.confirmpwd.value
      }
      Client.changeAdminPwd(values, ID, result => {
        if (!result.errored && this.refs.changepwdBox) {
          Message['success']('修改管理员密码成功！')
        }
      })
    }
  }

  componentWillMount () {
    USERNAME = auth.getCurrentUser().userName
    ID = auth.getCurrentUser().id
  }

  render() {
    return (
      <div className='changepwd-box' ref='changepwdBox'>
        <Panel collapsible defaultExpanded header='修改管理员密码' bsStyle='info'>
          <form>
            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='oldpwd'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>原密码：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='password' inputRef={(ref) => { this.oldpwd = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='newpwd'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>新密码：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='password' inputRef={(ref) => { this.newpwd = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='confirmpwd'
                validationState={this.state.isConfirmed ? null : 'error'}
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>确认新密码：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='password' inputRef={(ref) => { this.confirmpwd = ref }} />
                  <FormControl.Feedback />
                  {this.state.isConfirmed ? null : <HelpBlock>两次密码不一致！</HelpBlock>}
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Row>
              <Col componentClass={ControlLabel} sm={2} md={2} />
              <Col sm={8} md={8} className='btn-wrapper'>
                <Button bsStyle='primary' onClick={this.handleSubmit}>提交</Button>
              </Col>
              <Col sm={2} md={2} />
            </Row>
          </form>
        </Panel>
      </div>
    )
  }
}