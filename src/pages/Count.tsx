import React, { Component } from 'react'
import './Count.less'

import { DatePicker, Icon, Button } from 'antd'
import axios from 'axios'

interface ICount {
  name: string
}

class Count extends Component {
  render() {
    return (
      <div className="count-container">
        <DatePicker />
      </div>
    )
  }
}

export default Count
