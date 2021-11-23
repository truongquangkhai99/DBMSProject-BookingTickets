import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import CreateShow from '../createShow/CreateShow'
import { Link } from 'react-router-dom'

function DetailMovie() {
    const params = useParams()
    // console.log(params) --> params.id chinh la id cua show
    const state = useContext(GlobalState)
    const [detailMovie, setDetailMovie] = useState([])
    const [isAdmin] = state.userAPI.isAdmin

    const getMovie = async () => {
        const res = await axios.get(`/api/movie/detail/${params.id}`) 
        setDetailMovie(res.data.movie)
    }

    useEffect(() => {
        getMovie()
    }, [])

    console.log(detailMovie)
    let genres = 'No information about genres'
    let cast = 'No information about cast'
    if (detailMovie.genres) {
        genres = detailMovie.genres.join(', ')
    }
    if (detailMovie.cast) {
        cast = detailMovie.cast.join(', ')
    }

    return (
        <div className="detail-container">
            <div className="detail-movie">
                <img className="detail-poster" src={detailMovie.poster} alt={detailMovie.title} />
                <div className="detail-box-infor">
                    <div className="row title">
                        <h1>{detailMovie.title}</h1>
                    </div>
                    <div className="plot-box">
                        <h2 className="row plot">{detailMovie.plot}</h2>
                        <p className="row fullplot">{detailMovie.fullplot}</p>
                    </div>
                    <div className="row genres">
                        <h2>{genres}</h2>
                    </div>
                    <div className="row cast">
                        <p>{cast}</p>
                    </div>
                    <div className="row more">
                        <div className="column two-column">
                            <p className="row head">Original Release</p>
                            <p className="row content">{detailMovie.year}</p>
                        </div>
                        <div className="column two-column">
                            <p className="row head">Running Time</p>
                            <p className="row content">{detailMovie.runtime}</p>
                        </div>
                    </div>
                </div>
            </div>


            {
                isAdmin ?
                <>
                    <CreateShow />
                </>
                : <>
                </>
            }
            
        </div>
    )
}

export default DetailMovie
