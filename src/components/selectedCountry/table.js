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
    
  const useStyles = makeStyles({
    table: {
      maxWidth: '100%',
    },
    margen:{
        marginTop: 30,
    }
  });


const Tabla = () => {
    const classes = useStyles();

    const {countrycompare,
      timeline,
      countrycases,
      countrydeaths,
      countrycasescompare,
      countrydeathscompare} = useContext(HistoryContext);
      const {country} = useContext(DataContext);

      function getsCountryStatus() {
        const rowsCoutry = [];
          if (timeline !== undefined && countrycases !== undefined && countrydeaths !== undefined ) {
            for (let i = 0 ; i < 14 ; i++ ) {
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
          if (timeline !== undefined && countrycasescompare !== undefined && countrydeathscompare !== undefined ) {
            for (let i = 0 ; i < 14 ; i++ ) {
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
    <Grid container spacing={3} className={classes.margen} justify='space-around' alignItems='center' alignContent='center'>
        <Grid item xs>
        <Typography color="textSecondary">{country}</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="Uruguay">
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
            </TableContainer>
        </Grid>
        <Grid item xs>
        <Typography color="textSecondary">{countrycompare}</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="Uruguay">
                <TableHead>
                    <TableRow>
                    <StyledTableCell>Dia</StyledTableCell>
                    <StyledTableCell align="right">Casos</StyledTableCell>
                    <StyledTableCell align="right">Fallecidos</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsCoutryCompare.map(row => (
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
            </TableContainer>
        </Grid>
    </Grid>
    </Fragment>
     );
}
 
export default Tabla;