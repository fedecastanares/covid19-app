import React, { Fragment, useContext } from 'react';
import { DataContext } from '../context/dataContext.js'
import {HistoryContext} from '../context/historyContext.js'
import Tittle from './selectedCountry/tittle.js'
import Chart from './selectedCountry/chart.js'
import Tables from './selectedCountry/tables.js'
import BottomBar from './bottomBar.js'
import Mapa from './map.js'

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
    },
    ayuda: {
        marginTop: '1vh',
        color: '#fff',
        fontStyle: 'italic',
    }
  });

  const override = css`
  margin: 35vh auto;
  border-color: "white";
`;

const Body = () => {

    const classes = useStyles();
    const {countrydisplay,
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
                        countrydisplay={countrydisplay}
                        status={status}
                        flag={flag}
                        />
                        <Grid container>
                            <Grid item xs={12}>
                                <Tables />
                            </Grid>
                            <Grid item xs>
                                <Chart/>
                            </Grid>
                            
                        </Grid>
                    </CardContent>
                </Card>
                <Grid item xs={12}>
                    <Typography variant='body2' className={classes.ayuda}>
                        Ayuda comunitaria:
                    </Typography> 
                    <Mapa/>
                </Grid>
                    <a href='https://www.linkedin.com/in/federico-casta%C3%B1ares-992a0512b/'>
                        <Typography variant='body2' className={classes.firm}>
                        Federico Castañares
                        </Typography>
                    </a>
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