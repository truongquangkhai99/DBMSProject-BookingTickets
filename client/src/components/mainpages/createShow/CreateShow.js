import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import {useParams} from 'react-router-dom'

const initialState = {
    movieID: '',
    price: '',
    startTime: '',
    endTime: ''
}

function CreateShow() {
    const param = useParams()
    initialState.movieID = param.id
    const state = useContext(GlobalState)
    const [show, setShow] = useState(initialState)
    const [movie, setMovie] = useState()
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    // const [callback, setCallback] = state.ShowsAPI.callback

    const getMovie = async (id) => {
        const res = await axios.get(`/api/movie/detail/${id}`) 
        setMovie(res.data.movie)
    }

    useEffect(() => {
        if (param.id) {
            getMovie(param.id)
        }
    }, [param.id])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setShow({...show, [name]:value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You are not Admin.")
            console.log({...show})
            await axios.post('/api/shows', {...show}, {
                headers: {Authorization: token}
            })
            alert("Add new show of movie: " + movie.title + " success.")
            window.location.href = '/'
            // setCallback(!callback)
        } catch (err) {
            console.log("err")
        }
    }

    return (
        <div className="create-movie movie-list row" id="create-show">
            <div className="section-title">
                <h5>SHOW</h5>
                <h2>CREATE NEW SHOW</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="column two-column">
                        <label htmlFor="movieID">Movie ID</label>
                        <textarea type="text" name="movieID" id="movieID" required
                        value={show.movieID} onChange={handleChangeInput} />
                    </div>
                    <div className="column two-column">
                        <label htmlFor="startTime">Start time </label>
                        <textarea type="text" name="startTime" id="startTime" required
                        value={show.startTime} placeholder="2021-11-23T13:30:00" onChange={handleChangeInput} />
                    </div>
                </div>
                
                <div className="row">
                    <div className="column two-column">
                        <label htmlFor="price">Price </label>
                        <textarea type="text" name="price" id="price" required
                        value={show.price} onChange={handleChangeInput} />
                    </div>
                    <div className="column two-column">
                        <label htmlFor="endTime">End time</label>
                        <textarea type="text" name="endTime" id="endTime" required
                        value={show.endTime} placeholder="2021-11-23T15:30:00" onChange={handleChangeInput} />
                    </div>
                </div>
                <button type="submit" className="web-button">{"SAVE"}</button>
            </form>
        </div>
    )
}


export default CreateShow
