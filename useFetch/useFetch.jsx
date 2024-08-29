import { useEffect, useState } from "react"

const localCache = {}

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    })

    useEffect(() => {

        getFetch()

    }, [url])
    //useEffect ejecutarse cada que cambia la url

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        })
    }

    const getFetch = async () => {

        //Desde el cache
        if (localCache[url]) {
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            })
            return;
        }

        setLoadingState()

        const resp = await fetch(url)

        //sleep
        await new Promise(resolve => setTimeout(resolve, 1500))


        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: resp.statusText,
            })
            return;
        }

        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        })
        // console.log(data)

        //Manejo del cache
        localCache[url] = data;

    }


    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    }
}
