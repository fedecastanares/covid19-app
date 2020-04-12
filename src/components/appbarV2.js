import React , {Fragment, useState, useContext } from 'react';
import {DataContext} from '../context/dataContext.js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, ListItem,  ListItemText, Divider, SwipeableDrawer,ListItemAvatar, Avatar} from '@material-ui/core';
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const useStyles = makeStyles(theme => ({ 
  root: {
    backgroundColor: theme.palette.dark ,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    marginLeft: '1vw',
    flexGrow: 1,
    fontSize: '1.5rem',
    fontWeight: '400',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  list: {
    width: '70vw',
    [theme.breakpoints.up('sm')]: {
      width: '30vw',
    },

  },
  paper: {
    backgroundColor: '#3f51b5',
    color: '#f2f2f2',
  },
}));


export default function SearchAppBar() {
  const classes = useStyles();
  const {allcountrys, setcountry} = useContext(DataContext);
  const [state, setState] = useState(false);

  const HandleClick = e => {
    setcountry(e.target.textContent);
  }
  

  function renderRow(props) {
    const { index, style } = props;
    console.log('Render row ' + index)
    return (
      <div style={style}>
        <ListItem button onClick={HandleClick} >
          <ListItemAvatar>
              <Avatar variant='rounded' alt={`Bandera de ${allcountrys[index].country}`} src={allcountrys[index].countryInfo.flag}/>
            </ListItemAvatar>
          <ListItemText primary={`${allcountrys[index].country}`} /> 
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
      )
  }


  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const ListaCountrys = () => {
    console.log('ejecuto Lista')
    return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <AutoSizer disableWidth>
        {({height}) => (
          <FixedSizeList 
          height={400} 
          width={300} 
          itemSize={46} 
          itemCount={allcountrys.length}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
    )
  };


  return (
      <Fragment>
    <div className={classes.root}>
      <AppBar position="sticky"  style={{ position: "fixed" }}>
      <Container >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
          <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Coronavirus covid-19 &nbsp;&nbsp; <span role="img" aria-label="microbe">🦠</span>
          </Typography>
        </Toolbar>
        </Container>
      </AppBar>
    </div>
    <SwipeableDrawer
          anchor={"left"}
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          classes={{
            paper: classes.paper
          }}
        >
          <ListaCountrys/>
        </SwipeableDrawer>
    </Fragment>
  );
}