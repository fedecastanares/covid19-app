import React, {Fragment} from 'react';
import './App.css';
import DataProvider, { DataContext } from './context/dataContext.js'
import HistoryProvider from './context/historyContext.js'
import Body from './components/body.js'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SearchBar from './components/appbar.js';
import { dark } from '@material-ui/core/styles/createPalette';




const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#292929',
    paddingTop: '17vh',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '12vh',
    }
    
  }
}));

function App() {
  const classes = useStyles();
  const [darkMode, setdarkMode] = React.useState(true);


  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#007ec1',
      },
      secondary: {
        main: '#0ACFA9'
      },
      contrast:  darkMode ? '#f5f5f5' : '#212121',
      dark:  darkMode ? '#212121' :  '#f5f5f5',
    }
  })
  
  
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <DataProvider darkMode={darkMode} setdarkMode={setdarkMode}>
          <HistoryProvider>
            <SearchBar/>
            <div className={classes.root}>
              <Body/>
            </div>
            </HistoryProvider>
          </DataProvider>
        </ThemeProvider>
    </Fragment>
  );
}

export default App;
