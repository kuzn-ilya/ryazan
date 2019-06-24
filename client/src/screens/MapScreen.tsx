import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationScreenConfigProps} from 'react-navigation';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {createTabIcon} from '../components';
import {Container} from './styles';
import mapStyle from '../../config/map-style.json';

export type MapScreenProps = {} & NavigationScreenConfigProps;

type MapScreenState = {
    location: Location.GeocodedLocation;
};

export class MapScreen extends React.Component<MapScreenProps, MapScreenState> {
    static navigationOptions = {
        tabBarIcon: createTabIcon('place'),
    };

    state = {
        location: {
            latitude: 54.629216,
            longitude: 39.736375,
        },
    };

    async componentDidMount() {
        await this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        try {
            const {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                let locationData = await Location.getCurrentPositionAsync({accuracy: 1});
                this.setState({location: locationData.coords});
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    render() {
        return (
            <Container>
                <MapView
                    style={StyleSheet.absoluteFillObject}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={mapStyle}
                    initialRegion={{
                        latitude: this.state.location.latitude,
                        longitude: this.state.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </Container>
        );
    }
}
