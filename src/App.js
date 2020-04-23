import React, {Fragment} from 'react';
import './App.css';
import DataProvider, { DataContext } from './context/dataContext.js'
import HistoryProvider from './context/historyContext.js'
import Body from './components/body.js'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SearchBar from './components/appbar.js';




const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#000051',
    minheight: '100vh',
    paddingTop: '8vh',
    
  }
}));

function App() {
  const classes = useStyles();
  const [darkMode, setdarkMode] = React.useState(true);


  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
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
