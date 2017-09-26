import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { auth } from '../common/Auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import createHistory from 'history/createBrowserHistory'
import * as globalActions from '../actions/global'
import '../styles/app.scss'

import Home from '../components/Home'
import Login from '../components/User/Login'
import User from '../components/User'
import Contact from '../components/Contact'
import Rule from '../components/Rule'

import Setting from '../components/Setting'
import Changepwd from '../components/Setting/Changepwd'

import News from '../components/News'
import NewsDetail from '../components/News/Detail'

import Pasture from '../components/Pasture'
import CreatPasture from '../components/Pasture/CreatPasture'
import Friends from '../components/Pasture/Friends'
import Incomes from '../components/Pasture/Incomes'
import Equipment from '../components/Pasture/Equipment'
import EquipmentRecord from '../components/Pasture/EquipmentRecord'
import RechargeRecord from '../components/Pasture/RechargeRecord'
import Shared from '../components/Pasture/Shared'
import Recharge from '../components/Pasture/Recharge'
import Promotional from '../components/Pasture/Promotional'

import Growup from '../components/Growup'
import Harvest from '../components/Growup/Harvest'
import PastureRecord from '../components/Growup/Pasture'
import AddBreed from '../components/Growup/AddBreed'
import Clearn from '../components/Growup/Clearn'

import Trade from '../components/Trade'
import Sell from '../components/Trade/Sell'
import SellRecord from '../components/Trade/SellRecord'
import BuyRecord from '../components/Trade/BuyRecord'
import Withdraw from '../components/Trade/Withdraw'
import WithdrawRecord from '../components/Trade/WithdrawRecord'

import LuckyGame from '../components/LuckyGame'
import Turntable from '../components/LuckyGame/Turntable'
import TurntableRecord from '../components/LuckyGame/TurntableRecord'
import Bet from '../components/LuckyGame/Bet'
import BetRule from '../components/LuckyGame/Rule'
import BetRecord from '../components/LuckyGame/BetRecord'

import Game from '../components/Game'

const history = createHistory()

class App extends Component {
  render() {
    const { animateCls } = this.props.global
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/login'
          }} />
        )
      )} />
    )
    return (
      <Router history={history}>
        <Route render={({ location }) => {
          return (
            <CSSTransitionGroup
              transitionName={animateCls}
              transitionEnter={true}
              transitionLeave={true}
              transitionEnterTimeout={400}
              transitionLeaveTimeout={400}
            >
              <div key={location.pathname}>
                <Router>
                  <Switch>
                    <PrivateRoute location={location} exact path='/' component={Home} />
                    <PrivateRoute location={location} path='/game' component={Game} />
                    <Route location={location} path='/login' component={Login} />
                    <Route location={location} path='/signup' component={Promotional} />
                    <PrivateRoute location={location} path='/user' component={User} />
                    <PrivateRoute location={location} path='/contact' component={Contact} />
                    <PrivateRoute location={location} path='/rule' component={Rule} />
                    <PrivateRoute location={location} path='/setting' component={Setting} />
                    <PrivateRoute location={location} path='/changepwd' component={Changepwd} />
                    <PrivateRoute location={location} exact path='/news' component={News} />
                    <PrivateRoute location={location} path='/news/:id' component={NewsDetail} />
                    <PrivateRoute location={location} exact path='/pasture' component={Pasture} />
                    <PrivateRoute location={location} path='/pasture/creatpasture' component={CreatPasture} />
                    <PrivateRoute location={location} path='/pasture/friends' component={Friends} />
                    <PrivateRoute location={location} path='/pasture/incomes' component={Incomes} />
                    <PrivateRoute location={location} path='/pasture/buyequipment' component={Equipment} />
                    <PrivateRoute location={location} path='/pasture/equipmentrecord' component={EquipmentRecord} />
                    <PrivateRoute location={location} path='/pasture/recharge' component={Recharge} />
                    <PrivateRoute location={location} path='/pasture/rechargerecord' component={RechargeRecord} />
                    <PrivateRoute location={location} path='/pasture/shared' component={Shared} />
                    <PrivateRoute location={location} exact path='/growup' component={Growup} />
                    <PrivateRoute location={location} path='/growup/harvest' component={Harvest} />
                    <PrivateRoute location={location} path='/growup/pasture' component={PastureRecord} />
                    <PrivateRoute location={location} path='/growup/addbreed' component={AddBreed} />
                    <PrivateRoute location={location} path='/growup/clearn' component={Clearn} />
                    <PrivateRoute location={location} exact path='/trade' component={Trade} />
                    <PrivateRoute location={location} path='/trade/sell' component={Sell} />
                    <PrivateRoute location={location} path='/trade/sellrecord' component={SellRecord} />
                    <PrivateRoute location={location} path='/trade/buyrecord' component={BuyRecord} />
                    <PrivateRoute location={location} path='/trade/withdraw' component={Withdraw} />
                    <PrivateRoute location={location} path='/trade/withdrawrecord' component={WithdrawRecord} />
                    <PrivateRoute location={location} exact path='/luckygame' component={LuckyGame} />
                    <PrivateRoute location={location} path='/luckygame/turntable' component={Turntable} />
                    <PrivateRoute location={location} path='/luckygame/turntablerecord' component={TurntableRecord} />
                    <PrivateRoute location={location} exact path='/luckygame/zhxrecord' component={BetRecord} />
                    <PrivateRoute location={location} exact path='/luckygame/zhx' component={Bet} />
                    <PrivateRoute location={location} path='/luckygame/zhx/rule' component={BetRule} />
                  </Switch>
                </Router>
              </div>
            </CSSTransitionGroup>
          )
        }} />
      </Router>
    )
  }
}

App.propTypes = {
  global: PropTypes.object
}

const mapStateToProps = (state) => {
  const { auth, global } = state
  const { token, isAuthenticated, errorMessage } = auth

  return {
    global,
    token,
    isAuthenticated,
    errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(globalActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)