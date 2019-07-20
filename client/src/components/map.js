import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MyMap extends React.Component {

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={11}
                style={mapStyles}
                center={this.props.latLong}
                streetViewControl={false}
                mapTypeControl={false}
                fullscreenControl={false}
                zoomControl={false}
            >
                <Marker position={this.props.latLong} />
            </Map>
        );
      }
}

const mapStyles = {
    width: 'auto',
    height: '300px',
};

export default GoogleApiWrapper({apiKey: 'AIzaSyCI-HS5B4EwhmmPlZPJmBXad5uZUjGOFHA'})(MyMap);