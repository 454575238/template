import { uniqueId } from 'lodash'
import {
  Children,
  FC,
  ReactElement,
  useCallback,
  useContext,
  cloneElement,
  useEffect,
  useRef,
  useMemo,
} from 'react'

import { FieldContext } from './context'

interface FormItemProps {
  name?: string
}

const Item: FC<FormItemProps> = props => {
  const { name, children } = props
  const currentItemId = useRef<string>()
  const { getFieldValue, onTriggerChange, initFields } =
    useContext(FieldContext)

  useEffect(() => {
    currentItemId.current = uniqueId(name)
  }, [])

  useEffect(() => {
    initFields(currentItemId.current, name)
  }, [name])

  const currentFieldValue = getFieldValue(name)

  const onChange = useCallback(
    (val: any) => {
      onTriggerChange(name, val)
    },
    [name],
  )

  const injectNewPropsToChild = useCallback(
    (child: ReactElement, index: number) => {
      if (!child) return null
      if (typeof child.type === 'string') return child
      const childProps = child.props as FormItemProps

      const currentProps = {
        key: child.key ?? index,
        value: currentFieldValue,
        onChange,
        ...childProps,
      }

      return cloneElement(child, currentProps)
    },
    [currentFieldValue],
  )

  const getNewChildren = useMemo(() => {
    return Children.map(children as ReactElement, injectNewPropsToChild)
  }, [injectNewPropsToChild])

  return <> {getNewChildren}</>
}

export default Item
