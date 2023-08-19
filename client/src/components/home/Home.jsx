import React, {useState, useEffect} from 'react'

import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';
import { Chart} from 'react-google-charts'

import AddExpense from '../addExpense/AddExpense';
import { getCategories, getExpenses } from '../../api/api.js';
import AddCategory from '../addCategory/AddCategory';



const Home = () => {
    
    const history = useHistory();
    const [data, setData] = useState([["Type", "Amount"]]);
    const token = Cookies.get('token');
    const [categories, setCategories] = useState([]);
    const options = {
        title: "My Expenses",
    }
    const [reRender, setReRender] = useState(false); // <-- add this line

    const changeReRender = () => {
        setReRender(!reRender);
    }
    const add = (category) => {
        setCategories([...categories, category]);
    }
    useEffect(()=>{
        const getUser = async ()=>{
            const expenses = await getExpenses(token);
            const categories = await getCategories(token);
            setCategories(categories);
            setData([["Type", "Amount"]])
            Object.keys(expenses).forEach((key)=>{
                const expense = expenses[key].totalAmount;
                console.log(expense);
                console.log(key)
                
                setData((prevData)=>[...prevData, [key, expense]]);
            });
        }
        getUser();
    }, [reRender]);
    return (  
        <div>
        <AddCategory  add={add}/>
        <AddExpense categories={categories} changeReRender={changeReRender}/>

        
        <Chart 
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
        />
        </div>
    );
    }

export default Home;