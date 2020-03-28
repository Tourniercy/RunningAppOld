import React from 'react';
import { View, Text,Image,FlatList } from 'react-native';
import { NavigationEvents} from "react-navigation";
import ListItems from './ListItem'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, {Marker, Polyline} from "react-native-maps";

class ActivityScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    name: '15.6 km',
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
                    name: '15.6 km',
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
        this.setState('data',[
            {
                name: '15.6 km',
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
        ]);
        // quand le composant est monté, fetch la DB
        console.log('courses affichées')
        console.log(this.state.data)
    }


    render() {

        const { navigation } = this.props;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row',alignContent:'stretch',paddingTop:10}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold',textAlign:'left',marginLeft: 20}}>ACTIVITÉS</Text>
                </View>
                <View style={{flex:12}}>
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
    render() {
        const { navigation } = this.props;
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <MapView
                        style={{
                            flex: 1
                        }}
                        Region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>
                <View style={{flex:1}}>
                    <Text>GFF</Text>
                </View>

            </View>


        );
    }
}
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
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

