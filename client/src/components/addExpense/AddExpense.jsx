import {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const AddExpense = ({changeReRender}) => {

    const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
    const token = Cookies.get('token');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setType(prev=>prev.toLowerCase());
        const response = await axios.post('http://13.235.135.233:8000/api/create', {type, amount}, {
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
                
                
            }
        });
        console.log(response.data)
        if(response.data) {
            changeReRender();
        }
        setType('');
        setAmount(0);
    }

    return (
        <div>
            <h1>Add Expense</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="type">Type</label>
                <input type="text" name="type" value={type} onChange={e=>setType(e.target.value)}/>
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" onChange={e=>setAmount(e.target.value)}/>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );

}



export default AddExpense;