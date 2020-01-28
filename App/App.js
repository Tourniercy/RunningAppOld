import React, { Component } from 'react';
import {Platform, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import Container from './navigation/Navigation';
import Home from './view/Home';
import BottomNavigation from './navigation/BottomNavigator'

export default class App extends Component {
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


