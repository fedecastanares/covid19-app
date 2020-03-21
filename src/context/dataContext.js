import React, {createContext,useState, useEffect} from 'react';
import Axios from 'axios';

export const DataContext = createContext();

const DataProvider = (props) => {

    const country = 'uruguay';
    const [confirmed, setconfirmed] = useState([]);
    const [deaths, setdeaths] = useState([]);
    const [recovered, setrecovered] = useState([]);

    useEffect (() =>{
        const getconfirmed = async () => {
            const url = `https://api.covid19api.com/total/country/${country}/status/confirmed`;
            const confirmed = await Axios.get(url);
            setconfirmed(confirmed.data);
        }
        getconfirmed();

        const getdeaths = async () => {
            const url = `https://api.covid19api.com/total/country/${country}/status/deaths`;
            const deaths = await Axios.get(url);
            setdeaths(deaths.data);
        }
        getdeaths();

        const getrecovered = async () => {
            const url = `https://api.covid19api.com/total/country/${country}/status/recovered`;
            const recovered = await Axios.get(url);
            setrecovered(recovered.data);
        }
        getrecovered();
        
    }, []);

    return (
        <DataContext.Provider
        value={{
            country,
            confirmed
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;