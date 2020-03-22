import React, {Fragment} from 'react';
import { Line } from 'react-chartjs-2';



const Chart = () => {

const data = {
    labels: ['1', '2','3','4'],
    datasets: [
        {
            label: 'Uruguay',
            backgroundColor: 'rgba(63,81,181,0.75)',
            data: [9, 12, 24,94]
        },
        {
            label: 'Argentina',
            backgroundColor: 'rgba(40,61,126,0.50)',
            data: [5, 10, 16, 102]
        }
    ]
}

    return ( 
        <Fragment>
            <Line
            data={data}
            width={100}
            height={50}
            options={{ maintainAspectRatio: false }}
            />
        </Fragment>
     );
}
 
export default Chart;