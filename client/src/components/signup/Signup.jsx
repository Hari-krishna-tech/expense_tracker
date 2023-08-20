import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';

import { registerUser } from "../../api/api.js";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const history = useHistory();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const data = await registerUser({username, password, email});
        if(data && data.token) {
            Cookies.set('token', data.token);
        } else {
            return;
        }
    
        history.push('/home');
    }


    return (
        <div className="signup">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={e=>setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={e=>setPassword(e.target.value)} />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={e=>setEmail(e.target.value)}/>
                <button type="submit">Signup</button>
            </form>
            <button onClick={()=>history.push('/login')}>Login</button>
        </div>
    );
}

export default Signup;