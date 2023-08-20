import axios from 'axios';

export const API_URL = 'http://localhost/api/api';

const api = axios.create({
    baseURL: API_URL,
});


export const registerUser = async (user) => {
    try {
        const { data } = await api.post('/signup', user);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (user) => {
    try {
        const { data } = await api.post('/login', user);
        return data;
    } catch (error) {
        console.log(error);

    }
}


export const getCategories = async (token) => {
    try {
        const { data } = await api.get('/categories', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const addCategory = async (category, token) => {
    try {
        const { data } = await api.post('/categories', category, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const getTotalExpenses = async (token) => {
    try {
        const { data } = await api.get('/expensetotal', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getExpenses = async (filter,token) => {
    try {
     //   console.log(token);
        const { data } = await api.post('/expense', filter ,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const createExpense = async (expense, token) => {
    try {
        const { data } = await api.post('/create', expense, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getUserName = async (token) => {
    try {
        const { data } = await api.get('/username', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}