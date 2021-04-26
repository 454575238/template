import { HOOK_MARK } from './field-context'
import { useRef, useState } from 'react'
import type {
  Callbacks,
  FieldEntity,
  FormInstance,
  InternalFormInstance,
  InternalHooks,
  InternalNamePath,
  NamePath,
  Store,
  StoreValue,
  ValidateMessages,
} from './interface'
import { getNamePath, getValue, setValue, setValues } from './utils/valueUtil'

type InternalFieldEntity = { VALIDATE_NAME_PATH: InternalNamePath }

interface UpdateAction {
  type: 'updateValue'
  namePath: InternalNamePath
  value: StoreValue
}

interface ValidateAction {
  type: 'validateField'
  namePath: InternalNamePath
  triggerName: string
}

export type ReducerAction = UpdateAction | ValidateAction

export class FormStore {
  private initialValues: Store = {}

  private store: Store = {}

  private callbacks: Callbacks

  private validateMessages: ValidateMessages

  private preserve?: boolean

  private formHooked = false

  private fieldEntities: FieldEntity[]

  private forceRootUpdate: () => void

  constructor(forceRootUpdate: () => void) {
    this.forceRootUpdate = forceRootUpdate
  }

  public getForm = (): InternalFormInstance =>
    ({
      getFieldValue: this.getFieldValue,
    } as InternalFormInstance) // TODO ..
  // 看起来像是init阶段传递的钩子
  public getInternalHooks = (key: string): InternalHooks | null => {
    if (key === HOOK_MARK) {
      this.formHooked = true
      return {
        setInitialValues: this.setInitialValues,
        setValidateMessages: this.setValidateMessages,
        setCallbacks: this.setCallbacks,
        setPreserve: this.setPreserve,
      } as InternalHooks // TODO..
    }
    console.warn('`getInternalHooks` is internal usage. Should not to called')
    return null
  }
  /**
   * First time `setInitialValues` should update store with initial value
   */
  private setInitialValues = (initialValues: Store, init: boolean) => {
    this.initialValues = initialValues || {}
    if (init) {
      this.store = setValues({}, initialValues, this.store)
    }
  }

  private getInitialValue = (namePath: InternalNamePath) =>
    getValue(this.initialValues, namePath)

  private setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = callbacks
  }

  private setValidateMessages = (validateMessages: ValidateMessages) => {
    this.validateMessages = validateMessages
  }

  private setPreserve = (preserve: boolean) => {
    this.preserve = preserve
  }

  // =========== Dev Warning =============

  private timeoutId: number = null

  private warningUnhooked = () => {
    if (
      (process.env.NODE_ENV !== 'production' && !this,
      this.timeoutId && typeof window !== 'undefined')
    ) {
      this.timeoutId = window.setTimeout(() => {
        this.timeoutId = null
        if (!this.formHooked) {
          console.warn(
            'Instance created by `useForm` is not connected to any form element , Forget to pass form props',
          )
        }
      })
    }
  }

  // ============== Fields =================

  /**
   * Get registered field entities
   * @param pure Only return field which has a `name` default false
   */
  private getFieldEntities = (pure = false) => {
    if (!pure) return this.fieldEntities

    return this.fieldEntities.filter(field => field.getNamePath().length)
  }

  private getFieldValue = (name: NamePath) => {
    this.warningUnhooked()
    const namePath = getNamePath(name)
    return getValue(this.store, namePath)
  }

  // =============== Observer ==================
  /**
   * This only trigger when a field is on constructor to avoid we get initialValue too late
   */
  private initEntityValue = (entity: FieldEntity) => {
    const { initialValue } = entity.props

    if (initialValue) {
      const namePath = entity.getNamePath()
      const prevValue = getValue(this.store, namePath)

      if (!prevValue) {
        this.store = setValue(this.store, namePath, initialValue)
      }
    }
  }

  private registerField = (entity: FieldEntity) => {
    this.fieldEntities.push(entity)

    // set initial values
    if (entity.props.initialValue) {
    }
  }

  /**
   * Reset Field with field `initialValue` prop
   * Can pass `entities` or `namePathList` or just nothing
   */
  private resetWithFieldInitialValue = (info: {
    entities?: FieldEntity[]
    namePathList?: InternalNamePath[]
    /** Skip reset if store exist value. This is only used for field register reset */
    skipExist?: boolean
  }) => {
    // Create cache
    // const cache: NameMap // TODO ..
  }
}

const useForm = <Values = any>(
  form?: FormInstance<Values>,
): [FormInstance<Values>] => {
  const [_, forceUpdate] = useState({})
  const formRef = useRef<FormInstance<Values>>(null)
  const forceRootUpdate = () => {
    forceUpdate({})
  }

  if (form) {
    formRef.current = form
  } else {
    const formStore = new FormStore(forceRootUpdate)
    formRef.current = formStore.getForm()
  }

  return [formRef.current]
}

export default useForm
