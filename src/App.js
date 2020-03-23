import React, {Fragment} from 'react';
import './App.css';
import AppBar from './components/appbar.js'
import DataProvider from './context/dataContext.js'
import HistoryProvider from './context/historyContext.js'
import Body from './components/body.js'

function App() {
  return (
    <Fragment>
        <AppBar/>
        <DataProvider>
          <HistoryProvider>
            <Body />
          </HistoryProvider>
        </DataProvider>
    </Fragment>
  );
}

export default App;
