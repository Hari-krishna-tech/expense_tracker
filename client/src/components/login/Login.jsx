import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';

import { loginUser } from '../../api/api.js';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = Cookies.get('token');
    const history = useHistory();
    console.log(token);
    if(token) {
        history.push('/home');
    }
    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data = await loginUser({email, password});
        if(data && data.token) {
            Cookies.set('token',data.token);
        } else {
            setEmail('');
            setPassword('');
            return;
        }
        
        history.push('/home');
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            <button onClick={()=>history.push('/signup')}>Signup</button>
        </div>
    );
}

export default Login;