import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [history, setHistory] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        if (token) {
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    setUser(res.data)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    }, [token])

    const payment = async () => {
        if (!isLogged) return alert("Please login to continue.")
    }


    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        history: [history, setHistory],
        user: [user, setUser],
        payment
    }
}

export default UserAPI
 