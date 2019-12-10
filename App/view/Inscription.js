import React,{Component} from 'react';
import {View, StyleSheet} from 'react-native';
import { Header } from 'react-navigation-stack';
import { FormLabel, } from 'react-native-elements'


export class Inscription extends Component {

    render() {
        return (
            <View>
            <FormLabel>Name</FormLabel>
            <FormInput/>
        <FormValidationMessage>Error message</FormValidationMessage>
            </View>
        );
    }
}





const styles = StyleSheet.create({
    view: {
        paddingTop : 50,
        alignItems: 'center',
        flex: 1,
        paddingLeft:40,
        paddingRight:40
    },
    textInput: {
        width : 350,
        marginTop:25,
        alignItems: 'center',
        alignSelf: 'stretch',
        padding: 7,
        borderBottomColor:'grey',
        borderBottomWidth: 1,     // Add this to specify bottom border thickness
        fontSize: 20
    },


});

export default Inscription;

