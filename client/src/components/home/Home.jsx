import React, {useState, useEffect} from 'react'

import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';


import AddExpense from '../addExpense/AddExpense';
import { getCategories } from '../../api/api.js';
import AddCategory from '../addCategory/AddCategory';
import Nav from '../Nav/Nav.jsx';
import "./Home.css"


const Home = () => {
    
    const history = useHistory();

    const token = Cookies.get('token');
    const [categories, setCategories] = useState([]);

    const [reRender, setReRender] = useState(false); // <-- add this line

    const changeReRender = () => {
        setReRender(!reRender);
    }
    const add = (category) => {
        setCategories([...categories, category]);
    }
    useEffect(()=>{
        const getUser = async ()=>{
            
            const categories = await getCategories(token);
            setCategories(categories);
          
        }
        getUser();
    }, [reRender]);
    return (  
        <div >
        <Nav/>
            <div className='home'>
        <div className="sections">
        <AddCategory className="add-category"  add={add}/>
        <AddExpense className="add-expense" categories={categories} changeReRender={changeReRender}/>
        </div>
        <button className='visualize' onClick={()=>history.push('/visualize')}>Visualize</button>
            </div>
        </div>
    );
    }

export default Home;