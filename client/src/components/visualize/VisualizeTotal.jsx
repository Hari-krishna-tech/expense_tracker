import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Chart} from 'react-google-charts'

import { getTotalExpenses } from "../../api/api.js";
import './visualizeTotal.css';


const VisualizeMontly = () => {
    const [data, setData] = useState([["Type", "Amount"]]);
    const [bar, setBar] = useState(false);
    const token = Cookies.get('token');
  // console.log(token);
    const options = {
        title: "My Expenses",
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
        <div className="visualize_total">

            <br></br>

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