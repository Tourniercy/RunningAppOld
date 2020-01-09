import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as TaskManager from 'expo-task-manager'
import React, {useEffect} from 'react'
import {Text, View, AsyncStorage} from 'react-native'
import {connect} from 'react-redux'

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
        async function fetchData() {
            const response = await trackUserLocation();
        }
        let promise = fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            return await trackUserLocation();
        }
        let promise = fetchData();
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
        console.log(latitude,longitude);
        // store.dispatch(updateCoordinates({ latitude, longitude }))
    }
})