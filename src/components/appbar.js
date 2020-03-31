import React , {Fragment } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {Container} from '@material-ui/core';
/*
import { createMuiTheme } from '@material-ui/core/styles';

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#534bae',
        main: '#1a237e',
        dark: '#000051',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff5533',
        main: '#e60000',
        dark: '#ab0000',
        contrastText: '#000',
      },
    },
  });
*/
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
}));

export default function SearchAppBar() {
  const classes = useStyles();


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
    </Fragment>
  );
}