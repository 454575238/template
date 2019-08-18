import React from 'react'

interface IState {
  home: string
  value: string
}

class Home extends React.Component<IState> {
  state = {
    home: 'home',
    value: '222',
  }

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    this.setState({ value })
  }

  render() {
    const { home, value } = this.state
    return (
      <div>
        {home}
        <br />
        <input type="text" onChange={this.handleInput} />
        <br />
        {value}
      </div>
    )
  }
}

export default Home
