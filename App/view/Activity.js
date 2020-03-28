import React from 'react';
import { View, Text,Image,FlatList,StyleSheet } from 'react-native';
import { Divider,Icon  } from 'react-native-elements';
import { NavigationEvents} from "react-navigation";
import ListItems from './ListItem'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, {Marker, Polyline} from "react-native-maps";
import * as geolib from 'geolib';
import {Ionicons} from "@expo/vector-icons";

class ActivityScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    name: '15.60 km',
                    icon: 'directions-run',
                    subtitle: '00:10:23',
                    rightSubtitle : 'mer 01/01/2020'

                },
                {
                    name: '1.3 km',
                    icon: 'directions-run',
                    subtitle: '00:10:23',
                    rightSubtitle : 'lun 10/04/2020'
                },
            ],
            search: "",
            isLoading: false
        };

    }
    componentDidMount = async () => {
    }


    refreshCourses = async () => {
        const dataDumpCourses = async () => {
            // placer ici l'appel à la DB
            return [
                {
                    name: '15.60 km',
                    icon: 'directions-run',
                    subtitle: '00:10:23',
                    rightSubtitle : 'mer 01/01/2020'

                },
                {
                    name: '1.4 km',
                    icon: 'directions-run',
                    subtitle: '00:10:23',
                    rightSubtitle : 'lun 10/04/2020'
                },
            ];
        }
        // quand le composant est monté, fetch la DB
        console.log('courses affichées')
        console.log(this.state.data)
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
    centerCoordinates = async () => {
        this.map.fitToCoordinates([
            {
                "latitude": 44.8607734,
                "longitude": -0.5714785,
                "timestamp": 1585400887000,
            },
            {
                "latitude": 44.8605452,
                "longitude": -0.5710898,
                "timestamp": 1585400889000,
            },
            {
                "latitude": 44.8603118,
                "longitude": -0.5707062,
                "timestamp": 1585400891000,
            },
            {
                "latitude": 44.8601233,
                "longitude": -0.5703964,
                "timestamp": 1585400893000,
            },
            {
                "latitude": 44.8599256,
                "longitude": -0.5700689,
                "timestamp": 1585400895000,
            },
            {
                "latitude": 44.8597432,
                "longitude": -0.5697657,
                "timestamp": 1585400897000,
            },
            {
                "latitude": 44.8595331,
                "longitude": -0.5694054,
                "timestamp": 1585400899000,
            },
            {
                "latitude": 44.8593656,
                "longitude": -0.5691546,
                "timestamp": 1585400901000,
            },
            {
                "latitude": 44.8591357,
                "longitude": -0.5690114,
                "timestamp": 1585400903000,
            },
            {
                "latitude": 44.8588708,
                "longitude": -0.5691938,
                "timestamp": 1585400905000,
            },
            {
                "latitude": 44.8586763,
                "longitude": -0.5693831,
                "timestamp": 1585400907000,
            },
            {
                "latitude": 44.8584245,
                "longitude": -0.5695729,
                "timestamp": 1585400909000,
            },
            {
                "latitude": 44.8581906,
                "longitude": -0.5697292,
                "timestamp": 1585400911000,
            },
            {
                "latitude": 44.8579014,
                "longitude": -0.5699032,
                "timestamp": 1585400913000,
            },
            {
                "latitude": 44.857625,
                "longitude": -0.570075,
                "timestamp": 1585400916000,
            },
            {
                "latitude": 44.8574076,
                "longitude": -0.5702067,
                "timestamp": 1585400918000,
            },
            {
                "latitude": 44.8571886,
                "longitude": -0.5703391,
                "timestamp": 1585400920000,
            },
            {
                "latitude": 44.85688,
                "longitude": -0.5705203,
                "timestamp": 1585400922000,
            },
            {
                "latitude": 44.8566231,
                "longitude": -0.5707035,
                "timestamp": 1585400925000,
            },
            {
                "latitude": 44.8562834,
                "longitude": -0.5709,
                "timestamp": 1585400928000,
            },
            {
                "latitude": 44.8559565,
                "longitude": -0.5711315,
                "timestamp": 1585400932000,
            },
            {
                "latitude": 44.8556146,
                "longitude": -0.5713457,
                "timestamp": 1585400934000,
            },
        ], {
            animated: true,
        });
    };
    render() {
        const { navigation } = this.props;
        navigation.setOptions({ title:  'MAR 21/01/2020' });
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{flex:1}}>
                    <MapView
                        ref={(map) => { this.map = map; }}
                        onMapReady={this.centerCoordinates}
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
                        coordinates={[
                            {
                                "latitude": 44.8607734,
                                "longitude": -0.5714785,
                                "timestamp": 1585400887000,
                            },
                            {
                                "latitude": 44.8605452,
                                "longitude": -0.5710898,
                                "timestamp": 1585400889000,
                            },
                            {
                                "latitude": 44.8603118,
                                "longitude": -0.5707062,
                                "timestamp": 1585400891000,
                            },
                            {
                                "latitude": 44.8601233,
                                "longitude": -0.5703964,
                                "timestamp": 1585400893000,
                            },
                            {
                                "latitude": 44.8599256,
                                "longitude": -0.5700689,
                                "timestamp": 1585400895000,
                            },
                            {
                                "latitude": 44.8597432,
                                "longitude": -0.5697657,
                                "timestamp": 1585400897000,
                            },
                            {
                                "latitude": 44.8595331,
                                "longitude": -0.5694054,
                                "timestamp": 1585400899000,
                            },
                            {
                                "latitude": 44.8593656,
                                "longitude": -0.5691546,
                                "timestamp": 1585400901000,
                            },
                            {
                                "latitude": 44.8591357,
                                "longitude": -0.5690114,
                                "timestamp": 1585400903000,
                            },
                            {
                                "latitude": 44.8588708,
                                "longitude": -0.5691938,
                                "timestamp": 1585400905000,
                            },
                            {
                                "latitude": 44.8586763,
                                "longitude": -0.5693831,
                                "timestamp": 1585400907000,
                            },
                            {
                                "latitude": 44.8584245,
                                "longitude": -0.5695729,
                                "timestamp": 1585400909000,
                            },
                            {
                                "latitude": 44.8581906,
                                "longitude": -0.5697292,
                                "timestamp": 1585400911000,
                            },
                            {
                                "latitude": 44.8579014,
                                "longitude": -0.5699032,
                                "timestamp": 1585400913000,
                            },
                            {
                                "latitude": 44.857625,
                                "longitude": -0.570075,
                                "timestamp": 1585400916000,
                            },
                            {
                                "latitude": 44.8574076,
                                "longitude": -0.5702067,
                                "timestamp": 1585400918000,
                            },
                            {
                                "latitude": 44.8571886,
                                "longitude": -0.5703391,
                                "timestamp": 1585400920000,
                            },
                            {
                                "latitude": 44.85688,
                                "longitude": -0.5705203,
                                "timestamp": 1585400922000,
                            },
                            {
                                "latitude": 44.8566231,
                                "longitude": -0.5707035,
                                "timestamp": 1585400925000,
                            },
                            {
                                "latitude": 44.8562834,
                                "longitude": -0.5709,
                                "timestamp": 1585400928000,
                            },
                            {
                                "latitude": 44.8559565,
                                "longitude": -0.5711315,
                                "timestamp": 1585400932000,
                            },
                            {
                                "latitude": 44.8556146,
                                "longitude": -0.5713457,
                                "timestamp": 1585400934000,
                            },
                        ]}
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
                            <Text style={styles.titleText}>1,39</Text>
                            <Text style={styles.baseText}>Distance (km)</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.titleText}>00:35:11</Text>
                            <Text style={styles.baseText}>Durée</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.titleText}>100</Text>
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
                            <Text style={styles.valueText}>30,6 km/h</Text>
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
                            <Text style={styles.valueText}>15,6 km/h</Text>
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
                            <Text style={styles.valueText}>09:58</Text>
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
                title: 'MAR., 21/01/2020',
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

