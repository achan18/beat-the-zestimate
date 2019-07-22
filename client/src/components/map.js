import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MyMap extends React.Component {

    render() {
        if (!this.props.latLong.lat || !this.props.latLong.lng) {
            return null
        }
        return (
            <Map
                google={this.props.google}
                zoom={11}
                initialCenter={this.props.latLong}
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

export default GoogleApiWrapper({apiKey: 'AIzaSyCI-HS5B4EwhmmPlZPJmBXad5uZUjGOFHA'})(MyMap);