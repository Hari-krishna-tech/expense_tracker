

import {useState} from 'react';
import { addCategory } from '../../api/api.js';
import Cookies from 'js-cookie';


const AddCategory = ({add}) => {
    const [category, setCategory] = useState('');
    const token = Cookies.get('token');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const data = await addCategory({category}, token);
            if(data) {
                add(category);
            }
            setCategory('');
        } catch (error) {
            console.log(error);
        }
    
    }

    return (
        <div className="add-category">
            <h1>Add Category</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} onChange={e=>setCategory(e.target.value)}/>
                <button type="submit">Add Category</button>
            </form>
        </div>
    )
}

export default AddCategory;