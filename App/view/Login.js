import React,{Component} from 'react';
import {View, Image, StyleSheet,TextInput,KeyboardAvoidingView} from 'react-native';
import { Input,Button,Text } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';



export class Login extends Component {
    handleSubmit = values => {
        if (values.email.length > 0 && values.password.length > 0) {
            this.props.navigation.navigate('Home')
        }
    }
    render() {
        const validationSchema = yup.object().shape({
            email: yup.string()
                .label('Email')
                .email('Enter a valid email')
                .required('Please enter a registered email'),
            password: yup.string()
                .label('Password')
                .required()
                .min(4, 'Password must have at least 4 characters ')
        })
        return (
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {this.handleSubmit(values)}}
                validationSchema={validationSchema}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched  }) => (
            <View style={styles.view}>
                <KeyboardAvoidingView style={{paddingBottom: 30}}
                behavior="position" enabled>
                    <Image
                        style={{alignSelf: 'center', width: 100, height: 100}}
                        source={require('../assets/img/Logo.png')}
                    />
                    <Text style={{alignSelf: 'center', fontSize:40, marginTop: 20,color: '#2C5077',letterSpacing:7}}>RUNNING</Text>

                    <View>

                                <TextInput
                                    placeholder="Email"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    style={styles.textInput}
                                    onBlur={handleBlur('email')}


                                />
                        <Text style={{ color: 'red' }}>{touched.email && errors.email}</Text>
                                <TextInput
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    placeholder="Mot de passe"
                                    style={styles.textInput}
                                    onBlur={handleBlur('password')}
                                    secureTextEntry

                                />
                        <Text style={{ color: 'red' }}>{touched.password && errors.password}</Text>


                    </View>

                    <Text style={{marginTop: 30,fontSize:15,color: '#2C5077',textAlign:'right',alignSelf: 'stretch'}}
                          onPress={() => {
                              this.props.navigation.navigate('ForgotPassword', {
                                  Login: 'Cyril'
                              });
                          }}>
                        Mot de passe oublié ?
                    </Text>
                </KeyboardAvoidingView>
                    <View style={{ flexDirection: 'row',flex: 1,justifyContent:'center',alignItems: 'flex-end', paddingBottom:10 }}>
                        <View style={{marginRight:30}}>
                            <Button
                                buttonStyle={{backgroundColor:'#2C5077',width:120,height:50}}
                                title="Connexion"
                                type="solid"
                                color="#2C5077"
                                onPress={handleSubmit}
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
                )}
            </Formik>
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
        width : 300,
        marginTop:20,
        alignItems: 'center',
        alignSelf: 'stretch',
        padding: 7,
        borderBottomColor:'grey',
        borderBottomWidth: 1,     // Add this to specify bottom border thickness
        fontSize: 20
    },

});

export default Login;

