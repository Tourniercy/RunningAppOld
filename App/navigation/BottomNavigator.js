import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import createBottomTabNavigator from "react-navigation-tabs/src/navigators/createBottomTabNavigator";
import Home from '../view/Home'
import Icon from "react-native-vector-icons/FontAwesome";

export default class BottomNavigator extends React.Component {
    render() {
        return (
            <AppContainer />
        );
    }
}


class ExploreScreen extends React.Component {
    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d0d0d0'}}>
                <Text> This is my Explore screen </Text>
            </View>
        );
    }
}


class ProfileScreen extends React.Component {
    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d0d0d0'}}>
                <Text> This is my Profile screen </Text>
            </View>
        );
    }
}

const bottomTabNavigator = createBottomTabNavigator(
    {
        Activ: {
            screen: ExploreScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="search" size={25} color={tintColor} />
                )
            }
        },
        Course: {
            screen: Home,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="home" size={25} color={tintColor} />
                )
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="user" size={25} color={tintColor} />
                )
            }
        },
    },
    {
        initialRouteName: 'Course',
        tabBarOptions: {
            activeTintColor: '#5192eb'
        }
    }
);

const AppContainer = createAppContainer(bottomTabNavigator);