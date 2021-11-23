import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import MovieItem from '../utils/movieItem/MovieItem'
import axios from 'axios'
import Filters from './Filters'

function Movies() {
    const state = useContext(GlobalState)
    const [movies, setMovies] = state.moviesAPI.movies
    console.log(movies)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.moviesAPI.callback

    const deleteMovie = async(id, public_id) => {
        try {
            var confirmDelete = window.confirm("Are you sure you want to delete this item?")
            if (confirmDelete == true) {
                const deleteMovie = axios.delete(`/api/movies/${id}`, {
                    headers: {Authorization: token}
                })
                await deleteMovie
                window.location.href = "/movies"
            }
        } catch (err) {
            console.log(err)
            alert("Can not delete this item.")
        }
    }

    return (
        <div>
            <div className="row movie-list">
                <div className="section-title">
                    <h5>Bean movie data</h5>
                    <h2>More than 23000 movies</h2>
                </div>
                <Filters />
                <div>
                    {
                        movies.map(movie => {
                            return <MovieItem key={movie._id} movie={movie} isAdmin={isAdmin} deleteMovie={deleteMovie}/>
                        })
                    }
                </div>
            </div>
        </div>
        
    )
}

export default Movies
