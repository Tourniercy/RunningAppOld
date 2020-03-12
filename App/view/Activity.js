import React, {Component} from 'react';
import {Text, View, TextInput, Button, FlatList, Image} from 'react-native';
import { NavigationEvents} from "react-navigation";
import ListItems from "./ListItem";

export default class Activity extends React.Component{

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
                        <Text style={{fontSize: 20, fontWeight: 'bold',textAlign:'left',marginLeft: 20}}>ACTIVITES</Text>
                </View>
                <View style={{flex:8}}>
                    <NavigationEvents
                        onDidFocus={() => this.refreshCourses()}
                    />
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => <ListItems item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        onRefresh={this.refreshCourses.bind(this)}
                        refreshing={this.state.isLoading}
                />
                </View>
            </View>
        );
    }

}
