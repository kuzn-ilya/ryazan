import React from 'react';
import {Container, Label} from './atoms';

export type ItemProps = {
    label: string,
    onPress: () => void,
};

export const Item: React.FC<ItemProps> = ({label, onPress}) =>
    <Container onPress={onPress}>
        <Label>{label}</Label>
    </Container>
