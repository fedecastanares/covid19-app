import React, {createContext,useState, useEffect} from 'react';
import Axios from 'axios';

export const DataContext = createContext();

const DataProvider = (props) => {

    const [country, setcountry] = useState('Uruguay');
    const [code, setcode] = useState([]);
    const [status, setstatus] = useState({});

    useEffect (() =>{
        const getStatus = async () => {
            const url = `https://corona.lmao.ninja/countries/${country}`
            const status = await Axios.get(url);
            setstatus(status.data);
        }
        getStatus();

        // Cambiar a misma API que corona o no porque uso la poblacion tambien
        const getcode = async () => {
            const url = `https://restcountries.eu/rest/v2/name/${country}`;
            const code = await Axios.get(url);
            setcode(code.data[0]);
        }
        getcode();

        
    }, []);

    return (
        <DataContext.Provider
        value={{
            country,
            status,
            code
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;