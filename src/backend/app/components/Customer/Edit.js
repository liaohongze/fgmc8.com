import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Row, Col, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap'
import Client from '../../common/Client'
import './Edit.scss'

export default class Edit extends Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props
    Client.getCustomer(id, result => {
      if (!result.errored) {
        this.username.value = result.object.userName
        this.nickname.value = result.object.nickName
        this.recomName.value = result.object.recomName
        this.mobile.value = result.object.mobile
        this.wechat.value = result.object.wechat
        this.alipay.value = result.object.alipay
      }
    })
  }

  handleSubmit = () => {
    const { match: { params: { id } } } = this.props
    const values = {
      'nickName': this.nickname.value,
      'mobile': this.mobile.value,
      'wechat': this.wechat.value,
      'alipay': this.alipay.value
    }

    Client.editCustomer(values, id, result => {
      if (!result.errored) {
        this.props.history.push('/customer')
      }
    })
  }

  render() {
    return (
      <div className='edit-box'>
        <Panel collapsible defaultExpanded header='编辑用户' bsStyle='info'>
          <form>
            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='username'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>用户名：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' disabled inputRef={(ref) => { this.username = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='nickname'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>用户昵称：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' inputRef={(ref) => { this.nickname = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='recomName'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>推荐人：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' disabled inputRef={(ref) => { this.recomName = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='mobile'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>手机号：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' inputRef={(ref) => { this.mobile = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='wechat'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>微信：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' inputRef={(ref) => { this.wechat = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='alipay'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>支付宝：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' inputRef={(ref) => { this.alipay = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Row>
              <Col componentClass={ControlLabel} sm={2} md={2} />
              <Col sm={8} md={8} className='btn-wrapper'>
                <Button bsStyle='primary' onClick={this.handleSubmit}>提交</Button>
                <Button bsStyle='primary' onClick={() => { this.props.history.push('/customer') }}>取消</Button>
              </Col>
              <Col sm={2} md={2} />
            </Row>
          </form>
        </Panel>
      </div>
    )
  }
}