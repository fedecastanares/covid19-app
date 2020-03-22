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
    }
  });

const Tittle = (props) => {
    const classes = useStyles();
    const { country,
        status,
        flag } = props;

    return ( 
        <Fragment>
            <Grid container 
            direction="row"
            justify="space-around"
            alignItems="center">
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
            </Grid>
            <Grid item xs>
                <Alert className={classes.alert} severity="warning">Casos: {status.cases}</Alert>
                <Alert className={classes.alert} severity="error">Fallecimientos: {status.deaths}</Alert>
                <Alert className={classes.alert} severity="success">Recuperados: {status.recovered}</Alert>
                <Alert className={classes.alert} severity="info">De hoy: {status.todayCases}</Alert>
            </Grid>
            </Grid>
            
        </Fragment>
     );
}
 
export default Tittle;