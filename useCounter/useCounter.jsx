import { useState } from "react"

export const useCounter = (initialvalue = 10) => {

    const [counter, setCounter] = useState(initialvalue)

    const increment = () => {
        setCounter(counter + 1);
    }
    const decrement = () => {
        setCounter(counter - 1);
    }
    const reset = () => {
        setCounter(initialvalue);
    }

    return {
        counter,
        increment,
        decrement,
        reset
    }
}