import React, {useState, useEffect} from 'react'

import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';
import { Chart} from 'react-google-charts'

import AddExpense from '../addExpense/AddExpense';
import { getCategories } from '../../api/api.js';
import AddCategory from '../addCategory/AddCategory';



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
        <div>
        <AddCategory  add={add}/>
        <AddExpense categories={categories} changeReRender={changeReRender}/>

        <button onClick={()=>history.push('/visualize')}>Visualize</button>
        
        </div>
    );
    }

export default Home;