
import { Text, View } from 'react-native';
import React, { Component } from 'react';
import MapView from "react-native-maps";
import * as geolib from 'geolib';



export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            prevLatitude: null,
            prevLongitude: null,
            distance: null
        };
    }

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                if (this.state.prevLatitude) {
                    console.log(position.coords);
                    this.setState({
                        distance:  geolib.getDistance({latitude :this.state.prevLatitude, longitude : this.state.prevLongitude}, {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            }),
                        prevLatitude : position.coords.latitude,
                        prevLongitude : position.coords.longitude,
                    });
                    console.log(this.state.distance);
                } else {
                    this.setState({
                        prevLatitude : position.coords.latitude,
                        prevLongitude : position.coords.longitude,
                    })
                }

            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1},

        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    render() {
        let text = 'Waiting..';
        let latitude = 0;
        let longitude = 0;
        let distance = 0;
        if (this.state.error) {
            text = this.state.error;
        } else if (this.state.latitude) {
            latitude = (this.state.latitude);
            longitude = (this.state.longitude);
            distance = (this.state.distance);
        }
        return (
            <View style={{flex:1}}>
                <MapView
                    style={{
                        flex: 1
                    }}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02
                    }}
                >
                    <MapView.Marker
                        coordinate={{latitude: latitude,
                            longitude: longitude}}
                        title={"title"}
                        description={"description"}
                    />
                </MapView>
                <Text>{distance}</Text>
            </View>
        );
    }
}