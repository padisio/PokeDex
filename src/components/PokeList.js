import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'

export const PokeList = ({ setCounter }) => {

    const url = 'https://pokeapi.co/api/v2/pokemon/'
    const { data, loading, error } = useFetch(url);
    const [pokeUrl, setPokeUrl] = useState(null);
    const { data: idPoke } = useFetch(pokeUrl);
    useEffect(() => {


        if (idPoke) {

            setCounter(idPoke.id)

        }
    }, [idPoke, setCounter])
    const handlePokeUrl = (e) => {

        setPokeUrl(e.target.value);


    }

    return (
        <div className='container'>
            <div className='headerCont row mt-3'>

                <h2 className=''>Poke List</h2>
                <hr className='mt-1 mb-1' />

                <div className='row'>
                    {
                        data && <>
                            <div className='row navegacionListaCont'>
                                <button className="btn btn-primary col-6  botonNavegacionLista">Anterior</button>
                                <button className="btn btn-primary col-6  botonNavegacionLista">Siguiente</button>
                            </div>

                        </>
                    }
                    {
                        data && data.results.map((pokemon )=> <>

                            <button className='col-3 listado-item' key={pokemon.name} value={pokemon.url} onClick={handlePokeUrl}>{pokemon.name.toUpperCase()}</button>

                        </>)

                    }

                </div>

            </div>

        </div>
    )
}
