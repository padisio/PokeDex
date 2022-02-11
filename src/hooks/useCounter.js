import { useState } from "react"


export const useCounter = (initialValue=0) => {
  
    const [counter, setCounter] = useState(initialValue)
    
        const handleAdd = () =>{
            setCounter(counter+1);
        }
    
        const handleSubstract = () =>{
            setCounter(counter-1);
        }
    
        const handleReset = () =>{
            setCounter(initialValue);
        }
    
    return [counter, handleAdd, handleReset, handleSubstract, setCounter];



}

