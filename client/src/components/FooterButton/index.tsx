import React from 'react';
import {Container, Label} from './atoms';

export type FooterButtonProps = {
    label: string,
    onPress: () => void,
}

export const FooterButton: React.FC<FooterButtonProps> = ({label, onPress}) =>
    <Container onPress={onPress}>
        <Label>{label}</Label>
    </Container>
