import React from 'react';
import {Container, Label} from './atoms';

export type TextButtonProps = {
    label: string,
    onPress: () => void,
};

export const TextButton: React.FC<TextButtonProps> = ({label, onPress}) =>
    <Container onPress={onPress}>
        <Label>{label}</Label>
    </Container>
