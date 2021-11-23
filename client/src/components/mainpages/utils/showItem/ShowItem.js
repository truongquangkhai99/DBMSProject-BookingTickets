import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import BtnRender from './BtnRender'
import { Date } from 'mongoose'

function ShowItem({show, isAdmin, deleteShow}) {
    const [movie, setMovie] = useState([])
    let movieID = show.movieID
    const getMovie = async () => {
        const res = await axios.get(`/api/movie/detail/${movieID}`) 
        setMovie(res.data.movie)
    }

    useEffect(() => {
        getMovie()
    }, [])

    var poster = ""
    var showTime = ""
    var date = ""
    var start = ""
    var end = ""
    var title = ""
    
    if (movie) {
        title = movie.title
        poster = movie.poster
        var showTime = show.startTime
        var date = showTime.slice(0, showTime.indexOf("T"))
        var start = showTime.slice(showTime.indexOf("T") + 1, showTime.indexOf("."))
        var end = show.endTime.slice(show.endTime.indexOf("T") + 1, show.endTime.indexOf("."))
    }

    return (
        <div className="movie-item four-column column show-item">
            <div className="poster-box">
                <Link to={`detail/${show._id}`}>
                    <img src={poster} alt={title} className="poster" />
                </Link>
            </div>
            <div className="box-information">
                <h3 className="title">{title}</h3>
                <div className="row">
                    <p className="price two-column column">Price: {show.price} Dollar</p>
                    <p className="time two-column column">Start: {start}</p>
                </div>
                <div className="row">
                    <p className="date two-column column">Date: {date}</p>
                    <p className="time two-column column">End: {end}</p>
                </div>
                
                <BtnRender show={show} deleteshow={deleteShow} />
                {/* <button className="web-button js-buy-ticket">Buy Tickets</button> */}
            </div>
        </div>
    )

}

export default ShowItem
