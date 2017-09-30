import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import Client from '../../common/Client'
import './BetHistory.scss'

let Timer

export default class BetHistory extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    gamblings: PropTypes.object.isRequired,
    historyData: PropTypes.array.isRequired
  }

  state = {
    contentHeight: '0',
    historyData: [],
    gamblings: {id: '', 'periodNumber': '', 'round': 0, 'stage': 0}
  }

  handleHide = () => {
    this.setState({contentHeight: '0'})
    Timer = window.setTimeout(() => {
      this.props.close()
    }, 310)
  }

  componentDidMount () {
    Timer = window.setTimeout(() => {
      this.setState({contentHeight: '320px'})
    }, 100)
    // Client.getGamblingsRound(result => {
    //   if (!result.errored) {
    //     let arr = []
    //     for (let i = 0; i < 6; i++) {
    //       let arr2 = []
    //       for (let j = 0; j < 6; j++) {
    //         if (result.object[i * 6 + j]) {
    //           arr2.push(result.object[i * 6 + j])
    //         } else {
    //           arr2.push({name: ''})
    //         }
    //       }
    //       arr.push(arr2)
    //     }
    //     this.setState({historyData: arr})
    //   }
    // })
  }

  componentWillReceiveProps(nextProps) {
    let arr = []
    for (let i = 0; i < 6; i++) {
      let arr2 = []
      for (let j = 0; j < 6; j++) {
        if (nextProps.historyData[i * 6 + j]) {
          arr2.push(nextProps.historyData[i * 6 + j])
        } else {
          arr2.push({name: ''})
        }
      }
      arr.push(arr2)
    }
    this.setState({historyData: arr, gamblings: nextProps.gamblings})
  }

  componentWillUnmount() {
    window.clearTimeout(Timer)
  }

  render() {
    const {contentHeight, historyData, gamblings} = this.state
    return (
      <div className='history-dialog-wrapper'>
        <div className='history-dialog-bg' onClick={this.handleHide} />
        <div className='history-dialog' style={{height: contentHeight}}>
          <div className='history-content'>
            <div>第{gamblings.round}局, 第{gamblings.stage}场</div>
            <table cellSpacing='0'>
              <tbody>
                {
                  historyData.map((tr, key) => {
                    return (
                      <tr key={key}>
                        {
                          tr.map((item, index) => {
                            return <td key={index}>{item.name}</td>
                          })
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div className='close' onClick={this.handleHide}>收起</div>
          </div>
        </div>
      </div>
    )
  }
}