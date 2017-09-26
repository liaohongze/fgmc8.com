import React from 'react'
import PropTypes from 'prop-types'

export default class BetNumber extends React.PureComponent {
  static propTypes = {
    betNum: PropTypes.number.isRequired,
    chooseBetNum: PropTypes.func.isRequired,
    gameStatus: PropTypes.bool.isRequired
  }

  zhuang = () => {
    if (!this.props.gameStatus) {
      this.props.chooseBetNum(0, '庄', 1.9)
    }
  }

  he = () => {
    if (!this.props.gameStatus) {
      this.props.chooseBetNum(1, '和', 8)
    }
  }

  xian = () => {
    if (!this.props.gameStatus) {
      this.props.chooseBetNum(2, '闲', 1.9)
    }
  }

  render() {
    const { betNum } = this.props
    return (
      <div className='choose'>
        <div onClick={this.zhuang} className={betNum === 0 ? 'zhuang active-choose' : 'zhuang'}><h3>庄</h3>1赔1.9</div>
        <div onClick={this.he} className={betNum === 1 ? 'he active-choose' : 'he'}><h3>和</h3>1赔8</div>
        <div onClick={this.xian} className={betNum === 2 ? 'xian active-choose' : 'xian'}><h3>闲</h3>1赔1.9</div>
      </div>
    )
  }
}