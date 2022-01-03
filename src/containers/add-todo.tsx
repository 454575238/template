import { FC } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '@/module/actions'
import { Dispatch } from '@/redux/dist'

const Add: FC<{ dispatch: Dispatch }> = ({ dispatch }) => {
  let input: {
    value: string
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}
export const AddTodo = connect()(Add)
