import React, { Component } from 'react'
import './Count.less'

import { DatePicker, Icon, Button } from 'antd'
import axios from 'axios'

console.log(axios)
interface ICount {
  name: string
}

class Count extends Component {
  render() {
    return (
      <div className="count-container">
        <DatePicker />
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Icon type="radius-upright" />
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
      </div>
    )
  }
}

export default Count
