import React, { useState } from "react";
import {url} from "../../constants";

function Auth() {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(true);

    // Checks if player is logging in or registering, then sends a POST request to the server
    const handleSubmit = e => {
        e.preventDefault();
        let reqBody = login ? { email, password } : { fName, lName, email, password };
        let status = login ? "login" : "register";
        let fetchUrl = url + "player/" + status;
        fetch(fetchUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        })
            .then(res => {
                if(!res.ok){
                    if (res.status === 400){
                        window.alert("Invalid email or password");
                    } else if (res.status === 500){
                        window.alert("Server error");
                    } else if(res.status === 409){
                        window.alert("Email already exists");
                    }
                }
                return res.json()
            })
            .then(data => {
                localStorage.setItem("token", data);
            })
            .catch(err => {
                // Error handling
                console.log(err.status);
                
            })
    }
// Returns a form that allows players to login or register
    return (
        <div>
            <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
                <h1>Hello</h1>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!login && (
                    <input
                        type="text"
                        placeholder="First Name"
                        value={fName}
                        onChange={(e) => setFName(e.target.value)}
                    />
                )}
                {!login && (
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lName}
                        onChange={(e) => setLName(e.target.value)}
                    />
                )}
                <button >
                    {login ? "Login" : "Register"}
                </button>
            </form>
            <button onClick={(e) => setLogin(!login)}>
                {login ? "Register" : "Login"}
            </button>
        </div>
    );
}

export default Auth;
