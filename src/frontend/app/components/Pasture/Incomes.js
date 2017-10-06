import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
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
    ID = currentUser().id
  }

  componentDidMount() {
    this.setState({ loading: true })
    Client.getDirects(ID, auth.getToken(), result => {
      if (!result.errored) {
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
      <div className='incomes toolbar-page'>
        <Toolbar link='/pasture' title='直推收益' />
        <div className='incomes-content toolbar-page-content'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='spinner' spin size='lg' /></div>
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