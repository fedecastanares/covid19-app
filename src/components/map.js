import React , {useState}from "react";
import {Map, Marker, Popup, TileLayer } from 'react-leaflet';
import {Icon} from 'leaflet';
import * as marksData from '../data/marks.json';
import { Typography, Grid}  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Phone, QueryBuilderOutlined} from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        fontSize: '0.75rem',
    },
    tittles: {
        fontSize: '1rem',
        fontWeight: 'bold'
    },
    body: {
        fontSize: '1rem',
        color: 'grey',
        margin: '0 !important'
    },
    subtittles: {
        color: 'darkengrey',
        fontSize: '0.75rem'

    },
    img: {
        display: 'block',
        maxWidth: "75%",
        marginLeft: 'auto',
        marginRight: 'auto'
    }, 
    beneficio: {
        color: 'green',
        fontSize: '0.75rem',
        margin: '5% 0 0 0 !important',

    },
    reciben: {
        color: 'orange',
        fontSize: '0.75rem',
        margin: '3% 0 0 0 !important',
    },
    contacto: {
        marginTop: '5%'
    },
    contactotext: {
        fontSize: '1rem',
        color: 'grey',
        margin: '0 0 0 5% !important'
    }
});

export default function Mapa(){
    const classes = useStyles();
    const [activeplace, setactiveplace] = useState(null);
    const data = marksData[0];

    return (
        <Map center={[-34.901112, -56.164532]} zoom={11}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            /> 

            {data.features.map(place => (
                <Marker 
                key={place.properties.id}
                position={[
                    place.geometry.coordinates[1],
                    place.geometry.coordinates[0]
                ]}
                onclick={() => {setactiveplace(place)}}
                />
            ))}

            {activeplace && (
                <Popup
                    className={classes.root}
                    position={[
                        activeplace.geometry.coordinates[1],
                        activeplace.geometry.coordinates[0]
                    ]}
                    onClose={() => {
                        setactiveplace(null);
                    }}
                >
                    <div>
                        { activeplace.properties.lugarimg !== '' ? 
                        <img className={classes.img} src={activeplace.properties.lugarimg} alt={`Foto de ${activeplace.properties.lugar}`} /> : 
                        null }
                        <Typography variant="h4" className={classes.tittles} gutterBottom>
                            {activeplace.properties.lugar}
                        </Typography>
                        <Typography variant="h6" className={classes.subtittles} gutterBottom>
                            {activeplace.properties.sponsor}
                        </Typography>
                        { activeplace.properties.beneficio !== '' ?  
                        <div> 
                            <Typography variant="body1" className={classes.beneficio} gutterBottom>
                                Beneficio:
                            </Typography>
                            <Typography variant="body1" className={classes.body} gutterBottom>
                                {activeplace.properties.beneficio}
                            </Typography>
                        </div> : null }
                        
                        {activeplace.properties.reciben !== '' ? 
                        <div> 
                        <Typography variant="body1" className={classes.reciben} gutterBottom>
                            Reciben:
                        </Typography>
                        <Typography variant="body1" className={classes.body} gutterBottom>
                            {activeplace.properties.reciben}
                        </Typography>
                        </div> 
                        : null }
                        { activeplace.properties.contacto !== '' ? 
                        <Grid container className={classes.contacto}>
                        <Phone/>
                        <Typography variant="body2" className={classes.contactotext} gutterBottom>
                        {activeplace.properties.contacto}
                        </Typography>
                        </Grid>
                        : null}

                        {activeplace.properties.horario !== '' ? 
                        <Grid container className={classes.contacto}>
                        <QueryBuilderOutlined/>
                        <Typography variant="body2" className={classes.contactotext} gutterBottom>
                        {activeplace.properties.horario}
                        </Typography>
                        </Grid> 
                        : null
                        }
                        
                    </div>
                </Popup>
            )}
            
        </Map>
    )
}