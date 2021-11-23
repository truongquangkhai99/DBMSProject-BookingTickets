import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import ShowItem from '../utils/showItem/ShowItem'
import axios from 'axios'
import Footer from '../../footer/Footer'

function Shows() {
    const state = useContext(GlobalState)
    const [nowShowing, setNowShowing] = state.showsAPI.nowShowing
    console.log(nowShowing)
    const [comingSoon, setComingSoon] = state.showsAPI.comingSoon
    console.log(comingSoon)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.moviesAPI.callback

    const deleteShow = async(id, public_id) => {
        try {
            var confirmDelete = window.confirm("Are you sure you want to delete this item?")
            if (confirmDelete == true) {
                const deleteMovie = axios.delete(`/api/shows/${id}`, {
                    headers: {Authorization: token}
                })
                await deleteShow
                window.location.href = "/"
                // setCallback(!callback)
            }
        } catch (err) {
            console.log(err)
            alert("Can not delete this item.")
        }
    }

    return (
        <div>
            <div>
                <div id="slider">
                    <div className="container">
                        <div className="slider-content">
                            <h3 className="heading">BEAN MOVIE</h3>
                            <p className="description">Ha Noi's biggest movie exhibitor. Browse the latest movies, trailers and showtimes. Book your movie tickets online today!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row movie-list">
                <div className="section-title">
                    <h5>Today</h5>
                    <h2>Now showing</h2>
                </div>
                <div>
                    {
                        nowShowing.map(show => {
                            return <ShowItem key={show._id} show={show} isAdmin={isAdmin} deleteShow={deleteShow} />
                        })
                    }
                </div>
            </div>

            <div className="row movie-list">
                <div className="section-title">
                    <h5>Future</h5>
                    <h2>Coming soon</h2>
                </div>
                <div>
                    {
                        comingSoon.map(show => {
                            return <ShowItem key={show._id} show={show} isAdmin={isAdmin} deleteShow={deleteShow} />
                        })
                    }
                </div>
            </div>

            <Footer />
        </div>
        
    )
}

export default Shows
