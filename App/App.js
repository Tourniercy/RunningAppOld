import React from 'react';
import {StyleSheet, Text, View, Image, SafeAreaView, Platform, StatusBar} from 'react-native';
import { FormAcc } from './view/Newacc.js';
// import { GlobalStyles } from './style/GlobalStyles.js';

export default function App() {
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <FormAcc/>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 6,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});
