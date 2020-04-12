import React , {Fragment, useState, useContext } from 'react';
import {DataContext} from '../context/dataContext.js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, List, ListItem,  ListItemText, Divider, SwipeableDrawer,ListItemAvatar, Avatar} from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';

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
  titleDrawer: {
    padding: '3vh'
  }
}));


export default function SearchAppBar() {
  const classes = useStyles();
  const {allcountrys, setcountry} = useContext(DataContext);
  const [state, setState] = useState(false);

  const HandleClick = e => {
    setcountry(e.target.textContent);
  }
  
  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  function renderRow(props) {
    const { index, style } = props;
    
    return (
      <Fragment>
        <ListItem button style={style} key={index} onClick={HandleClick}>
          <ListItemAvatar>
              <Avatar variant='rounded' alt={`Bandera de ${allcountrys[index].country}`} src={allcountrys[index].countryInfo.flag}/>
            </ListItemAvatar>
          <ListItemText primary={`${allcountrys[index].country}`} /> 
        </ListItem>
        <Divider variant="inset" component="li" />
      </Fragment>
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

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
      <FixedSizeList height={600}  itemSize={46} itemCount={allcountrys.length}>
        {renderRow}
      </FixedSizeList>
      </List>
    </div>
  );


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
          <Typography variant='h6' className={classes.titleDrawer}>
            Cambia de Pais
          </Typography>
          {list()}
        </SwipeableDrawer>
    </Fragment>
  );
}