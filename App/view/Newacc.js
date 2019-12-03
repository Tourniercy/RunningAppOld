import React,{Component} from 'react';
import {View, Text, Image, StyleSheet, Platform, StatusBar} from 'react-native';
export class FormAcc extends Component {
    render() {
        return (
            <View style={styles.img}>
                <Image
                    style={{width: 50, height: 50}}
                    source={require('../src/img/Logo.png')}
                />
                <Text>RUNNING</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    img: {
        paddingTop : '10px',
        alignItems: 'center',
        flex: 2,
    },
});
