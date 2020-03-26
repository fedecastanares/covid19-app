import React , {Fragment , useContext} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';



  const useStyles = makeStyles(theme => ({ 
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
    fontSize: '1.2rem',
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
            Coronavirus covid-19 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🦠
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    </Fragment>
  );
}