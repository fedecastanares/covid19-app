import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField, Grid, Container } from '@material-ui/core/';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import {Edit, LocationOn, Done} from '@material-ui/icons/';
import StepConnector from '@material-ui/core/StepConnector';
import {Map, TileLayer, Marker } from 'react-leaflet';



const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient(336deg, rgba(2,0,36,1) 0%, rgba(40,53,147,1) 35%, rgba(26,35,126,1) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient(336deg, rgba(2,0,36,1) 0%, rgba(40,53,147,1) 35%, rgba(26,35,126,1) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient(336deg, rgba(2,0,36,1) 0%, rgba(40,53,147,1) 35%, rgba(26,35,126,1) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient(336deg, rgba(2,0,36,1) 0%, rgba(40,53,147,1) 35%, rgba(26,35,126,1) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <Edit />,
    2: <LocationOn />,
    3: <Done />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#3f51b5',
    borderRadius: '1vw',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  papper: {
    backgroundColor: '#3f51b5',
    borderRadius: '1vw',

  },
  forminput: {
    backgroundColor: '#e8eaf6',
  },
  container: {
    paddingTop: '5%',
    marginTop: '5%'
  }
}));

function getSteps() {
  return ['Ingresar datos', 'Marcar Punto', 'Confirmar'];
}


export default function CustomizedSteppers(props) {
  const { activeStep } = props;
  const classes = useStyles();
  const steps = getSteps();

  const [currentPos, setcurrentPos] = useState(null);
  const HandleClick = event => {
    setcurrentPos([event.latlng.lat, event.latlng.lng]) ;
}

  
  function Formulario (step) {
    switch (step) {
      case 0: return (
        <form  noValidate autoComplete="off">
          <Container>
          <Grid container
            spacing={2}
            alignContent='center'
            alignItems='center'
            justify='center'
            className={classes.container}>
              <Grid item >
                <TextField  label="Lugar" variant="outlined" color='secondary' size='small' />
              </Grid>
              <Grid item >
                <TextField label="Beneficio" variant="outlined" color='secondary' size='small' />
              </Grid>
              <Grid item >
                <TextField  label="Recibe" variant="outlined" color='secondary' size='small' />
              </Grid>
              <Grid item >
                <TextField label="Contacto" variant="outlined" color='secondary' size='small' />
              </Grid>
              <Grid item >
                <TextField  label="Horario" variant="outlined" color='secondary' size='small' />
              </Grid>
              <Grid item>
                <TextField  label="Direccion" variant="outlined" color='secondary' size='small' />
              </Grid>
              <Grid item >
                <TextField  label="Vinculo a imagen" variant="outlined" color='secondary' size='small' />
              </Grid>
          </Grid>
          </Container>
        </form>
      );
      case 1: return (
          <Map center={[-34.901112, -56.164532]} zoom={12} onclick={HandleClick} id='mapForm'>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            /> 
            {currentPos !== null ? <Marker position={currentPos} /> : null}
          </Map>
      );
      case 2: return (
      <h1>Mostrar para confirmar</h1>
      );
      case 3: return (
      <h1>Mostrar confirmado</h1>
      );
      default: return null;
    }
    
  }

  return (
    <div className={classes.root}>
      {Formulario(activeStep)}
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} className={classes.papper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}