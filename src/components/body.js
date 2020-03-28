import React, { Fragment, useContext } from 'react';
import { DataContext } from '../context/dataContext.js'
import {HistoryContext} from '../context/historyContext.js'
import Tittle from './selectedCountry/tittle.js'
import Chart from './selectedCountry/chart.js'
import Tables from './selectedCountry/tables.js'
import BottomBar from './bottomBar.js'

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid , Typography} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/ClipLoader";


const useStyles = makeStyles({
    root: {
      paddingTop : '10vh',
      minWidth: 275,
    },
    title: {
      fontSize: 32,
    },
    firm: {
        color: '#304ffe',
        fontSize: '0.8rem',
        textAlign: 'right',
        padding: '1vh',
        fontStyle: 'italic',
        paddingBottom: '8vh',
    }
  });

  const override = css`
  margin: 35vh auto;
  border-color: "white";
`;

const Body = () => {

    const classes = useStyles();
    const {
        country,
        status,
        flag,
        allcountrys,
    } = useContext(DataContext);
    const {timeline} = useContext(HistoryContext);

        if (country &&  allcountrys[0] !== undefined && flag !== undefined && timeline !== undefined) {
        
        return(
            <Fragment>
                <Container>
                <Card className={classes.root}>
                    <CardContent>
                        <Tittle
                        country={country}
                        status={status}
                        flag={flag}
                        />
                        <Grid container xs>
                            <Grid item xs={12}>
                                <Tables />
                            </Grid>
                            <Grid item xs>
                                <Chart/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Typography variant='body2' className={classes.firm}>
                Federico Castañares
                </Typography>
                </Container>
                <BottomBar/>
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
                                size={'20vh'}
                                color={'white'}
                                />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <BottomBar/>
        </Fragment>;
}} 

export default Body;