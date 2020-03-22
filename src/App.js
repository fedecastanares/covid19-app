import React, {Fragment} from 'react';
import './App.css';
import AppBar from './components/appbar.js'
import DataProvider from './context/dataContext.js'
import Body from './components/body.js'

function App() {
  return (
    <Fragment>
        <AppBar/>
        <DataProvider>
          <Body />
        </DataProvider>
    </Fragment>
  );
}

export default App;
