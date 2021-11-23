import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import SeatItem from '../utils/seatItem/SeatItem'
import axios from 'axios'
import { VirtualType } from 'mongoose'

function DetailShow() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [token] = state.token
    const [detailShow, setDetailShow] = useState([])
    const [detailMovie, setDetailMovie] = useState([])
    const [cart, setCart] = useState([])
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [user, setUser] = state.userAPI.user
    const payment = state.userAPI.payment
    var key = 0

    console.log(user)

    const selectSeat = function(seat) {
        var newCart = handle(cart.concat([seat]))
        setCart(newCart)
    }

    function handle(array) {
        for(let i = 0; i < array.length; ++i) {
            for(let j = i + 1; j < array.length; ++j) {
                if(array[i] === array[j]) {
                    array.splice(j--, 1)
                    array.splice(i--, 1)
                }
            }
        }
        return array
    }

    const getShow = async () => {
        var res = await axios.get(`/api/show/detail/${params.id}`) 
        setDetailShow(res.data.show)
        var res2 = await axios.get(`/api/movie/detail/${res.data.show.movieID}`) 
        setDetailMovie(res2.data.movie)
    }

    useEffect(() => {
        console.log("run use effect")
        getShow()
        // console.log(showTime)
        // var date = showTime.slice(0, showTime.indexOf("T"))
        // var start = showTime.slice(showTime.indexOf("T") + 1, showTime.indexOf("."))
        // var end = detailShow.endTime.slice(detailShow.endTime.indexOf("T") + 1, detailShow.endTime.indexOf("."))
    }, [])

    let genres = 'No information about genres'
    let cast = 'No information about cast'
    if (detailMovie.genres) {
        genres = detailMovie.genres.join(', ')
    }
    if (detailMovie.cast) {
        cast = detailMovie.cast.join(', ')
    }
    
    var showTime = ""
    var date = ""
    var start = ""
    var end = ""
    if (detailShow.startTime) {
        showTime = detailShow.startTime
        date = showTime.slice(0, showTime.indexOf("T"))
        start = showTime.slice(showTime.indexOf("T") + 1, showTime.indexOf("."))
        end = detailShow.endTime.slice(detailShow.endTime.indexOf("T") + 1, detailShow.endTime.indexOf("."))
    }

    var seatsArr = []
    if (detailShow.seatsAvailable) {
        seatsArr = detailShow.seatsAvailable
    }

    var seatCart = cart.join(' - ')
    var totalPrice = cart.length * detailShow.price


    const bookTicket = async e => {
        e.preventDefault()
        try {
            await axios.put(`/api/orders/createOrder/${params.id}`,
            {
                showID: params.id,
                customerID: user._id,
                totalMoney: totalPrice,
                seats: cart
            }, 
            {
                headers: {Authorization: token}
            })

            for(let i = 0; i < seatsArr.length; ++i) {
                for(let j = 0; j < cart.length; ++j) {
                    if(seatsArr[i] === cart[j]) {
                        seatsArr[i] = "x"
                    }
                }
            }

            console.log(seatsArr)

            await axios.put(`/api/shows/updateSeat/${params.id}`,
            {
                seatsAvailable: seatsArr
            }, 
            {
                headers: {Authorization: token}
            })
            alert("Booking ticket successful.")
            window.location.href = '/history'
        } catch (err) {
            console.log("err")
        }
    }



    return (
        <div className="detail-container detail-show">
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

            <div className="show-infor">
                <div className="row movie-list">
                    <div className="section-title">
                        <h5>Book ticket</h5>
                        <h2>{detailMovie.title}</h2>
                        <div className="information row">
                            <div className="column two-column">
                                <h6 className="row">Price : {detailShow.price} Dollar</h6>
                                <h6 className="row">Date : {date}</h6>
                            </div>
                            <div className="column two-column"> 
                                <h6 className="row">Start : {start}</h6>
                                <h6 className="row">End : {end}</h6>
                            </div>
                        </div>
                    </div>

                    <div className="seats row">
                        {
                            seatsArr.map(seat => {
                                key++
                                return <SeatItem key={key} status={seat} show={detailShow} select={selectSeat} />
                            })
                        }
                    </div>

                    <div className="selectSeat">
                        <div className="list-seat row">
                            <h6>SELECTED SEATS : </h6>
                            <p>{seatCart}</p>
                        </div>
                        <div className="money row">
                            <h6>TOTAL PRICE : </h6>
                            <p>{totalPrice} USD</p>
                        </div>
                    </div>
                    
                    {
                        isLogged ?
                        <>
                            <Link to={`#`}>
                                <button className="web-button payment" onClick={bookTicket}>BOOK</button>
                            </Link>
                            
                        </>
                        : <>
                            <button className="web-button payment" onClick={() => payment()}>BOOK</button>
                        </>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default DetailShow
