import React, { Component } from 'react';
import MapView, {Polyline} from "react-native-maps";

export default class CustomMaps extends Component {

    render() {
            return(
                <MapView
                    showsUserLocation={ true }
                    style={{
                        flex: 1
                    }}
                    region={{
                        latitude: this.props.latitude,
                        longitude: this.props.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02
                    }}

                    onUserLocationChange={this.onUserLocationChange}
                    // onPanDrag={this.onPanDrag}
                >
                    <Polyline
                        coordinates={this.props.routeCoordinates}
                        strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={4}
                    />
                </MapView>
            )
    }
}