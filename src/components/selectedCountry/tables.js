import React, {Fragment, useContext} from 'react';
import {HistoryContext} from '../../context/historyContext.js'
import { DataContext } from '../../context/dataContext.js'


import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Grid, Typography} from '@material-ui/core';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TableChartOutlined } from '@material-ui/icons';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);
  
  function createData(dia, confirmed, deaths) {
    return { dia, confirmed, deaths};
  }
    
  const useStyles = makeStyles(theme => ({
    table: {
      maxWidth: '100%',
    },
    margen:{
        marginTop: 30,
    },expansionpanel: {
      marginTop: '4vh',
      [theme.breakpoints.up('sm')]: {
        margin: '3vh',
      },
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      flexBasis: '33.33%',
      flexShrink: 0,
      marginLeft: '2vw',
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.text.secondary,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(18),
      },
    }, flag: {
      height: '4vh',
      [theme.breakpoints.up('sm')]: {
        height: '3vh',
      },
      icon: {
        marginLeft: '3vw',
      }
    }
  }));


const Tabla = () => {
    const classes = useStyles();

    const {cantidad,
      timeline,
      countrycases,
      countrydeaths,
      countrycasescompare,
      countrydeathscompare} = useContext(HistoryContext);
      const {country, status, countrycompare, statuscompare, flag, flagcompare} = useContext(DataContext);

      const [expanded, setExpanded] = React.useState(false);

      const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

      function getsCountryStatus() {
        const rowsCoutry = [];
        rowsCoutry.push(createData('Hoy', status.cases, status.deaths ));
          if (timeline !== undefined && countrycases !== undefined && countrydeaths !== undefined ) {
            for (let i = 0 ; i < cantidad ; i++ ) {
              let day = timeline[i];
              let cases = countrycases[i];
              let deaths = countrydeaths[i];
              rowsCoutry.push(createData( day , cases, deaths));
          }
          return rowsCoutry;
        }
      }
      let rowsCoutry = getsCountryStatus(); 

      function getsCountryCompareStatus() {
        const rowsCoutryCompare = [];
        rowsCoutryCompare.push(createData('Hoy', statuscompare.cases, statuscompare.deaths ));
          if (timeline !== undefined && countrycasescompare !== undefined && countrydeathscompare !== undefined ) {
            for (let i = 0 ; i < cantidad ; i++ ) {
              let day = timeline[i];
              let cases = countrycasescompare[i];
              let deaths = countrydeathscompare[i];
              rowsCoutryCompare.push(createData( day , cases, deaths));
          }
          
          return rowsCoutryCompare;
        }
      }
      let rowsCoutryCompare = getsCountryCompareStatus(); 

    return ( 
    <Fragment>

    <div className={classes.expansionpanel}>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container justify="space-between" alignContent='center' alignItems='center'>
            <Grid item xs={10}>
            <Grid container justify="Flex-start" alignContent='center' alignItems='center'>
              <Grid item>
                <img className={classes.flag} src={flag} alt={`bandera de ${country}`} />
              </Grid>
              <Grid item>
                <Typography className={classes.heading}>{country}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography className={classes.secondaryHeading}>{`Confirmados: ${status.cases} Fallecidos:${status.deaths}`}</Typography>
            </Grid>
            </Grid>
            <Grid item xs={2}>
              <TableChartOutlined  fontSize='large'/>
            </Grid>
        </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Table className={classes.table} aria-label={country}>
                <TableHead>
                    <TableRow>
                    <StyledTableCell>Dia</StyledTableCell>
                    <StyledTableCell align="right">Casos</StyledTableCell>
                    <StyledTableCell align="right">Fallecidos</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsCoutry.map(row => (
                    <StyledTableRow key={row.dia}>
                        <StyledTableCell component="th" scope="row">
                        {row.dia}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.confirmed}</StyledTableCell>
                        <StyledTableCell align="right">{row.deaths}</StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
                </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Grid container justify="space-between" alignContent='center' alignItems='center'>
            <Grid item xs={10}>
            <Grid container justify="Flex-start" alignContent='center' alignItems='center'>
              <Grid item>
          <img className={classes.flag} src={flagcompare} alt={`bandera de ${countrycompare}`} />
          </Grid>
              <Grid item>
          <Typography className={classes.heading}>{countrycompare}</Typography>
          </Grid>
            </Grid>
            <Grid item>
          <Typography className={classes.secondaryHeading}>
            {`Confirmados: ${statuscompare.cases} Fallecidos:${statuscompare.deaths}`}
          </Typography>
          </Grid>
            </Grid>
            <Grid item xs={2}>
              <TableChartOutlined  fontSize='large'/>
            </Grid>
            </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Table className={classes.table} aria-label={countrycompare}>
                <TableHead>
                    <TableRow>
                    <StyledTableCell>Dia</StyledTableCell>
                    <StyledTableCell align="right">Casos</StyledTableCell>
                    <StyledTableCell align="right">Fallecidos</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsCoutry.map(row => (
                    <StyledTableRow key={row.dia}>
                        <StyledTableCell component="th" scope="row">
                        {row.dia}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.confirmed}</StyledTableCell>
                        <StyledTableCell align="right">{row.deaths}</StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
                </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    </Fragment>
     );
}
 
export default Tabla;