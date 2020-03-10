import React, {Component} from 'react';
import {Text, View, TextInput, Button, FlatList} from 'react-native';
import ListItem from "./ListItem";

export default class Activity extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            data: [{id: 1, text: 'test'}, {id: 2, text: 'test2'}],
            search: "",
            isLoading: false
        };
    }

    refreshCourses = async () => {
        const dataDumpCourses = async () => {
            // placer ici l'appel à la DB
            console.log('courses récupérées')
            return [{id: 3, text: 'test3'}, {id: 4, text: 'test4'}];
        }

        // quand le composant est monté, fetch la DB
        const dataTemp = await dataDumpCourses()
        this.setState({data: dataTemp})
        console.log('courses affichées')
        console.log(this.state.data)
    }


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d0d0d0'}}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => <ListItem item={item} />}
                    keyExtractor={item => item.id.toString()}
                    onRefresh={this.refreshCourses.bind(this)}
                    refreshing={this.state.isLoading}
                />
                <Button title="Refresh" onPress={this.refreshCourses} />
            </View>
        );
    }

}
