import React from 'react';
import {ClusterFeature} from 'supercluster';
import {Marker, MarkerProps} from 'react-native-maps';
import {Circle, Label} from './atoms';

type ClusterMarkerProps = {
    feature: ClusterFeature<{}>,
    onPress?: MarkerProps['onPress'],
}

export const ClusterMarker: React.FC<ClusterMarkerProps> = ({
    feature: {
        properties: {point_count},
        geometry: {coordinates: [longitude, latitude]},
    },
    onPress,
}) =>
    <Marker coordinate={{latitude, longitude}} onPress={onPress}>
        <Circle>
            <Label>{point_count}</Label>
        </Circle>
    </Marker>
