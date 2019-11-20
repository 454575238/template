import React from 'react'
import { Button } from 'antd'
import VirtualList from '@/components/virtualList'
import VirtualListS from '@/components/virtualListS'
import { of } from 'rxjs'
import { Card } from 'antd'
import './index.less'

interface IState {
  home: string
  value: string
  data: any[]
}

const defaultData: IState['data'] = []

class Home extends React.Component<{}, IState> {
  state = {
    home: 'hom',
    value: '213',
    data: defaultData,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: Array.from({ length: 10000 }).map((_, i) => i),
      })
    }, 1000)
  }

  handleSub = (e: React.MouseEvent<HTMLButtonElement>) => {
    // this.state.data.length--
    this.resetData()
  }

  handleAdd = () => {
    this.state.data.push(this.state.data.length)
    this.resetData()
  }

  resetData() {
    const data = this.state.data
    this.setState({ data })
  }

  render() {
    const { data } = this.state
    return (
      <div className="home-container">
        <Button onClick={this.handleSub}>sub</Button>
        <Button onClick={this.handleAdd}>add</Button>
        <div className="home-container-list">
          <VirtualListS data$={of(data)} options$={of({ height: 153 })}>
            {(data) => (
              <Card style={{ width: 153 }}>
                <p>{data}</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            )}
          </VirtualListS>
          {/* {data.map((index) => (
            <Card style={{ width: 153 }} key={index}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          ))} */}
        </div>

        {/* <VirtualList data$={of(data)} options$={of({ height: 500 })}>
          {(item) => (
            <div
              key={item}
              style={{ width: 300, height: 500, overflow: 'hidden' }}
            >
              {item}
            </div>
          )}
        </VirtualList> */}
      </div>
    )
  }
}

export default Home
