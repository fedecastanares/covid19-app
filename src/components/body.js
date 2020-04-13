import React, { Fragment, useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/dataContext.js'
import {HistoryContext} from '../context/historyContext.js'
import Tittle from './selectedCountry/tittle.js'
import Chart from './selectedCountry/chart.js'
import Tables from './selectedCountry/tables.js'
import BottomBar from './bottomBar.js'
import Mapa from './map.js'
import Form from './form.js'

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid , Typography, Button} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/ClipLoader";
import LinkedInIcon from '@material-ui/icons/LinkedIn';


const useStyles = makeStyles( theme => ({ 
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
        fontStyle: 'italic',
        padding: '2vh 0 8vh 0',
    },
    firmicon: {
        color: '#304ffe',
        padding: '2vh 0.5vh 8vh 0',
        textAlign: 'right',
        fontSize: '1rem',
    },
    ayuda: {
        marginTop: '1vh',
        color: '#fff',
        fontStyle: 'italic',
    },
    formcontrol: {
       marginTop: '1.5vh',
       marginBottom: '1.5vh'
    },
    buttomNew: {
        fontSize: '0.75rem',
        marginRight: '2vw'
    },
    donate: {
        fontSize: '0.75rem',
        marginRight: '10vw',
        [theme.breakpoints.up('sm')]: {
            marginRight: 0
        }
    }, tables: {
        marginTop: '2vh'
    }
    }));

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

    const [formview, setformview] = useState(false);
    const [btntxtprimary, setbtntxtprimary] = useState('Nuevo punto');
    const [btntxtsecondary, setbtntxtsecondary] = useState('Donar');
    const [activeStep, setActiveStep] = React.useState(-1);

    useEffect(() => {
        if ( formview === true) {
            switch (activeStep) {
                case 0:
                     setbtntxtprimary('Siguiente');
                     setbtntxtsecondary('Cancelar');
                     break;
                 case 1:
                     setbtntxtprimary('Siguiente');
                     setbtntxtsecondary('Atras');
                     break;
                 case 2:
                     setbtntxtprimary('Confirmar');
                     setbtntxtsecondary('Atras');
                     break;
                 case 3:
                    setbtntxtprimary('Ver mapa');
                    setbtntxtsecondary('Deshacer');
                    break;
                 default: 
                 break;
                     
                }
            } else {
                setbtntxtprimary('Nuevo punto');
                setbtntxtsecondary('Donar');
            }
        }, [activeStep])
    

    const handleNext = () => {
        if ( formview === true) {
            if ( activeStep < 3){
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }else if(activeStep === 3) {
                setActiveStep(-1)
                setformview(false)
            }
           }
        else {
            setformview(true);
            setActiveStep(0);
        }
      };
    

    const handleBack = () => {
        if ( formview === true) {
            if (activeStep > 0) {
                setActiveStep((prevActiveStep) => prevActiveStep - 1);
            } else if (activeStep === 0 ) {
                setActiveStep(-1);
                setformview(false);
            }
           }
        else {
            // Cuando se presiona Donar
        }
      };


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
                        <Grid container className={classes.tables}>
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
                    <Grid container className={classes.formcontrol} justify='space-between'>
                        <Grid item>
                            <Typography variant='body2' className={classes.ayuda}>
                                Ayuda comunitaria:
                            </Typography> 
                        </Grid>
                        
                    </Grid>
                    {formview ? <Form
                                    activeStep={activeStep}
                                    setActiveStep={setActiveStep}
                                    setbtntxtprimary={setbtntxtprimary}
                                    setbtntxtsecondary={setbtntxtsecondary}
                                    /> 
                                : <Mapa/> }
                    </Grid>
                    <a href='https://www.linkedin.com/in/federico-casta%C3%B1ares-992a0512b/' style={{'textDecoration' : 'none'}}>
                        <Grid container alignItems='center' alignContent='center' justify='flex-end'>
                            <LinkedInIcon fontSize='small'className={classes.firmicon} />
                            <Typography variant='body2' className={classes.firm}>
                            Federico Castañares
                            </Typography>
                        </Grid>
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