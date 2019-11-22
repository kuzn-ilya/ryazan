import React, {useState, useRef, useEffect} from 'react';
import {NavigationBottomTabScreenComponent} from 'react-navigation-tabs';
import _ from 'lodash';
import {Polyline} from 'react-native-maps';
import {createTabIcon, PoiCard, Modal, PoiCardAction, PoiMap, PoiMapControl, ScreenHeader} from '../../components';
import {LoadingIndicator} from './components';
import {messageBox} from '../../services';
import * as Types from '../../types/graphql';
import {routeToPolyline} from './utils';
import {theme} from '../../consts';
import {useFilter} from '../../providers';
import {MapContainer} from './atoms';
import {useData} from './use-data';

export type MapScreenParams = {
    poiId: Types.Poi['id'],
    routeId: Types.Route['id'],
};

export const MapScreen: NavigationBottomTabScreenComponent<MapScreenParams> = ({navigation}) => {
    const [filter, setFilter] = useFilter();
    const mapControlRef = useRef<PoiMapControl>(null);

    const poiId = navigation.getParam('poiId');
    const routeId = navigation.getParam('routeId');
    const {loading, error, isRoute, pois} = useData({routeId, filter});
    useEffect(_.partial(messageBox.error, error), [error]);

    const [selectedMarker, setSelectedMarker] = useState<Types.Poi | null>(null);
    const unselectMarker = () => setSelectedMarker(null);

    /* hides modal window if the user moves to a different screen */
    useEffect(() => {
        const sub = navigation.addListener('willBlur', unselectMarker);
        return () => sub.remove();
    });

    /* moves the camera to a specified marker */
    useEffect(() => {
        if (!(mapControlRef.current && pois && pois.length)) return;

        if (routeId) {
            mapControlRef.current.animateToPoi(pois[0]);
        } else if (poiId) {
            const marker = _.find(pois, {id: poiId});
            if (!marker) return;
            mapControlRef.current.animateToPoi(marker);
        }
    }, [pois, poiId, routeId]);

    return (
        <>
            <ScreenHeader
                title="Карта"
                enableFilter={!isRoute}
                filter={filter}
                onFilterChange={setFilter}
            />

            <MapContainer>
                <PoiMap
                    controlRef={mapControlRef}
                    enableClusters={!isRoute}
                    pois={pois}
                    onPoiPress={setSelectedMarker}
                >
                    {isRoute &&
                        <Polyline
                            coordinates={routeToPolyline(pois)}
                            strokeColor={theme.routeLineColor}
                            strokeWidth={3}
                            lineCap="round"
                        />
                    }
                </PoiMap>

                {loading && <LoadingIndicator />}
            </MapContainer>

            {selectedMarker &&
                <Modal onClose={unselectMarker}>
                    <PoiCard poi={selectedMarker} action={PoiCardAction.ShowDetails} />
                </Modal>
            }
        </>
    );
};

MapScreen.navigationOptions = {
    tabBarIcon: createTabIcon('map'),
};
