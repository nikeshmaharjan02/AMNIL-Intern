import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/todos/');

            if (data.success) {
                setTodos(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };



    const value = {
        todos, setTodos, getTodos, backendUrl
    };

    // Fetch todos when the component is mounted
    useEffect(() => {
        getTodos();
    }, []); 
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
