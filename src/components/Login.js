import React, { useState } from 'react'
import './Login.css'
import { Button } from '@material-ui/core'

function Login({loginSession}) {
const [userSession, setuserSession] = useState({
    username: "",
    password: ""
})

    console.log(userSession)

    const handleChange = (e) => {
        e.preventDefault()
        setuserSession({
            ...userSession,[e.target.name]: e.target.value
        })
        console.log(userSession)
    }
    const handleSubmit = (e) => {
        console.log("we here")
        e.preventDefault()
        loginSession(userSession)
    }
    return (
        <div className="login">
			<form onSubmit={handleSubmit}>
				<input className="input" name="username" placeholder="username" value={userSession.username} onChange={handleChange}/>
				<input className="input" name="password" placeholder="password" value={userSession.password} onChange={handleChange}/>
				<Button type="submit" variant="contained">LOGIN</Button>
			</form>
		</div>
    )
}

export default Login