import React from 'react'
import { useEvolution } from '../hooks/useEvolution'
export const PokeCard = ({data, loading, error, counter}) => {
    

    const handleUrl = (id) => {
        const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        return url;

    }

    
    const aCentimetros = (pulgadas) => {


        return pulgadas * 2.54;

    }

    const aKilos = (libras) => {
        return Math.round(libras / 2.205);
    }
    const evolution = useEvolution(data);
    return (
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
                            <div className='imagenContainter align-items-center animate__animated animate__fadeIn'>

                                <img className='pokeImage' alt={data.name} src={handleUrl(counter)} />

                            </div>

                        </div>
                        <div className='col-8 datosContainer animate__animated animate__fadeIn row'>

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
                                        <li className='list-group-item' key = {evolution.chain.species.name}>{evolution.chain.species.name.toUpperCase()}</li>

                                        {
                                            evolution.chain.evolves_to.map(item => <>
                                                <li className='list-group-item' key = {item.species.name}>{item.species.name.toUpperCase()}</li>

                                                {item.evolves_to.map(item2 => {

                                                    return <li className='list-group-item' key = {item2.species.name}>{item2.species.name.toUpperCase()}</li>

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
    )
}
