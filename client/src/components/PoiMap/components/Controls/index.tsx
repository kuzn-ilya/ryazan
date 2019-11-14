import React from 'react';
import {IconButton} from '../../../../components/IconButton';
import {Container, Panel} from './atoms';

type ControlsProps = {
    onUserLocation: () => void,
    onZoomIn: () => void,
    onZoomOut: () => void,
}

export const Controls: React.FC<ControlsProps> = ({onUserLocation, onZoomIn, onZoomOut}) =>
    <Container pointerEvents="box-none">
        <Panel>
            <IconButton icon="my-location" onPress={onUserLocation} />
            <IconButton icon="zoom-in" onPress={onZoomIn} />
            <IconButton icon="zoom-out" onPress={onZoomOut} />
        </Panel>
    </Container>
