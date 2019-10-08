import React, {useState, useEffect, useMemo, useRef} from 'react';
import {NavigationScreenComponent} from 'react-navigation';
import _ from 'lodash';
import MapView, {MapViewProps, PROVIDER_GOOGLE, LatLng, Polyline} from 'react-native-maps';
import Supercluster, { ClusterFeature } from 'supercluster';
import GeoViewport from '@mapbox/geo-viewport';
import {createTabIcon, PoiCard, Modal, PoiCardAction, ScreenHeader, Filter} from '../../components';
import {LoadingIndicator, PoiMarker, ClusterMarker, Controls} from './components';
import {messageBox} from '../../services';
import * as Types from '../../types/graphql';
import {convertToFeature, regionToBoundingBox, PoiFeature, routeToPolyline} from './utils';
import {initialMapRegion, theme} from '../../consts';
import {MapContainer, Map} from './atoms';
import {useData} from './use-data';
import mapStyle from '../../../config/map-style.json';

type MapScreenParams = {
    poiId: Types.Poi['id'],
    routeId: Types.Route['id'],
};

export const MapScreen: NavigationScreenComponent<MapScreenParams> = ({navigation}) => {
    const [filter, setFilter] = useState<Filter>({search: '', categories: []});
    const userLocation = useRef<LatLng>({longitude: 0, latitude: 0});
    const mapRef = useRef<MapView>(null);

    const routeId = navigation.getParam('routeId');
    const {loading, error, isRoute, pois} = useData({routeId, filter});
    useEffect(_.partial(messageBox.error, error), [error]);

    const [currentRegion, setCurrentRegion] = useState(initialMapRegion);
    const [dimentions, setDimentions] = useState({x: 0, y: 0, width: 1, height: 1});
    const [selectedMarker, setSelectedMarker] = useState<Types.Poi | null>(null);
    const unselectMarker = () => setSelectedMarker(null);

    /* clusters */
    const features = useMemo(() => {
        const clusterer = new Supercluster<Types.Poi>();
        clusterer.load(pois.map(convertToFeature));
        const bbox = regionToBoundingBox(currentRegion);
        const viewport = GeoViewport.viewport(bbox, [dimentions.width, dimentions.height]);
        return clusterer.getClusters(bbox, viewport.zoom);
    }, [pois, currentRegion, dimentions]);

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

    const handleLayoutChange: MapViewProps['onLayout'] = ({nativeEvent: {layout}}) =>
        setDimentions(layout);

    const handleUserLocationChange: MapViewProps['onUserLocationChange'] = (
        {nativeEvent: {coordinate: {latitude, longitude}}},
    ) => userLocation.current = {latitude, longitude};

    const handleUserLocation = () => {
        const {longitude, latitude} = userLocation.current;
        if (mapRef.current && longitude && latitude) {
            mapRef.current.animateCamera({
                center: userLocation.current,
            });
        }
    };

    const handleZoomIn = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                ...currentRegion,
                longitudeDelta: currentRegion.longitudeDelta * 0.5,
                latitudeDelta: currentRegion.latitudeDelta * 0.5,
            }, 250);
        }
    };

    const handleZoomOut = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                ...currentRegion,
                longitudeDelta: currentRegion.longitudeDelta / 0.5,
                latitudeDelta: currentRegion.latitudeDelta / 0.5,
            }, 250);
        }
    };

    const renderMarker = (feature: ClusterFeature<{}> | PoiFeature) => {
        const clusterFeature = feature as ClusterFeature<{}>;

        if (clusterFeature.properties.cluster) {
            return (
                <ClusterMarker
                    key={`cluster_${clusterFeature.id}`}
                    feature={clusterFeature}
                />
            )
        }

        const poiFeature = feature as PoiFeature;

        return (
            <PoiMarker
                key={poiFeature.properties.id}
                feature={poiFeature}
                onPress={() => setSelectedMarker(poiFeature.properties)}
            />
        )
    };

    return (
        <>
            <ScreenHeader
                filter={filter}
                onFilterChange={setFilter}
            />

            <MapContainer>
                <Map
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={mapStyle}
                    initialRegion={initialMapRegion}
                    showsUserLocation
                    followsUserLocation
                    showsMyLocationButton={false}
                    toolbarEnabled={false}
                    onLayout={handleLayoutChange}
                    onRegionChangeComplete={setCurrentRegion}
                    onUserLocationChange={handleUserLocationChange}
                >
                    {features.map(renderMarker)}

                    {isRoute &&
                        <Polyline
                            coordinates={routeToPolyline(pois)}
                            strokeColor={theme.routeLineColor}
                            strokeWidth={3}
                            lineCap="round"
                        />
                    }
                </Map>

                <Controls
                    onUserLocation={handleUserLocation}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                />

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
    tabBarIcon: createTabIcon('place'),
};
