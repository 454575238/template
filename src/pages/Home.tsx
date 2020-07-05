import React from 'react'
import { isArray } from 'lodash'
interface IState {
  home: string
  value: string
}

class Home extends React.Component<IState> {
  state = {
    home: 'hom',
    value: '213',
  }

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    this.setState({ value })
  }

  render() {
    const { home, value } = this.state
    console.log(isArray(home))
    return (
      <div>
        {home}
        <div>
          <input type="text" onChange={this.handleInput} />
          <img src={require('../assets/micro-bit.png')} />
          {/* <img src="../assets/micro-bit.png" /> */}
        </div>
        {value}
      </div>
    )
  }
}

export default Home
