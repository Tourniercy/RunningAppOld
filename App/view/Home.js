import {AsyncStorage, Text, View,AppState,Image} from 'react-native';
import React, {Component} from 'react';
import MapView, {Polyline,Marker} from "react-native-maps";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Notifications } from 'expo';
import { Stopwatch } from 'react-native-stopwatch-timer';
import SafeAreaView from 'react-native-safe-area-view';
import * as geolib from 'geolib';
import config from "../config/config";
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'
import {onSignIn} from "../auth/Auth";
import {Ionicons} from "@expo/vector-icons";
import moment from "moment";


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
            show: false,
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
            stats: [{distance:0,speed:0}],
            routeCoordinates : null,
            markers: []
        };
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
        this.getFormattedTime = this.getFormattedTime.bind(this);

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
        await AsyncStorage.removeItem(STORAGE_KEY_COORDINATES);
        await AsyncStorage.removeItem(STORAGE_KEY_STATS);
        AppState.addEventListener('change', this._handleAppStateChange);
        this.getNotifPermissions();
        this.findCurrentLocationAsync().then(() => {
            if (this.state.location)  {
                this.setState({canStart : true});
            }
        });
    };

    _handleAppStateChange = async (nextAppState) => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            if (this.state.started) {
                this.onUserLocationChange(null,2)
                let time = await (new Date().getTime() - this.state.timestampStart);
                this.setState({startTime: time});
                this.resetStopwatch();
                this.toggleStopwatch();
            }
        }
        this.setState({appState: nextAppState});
    };
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }


    getNotifPermissions = async () => {
        const { status } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        if (status !== 'granted') {
            await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
    };
    findCurrentLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied'
            });
        } else {
            let location = await Location.getLastKnownPositionAsync();
            this.setState({location: location});
        }

    };
    onUserLocationChange = async (region,time) => {
        if (time !== 2) {
            if (this.state.lastLocation.timestamp) {
                time = (region.nativeEvent.coordinate.timestamp/1000-this.state.lastLocation.timestamp/1000);
            } else {
                time = (region.nativeEvent.coordinate.timestamp/1000-this.state.location.timestamp/1000);
            }
        }
        if (time >= 2 && this.state.started) {
            const dataFetch = JSON.parse(await Home.getData(STORAGE_KEY_COORDINATES));
            const dataStats = JSON.parse(await Home.getData(STORAGE_KEY_STATS));
            if (dataFetch && dataStats) {
                // console.log(dataStats);
                this.setState({routeCoordinates: dataFetch,lastLocation : dataFetch[dataFetch.length-1],stats: dataStats,centered:false});
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
            this.setState({started: true,timestampStart:new Date().getTime(),routeCoordinates:[],stats:[{distance:0,speed:0}]});
            await Location.startLocationUpdatesAsync('GetLocation', {
                accuracy: Location.Accuracy.Highest,
            });
            this.toggleStopwatch();
            console.log('Start!');
        } else if (this.state.canStart && this.state.toggle){
            this.toggleStopwatch();
            await Location.stopLocationUpdatesAsync('GetLocation');
            const dataCoordinates = JSON.parse(await Home.getData(STORAGE_KEY_COORDINATES));
            const dataStats = JSON.parse(await Home.getData(STORAGE_KEY_STATS));
            let markers = [{
                image:require('../assets/img/button_green.png'),
                coordinates: {
                    latitude: dataCoordinates[0].latitude,
                    longitude: dataCoordinates[0].longitude
                },
            },
                {
                    image:require('../assets/img/button_red.png'),
                    coordinates: {
                        latitude: dataCoordinates[dataCoordinates.length-1].latitude,
                        longitude: dataCoordinates[dataCoordinates.length-1].longitude
                    },

                }]
            dataStats[0].coordinates = dataCoordinates;
            const getUserToken = await Home.getData("token");
            const d = new Date(dataCoordinates[0].timestamp);
            let time = moment(d).add("2","hours");
            time = moment(time).format("YYYY:MM:DD hh:mm:ss");
            const localnotification = {
                title: 'Course terminée',
                body: 'Durée : '+new Date(dataStats[0].totaltime * 1000).toISOString().substr(11, 8)+'    Distance : '+(dataStats[0].distance/1000).toFixed(2)+' KM',
                android: {
                    sound: true,
                },
            };
            await fetch(`` + config.API_URL + `/api/courses`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getUserToken
                },
                body: JSON.stringify({
                    "distance": dataStats[0].distance,
                    "avgSpeed": parseFloat(dataStats[0].avgSpeed),
                    "maxSpeed":parseFloat(dataStats[0].maxSpeed),
                    "time":new Date(dataStats[0].totaltime * 1000).toISOString().substr(11, 8),
                    "createdAt": time,
                    "coordinates": dataCoordinates,
                    "user": "/api/users/1"
                })
            }).then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json.id) {
                        this.setState({ show:true })
                        Notifications.presentLocalNotificationAsync(localnotification)
                        setTimeout(() => {
                            this.setState({ show:false })
                        }, 2000)
                    }
                }).catch(err => {
                    console.log(err)
                })


            this.setState({started: false,startTime: 0,markers :markers,routeCoordinates: dataCoordinates});

            await AsyncStorage.removeItem(STORAGE_KEY_COORDINATES);
            await AsyncStorage.removeItem(STORAGE_KEY_STATS);
        }
    };
    onPanDrag = async (coordinate) => {
        this.setState({dragged: true});
    };
    _onPressCenter = async (coordinate) => {
        let location = await Location.getLastKnownPositionAsync();
        this.setState({location: location,dragged: false,centered:true});
    };

    handleClose = () => {
        this.setState({ show: false })
    }

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
        let distance = this.state.stats[0].distance;
        let speed = this.state.stats[0].speed;
        if (this.state.error) {
            text = this.state.error;
        }
        if (this.state.location.coords) {
            if (this.state.lastLocation.latitude === undefined || this.state.centered) {
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
                routeCoordinates = this.state.routeCoordinates;
            }
        }
        return (
            <SafeAreaView style={{ flex: 1}} forceInset={{ top: 'always' }}>
                <SCLAlert
                    show={this.state.show}
                    onRequestClose={this.handleClose}
                    theme="success"
                    subtitle={""}
                    title={"Course sauvegardée !"}
                    headerIconComponent={<Ionicons name="ios-checkmark" size={70} color="white"/>}
                    titleStyle={{fontSize: 30}}
                    subtitleStyle={{fontSize: 18}}
                />
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
                                <Text style={{fontSize: 24, fontWeight: 'bold'}}>{speed}</Text>
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
                        ref={(map) => { this.map = map; }}
                        showsMyLocationButton={ false }
                        showsUserLocation={ true }
                        style={{
                            flex: 4
                        }}
                        region={latitude == null ?
                            undefined :
                            {
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: latitudeDelta,
                                longitudeDelta: longitudeDelta
                            }
                        }

                        onUserLocationChange={this.onUserLocationChange}
                        onPanDrag={this.onPanDrag}
                    >
                        {this.state.markers.map((marker, index) => (
                            <Marker
                                key = {index}
                                coordinate={marker.coordinates}
                                title={marker.title}
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
            </SafeAreaView>
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
            const currentCoordinates = [{latitude:data.locations[data.locations.length-1].coords.latitude,longitude:data.locations[data.locations.length-1].coords.longitude,timestamp:data.locations[data.locations.length-1].timestamp}];
            // console.log('speed',data.locations[data.locations.length-1].coords.speed);
            const pastCoordinates = await Home.getData(STORAGE_KEY_COORDINATES);
            let pastStats = await Home.getData(STORAGE_KEY_STATS);
            if (pastCoordinates == null) {
                await Home.setData(STORAGE_KEY_COORDINATES,JSON.stringify(currentCoordinates));
            } else {
                let pastCoordinatesParsed = JSON.parse(pastCoordinates);
                let distance = geolib.getDistance(
                    { latitude: currentCoordinates[0].latitude, longitude : currentCoordinates[0].longitude },
                    { latitude: pastCoordinatesParsed[pastCoordinatesParsed.length-1].latitude, longitude: pastCoordinatesParsed[pastCoordinatesParsed.length-1].longitude }
                );
                let TotalTime = (data.locations[data.locations.length-1].timestamp-pastCoordinatesParsed[0].timestamp)/1000;
                let TimeBetweenTwo = (data.locations[data.locations.length-1].timestamp-pastCoordinatesParsed[pastCoordinatesParsed.length-1].timestamp)/1000;
                // console.log('Total time',TotalTime);
                // console.log('Actual speed',(data.locations[data.locations.length-1].coords.speed*3.6).toFixed(2));
                // console.log('Average speed',((pastStats+distance)/TotalTime)*3.6);
                // console.log('Distance tottal',pastStats,distance)
                // console.log({distance:pastStats+distance,
                //     avgSpeed:(((pastStats+distance)/TotalTime)*3.6).toFixed(2),
                //     speed:(data.locations[data.locations.length-1].coords.speed*3.6).toFixed(2)})

                if (pastStats == null) {
                    let Stats= [{distance:distance,avgSpeed:(data.locations[data.locations.length-1].coords.speed).toFixed(2),speed:((data.locations[data.locations.length-1].coords.speed)*3.6).toFixed(2),maxpSpeed:((data.locations[data.locations.length-1].coords.speed)*3.6).toFixed(2),totaltime:TotalTime}]
                    await Home.setData(STORAGE_KEY_STATS, JSON.stringify(Stats));
                } else {
                    let pastStatsParsed = JSON.parse(pastStats);
                    // console.log('pastStatsParsed',pastStatsParsed)
                    let maxSpeed = 0;
                    if (data.locations[data.locations.length-1].coords.speed > pastStatsParsed[0].maxSpeed) {
                        maxSpeed = data.locations[data.locations.length-1].coords.speed.toFixed(2);
                    } else {
                        maxSpeed = pastStatsParsed[0].speed;
                    }
                    console.log('time',TotalTime);
                    console.log('distance',pastStatsParsed[0].distance+distance);
                    console.log('speed',data.locations[data.locations.length-1].coords.speed);
                    let CurrentStats= [{distance:pastStatsParsed[0].distance+distance,avgSpeed:(((pastStatsParsed[0].distance+distance)/TotalTime)*3.6).toFixed(2),maxSpeed:maxSpeed*3.6,speed:(data.locations[data.locations.length-1].coords.speed).toFixed(2),totaltime:TotalTime},]
                    await Home.setData(STORAGE_KEY_STATS, JSON.stringify(CurrentStats));
                }
                await Home.setData(STORAGE_KEY_COORDINATES,JSON.stringify(JSON.parse(pastCoordinates).concat(currentCoordinates)));
            }
        }
    })
}