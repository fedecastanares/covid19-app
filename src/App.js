import React, {Fragment} from 'react';
import './App.css';
import AppBar from './components/appbar.js'
import DataProvider from './context/dataContext.js'
import HistoryProvider from './context/historyContext.js'
import Body from './components/body.js'
import { makeStyles } from '@material-ui/core/styles';
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
  
  return (
    <Fragment>
      <DataProvider>
        <HistoryProvider>
          <SearchBar/>
          <div className={classes.root}>
            <Body/>
          </div>
          </HistoryProvider>
        </DataProvider>
    </Fragment>
  );
}

export default App;
