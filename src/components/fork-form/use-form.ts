import type { InternalNamePath, Store, StoreValue } from './interface'

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

  /**
   * First time `setInitialValues` should update store with initial value
   */
  private setInitialValues = (initialValues: Store = {}, init: boolean) => {
    this.initialValues = initialValues
    if (init) {
      // TODO.. this.store = s
    }
  }
}
