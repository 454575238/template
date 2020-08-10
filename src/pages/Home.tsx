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
    return (
      <div>
        <div>
          <input type="text" onChange={this.handleInput} />
        </div>
      </div>
    )
  }
}

export default Home
