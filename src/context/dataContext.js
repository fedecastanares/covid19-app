import React, {createContext,useState, useEffect} from 'react';
import Axios from 'axios';

export const DataContext = createContext();

const userLang = navigator.language.substr(0,2) || navigator.userLanguage.substr(0,2) ; 
const DataProvider = (props) => {

    const [country, setcountry] = useState('Uruguay');
    const [countrycompare, setcountrycompare] = useState('Argentina');
    const [flag, setflag] = useState('');
    const [flagcompare, setflagcompare] = useState('');
    const [allcountrys, setallcountrys] = useState([]);
    const [status, setstatus] = useState({});
    const [statuscompare, setstatuscompare] = useState({});
    const [firstcontrol, setfirstcontrol] = useState(true);
    const [switchSt, setswitchSt] = useState({
        checkedB: false
      });
      
    const [restcountries, setrestcountries] = useState([]);
    const [countrydisplay, setcountrydisplay] = useState('');
    const [countrydisplaycompare, setcountrydisplaycompare] = useState('');
    const [infostatus, setinfostatus] = useState(false);


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
        
        const getrestcountries = async () => {
            // const userLang = 'br';
            if (userLang !== 'en') {
                const url = `https://restcountries.eu/rest/v2/name/`;
                const data = await Axios.get(url + country);
                const lenguajeskeys = Object.keys(data.data[0].translations);
                const lenguajesvalues = Object.values(data.data[0].translations);
                for ( let i = 0 ; i < lenguajeskeys.length ; i++) {
                    if( lenguajeskeys[i] === userLang ) {
                        setcountrydisplay(lenguajesvalues[i]);
                    } else {  setcountrydisplay(country); }
                }
                const datacompare = await Axios.get(url + countrycompare);
                const lenguajesvaluescompare = Object.values(datacompare.data[0].translations);
                for ( let i = 0 ; i < lenguajeskeys.length ; i++) {
                if( lenguajeskeys[i] === userLang ) {
                    setcountrydisplaycompare(lenguajesvaluescompare[i]);
                } else {
                    setcountrydisplaycompare(countrycompare);
                }
                }
            } else {
                setcountrydisplay(country);
                setcountrydisplaycompare(countrycompare);
            }
            const alldata = await Axios.get ('https://restcountries.eu/rest/v2/all');
            setrestcountries(alldata.data); 
        }
        getrestcountries();
        if (allcountrys !== [] && restcountries !== [] ) {
           setinfostatus(true) 
        }
    }, []);

    useEffect (() =>{
        if (firstcontrol === false) {
            if (switchSt.checkedB === false) {
                const getdata = async () => {
                    const status = allcountrys.find(aCountry => aCountry.country.startsWith(country));
                    setstatus(status);
                    setflag(status.countryInfo.flag);
                    const newCountry = restcountries.find(aCountry => status.countryInfo.iso2 === aCountry.alpha2Code);
                    if (userLang !== 'en') {
                        const lenguajeskeys = Object.keys(newCountry.translations);
                        const lenguajesvalues = Object.values(newCountry.translations);
                        for ( let i = 0 ; i < lenguajeskeys.length ; i++) {
                            if ( lenguajeskeys[i] === userLang ) {
                                setcountrydisplay(lenguajesvalues[i]);
                            } 
                        } } else {
                            setcountrydisplay(country);
                        }
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
                    const newCountry = restcountries.find(aCountry => statuscompare.countryInfo.iso2 === aCountry.alpha2Code);
                    if (userLang !== 'en') {
                        const lenguajeskeys = Object.keys(newCountry.translations);
                        const lenguajesvalues = Object.values(newCountry.translations);
                        for ( let i = 0 ; i < lenguajeskeys.length ; i++) {
                            if( lenguajeskeys[i] === userLang ) {
                                setcountrydisplaycompare(lenguajesvalues[i]);
                            } 
                        } } else {
                            setcountrydisplaycompare(countrycompare);
                        }
                }
            getdata();
            }
        }
    }, [countrycompare]);

    return (
        <DataContext.Provider
        value={{
            infostatus,
            restcountries,
            countrydisplay,
            countrydisplaycompare,
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
            setswitchSt,
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;