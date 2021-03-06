import React , {useState , useEffect}from "react";
import Axios from 'axios';
import {Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Typography, Grid}  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Phone, QueryBuilderOutlined, Room} from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import firebase from '../firebase.js';


const useStyles = makeStyles(theme => ({
    root: {
        fontSize: '0.55rem',
        maxWidth: '80vw',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1rem',
            maxWidth: '90vw',
          },
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
        maxWidth: '50%',
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
    }
}));

const ollapopularimg = 'https://ollaspopulares.com/assets/img/logo.png';
const acaestamosuyimg = 'http://acaestamos.uy/wp-content/uploads/2020/04/Logo_ak.jpg';

export default function Mapa(){
    const classes = useStyles();
    const [userGeolocation, setuserGeolocation] = useState([-34.901112, -56.164532])
    const [ollaspopulares, setollaspopulares] = useState(null);
    const [acaestamosuy, setacaestamosuy] = useState(null);
    const [dataFirebase, setdataFirebase] = useState(null);
    const [activeplaceolla, setactiveplaceolla] = useState(null);
    const [activeplaceaca, setactiveplaceaca] = useState(null);
    const [activeplaceFire, setactiveplaceFire] = useState(null);

    useEffect(() => {
        const getollaspopulares = async () => {
            const url = 'https://ollapopular.uy/index.php/wp-json/geodir/v2/markers/?post_type=gd_place';
            const dataollaspopulares = await Axios.get(url);
            setollaspopulares(dataollaspopulares.data);
        }
        getollaspopulares();

        const getacaestamosuy = async () => {
            const url = 'https://uy.mapa.frenalacurva.net/api/v3/posts/geojson?has_location=mapped&limit=200&offset=0&order=desc&order_unlocked_on_top=true&orderby=created&source%5B%5D=sms&source%5B%5D=twitter&source%5B%5D=web&source%5B%5D=email&status%5B%5D=published&status%5B%5D=draft';
            const dataacaestamos = await Axios.get(url);
            setacaestamosuy(dataacaestamos.data.features);
        }
        getacaestamosuy();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
          }
          function getPosition(position) {
            setuserGeolocation([position.coords.latitude, position.coords.longitude]);
          }

          const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("Puntos").get()
            const dataformated = ( data.docs.map( (p, index) => [{id: data.docs[index].id, data: p.data()}]))
            setdataFirebase(dataformated[0]);
          }
          fetchData()
    
    },[]);


    if (/*ollaspopulares !== null && */ acaestamosuy !== null && dataFirebase !== null) {
        return (
            <Map center={userGeolocation} zoom={12} >
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                /> 
                <MarkerClusterGroup
                    spiderLegPolylineOptions={{
                        weight: 0,
                        opacity: 0,
                    }}
                >

                {dataFirebase !== undefined ?
                dataFirebase.map(punto => (
                    <Marker
                    key={punto.id}
                    position={[
                        punto.data.geoloc[0],
                        punto.data.geoloc[1]
                    ]}
                    onclick={() => setactiveplaceFire(punto)}
                    />
                )) :
                null} 
                

                {/* ollaspopulares.map(olla => (
                    olla.potName !== 'Test' ?
                    <Marker 
                    key={uuidv4()}
                    position={[
                        olla.latitude,
                        olla.longitude
                    ]}
                    onclick={() => {setactiveplaceolla(olla)}}
                    /> 
                    : null 
                )) */}

                {acaestamosuy.map(beneficio => (
                    <Marker
                    key={uuidv4()}
                    position={[
                        beneficio.geometry.geometries[0].coordinates[1], 
                        beneficio.geometry.geometries[0].coordinates[0]
                    ]}
                    onclick={() => {setactiveplaceaca(beneficio)}}
                    />
                ))}

                {activeplaceolla && (
                <Popup
                    className={classes.root}
                    position={[
                        activeplaceolla.latitude,
                        activeplaceolla.longitude
                    ]}
                    onClose={() => {
                        setactiveplaceolla(null);
                    }}
                >
                    <div>
                        <Typography variant="h4" className={classes.tittles} gutterBottom>
                            {activeplaceolla.potName}
                        </Typography>
                        <Typography variant="h6" className={classes.subtittles} gutterBottom>
                            {activeplaceolla.ownerName}
                        </Typography>
                        { activeplaceolla.description !== '' ?  
                        <div> 
                            <Typography variant="body1" className={classes.beneficio} gutterBottom>
                                Beneficio:
                            </Typography>
                            <Typography variant="body1" className={classes.body} gutterBottom>
                                {activeplaceolla.description}
                            </Typography>
                        </div> : null }
                        
                        {activeplaceolla.address !== '' ? 
                        <div> 
                        <Typography variant="body1" className={classes.reciben} gutterBottom>
                            Direccion:
                        </Typography>
                        <Typography variant="body1" className={classes.body} gutterBottom>
                            {activeplaceolla.address}
                        </Typography>
                        </div> 
                        : null }
                        { activeplaceolla.ownerPhone !== '' ? 
                        <Grid container className={classes.contacto}>
                        <Phone fontSize="small"/>
                        <Typography variant="body2" className={classes.contactotext} gutterBottom>
                        {activeplaceolla.ownerPhone}
                        </Typography>
                        </Grid>
                        : null}

                        {activeplaceolla.daysOfService !== '' ? 
                        <Grid container className={classes.contacto} alignItems='center'>
                        <QueryBuilderOutlined fontSize="small"/>
                        <Typography variant="body2" className={classes.contactotext} gutterBottom>
                        {activeplaceolla.daysOfService}
                        </Typography>
                        </Grid> 
                        : null
                        }

                        {activeplaceolla.address !== '' ? 
                        <Grid container className={classes.contacto} alignItems='center'>
                        <Room fontSize="small"/>
                        <Typography variant="body2" className={classes.contactotext} gutterBottom>
                        {activeplaceolla.address}
                        </Typography>
                        </Grid> 
                        : null
                        }


                        <Grid container className={classes.patrocinio} alignItems='center' style={{backgroundColor: '#098a91'}}>
                            <Typography variant="body2" className={classes.patrociniotext} gutterBottom>
                                Proporcionado por:
                            </Typography>
                            <img src={ollapopularimg} alt='Logo de ollas populares' className={classes.patrocinioimg}/>
                        </Grid>
                        
                    </div>
                </Popup>
            )}

                {activeplaceaca && (
                <Popup
                    className={classes.root}
                    position={[
                        activeplaceaca.geometry.geometries[0].coordinates[1],
                        activeplaceaca.geometry.geometries[0].coordinates[0]
                    ]}
                    onClose={() => {
                        setactiveplaceaca(null);
                    }}
                >
                        <Typography variant="h4" className={classes.tittles} gutterBottom>
                            {activeplaceaca.properties.title}
                        </Typography>
                        <Typography variant="body1" className={classes.beneficio} gutterBottom>
                            Descripcion:
                        </Typography>
                        <Typography variant="body1" className={classes.body} gutterBottom>
                            {activeplaceaca.properties.description}
                        </Typography>
                        <Grid container className={classes.patrocinio} alignItems='center' style={{backgroundColor: '#811815'}}>
                            <Typography variant="body2" className={classes.patrociniotext} gutterBottom>
                                Proporcionado por:
                            </Typography>
                            <img src={acaestamosuyimg} alt='Logo de AcaEstamosuy' className={classes.patrocinioimg}/>
                        </Grid>
                </Popup>)}
                

                {activeplaceFire && (
                <Popup
                    className={classes.root}
                    position={[
                        activeplaceFire.data.geoloc[0],
                        activeplaceFire.data.geoloc[1]
                    ]}
                    onClose={() => {
                        setactiveplaceFire(null);
                    }}
                >
                    <div>
                        <Typography variant="h4" className={classes.tittles} gutterBottom>
                            {activeplaceFire.data.lugar}
                        </Typography>  
                        <div> 
                            <Typography variant="body1" className={classes.beneficio} gutterBottom>
                                Beneficio:
                            </Typography>
                            <Typography variant="body1" className={classes.body} gutterBottom>
                                {activeplaceFire.data.beneficio}
                            </Typography>
                        </div>
                        
                        <div> 
                        <Typography variant="body1" className={classes.reciben} gutterBottom>
                            Reciben:
                        </Typography>
                        <Typography variant="body1" className={classes.body} gutterBottom>
                            {activeplaceFire.data.recibe}
                        </Typography>
                        </div> 
                        <Grid container className={classes.contacto}>
                        <Phone fontSize="small"/>
                        <Typography variant="body2" className={classes.contactotext} gutterBottom>
                        {activeplaceFire.data.direccion}
                        </Typography>
                        </Grid>

                        <Grid container className={classes.contacto} alignItems='center'>
                        <QueryBuilderOutlined fontSize="small"/>
                        <Typography variant="body2" className={classes.contactotext} gutterBottom>
                        {activeplaceFire.data.horario}
                        </Typography>
                        </Grid> 

                        <Grid container className={classes.contacto} alignItems='center'>
                        <Room fontSize="small"/>
                        <Typography variant="body2" className={classes.contactotext} gutterBottom>
                        {activeplaceFire.data.direccion}
                        </Typography>
                        </Grid> 

                        {/* si tiene imagen 
                        <Grid container className={classes.patrocinio} alignItems='center' style={{backgroundColor: '#098a91'}}>
                            <Typography variant="body2" className={classes.patrociniotext} gutterBottom>
                                Proporcionado por:
                            </Typography>
                            <img src={ollapopularimg} alt='Logo de ollas populares' className={classes.patrocinioimg}/>
                        </Grid>
                        */}
                        
                    </div>
                </Popup>
            )}

                </MarkerClusterGroup>
            </Map>
        )
    } else {
        return(
            <Map center={[-34.901112, -56.164532]} zoom={11}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>
        );
    }
}