import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Chart} from 'react-google-charts'

import { getExpenses } from "../../api/api.js";
import './VisualizeMonthly.css';


const VisualizeMontly = () => {
    const [data, setData] = useState([["Type", "Amount"]]);
    const [bar, setBar] = useState(false);
    const date = Date.now()
    const currentMonth = new Date(date).getMonth();
    const currentYear = new Date(date).getFullYear();
    const [month, setMonth] = useState(currentMonth + 1);
    const [year, setYear] = useState(currentYear);
    const token = Cookies.get('token');
  // console.log(token);
    const options = {
        title: "My Expenses",
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const expenses = await getExpenses({month, year},token);
        
            setData([["Type", "Amount"]])
            Object.keys(expenses).forEach((key)=>{
                const expense = expenses[key].totalAmount;
                console.log(expense);
                console.log(key)
                
                setData((prevData)=>[...prevData, [key, expense]]);
            });
    }


    useEffect(()=>{
        const getData = async ()=>{
            const expenses = await getExpenses({month, year},token);
        
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
        <div className="visualize_monthly">
            <div>
                <form onSubmit={handleSubmit}>
                <select value={month} onChange={(e)=>setMonth(e.target.value)}>
                    <option value="1">January</option>
                    <option value="2">Febuary</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5" >May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8" >August</option>
                    <option value="9">September</option>
                    <option value="10" >October</option>
                    <option value="11">November</option>
                    <option value="12" >December</option>
                </select>
                <select value={year} onChange={(e)=>setYear(e.target.value)}>

                    <option>2010</option>
                    <option>2011</option>
                    <option>2012</option>
                    <option>2013</option>
                    <option>2014</option>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                    <option>2029</option>
                    <option>2030</option>
                </select>
                <button type="submit">Visualize</button>
                </form>
            </div>


            <div className="selector">
                <div className= {"pie_chart"} id={!bar?"select": ""}  onClick={()=>setBar(false)}>Pie Chart</div>
                <div className={"bar_graph"} id={bar?"select":""} onClick={()=>setBar(true)}>Bar Graph</div>
            </div>


            {!bar?<Chart 
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />:
            <Chart
                chartType="BarChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
            }
        </div>
    )
}

export default VisualizeMontly;