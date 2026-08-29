import { useState } from 'react';

export const Register=()=> {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost/expense-splitter-api/register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
            .then(response => response.json())
            .then(data => {
            setMessage(data.message);
            });
    };
    return (
        <div>
        <h1>{message}</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button>Register</button>
        </form>
        </div>
    );
}
