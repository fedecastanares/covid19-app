import React, {useState, useContext} from 'react';
import {DataContext} from '../context/dataContext.js'
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField, Grid, Container, Typography, Button } from '@material-ui/core/';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import {Edit, LocationOn, Done, CloudUpload} from '@material-ui/icons/';
import StepConnector from '@material-ui/core/StepConnector';
import {Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { GoogleLogin } from 'react-google-login';
import {Phone, QueryBuilderOutlined, Room} from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';

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
  const { active, completed} = props;

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
        'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(40,53,147,1) 35%, rgba(26,35,126,1) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(40,53,147,1) 35%, rgba(26,35,126,1) 100%)',
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
    background: 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(204,204,204,1) 30%, rgba(204,204,204,0.20211834733893552) 68%)',
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
      'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(40,53,147,1) 35%, rgba(26,35,126,1) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(40,53,147,1) 35%, rgba(26,35,126,1) 100%)',
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
    backgroundColor: '#f9f9f9',
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
    backgroundColor: '#f9f9f9',
    borderRadius: '1vw',
    paddingTop: '8vh',
    background: 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(26,35,126,1) 20%, rgba(40,53,147,1) 30%, rgba(40,53,147,0) 60%)',
  },
  forminput: {
    backgroundColor: '#3f51b5',
  },
  container: {
    paddingTop: '5%',
    marginTop: '5%'
  },
  label: {
    color: '#fff'
  },
  tittles: {
      fontSize: '0.8rem',
      fontWeight: 'bold'
  },
  body: {
      fontSize: '0.8rem',
      color: 'grey',
      margin: '0 !important',
      minWidth: '65%'
  },
  subtittles: {
      color: 'darkengrey',
      fontSize: '0.65rem'

  },
  img: {
      display: 'block',
      maxWidth: "75%",
      marginLeft: 'auto',
      marginRight: 'auto',
  }, 
  beneficio: {
      color: 'green',
      fontSize: '0.65rem',
      margin: '5% 0 0 0 !important',
      minWidth: '65%'

  },
  reciben: {
      color: 'orange',
      fontSize: '0.65rem',
      margin: '3% 0 0 0 !important',
  },
  contacto: {
      marginTop: '5%'
  },
  contactotext: {
      fontSize: '0.7rem',
      color: 'grey',
      margin: '0 0 0 3% !important'
  },
  patrocinioimg: {
      minWidth: '30%',
      maxWidth: '40%',
      minHeight: '35%',
      maxHeight: '60%'
  },
  patrocinio: {
      margin: '5% 0 0 0 !important',
      padding: 10,
      borderRadius: '0 0 1vw 1vw',
      justifyContent: 'space-around'
  }, 
  patrociniotext: {
      color: '#fff',
      fontSize: '0.5rem',
      margin: '0 0 0 0 !important'
  },
  alerta: {
    padding: '24px',
  },
  alertaTittle: {
    fontFamily: 'Quicksand',
    fontSize: '1.25rem'
  },
  formcontainer: {
    marginTop: '2vh', 
    [theme.breakpoints.up('sm')]: {
      padding: '10vh'
  }
  },
  necesario: {
    fontSize: '0.75rem',
    color: 'grey',
    marginTop: '1vh'
  },
  bodyalerta: {
    marginTop: '5vh',
    marginBottom: '5vh',
    [theme.breakpoints.up('sm')]: {
      marginTop: '10vh',
      marginBottom: '10vh',
    }
  }
}));

function getSteps() {
  return ['Ingresar datos', 'Marcar en el mapa', 'Confirmar'];
}


