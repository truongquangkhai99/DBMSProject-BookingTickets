import React, {useState, useEffect} from 'react'
import axios from 'axios'


function MoviesAPI() {
    const [movies, setMovies] = useState([])
    const [callback, setCallback] = useState(false)
    const [search, setSearch] = useState('Batman')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() => {
        const getMovies = async () => {
            const res = await axios.get(`/api/movies?arg=${search}`)
            setMovies(res.data.movies)
            setResult(res.data.result)
        }
        getMovies()
    }, [callback, search, page])
    
    return {
        movies: [movies, setMovies],
        callback: [callback, setCallback],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }

}

export default MoviesAPI
