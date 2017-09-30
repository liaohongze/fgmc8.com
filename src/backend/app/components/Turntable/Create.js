import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Row, Col, FormControl, ControlLabel, HelpBlock, Button, Panel } from 'react-bootstrap'
import Client from '../../common/Client'
import {auth} from '../../common/Auth'
import './Create.scss'

export default class Creat extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  state = {
    titleIsEmpty: false,
    nameIsEmpty: false,
    gradeIsEmpty: false,
    probIsEmpty: false,
    rewardEmpty: false
  }

  handleSubmit = () => {
    const titleValue = this.title.value
    const nameValue = this.name.value
    const gradeValue = this.grade.value
    const probabilityValue = this.probability.value
    const rewardValue = this.reward.value

    if (titleValue.length === 0) { this.setState({ titleIsEmpty: true }) }
    if (nameValue.length === 0) { this.setState({ nameIsEmpty: true }) }
    if (gradeValue.length === 0) { this.setState({ gradeIsEmpty: true }) }
    if (probabilityValue.length === 0) { this.setState({ probIsEmpty: true }) }
    if (rewardValue.length === 0) { this.setState({ rewardEmpty: true }) }

    if (titleValue.length !== 0 && nameValue.length !== 0 && gradeValue.length !== 0 && probabilityValue.length !== 0 && rewardValue.length !== 0) {
      const values = {
        'title': titleValue,
        'name': nameValue,
        'grade': parseInt(gradeValue),
        'probability': parseFloat(probabilityValue),
        'reward': parseInt(rewardValue)
      }
      Client.createPrize(values, auth.getToken(), result => {
        if (!result.errored) {
          this.props.history.push('/turntable')
        }
      })
    }
  }

  handleChange = () => {
    if (this.title.value.length !== 0) { this.setState({ titleIsEmpty: false }) }
    if (this.name.value.length !== 0) { this.setState({ nameIsEmpty: false }) }
    if (this.grade.value.length !== 0) { this.setState({ gradeIsEmpty: false }) }
    if (this.probability.value.length !== 0) { this.setState({ probIsEmpty: false }) }
    if (this.reward.value.length !== 0) { this.setState({ rewardEmpty: false }) }
  }

  render() {
    const { nameIsEmpty, gradeIsEmpty, probIsEmpty, titleIsEmpty, rewardEmpty } = this.state
    return (
      <div className='creat-reward'>
        <Panel collapsible defaultExpanded header='创建奖项' bsStyle='info'>
          <form>
            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='createRewardTitle'
                validationState={titleIsEmpty ? 'error' : null}
                onChange={this.handleChange}
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>奖品标题：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' inputRef={(ref) => { this.title = ref }} />
                  <FormControl.Feedback />
                  {titleIsEmpty ? <HelpBlock>奖品标题不能为空！</HelpBlock> : null}
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='createRewardName'
                validationState={nameIsEmpty ? 'error' : null}
                onChange={this.handleChange}
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>奖品名称：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='text' inputRef={(ref) => { this.name = ref }} />
                  <FormControl.Feedback />
                  {nameIsEmpty ? <HelpBlock>奖品名称不能为空！</HelpBlock> : null}
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='createRewardGrade'
                validationState={gradeIsEmpty ? 'error' : null}
                onChange={this.handleChange}
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>奖品等级：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='number' inputRef={(ref) => { this.grade = ref }} />
                  <FormControl.Feedback />
                  {gradeIsEmpty ? <HelpBlock>奖品等级不能为空！</HelpBlock> : null}
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='createRewardProb'
                validationState={probIsEmpty ? 'error' : null}
                onChange={this.handleChange}
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>中奖概率：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='number' inputRef={(ref) => { this.probability = ref }} />
                  <FormControl.Feedback />
                  {probIsEmpty ? <HelpBlock>中奖概率不能为空！</HelpBlock> : null}
                </Col>
                <Col sm={2} md={2} />
              </FormGroup>
            </Form>

            <Form componentClass='fieldset' horizontal>
              <FormGroup
                controlId='createRewardReward'
                validationState={rewardEmpty ? 'error' : null}
                onChange={this.handleChange}
              >
                <Col componentClass={ControlLabel} sm={2} md={2}>奖品积分：</Col>
                <Col sm={8} md={8}>
                  <FormControl type='number' inputRef={(ref) => { this.reward = ref }} />
                  <FormControl.Feedback />
                  {rewardEmpty ? <HelpBlock>奖品积分不能为空！</HelpBlock> : null}
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