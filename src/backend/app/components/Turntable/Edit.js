import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Row, Col, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap'
import Client from '../../common/Client'
// import './Editor.scss'

export default class Edit extends Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props
    Client.getPrize(id, result => {
      if (!result.errored) {
        this.title.value = result.object.title
        this.name.value = result.object.name
        this.grade.value = result.object.grade
        this.probability.value = result.object.probability
        this.reward.value = result.object.reward
      }
    })
  }

  handleSubmit = () => {
    const values = {
      'title': this.title.value,
      'name': this.name.value,
      'grade': parseInt(this.grade.value),
      'probability': parseFloat(this.probability.value),
      'reward': parseInt(this.reward.value)
    }
    const { match: { params: { id } } } = this.props
    Client.editPrize(id, values, result => {
      if (!result.errored) {
        this.props.history.push('/turntable')
      }
    })
  }

  render() {
    return (
      <div className='edit-box'>
        <Panel collapsible defaultExpanded header='编辑信息' bsStyle='info'>
          <form>
            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='title'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>奖品标题：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' inputRef={(ref) => { this.title = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='name'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>奖品名称：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' inputRef={(ref) => { this.name = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='grade'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>奖品等级：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='number' inputRef={(ref) => { this.grade = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='probability'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>抽奖概率：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='number' inputRef={(ref) => { this.probability = ref }} />
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='reward'
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>奖品积分：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='number' inputRef={(ref) => { this.reward = ref }} />
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