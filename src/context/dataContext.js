import React, {createContext,useState, useEffect} from 'react';
import Axios from 'axios';

export const DataContext = createContext();

const DataProvider = (props) => {


    const [country, setcountry] = useState('Uruguay');
    const [countrycompare, setcountrycompare] = useState('Argentina');
    const [flag, setflag] = useState('');
    const [allcountrys, setallcountrys] = useState([]);
    const [status, setstatus] = useState({});
    const [statuscompare, setstatuscompare] = useState({});
    const [firstcontrol, setfirstcontrol] = useState(true);

    useEffect(()=> {
        const getallcountrys = async () => {
            const urlcountry = `https://corona.lmao.ninja/countries/${country}`
            const datacountry = await Axios.get(urlcountry);
            setstatus(datacountry.data);
            setflag(datacountry.data.countryInfo.flag);
            const urlcountrycompare = `https://corona.lmao.ninja/countries/${countrycompare}`
            const datacountrycompare = await Axios.get(urlcountrycompare);
            setstatuscompare(datacountrycompare.data);
            const url = `https://corona.lmao.ninja/countries`;
            const data = await Axios.get(url);
            setallcountrys(data.data);
            setfirstcontrol(false);
        }
        getallcountrys();
    }, []);

    useEffect (() =>{
        if (firstcontrol === false) {
        const getdata = async () => {
            const status = allcountrys.find(aCountry => aCountry.country === country);
            setstatus(status);
            setflag(status.countryInfo.flag);
            const statuscompare = allcountrys.find(aCountry => aCountry.country === countrycompare);
            setstatuscompare(statuscompare);
        }
        getdata();
        }
    }, [country]);

    return (
        <DataContext.Provider
        value={{
            country,
            countrycompare,
            allcountrys,
            status,
            statuscompare,
            flag,
            setcountry
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;