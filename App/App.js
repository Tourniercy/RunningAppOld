// App.js

import React, { Component } from 'react';
import {Platform, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Container from './navigation/Navigation';
import Inscription from './view/Inscription';

export default class YourApp extends Component {
    render() {
        return (
            <SafeAreaView style={styles.droidSafeArea}>
                <Container />
            </SafeAreaView>

        );
    }
}
const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});


