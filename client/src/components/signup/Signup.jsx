import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const history = useHistory();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const response = await axios.post('http://13.235.135.233:8000/api/signup', {username, password, email});
        if(response.data.token) {
            Cookies.set('token', response.data.token);
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