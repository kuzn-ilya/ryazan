import React from 'react';
import {Marker, MarkerProps} from 'react-native-maps';
import {Feature, Point} from 'geojson'
import * as Types from '../../../../types/graphql';

import {
    Container,
} from './atoms';

type PoiMarkerProps = {
    feature: Feature<Point, Types.Poi>,
    onPress?: MarkerProps['onPress'],
}

export const PoiMarker: React.FC<PoiMarkerProps> = ({
    feature: {
        properties: poi,
        geometry: {coordinates: [longitude, latitude]},
    },
    onPress,
}) =>
    <Marker
        identifier={poi.id}
        coordinate={{latitude, longitude}}
        onPress={onPress}
    >
        <Container />
    </Marker>