export default function CustomizedSteppers(props) {
  const { activeStep, formControl, setFormControl  } = props;
  const {email, setemail} = useContext(DataContext);
  const classes = useStyles();
  const steps = getSteps();



  const [lugar, setLugar] = useState('');
  const [contacto, setContacto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [beneficio, setBeneficio] = useState('');
  const [horario, setHorario] = useState('');
  const [recibe, setRecibe] = useState('');
  const [vinculo, setVinculo] = useState('');

  const [currentPos, setcurrentPos] = useState(null);
  const HandleClick = event => {
    setcurrentPos([event.latlng.lat, event.latlng.lng]) ;
}

  
  function Formulario (step) {

    const responseGoogle = (response) => {
      setemail(response.profileObj.email);
    }
    
    const HandleChange = e => {

      switch(e.target.id) {
        case 'Lugar': setLugar(e.target.value);
        break;
        case 'Contacto': setContacto(e.target.value);
        break;
        case 'Direccion': setDireccion(e.target.value);
        break;
        case 'Beneficio': setBeneficio(e.target.value);
        break;
        case 'Horario': setHorario(e.target.value);
        break;
        case 'Recibe': setRecibe(e.target.value);
        break;
        case 'Vinculo': setVinculo(e.target.value);
        break;
      }
    }

    function createData (email, lugar, contacto, direccion, beneficio, horario, recibe, imagen) {
      const id = uuidv4();
      return { 
        'id': id,
        'email': email,
        'lugar': lugar,
        'contacto': contacto,
        'direccion': direccion,
        'beneficio': beneficio,
        'horario': horario,
        'recibe': recibe,
        'imgen': imagen,
        }
    }

    
    switch (step) {
      case 0: 
      // agregar email !== '' && luego de pruebas
      if ( email !== '' && lugar !== '' &&  contacto !== '' &&  direccion !== '' &&  beneficio !== '' &&  horario !== '' &&  recibe !== '' ) {
        setFormControl(false);
      } else {
        setFormControl(true);
      }
      return (
        <form  noValidate autoComplete="off">
          <Container>
          <Grid container
            className={classes.container}>
              <Grid container justify='center'>
                <GoogleLogin
                    clientId="308239159030-mlj6n5skslr27r0s56sjindfof2g6mts.apps.googleusercontent.com"
                    buttonText={email === '' ? 'Login' : 'Logeado'}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
              </Grid>
              <Grid container justify='center'>
                <Typography variant="body2" className={classes.necesario}>
                  Guardaremos tu email
                </Typography>
              </Grid>
                <Grid container 
                spacing={2}
                alignContent='center'
                alignItems='center'
                justify='center'
                className={classes.formcontainer}
                >
                  <Grid item sm={4}>
                    <Grid container spacing={2} justify='space-between' alignItems='center' alignItems='center' >
                      <Grid item xs={6}>
                        <TextField  label="Lugar" id='Lugar' value={lugar} variant="outlined" color='primary' size='small' fullWidth onChange={HandleChange}/>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="Contacto" id="Contacto" value={contacto} variant="outlined" color='primary' size='small' fullWidth  onChange={HandleChange} />
                      </Grid>
                    </Grid>
                    <TextField  label="Direccion" id="Direccion" value={direccion} variant="outlined" color='primary' size='small' fullWidth onChange={HandleChange} style={{marginTop: '1vh'}}/>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField label="Beneficio" id="Beneficio" value={beneficio} variant="outlined" color='primary' size='small' fullWidth multiline rows="4" onChange={HandleChange}/>
                  </Grid>
                  <Grid item sm={4}>
                    <TextField  label="Recibe" id="Recibe" value={recibe} variant="outlined" color='primary' size='small' fullWidth onChange={HandleChange}/>
                    <Grid container spacing={2} justify='space-between' alignItems='center' alignItems='center' >
                      <Grid item xs={6}>
                        <TextField  label="Horario" id="Horario" value={horario} variant="outlined" color='primary' size='small' fullWidth onChange={HandleChange} style={{marginTop: '2vh'}}/>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container justify='center' alignContent='center' alignItems='center' style={{marginTop: '2vh'}}>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CloudUpload />}
                            fullWidth
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
              </Grid>
          </Grid>
          </Container>
        </form>
      );
      case 1: 
      if (currentPos !== null) {
        setFormControl(false)
      } else {
        setFormControl(true)
      }
      return (
          <Map center={[-34.901112, -56.164532]} zoom={12} onclick={HandleClick} className='mapForm'>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            /> 
            {currentPos !== null ? <Marker position={currentPos} /> : null}
          </Map>
      );
      case 2: return (
        <Map center={currentPos} zoom={15} onclick={HandleClick} className='mapForm'>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            /> 
            <Popup
                    className={classes.root}
                    position={currentPos}
                >
                   <div>
                        <Typography variant="h4" className={classes.tittles} gutterBottom>
                            {lugar}
                        </Typography>
                        <Typography variant="body1" className={classes.beneficio} gutterBottom>
                          Beneficio:
                        </Typography>
                        <Typography variant="body1" className={classes.body} gutterBottom>
                          {beneficio}
                        </Typography>
                        <Typography variant="body1" className={classes.reciben} gutterBottom>
                            Reciben:
                        </Typography>
                        <Typography variant="body1" className={classes.body} gutterBottom>
                            {recibe}
                        </Typography>
                          <Grid container className={classes.contacto}>
                            <Phone fontSize="small"/>
                            <Typography variant="body2" className={classes.contactotext} gutterBottom>
                            {contacto}
                          </Typography>
                        </Grid>
                          <Grid container className={classes.contacto} alignItems='center'>
                            <QueryBuilderOutlined fontSize="small"/>
                            <Typography variant="body2" className={classes.contactotext} gutterBottom>
                            {horario}
                          </Typography>
                        </Grid> 
                        <Grid container className={classes.contacto} alignItems='center'>
                          <Room fontSize="small"/>
                          <Typography variant="body2" className={classes.contactotext} gutterBottom>
                          {direccion}
                          </Typography>
                        </Grid> 
                        {vinculo !== '' ? 
                        <Grid container className={classes.patrocinio} alignItems='center' style={{backgroundColor: '#3f51b5'}}>
                            <Typography variant="body2" className={classes.patrociniotext} gutterBottom>
                                Proporcionado por:
                            </Typography>
                            <img src={vinculo} alt={`Logo de ${lugar}`} className={classes.patrocinioimg}/>
                        </Grid> :
                        null}
                    </div>
            </Popup>
          </Map>
      );
      case 3: return (
        <Grid container className={classes.alerta} alignContent='center' alignItems='center' justify='center'>
          <Alert severity="success" variant='filled' className={classes.bodyalerta}>
            <AlertTitle className={classes.alertaTittle}>Guardado</AlertTitle>
            <Grid container>
              <Grid item sm={6}>
                <p style={{fontSize: '0.975rem', fontFamily: 'Quicksand'}}>Gracias por colaborar</p>
              </Grid>
              <Grid item sm={6}> 
                <p><strong style={{fontSize: '0.775rem', padding: 0, fontFamily: 'Quicksand',}}>- puedes registrar todos los lugares que quieras!</strong></p>
              </Grid>
            </Grid>
          </Alert>
        </Grid>
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
            <StepLabel StepIconComponent={ColorlibStepIcon} className={classes.label}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}