import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserName } from "../../api/api.js";

import './Nav.css';

const Nav = () => {
    const [username, setUsername] = useState('');
    const token = Cookies.get('token');
    const history = useHistory();

    const handleLogout = ()=>{
        Cookies.remove('token');
        history.push('/login');
    
    }

    useEffect(()=>{
        if(!token){
            history.push('/login');
        }
        const getUser = async ()=>{
            const data = await getUserName(token);

            setUsername(data);

        }
        getUser();
    }, [token, history]);
    return (
        <div className="nav">
        <Link className="logo link" to="/home">Expense Tracker</Link>
        <Link className="link" to="/home">Home</Link>
        <Link className="link" to="/visualize">Visualize</Link>


        <p>hi {username}!</p>

        <div className="logout link" onClick={handleLogout}>logout</div>
        </div>
    );
    }
export default Nav;