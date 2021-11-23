import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    useEffect(() => {
        if (token) {
            const getHistory = async() => {
                if (isAdmin) {
                    const res = await axios.get('/api/orders', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                } else {
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
            console.log(history)
        }
    }, [token, isAdmin, setHistory])

    return (
        <div className="history-page movie-list">
            <div className="section-title">
                <h5>ORDERS</h5>
                <h2>TOTAL {history.length} ORDERED</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Order date</th>
                        <th>Total money</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                <td>{items._id}</td>
                                <td>{items.customerID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td>{items.totalMoney} USD</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
