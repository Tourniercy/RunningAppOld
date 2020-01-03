import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as TaskManager from 'expo-task-manager'
import React, {useEffect} from 'react'
import { Text, View } from 'react-native'
import { connect,Provider } from 'react-redux'
import allReducers from '../src/reducers/index.js';
import {createStore} from 'redux';
import {setLocation} from "../src/actions";
const store = createStore(allReducers);

const LOCATION_TASK_NAME = 'background-location-task'

const _App = ({ latitude, longitude }) => {
    const trackUserLocation = async () => {
        const { status } = await Permissions.askAsync(
            Permissions.LOCATION,
            Permissions.USER_FACING_NOTIFICATIONS
        )

        if (status === 'granted') {
            await Location.startLocationUpdatesAsync(
                LOCATION_TASK_NAME,
                {
                    accuracy: Location.Accuracy.Highest,
                    distanceInterval: 1,
                    timeInterval: 5000
                }
            )
        }
    }

    useEffect(() => {
        trackUserLocation() // start tracking
    }, [])

    useEffect(() => {
        async function useEffectPromise() {
            return trackUserLocation() // cleanup
        }
        useEffectPromise();
    }, [])
    return (
        <View>
            <Text>Lat: {latitude}</Text>
            <Text>Lng: {longitude}</Text>
        </View>
    )
}

const mapState = ({ latitude, longitude }) => ({ latitude, longitude })

export default App = connect(mapState)(_App)


TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
        console.error(error)
        return
    }
    if (data) {
        const { latitude, longitude } = data.locations[0].coords
        store.dispatch(setLocation({ latitude, longitude }))
    }
})
