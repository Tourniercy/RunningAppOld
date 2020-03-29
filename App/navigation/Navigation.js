import React from "react";
import { Platform, StatusBar } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator,createAppContainer } from 'react-navigation';
import createBottomTabNavigator from "react-navigation-tabs/src/navigators/createBottomTabNavigator";
import LoginScreen from '../view/Login';
import InscriptionScreen from '../view/Inscription';
import Activity from "../view/Activity";
import Home from '../view/Home'
import Profil from '../view/Profile'
import Icon from "react-native-vector-icons/FontAwesome5";

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createAppContainer(createStackNavigator({
    SignIn: {
        screen: LoginScreen,
        navigationOptions: {
            title: "Sign In",
            headerStyle,
            header: null
        }
    },
    SignUp: {
        screen: InscriptionScreen,
        navigationOptions: {
            title: "Sign Up",
            headerStyle,
            header: null
        }
    }
}));

export const SignedIn = createAppContainer(createBottomTabNavigator(
    {
        Courses: {
            screen: Activity,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="list" size={25} color={tintColor} />
                )
            }
        },
        Activité: {
            screen: Home,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="walking" size={25} color={tintColor} />
                )
            },
        },
        Profil: {
            screen: Profil,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="user-alt" size={25} color={tintColor} />
                )
            }
        },
    },
    {
        initialRouteName: 'Activité',
        tabBarOptions: {
            style: {
                activeTintColor: '#2C5077',
                height: 60
            }
        }
    }
));

export const createRootNavigator = (signedIn = false) => {
    return createAppContainer(createSwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    ));
};