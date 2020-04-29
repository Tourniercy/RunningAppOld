import React, {Component} from 'react';
import {NavigationEvents, ScrollView} from "react-navigation";
import {
    Text,
    TextInput,
    View,
    Dimensions,
    AsyncStorage,
    StyleSheet,
    KeyboardAvoidingView,
    ActivityIndicator
} from "react-native";
import {Button, Avatar, Divider, Header, Icon, Badge} from "react-native-elements";
import { BarChart, Grid,XAxis, YAxis, LineChart } from 'react-native-svg-charts'
import {createStackNavigator} from "@react-navigation/stack";
import { NavigationActions } from 'react-navigation'
import {NavigationContainer} from "@react-navigation/native";
import config from "../config/config";
import { onSignOut } from "../auth/Auth";
import * as Location from "expo-location";
import DatePicker from "react-native-datepicker";
import {Formik} from "formik";
import * as yup from "yup";
import {SCLAlert, SCLAlertButton} from "react-native-scl-alert";
import {Ionicons} from "@expo/vector-icons";

export default class Profile extends Component {

    static getData = async (key) => {
        return await AsyncStorage.getItem(key);
    };
    constructor(props) {
        super(props);

        this.state = {
            date: "",
            show: false,
            showError: false,
            loading: false,
            user: '',
            data: {
                'weight':'0'
            },
            datacourses: [],
            isLoading: false,



        };

    }
    _onPressDis = async () => {
        // this.props.navigation.dispatch(backAction);

        // await AsyncStorage.removeItem('token');
    };
    componentDidMount = async () => {
        const getUserToken = await Profile.getData("token");
        await fetch(`` + config.API_URL + `/api/users`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getUserToken
            }
        }).then((response) => response.json())
            .then((json) => {
                if (json) {
                    this.setState({data: json[0]});
                    console.log(json);
                }
            }).catch(err => {
                console.log(err)
            })

        await fetch(`` + config.API_URL + `/api/courses`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getUserToken
            }
        }).then((response) => response.json())
            .then((json) => {
                if (json) {
                    this.setState({datacourses: json});
                }
            }).catch(err => {
                console.log(err)
            })
    }
    async registerCall(values) {
        const getUserToken = await Profile.getData("token");
        fetch(``+config.API_URL+`/api/users/`+this.state.data.id, {

            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/merge-patch+json',
                'Authorization': 'Bearer ' + getUserToken,
            },
            body: JSON.stringify({
                "firstname": values.prenom,
                "lastname": values.nom,
                "birthDate": values.birthDate,
                "weight": parseInt(values.poids),
            })

        }).then((response) => {

            let json = response.json();

            if (response.status >= 200 && response.status < 300) {
                return json;
            } else {
                return json.then(Promise.reject.bind(Promise, 500));
            }

        })
            .then((data) => {

                if (data) {
                    this.setState({loading: false})
                    this.setState({ show:true })
                    setTimeout(() => {
                        this.setState({ show:false })
                    }, 2000)
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({showError: true})
            })
    }
    handleClose = () => {
        this.setState({ show: false })
        this.setState({ showError: false })
        this.setState({ showErrorEmail: false })
    }
    render() {
        const validationSchema = yup.object().shape({

            prenom: yup.string()
                .label('Prénom')
                .required('Champ obligatoire')
                .min(2, 'Minimum 2 caractères')
                .max(20, 'Maximum 20 caractères')
                .trim()
                .matches(/^[a-zA-Z]*$/, 'Caractères invalides'),

            nom: yup.string()
                .label('Nom')
                .required('Champ obligatoire')
                .min(2, 'Minimum 2 caractères')
                .max(20, 'Maximum 20 caractères')
                .trim()
                .matches(/^[a-zA-Z]*$/, 'Caractères invalides'),

            birthDate: yup.string()
                .label('Date de naissance')
                .required('Champ obligatoire'),

            poids: yup.string()
                .label('Poids')
                .required('Champ obligatoire')
                .matches(/^[0-9]*\.?[0-9]{1,2}$/, 'Caractères invalides')
                .typeError('Caractère invalide'),
        })
        const fill = '#2C5077'
        const data = [ 4, 30, 10, 7, 4, 6, 8, 4, 10, 10, 10, 10 ]
        const dates = [ 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D' ]

        const saveDatas = async () => {
            // console.log(this.state.tempnom, this.state.tempprenom, this.state.temppoids, this.state.tempadresseMail, this.state.tempmdp)
            const dataupdate = {
                // TODO transformer le state en un objet acceptable pour la database
            }
        }


        return(
            <KeyboardAvoidingView
                contentContainerStyle={styles.keyboard}
                behavior={"height"}
                keyboardVerticalOffset={-40}
            >
                {/* Modal : Inscription réussit */}

                <View style={{
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20
                }}>

                    <SCLAlert
                        show={this.state.show}
                        onRequestClose={this.handleClose}
                        theme="info"
                        title={"Informations mises à jour"}
                        subtitle=""
                        headerIconComponent={<Ionicons name="ios-checkmark" size={70} color="white"/>}
                        overlayStyle={{backgroundColor: 'white'}}
                        titleStyle={{fontSize: 30}}
                        subtitleStyle={{fontSize: 18}}
                    />

                </View>

                {/* Modal : Erreur 500 */}

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
                        subtitle="Un problème est survenu sur le serveur, veuillez réessayer !"
                        headerIconComponent={<Ionicons name="ios-alert" size={90} color="white" />}
                        titleStyle={{ fontSize: 30 }}
                        subtitleStyle={{ fontSize: 18}}
                    >

                        <SCLAlertButton theme="danger" onPress={this.handleClose}>Réessayer</SCLAlertButton>

                    </SCLAlert>

                </View>
                <ScrollView>
                <Header
                    placement="left"
                    leftComponent={{ text: ' Profil', style: { color: 'black',fontSize:18,fontWeight:"bold" } }}
                    containerStyle={{
                        backgroundColor: 'white',
                        justifyContent: 'space-around',
                        borderBottomWidth:1,
                        borderBottomColor: 'rgba(52, 52, 52, 0.2)'
                    }}
                />
                <View style={{flex: 1, alignItems: 'center', flexDirection: 'column'}}>

                    <Avatar
                        size={90}
                        icon={{ name: 'user',type:'font-awesome' }}
                        rounded
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        containerStyle={{ marginTop: 20 }}
                    />

                    <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>{this.state.data.firstname} {this.state.data.lastname}</Text>
                    {/*<Text style={{ marginTop: 10 }}>Membre depuis le 19 nov. 2019</Text>*/}

                    <Button
                        buttonStyle={{backgroundColor: '#2C5077', width: 120, height: 50, marginTop: 20}}
                        title="Déconnecter"
                        type="solid"
                        color="#2C5077"
                        onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}
                    />

                    <Divider style={{ backgroundColor: 'black', marginTop:20 }} />

                </View>

                <View style={{flex: 1, backgroundColor: '#ffffe6', paddingBottom: 20}}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 18,
                            padding: 16,
                            color: '#2C5077',
                            fontWeight: 'bold'
                        }}>
                        Statistique des courses
                    </Text>

                    <View style={{ flex: 1, alignItems: 'center' }}>

                        <BarChart
                          style={{ height: 170, width: '80%' }}
                          data={ data }
                          svg={{ fill }}
                          contentInset={{ top: 30, bottom: 30 }}
                        >
                        </BarChart>

                    </View>

                    <XAxis
                      style={{ flex: 1, marginHorizontal: 35 }}
                      data={ data }
                      formatLabel={(value, index) => dates[ index ]}
                      contentInset={{ left: 13, right: 13 }}
                      svg={{ fontSize: 12, fill: 'black', fontWeight: 'bold' }}
                    />

                </View>

                <Formik

                    initialValues={{
                        prenom: this.state.data.firstname,
                        nom: this.state.data.lastname,
                        birthDate: this.state.data.birthDate,
                        poids: (this.state.data.weight).toString(),
                    }}
                    enableReinitialize={true}
                    onSubmit={values => this.registerCall(values)}
                    validationSchema={validationSchema}
                >

                    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (

                        <View style={styles.view}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 18,
                                    padding: 16,
                                    color: '#2C5077',
                                    fontWeight: 'bold'
                                }}>
                                Mes informations
                            </Text>
                            <View>

                                { /* FIRSTNAME INPUT AND ERROR TEXT */ }

                                <View style={styles.inputSection}>
                                    {errors.prenom && touched.prenom ?
                                        <TextInput
                                            style={styles.textInputError }
                                            value={values.prenom}
                                            onChangeText={handleChange('prenom')}
                                            onBlur={handleBlur('prenom')}
                                            placeholder={'Prénom'}
                                        />
                                        :
                                        <TextInput
                                            style={styles.textInput}
                                            value={values.prenom}
                                            onChangeText={handleChange('prenom')}
                                            onBlur={handleBlur('prenom')}
                                            placeholder={'Prénom'}
                                        />
                                    }

                                    <Icon
                                        name='user'
                                        type='font-awesome'
                                        color='brown'
                                        style={styles.searchIcon}
                                        iconStyle={{ position: 'absolute', right: 15, top: -10}}
                                    />

                                </View>


                                <View style={{ display: 'flex', flexDirection: "row", marginBottom: 5, marginTop: 10 }}>

                                    {errors.prenom && touched.prenom ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
                                    {errors.prenom && touched.prenom ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.prenom}</Text> : null}

                                </View>


                                { /* LASTNAME INPUT AND ERROR TEXT */ }

                                <View style={styles.inputSection}>


                                    {errors.nom && touched.nom ?
                                        <TextInput
                                            style={styles.textInputError}
                                            onChangeText={handleChange('nom')}
                                            onBlur={handleBlur('nom')}
                                            placeholder={'Nom'}
                                        />
                                        :
                                        <TextInput
                                            value={values.nom}
                                            style={styles.textInput}
                                            onChangeText={handleChange('nom')}
                                            onBlur={handleBlur('nom')}
                                            placeholder={'Nom'}
                                        />
                                    }

                                    <Icon
                                        name='user'
                                        type='font-awesome'
                                        color='brown'
                                        style={styles.searchIcon}
                                        iconStyle={{ position: 'absolute', right: 15, top: -10}}
                                    />

                                </View>

                                <View style={{ display: 'flex', flexDirection: "row", marginBottom: 5, marginTop: 10 }}>

                                    {errors.nom && touched.nom ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
                                    {errors.nom && touched.nom ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.nom}</Text> : null}

                                </View>


                                { /* DATE INPUT AND ERROR TEXT */ }

                                {errors.birthDate && touched.birthDate ?

                                    <DatePicker
                                        style={{ width: 280, marginTop: 5 }}
                                        date={this.state.date}
                                        mode="date"
                                        placeholder="Date de naissance"
                                        format="YYYY/MM/DD"
                                        minDate="1940/01/01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        iconComponent={
                                            <Icon
                                                name='calendar'
                                                type='font-awesome'
                                                color='#2C5077'
                                                size={21}
                                                iconStyle={{
                                                    position: 'absolute',
                                                    right: 14,
                                                }}
                                            />
                                        }
                                        customStyles={{
                                            dateInput: {
                                                borderRadius: 5,
                                                borderColor: 'brown',
                                                height: 44
                                            },
                                            dateText: {
                                                fontSize: 17
                                            },
                                            placeholderText: {
                                                fontSize: 17,
                                                textAlign: 'left',
                                                alignSelf: 'stretch',
                                                paddingLeft: 16
                                            }
                                        }}
                                        onDateChange={(birthDate) => {
                                            this.setState({date: birthDate})
                                            values.birthDate = birthDate
                                        }}
                                    />
                                    :
                                    <DatePicker
                                        style={{ width: 280, marginTop: 5 }}
                                        date={values.birthDate}
                                        mode="date"
                                        placeholder="Date de naissance"
                                        format="YYYY/MM/DD"
                                        minDate="1940/01/01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        iconComponent={
                                            <Icon
                                                name='calendar'
                                                type='font-awesome'
                                                color='#2C5077'
                                                size={21}
                                                iconStyle={{
                                                    position: 'absolute',
                                                    right: 14,
                                                }}
                                            />
                                        }
                                        customStyles={{
                                            dateInput: {
                                                borderRadius: 5,
                                                borderColor: '#989898',
                                                height: 44
                                            },
                                            dateText: {
                                                fontSize: 17
                                            },
                                            placeholderText: {
                                                fontSize: 17,
                                                textAlign: 'left',
                                                alignSelf: 'stretch',
                                                paddingLeft: 16
                                            }
                                        }}
                                        onDateChange={(birthDate) => {
                                            this.setState({date: birthDate})
                                            values.birthDate = birthDate
                                        }}
                                    />
                                }

                                <View style={{ display: 'flex', flexDirection: "row", marginBottom: 5, marginTop: 10 }}>

                                    {errors.birthDate && touched.birthDate ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
                                    {errors.birthDate && touched.birthDate ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.birthDate}</Text> : null}

                                </View>

                                { /* WEIGHT INPUT */ }

                                <View style={styles.inputSection}>

                                    <TextInput
                                        keyboardType={'phone-pad'}
                                        style={styles.textInput}
                                        value={values.poids}
                                        onChangeText={handleChange('poids')}
                                        onBlur={handleBlur('poids')}
                                        placeholder={'Poids (kg)'}

                                    />

                                    <Icon
                                        name='balance-scale'
                                        type='font-awesome'
                                        color='#2C5077'
                                        style={styles.searchIcon}
                                        size={20}
                                        iconStyle={{ position: 'absolute', right: 10, top: -8}}
                                    />

                                </View>

                                <View style={{ display: 'flex', flexDirection: "row", marginBottom: 5, marginTop: 10 }}>

                                    {errors.poids && touched.poids ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
                                    {errors.poids && touched.poids ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.poids}</Text> : null}

                                </View>

                                <View style={{alignItems: "center"}}>
                                    <Button
                                        buttonStyle={{
                                            backgroundColor: '#2C5077',
                                            width: 200,
                                            height: 50,
                                            marginBottom: 60,
                                            marginTop: 20
                                        }}
                                        title="Enregistrer"
                                        color="#2C5077"
                                        type="solid"
                                        onPress={handleSubmit}
                                    />
                                </View>

                            </View>

                        </View>
                    )}
                </Formik>

                <NavigationEvents
                    onDidFocus={() => console.log('test')}
                />
                    <View style={[(this.state.loading) ? styles.loading : '']}>
                        <ActivityIndicator size={50} color="brown" animating={this.state.loading}/>
                    </View>
            </ScrollView>

            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({

    view: {

        alignItems: 'center',
        flex: 1,
    },

    textInput: {

        width: 280,
        marginTop: 5,
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

    keyboard: {

        marginBottom: 0
    },

    headerLogo: {

        height: 60,
        width: 240,
        position: 'relative',
        top: 2,
        left: 2,
        marginTop: 24,
        marginBottom: 30
    },

    headerText: {

        fontSize: 20,
        color: 'white',
        top: 13,
        left: 0,
        textAlign: 'center'
    },

    inputSection: {
        flex: 1,
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

})