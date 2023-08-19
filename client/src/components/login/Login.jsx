import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';

import { loginUser } from '../../api/api.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const history = useHistory();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data = await loginUser({email, password});
        if(data.token) {
            Cookies.set('token',data.token);
        }
        
        history.push('/home');
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            <button onClick={()=>history.push('/signup')}>Signup</button>
        </div>
    );
}

export default Login;