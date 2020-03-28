import React, {Component} from "react";
import {Platform, StatusBar, StyleSheet, AppRegistry} from 'react-native';
import { createRootNavigator } from "./navigation/Navigation";
import { isSignedIn } from "./auth/Auth";
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    componentDidMount() {
        isSignedIn()
            .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
            .catch(err => alert("An error occurred"));
    }

    render() {
        let { checkedSignIn, signedIn } = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedSignIn) {
            return null;
        }
        const Layout = createRootNavigator(signedIn);
        return (
            <SafeAreaProvider>
                <Layout />
            </SafeAreaProvider>

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
