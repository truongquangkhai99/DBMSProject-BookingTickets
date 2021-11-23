import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [search, setSearch] = state.moviesAPI.search

    return (
        <div className="filter_menu">
            <input type="text" value={search} placeholder="Seach by full plot of movie..."
            onChange={e => setSearch(e.target.value.toLowerCase())} />
        </div>
    )
}

export default Filters
