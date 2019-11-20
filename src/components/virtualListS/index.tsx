import React, { useEffect, useRef, useState } from 'react'
import {
  Observable,
  BehaviorSubject,
  combineLatest,
  fromEvent,
  Subscription,
  merge,
} from 'rxjs'
import './index.less'
import {
  pluck,
  map,
  startWith,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators'

interface IVirtalListOptions {
  height: number
}

interface IVirtualListProps {
  data$: Observable<number[]>
  options$: Observable<IVirtalListOptions>
  children: (data: number) => JSX.Element
}

export default function VirtualList(props: IVirtualListProps) {
  const virtualListEle = useRef(null)
  const [height, setHeight] = useState(0)
  const [data, setData] = useState([])
  const { options$, data$, children } = props

  useEffect(() => {
    const sub = new Subscription()
    const containerHeight$ = new BehaviorSubject(0) // 多播

    containerHeight$.next(virtualListEle.current.clientHeight)

    const scrollHeight$ = combineLatest(
      data$,
      options$,
      (data, { height }) => height * data.length,
    )

    const scrollTop$ = fromEvent(virtualListEle.current, 'scroll').pipe(
      pluck('target', 'scrollTop'),
      startWith(0),
      distinctUntilChanged(),
      filter((scrollTop: number) => scrollTop >= 0),
    )

    const actualRows$ = combineLatest(containerHeight$, options$).pipe(
      map(([ch, { height }]) => Math.ceil(ch / height) + 3),
    )

    const firstIndex$ = combineLatest(scrollTop$, options$).pipe(
      map(([scrollTop, { height }]) => Math.floor(scrollTop / height)),
      distinctUntilChanged(),
    )

    const shouldUpdate$ = combineLatest(
      firstIndex$,
      actualRows$,
      (firstIndex: number, actualRows) => {
        const lastIndex = firstIndex + actualRows
        return [firstIndex, lastIndex]
      },
    )

    const dataInViewSlice$ = combineLatest(
      shouldUpdate$,
      data$,
      options$,
      ([firstIndex, lastIndex], data, { height }) => {
        console.log(firstIndex, lastIndex)
        return data.slice(firstIndex, lastIndex).map((item, index) => {
          return {
            origin: item,
            position: firstIndex * height,
            key: index,
            firstIndex: firstIndex++,
          }
        })
      },
    )

    sub.add(
      combineLatest(scrollHeight$, dataInViewSlice$)
        .pipe(distinctUntilChanged())
        .subscribe(([height, data]) => {
          setHeight(height)
          setData(data)
        }),
    )

    return () => {
      sub.unsubscribe()
    }
  }, [virtualListEle.current, data$])

  return (
    <div ref={virtualListEle} className="virtual-list">
      <div
        style={{ height: height + 'px', position: 'relative' }}
        className="virtual-list-container"
      >
        {data.map((item) => {
          return (
            <div
              key={item.key}
              style={{
                transform: `translateY(${item.position}px)`,
                position: 'absolute',
              }}
            >
              {children(item.origin)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
