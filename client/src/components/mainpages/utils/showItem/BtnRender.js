import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({show, deleteshow}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <button className="web-button js-buy-ticket" onClick={() => deleteshow(show._id)}>Delete</button>

                    <Link to={`/edit_show/${show._id}`}>
                        <button className="web-button js-buy-ticket two">Edit</button>
                    </Link>
                </>
                : <>
                    <Link to={`/detail/${show._id}`}>
                        <button className="web-button js-buy-ticket">Buy Tickets</button>
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
