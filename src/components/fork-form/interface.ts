import type { ReactElement } from 'react'
import type { ReducerAction } from './use-form'

export type InternalNamePath = (string | number)[]
export type NamePath = string | number | InternalNamePath

export interface Meta {
  touched: boolean
  validating: boolean
  errors: string[]
  name: InternalNamePath
}

export type StoreValue = any

export type Store = {
  [name: string]: StoreValue
}

export interface ValidateErrorEntity<Values = any> {
  values: Values
  errorFields: { name: InternalNamePath; errors: string[] }[]
  outOfDate: boolean
}
export interface FieldEntity {
  onStoreChange: (
    store: Store,
    namePathList: InternalNamePath[] | null,
    info: ValuedNotifyInfo,
  ) => void
  isFieldTouched: () => boolean
  isFieldDirty: () => boolean
  isFieldValidating: () => boolean
  isListField: () => boolean
  isList: () => boolean
  isPreserve: () => boolean
  validateRules: (option?: ValidateOptions) => Promise<string[]>
  getMeta: () => Meta
  getNamePath: () => InternalNamePath
  getErrors: () => string[]
  props: {
    name?: NamePath
    rules?: Rule[]
    dependencies?: NamePath[]
    initialValue?: any
  }
}

export interface FieldError {
  name: InternalNamePath
  error: string[]
}

// >>>> validate
type ValidateMessage = string | (() => string)

export interface ValidateMessages {
  default?: ValidateMessage
}

export interface ValidateOptions {
  triggerName?: string
  validateMessages?: ValidateMessages
  /**
   * Recursive validate 将会验证所有包含此名字所有字段
   * e.g. ['a'] will validate ['a'], ['a', 'b'], ['a', 1]
   */
  recursive?: boolean
}

export type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'

interface BaseRule {
  enum?: StoreValue[]
  len?: number
  max?: number
  message?: string | ReactElement
  min?: number
  pattern?: RegExp
  required?: boolean
  transform?: (value: StoreValue) => StoreValue
  type?: RuleType
  whitespace?: boolean
  // 自定义的 validateTrigger 必须是field validateTrigger 的子集
  validateTrigger?: string | string[]
}

type AggregationRule = BaseRule & Partial<ValidatorRule>

export type RuleObject = AggregationRule | ArrayRule

export type RuleRender = (form: FormInstance) => RuleObject

export type Rule = RuleObject | RuleRender

interface ArrayRule extends Omit<AggregationRule, 'type'> {
  type: 'array'
  defaultField?: RuleObject
}

type Validator = (
  rule: RuleObject,
  value: StoreValue,
  callback: (error?: string) => void,
) => Promise<void | any> | void

export interface ValidatorRule {
  message?: string | ReactElement
  validator: Validator
}

// >>>>

export type InternalValidateFields<Values = any> = (
  nameList?: NamePath[],
  options?: ValidateOptions,
) => Promise<Values>
export type ValidateFields<Values = any> = (
  nameList: NamePath[],
) => Promise<Values>

export interface InternalFieldData extends Meta {
  value: StoreValue
}

export interface FieldData extends Partial<Omit<InternalFieldData, 'name'>> {
  name: NamePath
}

// >>>>>>> info
interface ValueUpdateInfo {
  type: 'valueUpdate'
  source: 'internal' | 'external'
}

interface ValidateFinishInfo {
  type: 'validateFinish'
}

interface ResetInfo {
  type: 'reset'
}

interface SetFieldInfo {
  type: 'setField'
  data: FieldData
}

interface DependenciesUpdateInfo {
  type: 'dependenciesUpdate'
  relatedFields: InternalNamePath[]
}

export type NotifyInfo =
  | ValueUpdateInfo
  | ValidateFinishInfo
  | ResetInfo
  | SetFieldInfo
  | DependenciesUpdateInfo

export type ValuedNotifyInfo = NotifyInfo & {
  store: Store
}

export interface Callbacks<Values = any> {
  onValuesChange?: (changedValues: any, values: Values) => void
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void
  onFinish?: (values: Values) => void
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void
}

export interface InternalHooks {
  dispatch: (action: ReducerAction) => void
  initEntityValue: (entity: FieldEntity) => void
  registerField: (entity: FieldEntity) => () => void
  useSubscribe: (subscribable: boolean) => void
  setInitialValues: (values: Store, init: boolean) => void
  setCallbacks: (callback: Callbacks) => void
  getFields: (namePathList?: InternalNamePath[]) => FieldData[]
  setValidateMessages: (validateMessage: ValidateMessages) => void
  setPreserve: (preserve?: boolean) => void
}

export interface FormInstance<Values = any> {
  // Origin Form API
  getFieldValue: (name: NamePath) => StoreValue
  getFieldsValue(): Values
  getFieldsValue(
    nameList: NamePath[] | true,
    filterFunc?: (meta: Meta) => boolean,
  ): any
  getFieldError: (name: NamePath) => string[]
  getFieldsError: (nameList?: NamePath[]) => FieldError[]
  isFieldsTouched(nameList?: NamePath[], allFieldsTouched?: boolean): boolean
  isFieldsTouched(allFieldsTouched?: boolean): boolean
  isFieldTouched: (name: NamePath) => boolean
  isFieldValidating: (name: NamePath) => boolean
  isFieldsValidating: (nameList: NamePath[]) => boolean
  resetFields: (fields: NamePath[]) => void
  setFields: (fields: FieldData) => void
  setFieldsValue: (value: RecursivePartial<Values>) => void
  validateFields: ValidateFields<Values>

  // 这好像是fields form 新增的
  submit: () => void
}

export type InternalFormInstance = Omit<FormInstance, 'validateFields'> & {
  validateFields: InternalValidateFields

  prefixName?: InternalNamePath

  validateTrigger?: string | string[] | false

  getInternalHooks: (secret: string) => InternalHooks | null
}

type RecursivePartial<T> = T extends object
  ? {
      [P in keyof T]?: T[P] extends Record<string, any>
        ? RecursivePartial<T[P]>
        : T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P]
    }
  : any
