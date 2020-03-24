import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../view/Login';
import HomeScreen from '../view/Home';
import BottomNavigation from './BottomNavigator'
import InscriptionScreen from '../view/Inscription';
import ForgotPasswordScreen from '../view/ForgotPassword';

const NavigationStack = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        },
    },
    Home: {
        screen: BottomNavigation,
        navigationOptions: {
            header: null,
        },
    },
    Inscription: {
        screen: InscriptionScreen,
        navigationOptions: {
            header: null,
        },
    },
    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions: {
            header: null
        }
    }

}
);

const Container = createAppContainer(NavigationStack);

export default Container; 
