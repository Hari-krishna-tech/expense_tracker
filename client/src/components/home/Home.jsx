import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';
import { Chart} from 'react-google-charts'

import AddExpense from '../addExpense/AddExpense';

const Home = () => {
    
    const history = useHistory();
    const [data, setData] = useState([["Type", "Amount"]]);
    const token = Cookies.get('token');
    const options = {
        title: "My Expenses",
    }
    const [reRender, setReRender] = useState(false); // <-- add this line

    const changeReRender = () => {
        setReRender(!reRender);
    }
    useEffect(()=>{
        const getUser = async ()=>{
            const result = await axios.get("http://13.235.135.233:8000/api/expense", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const expenses = result.data;
            console.log(expenses)
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
        <AddExpense changeReRender={changeReRender}/>

        
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