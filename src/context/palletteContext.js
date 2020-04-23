import React, { createContext } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { indigo } from '@material-ui/core/colors';

export const PalleteContext = createContext();

const PalleteProvider = (props) =>{

    const themeDark = createMuiTheme({
        palette: {
            type: 'dark'
        }
    })

    const indigoTheme = createMuiTheme({
        palette:{
            primary:{
                
            }
        }
    })

    return (
        <PalleteContext.Provider>
            {props.children}
        </PalleteContext.Provider>
    )
}

export default PalleteProvider