import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationScreenComponent} from 'react-navigation';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import MapView, {Marker, MapViewProps, PROVIDER_GOOGLE} from 'react-native-maps';
import {createTabIcon, PoiCard, Modal, PoiCardAction} from '../../components';
import {messageBox} from '../../services';
import * as Types from '../../types/graphql';
import {Container, Map} from './atoms';
import mapStyle from '../../../config/map-style.json';

const GET_POIS = gql`
    query {
        pois {
            id
            name
            description
            latitude
            longitude
            category {
                id
            }
            photos {
                content {
                    url
                }
            }
        }
    }
`;

const initialRegion = {
    latitude: 54.629216,
    longitude: 39.736375,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

type MapScreenParams = {
    poiId: Types.Poi['id'],
};

export const MapScreen: NavigationScreenComponent<MapScreenParams> = ({navigation}) => {
    const {data, error} = useQuery<Types.Query>(GET_POIS);
    useEffect(_.partial(messageBox.error, error), [error]);
    const pois = data && data.pois;

    const mapRef = useRef<MapView>(null);
    const [selectedMarker, setSelectedMarker] = useState<Types.Poi | null>(null);
    const unselectMarker = () => setSelectedMarker(null);

    /* hides modal window if the user moves to a different screen */
    useEffect(() => {
        const sub = navigation.addListener('willBlur', unselectMarker);
        return () => sub.remove();
    });

    /* moves the camera to a specified marker */
    useEffect(() => {
        if (!(mapRef.current && pois)) return;

        const id = navigation.getParam('poiId');
        if (!id) return;

        const marker = _.find(pois, {id});
        if (!marker) return;

        mapRef.current.animateCamera({
            center: {
                longitude: marker.longitude,
                latitude: marker.latitude,
            },
        });
    }, [pois, navigation.state.params]);

    const handleMarkerPress: MapViewProps['onMarkerPress'] = ({nativeEvent: {id}}) => {
        if (!data) return;
        const marker = _.find(pois, {id}) || null;
        setSelectedMarker(marker);
    };

    return (
        <Container>
            <Map
                ref={mapRef}
                style={StyleSheet.absoluteFillObject}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                initialRegion={initialRegion}
                showsUserLocation
                followsUserLocation
                onMarkerPress={handleMarkerPress}
            >
                {pois && pois.map(poi =>
                    <Marker
                        key={poi!.id}
                        identifier={poi!.id}
                        coordinate={{
                            latitude: poi!.latitude,
                            longitude: poi!.longitude,
                        }}
                    />
                )}
            </Map>

            {selectedMarker &&
                <Modal onClose={unselectMarker}>
                    <PoiCard poi={selectedMarker} action={PoiCardAction.ShowDetails} />
                </Modal>
            }
        </Container>
    );
};

MapScreen.navigationOptions = {
    tabBarIcon: createTabIcon('place'),
};
