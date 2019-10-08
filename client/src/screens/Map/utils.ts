import {Region} from 'react-native-maps';
import {BoundingBox} from '@mapbox/geo-viewport';
import {Feature, Point} from 'geojson';
import * as Types from '../../types/graphql';

export type PoiFeature = Feature<Point, Types.Poi>;

export const convertToFeature = (poi: Types.Poi): PoiFeature => ({
    id: poi.id,
    type: 'Feature',
    properties: poi,
    geometry: {
        type: 'Point',
        coordinates: [poi.longitude, poi.latitude],
    },
});

export const regionToBoundingBox = (region: Region): BoundingBox => {
    const delta = region.longitudeDelta < 0
        ? region.longitudeDelta + 360
        : region.longitudeDelta;

    return [
      region.longitude - delta,
      region.latitude - region.latitudeDelta,
      region.longitude + delta,
      region.latitude + region.latitudeDelta,
    ];
};

export const routeToPolyline = (pois: Types.Poi[]) =>
    pois.map(poi => ({
        longitude: poi.longitude,
        latitude: poi.latitude,
    }));
