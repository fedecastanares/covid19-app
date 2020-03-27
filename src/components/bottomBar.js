import React , {Fragment, useContext, useState, useEffect} from 'react';
import {DataContext} from '../context/dataContext.js';
import {HistoryContext} from '../context/historyContext.js';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';
import {Grid, FormControlLabel} from '@material-ui/core';

const useStyles = makeStyles(theme => ({ 
    root: {
      flexGrow: 1,
      position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100vw',
        backgroundColor: '#3f51b5',
        paddingTop: '1vh',
        paddingBottom : '1vh',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#eeeeee',
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
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
      width: '100%',
    },
    item: {
        width: '60vw',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '20vw', 
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    }, FormControlLabel: {
        width: '30vw',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: '20vw', 
          },
    }

}));




const BottomBar = () => {

    const classes = useStyles();
    const [label, setlabel] = useState('');
    const [color, setcolor] = useState('');
    const {country, setcountry, allcountrys, switchSt ,setswitchSt,setcountrycompare } = useContext(DataContext);
    const {sethistorycontrol} = useContext(HistoryContext);

    const handleChange = event => {
        if ( event.target.name === 'checkedB') {
            setswitchSt({ ...switchSt, [event.target.name]: event.target.checked });
        } else if (event.target.name === 'search' && switchSt.checkedB === false){
            const newCountry = allcountrys.find(aCountry => aCountry.country.indexOf(event.target.value) > -1);
            if( newCountry !== undefined) {
             setcountry(newCountry.country);
        }} else if( event.target.name === 'search' && switchSt.checkedB == true) {
            const newCountry = allcountrys.find(aCountry => aCountry.country.indexOf(event.target.value) > -1);
            if( newCountry !== undefined) {
             setcountrycompare(newCountry.country);
        }}
        else {
            console.log(event.target.name + '  ' + switchSt);
        }

    }

    useEffect(() => {
            const label = () => {
                if (switchSt.checkedB === false) {
                    const label = 'Pais';
                    return label;
                } else {
                    const label = 'Comparar';
                    return label;
                }
                }
                const color = () => {
                    if (switchSt.checkedB === false) {
                        const color = '#fff';
                        return color;
                    } else {
                        const color = 'rgb(245, 0, 87)';
                        return color;
                    }
                    }
                setlabel(label);
                setcolor(color);
    }, [switchSt.checkedB]);

    return ( 
        <Fragment>
            <div className={classes.root}>
               <Grid container justify='center' alignItems='center' alignContent='center' spacing={2}>
                   <Grid item className={classes.item}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        <SearchIcon />
                        </div>
                        <InputBase
                        placeholder="Buscar.. &nbsp;&nbsp;&nbsp;(English)"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        name='search'
                        onChange={handleChange}
                        />
                        </div>
                        </Grid>
                        <Grid item>
                        <FormControlLabel 
                        className={classes.FormControlLabel}
                        control= {
                        <Switch
                            checked={switchSt.checkedB}
                            onChange={handleChange}
                            name="checkedB" />
                        } 
                        label={label}
                        style={{color: color}}
                        />
                    </Grid>
                </Grid>
            </div>
        </Fragment>
     );
}
 
export default BottomBar;