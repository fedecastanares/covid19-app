import React, {createContext,useState, useEffect} from 'react';
import Axios from 'axios';

export const DataContext = createContext();

const DataProvider = (props) => {

    const country = 'Uruguay';
    const [confirmed, setconfirmed] = useState([]);
    const [deaths, setdeaths] = useState([]);
    const [recovered, setrecovered] = useState([]);
    const [flag, setflag] = useState([]);

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

        const getflag = async () => {
            const url = `https://restcountries.eu/rest/v2/name/${country}`;
            const code = await Axios.get(url);
            setflag(`https://www.countryflags.io/${code.data[0].alpha2Code}/flat/64.png`);
            console.log(flag);
        }
        getflag();

        
    }, []);

    return (
        <DataContext.Provider
        value={{
            country,
            confirmed,
            deaths,
            recovered,
            flag
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;