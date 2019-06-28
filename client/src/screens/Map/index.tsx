import React, {useState, useEffect, useRef} from 'react';
import {NavigationScreenComponent} from 'react-navigation';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import MapView, {Marker, MapViewProps, PROVIDER_GOOGLE} from 'react-native-maps';
import {createTabIcon, PoiCard, Modal, PoiCardAction, ScreenHeader, Filter} from '../../components';
import {messageBox} from '../../services';
import * as Types from '../../types/graphql';
import {Map} from './atoms';
import mapStyle from '../../../config/map-style.json';

const GET_POIS = gql`
    query($search: String!) {
        pois(
            where: {
                name_contains: $search
            }
        ) {
            id
            name
            description
            latitude
            longitude
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
    const [filter, setFilter] = useState<Filter>({search: '', categories: []});
    const mapRef = useRef<MapView>(null);

    const {data, error} = useQuery<Types.Query>(GET_POIS, {variables: filter});
    useEffect(_.partial(messageBox.error, error), [error]);
    const pois = data && data.pois;

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
        <>
            <ScreenHeader
                filter={filter}
                onFilterChange={setFilter}
            />

            <Map
                ref={mapRef}
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
        </>
    );
};

MapScreen.navigationOptions = {
    tabBarIcon: createTabIcon('place'),
};
