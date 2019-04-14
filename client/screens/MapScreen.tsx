import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenConfigProps } from 'react-navigation'
import { MapView, PROVIDER_GOOGLE, Location, Permissions } from 'expo';
import { styles } from './styles';

export type MapScreenProps = {} & NavigationScreenConfigProps

interface MapScreenState {
  location: Location.LocationProps;
}

export class MapScreen extends React.Component<MapScreenProps, MapScreenState> {
    static navigationOptions = {
      title: 'Map',
    };

    state = {
      location: {
        latitude: 54.629216,
        longitude: 39.736375
      }
    };

    componentDidMount() {
      this._getLocationAsync();
    }

    _getLocationAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        let locationData = await Location.getCurrentPositionAsync({ accuracy: 1 });
        this.setState({ location: locationData.coords });
      }
    }

    render() {
      return (
        <View style={styles.container}>
          <MapView 
            style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      );
    }
  }