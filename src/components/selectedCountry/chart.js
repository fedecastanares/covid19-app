import React, {Fragment, useContext} from 'react';
import { Bar } from 'react-chartjs-2';
import { DataContext } from '../../context/dataContext';
import { HistoryContext} from '../../context/historyContext.js';
import { Typography , Slider} from '@material-ui/core';


function valuetext(value) {
    return `${value} dias`;
  }

const Chart = () => {

    
    const {
        cantidad,
        timeline,
        countrycases,
        countrycasescompare,
        setcantidad
        } = useContext(HistoryContext);
        const {country , status, statuscompare, countrycompare} = useContext(DataContext);

    
    const HandleChange = (event, value) => {
        setcantidad(value);
    } 

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
    for (let i = 0 ; i < cantidad ; i++) {
        timelineReverse.push(timeline[i].substr(0,timeline[i].length - 3 )) ;
        countrycasesReverse.push(countrycases[i]);
        countrycasescompareReverse.push(countrycasescompare[i]);
    } 
    
    data.labels = timelineReverse.reverse()
    data.datasets[0].data = countrycasesReverse.reverse();
    data.datasets[1].data = countrycasescompareReverse.reverse(); 
    // Agregando un valor al objeto
    // data.labels[data.labels.length] = '4' ;

    if ( timeline !== undefined) {
        return ( 
            <Fragment>
                <Bar
                data={data}
                width={100}
                height={80}
                options={{ title: {display: true, text: 'Evolucion de casos'}, legend: {display: true}  }}
                />
                <Typography id="discrete-slider-small-steps" gutterBottom>
                    Cambiar rango
                </Typography>
                <Slider
                    defaultValue={9}
                    getAriaValueText={valuetext}
                    aria-labelledby="history value"
                    step={1}
                    marks
                    min={7}
                    max={timeline.length - 20}
                    valueLabelDisplay="auto"
                    onChange={HandleChange}
                />
            </Fragment>
        );
    }
}
 
export default Chart;