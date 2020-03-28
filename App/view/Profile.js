import React, {Component} from 'react';
import {NavigationEvents, ScrollView} from "react-navigation";
import {Text, TextInput, View, Dimensions} from "react-native";
import {Button, Avatar, Divider} from "react-native-elements";
import { BarChart, Grid,XAxis,LineChart } from 'react-native-svg-charts'
import {onSignIn} from "../auth/Auth";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";


class DetailProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            datacourses: [],
            datausers: [],
            isLoading: false,
            tempnom: null,
            tempprenom: null,
            temppoids: null,
            tempadresseMail: null,
            tempmdp: null

        };

    }

    componentDidMount() {
        // TODO appel BDD
        // TODO transformer datausers en temp-datas
    }

    render() {
        const fill = 'rgb(14, 65, 244)'
        const data   = [ 4, 12, 10, 7, 4, 6, 8,4,10,10,10,10 ]


        const saveDatas = async () => {
            console.log(this.state.tempnom, this.state.tempprenom, this.state.temppoids, this.state.tempadresseMail, this.state.tempmdp)
            const dataupdate = {
                // TODO transformer le state en un objet acceptable pour la database
            }
        }


        return(
            <ScrollView style={{flex: 1,backgroundColor:'white'}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 4, alignItems: 'center', flexDirection: 'row', justifyContent: 'center',marginTop:20}}>
                            <Avatar
                                size="xlarge"
                                rounded
                                icon={{ name: 'account-circle',type:'material' }}


                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
                    </View>
                    <View>
                        <View style={{marginTop:20,alignItems: 'center', flexDirection: 'row',justifyContent: 'center'}}>
                            <Button
                                //buttonStyle={styles.buttonConnection}
                                buttonStyle={{backgroundColor: '#2C5077',
                                    width: 120,
                                    height: 50}}
                                title="Déconnecter"
                                type="solid"
                                color="#2C5077"
                                // onPress={handleSubmit}
                                onPress={() => {
                                    this.forceUpdate();
                                }}
                            />
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: 'black',marginTop:20 }} />



                </View>
                <View style={{flex: 1}}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 18,
                            padding: 16,
                        }}>
                        Statistique de courses
                    </Text>
                    <BarChart
                        style={{ height: 200 }}
                        data={ data }
                        svg={{ fill }}
                        contentInset={{ top: 30, bottom: 30 }}
                    >
                    </BarChart>
                    <XAxis
                        style={{ marginHorizontal: -10 }}
                        data={ data }
                        formatLabel={ (value, index) => index }
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                    />

                </View>

                <View style={{flex: 1, height: 600}}>

                    <View style={{borderColor: "black", borderWidth: 1, margin: 10, flex: 1}}>
                        <Text style={{fontSize: 20, margin: 5}}>
                            Nom
                        </Text>
                        <TextInput style={{borderColor: 'gray', borderWidth: 1, width: 300, alignSelf: "flex-end", marginRight: 10}}
                                   onChangeText={text => this.setState({tempnom: text})}
                                   value={this.state.tempnom}>
                        </TextInput>
                    </View>

                    <View style={{borderColor: "black", borderWidth: 1, margin: 10, flex: 1}}>
                        <Text style={{fontSize: 20, margin: 5}}>
                            Prenom
                        </Text>
                        <TextInput style={{borderColor: 'gray', borderWidth: 1, width: 300, alignSelf: "flex-end", marginRight: 10}}
                                   onChangeText={text => this.setState({tempprenom: text})}
                                   value={this.state.tempprenom}>
                        </TextInput>
                    </View>

                    <View style={{borderColor: "black", borderWidth: 1, margin: 10, flex: 1}}>
                        <Text style={{fontSize: 20, margin: 5}}>
                            Poids
                        </Text>
                        <TextInput style={{borderColor: 'gray', borderWidth: 1, width: 300, alignSelf: "flex-end", marginRight: 10}}
                                   onChangeText={text => this.setState({temppoids: text})}
                                   value={this.state.temppoids}>
                        </TextInput>
                    </View>

                    <View style={{borderColor: "black", borderWidth: 1, margin: 10, flex: 1}}>
                        <Text style={{fontSize: 20, margin: 5}}>
                            Adresse mail
                        </Text>
                        <TextInput style={{borderColor: 'gray', borderWidth: 1, width: 300, alignSelf: "flex-end", marginRight: 10}}
                                   onChangeText={text => this.setState({tempadresseMail: text})}
                                   value={this.state.tempadresseMail}>
                        </TextInput>
                    </View>

                    <View style={{borderColor: "black", borderWidth: 1, margin: 10, flex: 1}}>
                        <Text style={{fontSize: 20, margin: 5}}>
                            Mot de passe
                        </Text>
                        <TextInput style={{borderColor: 'gray', borderWidth: 1, width: 300, alignSelf: "flex-end", marginRight: 10}}
                                   onChangeText={text => this.setState({tempmdp: text})}
                                   value={this.state.tempmdp}>
                        </TextInput>
                    </View>

                    <View style={{margin: 10, flex: 1, justifyContent: "center"}}>
                        <Button
                            //buttonStyle={styles.buttonConnection}
                            title="Sauvegarder"
                            type="solid"
                            color="#2C5077"
                            // onPress={handleSubmit}
                            onPress={() => {
                                // this.props.navigation.navigate('Home');
                                // onSignIn().then(() => this.props.navigation.navigate('SignedIn'));
                                saveDatas()
                            }}
                        />
                    </View>
                </View>


                <NavigationEvents
                    onDidFocus={() => console.log('test')}
                />

            </ScrollView>
        )
    }
}
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ActivityScreen" component={DetailProfile} options={{
                title: 'Profile',
            }} />
        </Stack.Navigator>
    );
}

export default function Profile() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}