import {
  FC,
  useMemo,
  useState,
  FormEvent,
  useImperativeHandle,
  forwardRef,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import { FieldContext, FieldContextValues } from './context'
import Item from './Item'

interface FormProps {
  initialValues?: any
  onSubmit?: (e: FormEvent) => void
  form?: any
  children: ReactNode
}

const Form: FC<FormProps> = props => {
  const { initialValues = {}, children, onSubmit, form } = props
  if (!children) return null

  const initFormFields = useMemo(() => initialValues, [])
  const [namePath, setNamePath] = useState<string[]>([])

  const [collectItems, setCollectItems] = useState<{ [key: string]: string }>(
    {},
  )
  const [fieldsValue, setFieldsValue] = useState(initFormFields)
  const testValue = useRef<any>(fieldsValue)

  useEffect(() => {
    Object.values(collectItems).forEach(name => {
      if (!(name in fieldsValue)) {
        setFieldsValue({ ...fieldsValue, [name]: '' })
      }
    })
  }, [collectItems])

  const getFieldValue = (name: string) => {
    return fieldsValue[name]
  }

  const onTriggerChange = useCallback((name: string, value: any) => {
    testValue.current = { ...testValue.current, [name]: value }
    setFieldsValue(testValue.current)
  }, [])

  const setFieldValue = useCallback(
    (name: string, value: any) => {
      setFieldsValue({ ...fieldsValue, [name]: value })
    },
    [fieldsValue],
  )

  const getFieldsValue = () => {
    return fieldsValue
  }

  const setFields = (name: string) => {
    // namePath.push(name)
  }

  const initFields = (itemKey: string, name: string) => {
    // setCollectItems({ ...collectItems, [itemKey]: name })
  }

  useImperativeHandle(form, () => {
    return {
      onSubmit,
      setFieldsValue,
      setFieldValue,
      getFieldsValue,
      setFields,
      initFields,
      getFieldValue,
      onTriggerChange,
    }
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        onSubmit?.(e)
      }}
    >
      <FieldContext.Provider
        value={{
          setFieldsValue,
          setFieldValue,
          getFieldsValue,
          setFields,
          initFields,
          getFieldValue,
          onTriggerChange,
        }}
      >
        {useMemo(() => children, [getFieldValue])}
      </FieldContext.Provider>
    </form>
  )
}

const FormWithRef = forwardRef<FC<FormProps>, FormProps>((props, ref) => (
  <Form {...props} form={ref} />
))

FormWithRef.displayName = 'Form'

FormWithRef.Item = Item

export default FormWithRef
