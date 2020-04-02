import React , {useState , useEffect}from "react";
import Axios from 'axios';
import {Map, Marker, Popup, TileLayer } from 'react-leaflet';
import {Icon} from 'leaflet';
import { Typography, Grid}  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Phone, QueryBuilderOutlined, Room} from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        fontSize: '0.75rem',
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
        maxWidth: '80%',
    },
    patrocinio: {
        margin: '5% 0 0 0 !important',
        backgroundColor: '#098a91',
        borderRadius: '0 0 1vw 1vw',

    }, 
    patrociniotext: {
        color: '#fff',
        fontSize: '0.5rem',
        margin: '0 0 0 0 !important'
    }
});

const ollapopularimg = 'https://ollaspopulares.com/assets/img/logo.png'

export default function Mapa(){
    const classes = useStyles();
    const [activeplace, setactiveplace] = useState(null);
    const [ollaspopulares, setollaspopulares] = useState(null);


    useEffect(() => {
        const getollaspopulares = async () => {
            const url = 'https://ollaspopulares.com:9095/cooking_pot-service/cooking_pot?fbclid=IwAR3WDCUoTgh2lP4FuwqQaok15B5twXCPX5-79DDqBF1c9c3-yc1pCddsFCk';
            const dataollaspopulares = await Axios.get(url);
            setollaspopulares(dataollaspopulares.data);
        }
        getollaspopulares();
    },[]);

    if (ollaspopulares !== null ) {


        return (
            <Map center={[-34.901112, -56.164532]} zoom={11}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                /> 

                {ollaspopulares.map(olla => (
                    <Marker 
                    key={olla.ownerPhone}
                    position={[
                        olla.latitude,
                        olla.longitude
                    ]}
                    onclick={() => {setactiveplace(olla)}}
                    />
                ))}


                {activeplace && (
                <Popup
                    className={classes.root}
                    position={[
                        activeplace.latitude,
                        activeplace.longitude
                    ]}
                    onClose={() => {
                        setactiveplace(null);
                    }}
                >
                    <div>
                        <Typography variant="h4" className={classes.tittles} gutterBottom>
                            {activeplace.potName}
                        </Typography>
                        <Typography variant="h6" className={classes.subtittles} gutterBottom>
                            {activeplace.ownerName}
                        </Typography>
                        { activeplace.description !== '' ?  
                        <div> 
                            <Typography variant="body1" className={classes.beneficio} gutterBottom>
                                Beneficio:
                            </Typography>
                            <Typography variant="body1" className={classes.body} gutterBottom>
                                {activeplace.description}
                            </Typography>
                        </div> : null }
                        
                        {activeplace.address !== '' ? 
                        <div> 
                        <Typography variant="body1" className={classes.reciben} gutterBottom>
                            Direccion:
                        </Typography>
                        <Typography variant="body1" className={classes.body} gutterBottom>
                            {activeplace.address}
                        </Typography>
                        </div> 
                        : null }
                        { activeplace.ownerPhone !== '' ? 
                        <Grid container className={classes.contacto}>
                        <Phone fontSize="small"/>
                        <Typography variant="body2" className={classes.contactotext} gutterBottom>
                        {activeplace.ownerPhone}
                        </Typography>
                        </Grid>
                        : null}

                        {activeplace.daysOfService !== '' ? 
                        <Grid container className={classes.contacto} alignItems='center'>
                        <QueryBuilderOutlined fontSize="small"/>
                        <Typography variant="body2" className={classes.contactotext} gutterBottom>
                        {activeplace.daysOfService}
                        </Typography>
                        </Grid> 
                        : null
                        }

                        {activeplace.address !== '' ? 
                        <Grid container className={classes.contacto} alignItems='center'>
                        <Room fontSize="small"/>
                        <Typography variant="body2" className={classes.contactotext} gutterBottom>
                        {activeplace.address}
                        </Typography>
                        </Grid> 
                        : null
                        }


                        <Grid container className={classes.patrocinio} alignItems='center'>
                            <Typography variant="body2" className={classes.patrociniotext} gutterBottom>
                                Proporcionado por:
                            </Typography>
                            <img src={ollapopularimg} alt='Logo de ollas populares' className={classes.patrocinioimg}/>
                        </Grid>
                        
                    </div>
                </Popup>
            )}
                
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