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

    if (status !== undefined ) {
    return ( 
        <Fragment>
            <Grid container 
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={2}>
            <Grid item xs>
                <Grid container 
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}>
                    <img src={flag} alt={`Bandera de ${country}`} />
                    <Typography className={classes.title} color="textSecondary">
                        {country}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs>
                <Alert className={classes.alert} severity="warning">Casos: {status.cases} - ({status.casesPerOneMillion} por millon)</Alert>
                <Alert className={classes.alert} severity="error">Fallecidos: {status.deaths} - ({((status.deaths * 100) / status.cases).toFixed(3)}%)</Alert>
                <Alert className={classes.alert} severity="success">Recuperados: {status.recovered} - ({((status.recovered * 100) / status.cases).toFixed(3)}%)</Alert>
                <Alert className={classes.alert} severity="info">De hoy: {status.todayCases} - ({(((status.todayCases === 0 ?  0 : status.cases - status.todayCases) * 100) / status.cases).toFixed(3)}%) </Alert>
            </Grid>
            </Grid>  
        </Fragment>
     );
    }
}
 
export default Tittle;