import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

import {createExpense} from '../../api/api.js';
import './AddExpense.css';

const AddExpense = ({ categories , changeReRender}) => {

    const [selectedCategory, setSelectedCategory] = useState('');
    const [amount, setAmount] = useState("");
    const token = Cookies.get('token');

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const type = selectedCategory.toLowerCase();
        const data = await createExpense({type, amount} , token);
        
        if(data) {
            changeReRender();
        }
        setSelectedCategory('');
        setAmount("");
    }

    return (
        <div>
            <h1>Add Expense</h1>
            <form onSubmit={handleSubmit}>
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select an Category</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <p>Selected Category: {selectedCategory}</p>
                
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" value={amount} onChange={e=>setAmount(e.target.value)}/>
               <br></br> <button type="submit">Add Expense</button>
            </form>
        </div>
    );

}



export default AddExpense;