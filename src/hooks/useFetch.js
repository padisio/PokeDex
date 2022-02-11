import { useEffect, useState } from "react"


export const useFetch = (url) => {

    const [state, setState] = useState({ data: null, loading: true, error: null });
    useEffect(() => {

        setState({ data:null, loading: true, error:null })
        
        



        fetch(url)
            .then(resp => resp.json())
            .then(data =>{

               

                setState({
                    data: data,
                    loading: false,
                    error: null
                })
                // console.log(data);
            }
            )
            .catch(err => setState({
                data : null,
                loading : false,
                error : true
            }))




    }, [url])



    return state;

}
