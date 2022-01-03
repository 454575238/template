import FormWithRef from '@/components/from/Form'
import { VirtualList } from '@/components/virtual-list'
import { Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { ChangeEvent, FC, useRef, useState } from 'react'

const Test: FC<{ value?: any; onChange?: any }> = props => {
  const { value, onChange } = props
  console.log(value)
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  // const onClick = () => {}
  return (
    <div>
      {/* <Input value={value} onChange={onInputChange}></Input> */}
      {/* <button onClick={onClick}>btn</button> */}
      <VirtualList />
    </div>
  )
}

// const Tes = memo(Test1)

const Home: FC = () => {
  const [value, setValue] = useState<string>()
  const [form] = useForm()
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setValue(value)
  }

  const onClick = () => {
    console.log(form.getFieldsValue())
  }

  return (
    <>
      <input type="text" onChange={handleInput} />
      {value}
      {/* <FormWithRef ref={form} initialValues={{ test: 2234, text2: 222 }}>
        <FormWithRef.Item name="test">
          <Test />
        </FormWithRef.Item>
        <FormWithRef.Item name="test1">
          <Test />
        </FormWithRef.Item> */}
      <button onClick={onClick}>btn</button>
      {/* </FormWithRef> */}
    </>
  )
}

export default Home
