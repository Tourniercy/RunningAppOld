import React,{Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import { Input,Button,Text } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
export class FormAcc extends Component {
    render() {
        return (
            <View style={styles.view}>
                <Image
                    style={{width: 100, height: 100}}
                    source={require('../src/img/Logo.png')}
                />
                <Text style={{fontSize:40, paddingTop: 20,color: '#2C5077',letterSpacing:7}}>RUNNING</Text>
                <View style={{flexDirection:'row',marginTop:50,marginBottom:50}}>
                <Input
                    placeholder='Adresse mail'
                />
                </View>
                <View style={{flexDirection:'row',marginBottom:30}}>
                <Input
                    placeholder='Mot de passe'
                    secureTextEntry={true}
                />
                </View>
                <Text style={{fontSize:15,color: '#2C5077',textAlign:'right',alignSelf: 'stretch',paddingRight:10}}>Mot de passe oublié ?</Text>
                <View style={{ flexDirection: 'row',position:'absolute',bottom:60 }}>
                    <View style={{marginRight:30}}>
                <Button
                    buttonStyle={{backgroundColor:'#2C5077',width:120,height:50}}
                    title="Connexion"
                    type="solid"
                    color="#2C5077"
                />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button
                    buttonStyle={{borderColor:'#2C5077',width:120,height:50}}
                    titleStyle={{color:'#2C5077'}}
                    title="Inscription"
                    type="outline"
                />

                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    view: {
        paddingTop : 50,
        alignItems: 'center',
        flex: 6,
        paddingLeft:30,
        paddingRight:30
    },
});
