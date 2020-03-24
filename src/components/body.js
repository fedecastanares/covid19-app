import React, { Fragment, useContext } from 'react';
import { DataContext } from '../context/dataContext.js'
import Tittle from './selectedCountry/tittle.js'
import Chart from './selectedCountry/chart.js'
import Tabla from './selectedCountry/table.js'


import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/ClipLoader";


const useStyles = makeStyles({
    root: {
      marginTop : 32,
      minWidth: 275,
    },
    title: {
      fontSize: 32,
    },
  });

  const override = css`
  margin: 35vh auto;
  border-color: "#123abc";
`;

const Body = () => {

    const classes = useStyles();
    const {
        country,
        status,
        code
    } = useContext(DataContext);

        if (country.length && code.alpha2Code !== undefined && status.country !== undefined ) {
        
        return(
            <Fragment>
                <Container>
                <Card className={classes.root}>
                    <CardContent>
                        <Tittle
                        country={country}
                        status={status}
                        flag={'https://www.countryflags.io/' + code.alpha2Code + '/flat/64.png'}
                        population={code.population}
                        />
                        <Tabla />
                        <Chart />
                    </CardContent>
                </Card>
                </Container>
            </Fragment>
        )
        } else {
            return <Fragment>
            <Container>
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
                                <PacmanLoader
                                css={override}
                                size={150}
                                />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>;
}} 

export default Body;