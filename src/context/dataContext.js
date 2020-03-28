import React, {createContext,useState, useEffect} from 'react';
import Axios from 'axios';

export const DataContext = createContext();

const DataProvider = (props) => {


    const [country, setcountry] = useState('Uruguay');
    const [countrycompare, setcountrycompare] = useState('Argentina');
    const [flag, setflag] = useState('');
    const [flagcompare, setflagcompare] = useState('');
    const [allcountrys, setallcountrys] = useState([]);
    const [status, setstatus] = useState({});
    const [statuscompare, setstatuscompare] = useState({});
    const [firstcontrol, setfirstcontrol] = useState(true);
    const [switchSt, setswitchSt] = React.useState({
        checkedB: false
      });

    useEffect(()=> {
        const getallcountrys = async () => {
            const urlcountry = `https://corona.lmao.ninja/countries/${country}`
            const datacountry = await Axios.get(urlcountry);
            setstatus(datacountry.data);
            setflag(datacountry.data.countryInfo.flag);
            const urlcountrycompare = `https://corona.lmao.ninja/countries/${countrycompare}`
            const datacountrycompare = await Axios.get(urlcountrycompare);
            setstatuscompare(datacountrycompare.data);
            setflagcompare(datacountrycompare.data.countryInfo.flag);
            const url = `https://corona.lmao.ninja/countries`;
            const data = await Axios.get(url);
            setallcountrys(data.data);
            setfirstcontrol(false);
        }
        getallcountrys();
    }, []);

    useEffect (() =>{
        if (firstcontrol === false) {
            if (switchSt.checkedB === false) {
                const getdata = async () => {
                    const status = allcountrys.find(aCountry => aCountry.country.startsWith(country));
                    setstatus(status);
                    setflag(status.countryInfo.flag);
                }
            getdata();
            } 
        }
    }, [country]);


    useEffect (() => {
        if (firstcontrol === false) {
            if ( switchSt.checkedB === true) {
                const getdata = async () => {
                    const statuscompare = allcountrys.find(aCountry => aCountry.country === countrycompare);
                    setstatuscompare(statuscompare);
                    setflagcompare(statuscompare.countryInfo.flag);
                }
            getdata();
            }
        }
    }, [countrycompare]);

    return (
        <DataContext.Provider
        value={{
            switchSt,
            country,
            countrycompare,
            allcountrys,
            status,
            statuscompare,
            flag,
            flagcompare,
            firstcontrol,
            setcountry,
            setcountrycompare,
            setswitchSt
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;