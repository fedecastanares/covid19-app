import React, {Fragment} from 'react';

import { Typography, Grid}  from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    title: {
      fontSize: 32,
      marginLeft: 16,
    },
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
                <Alert severity="warning">Casos: {status.cases}</Alert>
                <Alert severity="error">Fallecimientos: {status.deaths}</Alert>
                <Alert severity="success">Recuperados: {status.recovered}</Alert>
                <Alert severity="info">De hoy: {status.todayCases}</Alert>
            </Grid>
            </Grid>
            
        </Fragment>
     );
}
 
export default Tittle;