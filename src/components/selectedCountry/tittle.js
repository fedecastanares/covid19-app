import React, {Fragment} from 'react';

import { Typography, Grid}  from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    title: {
      fontSize: '3rem',
      marginLeft: 16,

    }, 
    alert:{
        textAlign: 'center',
        justifyContent: 'center'
    },
    body2:{
        marginTop: 30,
    }, alertgroup: {
        marginTop: '2vh',
    }, 
  });

const Tittle = (props) => {
    const classes = useStyles();
    const { country,
        status,
        flag, countrydisplay } = props;

    if (status !== undefined ) {
    return ( 
        <Fragment>
            <Grid container 
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={2}
            >
                <Grid container 
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}>
                    <img src={flag} alt={`Bandera de ${country}`} />
                    <Typography className={classes.title} color="textSecondary">
                        {countrydisplay}
                    </Typography>
                </Grid>
                <Grid container spacing={1} className={classes.alertgroup}>
                    <Grid item xs={6} lg={3}>
                        <MuiAlert className={classes.alert} severity="warning" elevation={4} variant='filled'>Casos: {status.cases} <br className='mobile'/> ({status.casesPerOneMillion} por millon)</MuiAlert>
                    </Grid>
                    <Grid item xs={6} lg={3}>
                        <MuiAlert className={classes.alert} severity="info" elevation={4} variant='filled'>De hoy: {status.todayCases} <br className='mobile'/> ({(((status.todayCases === 0 ?  0 : status.todayCases) * 100) / status.cases).toFixed(3)}%) </MuiAlert>
                    </Grid>
                    <Grid item xs={6} lg={3}>
                        <MuiAlert className={classes.alert} severity="success" elevation={4} variant='filled'>Recuperados: <br className='mobile'/> {status.recovered} <br className='mobile'/> ({((status.recovered * 100) / status.cases).toFixed(3)}%)</MuiAlert>
                    </Grid>
                    <Grid item xs={6} lg={3}>
                        <MuiAlert className={classes.alert} severity="error" elevation={4} variant='filled'>Fallecidos:<br className='mobile'/> {status.deaths} <br className='mobile'/> ({((status.deaths * 100) / status.cases).toFixed(3)}%)</MuiAlert>
                    </Grid>
                </Grid>
            </Grid>  
        </Fragment>
     );
    }
}
 
export default Tittle;