import { createContext } from 'react'
import type { InternalFormInstance } from './interface'

export const HOOK_MARK = 'FW_FORM_INTERNAL_HOOKS'
const warningFunc: any = () => {
  console.warn(
    'Can not find FormContext. please make sure you warp field under Form.',
  )
}

const Context = createContext<InternalFormInstance>({
  getFieldValue: warningFunc,
  getFieldsValue: warningFunc,
  getFieldsError: warningFunc,
  getFieldError: warningFunc,
  isFieldTouched: warningFunc,
  isFieldsTouched: warningFunc,
  isFieldValidating: warningFunc,
  isFieldsValidating: warningFunc,
  resetFields: warningFunc,
  setFields: warningFunc,
  setFieldsValue: warningFunc,
  validateFields: warningFunc,
  submit: warningFunc,

  getInternalHooks: () => {
    warningFunc()
    return {
      dispatch: warningFunc,
      initEntityValue: warningFunc,
      registerField: warningFunc,
      useSubscribe: warningFunc,
      setInitialValues: warningFunc,
      setCallbacks: warningFunc,
      getFields: warningFunc,
      setValidateMessages: warningFunc,
      setPreserve: warningFunc,
    }
  },
})

export default Context
