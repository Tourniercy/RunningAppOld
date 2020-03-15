import React, { Component } from 'react';
import {Platform, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import Container from './navigation/Navigation';
import BottomNavigation from './navigation/BottomNavigator'
import Home from './view/Home';
import Test from './test/MAP';


export default class App extends Component {
    render() {
        return (
            <SafeAreaView style={styles.droidSafeArea}>
                    <Test />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: '#2C5077',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});


