import { createContext } from 'react'

const noop: any = () => {
  console.warn('If you forget to connect form using useForm please')
}

export const FieldContextValues = {
  getFieldValue: noop,
  getFieldsValue: noop,
  getFieldError: noop,
  getFieldsError: noop,
  resetFields: noop,
  setFields: noop,
  setFieldsValue: noop,
  setFieldValue: noop,
  submit: noop,
  initFields: noop,
  onTriggerChange: noop,
}

export const FieldContext = createContext(FieldContextValues)
