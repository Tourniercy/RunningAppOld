import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { NavigationEvents} from "react-navigation";
import FlatList, {ListItem} from "react-native-elements";

class ActivityScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            search: "",
            isLoading: false
        };

    }
    componentDidMount() {
    }

    refreshCourses = async () => {
        const dataDumpCourses = async () => {
            // placer ici l'appel à la DB
            console.log('courses récupérées')
            return [
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
            ];
        }

        // quand le composant est monté, fetch la DB
        const dataTemp = await dataDumpCourses()
        this.setState({data: dataTemp})
        console.log('courses affichées')
        console.log(this.state.data)
    }


    render() {
        let ListItems = ({ item }) => (
            <ListItem
                title={item.name}
                subtitle={item.subtitle}
                leftIcon={{ name: item.icon,color:"#2C5077" }}
                rightSubtitle={item.rightSubtitle}
                onPress={() => {alert('pressed')}}
                containerStyle={{borderStyle:"solid",borderTopWidth:0.8}}
                rightSubtitleStyle={{width:110}}
                chevron={{ color: '#2C5077' }}

            />
        )
        const list = [
            {
                name: 'Amy Farha',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Vice President'
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Vice Chairman'
            },
        ]
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
                        keyExtractor={this.keyExtractor}
                        data={list}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
}
class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Details Screen</Text>
            </View>
        );
    }
}

const AppNavigator = createStackNavigator(
    {
        ActivityScreen: ActivityScreen,
        ProfileScreen: ProfileScreen
    },
    {
        initialRouteName: "ActivityScreen"
    }
);

export default createAppContainer(AppNavigator);


