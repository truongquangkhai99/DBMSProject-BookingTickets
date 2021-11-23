import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Header() {
    const value = useContext(GlobalState)
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = "/";
    }

    const adminRouter = () => {
        return(
            <>
                <li><Link to="/create_movie">Add movie</Link></li>
                <li><Link to="/history">Orders</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return(
            <>
                <li className="login-logout"><a href="/" onClick={logoutUser}>Log out</a></li>
            </>
        )
    }

    const clientRouter = () => {
        return(
            <>
                <li><Link to="/history">History</Link></li>
            </>
        )
    }

    return (
        <header>
            <div id="header">
                <ul id="navigation">
                    <li><a href="/">Home</a></li>
                    <li><a href="/movies">Movie data</a></li>
                    {isAdmin ? adminRouter() : isLogged && clientRouter()}
                    {
                        isLogged ? loggedRouter() : <li className="login-logout"><a href="/login">Login | Register</a></li>
                    }
                    </ul>
            </div>
        </header>
    )
}

export default Header
