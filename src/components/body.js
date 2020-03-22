import React, { Fragment, useContext } from 'react';
import { DataContext } from '../context/dataContext.js'
import Tittle from './selectedCountry/tittle.js'

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';




const useStyles = makeStyles({
    root: {
      marginTop : 32,
      minWidth: 275,
    },
    title: {
      fontSize: 32,
    },
  });

const Body = () => {

    const classes = useStyles();
    const {
        country,
        confirmed,
        deaths,
        recovered,
        flag
    } = useContext(DataContext);

        if (confirmed.length && deaths.length && recovered.length) {
        const confirmedToday = confirmed[confirmed.length - 1].Cases;
        const deathsToday = deaths[deaths.length - 1].Cases;
        const recoveredToday = recovered[recovered.length - 1].Cases;
      
        
        return(
            <Fragment>
                <Container>
                <Card className={classes.root}>
                    <CardContent>
                        <Tittle
                        country={country}
                        confirmedToday={confirmedToday}
                        deathsToday={deathsToday}
                        recoveredToday={recoveredToday}
                        flag={flag}
                        />
                    </CardContent>
                </Card>
                </Container>
            </Fragment>
        )
        } else {
            return null;
}} 

export default Body;