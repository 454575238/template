import React, { useState, useEffect, useRef } from 'react'
import {
  interval,
  Observable,
  timer,
  BehaviorSubject,
  combineLatest,
  Subscription,
  fromEvent,
} from 'rxjs'
import { tap, map, withLatestFrom, startWith, filter } from 'rxjs/operators'
import { useObservable } from 'rxjs-hooks'
import './index.less'
interface IVirtalListOptions {
  height: number
}

interface IVirtalListProps {
  data$: Observable<number[]>
  options$: Observable<IVirtalListOptions>
  children: (data: any) => JSX.Element
}

function VirtualList(props: IVirtalListProps) {
  const containerHeight$ = new BehaviorSubject<number>(0)

  const [data, setData] = useState([])
  const [height, seHeight] = useState(0)
  const listContainerRef = useRef(null)
  const { children } = props
  const sub = new Subscription()
  let lastFirstIndex: any = null

  useEffect(() => {
    const virtualListEle: HTMLDivElement = listContainerRef.current
    containerHeight$.next(virtualListEle.clientHeight)

    const actualRows$ = combineLatest(containerHeight$, props.options$).pipe(
      map(([ch, { height }]) => Math.ceil(ch / height) + 3),
    )

    const scrollWin$ = fromEvent(virtualListEle, 'scroll').pipe(
      startWith({ target: { scrollTop: 0 } }),
    )

    const shouldUpdate$ = combineLatest(
      scrollWin$.pipe(map(() => virtualListEle.scrollTop)),
      props.options$,
      actualRows$,
    ).pipe(
      map(([scrollTop, { height }, actualRows]) => {
        console.log(scrollTop, { height }, actualRows)
        return [Math.floor(scrollTop / height), actualRows, height]
      }),
      filter(([curIndex]) => {
        console.log(curIndex)
        return curIndex !== lastFirstIndex
      }),
      // map(function() {
      //   console.log(arguments)
      //   return []
      // }),
      tap(([curIndex]) => (lastFirstIndex = curIndex)),
      map(([firstIndex, actualRows, height]) => {
        console.log(firstIndex, actualRows)
        const lastIndex = firstIndex + actualRows
        console.log(height)
        return [firstIndex, lastIndex, height]
      }),
    )

    const dataInViewSlice$ = combineLatest(props.data$, shouldUpdate$).pipe(
      map(([data, [firstIndex, lastIndex, height]]) => {
        console.log([firstIndex, lastIndex, height])
        return data.slice(firstIndex, lastIndex).map((item) => ({
          original: item,
          position: firstIndex * height,
          index: firstIndex++,
        }))
      }),
    )

    const scrollHeight$ = combineLatest(props.data$, props.options$).pipe(
      map(([data, { height }]) => data.length * height),
    )

    sub.add(
      combineLatest(dataInViewSlice$, scrollHeight$, shouldUpdate$).subscribe(
        ([data, height]) => {
          setData(data)
          seHeight(height)
        },
      ),
    )

    return () => {
      sub.unsubscribe()
    }
  }, [listContainerRef.current])

  return (
    <div className="virtual-list-container" ref={listContainerRef}>
      <div style={{ height, position: 'relative' }}>
        {data.map((item, index) => (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              transform: `translateY(${item.position}px)`,
            }}
            key={item.key}
          >
            {children(item.original)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VirtualList
