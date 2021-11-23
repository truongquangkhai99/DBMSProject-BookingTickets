import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})
            localStorage.setItem('firstLogin', true)
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-container">
            <div className="login-page">
                <img src="../../../../assets/img/bean-icon.png" alt="" />
                <div className="login-box">
                    <form onSubmit={registerSubmit}>
                        <h2>Create free acount</h2>
                        <input type="name" name="name" required
                        placeholder="Name" value={user.name} onChange={onChangeInput} />

                        <input type="email" name="email" required
                        placeholder="Email" value={user.email} onChange={onChangeInput} />

                        <input type="password" name="password" required autoComplete="on"
                        placeholder="Password" value={user.password} onChange={onChangeInput} />

                        <button type="submit">Sign up</button>
                        <p className="sign-up">
                            Already have an account? 
                            <Link to="/login"> Sign in</Link>
                        </p> 
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Register