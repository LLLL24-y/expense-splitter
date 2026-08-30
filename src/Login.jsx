import { useState } from "react"

export const Login=()=>{
    const [message,setMessage]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch('http://localhost/expense-splitter-api/login.php',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  email, password })
        })
            .then(response => response.json())
            .then(data => {
            setMessage(data.message);
            });
    }
    return(
        <div>
            <h1>{message}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <button>Login</button>
            </form>
        </div>
    )
}