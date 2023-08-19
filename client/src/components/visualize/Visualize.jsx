import {  useState } from "react";
import Cookies from "js-cookie";

import './Visualize.css';
import VisualizeMontly from "./VisualizeMonthly.jsx";
import VisualizeTotal from "./VisualizeTotal.jsx";
import Nav from "../Nav/Nav.jsx";

const Visualize = () => {

    const [total, setTotal] = useState(true);
  //  const date = Date.now()
   
    const token = Cookies.get('token');



    const handleMonthly = ()=>{
        setTotal(false);
    }



    
    return (
        <div className="visualize">
            <Nav/>
            <h1>Visualize</h1>
            <div className="selector">
                <div className= {"total"} id={total?"select": ""}  onClick={()=>setTotal(true)}>Total</div>
                <div className={"monthly"} id={!total?"select":""} onClick={handleMonthly}>Monthly</div>
            </div>
            {total ? <VisualizeTotal/>: <VisualizeMontly/>
            }
            
        </div>
    )
}

export default Visualize;