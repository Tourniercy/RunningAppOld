import {AsyncStorage, Text, View,AppState,Image} from 'react-native';
import React, {Component} from 'react';
import MapView, {Polyline,Marker} from "react-native-maps";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Stopwatch } from 'react-native-stopwatch-timer';


import * as geolib from 'geolib';

const STORAGE_KEY_COORDINATES = 'COORDINATES';
const STORAGE_KEY_STATS = 'STATS';

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
            timestampStart:0,
            stopwatchStart: false,
            stopwatchReset: false,
            stopwatchHistory: false,
            startTime: 0,
            toggle: false,
            bottomMargin: 1,
            canStart : true,
            appState: AppState.currentState,
            started : false,
            location: {},
            lastLocation : {},
            dragged : false,
            distance: 0,
            routeCoordinates : null,
            markers: []
        };
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
        this.getFormattedTime = this.getFormattedTime.bind(this);
        const markers = [
            {
                latitude: 45.65,
                longitude: -78.90,
                title: 'Foo Place',
                subtitle: '1234 Foo Drive'

            }
        ];

    }

    toggleStopwatch() {
        this.setState({stopwatchStart: !this.state.stopwatchStart,stopwatchHistory:true, stopwatchReset: false});
    }

    resetStopwatch() {
        this.setState({stopwatchStart: false, stopwatchReset: true});
    }
    getFormattedTime(time) {
        this.currentTime = time;
    };
    componentDidMount = async() => {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.findCurrentLocationAsync().then(() => {
            if (this.state.location)  {
                this.setState({canStart : true});
            }
        });
    }
    _handleAppStateChange = async (nextAppState) => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            let time = await (new Date().getTime() - this.state.timestampStart);
            this.setState({startTime: time});
            this.resetStopwatch();
            this.toggleStopwatch();
        }
        this.setState({appState: nextAppState});
    };
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
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
            const dataFetch = await Home.getData(STORAGE_KEY_COORDINATES);
            const distance = await Home.getData(STORAGE_KEY_STATS);
            if (dataFetch  && this.state.started) {
                this.setState({routeCoordinates: dataFetch});
                let distanceParsed = JSON.parse(distance);
                let dataFetchParsed = JSON.parse(dataFetch);
                this.setState({lastLocation : dataFetchParsed[dataFetchParsed.length-1],distance: distanceParsed});
            } else if (!this.state.started) {
                // console.log(region);
            }

        }
    };
    _onPressStopStart = async () => {
        const newState = !this.state.toggle;
        this.setState({toggle:newState,markers: []});
        if (this.state.canStart && !this.state.toggle)  {
            if (this.state.stopwatchHistory) {
                this.resetStopwatch();
            }
            this.setState({started: true,timestampStart:new Date().getTime()});
            await Location.startLocationUpdatesAsync('GetLocation', {
                accuracy: Location.Accuracy.Highest,
            });
            this.toggleStopwatch();
            console.log('Start!');
        } else if (this.state.canStart && this.state.toggle){
            this.toggleStopwatch();
            let markers = [{
                title: 'hello',
                image:'../assets/img/button_green.png',
                coordinates: {
                    latitude: 43.663380499999995,
                    longitude: -1.0873644
                },
            },
                {
                    title: 'hello',
                    image:'../assets/img/button_green.png',
                    coordinates: {
                        latitude: 3.149771,
                        longitude: 101.655449
                    },

                }]
            this.setState({started: false,startTime: 0,markers :markers});
            await Location.stopLocationUpdatesAsync('GetLocation');
            await AsyncStorage.removeItem(STORAGE_KEY_COORDINATES);
            await AsyncStorage.removeItem(STORAGE_KEY_STATS);
            console.log('Stop!');
        }
    };
    onPanDrag = async (coordinate) => {
        this.setState({dragged: true});
    };
    _onPressCenter = async (coordinate) => {
        this.setState({dragged: false});
    };

    render() {
        let {toggle} = this.state;
        let textValue = toggle?"Terminer":"Démarrer";
        let buttonBg = toggle?"#6c757d":"#2C5077";
        let text = 'Waiting..';
        let latitude = 0;
        let longitude = 0;
        let longitudeDelta = 0;
        let latitudeDelta = 0;

        let routeCoordinates= [];
        let distance = 0;
        // console.log(this.ref);
        if (this.state.error) {
            text = this.state.error;
        }
        if (this.state.location.coords) {
            if (this.state.lastLocation.latitude === undefined) {
                latitude = (this.state.location.coords.latitude);
                longitude = (this.state.location.coords.longitude);
                longitudeDelta = 0.02;
                latitudeDelta = 0.02;
            } else {
                latitude = (this.state.lastLocation.latitude);
                longitude = (this.state.lastLocation.longitude);
                longitudeDelta = 0.02;
                latitudeDelta = 0.02;
            }
            if (this.state.dragged) {
                latitude =  null;
                longitude =  null;
                longitudeDelta = null;
                latitudeDelta = null;
            }
            if (this.state.routeCoordinates != null) {
                routeCoordinates = JSON.parse(this.state.routeCoordinates);
                distance = this.state.distance;
            }
        }
        return (
            <View style={{flex:1}}>
                <View style={{flex:1,backgroundColor:'white', padding: 10, paddingBottom: 20}}>
                    <View style={{flex: 1, flexDirection: 'row',alignContent:'stretch',justifyContent:'center',alignItems: 'stretch',paddingTop:10}}>
                        <View style={{flex: 1, width:50, alignItems:'center'}}>
                            <Image
                                style={{alignSelf: 'center', width: 50, height: 50}}
                                source={require('../assets/img/Logo.png')}
                            />
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row',alignContent:'stretch',justifyContent:'center',alignItems: 'stretch', marginTop: 20}}>
                        <View style={{flex: 1, alignItems:'center'}} >
                            <Text style={{fontSize: 24, fontWeight: 'bold'}}>0</Text>
                            <Text style={{fontSize: 12}}>Rythme. moy. (km/h)</Text>
                        </View>
                        <View style={{flex: 1, alignItems:'center'}}>
                            <Stopwatch start={this.state.stopwatchStart} startTime={this.state.startTime} getTime={this.getFormattedTime} reset={this.state.stopwatchReset} options={stopwatchoptions}/>
                            <Text style={{fontSize: 12}}>Durée</Text>
                        </View>
                        <View style={{flex: 1, alignItems:'center'}}>
                            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{distance}</Text>
                            <Text style={{fontSize: 12}}>Distance (m)</Text>
                        </View>
                    </View>
                </View>
                <MapView
                    ref={(ref) => this.ref = ref}
                    showsMyLocationButton={ false }
                    showsUserLocation={ true }
                    style={{
                        flex: 4
                    }}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta
                    }}

                    onUserLocationChange={this.onUserLocationChange}
                    onPanDrag={this.onPanDrag}
                >
                    {this.state.markers.map((marker, index) => (
                        <Marker
                            key = {index}
                            coordinate={marker.coordinates}
                            title={marker.title}
                            image={require('../assets/img/button_green.png')}
                        />
                    ))}
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={5}
                    />
                </MapView>
                <View
                    style={{
                        position: 'absolute',//use absolute position to show button on top of the map
                        top: '27%', //for center align
                        left : '87%',
                        flexDirection: 'row',
                    }}
                >
                    <Button
                        icon={
                            <Icon
                                name="gps-fixed"
                                size={20}
                                color="white"
                            />
                        }
                        onPress={this._onPressCenter}
                    />
                </View>
                <View
                    style={{
                        position: 'absolute',//use absolute position to show button on top of the map
                        top: '90%', //for center align
                        alignSelf: 'center', //for align to right
                        flexDirection: 'row',
                    }}
                >
                    <Button
                        buttonStyle={{backgroundColor:buttonBg,width:120,height:50}}
                        title={textValue}
                        type="solid"
                        color="#2C5077"
                        onPress={this._onPressStopStart}
                    />
                </View>

            </View>
        );
    }

}
const stopwatchoptions = {
    container: {
        backgroundColor: 'white',
    },
    text: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
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
            const dataFetch = await Home.getData(STORAGE_KEY_COORDINATES);
            if (dataFetch == null) {
                await Home.setData(STORAGE_KEY_COORDINATES,JSON.stringify(dataStorage));
            } else {
                let DataParse = JSON.parse(dataFetch);
                let distance = geolib.getDistance(
                    { latitude: dataStorage[0].latitude, longitude : dataStorage[0].longitude },
                    { latitude: DataParse[DataParse.length-1].latitude, longitude: DataParse[DataParse.length-1].longitude }
                );
                console.log(DataParse[0]);
                const dataStats = await Home.getData(STORAGE_KEY_STATS);
                if (dataStats == null) {
                    await Home.setData(STORAGE_KEY_STATS, JSON.stringify(distance));
                } else {
                    await Home.setData(STORAGE_KEY_STATS, JSON.stringify(JSON.parse(dataStats)+distance));
                }
                await Home.setData(STORAGE_KEY_COORDINATES,JSON.stringify(JSON.parse(dataFetch).concat(dataStorage)));
            }
        }
    })
}
