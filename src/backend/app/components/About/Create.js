import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Row, Col, FormControl, ControlLabel, HelpBlock, Button, Panel } from 'react-bootstrap'
import HtmlEditor from '../Shared/HtmlEditor'
import Client from '../../common/Client'
import {auth} from '../../common/Auth'
import './Create.scss'
// import './Editor.scss'

export default class Creat extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  state = {
    signIsEmpty: false,
    titleIsEmpty: false
  }

  handleSubmit = () => {
    const signValue = this.sign.value
    const titleValue = this.title.value
    const contentValue = this.refs.content.saveHandle()

    if (signValue.length === 0) { this.setState({signIsEmpty: true}) }
    if (titleValue.length === 0) { this.setState({titleIsEmpty: true}) }

    if (titleValue.length !== 0 && contentValue.length !== 0 && signValue.length !== 0) {
      const values = {
        'sign': signValue,
        'title': titleValue,
        'content': contentValue
      }

      Client.createAbout(values, auth.getToken(), result => {
        if (!result.errored) {
          this.props.history.push('/abouts')
        }
      })
    }
  }

  handleChange = () => {
    if (this.sign.value.length !== 0) { this.setState({signIsEmpty: false}) }
    if (this.title.value.length !== 0) { this.setState({titleIsEmpty: false}) }
  }

  render() {
    const { signIsEmpty, titleIsEmpty } = this.state
    return (
      <div className='creat-about'>
        <Panel collapsible defaultExpanded header='创建信息' bsStyle='info'>
          <form>
            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='createArticleSign'
                validationState={signIsEmpty ? 'error' : null}
                onChange={this.handleChange}
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>标识：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' inputRef={(ref) => { this.sign = ref }} />
                  <FormControl.Feedback />
                  {signIsEmpty ? <HelpBlock>信息标识不能为空！</HelpBlock> : null}
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='createArticleTitle'
                validationState={titleIsEmpty ? 'error' : null}
                onChange={this.handleChange}
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>标题：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' inputRef={(ref) => { this.title = ref }} />
                  <FormControl.Feedback />
                  {titleIsEmpty ? <HelpBlock>信息标题不能为空！</HelpBlock> : null}
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='createArticleContent'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>内容：</Col>
                <Col sm={8} md={8}>
                  <HtmlEditor ref='content' documentId='createArticleContent' />
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