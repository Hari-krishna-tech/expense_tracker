import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Chart} from 'react-google-charts'

import { getTotalExpenses } from "../../api/api.js";
import './Visualize.css';
import VisualizeMontly from "./VisualizeMonthly.jsx";

const Visualize = () => {
    const [data, setData] = useState([["Type", "Amount"]]);
    const [total, setTotal] = useState(true);
  //  const date = Date.now()
   
    const token = Cookies.get('token');

    const options = {
        title: "My Expenses",
    }

    const handleMonthly = ()=>{
        setTotal(false);
    }

    useEffect(()=>{
        const getData = async ()=>{
            const expenses = await getTotalExpenses(token);
        
            setData([["Type", "Amount"]])
            Object.keys(expenses).forEach((key)=>{
                const expense = expenses[key].totalAmount;
                console.log(expense);
                console.log(key)
                
                setData((prevData)=>[...prevData, [key, expense]]);
            });
        }
        getData();

    }, [token]);

    
    return (
        <div className="visualize">
            <h1>Visualize</h1>
            <div className="selector">
                <div className= {"total"} id={total?"select": ""}  onClick={()=>setTotal(true)}>Total</div>
                <div className={"monthly"} id={!total?"select":""} onClick={handleMonthly}>Monthly</div>
            </div>
            {total ? <Chart 
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />: <VisualizeMontly/>
            }
            
        </div>
    )
}

export default Visualize;