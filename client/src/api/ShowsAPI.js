import React, {useState, useEffect} from 'react'
import axios from 'axios'


function ShowsAPI() {
    const [nowShowing, setNowShowing] = useState([])
    const [comingSoon, setComingSoon] = useState([])
    const [callback, setCallback] = useState(false)

    const getNowShowing = async () => {
        const res = await axios.get(`/api/shows/nowShowing`)
        setNowShowing(res.data.shows)
    }

    const getComingSoon = async () => {
        const res = await axios.get(`/api/shows/comingSoon`)
        setComingSoon(res.data.shows)
    }

    useEffect(() => {
        getNowShowing()
        getComingSoon()
    }, [callback])

    return {
        nowShowing: [nowShowing, setNowShowing],
        comingSoon: [comingSoon, setComingSoon],
        callback: [callback, setCallback]
    }
}

export default ShowsAPI
