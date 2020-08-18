import React, { PureComponent } from 'react'
interface IHomeState {
  home: string
  value: string
}

class Home extends PureComponent<IHomeState> {
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
          {this.state.home}
        </div>
      </div>
    )
  }
}

export default Home
