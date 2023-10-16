import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import { Paper } from '@mui/material';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Loader from 'components/Loader';
import Leyenda from './Leyenda';
import config from 'config';

import MapCustomStyles from './map_style.json';

const styles = {
    mapContainerStyle: {
        width: '100%',
        height: '100%',
        borderRadius: '12px'
    },
    containerLoader: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

const MapComponent = ({ currentCenter, zoom, onLoad, leyenda, children }) => {
    const latitud = currentCenter.lat;
    const longitud = currentCenter.lng;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: config.google_maps.apiKey
    });

    const center = useMemo(() => ({ lat: latitud, lng: longitud }), [latitud, longitud]);

    return isLoaded ? (
        <GoogleMap
            options={{ styles: MapCustomStyles, mapTypeControl: false, streetViewControl: false }}
            mapContainerStyle={styles.mapContainerStyle}
            center={center}
            zoom={zoom}
            onLoad={onLoad}
        >
            {leyenda.length > 0 && <Leyenda items={leyenda} />}
            {children}
        </GoogleMap>
    ) : (
        <Paper style={styles.containerLoader}>
            <Loader />
        </Paper>
    );
};

MapComponent.defaultProps = {
    zoom: 14,
    leyenda: [],
    currentCenter: {
        lat: -12.0479029,
        lng: -77.0407693
    }
};

MapComponent.propTypes = {
    zoom: PropTypes.number,
    children: PropTypes.element,
    onLoad: PropTypes.func,
    leyenda: PropTypes.array,
    currentCenter: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    })
};

export default memo(MapComponent);
