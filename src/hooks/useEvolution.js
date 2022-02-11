import { useEffect, useState } from "react"

export const useEvolution = (data) => {
    const [evolution, setEvolution] = useState(null)

    //Obtiene la cadena de evolucion


    useEffect(() => {

        if (data) {

            fetch(data.species.url).then(specie => specie.json()).then(datosSpecie =>  fetch(datosSpecie.evolution_chain.url).then(resp => resp.json()).then(dataEvo => setEvolution(dataEvo)));
      
        }

    }, [data])

    return evolution;

}
