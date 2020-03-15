import React, { Component } from 'react'
import './Count.less'

import { DatePicker, Icon, Button } from 'antd'
import axios from 'axios'

// class Child extends Component {
//   componentDidMount() {
//     console.log('child')
//   }
//   render() {
//     return <div>123</div>
//   }
}
interface ICount {
  name: string
}

class Count extends Component {
  componentDidMount() {
    console.log('Count')
  }
  render() {
    return (
      <div className="count-container">
        <Child />
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
