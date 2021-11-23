import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({movie, deleteMovie}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const buyTicket = state.userAPI.buyTicket
    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <button className="web-button" onClick={() => deleteMovie(movie._id)}>DELETE</button>

                    <Link to={`/edit_movie/${movie._id}`}>
                        <button className="web-button two">EDIT</button>
                    </Link>
                </>
                : <>
                    <Link to={`/movies/detail/${movie._id}`}>
                        <button className="web-button">VIEW</button>
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
