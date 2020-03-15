import React from 'react'
import { render, createPortal } from 'react-dom'
import Home from '@/pages/Home'
interface IParams {
  baseUrl: string
  adapter?: () => void
}

function ajax(url: string, div: HTMLDivElement) {
  setTimeout(() => {
    console.log('loading end')
    // render(<Loading loading={false} />, div)
  }, 1000)

}

class Axios {
  static create(params: IParams): Axios {
    return new Axios().create(params)
  }

  baseUrl: string = '/'

  create(params: IParams) {
    this.baseUrl = params.baseUrl
    return this
  }

  get(com: any) {
    console.log('loading')
    const Load = React.createElement('div', { loading: false }, 235)
    const div = document.createElement('div')
    render(Load, div)
    document.body.append(div)
    ajax(this.baseUrl, div)
  }
}

function Loading(props: any) {
  console.log(123)
  return (
    <>
      {
        props.loading && 23234
      }
    </>
  )
}

export const aixos = Axios.create({
  baseUrl: './hahah',
})
