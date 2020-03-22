import React, {Fragment} from 'react';
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
  
  const rows = [
    createData('Dia 0' + ' Actual', 0,0),
    createData('Dia 1', 0,0),
    createData('Dia 2', 0,0),
    createData('Dia 3', 0,0),
    createData('Dia 4', 0,0),
    createData('Dia 5', 0,0),
    createData('Dia 6', 0,0),
    createData('Dia 7', 0,0),
  ];
  
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
    return ( 
    <Fragment>
    <Grid container xs={12} spacing={3} className={classes.margen}>
        <Grid item xs>
        <Typography color="textSecondary">Uruguay</Typography>
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
                    {rows.map(row => (
                    <StyledTableRow key={row.name}>
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
        <Typography color="textSecondary">Comparacion</Typography>
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
                    {rows.map(row => (
                    <StyledTableRow key={row.name}>
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