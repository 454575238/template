import React, { FC, useState } from 'react'

const Home: FC = () => {
  const [home, setHome] = useState<string>()
  const [value, setValue] = useState<string>()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setValue(value)
  }

  return (
    <>
      <input type="text" onChange={handleInput} />
      {home}
      {value}
    </>
  )
}

export default Home
