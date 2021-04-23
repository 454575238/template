import { PureComponent, ReactElement, ReactNode } from 'react'
import { FieldContext } from '../from/context'
import { HOOK_MARK } from './field-context'
import type {
  FieldEntity,
  FormInstance,
  InternalFormInstance,
  InternalNamePath,
  Meta,
  NamePath,
  NotifyInfo,
  Rule,
  Store,
  StoreValue,
} from './interface'

export type ShouldUpdate<Values = any> =
  | boolean
  | ((
      prevValues: Values,
      nextValues: Values,
      info: { source?: string },
    ) => boolean)

function requireUpdate(
  shouldUpdate: ShouldUpdate,
  prev: StoreValue,
  next: StoreValue,
  prevValue: StoreValue,
  nextValue: StoreValue,
  info: NotifyInfo,
): boolean {
  if (typeof shouldUpdate === 'function') {
    return shouldUpdate(
      prev,
      next,
      'source' in info ? { source: info.source } : {},
    )
  }
  return prevValue !== nextValue
}

interface ChildProps {
  [name: string]: any
}

export interface InternalFieldProps<Values = any> {
  children?:
    | ReactElement
    | ((
        control: ChildProps,
        meta: Meta,
        form: FormInstance<Values>,
      ) => ReactNode)
  /**
   * 设置 `dependencies`
   * 如果依赖字段更新且当前字段被触摸 将会触发验证规则和render
   */
  dependencies?: NamePath[]
  getValueFromEvent?: (...args: any) => StoreValue
  name?: InternalNamePath
  normalize?: (
    value: StoreValue,
    prevValue: StoreValue,
    allValues: Store,
  ) => StoreValue
  rules?: Rule[]
  shouldUpdate?: ShouldUpdate<Values>
  trigger?: string
  validateTrigger?: string | string[] | false
  validateFirst?: boolean | 'parallel' // 相同的
  valuePropName?: string
  getValueProps?: (value: StoreValue) => object
  messageVariables?: Record<string, string>
  initialValue?: any
  onReset?: () => void
  preserve?: boolean

  /** @private */
  isListField?: boolean

  /** @private */
  isList?: boolean

  /** @private 因为class组件不能在constructor中使用context 所以用props传进来 */
  fieldContext?: InternalFormInstance
}

export interface FieldProps<Values = any>
  extends Omit<InternalFieldProps<Values>, 'name' | 'fieldContext'> {
  name?: NamePath
}

export interface FieldState {
  resetCount: number
}

class Field extends PureComponent<InternalFieldProps, FieldState> {
  public static contextType = FieldContext

  public static defaultProps = {
    trigger: 'onChange',
    valuePropName: 'value',
  }

  public state = {
    resetCount: 0,
  }

  private mounted = false
  // 只返回需要验证的 子节点 如果不需要验证 就不做任何事情
  // getOnlyChild = (
  //   children: InternalFieldProps['children']
  // ): {child: ReactNode | null, isFunction: boolean} => {
  //   if(typeof children === 'function') {

  //   }

  constructor(props: InternalFieldProps) {
    super(props)
    if (props.fieldContext) {
      const { getInternalHooks }: InternalFormInstance = props.fieldContext
      const { initEntityValue } = getInternalHooks(HOOK_MARK)
      initEntityValue((this as unknown) as FieldEntity)
    }
  }
}
