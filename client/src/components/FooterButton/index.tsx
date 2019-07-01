import React from 'react';
import {Container, TouchableWrapper, Label} from './atoms';

export type FooterButtonProps = {
    label: string,
    onPress: () => void,
}

export const FooterButton: React.FC<FooterButtonProps> = ({label, onPress}) =>
    <Container>
        <TouchableWrapper onPress={onPress}>
            <Label>{label}</Label>
        </TouchableWrapper>
    </Container>
