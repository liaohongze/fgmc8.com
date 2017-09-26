import React from 'react'
import PropTypes from 'prop-types'

export default class BetAmount extends React.PureComponent {
  static propTypes = {
    amount: PropTypes.string.isRequired,
    betAmount: PropTypes.func.isRequired,
    gameStatus: PropTypes.bool.isRequired
  }

  plus = () => {
    let temp = parseInt(this.props.amount) + 1
    if (temp <= 20) {
      this.props.betAmount(temp.toString())
    }
  }

  reduce = () => {
    let temp = parseInt(this.props.amount) - 1
    if (temp > 0) {
      this.props.betAmount(temp.toString())
    }
  }

  max = () => {
    this.props.betAmount('20')
  }

  handleChange = (e) => {
    if (parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 20) {
      this.props.betAmount(e.target.value.toString())
    }
  }

  render() {
    const { amount, gameStatus } = this.props
    return (
      <div className='amount'>
        <button onClick={this.max} disabled={gameStatus}>最大</button>
        <button onClick={this.reduce} disabled={gameStatus}>-</button>
        <input type='number' value={amount} disabled={gameStatus} onChange={this.handleChange} />
        <button onClick={this.plus} disabled={gameStatus}>+</button>
      </div>
    )
  }
}