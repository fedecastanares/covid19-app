import React, {Fragment} from 'react';

import { Typography, Grid}  from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    title: {
      fontSize: 32,
      marginLeft: 16,
    }, 
    alert:{
        marginTop: 6,
    },
    body2:{
        marginTop: 30,
    }
  });

const Tittle = (props) => {
    const classes = useStyles();
    const { country,
        status,
        flag,
        population } = props;

    return ( 
        <Fragment>
            <Grid container 
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={2}>
            <Grid item xs>
                <Grid container 
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}>
                    <img src={flag} alt={`Bandera de ${country}`} />
                    <Typography className={classes.title} color="textSecondary">
                        {country}
                    </Typography>
                </Grid>
            <Grid container alignItems="center" justify="center" xs>
                <Typography className={classes.body2} variant='body2' component='body'>Poblacion: {population}</Typography>
            </Grid>
            </Grid>
            <Grid item xs>
                <Alert className={classes.alert} severity="warning">Casos: {status.cases} - ({((status.cases * 100) / population).toFixed(3)}%)</Alert>
                <Alert className={classes.alert} severity="error">Fallecimientos: {status.deaths}  ({((status.deaths * 100) / status.cases).toFixed(3)}%)</Alert>
                <Alert className={classes.alert} severity="success">Recuperados: {status.recovered} ({((status.recovered * 100) / status.cases).toFixed(3)}%)</Alert>
                <Alert className={classes.alert} severity="info">De hoy: {status.todayCases} ({(((status.cases - status.todayCases) * 100) / status.cases).toFixed(3)}%) </Alert>
            </Grid>
            </Grid>  
        </Fragment>
     );
}
 
export default Tittle;