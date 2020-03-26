import React , {Fragment, useContext, useState} from 'react';
import {DataContext} from '../context/dataContext.js';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';
import {Grid, Container} from '@material-ui/core';

const useStyles = makeStyles(theme => ({ 
    root: {
      flexGrow: 1,
      position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100vw',
        color: '#fff',
        backgroundColor: '#3f51b5',
        height: '5vh',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '35%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '40%', 
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '60%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },}));




const BottomBar = () => {

    const classes = useStyles();
    const {country, setcountry, allcountrys} = useContext(DataContext);
    const [switchSt, setswitchSt] = React.useState({
        checkedA: true,
        checkedB: true,
      });

    const handleChange = event => {
        if ( event.target.name) {
            setswitchSt({ ...switchSt, [event.target.name]: event.target.checked });
        } else {
            const newCountry = allcountrys.find(aCountry => aCountry.country.indexOf(event.target.value) > -1);
            if( newCountry !== undefined) {
             setcountry(newCountry.country);
        } else {
            console.log(newCountry);
        }}

    }


    return ( 
        <Fragment>
            <div className={classes.root}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    autoComplete
                    placeholder="Search country.. (English)"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    name='search'
                    
                    onChange={handleChange}
                    />
                </div>
            <Switch
            checked={switchSt.checkedB}
            onChange={handleChange}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
        />
            </div>
        </Fragment>
     );
}
 
export default BottomBar;