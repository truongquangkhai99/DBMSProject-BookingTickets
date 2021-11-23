import React from 'react'
import { Link } from 'react-router-dom'
import BtnRender from './BtnRender'

function MovieItem({movie, isAdmin,deleteMovie}) {
    return (
        <div className="movie-item four-column column">
            <div className="poster-box">
                <Link to={`detail/${movie._id}`}>
                    <img src={movie.poster} alt="" className="poster" />
                </Link>
            </div>
            <div className="box-information">
                <h3 className="title">{movie.title}</h3>
                <BtnRender movie={movie} deleteMovie={deleteMovie} />
            </div>
        </div>
    )
}

export default MovieItem
