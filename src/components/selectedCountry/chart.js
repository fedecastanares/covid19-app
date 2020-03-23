import React, {Fragment, useContext} from 'react';
import { Bar } from 'react-chartjs-2';
import { DataContext } from '../../context/dataContext';



const Chart = () => {

    const {} = useContext(DataContext);

    const data = {
    labels: ['1', '2','3','4'],
    datasets: [
        {
            label: 'Uruguay',
            backgroundColor: 'rgba(255,0,0,0.50)',
            type: 'line',
            data: [9, 12, 24,94]
        },
        {
            label: 'Promedio',
            backgroundColor: 'rgba(63,81,181,0.75)',
            type: 'line',
            data: [0, 10, 16, 102]
        }
    ]
}

    return ( 
        <Fragment>
            <Bar
            data={data}
            width={100}
            height={50}
            options={{ title: {display: true, text: 'Evolucion'}, legend: {display: true}  }}
            />
        </Fragment>
     );
}
 
export default Chart;