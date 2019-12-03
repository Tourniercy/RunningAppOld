import React,{Component} from 'react';
import {View, Text, Image, StyleSheet, Platform, StatusBar, Button} from 'react-native';
import { Input } from 'react-native-elements';
export class FormAcc extends Component {
    render() {
        return (
            <View style={styles.img}>
                <Image
                    style={{width: 100, height: 100}}
                    source={require('../src/img/Logo.png')}
                />
                <Text style={{fontSize:40, paddingTop: 20,color: '#2C5077'}}>R U N N I N G</Text>
                <Input inputStyle={{marginTop:20}}
                    placeholder='Adresse mail'
                />
                <Input inputStyle={{marginTop:20}}
                    placeholder='Mot de passe'
                />
                <Text style={{fontSize:15, paddingTop: 20,color: '#2C5077',textAlign:'right',alignSelf: 'stretch'}}>Mot de passe oublié ?</Text>
                <View style={{ flexDirection: 'row' }}>
                <Button style={{margin:15}}
                    title="Connexion"
                    type="outline"
                    color="#2C5077"
                />
                <Button
                    style={{margin:15}}
                    title="Inscription"
                    type="outline"
                    color="#2C5077"
                />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    img: {
        paddingTop : 50,
        alignItems: 'center',
        flex: 6,
    },
});
