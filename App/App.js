import React, { Component } from 'react';
import {Platform, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import Container from './navigation/Navigation';
import Home from './view/Home';
import StoreApp from './src/App'
export default class App extends Component {
    render() {
        return (
            <SafeAreaView style={styles.droidSafeArea}>
                    <StoreApp />
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


