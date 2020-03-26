import React, { createContext, useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { DataContext } from './dataContext.js';

export const HistoryContext = createContext();

const HistoryProvider = (props) => {

    const cantidad = 9;
    const [historycontrol, sethistorycontrol] = useState(false);
    const [timeline, settimeline] = useState([]);
    const [countrycases, setcountrycases] = useState([]);
    const [countrydeaths, setcountrydeaths] = useState([]);
    const [countrycasescompare, setcountrycasescompare] = useState([]);
    const [countrydeathscompare , setcountrydeathscompare] = useState([]);

    const { country , allcountrys, countrycompare} = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            // API deprecada
            sethistorycontrol(false);
            const url = `https://corona.lmao.ninja/v2/historical/${country}`
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

            const matches = [];
            const findSimilarData = await findSimilar(cases);
            Promise.all(findSimilarData).then(response => {
            //    console.log(response[0]);
            })
            
        }
        getData();

        const getDatacompare = async () => {
            const url = `https://corona.lmao.ninja/v2/historical/${countrycompare}`
            const data = await Axios.get(url);
            let cases = Object.values(data.data.timeline.cases);
            cases = cases.reverse();
            let deaths = Object.values(data.data.timeline.deaths);
            deaths = deaths.reverse();
            setcountrycasescompare(cases);
            setcountrydeathscompare(deaths);
            sethistorycontrol(true);
        }
        getDatacompare();

        const findSimilar = async (countrycases) => {
            let match = [];
            let matches = allcountrys.map(async country =>{
                const url = `https://corona.lmao.ninja/historical/${country.country}`;
                const data = await Axios.get(url);
                let cases = Object.values(data.data.timeline.cases);
                cases = cases.reverse();
                const countryData = data.data.standardizedCountryName.charAt(0).toUpperCase() + data.data.standardizedCountryName.slice(1);
                if (cases[0] !== undefined || country.country !== countryData) {
                     for (let i = 0 ; i < cases.length && cases[i] !== 0 ; i++) {
                         if( cases[i] === countrycases[0]) {
                            const countryfinded = country.country;
                            match.push({countryfinded, i , 'Prioridad': 'Primera'});
                         } 
                     }
                 } 
                //console.log('Recorriendo..');
                return match;
            });
            Promise.resolve(matches).then((response) => {
                return response;
            })
            
            return matches;
            
        }
    }, [country]);

    return (
        <HistoryContext.Provider
        value={{
            cantidad,
            timeline,
            countrycases,
            countrydeaths,
            countrycasescompare,
            countrydeathscompare,
            historycontrol
        }}>
        {props.children}
        </HistoryContext.Provider>
    )
}

export default HistoryProvider;