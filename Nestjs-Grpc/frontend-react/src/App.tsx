import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import './App.css'
import { sumRequest, SumResponse } from './domain/sum'

const Container = styled.div`
  margin: 150px auto;
  width: 300px;
  text-align: center;
`

const Input = styled.input`
  border: 1px solid black;
  background: transparent;
  margin: 16px auto;
  padding: 8px;
`

const Button = styled.button`
  border: 1px solid black;
  background: transparent;
  margin: 16px auto;
  padding: 8px;
`

const useInput = () => {
  const [value, setValue] = useState('')
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }, [])
  return { value, onChange }
}

const App: React.FC = () => {
  const { value: valueA, onChange: onChangeA } = useInput()
  const { value: valueB, onChange: onChangeB } = useInput()

  const [result, setResult] = useState(0)

  const onSumClicked = useCallback(() => {
    sumRequest(+valueA, +valueB).then(r => {
      setResult((r as SumResponse).result)
    })
  }, [valueA, valueB])

  return (
    <Container>
      <Input onChange={onChangeA} value={valueA} placeholder="Enter A number" />
      <Input onChange={onChangeB} value={valueB} placeholder="Enter B number" />
      <br />
      <Button onClick={onSumClicked}>Sum</Button>
      <p>Result: {result}</p>
    </Container>
  )
}

export default App
