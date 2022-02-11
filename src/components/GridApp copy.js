import React, { useState } from 'react'
import { useCounter } from '../hooks/useCounter'
import { useEvolution } from '../hooks/useEvolution'
import { useFetch } from '../hooks/useFetch'
import { PokeList } from './PokeList'




export const GridApp = () => {

    const [inputValue, setInputValue] = useState('')
    const [counter, handleAdd, , handleSubstract, setCounter] = useCounter(1);
    const { data, loading, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/${counter}`)
    const evolution = useEvolution(data);



    // const { data: evoluciones, loading: cargaEvolucion } = useFetch(`https://pokeapi.co/api/v2/evolution-chain/${counter}`);
    const handleUrl = (id) => {
        const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        return url;

    }

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

    const aCentimetros = (pulgadas) => {


        return pulgadas * 2.54;

    }

    const aKilos = (libras) => {
        return Math.round(libras / 2.205);
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
        <div className='cardContainer row'>

            {loading ? <img className='loading' alt="loading" src='https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif' /> :
                <>
                    {error ? <div className='mt-1'>El Pokemon no existe</div> : <>



                        <div className='col-12 mb-1  row headCont'>
                            <h2 className='animate__animated animate__fadeInLeft mt-3 col-6'>#{data.id} - {data.name.toUpperCase()}</h2>
                            <div className='col-6 text-end animate__animated animate__fadeInUp '>
                                {data.types.map(clase => <span key={clase.type.name} className='clase'>{clase.type.name.toUpperCase()}</span>)}
                            </div>
                        </div>
                        <hr />
                        <div className='col-4'>
                            <div className='imagenContainter align-items-center animate__animated animate__zoomIn'>

                                <img className='pokeImage' alt={data.name} src={handleUrl(data.id)} />

                            </div>

                        </div>
                        <div className='col-8 datosContainer animate__animated animate__fadeInRight row'>

                            <div className='col-6'>
                                <div className='estadisticasCont'>
                                    <ul>
                                        <li key='altura'>Altura: {aCentimetros(data.height)} cm</li>
                                        <li key='peso'>Peso: {aKilos(data.weight)} kg</li>
                                    </ul>

                                </div>


                                <div className='estadisticasCont'>
                                    <p>Estadísiticas básicas</p>
                                    <ul>
                                        {
                                            data.stats.map(stat => {
                                                return <li key={stat.stat.name}>{stat.stat.name} : {stat.base_stat}</li>
                                            })
                                        }
                                    </ul>

                                </div>
                            </div>

                            <div className='col-6'>
                                <h3 className='mt-2'>Habilidades:</h3>
                                <ul className='list-group'>

                                    {

                                        data.abilities.map(skill => <li key={skill.ability.name} className='list-group-item'> {skill.ability.name} </li>)

                                    }

                                </ul>

                                <h3 className='mt-2'>Cadena de evolución</h3>
                                <ul className='list-group'>


                                    {/* EVOLUTION AQUI */}

                                    {evolution && <>
                                        <li className='list-group-item'>{evolution.chain.species.name.toUpperCase()}</li>

                                        {
                                            evolution.chain.evolves_to.map(item => <>
                                            <li className='list-group-item'>{item.species.name.toUpperCase()}</li>

                                            {item.evolves_to.map(item2 => {

                                                return <li className='list-group-item'>{item2.species.name.toUpperCase()}</li>

                                            })}
                                            
                                            </>)
                                        }

                                    </>
                                    }

                                </ul>

                            </div>
                        </div>
                    </>
                    }
                </>}



        </div>
        <PokeList setCounter={setCounter} />

    </div>
    )
}

