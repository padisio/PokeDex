import React, { useState } from 'react'
import { useCounter } from '../hooks/useCounter'

import { useFetch } from '../hooks/useFetch'
import { PokeCard } from './PokeCard'
import { PokeList } from './PokeList'




export const GridApp = () => {

    const [inputValue, setInputValue] = useState('')
    const [counter, handleAdd, , handleSubstract, setCounter] = useCounter(1);
    const { data, loading, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/${counter}`)




    const handleChange = (e) => {

        setInputValue(parseInt(e.target.value));
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setCounter(inputValue)

    }

    const irAlPrimero = () => {
        return setCounter(1);
    }

    const irAlUltimo = () => {
        return setCounter(898);
    }








    return (<div className='containter'>
        <div className='row mt-3'>
            <div className=' col-5'>
                <img className='logo cabecera' alt='logo' src='https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png' />  <h1 className='cabecera'>PokéDex</h1>

            </div>
            <div className='col-7 text-end'>
                <button onClick={irAlPrimero} className='btn btn-primary navBot'> &lt;&lt;</button>
                {(counter > 1) ? <button onClick={handleSubstract} className='navBot btn btn-primary'>Anterior</button> : <button className='navBot btn btn-secondary'>Anterior</button>}
                {(counter < 898) ? <button onClick={handleAdd} className='navBot btn btn-primary'>Siguiente</button> : <button className='navBot btn btn-secondary'>Siguiente</button>}
                <button onClick={irAlUltimo} className='btn btn-primary navBot'> &gt;&gt;</button>

            </div>

        </div>

        <hr />
        <form onSubmit={handleSubmit} className='form-group'>
            <input
                type='number'
                className='form-control'
                min='1'
                max='898'
                onChange={handleChange}
                value={inputValue}
                required
            ></input>
        </form>
        <hr />
    
    <PokeCard data={data} loading={loading} error={error} counter={counter}/>

    <PokeList setCounter={setCounter} />
    </div>
    )
}

