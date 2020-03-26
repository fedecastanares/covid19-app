import React, {Fragment, useContext} from 'react';
import { Bar } from 'react-chartjs-2';
import { DataContext } from '../../context/dataContext';
import { HistoryContext} from '../../context/historyContext.js';



const Chart = () => {

    const {
        timeline,
        countrycases,
        countrydeaths,
        countrycasescompare,
        countrydeathscompare} = useContext(HistoryContext);
        const {country , status, statuscompare, countrycompare} = useContext(DataContext);


    let data = {
    labels: [],
    datasets: [
        {
            label: '',
            backgroundColor: 'rgba(255,0,0,0.50)',
            type: 'line',
            data: []
        },
        {
            label: '',
            backgroundColor: 'rgba(63,81,181,0.75)',
            type: 'line',
            data: []
        }
    ]
    }
    data.datasets[0].label = country;
    data.datasets[1].label = countrycompare;
    let timelineReverse = [];
    let  countrycasesReverse = [];
    let  countrycasescompareReverse = [];
    timelineReverse.push('Hoy');
    countrycasesReverse.push(status.cases);
    countrycasescompareReverse.push(statuscompare.cases);
    for (let i = 0 ; i < 14 ; i++) {
        timelineReverse.push(timeline[i]) ;
        countrycasesReverse.push(countrycases[i]);
        countrycasescompareReverse.push(countrycasescompare[i]);
    } 
    
    data.labels = timelineReverse.reverse()
    data.datasets[0].data = countrycasesReverse.reverse();
    data.datasets[1].data = countrycasescompareReverse.reverse(); 
    // Agregando un valor al objeto
    // data.labels[data.labels.length] = '4' ;


    return ( 
        <Fragment>
            <Bar
            data={data}
            width={100}
            height={80}
            options={{ title: {display: true, text: 'Cases evolucion'}, legend: {display: true}  }}
            />
        </Fragment>
     );
}
 
export default Chart;