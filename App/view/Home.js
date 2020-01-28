import {AsyncStorage, Text, View,AppState} from 'react-native';
import React, {Component} from 'react';
import MapView, {Polyline} from "react-native-maps";
import { Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as geolib from 'geolib';


const STORAGE_KEY = ''+Math.random().toString(36).substring(7)+''

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appState : '',
            location: {},
            distance: null,
            routeCoordinates : null,
            totalDistance : null,
        };
    }

    static setData = async (key,data) => {
        await AsyncStorage.setItem(key,data);
    };

    static getData = async (key) => {
        return await AsyncStorage.getItem(key);
    };

    componentDidMount = async() => {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.findCurrentLocationAsync().then(() => {
            if (this.state.location)  {
                functionAsync();
            }
            async function functionAsync() {
                await Location.startLocationUpdatesAsync('GetLocation', {
                    accuracy: Location.Accuracy.Balanced,
                    deferredUpdatesInterval : 5000,

                });
            }
        });
    }

    componentDidUpdate = async() => {
        const dataFetch = await Home.getData(STORAGE_KEY);
        if (dataFetch != null) {
            this.setState({routeCoordinates: dataFetch});
        }

    }

    onUserLocationChange = async () => {
        const dataFetch = await Home.getData(STORAGE_KEY);
        this.setState({routeCoordinates: dataFetch});
        if (dataFetch) {
            console.log(JSON.parse(dataFetch[dataFetch.length-1]));
        }
    }

    _handleAppStateChange = async (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
        }
        const dataFetch = await Home.getData(STORAGE_KEY);
        this.setState({appState: nextAppState,routeCoordinates: dataFetch});
    }

    // componentWillUnmount() {}

    findCurrentLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied'
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({location: location});
    }

    render() {

        let text = 'Waiting..';
        let latitude = 0;
        let longitude = 0;
        let routeCoordinates= [];

        if (this.state.error) {
            text = this.state.error;
        }
        else if (this.state.location.coords) {

            latitude = (this.state.location.coords.latitude);
            longitude = (this.state.location.coords.longitude);

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
                >
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={6}
                    />
                </MapView>
                <Button
                    buttonStyle={{backgroundColor:'#2C5077',width:120,height:50}}
                    title="Lancer"
                    type="solid"
                    color="#2C5077"
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