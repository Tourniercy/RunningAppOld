import React, { Component } from 'react';
import {Platform, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import Container from './navigation/Navigation';
import Home from './view/Home'
import allReducers from './src/reducers/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
const store = createStore(allReducers);

export default class App extends Component {
    render() {
        return (
            <SafeAreaView style={styles.droidSafeArea}>
                <Provider store= {store}>
                    <Home />
                </Provider>
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


