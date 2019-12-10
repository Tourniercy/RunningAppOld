import React,{Component} from 'react';
import {View, Image, StyleSheet,TextInput,KeyboardAvoidingView} from 'react-native';
import { Header } from 'react-navigation-stack';
import { Input,Button,Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export class Login extends Component {

    state = {
        email: '',
        password: '',
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }


    render() {
        return (
            <View style={styles.view}>

                <KeyboardAvoidingView style={{paddingBottom: 50}}
                behavior="position" enabled>
                    <Image
                        style={{width: 100, height: 100}}
                        source={require('../src/img/Logo.png')}
                    />
                    <Text style={{fontSize:40, marginTop: 20,color: '#2C5077',letterSpacing:7}}>RUNNING</Text>
                    <View style={{marginTop:30,marginBottom:30}}>
                                <TextInput
                                    placeholder="Email"
                                    onChangeText={this.handleEmail}
                                    style={styles.textInput}

                                />
                                <TextInput
                                    placeholder="Mot de passe"
                                    onChangeText={this.handlePassword}
                                    style={styles.textInput}

                                />
                            </View>
                </KeyboardAvoidingView>
                <Text style={{fontSize:15,color: '#2C5077',textAlign:'right',alignSelf: 'stretch'}}>Mot de passe oublié ?</Text>
                <View style={{ flexDirection: 'row',position:'absolute',bottom:60 }}>
                    <View style={{marginRight:30}}>
                <Button
                    buttonStyle={{backgroundColor:'#2C5077',width:120,height:50}}
                    title="Connexion"
                    type="solid"
                    color="#2C5077"
                    onPress={() => {
                        this.props.navigation.navigate('Home', {
                            Login: this.state.email,
                            Password: this.state.password,
                        });
                    }}
                />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button
                    buttonStyle={{borderColor:'#2C5077',width:120,height:50}}
                    titleStyle={{color:'#2C5077'}}
                    title="Inscription"
                    type="outline"
                    //onPress={() => this.props.navigation.navigate('Home')}
                    onPress={() => {
                        this.props.navigation.navigate('Inscription', {
                            Login: 'Cyril',
                            Password: 'TEST',
                        });
                    }}
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
        flex: 1,
        paddingLeft:40,
        paddingRight:40
    },
    textInput: {
        width : 350,
        marginTop:25,
        alignItems: 'center',
        alignSelf: 'stretch',
        padding: 7,
        borderBottomColor:'grey',
        borderBottomWidth: 1,     // Add this to specify bottom border thickness
        fontSize: 20
    },


});

export default Login;

