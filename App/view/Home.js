// View/Home.js

import React,{Component} from 'react';
import { StyleSheet, View, Text } from 'react-native'

class Home extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.main_container}>
                <Text>Login: {JSON.stringify(navigation.getParam('Login', 'default value'))}</Text>
                <Text>Password: {JSON.stringify(navigation.getParam('Password', 'default value'))}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
})

export default Home