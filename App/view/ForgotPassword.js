// View if you forget your password

import React,{Component} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native'

class ForgotPassword extends Component {

    state = {
        email: ''
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.main_container}>
                <Text style={styles.text}>Entrez votre adresse mail, et vous recevrez un mail vous permettant de changer votre mot de passe.</Text>
                <TextInput
                    placeholder="Email"
                    onChangeText={this.handleEmail}
                    style={styles.textInput}

                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 30
    },
    textInput: {
        width : 300,
        marginTop:25,
        margin: 25,
        alignSelf: 'stretch',
        padding: 7,
        borderBottomColor:'grey',
        borderBottomWidth: 1,     // Add this to specify bottom border thickness
        fontSize: 20
    }
})

export default ForgotPassword
