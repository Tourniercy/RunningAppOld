import React,{Component} from 'react';
import {TextInput, View, StyleSheet, KeyboardAvoidingView, Image,ImageBackground,ScrollView} from 'react-native';
import {Button,Text,Avatar,Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-datepicker';


export class Inscription extends Component {

    constructor (props) {
        super(props);
        this.state = {
            /*Initial State and Colour*/
            iconColourH : "black",
            iconColourF : "black",
            date: "",
        }
    }

    funcF() {
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

        const validationSchema = yup.object().shape({
            email: yup.string()
                .label('Email')
                .email('Veuillez entrer un email valide')
                .ensure()
                .required('Addresse email invalide'),
            password: yup.string()
                .label('Password')
                .required('Mot de passe requis'),
            passwordverify: yup.string()
                .label('Password verify')
                .required('Mot de passe requis'),
            prenom: yup.string()
                .label('Prénom')
                .required('Prénom requis'),
            nom: yup.string()
                .label('Nom')
                .required('Nom requis'),
            date: yup.string()
                .label('Date de naissance')
                .required('Date de naissance requise'),
            taille: yup.string()
                .label('Taille')
                .required('Taille requis'),
            poids: yup.string()
                .label('Poids')
                .required('Poids requis'),
        })

        return (
            <KeyboardAvoidingView contentContainerStyle={styles.keyboard}
                behavior={"padding"} enabled keyboardVerticalOffset={10}>
            
            <ScrollView>
            
            <View style={styles.view}>
                <ImageBackground
                    source={require('../assets/img/Inscription.png')}
                    style={{
                        height: 60,
                        width: 240,
                        position: 'relative',
                        top: 2,
                        left: 2,
                        marginTop: 40,
                        marginBottom: 30
                    }}
                >
                    <Text
                        style={{
                            fontSize : 20,
                            color: 'white',
                            top: 13,
                            left: 0,
                            textAlign: 'center'
                        }}
                    >
                    Inscription
                    </Text>
                </ImageBackground>
            
            <Formik
                initialValues={{ email: '',prenom : '', nom : '',password : '',passwordverify : '',date : '',taille : '',poids : '' }}
                onSubmit={values => console.log(values)} validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    
                    <View style={styles.view}>
                        
                        <View>
                            <TextInput
                                style={styles.textInput}
                                value={values.prenom}
                                onChangeText={handleChange('prenom')}
                                onBlur={handleBlur('prenom')}
                                placeholder={'Prénom'}
                            />

                            <Text style={{ color: 'red', marginTop: 5 }}>{ touched.prenom && errors.prenom }</Text>
                        
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('nom')}
                                onBlur={handleBlur('nom')}
                                placeholder={'Nom'}
                            />
                            
                            <Text style={{ color: 'red', marginTop: 5 }}>{ touched.nom && errors.nom }</Text>

                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                placeholder={'Adresse email'}
                            />

                            <Text style={{ color: 'red', marginTop: 5 }}>{ touched.email && errors.email }</Text>

                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                type={'password'}
                                placeholder={'Mot de passe'}
                                secureTextEntry
                            />

                            <Text style={{ color: 'red', marginTop: 5 }}>{ touched.password && errors.password }</Text>

                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('passwordverify')}
                                onBlur={handleBlur('passwordverify')}
                                type={'password'}
                                placeholder={'Vérification du mot de passe'}
                                secureTextEntry
                            />

                            <Text style={{ color: 'red', marginTop: 5 }}>{ touched.passwordverify && errors.passwordverify }</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1,marginTop: 40}}>
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
                                    onPress={()=>this.funcF()} 
                                />
                            </View>
                        
                            {/* <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('date')}
                                onBlur={handleBlur('date')}
                                placeholder={'Date de naissance'}
                            />
                            <Text style={{ color: 'red', marginTop: 5 }}>{ errors.date }</Text> */}
                            
                            <DatePicker
                                style={{width: 280, marginTop: 5}}
                                date={this.state.date}
                                mode="date"
                                placeholder="Date de naissance"
                                format="DD/MM/YYYY"
                                minDate="01/01/1940"
                                onChangeText={handleChange('date')}
                                customStyles={{
                                    dateIcon: {
                                        display: 'none',
                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                        borderBottomWidth: 1,
                                        borderBottomColor: 'grey',
                                        marginBottom:0,
                                        paddingVertical: 7,
                                        alignItems: "flex-start",
                                    },
                                    placeholderText: {
                                        fontSize: 17, 
                                    },
                                    dateText: {
                                        fontSize: 17
                                    }
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />

                            <Text style={{ color: 'red', marginTop: 5 }}>{ touched.date && errors.date }</Text>

                            <TextInput
                                keyboardType={'phone-pad'}
                                style={styles.textInput}
                                onChangeText={handleChange('taille')}
                                onBlur={handleBlur('taille')}
                                placeholder={'Taille'}
                            />
                            <Text style={{ color: 'red', marginTop: 5 }}>{ touched.taille && errors.taille }</Text>
                            <TextInput
                                keyboardType={'phone-pad'}
                                style={styles.textInput}
                                onChangeText={handleChange('poids')}
                                onBlur={handleBlur('poids')}
                                placeholder={'Poids'}
                            />
                            <Text style={{ color: 'red', marginTop: 5 }}>{ touched.poids && errors.poids }</Text>
                            
                            <View style={{alignItems: "center"}}>
                                <Button
                                    buttonStyle={{backgroundColor:'#2C5077',width:200,height:50, marginBottom:40, marginTop:40}}
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
                            
                        </View>
                        
                        
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
    },
    textInput: {
        width : 280,
        marginTop:5,
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingVertical: 7,
        borderBottomColor:'grey',
        borderBottomWidth: 1,
        fontSize: 17
    },
    keyboard: {
        marginBottom : 0
    },

});


export default Inscription;

