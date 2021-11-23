import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import {useNavigate, useParams} from 'react-router-dom'

const initialState = {
    title: '',
    plot: '',
    fullplot: '',
    poster: '',
    year: '',
    genres: '',
    runtime: '',
    cast: ''
}

function CreateMovie() {
    const state = useContext(GlobalState)
    const [movie, setMovie] = useState(initialState)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const Navigate = useNavigate()
    const param = useParams()

    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.moviesAPI.callback

    const getMovie = async (id) => {
        const res = await axios.get(`/api/movie/detail/${id}`) 
        setMovie(res.data.movie)
    }

    useEffect(() => {
        if(param.id) {
            setOnEdit(true)
            getMovie(param.id)
        } else {
            setOnEdit(false)
            setMovie(initialState)
        }
    }, [param.id])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setMovie({...movie, [name]:value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            console.log({...movie})
            console.log({headers: {Authorization: token}})
            console.log(onEdit)
            if (!isAdmin) return alert("You are not Admin.")
            if (onEdit) {
                await axios.put(`/api/movies/${movie._id}`, {...movie}, {
                    headers: {Authorization: token}
                })
                alert("Edit movie: " + movie.title + " success.")
            } else {
                console.log("hello world!")
                await axios.post('/api/movies', {...movie}, {
                    headers: {Authorization: token}
                })
                alert("Add movie: " + movie.title + " success.")
            }
            setCallback(!callback)
            Navigate.push("/")
        } catch (err) {
            console.log("err")
        }
    }


    return (
        <div className="create-movie movie-list row">
            <div className="section-title">
                <h5>MOVIE DATA</h5>
                <h2>EDIT AND ADD MOVIE</h2>
            </div>

            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="column two-column">
                            <label htmlFor="title">Title </label>
                            <textarea type="text" name="title" id="title" required
                            value={movie.title} placeholder="Title of movie..." onChange={handleChangeInput} />
                        </div>
                        <div className="column two-column">
                            <label htmlFor="plot">Plot </label>
                            <textarea type="text" name="plot" id="plot" required
                            value={movie.plot} placeholder="In short, the plot is what happens in a film..." rows="3" onChange={handleChangeInput} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="column two-column">
                            <label htmlFor="fullplot">Full plot</label>
                            <textarea type="text" name="fullplot" id="fullplot" required
                            value={movie.fullplot} placeholder="What happens in a film..." onChange={handleChangeInput} />
                        </div>
                        <div className="column two-column">
                            <label htmlFor="poster">Poster URL </label>
                            <textarea type="text" name="poster" id="poster" required
                            value={movie.poster} placeholder="URL of movie's poster..." onChange={handleChangeInput} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="column two-column">
                            <label htmlFor="year">Year </label>
                            <textarea type="text" name="year" id="year"
                            value={movie.year} placeholder="Original release date..." onChange={handleChangeInput} />
                        </div>
                        <div className="column two-column">
                            <label htmlFor="runtime">Running time </label>
                            <textarea type="text" name="runtime" id="runtime"
                            value={movie.runtime} placeholder="Running time of movie..." onChange={handleChangeInput} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="column two-column">
                            <label htmlFor="genres">Genres </label>
                            <textarea type="text" name="genres" id="genres"
                            value={movie.genres} placeholder="Movie's genres..." onChange={handleChangeInput} />
                        </div>
                        <div className="column two-column">
                            <label htmlFor="cast">Cast </label>
                            <textarea type="text" name="cast" id="cast"
                            value={movie.cast} placeholder="Group of actors..." onChange={handleChangeInput} />
                        </div>
                    </div>

                    <button type="submit" className="web-button">{"SAVE"}</button>
                </form>
            </div>
            
        </div>
    )
}


export default CreateMovie
