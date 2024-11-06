import React, { useState } from 'react'
const Calc = () => {
    const [sum, setSum] = useState(0)


    const Increment = () => {
        setSum(sum+1)

    }
    const Decrement = () => {
        setSum(sum-1)

    }
    const Reset = () => {
        setSum(0)


    }
  return (
    <div>
    <h1>{sum}</h1>
    <button   onClick={Increment}>Increment</button>
    <button  onClick={Decrement} >Decrement</button>
    <button style={{fontSize: `${sum+15}px`}} onClick={Reset}>Reset</button>
    </div>
  )
}

export default Calc