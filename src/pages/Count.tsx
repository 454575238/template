import React, { Component } from 'react'
import './Count.less'

interface ICount {
  name: string
}

class Count extends Component {
  render() {
    return (
      <div className="count-container">
        <span>count</span>
      </div>
    )
  }
}

export default Count
