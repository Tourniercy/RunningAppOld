import React,{Component} from 'react';
import {View, Image, StyleSheet, TextInput, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity} from 'react-native'
import {Input, Button, Text, Icon, Badge} from 'react-native-elements'
import {getToken, onSignIn} from "../auth/Auth"
import { Formik } from 'formik';
import * as yup from 'yup';
import {SCLAlert, SCLAlertButton} from "react-native-scl-alert"
import {Ionicons} from "@expo/vector-icons"


export class Login extends Component {

    constructor(props) {

        super(props)

        this.state = {
            show: false,
            showError: false,
            showErrorServer: false,
            loading: false,
            hidePassword: true
        }
    }

    handleSubmit = async values => {

        this.setState({loading: true})

        let token = await getToken(values).then().catch(err => {console.log(err)})

        if (!token) {
            this.setState({loading: false})
            this.setState({ showErrorServer: true });
        }

        switch (token) {
            case 200:
                this.setState({loading: false})
                this.props.navigation.navigate('SignedIn')
                break
            case 401:
                this.setState({loading: false})
                this.setState({ showError: true });
                break
            case 500:
                this.setState({loading: false})
                this.setState({ showErrorServer: true });
                break
        }

    }

    handleClose = () => {
        this.setState({ show: false })
        this.setState({ showError: false })
        this.setState({ showErrorServer: false })
    }

    setPasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    render() {

        const validationSchema = yup.object().shape({
            email: yup.string()
                .label('Email')
                .email('Veuillez entrer un email valide')
                .required('Champ obligatoire'),
            password: yup.string()
                .label('Password')
                .matches(/^\S+$/, 'Espaces non autorisés')
                .required('Champ obligatoire')
        })

        return (

            <View style={{ flex: 1, marginTop: 20 }}>

                <View style={{
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <SCLAlert
                      show={this.state.showError}
                      onRequestClose={this.handleClose}
                      theme="danger"
                      title="Erreur"
                      subtitle="Les données entrées ne sont pas valides, veuillez réessayer !"
                      headerIconComponent={<Ionicons name="ios-alert" size={90} color="white" />}
                      titleStyle={{ fontSize: 30 }}
                      subtitleStyle={{ fontSize: 18}}
                      overlayStyle={{ backgroundColor: 'white' }}
                    >

                        <SCLAlertButton containerStyle={{ marginTop: 50, padding: 14 }} theme="danger" onPress={this.handleClose}>Réessayer</SCLAlertButton>

                    </SCLAlert>

                </View>

                <View style={{
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <SCLAlert
                      show={this.state.showErrorServer}
                      onRequestClose={this.handleClose}
                      theme="danger"
                      title="Erreur"
                      subtitle="Le serveur ne répond pas, veuillez réessayer !"
                      headerIconComponent={<Ionicons name="ios-alert" size={90} color="white" />}
                      titleStyle={{ fontSize: 30 }}
                      subtitleStyle={{ fontSize: 18}}
                      overlayStyle={{ backgroundColor: 'white' }}
                    >

                        <SCLAlertButton containerStyle={{ marginTop: 50, padding: 14 }} theme="danger" onPress={this.handleClose}>Réessayer</SCLAlertButton>

                    </SCLAlert>

                </View>

                <Formik
                  initialValues={{ email: 'salif.ervin@gmail.com', password: 'ervin' }}
                  onSubmit={values => { this.handleSubmit(values) }}
                  validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched  }) => (

                      <View style={styles.view}>

                          <KeyboardAvoidingView style={{ paddingBottom: 30 }} behavior="position" enabled>

                              <Image
                                style={{alignSelf: 'center', width: 100, height: 100}}
                                source={require('../assets/img/Logo.png')}
                              />

                              <Text style={{alignSelf: 'center', fontSize:40, fontWeight: "bold",marginTop: 12, marginBottom: 70,color: '#2C5077',letterSpacing:7}}>RUNNING</Text>

                              <View style={styles.inputSection}>

                                  {errors.email && touched.email ?
                                    <TextInput
                                      style={styles.textInputError}
                                      onChangeText={handleChange('email')}
                                      onBlur={handleBlur('email')}
                                      placeholder={'Adresse email'}
                                    />
                                    :
                                    <TextInput
                                      style={styles.textInput}
                                      onChangeText={handleChange('email')}
                                      onBlur={handleBlur('email')}
                                      placeholder={'Adresse email'}
                                    />
                                  }

                                  <Icon
                                    name='envelope-open'
                                    type='font-awesome'
                                    color='#2C5077'
                                    size={20}
                                    style={styles.searchIcon}
                                    iconStyle={{ position: 'absolute', right: 14, top: -10 }}
                                  />

                              </View>

                              <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 10 }}>

                                  {errors.email && touched.email ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
                                  {errors.email && touched.email ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.email}</Text> : null}

                              </View>

                              <View style={styles.inputSection}>

                                  {errors.password && touched.password ?
                                    <TextInput
                                      style={[styles.textInputError]}
                                      onChangeText={handleChange('password')}
                                      onBlur={handleBlur('password')}
                                      type={'password'}
                                      placeholder={'Mot de passe'}
                                      secureTextEntry={this.state.hidePassword}
                                    />
                                    :
                                    <TextInput
                                      style={styles.textInput}
                                      onChangeText={handleChange('password')}
                                      onBlur={handleBlur('password')}
                                      type={'password'}
                                      placeholder={'Mot de passe'}
                                      secureTextEntry={this.state.hidePassword}
                                    />
                                  }

                                  {errors.password && touched.password ?
                                    <TouchableOpacity style={{ position: 'absolute', right: 0, top: 5, paddingHorizontal: 18, paddingVertical: 13}}>
                                        <Icon
                                          name='lock'
                                          type='font-awesome'
                                          color='brown'
                                          style={styles.searchIcon}
                                          onPress={ this.setPasswordVisibility }
                                        />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0, paddingHorizontal: 18, paddingVertical: 13}}>
                                        <Icon
                                          name='lock'
                                          type='font-awesome'
                                          color='brown'
                                          style={styles.searchIcon}
                                          onPress={ this.setPasswordVisibility }
                                        />
                                    </TouchableOpacity>
                                  }

                              </View>

                              <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 10 }}>

                                  {errors.password && touched.password ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
                                  {errors.password && touched.password ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.password}</Text> : null}

                              </View>

                              <Text style={{marginTop: 1, fontSize:14, color: '#2C5077', textAlign:'right', alignSelf: 'stretch'}}
                                    onPress={() => {
                                        this.props.navigation.navigate('ForgotPassword', {
                                            Login: 'Cyril'
                                        });
                                    }}>
                                  Mot de passe oublié ?
                              </Text>

                          </KeyboardAvoidingView>

                          <View style={{ flexDirection: 'row', flex: 1, justifyContent:'center', alignItems: 'flex-start', marginTop: 60 }}>
                              <View style={{marginRight:30}}>
                                  <Button
                                    buttonStyle={styles.buttonConnection}
                                    title="Connexion"
                                    type="solid"
                                    color="#2C5077"
                                    onPress={handleSubmit}
                                  />
                              </View>
                              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                  <Button
                                    buttonStyle={styles.buttonRegister}
                                    titleStyle={{color:'#2C5077'}}
                                    title="Inscription"
                                    type="outline"
                                    onPress={() => {
                                        // this.props.navigation.navigate('Home');
                                        this.props.navigation.navigate('SignUp', {
                                            Login: 'Cyril',
                                            Password: 'TEST',
                                        });
                                        // onSignIn().then(() => this.props.navigation.navigate('SignedIn'));

                                    }}
                                  />
                              </View>
                          </View>
                      </View>
                    )}
                </Formik>

                <View style={[(this.state.loading) ? styles.loading : '']}>
                    <ActivityIndicator size={50} color="brown" animating={this.state.loading}/>
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
        paddingRight:40,
    },
    textInput: {
        width : 280,
        height: 50,
        marginTop: 0,
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingVertical: 7,
        paddingLeft: 16,
        borderColor: '#989898',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 17
    },
    textInputError: {

        width: 280,
        height: 50,
        marginTop: 5,
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingVertical: 7,
        paddingLeft: 16,
        borderColor: 'brown',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 17
    },
    buttonConnection: {
        backgroundColor: '#2C5077',
        width: 120,
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    buttonRegister: {
        borderColor: '#2C5077',
        backgroundColor: 'white',
        width: 120,
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    inputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255, 0.8)',

    }

});

export default Login;

