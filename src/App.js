import React, {Fragment} from 'react';
import './App.css';
import AppBar from './components/appbar.js'
import DataProvider from './context/dataContext.js'

function App() {
  return (
    <Fragment>
        <AppBar/>
        <DataProvider>
          
        </DataProvider>
    </Fragment>
  );
}

export default App;
