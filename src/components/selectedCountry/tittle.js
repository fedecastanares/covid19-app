import React, {Fragment} from 'react';

import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    title: {
      fontSize: 32,
    },
  });

const Tittle = (props) => {
    const classes = useStyles();
    const { country,
        confirmedToday,
        deathsToday,
        recoveredToday,
        flag } = props;

    return ( 
        <Fragment>
            <img src={flag} alt={`Bandera de ${country}`} />
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                {country}
            </Typography>
            <Alert severity="warning">Casos: {confirmedToday}</Alert>
            <Alert severity="error">Fallecimientos: {deathsToday}</Alert>
            <Alert severity="success">Recuperados: {recoveredToday}</Alert>
        </Fragment>
     );
}
 
export default Tittle;