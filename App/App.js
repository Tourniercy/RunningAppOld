import React, { Component } from 'react';
import {Platform, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import Inscription from './view/Inscription'
import Container from './navigation/Navigation'


export default class App extends Component {
    render() {
        return (
            <SafeAreaView style={styles.droidSafeArea}>

                <Container/>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});


