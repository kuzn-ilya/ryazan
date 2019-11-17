import React, {useState, useEffect, useMemo, useRef} from 'react';
import MapView, {MapViewProps, PROVIDER_GOOGLE, LatLng} from 'react-native-maps';
import Supercluster, { ClusterFeature } from 'supercluster';
import GeoViewport from '@mapbox/geo-viewport';
import * as Types from '../../types/graphql';
import {PoiMarker, ClusterMarker, Controls} from './components';
import {convertToFeature, regionToBoundingBox, PoiFeature} from './utils';
import {initialMapRegion} from '../../consts';
import {MapContainer, Map} from './atoms';
import mapStyle from '../../../config/map-style.json';

export type PoiMapControl = {
    animateToPoi: (poi: Types.Poi) => void,
};

export type PoiMapProps = {
    controlRef?: React.MutableRefObject<PoiMapControl | null>,
    enableClusters: boolean,
    pois: Types.Poi[],
    onPoiPress: (poi: Types.Poi) => void,
};

export const PoiMap: React.FC<PoiMapProps> = ({controlRef, enableClusters, pois, onPoiPress, children}) => {
    const userLocation = useRef<LatLng>({longitude: 0, latitude: 0});
    const mapRef = useRef<MapView>(null);

    const [currentRegion, setCurrentRegion] = useState(initialMapRegion);
    const [dimentions, setDimentions] = useState({x: 0, y: 0, width: 1, height: 1});

    useEffect(() => {
        if (!controlRef) return;

        controlRef.current = {
            animateToPoi: (poi: Types.Poi) => {
                if (!mapRef.current) return;

                mapRef.current.animateCamera({
                    center: {
                        longitude: poi.longitude,
                        latitude: poi.latitude,
                    },
                });
            },
        };
    }, [controlRef, mapRef.current]);

    /* clusters */
    const features = useMemo(() => {
        const preparedFeatures = pois.map(convertToFeature);

        if (enableClusters) {
            const clusterer = new Supercluster<Types.Poi>();
            clusterer.load(preparedFeatures);
            const bbox = regionToBoundingBox(currentRegion);
            const viewport = GeoViewport.viewport(bbox, [dimentions.width, dimentions.height]);
            return clusterer.getClusters(bbox, viewport.zoom);
        }

        return preparedFeatures;
    }, [pois, currentRegion, dimentions]);

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
                onPress={() => onPoiPress(poiFeature.properties)}
            />
        )
    };

    return (
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
                    {children}
            </Map>

            <Controls
                onUserLocation={handleUserLocation}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
            />
        </MapContainer>
    );
};
