import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth } from '../../common/Auth'
import IncomeItem from './IncomeItem'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import './Incomes.scss'

let ID

export default class Incomes extends Component {
  state = {
    loading: false,
    incomes: []
  }

  componentWillMount() {
    ID = auth.getCurrentUser().id
  }

  componentDidMount() {
    this.setState({ loading: true })
    Client.getDirects(ID, result => {
      if (!result.errored && this.refs.incomesBox) {
        this.setState({
          loading: false,
          incomes: result.object.list
        })
      }
    })
  }

  render() {
    const { loading, incomes } = this.state
    return (
      <div className='incomes toolbar-page' ref='incomesBox'>
        <Toolbar link='/pasture' title='直推收益' />
        <div className='incomes-content toolbar-page-content'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='lg' /></div>
              : (
                incomes.length === 0
                  ? <NoMore />
                  : (
                    incomes.map((item, index) => {
                      return (
                        <IncomeItem key={index} recomName={item.recomName} amount={item.amount} />
                      )
                    })
                  )
              )
          }
        </div>
      </div>
    )
  }
}