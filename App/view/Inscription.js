import React,{Component} from 'react';
import {TextInput, View, StyleSheet, KeyboardAvoidingView, Image,ImageBackground,ScrollView} from 'react-native';
import {Button,Text,Avatar,Icon } from 'react-native-elements';
import { Formik } from 'formik';


export class Inscription extends Component {
    constructor (props) {
        super(props);
        this.state = {
            /*Initial State and Colour*/
            iconColourH : "black",
            iconColourF : "black"
        }
    }
    funcF() {
        console.warn("changed")
        if (this.state.iconColourF !== '#2C5077'){
            this.setState({
                iconColourF : "#2C5077",
                iconColourH : "black"
            })
        } else {
            this.setState({
                iconColourF : "black"
            })
        }

    }
    funcH() {
        console.warn("changed")
        if (this.state.iconColourH !== '#2C5077'){
            this.setState({
                iconColourH : "#2C5077",
                iconColourF : "black"
            })
        } else {
            this.setState({
                iconColourH : "black"
            })
        }

    }
    render() {
        return (
            <KeyboardAvoidingView contentContainerStyle={styles.keyboard}
                                  behavior={"position"} enabled>
            <ScrollView>
            <View style={styles.view}>
                <ImageBackground
                    source={require('../src/img/Inscription.png')}
                    style={{
                        height: 60,
                        width: 240,
                        position: 'relative', // because it's parent
                        top: 2,
                        left: 2,
                        resizeMode: 'stretch'

                    }}
                >
                    <Text
                        style={{
                            fontSize : 20,
                            color: 'white',
                            top: 13, // position where you want
                            left: 0,
                            textAlign: 'center'
                        }}
                    >
                        Inscription
                    </Text>
                </ImageBackground>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.view}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            placeholder={'Prenom'}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            placeholder={'Nom'}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            placeholder={'Adresse email'}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            placeholder={'Mot de passe'}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            placeholder={'Verification mot de passe'}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1}}>
                        <Icon
                            raised
                            name='male'
                            type='font-awesome'
                            color={this.state.iconColourH}
                            onPress={()=>this.funcH()} />
                            <Text
                                style={{
                                    fontSize : 20,
                                    color: '#2C5077',
                                    top: 13, // position where you want
                                    left: 0,
                                    textAlign: 'center'
                                }}
                            >
                                Homme | Femme
                            </Text>
                        <Icon
                            raised
                            name='female'
                            type='font-awesome'
                            color={this.state.iconColourF}
                            onPress={()=>this.funcF()} />

                        </View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            placeholder={'Date de naissance'}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            placeholder={'Taille'}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            placeholder={'Poids'}
                        />
                        <Button
                            buttonStyle={{backgroundColor:'#2C5077',width:120,height:50}}
                            title="Inscription"
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
                )}
            </Formik>
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}





const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        flex: 1,
        paddingTop : 50,
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
    keyboard: {
        marginBottom : 50
    }


});


export default Inscription;

