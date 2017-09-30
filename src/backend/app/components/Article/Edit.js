import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Row, Col, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap'
import HtmlEditor from '../Shared/HtmlEditor'
import Client from '../../common/Client'
import {auth} from '../../common/Auth'
import './Editor.scss'

export default class Edit extends Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
  }

  componentDidMount () {
    const { match: { params: { id } } } = this.props
    Client.getArticle(id, auth.getToken(), result => {
      if (result.length !== 0) {
        this.title.value = result.object.title
        this.refs.content.editHandle(result.object.content)
      }
    })
  }

  handleSubmit = () => {
    const values = {
      title: this.title.value,
      content: this.refs.content.saveHandle()
    }
    const { match: { params: { id } } } = this.props
    Client.editArticle(id, values, auth.getToken(), result => {
      if (!result.errored) {
        this.props.history.push('/article')
      }
    })
  }

  render() {
    return (
      <div className='edit-box'>
        <Panel collapsible defaultExpanded header='编辑通知' bsStyle='info'>
          <form>
            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='title'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>标题：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' inputRef={(ref) => { this.title = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='content'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>内容：</Col>
                <Col sm={8} md={8}>
                  <HtmlEditor ref='content' documentId='editArticleContent' />
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