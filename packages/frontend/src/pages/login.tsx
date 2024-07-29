import React, { useState } from "react"
import axios from "../http"

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [invalidLogin, setInvalidLogin] = useState(false); 

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("submitting")
        const res = await axios.post("/login", JSON.stringify({
            username: username,
            password: password,
        }))
        if (res.status != 200) {
            setInvalidLogin(true);
            return
        } 
        window.location.href = "/";
    }

    return( 
        <div className={`login ${invalidLogin ? "invalidLogin" : ""}`}>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Username</legend>
                    <input className="field" onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" value={username}/>
                </fieldset>
                <fieldset>
                    <legend>Password</legend>
                    <input className="field" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" value={password}/>
                </fieldset>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;