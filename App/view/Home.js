import {AsyncStorage, Text, View,AppState} from 'react-native';
import React, {Component} from 'react';
import MapView, {Polyline} from "react-native-maps";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as geolib from 'geolib';


const STORAGE_KEY = ''+Math.random().toString(36).substring(7)+''
export default class Home extends Component {
    static setData = async (key,data) => {
        await AsyncStorage.setItem(key,data);
    };
    static getData = async (key) => {
        return await AsyncStorage.getItem(key);
    };



    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            prevLatitude: null,
            prevLongitude: null,
            location: null,
            distance: null,
            routeCoordinates : null,
            totalDistance : null,
            coordinate: ({
                latitude: null,
                longitude: null
            }),
            appState: AppState.currentState,
        };
    }

    componentDidMount = async() => {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.findCurrentLocationAsync().then(() => {
            if (this.state.location)  {
                functionAsync();
                this.watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        this.setState({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            error: null,
                        });
                        if (this.state.prevLatitude)  {
                            this.setState({
                                distance:  geolib.getDistance(
                                    { latitude: position.coords.latitude, longitude: position.coords.longitude },
                                    { latitude: this.state.prevLatitude, longitude: this.state.prevLongitude }
                                ),
                                prevLatitude : position.coords.latitude,
                                prevLongitude : position.coords.longitude,
                                totalDistance : geolib.getDistance(
                                    { latitude: position.coords.latitude, longitude: position.coords.longitude },
                                    { latitude: this.state.prevLatitude, longitude: this.state.prevLongitude }
                                ) + this.state.totalDistance,
                                routeCoordinates: this.state.routeCoordinates.concat([{latitude: position.coords.latitude, longitude: position.coords.longitude}]),
                            });
                        } else {
                            this.setState({
                                prevLatitude : this.state.latitude,
                                prevLongitude : this.state.longitude,
                                distance:  geolib.getDistance(
                                    { latitude: position.coords.latitude, longitude: position.coords.longitude },
                                    { latitude: position.coords.latitude, longitude: position.coords.longitude }
                                ),
                                totalDistance : geolib.getDistance(
                                    { latitude: position.coords.latitude, longitude: position.coords.longitude },
                                    { latitude: position.coords.latitude, longitude: position.coords.longitude }
                                ),
                                routeCoordinates: ([{latitude: position.coords.latitude, longitude: position.coords.longitude}]),

                            });
                        }

                    },
                    (error) => this.setState({ error: error.message }),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1},

                );
            }
            async function functionAsync() {
                await Location.startLocationUpdatesAsync('GetLocation', {
                    accuracy: Location.Accuracy.Balanced,
                });
            }
        });
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }
    findCurrentLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied'
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        // console.log(location);
        this.setState({ location });


    };
    _handleAppStateChange = async (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
        }
        const dataFetch = await Home.getData(STORAGE_KEY);
        this.setState({appState: nextAppState,routeCoordinatesLast: dataFetch});
    };
    render() {
        let text = 'Waiting..';
        let latitude = 0;
        let longitude = 0;
        let distance = 0;
        let totalDistance = 0;
        let routeCoordinates= [];
        let name = (this.state.name);

        if (this.state.error) {
            text = this.state.error;
        } else if (this.state.latitude) {
            latitude = (this.state.latitude);
            longitude = (this.state.longitude);
            distance = (this.state.distance);
            totalDistance = (this.state.totalDistance);
            routeCoordinates = JSON.parse(this.state.routeCoordinatesLast);
            console.log('routeCoordinates',routeCoordinates);

        }
        return (
            <View style={{flex:1}}>
                <MapView
                    showsUserLocation={ true }
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
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={6}
                    />
                </MapView>


                <Text>{distance}</Text>
            </View>
        );
    }
}
if (!TaskManager.isTaskDefined('GetLocation')) {
    TaskManager.defineTask('GetLocation', async({data, error}) => {
        if (error) {
            // Error occurred - check `error.message` for more details.
            return;
        }
        if (data) {
            const dataStorage = [{latitude:data.locations[0].coords.latitude,longitude:data.locations[0].coords.longitude }];
            const dataFetch = await Home.getData(STORAGE_KEY);
            if (dataFetch == null) {
                await Home.setData(STORAGE_KEY,JSON.stringify(dataStorage));
            } else {
                await Home.setData(STORAGE_KEY,JSON.stringify(JSON.parse(dataFetch).concat(dataStorage)));
            }
        }
    })
};