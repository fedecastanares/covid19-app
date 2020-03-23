import React, { createContext, useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { DataContext } from './dataContext.js';

export const HistoryContext = createContext();

const HistoryProvider = (props) => {

    const [countrycompare, setcountrycompare] = useState('Argentina');
    const [timeline, settimeline] = useState([]);
    const [countrycases, setcountrycases] = useState([]);
    const [countrydeaths, setcountrydeaths] = useState([]);
    const [countrycasescompare, setcountrycasescompare] = useState([]);
    const [countrydeathscompare , setcountrydeathscompare] = useState([]);


    const { country } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const url = `https://corona.lmao.ninja/historical/${country}`
            const data = await Axios.get(url);
            let timeline =  Object.keys(data.data.timeline.cases);
            timeline = timeline.reverse();
            let cases = Object.values(data.data.timeline.cases);
            cases = cases.reverse();
            let deaths = Object.values(data.data.timeline.deaths);
            deaths = deaths.reverse();
            settimeline(timeline);
            setcountrycases(cases);
            setcountrydeaths(deaths);
        }
        getData();

        const getDatacompare = async () => {
            const url = `https://corona.lmao.ninja/historical/${countrycompare}`
            const data = await Axios.get(url);
            let cases = Object.values(data.data.timeline.cases);
            cases = cases.reverse();
            let deaths = Object.values(data.data.timeline.deaths);
            deaths = deaths.reverse();
            setcountrycasescompare(cases);
            setcountrydeathscompare(deaths);
        }
        getDatacompare();

    }, []);

    return (
        <HistoryContext.Provider
        value={{
            countrycompare,
            timeline,
            countrycases,
            countrydeaths,
            countrycasescompare,
            countrydeathscompare
        }}>
        {props.children}
        </HistoryContext.Provider>
    )
}

export default HistoryProvider;