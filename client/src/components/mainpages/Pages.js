import React, {useContext} from 'react'
import {Routes, Route} from "react-router-dom";
import Movies from './movies/Movies'
import Shows from './shows/Shows'
import DetailMovie from './detailMovie/DetailMovie'
import DetailShow from './detailShow/DetailShow'
import Login from './auth/Login'
import Register from './auth/Register'
import CreateMovie from './createMovie/CreateMovie';
import NotFound from './utils/not_found/NotFound'
import {GlobalState} from '../../GlobalState'
import OrderHistory from './history/OrderHistory';


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <Routes>
            <Route path="/" element={<Shows />} />
            <Route path="/detail/:id" element={<DetailShow />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/detail/:id" element={<DetailMovie />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create_movie" element={isAdmin ? <CreateMovie /> : <NotFound />} />
            <Route path="/edit_movie/:id" element={isAdmin ? <CreateMovie /> : <NotFound />} />
            <Route path="/history" element={isLogged ? <OrderHistory /> : <NotFound />} />
        </Routes>
    )
}

export default Pages
