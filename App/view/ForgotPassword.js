// View if you forget your password

import React,{Component} from 'react';
import { StyleSheet, View, Text } from 'react-native'

class ForgotPassword extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.main_container}>
                <Text>Login: {JSON.stringify(navigation.getParam('Login', 'default value'))}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
})

export default ForgotPassword
