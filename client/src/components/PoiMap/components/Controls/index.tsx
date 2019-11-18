import React from 'react';
import {Container, Panel, Button} from './atoms';

type ControlsProps = {
    onUserLocation: () => void,
    onZoomIn: () => void,
    onZoomOut: () => void,
}

export const Controls: React.FC<ControlsProps> = ({onUserLocation, onZoomIn, onZoomOut}) =>
    <Container pointerEvents="box-none">
        <Panel>
            <Button icon="zoom-in" onPress={onZoomIn} />
            <Button icon="zoom-out" onPress={onZoomOut} />
            <Button icon="my-location" onPress={onUserLocation} />
        </Panel>
    </Container>
