import React, {createContext,useState, useEffect} from 'react';
import Axios from 'axios';

export const DataContext = createContext();

const DataProvider = (props) => {


    const [country, setcountry] = useState('Uruguay');
    const [countrycompare, setcountrycompare] = useState('Argentina');
    const [code, setcode] = useState([]);
    const [allcountrys, setallcountrys] = useState([]);
    const [status, setstatus] = useState({});
    const [statuscompare, setstatuscompare] = useState({});

    useEffect (() =>{
        // Cambiar a misma API que corona o no porque uso la poblacion tambien
        const getcode = async () => {
            const url = `https://restcountries.eu/rest/v2/name/${country}`;
            const code = await Axios.get(url);
            setcode(code.data[0]);
        }
        getcode();

        const getallcountrys = async () => {
            const url = `https://corona.lmao.ninja/countries`;
            const data = await Axios.get(url);
            setallcountrys(data.data);
            const status = data.data.find(aCountry => aCountry.country === country);
            setstatus(status);
            const statuscompare = data.data.find(aCountry => aCountry.country === countrycompare);
            setstatuscompare(statuscompare);
        }
        getallcountrys();
    }, [country]);

    return (
        <DataContext.Provider
        value={{
            country,
            countrycompare,
            code,
            allcountrys,
            status,
            statuscompare,
            setcountry
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;