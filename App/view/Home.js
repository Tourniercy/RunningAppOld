import {AsyncStorage, Text, View,AppState} from 'react-native';
import React, {Component} from 'react';
import MapView, {Polyline} from "react-native-maps";
import { Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import CustomMaps from '../component/MapsView';

import * as geolib from 'geolib';

const STORAGE_KEY = ''+Math.random().toString(36).substring(7)+'';
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
            appState : '',
            location: {},
            lastLocation : {},
            movedLocation :{},
            dragged : false,
            distance: null,
            routeCoordinates : null,
            totalDistance : null,
        };
    }

    componentDidMount = async() => {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.findCurrentLocationAsync().then(() => {
            if (this.state.location)  {
                functionAsync();
            }
            async function functionAsync() {
                await Location.startLocationUpdatesAsync('GetLocation', {
                    accuracy: Location.Accuracy.Highest,

                });
            }
        });
    }
    _handleAppStateChange = async (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
        }
        // const dataFetch = await Home.getData(STORAGE_KEY);
        // this.setState({appState: nextAppState,routeCoordinates: dataFetch});
    };
    componentWillUnmount() {
    }
    findCurrentLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied'
            });
        }
        let location = await Location.getLastKnownPositionAsync();
        this.setState({location: location});
    };
    onUserLocationChange = async (region) => {
        let time = '';
        if (this.state.lastLocation.timestamp) {
            time = (region.nativeEvent.coordinate.timestamp/1000-this.state.lastLocation.timestamp/1000);
        } else {
            time = (region.nativeEvent.coordinate.timestamp/1000-this.state.location.timestamp/1000);
        }
        if (time >= 5) {
            const dataFetch = await Home.getData(STORAGE_KEY);
            this.setState({routeCoordinates: dataFetch});
            if (dataFetch) {
                let dataFetchParsed = JSON.parse(dataFetch);
                this.setState({lastLocation : dataFetchParsed[dataFetchParsed.length-1]});
            }
        }
    };

    onPanDrag = async (coordinate) => {
        coordinate = {}
        this.setState({dragged: true,movedLocation : coordinate});
        console.log(coordinate);
    };

    render() {
        let text = 'Waiting..';
        let latitude = 0;
        let longitude = 0;
        let routeCoordinates= [];

        if (this.state.error) {
            text = this.state.error;
        } else if (this.state.location.coords) {
            if (this.state.dragged !== true) {
                if (this.state.lastLocation.latitude === undefined) {
                    latitude = (this.state.location.coords.latitude);
                    longitude = (this.state.location.coords.longitude);
                } else {
                    latitude = (this.state.lastLocation.latitude);
                    longitude = (this.state.lastLocation.longitude);
                }
            } else {
                    latitude = (this.state.movedLocation.latitude);
                    longitude = (this.state.movedLocation.longitude);
            }
            if (this.state.routeCoordinates != null) {
                routeCoordinates = JSON.parse(this.state.routeCoordinates);
            }
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

                    onUserLocationChange={this.onUserLocationChange}
                    // onPanDrag={this.onPanDrag}
                >
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={4}
                    />
                </MapView>
                <View
                    style={{
                        position: 'absolute',//use absolute position to show button on top of the map
                        top: '80%', //for center align
                        alignSelf: 'center' //for align to right
                    }}
                >
                    <Button
                        buttonStyle={{backgroundColor:'#2C5077',width:120,height:50}}
                        title="Depart"
                        type="solid"
                        color="#2C5077"
                    />
                </View>

                <Button
                    buttonStyle={{backgroundColor:'#2C5077',width:120,height:50}}
                    title="Stopper"
                    type="solid"
                    color="#2C5077"
                    onPress={() => {
                        this.props.navigation.navigate('Inscription', {
                            Login: 'Cyril',
                            Password: 'TEST',
                        });
                    }}
                />
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
            const dataStorage = [{latitude:data.locations[data.locations.length-1].coords.latitude,longitude:data.locations[data.locations.length-1].coords.longitude,timestamp:data.locations[data.locations.length-1].timestamp}];
            // console.log('data : ',data.locations[data.locations.length-1]);
            const dataFetch = await Home.getData(STORAGE_KEY);
            if (dataFetch == null) {
                await Home.setData(STORAGE_KEY,JSON.stringify(dataStorage));
            } else {
                await Home.setData(STORAGE_KEY,JSON.stringify(JSON.parse(dataFetch).concat(dataStorage)));
            }
        }
    })
};