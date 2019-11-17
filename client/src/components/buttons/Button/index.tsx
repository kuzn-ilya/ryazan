import React from 'react';
import {Container, Label} from './atoms';

export type ButtonProps = {
    label: string,
    onPress: () => void,
};

export const Button: React.FC<ButtonProps> = ({label, onPress}) =>
    <Container onPress={onPress}>
        <Label>{label}</Label>
    </Container>
