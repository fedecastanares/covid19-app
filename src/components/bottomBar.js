import React , {Fragment, useContext, useState, useEffect} from 'react';
import {DataContext} from '../context/dataContext.js';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';
import {Grid, FormControlLabel} from '@material-ui/core';

const userLang = navigator.language.substr(0,2) || navigator.userLanguage.substr(0,2); 

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
        zIndex: '1100'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#e8eaf6',
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
    const [countryNative, setcountryNative] = useState([]);
    const [codeswithcases, setcodeswithcases] = useState([]);
    const { setcountry, allcountrys, switchSt ,setswitchSt,setcountrycompare, restcountries, infostatus, setcodecountry, setcodecountrycompare } = useContext(DataContext);

    useEffect(() => {
        const getcountryNative = async () => {
            if ( infostatus === true && allcountrys[1] !== undefined && restcountries[1] !== undefined) {
            let countrys = [];
            if (userLang === 'es') {
                countrys.push({'country' : 'Estados Unidos' , 'code' : 'US'});
             }   
             const codeswithcases = allcountrys.map(aCountry => aCountry.countryInfo.iso2);
             setcodeswithcases(codeswithcases);
            if (restcountries[0] !== undefined) {
                // Cambiar Map por filter
                restcountries.map(aCountry => { 
                if (userLang !== 'en') {
                    for (let i = 0 ; i < allcountrys.length ; i++ ) { 
                        if (aCountry.alpha2Code === codeswithcases[i]) {
                            const lenguajeskeys = Object.keys(aCountry.translations);
                            const lenguajesvalues = Object.values(aCountry.translations);
                                for ( let i = 0 ; i < lenguajeskeys.length ; i++) {
                                    if( lenguajeskeys[i] === userLang && lenguajesvalues[i] !== null) {
                                        countrys.push({'country' : lenguajesvalues[i] ,'code' : aCountry.alpha2Code});
                                    } 
                                }
                        }
                    }
                } 
            })
            }
            setcountryNative(countrys);
        }
        }
        getcountryNative();
    }, [allcountrys]);

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
                        const color = 'rgba(255,0,0)';
                        return color;
                    }
                    }
                setlabel(label);
                setcolor(color);
    }, [switchSt.checkedB]);

    
    const handleChange = event => {
        if ( event.target.name === 'checkedB') {
            setswitchSt({ ...switchSt, [event.target.name]: event.target.checked });
        } else if (event.target.name === 'search' && switchSt.checkedB === false){
            if (userLang !== 'en') {
                const newCountry = countryNative.find(countrycode => countrycode.country.startsWith(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)));
                const existe = codeswithcases.find(code => code === newCountry.code);
                if (newCountry !== undefined && existe === newCountry.code) {
                    const newCode = allcountrys.find(aCountry => aCountry.countryInfo.iso2 === newCountry.code && aCountry !== undefined);
                    if (newCode !== undefined) {
                        setcountry(newCode.country);
                        setcodecountry(existe);
                    }
                }
            } else {
                const newCountry = allcountrys.find(aCountry => aCountry.country.startsWith(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)));
                const existe = codeswithcases.find(code => code === newCountry.code);
                if( newCountry !== undefined) {
                    setcountry(newCountry.country);
                    setcodecountry(existe);
                }
        }} else if( event.target.name === 'search' && switchSt.checkedB === true) {
            if (userLang !== 'en') {
                const newCountry = countryNative.find(countrycode => countrycode.country.startsWith(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)));
                const existe = codeswithcases.find(code => code === newCountry.code);
                if (newCountry !== undefined) {
                    const newCode = allcountrys.find(aCountry => aCountry.countryInfo.iso2 === newCountry.code && aCountry !== undefined);
                    if (newCode !== undefined) {
                        setcountrycompare(newCode.country);
                        setcodecountrycompare(existe);
                    }
                }
            } else {
                const newCountry = allcountrys.find(aCountry => aCountry.country.startsWith(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)));
                const existe = codeswithcases.find(code => code === newCountry.code);
                if( newCountry !== undefined) {
                    setcountrycompare(newCountry.country);
                    setcodecountrycompare(existe);
                }
        }
            }
        else {
            console.log(event.target.name + '  ' + switchSt);
        }

    }

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
                        placeholder="Buscar.. &nbsp;&nbsp;&nbsp;"
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