import React from 'react';
import {View, Text, Image, FlatList, StyleSheet, AsyncStorage} from 'react-native';
import { Divider,Icon  } from 'react-native-elements';
import { NavigationEvents} from "react-navigation";
import ListItems from './ListItem'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, {Marker, Polyline} from "react-native-maps";
import config from "../config/config";
import moment from "moment";
import 'moment/min/moment-with-locales'
import momentFR from 'moment/locale/fr'
moment.updateLocale('fr',momentFR );

class ActivityScreen extends React.Component {

    static getData = async (key) => {
        return await AsyncStorage.getItem(key);
    };

    constructor(props) {
        super(props);

        this.state = {
            data: [
            ],
            search: "",
            isLoading: false
        };

    }
    componentDidMount = async () => {
        const getUserToken = await ActivityScreen.getData("token");
        await fetch(`` + config.API_URL + `/api/courses`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getUserToken
            }
        }).then((response) => response.json())
            .then((json) => {
                console.log(json[0]);
                if (json) {
                    this.setState({data: json});
                }
            }).catch(err => {
                console.log(err)
            })
    }


    refreshCourses = async () => {
        const dataDumpCourses = async () => {
            const getUserToken = await ActivityScreen.getData("token");
            await fetch(`` + config.API_URL + `/api/courses`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getUserToken
                }
            }).then((response) => response.json())
                .then((json) => {
                    if (json) {
                        this.setState({data: json});
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
        return dataDumpCourses();
    }


    render() {

        const { navigation } = this.props;
        return (
            <View style={{flex: 1,backgroundColor:'white'}}>
                <View style={{flex:1}}>
                    <NavigationEvents
                        onDidFocus={() => this.refreshCourses()}
                    />
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => <ListItems item={item} navigation={navigation} />}
                        keyExtractor={(item, index) => index.toString()}
                        onRefresh={this.refreshCourses.bind(this)}
                        refreshing={this.state.isLoading}
                    />
                </View>
            </View>
        );
    }
}
class DetailScreen extends React.Component {
    centerCoordinates = async (coordinates) => {
        this.map.fitToCoordinates(coordinates, {
            animated: true,
        });
    };

    render() {
        function Capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        console.log(this.props.route.params.data.coordinates)
        console.log(this.props);
        const { navigation } = this.props;
        let duration = moment(this.props.route.params.data.time).format("HH:mm:ss")
        let time = moment(this.props.route.params.data.createdAt).format("HH:mm:ss")
        let date = Capitalize(moment(this.props.route.params.data.createdAt).locale('fr',momentFR ).format("dddd DD/MM/YYYY"))
        navigation.setOptions({ title:  date });
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{flex:1}}>
                    <MapView
                        ref={(map) => { this.map = map; }}
                        onMapReady={() => this.centerCoordinates(this.props.route.params.data.coordinates)}
                        style={{
                            flex: 1
                        }}
                        Region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                    <Polyline
                        coordinates={this.props.route.params.data.coordinates}
                        strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={5}
                    />
                    </MapView>
                </View>
                <View style={{flex:1,marginTop:10}}>
                    <View style={{flexDirection: 'row',paddingLeft:20, paddingRight:20}}>
                        <Text style={{color:'black',fontSize:15}}>Course à pied</Text>
                    </View>

                    <View style={{flexDirection: 'row',marginTop:10,paddingLeft:20, paddingRight:20}}>
                        <View style={{flex:1}}>
                            <Text style={styles.titleText}>{this.props.route.params.data.distance/1000}</Text>
                            <Text style={styles.baseText}>Distance (km)</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.titleText}>{duration}</Text>
                            <Text style={styles.baseText}>Durée</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.titleText}>{((this.props.route.params.data.distance/1000)*100).toFixed(0)}</Text>
                            <Text style={styles.baseText}>Calories</Text>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: 'black',marginTop:10 }} />
                    <View style={{flexDirection: 'row',marginTop:10,paddingLeft:20, paddingRight:20}}>
                        <View style={{flex:1,justifyContent: 'flex-start',flexDirection: 'row'}}>
                            <Icon
                                name='ios-speedometer'
                                type='ionicon'
                                color='grey'
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.infoText}>Vitesse moy</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={styles.valueText}>{this.props.route.params.data.avgSpeed} km/h</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',marginTop:10,paddingLeft:20, paddingRight:20}}>
                        <View style={{flex:1,justifyContent: 'flex-start',flexDirection: 'row'}}>
                            <Icon
                                name='ios-speedometer'
                                type='ionicon'
                                color='grey'
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.infoText}>Vitesse max</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={styles.valueText}>{this.props.route.params.data.maxSpeed} km/h</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',marginTop:10,paddingLeft:20, paddingRight:20}}>
                        <View style={{flex:1,justifyContent: 'flex-start',flexDirection: 'row'}}>
                            <Icon
                                name='alarm'
                                type='material'
                                color='grey'
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.infoText}>Départ</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={styles.valueText}>{time}</Text>
                        </View>
                    </View>
                </View>

            </View>


        );
    }
}
const styles = StyleSheet.create({
    baseText: {
        fontSize: 12,
        color:'grey',
        fontWeight: "bold",
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    valueText: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "right"
    },
    infoText: {
        fontSize: 14,
        textAlign: "left"
    }
});
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ActivityScreen" component={ActivityScreen} options={{
                title: 'Liste des courses',
            }} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} options={{
                title: 'Course',
            }}
                />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}

