import {AsyncStorage, View, Text, AppState} from "react-native";
import React from "react";
import MapView, {Marker, Polyline} from "react-native-maps";
import ViewShot from "react-native-view-shot";
import Home from "../view/Home";

const STORAGE_KEY_COORDINATES = 'COORDINATES';
const STORAGE_KEY_STATS = 'STATS';



function _mapReady() {
    return true;
}
export const SaveCourse = async () => {
    await AsyncStorage.setItem(STORAGE_KEY_COORDINATES,'JSON.stringify(currentCoordinates)');
    const dataFetch = async () => await AsyncStorage.getItem(STORAGE_KEY_COORDINATES);
    // const dataStats = async () => await AsyncStorage.getItem(STORAGE_KEY_STATS);
    console.log(dataFetch);
        return(
            <View>
                <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9,result:"base64" }} style={{flex:4}}>
                    <MapView
                        onMapReady = { () => this._mapReady() }
                        ref={(map) => { this.map = map; }}
                        showsMyLocationButton={ false }
                        showsUserLocation={ true }
                        style={{
                            flex: 1
                        }}
                        region={latitude == null ?
                            undefined :
                            {
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: latitudeDelta,
                                longitudeDelta: longitudeDelta
                            }
                        }

                        onUserLocationChange={this.onUserLocationChange}
                        onPanDrag={this.onPanDrag}
                    >
                        {this.state.markers.map((marker, index) => (
                            <Marker
                                key = {index}
                                coordinate={marker.coordinates}
                                title={marker.title}
                                image={marker.image}
                            />
                        ))}
                        <Polyline
                            coordinates={routeCoordinates}
                            strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeWidth={5}
                        />
                    </MapView>
                </ViewShot>
            </View>
        );


    };